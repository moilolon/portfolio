import { defineRouting } from 'next-intl/routing';
import { DEFAULT_LOCALE, LOCALES } from '@/lib/i18n';

// Every page lives under its language: /en and /es
export const routing = defineRouting({
  locales: LOCALES,
  defaultLocale: DEFAULT_LOCALE,
  // The language is remembered in the cookie shared with the other moilolon.com sites,
  // which src/lib/lang.ts writes and src/middleware.ts reads, not in next-intl's own cookie
  localeCookie: false,
});
