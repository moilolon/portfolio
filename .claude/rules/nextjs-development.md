# Next.js Development

## Where a change goes

| Change | File |
| ------ | ---- |
| A job, project, technology or personal detail | `src/lib/constants/<section>.tsx`, typed by `src/types/<section>.ts` |
| A project screenshot, the avatar or the CV | `public/projects/`, `public/avatar.jpg`, `public/cv/` |
| How a section looks or behaves | `src/components/sections/<Section>.tsx` |
| A new section | a component in `sections/` rendering `<section id="…">`, added to `src/app/page.tsx`, and a link in `Navbar.tsx` |
| An icon | `src/components/icons/<section>/<Name>Icon.tsx`, exported from that folder's `index.ts` |
| Colors, theme variables, keyframes | `src/app/globals.css` |
| Metadata / SEO, fonts, analytics | `src/app/layout.tsx` |
| Contact flow | `ContactForm.tsx` (client) → `src/app/api/contact/route.ts` (server) |

## Components

- Function components, default-exported, one per file, `PascalCase.tsx`.
- Props typed with an `interface <Name>Props` next to the component; shared content types go
  in `src/types/`.
- Server components by default. Add `'use client'` only for state, effects, handlers or
  browser APIs — today: Navbar, Experience, Projects, Technologies, ContactForm,
  ContactModal, Modal, Toast.
- Reuse `ui/Modal` and `ui/Toast` instead of writing new overlays or notifications.
- Images through `next/image`; internal navigation through `next/link`; section anchors are
  `#<id>` links, smoothed by `scroll-smooth` on `<html>`.

## Styling

- Tailwind utility classes in the JSX. Tailwind 4 has no config file: tokens and
  `@keyframes` are declared in `globals.css` (`@theme`, CSS variables).
- Dark mode follows `prefers-color-scheme` through the CSS variables in `globals.css`;
  every new color needs its dark counterpart.
- Mobile first: base classes for small screens, `sm:` / `md:` / `lg:` to grow.

## API routes

- `src/app/api/<name>/route.ts`, exporting the HTTP verb (`POST`) and answering with
  `NextResponse.json(...)` and an explicit status.
- Validate input before any side effect; verify reCAPTCHA server-side with
  `RECAPTCHA_SECRET_KEY`.
- Server secrets (`RESEND_API_KEY`, `RECAPTCHA_SECRET_KEY`, `NOTIFICATION_EMAIL`) are read only
  here, never in a client component.
- Log the error server-side, return a generic message to the client.

## Before calling it done

1. `npm run lint` passes.
2. `npm run build` passes (it is the type check).
3. UI changes checked in the browser at mobile and desktop widths, light and dark.
4. `README.md` updated if a feature or the stack changed.
