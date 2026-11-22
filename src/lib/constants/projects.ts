import content from '@/content/projects.json';
import { findTechnologies } from './technologies';
import type { Project } from '@/types/projects';

// The projects are content: src/content/projects.json (newest first)
export const projects: Project[] = content.map((project) => ({
  ...project,
  technologies: findTechnologies(project.technologies),
}));
