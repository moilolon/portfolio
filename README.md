<div align="center">

# 👨🏻‍💻 Portfolio for developers

A fast, responsive single-page portfolio to present your skills, experience and projects,
with a contact form that lands straight in your inbox.

[**🌐 Live site**](https://portfolio.moilolon.com) · [Report a bug](https://github.com/moilolon/portfolio/issues/new) · [Request a feature](https://github.com/moilolon/portfolio/issues/new)

<br />

![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

![Lint](https://img.shields.io/github/actions/workflow/status/moilolon/portfolio/cra.yaml?label=lint&style=flat-square)
![Last commit](https://img.shields.io/github/last-commit/moilolon/portfolio?style=flat-square)
![Stars](https://img.shields.io/github/stars/moilolon/portfolio?style=flat-square)
![Issues](https://img.shields.io/github/issues/moilolon/portfolio?style=flat-square)
![Pull requests](https://img.shields.io/github/issues-pr/moilolon/portfolio?style=flat-square)

<br />

<a href="https://portfolio.moilolon.com">
  <img src="public/projects/portfolio-logo.svg" alt="moilolon portfolio" width="820" />
</a>

</div>

---

## ✨ Features

| | Section | What it shows |
|---|---|---|
| 🙋 | **Information** | Avatar, name, role, location and quick links: email, CV (PDF), GitHub, LinkedIn |
| 🧰 | **Technologies** | Skills by category, with brand icons, split into daily use and past experience |
| 💼 | **Experience** | Work history with expandable entries: summary, key points and technologies |
| 🚀 | **Projects** | Project cards with key points, tech stack and GitHub / live links, filterable by technology |
| 🎓 | **Training** | Education, courses and languages |
| 💬 | **About me** | Who I am and how I work |
| 📄 | **CV** | A PDF in English and Spanish, generated from the same content at build time |
| ✉️ | **Contact** | Modal form protected by invisible reCAPTCHA v3, a honeypot and a Vercel Firewall rate limit, with per-field validation, toast feedback, an email notification you can reply to, and daily retries |

**In English and Spanish:** every page lives under `/en` and `/es`, with a switcher in the
navbar. The choice is kept in a cookie shared with the other moilolon.com sites; without it, the
language of the browser decides.

**Under the hood:** server components by default, light/dark theme that follows the system
preference with a manual toggle (remembered, no flash on load), smooth-scrolling navigation, mobile-first layout, SEO (metadata per language, `sitemap.xml`, a generated social card and schema.org data), and
[Vercel Analytics](https://vercel.com/analytics) + [Speed Insights](https://vercel.com/docs/speed-insights)
for real-user Core Web Vitals.

## 🛠 Tech stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) — App Router, Turbopack |
| Languages | [next-intl](https://next-intl.dev) — English and Spanish, statically rendered |
| UI | [React 19](https://react.dev), [Tailwind CSS 4](https://tailwindcss.com), [Geist](https://vercel.com/font) |
| Language | [TypeScript](https://www.typescriptlang.org) (strict) |
| Database | [Supabase](https://supabase.com) (Postgres + Row Level Security) |
| Email | [Resend](https://resend.com) |
| CV | [@react-pdf/renderer](https://react-pdf.org) — a PDF per language, built with the site |
| Anti-spam | [Google reCAPTCHA v3](https://developers.google.com/recaptcha/docs/v3) — invisible, score-based |
| Hosting & monitoring | [Vercel](https://vercel.com), Vercel Analytics, Speed Insights |
| CI | GitHub Actions — lint, tests and build on every branch push |

## 📨 How the contact form works

```mermaid
sequenceDiagram
    participant V as Visitor
    participant F as ContactForm
    participant A as /api/contact
    participant G as reCAPTCHA
    participant S as Supabase
    participant R as Resend

    V->>F: fills the form
    F->>F: validate fields
    F->>G: execute action "contact"
    G-->>F: token
    F->>A: POST name, email, subject, message, token
    A->>A: validate fields, discard honeypot hits
    A->>G: verify token
    G-->>A: success, action, score
    A->>A: check action = contact, score ≥ 0.5
    A->>S: insert message (status: pending)
    A->>R: send notification email (reply-to: visitor)
    A->>S: update status: sent / failed
    A-->>F: 200 / error
    F-->>V: toast, field errors or email fallback
```

A daily [Vercel Cron](https://vercel.com/docs/cron-jobs) (`vercel.json` → `/api/cron/contact`)
retries the notifications that were not sent, up to five times.

The rate limit is not in the code: a [Vercel Firewall](https://vercel.com/docs/vercel-firewall/vercel-waf/custom-rules)
rule limits `POST /api/contact` to 5 requests per minute per IP and answers 429 before the
request reaches the function. Create it in the project's Firewall tab, or with the CLI:

```bash
vercel firewall rules add "Rate limit contact form" \
  --condition '{"type":"path","op":"eq","value":"/api/contact"}' \
  --condition '{"type":"method","op":"eq","value":"POST"}' \
  --action rate_limit --rate-limit-requests 5 --rate-limit-window 60 --rate-limit-keys ip
vercel firewall publish
```

## 🚀 Getting started

**Prerequisites:** Node.js 26 (the version `package.json` asks for), npm, and accounts for Supabase, Resend and Google reCAPTCHA
(a **v3** key, managed from a Google Cloud project, with `localhost` among its domains to test locally).

```bash
git clone https://github.com/moilolon/portfolio.git
cd portfolio
npm install
```

Create `.env.local` at the root:

```bash
# Public — shipped to the browser
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=

# Server only
SUPABASE_URL=
SUPABASE_SECRET_KEY=
RESEND_API_KEY=
RECAPTCHA_SECRET_KEY=
NOTIFICATION_EMAIL=
```

On Vercel, also set `CRON_SECRET` (any long random string): Vercel Cron sends it to
`/api/cron/contact`, which rejects every call without it.

Apply the migrations in [`supabase/migrations/`](supabase/migrations) to your project
(`supabase db push`, or paste them in the SQL editor), then:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command | Does |
|---|---|
| `npm run dev` | Dev server with Turbopack |
| `npm run build` | Production build (also the type check) |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint (`next/core-web-vitals` + `next/typescript` + ESLint Stylistic); `-- --fix` formats |
| `npm test` | Unit tests with the Node test runner |

## 🧩 Make it yours

The content is data, not markup — edit these files and the sections follow:

| To change | Edit |
|---|---|
| Name, role, links, avatar | [`src/content/profile.json`](src/content/profile.json), `public/avatar.jpg` |
| Phone and birth date of the CV | [`src/content/cv.json`](src/content/cv.json) |
| Technologies and daily / past usage | [`src/content/technologies.json`](src/content/technologies.json); colors and icons in [`src/lib/constants/technologies.tsx`](src/lib/constants/technologies.tsx) |
| Jobs (summary, key points, technologies) | [`src/content/experience.json`](src/content/experience.json) |
| Projects (newest first) | [`src/content/projects.json`](src/content/projects.json), images in `public/projects/` |
| Education and courses, languages | [`src/content/training.json`](src/content/training.json), [`src/content/languages.json`](src/content/languages.json) |
| About me | [`src/content/about.json`](src/content/about.json) |
| Page title and description | the `metadata` texts of [`src/messages/`](src/messages); the rest of the SEO in [`src/app/[locale]/layout.tsx`](src/app/%5Blocale%5D/layout.tsx) |
| Colors, light/dark theme and animations | [`src/app/globals.css`](src/app/globals.css) |

Every text is written in English and Spanish, side by side: `"title": { "en": "…", "es": "…" }`.
The texts of the interface (menu, headings, form) are in [`src/messages/`](src/messages), one file per language.

The CV is not a file you upload: `/cv/curriculum_en.pdf` and `/cv/curriculum_es.pdf` are generated
from this same content on every build, laid out by [`src/lib/cv/CvDocument.tsx`](src/lib/cv/CvDocument.tsx).

Technologies in jobs and projects are referenced by name and must exist in `technologies.json`;
`technologies.tsx` sets their chip color. The ones marked `"usage": "daily"` become the quick filters of the Projects section.

## 🏗 Project structure

```text
src/
├── app/
│   ├── api/contact/route.ts   # contact endpoint
│   ├── cv/[file]/route.tsx    # the CV as a PDF, one per language
│   ├── api/cron/contact/      # daily retry of the unsent contact notifications
│   ├── [locale]/              # layout (fonts, metadata, analytics) and page, as /en and /es
│   └── globals.css            # Tailwind, theme variables, animations
├── components/
│   ├── sections/              # Information, Technologies, Experience, Projects, Training, AboutMe
│   ├── layouts/               # Navbar, with the site switcher shared with moilolon.com
│   ├── forms/ · modals/ · ui/ # ContactForm, ContactModal, Modal, Toast, ThemeToggle
│   └── icons/                 # SVG icons, grouped by section
├── content/                   # the site's content, as JSON, in both languages
├── messages/                  # the interface texts, one file per language
├── i18n/ · proxy.ts           # next-intl setup and the redirect to /en or /es
├── lib/
│   ├── constants/             # typed content, joined with icons and colors
│   ├── contact.ts             # contact form rules shared by the form and the API
│   ├── supabase/ · resend/    # service clients, notification email
│   ├── recaptcha.ts           # reCAPTCHA v3 loader
│   ├── theme.ts               # theme init script (runs before paint)
│   └── colors.ts              # chip color helper
└── types/                     # content types
supabase/migrations/           # database schema
```

## 🗺 Roadmap

- [x] All portfolio sections, responsive and animated
- [x] Contact form with reCAPTCHA, Supabase and Resend
- [x] Vercel Analytics and Speed Insights
- [x] Manual light/dark toggle
- [x] Filter projects by technology
- [x] Spanish version
- [x] CV generated from the content, in both languages
- [ ] Blog section

## 🤖 Built with Claude Code and Zed

Developed with [Claude Code](https://docs.claude.com/en/docs/claude-code) in [Zed](https://zed.dev):

- [`CLAUDE.md`](CLAUDE.md) — project memory: stack, architecture, commands and conventions.
- [`.claude/rules/`](.claude/rules) — rules read on demand (Next.js, Supabase, git, files, docs).
- [`.claude/settings.json`](.claude/settings.json) — shared permissions; `.env*` files are never readable.
- [`.zed/`](.zed) — editor settings, tasks and debugger, see [`.zed/README.md`](.zed/README.md).

## 🫂 Contributors

<a href="https://github.com/moilolon/portfolio/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=moilolon/portfolio" alt="Contributors" />
</a>

<div align="center">
<br />

Made with ☕ in A Coruña · [portfolio.moilolon.com](https://portfolio.moilolon.com)

</div>
