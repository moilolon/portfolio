import { LOCALES, type Locale } from '@/lib/i18n';

// The language is shared with the other sites under moilolon.com through a cookie of the
// whole domain, like the theme (src/lib/theme.ts). The proxy (src/proxy.ts) reads it to choose the
// language of a URL without one.
export const LANG_COOKIE = 'moilolon-lang';
const SHARED_DOMAIN = 'moilolon.com';

export const isLocale = (value: unknown): value is Locale => LOCALES.includes(value as Locale);

// Saves the language the visitor chose. On the published domain the cookie reaches the
// other sites too; anywhere else (localhost, a preview) it stays on this host.
export function saveLang(locale: Locale) {
  const host = window.location.hostname;
  const shared = host === SHARED_DOMAIN || host.endsWith(`.${SHARED_DOMAIN}`);
  const scope = shared ? `; domain=.${SHARED_DOMAIN}; secure` : '';
  document.cookie = `${LANG_COOKIE}=${locale}${scope}; path=/; max-age=31536000; samesite=lax`;
}
