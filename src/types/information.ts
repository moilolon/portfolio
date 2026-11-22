import type { ReactElement } from 'react';

export type SocialLink = {
  // Also the key of its label in the messages: "information.<id>"
  id: 'email' | 'resume' | 'github' | 'linkedin';
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
  github: string;
  linkedin: string;
  socials: SocialLink[];
};
