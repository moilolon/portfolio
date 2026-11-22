// A relative import with its extension, so the tests can load this file with plain Node
import { LOCALES, type Locale } from './i18n.ts';

// The language is shared with the other sites under moilolon.com through a cookie of the
// whole domain, like the theme (src/lib/theme.ts). The proxy (src/proxy.ts) reads it to choose the
// language of a URL without one.
export const LANG_COOKIE = 'moilolon-lang';
const SHARED_DOMAIN = 'moilolon.com';

export const isLocale = (value: unknown): value is Locale => LOCALES.includes(value as Locale);

// Whether a path already says its language: /es or /es/anything, but not /español
export const hasLanguage = (pathname: string) =>
  LOCALES.some((locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`));

// Where the shared cookie sends a request, or null when it has no say: the path already
// has a language (a URL always wins), or the cookie is missing or is not a language.
export function sharedLanguagePath(pathname: string, cookie: string | undefined): string | null {
  if (hasLanguage(pathname) || !isLocale(cookie)) {
    return null;
  }
  return `/${cookie}${pathname === '/' ? '' : pathname}`;
}

// Saves the language the visitor chose. On the published domain the cookie reaches the
// other sites too; anywhere else (localhost, a preview) it stays on this host.
export function saveLang(locale: Locale) {
  const host = window.location.hostname;
  const shared = host === SHARED_DOMAIN || host.endsWith(`.${SHARED_DOMAIN}`);
  const scope = shared ? `; domain=.${SHARED_DOMAIN}; secure` : '';
  document.cookie = `${LANG_COOKIE}=${locale}${scope}; path=/; max-age=31536000; samesite=lax`;
}
