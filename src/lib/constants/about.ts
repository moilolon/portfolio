import content from '@/content/about.json';
import { localize, type Locale } from '@/lib/i18n';
import type { About } from '@/types/about';

// The About me text is content: src/content/about.json
export function getAbout(locale: Locale): About {
  return localize(content, locale);
}
