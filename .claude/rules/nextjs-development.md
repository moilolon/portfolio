# Next.js Development

## Where a change goes

| Change | File |
| ------ | ---- |
| A job, project, technology, degree, course, language, personal detail or About me text | `src/content/<section>.json`, typed by `src/types/<section>.ts` |
| The color or icon of a technology, the look of the quick links | `src/lib/constants/technologies.tsx`, `information.tsx` (adapters over `src/content/`) |
| A project screenshot or the avatar | `public/projects/`, `public/avatar.jpg` |
| What the CV says | the same `src/content/` files; phone and birth date in `src/content/cv.json` |
| How the CV looks, its section titles | `src/lib/cv/CvDocument.tsx`, the `cv` namespace of `src/messages/` |
| How a section looks or behaves | `src/components/sections/<Section>.tsx` |
| A new section | a component in `sections/` rendering `<section id="…">`, added to `src/app/page.tsx`, and a link in `Navbar.tsx` |
| An icon | `src/components/icons/<section>/<Name>Icon.tsx`, exported from that folder's `index.ts` |
| A text of the interface (menu, heading, button, error) | `src/messages/en.json` **and** `es.json`, read with `useTranslations()` |
| Colors, theme variables, keyframes | `src/app/globals.css` |
| Metadata / SEO, fonts, analytics | `src/app/layout.tsx` |
| Contact flow | `ContactForm.tsx` (client) → `src/app/api/contact/route.ts` (server); rules shared in `src/lib/contact.ts`, email in `src/lib/resend/contact.ts` |

Content is JSON without presentation: keep Tailwind classes, colors and icons out of
`src/content/` and join them by name in `src/lib/constants/`. The build fails when a job or
project names a technology missing from `technologies.json`, or one without a style.

Every text of the content is an object with one string per language, `{ "en": "…", "es": "…" }`,
never a bare string: add both when adding content. `localize()` in `src/lib/i18n.ts` picks one
language, and the adapters expose it as `get<Section>(locale)`. Things that are not translated
(names of companies and technologies, dates, URLs) stay plain values.

`src/content/cv.json` (phone, birth date) is for the generated CV only: never import it from a
component, or it ships to the browser.

## Languages

- The site is served under `/en` and `/es` with next-intl; both are prerendered
  (`generateStaticParams` + `setRequestLocale` in `src/app/[locale]/`).
- Two kinds of text, two places: **content** (who I am, jobs, projects) in `src/content/` with both
  languages side by side; **interface** texts in `src/messages/<locale>.json`. Never hardcode a
  visible string in a component, not even an `aria-label`.
- In a component: `useTranslations('<namespace>')` for the interface and
  `get<Section>(useLocale())` for the content. Both work in server and client components.
- `src/types/next-intl.d.ts` types the keys after `en.json`: a key missing there fails the build,
  a key missing only in `es.json` does not, so add both at once.
- The language is remembered in the cookie `moilolon-lang`, shared with the other moilolon.com
  sites (`src/lib/lang.ts`), not in next-intl's own cookie, which is turned off. Only the language
  switcher writes it. `src/middleware.ts` reads it for a URL without language and falls back to
  the browser's language. A URL with language always wins.
- Internal links to a page go through `Link` of `src/i18n/navigation.ts`, which adds the
  language; section anchors are plain `<a href="#id">`.
- The contact API answers with codes (`ContactApiError`, `ContactErrorCode` in
  `src/lib/contact.ts`), never with text: the form translates them.

## The CV

- `/cv/curriculum_en.pdf` and `/cv/curriculum_es.pdf` are written by
  `src/app/cv/[file]/route.tsx` at build time (`force-static`) with `@react-pdf/renderer`, from
  the content of the site. Never commit a PDF: change the content and it follows.
- The layout mimics the `classic` style of the LaTeX `moderncv` template it replaced: a narrow
  column of dates, blue section rules, Latin Modern Sans (`src/assets/fonts/`).
- react-pdf is not the DOM: only its own components (`View`, `Text`, `Image`) and a subset of
  CSS in `StyleSheet`, no Tailwind. Pass images as a buffer, not as a Windows path.
- After a change, open both PDFs and read every page: text that grows can move a whole entry
  to the next page, since entries are never split.

## Components

- Function components, default-exported, one per file, `PascalCase.tsx`.
- Props typed with an `interface <Name>Props` next to the component; shared content types go
  in `src/types/`.
- Server components by default. Add `'use client'` only for state, effects, handlers or
  browser APIs — today: Navbar, Experience, Projects, Technologies, ContactForm,
  ContactModal, Modal, Toast, ThemeToggle, LanguageSwitcher.
- Reuse `ui/Modal` and `ui/Toast` instead of writing new overlays or notifications.
- Images through `next/image`; section anchors are `#<id>` links, smoothed by `scroll-smooth`
  on `<html>`.

## Styling

- Tailwind utility classes in the JSX. Tailwind 4 has no config file: tokens and
  `@keyframes` are declared in `globals.css` (`@theme`, CSS variables).
- The theme is `<html data-theme="light|dark">`: the inline script in `src/lib/theme.ts` sets it
  before paint from the cookie shared with the other moilolon.com sites (`moilolon-theme`),
  the saved choice (`localStorage.theme`) or `prefers-color-scheme`, and `ThemeToggle` switches
  it and saves it with `saveTheme()`. The CSS variables in `globals.css` and the `dark:` variant
  (`@custom-variant dark`) follow it; every new color needs its dark counterpart.
- Cards use `bg-card` plus `dark:border dark:border-border` (shadows are invisible in dark).
  Technology colors may be CSS variables (`var(--foreground)`), so tint them with `tint()`
  from `src/lib/colors.ts` instead of appending a hex alpha.
- Mobile first: base classes for small screens, `sm:` / `md:` / `lg:` to grow.

## API routes

- `src/app/api/<name>/route.ts`, exporting the HTTP verb (`POST`) and answering with
  `NextResponse.json(...)` and an explicit status.
- Validate input before any side effect; verify reCAPTCHA server-side with
  `RECAPTCHA_SECRET_KEY`. The key is v3: check `success`, the `action`
  (`RECAPTCHA_CONTACT_ACTION`) and the `score` (≥ 0.5).
- Server secrets (`SUPABASE_SECRET_KEY`, `RESEND_API_KEY`, `RECAPTCHA_SECRET_KEY`,
  `NOTIFICATION_EMAIL`) are read only here, never in a client component.
- Log the error server-side, return a generic message to the client.
- Contact input is validated with `validateContact()` on both sides, and every visitor value is
  escaped before it goes into the HTML of an email (`src/lib/resend/contact.ts`).
- The rate limit of `/api/contact` is a Vercel Firewall rule (`Rate limit contact form`: 5 POST
  per minute per IP, 429), not code: it stops abuse before the function runs. Change it with
  `vercel firewall rules`, not in the route.
- The contact route answers 200 when the message is stored even if the email fails: the daily
  cron (`/api/cron/contact`, authorised with `CRON_SECRET`) retries it.

## Tests

- `npm test` runs `src/**/*.test.ts` with the test runner of Node (`node:test`, `node:assert`):
  no framework and no build step, Node reads the TypeScript directly.
- A test file sits next to what it tests and imports it with its extension
  (`./contact.ts`), which Node requires. For that reason it can only reach modules without
  `@/` imports or JSX: keep the logic worth testing in plain `.ts` files.
- Test the rules, not the framework: validation, content helpers, anything with branches.

## Before calling it done

1. `npm run lint` and `npm test` pass.
2. `npm run build` passes (it is the type check).
3. UI changes checked in the browser at mobile and desktop widths, light and dark.
4. `README.md` updated if a feature or the stack changed.
