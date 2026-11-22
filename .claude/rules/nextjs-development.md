# Next.js Development

## Where a change goes

| Change | File |
| ------ | ---- |
| A job, project, technology, degree, course, language, personal detail or About me text | `src/content/<section>.json`, typed by `src/types/<section>.ts` |
| The color or icon of a technology, the look of the quick links | `src/lib/constants/technologies.tsx`, `information.tsx` (adapters over `src/content/`) |
| A project screenshot, the avatar or the CV | `public/projects/`, `public/avatar.jpg`, `public/cv/` |
| How a section looks or behaves | `src/components/sections/<Section>.tsx` |
| A new section | a component in `sections/` rendering `<section id="…">`, added to `src/app/page.tsx`, and a link in `Navbar.tsx` |
| An icon | `src/components/icons/<section>/<Name>Icon.tsx`, exported from that folder's `index.ts` |
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

## Components

- Function components, default-exported, one per file, `PascalCase.tsx`.
- Props typed with an `interface <Name>Props` next to the component; shared content types go
  in `src/types/`.
- Server components by default. Add `'use client'` only for state, effects, handlers or
  browser APIs — today: Navbar, Experience, Projects, Technologies, ContactForm,
  ContactModal, Modal, Toast, ThemeToggle.
- Reuse `ui/Modal` and `ui/Toast` instead of writing new overlays or notifications.
- Images through `next/image`; internal navigation through `next/link`; section anchors are
  `#<id>` links, smoothed by `scroll-smooth` on `<html>`.

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

## Before calling it done

1. `npm run lint` passes.
2. `npm run build` passes (it is the type check).
3. UI changes checked in the browser at mobile and desktop widths, light and dark.
4. `README.md` updated if a feature or the stack changed.
