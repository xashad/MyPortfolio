# Resume request alerts — setup

When someone clicks **Resume**, a clean popup asks for their name, then the resume
opens immediately. Every request is logged to Supabase, and you get a **phone push**
(Telegram or Discord) the moment it happens.

The front-end is already live — it logs each request to a `resume_requests` table.
You just need to (1) create that table and (2) wire up the phone alert.

---

## Step 1 — Create the table
SQL editor → paste → **Run**:
👉 https://supabase.com/dashboard/project/evjiqgmeatkzmmufliyw/sql/new

```sql
create table if not exists public.resume_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  page text,
  referrer text,
  created_at timestamptz default now()
);

alter table public.resume_requests enable row level security;

-- visitors (anon) may submit a request, but cannot read anyone's data
create policy "anon can request" on public.resume_requests
  for insert to anon with check (true);

-- only you (logged in) can read the list
create policy "owner can read" on public.resume_requests
  for select to authenticated using (true);
```

You can now see every request under **Table Editor → resume_requests**.
At this point the popup + logging already work; the rest is just the phone alert.

---

## Step 2 — Pick a notifier and get its credentials

### Option A — Telegram (recommended, cleanest phone push)
1. In Telegram, message **@BotFather** → `/newbot` → follow prompts → copy the **bot token**.
2. Send any message to your new bot (so it can message you back).
3. Open `https://api.telegram.org/bot<YOUR_TOKEN>/getUpdates` in a browser and find
   `"chat":{"id":...}` — that number is your **chat id**.

### Option B — Discord
1. In a Discord server: **Server Settings → Integrations → Webhooks → New Webhook**.
2. Choose a channel → **Copy Webhook URL**.

---

## Step 3 — Create the Edge Function that sends the alert
Edge Functions → **Create a function** (dashboard editor) → name it
`notify-resume-request` → paste this → **Deploy**:
👉 https://supabase.com/dashboard/project/evjiqgmeatkzmmufliyw/functions

```ts
// notify-resume-request
Deno.serve(async (req) => {
  try {
    const { record } = await req.json();
    const name = record?.name ?? "Someone";
    const ref  = record?.referrer || "";
    const page = record?.page || "";
    const lines = ["📄 Resume requested", `Name: ${name}`];
    if (ref)  lines.push(`From: ${ref}`);
    if (page) lines.push(`Page: ${page}`);
    const text = lines.join("\n");

    const discord = Deno.env.get("DISCORD_WEBHOOK");
    const tgToken = Deno.env.get("TELEGRAM_BOT_TOKEN");
    const tgChat  = Deno.env.get("TELEGRAM_CHAT_ID");

    const jobs: Promise<unknown>[] = [];
    if (discord) {
      jobs.push(fetch(discord, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: text }),
      }));
    }
    if (tgToken && tgChat) {
      jobs.push(fetch(`https://api.telegram.org/bot${tgToken}/sendMessage`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: tgChat, text }),
      }));
    }
    await Promise.allSettled(jobs);
    return new Response("ok");
  } catch (e) {
    return new Response("error: " + e, { status: 200 });
  }
});
```

- If the dashboard shows a **“Verify JWT”** toggle, turn it **OFF** for this function
  (it's called by an internal webhook, not a logged-in user).
- Add your secrets: Edge Functions → **Secrets** (or Project Settings → Edge Functions):
  - Telegram: `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID`
  - Discord: `DISCORD_WEBHOOK`
  (Set whichever you chose — you can set both.)

---

## Step 4 — Fire the function on every new request
Database → **Webhooks** → **Create a new hook**:
👉 https://supabase.com/dashboard/project/evjiqgmeatkzmmufliyw/database/hooks

- **Table:** `resume_requests`
- **Events:** Insert
- **Type:** *Supabase Edge Functions* → select `notify-resume-request`
- Leave method **POST**. Save.

Done. Now click Resume on your site, enter a test name — your phone should buzz, and
the request appears in **Table Editor → resume_requests**.

---

## Simpler alternative (no Edge Function)
If you'd rather skip steps 3–4: create a **Discord webhook** (Option B) and tell me —
I'll have the popup POST to it directly. Setup drops to one step, with the trade-off
that the Discord webhook URL is visible in the page source (someone could spam that one
channel; you can regenerate it anytime). The Edge Function path above keeps it hidden.

## Notes
- Access is **instant** — the visitor always gets the resume, even if logging/alerting
  is down. You just wouldn't be notified for that one.
- The popup only asks for a **name** (lowest friction). Want email or company too?
  Tell me and I'll add fields + columns.
- Want to browse past requests inside `/admin.html` instead of the Supabase table?
  I can add a small "Resume requests" list there.
