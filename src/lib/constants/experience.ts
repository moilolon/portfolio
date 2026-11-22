import content from '@/content/experience.json';
import { findTechnologies } from './technologies';
import { localize, type Locale } from '@/lib/i18n';
import type { Experience } from '@/types/experience';

// The jobs are content: src/content/experience.json (newest first)
export function getExperiences(locale: Locale): Experience[] {
  return localize(content, locale).map((experience) => ({
    ...experience,
    technologies: findTechnologies(experience.technologies),
  }));
}
