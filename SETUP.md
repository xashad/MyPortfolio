# Admin panel setup (edit the live site from any browser)

Your portfolio now has an optional CMS layer. **Until you fill in `config.js`,
nothing changes** — the site shows the same hard-coded content as before and the
Supabase library isn't even loaded. Once configured, you can log in at
`/admin.html` and edit most sections from any browser; changes go live instantly.

**What's editable:** Hero, stats, About, skills, the project cards, Momentum
(currently / writing), experience, education, certifications, contact.
**What's fixed:** the flagship **Lagani** card with its charts (it stays in the
code), plus the nav, résumé passcode gate, and footer.

**Files**
- `index.html` — the site. Re-renders editable sections from Supabase *only when
  saved content exists*; otherwise keeps its static HTML.
- `admin.html` — login + editor (`yoursite.com/admin.html`).
- `defaults.js` — mirror of the current content; the editor seeds from it.
- `config.js` — your Supabase URL + anon key (the only file you edit by hand).

---

## 1. Create a Supabase project (free)
1. https://supabase.com → sign in → **New project**. Pick a name + database password.
2. Wait ~1 minute for it to provision.

## 2. Create the content table + security rules
Dashboard → **SQL Editor** → **New query** → paste and **Run**:

```sql
create table if not exists public.site_content (
  id text primary key,
  data jsonb not null,
  updated_at timestamptz default now()
);

alter table public.site_content enable row level security;

-- Anyone can READ the published content (needed by the public site)
create policy "public read" on public.site_content
  for select using (true);

-- Only signed-in users can write (the admin panel)
create policy "auth insert" on public.site_content
  for insert to authenticated with check (true);
create policy "auth update" on public.site_content
  for update to authenticated using (true) with check (true);
```

## 3. Create your login user
Authentication → **Users** → **Add user** → **Create new user**.
- Use your email + a strong password, and tick **Auto Confirm User**.
- Optional: Authentication → **Sign-ups** → turn **Allow new sign-ups OFF** so
  no one else can ever register.

## 4. Paste your keys
Project Settings → **API**. Copy the **Project URL** and the **anon / public** key
(not `service_role`). Put them in `config.js`:

```js
window.SUPABASE_CONFIG = {
  url: "https://xxxxxxxx.supabase.co",
  anonKey: "eyJhbGciOi...your anon key..."
};
```

Both values are public and safe to commit. The anon key can only do what the
policies above allow (read everything, write only when logged in).

## 5. Deploy
Commit and push. Netlify (and GitHub Pages) redeploy automatically — no build step.

## 6. First edit
1. Open `https://yoursite.com/admin.html` and sign in.
2. Edit any section; lists have **+ Add** / **✕ Remove**.
3. Hit **Save & publish**. The first save copies the current content into Supabase;
   from then on the live site renders your saved version.

> Tip: fields labelled *“Basic inline HTML allowed”* (the intro paragraph, About
> paragraphs, project bullets, the Currently list) accept tags like
> `<strong>…</strong>` so you can keep words bold.

## Notes
- Editing the **Lagani** card or its charts still means editing `index.html`
  directly — it's intentionally kept in code.
- Passcode for the résumé gate is set in `index.html` (`const PASSCODE`).
- If a save ever looks wrong, click **Discard changes** to reload the last
  published version, or re-run the SQL in step 2 if writes are rejected.
