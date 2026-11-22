import content from '@/content/profile.json';
import { localize, type Locale } from '@/lib/i18n';
import type { PersonalInfo } from '@/types/information';
import {
  EmailIcon,
  GithubIcon,
  LinkedInIcon,
  ResumeIcon,
} from '@/components/icons/information';

// The address the contact form offers when a message cannot be sent
export const contactEmail = content.email;

// The personal details are content: src/content/profile.json.
// Here goes only how the quick links look: their icon and button colors.
export function getPersonalInfo(locale: Locale): PersonalInfo {
  const profile = localize(content, locale);

  return {
    ...profile,
    socials: [
      {
        name: 'Email',
        icon: <EmailIcon />,
        url: `mailto:${profile.email}`,
        color: 'bg-blue-500 hover:bg-blue-600 text-white',
      },

      {
        name: 'Resume',
        icon: <ResumeIcon />,
        url: profile.cv,
        color: 'bg-gray-200 hover:bg-gray-300 text-gray-900',
      },

      {
        name: 'GitHub',
        icon: <GithubIcon />,
        url: profile.github,
        color: 'bg-gray-800 hover:bg-gray-900 text-white',
      },

      {
        name: 'LinkedIn',
        icon: <LinkedInIcon />,
        url: profile.linkedin,
        color: 'bg-blue-700 hover:bg-blue-800 text-white',
      },
    ],
  };
}
