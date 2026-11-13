export type Theme = 'light' | 'dark';

export const THEME_STORAGE_KEY = 'theme';

// The theme is shared with the other sites under moilolon.com through a cookie of the
// whole domain. It wins over the choice saved in this browser for this site alone.
export const THEME_COOKIE = 'moilolon-theme';
const SHARED_DOMAIN = 'moilolon.com';

// Runs before the first paint (inlined in <head>) so the page never flashes the wrong theme.
// Uses the shared cookie, then the saved choice, otherwise the system preference.
export const themeInitScript = `(function () {
  try {
    var shared = document.cookie.match(/(?:^|; )${THEME_COOKIE}=([^;]*)/);
    var theme = shared ? shared[1] : localStorage.getItem('${THEME_STORAGE_KEY}');
    if (theme !== 'light' && theme !== 'dark') {
      theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    document.documentElement.dataset.theme = theme;
  } catch (e) {
    document.documentElement.dataset.theme = 'light';
  }
})();`;

// Saves the choice for this site and, on the published domain, for the other sites too.
export function saveTheme(theme: Theme) {
  const host = window.location.hostname;
  if (host === SHARED_DOMAIN || host.endsWith(`.${SHARED_DOMAIN}`)) {
    document.cookie = `${THEME_COOKIE}=${theme}; domain=.${SHARED_DOMAIN}; path=/; max-age=31536000; samesite=lax; secure`;
  }
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Storage can be unavailable (private mode); the theme still applies for this visit
  }
}
