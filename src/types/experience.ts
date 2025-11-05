import type { Technology } from './technologies';

export type ExperienceTechnology = Pick<Technology, 'name' | 'color'>;

export type Experience = {
  company: string;
  title: string;
  period: string;
  description: string;
  technologies: ExperienceTechnology[];
};
