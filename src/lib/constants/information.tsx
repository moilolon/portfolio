import content from '@/content/profile.json';
import type { PersonalInfo } from '@/types/information';
import {
  EmailIcon,
  GithubIcon,
  LinkedInIcon,
  ResumeIcon,
} from '@/components/icons/information';

// The personal details are content: src/content/profile.json.
// Here goes only how the quick links look: their icon and button colors.
export const personalInfo: PersonalInfo = {
  ...content,
  socials: [
    {
      name: 'Email',
      icon: <EmailIcon />,
      url: `mailto:${content.email}`,
      color: 'bg-blue-500 hover:bg-blue-600 text-white',
    },

    {
      name: 'Resume',
      icon: <ResumeIcon />,
      url: content.cv,
      color: 'bg-gray-200 hover:bg-gray-300 text-gray-900',
    },

    {
      name: 'GitHub',
      icon: <GithubIcon />,
      url: content.github,
      color: 'bg-gray-800 hover:bg-gray-900 text-white',
    },

    {
      name: 'LinkedIn',
      icon: <LinkedInIcon />,
      url: content.linkedin,
      color: 'bg-blue-700 hover:bg-blue-800 text-white',
    },
  ],
};
