import type { Technology } from './technologies';

export type ProjectLinks = {
  github?: string;
  live?: string;
};

export type Project = {
  name: string;
  owner: string;
  summary: string;
  description: string;
  technologies: Technology[];
  image: string;
  links: ProjectLinks;
};
