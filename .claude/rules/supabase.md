# Supabase

- Client: `src/lib/supabase/client.ts`, created with `NEXT_PUBLIC_SUPABASE_URL` and
  `NEXT_PUBLIC_SUPABASE_ANON_KEY`. It runs with the anon role, so Row Level Security decides
  what it can do.
- Tables today: `contact_messages` (`id`, `name`, `email`, `subject`, `message`,
  `created_at`, `status` = `pending` → `sent` / `failed`), written by
  `src/app/api/contact/route.ts`.

## Migrations

- One file per change in `supabase/migrations/`, numbered in sequence with a descriptive
  name: `001_create_contact_messages_table.sql`, `002_…`.
- Never edit a migration that has already been applied; add a new one.
- Every new table enables RLS and declares its policies in the same migration. Grant the
  anon role only what the site needs.
- Show the SQL to the user before applying it; applying it (`supabase db push` or the
  dashboard) is the user's call.
- `supabase/.temp/` is the CLI's local state: git-ignored, never edited.
