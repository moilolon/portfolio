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

- **Next.js 16** (App Router, Turbopack) + **React 19**, **TypeScript** strict.
- **Tailwind CSS 4** through `@tailwindcss/postcss` — no `tailwind.config.*`; theme tokens
  and custom animations live in `src/app/globals.css`.
- **next-intl** — the site in English and Spanish, under `/en` and `/es`.
- **@react-pdf/renderer** — the CV, generated as a PDF per language at build time.
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
│   ├── [locale]/layout.tsx   # <html lang>, fonts, metadata per language, theme init script, nav.js, analytics
│   ├── [locale]/page.tsx     # composes Navbar + every section; prerendered as /en and /es
│   ├── [locale]/not-found.tsx, [...rest]/  # the 404 page, in the language of the URL
│   ├── [locale]/opengraph-image.tsx  # the card of a shared link, one per language, written at build time
│   ├── sitemap.ts, robots.ts # /sitemap.xml (both languages) and /robots.txt
│   ├── globals.css           # Tailwind import, CSS variables, animations
│   ├── cv/[file]/route.tsx   # GET /cv/curriculum_<locale>.pdf: the CV, prerendered at build time
│   ├── api/contact/route.ts  # POST: validate → reCAPTCHA → Supabase insert → Resend email
│   └── api/cron/contact/route.ts  # GET (Vercel Cron, daily): retry unsent notifications
├── components/
│   ├── layouts/Navbar.tsx    # site switcher (<moilolon-nav>), section links, Contact button, theme toggle
│   ├── sections/             # Information, Technologies, Experience, Projects, Training, AboutMe; the three
│   │                         #   with state hand their content to a client part (TechnologiesTabs, ExperienceCards, ProjectsGrid)
│   ├── modals/ContactModal.tsx
│   ├── forms/ContactForm.tsx
│   ├── ui/                   # Modal, Toast, ThemeToggle, LanguageSwitcher
│   └── icons/<section>/      # SVG icon components, re-exported by an index.ts per folder
├── i18n/                     # next-intl: routing (locales), request (loads the messages), navigation (Link, router)
├── messages/                 # the INTERFACE texts, en.json and es.json: menu, headings, form, errors
├── proxy.ts                  # sends a URL without language to /en or /es: shared cookie, then the browser
├── assets/fonts/             # Latin Modern Sans, embedded in the CV
├── content/                  # the site's CONTENT as JSON, every text in English and Spanish: profile, technologies,
│                             #   experience, projects, training, languages, about; cv.json holds what only the CV shows
├── lib/
│   ├── constants/            # typed adapters over content/: get<Section>(locale), adding what is not data (icons, colors)
│   ├── i18n.ts               # the locales (en, es) and localize(), which picks one language out of the content
│   ├── contact.ts            # contact form rules (limits, validation, honeypot) shared by form and API
│   ├── supabase/client.ts    # server only (secret key)
│   ├── resend/               # client.ts, contact.ts (the notification email, HTML-escaped)
│   ├── recaptcha.ts          # reCAPTCHA v3 loader + action name shared with the API
│   ├── cv/CvDocument.tsx     # the layout of the CV as a PDF (server only)
│   ├── lang.ts               # the language cookie shared with the other moilolon.com sites
│   ├── site.ts               # SITE_URL, the base of every absolute URL
│   ├── theme.ts              # inline script that sets <html data-theme> before paint
│   └── colors.ts             # tint() for technology chip backgrounds
└── types/                    # one file per content type (experience, projects, …), moilolon-nav.d.ts
public/                       # avatar.jpg (also the photo of the CV), projects/*.png|svg
supabase/migrations/          # NNN_description.sql
vercel.json                   # the daily cron of the contact messages
assets/                       # drawing scripts (powershell -NoProfile -File assets/<script>): draw-images.ps1 → the README cover, the icon (also the project's icon in Orca) and the GitHub social preview (uploaded by hand in Settings); draw-logo.ps1 → public/projects/moilolon.png, this project's card, from the favicon
```

Content is data, not markup: to add a job, project, technology, course or a paragraph of About me,
edit the matching JSON in `src/content/` (typed by `src/types/`), not the section component. A new
technology also needs its color (and icon) in `src/lib/constants/technologies.tsx`.

Every text in `src/content/` is written in both languages, side by side:
`"title": { "en": "…", "es": "…" }`. Interface texts (menu, headings, buttons, errors) are not
content: they live in `src/messages/<locale>.json`. The same content feeds the generated CV, so the site is the source: there is no second wording
of a job for the PDF, and no PDF to edit by hand.

## Commands

```bash
npm run dev     # next dev --turbopack (http://localhost:3000)
npm run build   # production build — the real type check
npm run lint    # eslint .: next/core-web-vitals + next/typescript + ESLint Stylistic (add -- --fix to format)
npm test        # node --test: the unit tests of src/**/*.test.ts, no test framework
```

Tests cover the pure logic only (`validateContact`, `localize`). A change is verified with
`npm run lint`, `npm test`, `npm run build` and, for UI,
by looking at it in the browser (`npm run dev`).

CI (`.github/workflows/checks.yml`, job `checks`) runs the lint, the tests and the build on every
pull request and on `main`, with npm's downloads and Next.js's build cache (`.next/cache`) cached
from `main`.

## Critical conventions (do not skip)

- **Secrets live in `.env.local`** (git-ignored) and must never be read, printed or committed.
  The variable names the code uses are listed in `.claude/rules/file-management.md`.
- **Server-only secrets stay server-side.** Only `NEXT_PUBLIC_*` variables may be used in
  client components; `SUPABASE_URL`, `SUPABASE_SECRET_KEY`, `RESEND_API_KEY`, `RECAPTCHA_SECRET_KEY`,
  `NOTIFICATION_EMAIL` and `CRON_SECRET` are read only in `src/app/api/` (and the `src/lib/` clients it imports).
- **`'use client'` only where needed** (state, effects, event handlers, browser APIs).
  Sections that just render constants stay server components.
- **Style is enforced by ESLint Stylistic** (`eslint.config.mjs`): 2-space indent, single
  quotes, semicolons, trailing commas on multiline, self-closing empty JSX. `npm run lint -- --fix`
  formats; Zed does it on save. `@/` is the import alias for `src/`.
- **Git:** branches `<type>/<description>`, commits `type(scope): description` from `main`.
  See `.claude/rules/git-workflow.md`.
- **Responsive and accessible by default:** every UI change works from mobile to desktop
  and in light/dark (system preference or the manual toggle), with semantic HTML and labelled controls.

## Git

The full workflow is in `.claude/rules/git-workflow.md`; in short:

- **Commits:** conventional, `type(scope): description`, imperative and lowercase, off `main`;
  a body only when the why is not obvious. No `Co-Authored-By` or other attribution.
- **Branches:** `<type>/<short-description>`, lowercase kebab-case, off `main`. Types:
  `feature`, `bugfix`, `hotfix`, `refactor`, `docs`, `style`, `test`, `chore`.
- **Pull requests:** title `type: Description`, squash-merged into `main` (GitHub appends
  `(#N)`); body with what changed, why and how to test; at least one label; CI green.
- **`gh`:** always as `GH_TOKEN=$(gh auth token --user moilolon) gh …`, command by command. gh's
  active account is the work one, which must not act on this repo; do not switch it. `git`
  already uses `moilolon` through the `includeIf` of `C:/Developer/PERSONAL/`.
