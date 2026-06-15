/* ─────────────────────────────────────────────────────────────
   Supabase configuration — fill these two values in to enable the
   admin panel. Until then, the site shows its built-in content and
   the admin page tells you it isn't configured yet.

   These are PUBLIC values (safe to commit & deploy). The anon key
   only allows what your Row-Level Security policies permit:
   public read, owner-only write. Your password is never here.
   See SETUP.md.
   ───────────────────────────────────────────────────────────── */
window.SUPABASE_CONFIG = {
  url: "YOUR_SUPABASE_URL",        // e.g. https://abcdefgh.supabase.co
  anonKey: "YOUR_SUPABASE_ANON_KEY"
};
