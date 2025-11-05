import type { ReactElement } from 'react';

export type SocialLink = {
  name: string;
  icon: ReactElement;
  url: string;
  color: string;
};

export type PersonalInfo = {
  name: string;
  title: string;
  location: string;
  description: string;
  avatar: string;
  email: string;
  cv: string;
  socials: SocialLink[];
};
