export type Theme = 'light' | 'dark';

export const THEME_STORAGE_KEY = 'theme';

// Runs before the first paint (inlined in <head>) so the page never flashes the wrong theme.
// Uses the saved choice if there is one, otherwise the system preference.
export const themeInitScript = `(function () {
  try {
    var theme = localStorage.getItem('${THEME_STORAGE_KEY}');
    if (theme !== 'light' && theme !== 'dark') {
      theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    document.documentElement.dataset.theme = theme;
  } catch (e) {
    document.documentElement.dataset.theme = 'light';
  }
})();`;
