# Supabase

- Client: `src/lib/supabase/client.ts`, created with `SUPABASE_URL` and `SUPABASE_SECRET_KEY`
  (an `sb_secret_...` key; the legacy JWT `anon` / `service_role` keys are deprecated, don't
  use them). It runs as `service_role`, which bypasses Row Level Security, so it is **server
  only**: import it from `src/app/api/`, never from a client component.
- The public roles (`anon`, `authenticated`) get no grants and no policies: the browser never
  talks to Supabase directly, everything goes through an API route.
- Tables today: `contact_messages` (`id`, `name`, `email`, `subject`, `message`,
  `created_at`, `status` = `pending` → `sent` / `failed`), written by
  `src/app/api/contact/route.ts`.

## Migrations

- One file per change in `supabase/migrations/`, numbered in sequence with a descriptive
  name: `001_create_contact_messages_table.sql`, `002_…`.
- Never edit a migration that has already been applied; add a new one.
- Every new table enables RLS and declares its policies in the same migration. Grant the
  public roles only what the site needs (today, nothing).
- Every new table also declares its `GRANT`s in the same migration: Supabase does not grant
  Data API access to new tables in `public`, so without them supabase-js gets "permission
  denied" (also after `supabase db reset` or on a new project).
- Show the SQL to the user before applying it; applying it (`supabase db push` or the
  dashboard) is the user's call.
- `supabase/.temp/` is the CLI's local state: git-ignored, never edited.
