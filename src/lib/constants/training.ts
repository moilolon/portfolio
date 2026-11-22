import content from '@/content/training.json';
import languages from '@/content/languages.json';
import { localize, type Locale } from '@/lib/i18n';
import type { Language, Training } from '@/types/training';

// Education and courses are content: src/content/training.json (newest first)
export function getTraining(locale: Locale): Training {
  return localize(content, locale);
}

// The spoken languages are content: src/content/languages.json
export function getLanguages(locale: Locale): Language[] {
  return localize(languages, locale);
}
