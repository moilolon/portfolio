import content from '@/content/projects.json';
import { findTechnologies } from './technologies';
import { localize, type Locale } from '@/lib/i18n';
import type { Project } from '@/types/projects';

// The projects are content: src/content/projects.json (newest first)
export function getProjects(locale: Locale): Project[] {
  return localize(content, locale).map((project) => ({
    ...project,
    technologies: findTechnologies(project.technologies),
  }));
}
