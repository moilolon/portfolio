import type { ReactElement } from 'react';

export type TechnologyUsage = 'daily' | 'experienced';

export type Technology = {
  name: string;
  icon?: ReactElement;
  usage?: TechnologyUsage;
  color: string;
};

export type TechnologyCategory = {
  category: string;
  items: Technology[];
};
