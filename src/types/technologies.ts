import type { ReactElement } from 'react';

export type Technology = {
  name: string;
  icon?: ReactElement;
  level?: number;
  color: string;
};

export type TechnologyCategory = {
  category: string;
  items: Technology[];
};
