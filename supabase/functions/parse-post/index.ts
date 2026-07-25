// Supabase Edge Function: parse-post
// Reads a screenshot of a LinkedIn post and returns structured project fields
// for the portfolio admin quick-add form. Uses Google Gemini (free tier).
//
// Deploy + configure: see ../../../LINKEDIN_AUTOFILL_SETUP.md
//   1. supabase functions deploy parse-post --project-ref evjiqgmeatkzmmufliyw
//   2. supabase secrets set GEMINI_API_KEY=<your key> --project-ref evjiqgmeatkzmmufliyw
// SUPABASE_URL / SUPABASE_ANON_KEY are injected by the platform automatically.

import { createClient } from "npm:@supabase/supabase-js@2";

// Swap this if Google renames the free vision model (e.g. gemini-2.5-flash).
const MODEL = "gemini-2.0-flash";

const CORS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const json = (obj: unknown, status = 200) =>
  new Response(JSON.stringify(obj), { status, headers: { ...CORS, "Content-Type": "application/json" } });

const PROMPT = `You are reading a screenshot of a LinkedIn post written by the profile owner to announce one of their own software / AI / data projects. Turn it into a concise portfolio "project card". Base everything ONLY on what the screenshot actually shows — do not invent facts, metrics, or tools that are not visible.

Return these fields:
- name: the project's name, short, no hashtags or emojis. If no explicit name, craft a short 1-3 word title from the content.
- flag: a short "category · topic" badge, 2-4 words, e.g. "Machine Learning · XAI", "Computer Vision · HCI", "Full-Stack · Web". Infer from the content.
- tagline: ONE sentence, <= 90 characters, plainly describing what the project does.
- cats: any of ["xai","cv","web"] that apply — xai = explainable AI / interpretable ML, cv = computer vision / images / video, web = web or full-stack app. Return [] if unsure.
- tech: technologies, libraries, frameworks or tools explicitly mentioned (e.g. Python, PyTorch, React, Supabase). [] if none are stated.
- points: up to 3 short highlight bullets as plain strings (no leading dashes, no emojis). [] if the post is too short to support them.`;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });
  if (req.method !== "POST") return json({ error: "Use POST" }, 405);

  try {
    // Only a signed-in admin may spend the Gemini quota. The anon key alone is public,
    // so we require a real authenticated user session.
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: req.headers.get("Authorization") || "" } } },
    );
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return json({ error: "Not authenticated — sign in to the admin first." }, 401);

    const { image, mime } = await req.json().catch(() => ({}));
    if (!image) return json({ error: "No image provided." }, 400);

    const apiKey = Deno.env.get("GEMINI_API_KEY");
    if (!apiKey) return json({ error: "GEMINI_API_KEY is not set on the function." }, 500);

    const body = {
      contents: [{
        parts: [
          { text: PROMPT },
          { inline_data: { mime_type: mime || "image/jpeg", data: image } },
        ],
      }],
      generationConfig: {
        temperature: 0.2,
        responseMimeType: "application/json",
        responseSchema: {
          type: "object",
          properties: {
            name: { type: "string" },
            flag: { type: "string" },
            tagline: { type: "string" },
            cats: { type: "array", items: { type: "string" } },
            tech: { type: "array", items: { type: "string" } },
            points: { type: "array", items: { type: "string" } },
          },
          required: ["name", "tagline"],
        },
      },
    };

    const r = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
        body: JSON.stringify(body),
      },
    );
    const out = await r.json();
    if (!r.ok) return json({ error: "Gemini request failed.", detail: out }, 502);

    const text = out?.candidates?.[0]?.content?.parts?.[0]?.text ?? "{}";
    let project: Record<string, unknown> = {};
    try { project = JSON.parse(text); } catch { /* leave empty on parse failure */ }

    // Keep cats to the known filter buckets.
    if (Array.isArray(project.cats)) {
      project.cats = (project.cats as string[])
        .map((c) => String(c).toLowerCase().trim())
        .filter((c) => ["xai", "cv", "web"].includes(c));
    }

    return json({ project });
  } catch (e) {
    return json({ error: String(e instanceof Error ? e.message : e) }, 500);
  }
});
