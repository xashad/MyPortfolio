/* ─────────────────────────────────────────────────────────────
   Supabase configuration for the optional admin / CMS layer.

   These are PUBLIC values (safe to commit & deploy). The anon key
   only allows what your Row-Level Security policies permit:
   public read, owner-only write. Your password and the
   service_role / secret key are never here. See SETUP.md.
   ───────────────────────────────────────────────────────────── */
window.SUPABASE_CONFIG = {
  url: "https://evjiqgmeatkzmmufliyw.supabase.co",
  anonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV2amlxZ21lYXRrem1tdWZsaXl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE0NzIwOTYsImV4cCI6MjA5NzA0ODA5Nn0.8Fp8SEmob-gd9k-JS0nlP6fHyw1gWFpft4FlDHZDn-I"
};
