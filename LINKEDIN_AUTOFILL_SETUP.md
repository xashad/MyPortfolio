# LinkedIn screenshot → auto-fill (setup)

The admin panel can read a **screenshot of your LinkedIn post** and auto-fill the
project fields (name, badge, tagline, categories, tech, key points). It does this
by sending the image to a small Supabase Edge Function (`parse-post`) that calls
**Google Gemini** (free tier) and returns structured fields. You review, add the
post URL, and publish.

Your API key lives only as a Supabase secret — never in the website or the repo.

---

## 1. Get a free Gemini API key (≈1 min)

1. Go to **https://aistudio.google.com/app/apikey**
2. Sign in with your Google account → **Create API key**
3. Copy the key (starts with `AIza…`)

The free tier is generous — a screenshot parse costs nothing.

---

## 2. Deploy the function

Function source: [`supabase/functions/parse-post/index.ts`](supabase/functions/parse-post/index.ts).
Your project ref is **`evjiqgmeatkzmmufliyw`**.

### Option A — Supabase Dashboard (no CLI needed, easiest)

1. Open your project → **Edge Functions** → **Create a function** → name it exactly
   **`parse-post`**.
2. Paste the entire contents of `supabase/functions/parse-post/index.ts` → **Deploy**.
3. Set the key: **Project Settings → Edge Functions → Add secret**
   - Name: `GEMINI_API_KEY`
   - Value: your `AIza…` key → **Save**.

### Option B — Supabase CLI

```bash
supabase login
supabase functions deploy parse-post --project-ref evjiqgmeatkzmmufliyw
supabase secrets set GEMINI_API_KEY=AIza_your_key_here --project-ref evjiqgmeatkzmmufliyw
```

> `SUPABASE_URL` and `SUPABASE_ANON_KEY` are provided by the platform automatically —
> you do **not** set those. Keep the function's JWT verification **on** (the default):
> the function also checks you're a signed-in admin before spending any quota.

---

## 3. Use it

1. Go to **xashad.netlify.app/admin.html** and sign in.
2. In **"Add a project from LinkedIn"**, click the drop-zone (or drag a screenshot in).
3. Fields fill in automatically — tweak anything, paste the **post URL**, then
   **Add & publish now**. The card appears in your Projects section immediately.

---

## Troubleshooting

- **"Not authenticated"** → sign in to the admin first (the function requires a logged-in user).
- **"GEMINI_API_KEY is not set"** → you deployed the function but didn't add the secret (step 2.3 / CLI `secrets set`).
- **"Gemini request failed"** → the key is wrong/restricted, or the model name changed.
  Open `index.ts` and swap `const MODEL = "gemini-2.0-flash"` for the current free
  vision model (e.g. `gemini-2.5-flash`), then redeploy.
- **Nothing happens on drop** → make sure the file is an image (PNG/JPG). The image is
  downscaled in your browser before upload, so large screenshots are fine.
