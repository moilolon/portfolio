'use client';

import { MoonIcon, SunIcon } from '@/components/icons/navigation';
import { THEME_STORAGE_KEY, type Theme } from '@/lib/theme';

export default function ThemeToggle() {
  const toggleTheme = () => {
    const root = document.documentElement;
    const next: Theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Storage can be unavailable (private mode); the theme still applies for this visit
    }
  };

  // Icons are switched with the `dark:` variant, so the server render never mismatches the client
  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="p-2 rounded-md hover:bg-foreground/10 transition-colors cursor-pointer"
      aria-label="Toggle light and dark theme"
      title="Toggle theme"
    >
      <MoonIcon className="h-5 w-5 dark:hidden" />
      <SunIcon className="h-5 w-5 hidden dark:block" />
    </button>
  );
}
