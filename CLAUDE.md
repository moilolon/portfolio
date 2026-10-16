# Portfolio — Project Memory

Personal developer portfolio of Moisés López López: a single-page site that shows who I am,
the technologies I use, my experience, projects and training, with a contact form that
stores the message in Supabase and notifies me by email through Resend. Deployed on Vercel
from `main` (repo `moilolon/portfolio`).

This file is the entry point. Read the rules **on demand**, guided by the task at hand.

## Knowledge base

| Task | Read |
| ---- | ---- |
| Any component, section, page, API route or content change | `.claude/rules/nextjs-development.md` |
| Supabase table, migration or query | `.claude/rules/supabase.md` |
| Commits, branches, PRs | `.claude/rules/git-workflow.md` |
| What to skip, what never to read | `.claude/rules/file-management.md` |
| Where a fact belongs, keeping docs current | `.claude/rules/documentation.md` |
| Editor setup (Zed), tasks | `.zed/README.md` |

## Stack

- **Next.js 15** (App Router, Turbopack in dev) + **React 19**, **TypeScript** strict.
- **Tailwind CSS 4** through `@tailwindcss/postcss` — no `tailwind.config.*`; theme tokens
  and custom animations live in `src/app/globals.css`.
- **Supabase** (`@supabase/supabase-js`) — the `contact_messages` table.
- **Resend** — email notification for each contact message.
- **Google reCAPTCHA v3** (script loaded by `src/lib/recaptcha.ts`, no library) — the token
  (action `contact`) is verified server-side in the API route, checking action and score.
- **Vercel** hosting, **Vercel Analytics** and **Speed Insights** (mounted in `layout.tsx`).
- **Geist** Sans / Mono through `next/font`.

## Architecture (quick reference)

```text
src/
├── app/
│   ├── layout.tsx            # fonts, metadata, theme init script, Analytics, SpeedInsights
│   ├── page.tsx              # composes Navbar + every section
│   ├── globals.css           # Tailwind import, CSS variables, animations
│   └── api/contact/route.ts  # POST: reCAPTCHA → Supabase insert → Resend email
├── components/
│   ├── layouts/Navbar.tsx    # section links, Contact button (opens ContactModal), theme toggle
│   ├── sections/             # Information, Technologies, Experience, Projects, Training, AboutMe
│   ├── modals/ContactModal.tsx
│   ├── forms/ContactForm.tsx
│   ├── ui/                   # Modal, Toast, ThemeToggle
│   └── icons/<section>/      # SVG icon components, re-exported by an index.ts per folder
├── lib/
│   ├── constants/            # the site's CONTENT: experience, projects, technologies, information
│   ├── supabase/client.ts
│   ├── resend/client.ts
│   ├── recaptcha.ts          # reCAPTCHA v3 loader + action name shared with the API
│   ├── theme.ts              # inline script that sets <html data-theme> before paint
│   └── colors.ts             # tint() for technology chip backgrounds
└── types/                    # one file per content type (experience, projects, …)
public/                       # avatar.jpg, cv/curriculum_en.pdf, projects/*.png|svg
supabase/migrations/          # NNN_description.sql
```

Content is data, not markup: to add a job, project or technology, edit the matching file in
`src/lib/constants/` (typed by `src/types/`), not the section component. Exception: Training and
About me still keep their content inline in their section component.

## Commands

```bash
npm run dev     # next dev --turbopack (http://localhost:3000)
npm run build   # production build — the real type check
npm run lint    # next lint: next/core-web-vitals + next/typescript + ESLint Stylistic (add -- --fix to format)
```

There are no tests. A change is verified with `npm run lint`, `npm run build` and, for UI,
by looking at it in the browser (`npm run dev`).

CI (`.github/workflows/cra.yaml`) runs `npm run lint` on every push to a branch other than
`main`; `cache.yaml` warms the `node_modules` cache on `main`.

## Critical conventions (do not skip)

- **Secrets live in `.env.local`** (git-ignored) and must never be read, printed or committed.
  The variable names the code uses are listed in `.claude/rules/file-management.md`.
- **Server-only secrets stay server-side.** Only `NEXT_PUBLIC_*` variables may be used in
  client components; `RESEND_API_KEY`, `RECAPTCHA_SECRET_KEY` and `NOTIFICATION_EMAIL` are
  read only in `src/app/api/`.
- **`'use client'` only where needed** (state, effects, event handlers, browser APIs).
  Sections that just render constants stay server components.
- **Style is enforced by ESLint Stylistic** (`eslint.config.mjs`): 2-space indent, single
  quotes, semicolons, trailing commas on multiline, self-closing empty JSX. `npm run lint -- --fix`
  formats; Zed does it on save. `@/` is the import alias for `src/`.
- **Git:** branches `<type>/<description>`, commits `type(scope): description` from `main`.
  See `.claude/rules/git-workflow.md`.
- **Responsive and accessible by default:** every UI change works from mobile to desktop
  and in light/dark (system preference or the manual toggle), with semantic HTML and labelled controls.
