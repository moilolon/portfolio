import type { Technology } from './technologies';

export type ExperienceTechnology = Pick<Technology, 'name' | 'color'>;

export type Experience = {
  company: string;
  // Shown in the CV only
  location: string;
  title: string;
  period: string;
  description: string;
  highlights: string[];
  technologies: ExperienceTechnology[];
};
