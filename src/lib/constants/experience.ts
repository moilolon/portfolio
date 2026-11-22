import content from '@/content/experience.json';
import { findTechnologies } from './technologies';
import type { Experience } from '@/types/experience';

// The jobs are content: src/content/experience.json (newest first)
export const experiences: Experience[] = content.map((experience) => ({
  ...experience,
  technologies: findTechnologies(experience.technologies),
}));
