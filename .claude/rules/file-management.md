# File Management

## Focus areas

- `src/` — all application code and content.
- `public/` — static assets.
- `supabase/migrations/` — database schema.
- `.claude/`, `CLAUDE.md`, `README.md`, `.zed/` — project docs and tooling.

## Skip these (don't scan or read for code tasks)

- `node_modules/`
- `.next/`, `out/`, `build/` — build output
- `package-lock.json` — read only to answer a dependency question
- `supabase/.temp/` — Supabase CLI state
- `*.tsbuildinfo`, `next-env.d.ts` — generated

## Never read or commit (sensitive)

- `.env`, `.env.local`, `.env.*.local` — they hold the keys. The code uses:
  `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` (public, shipped to the browser) and `SUPABASE_URL`,
  `SUPABASE_SECRET_KEY`, `RESEND_API_KEY`, `RECAPTCHA_SECRET_KEY`, `NOTIFICATION_EMAIL`
  (server only). Ask the user when a value matters; never print one.
- `*.pem`, `.vercel/`
