import { PersonalInfo } from '@/types/information';
import {
  EmailIcon,
  GithubIcon,
  LinkedInIcon,
  ResumeIcon
} from '@/components/icons/information';


export const personalInfo: PersonalInfo = {
  name: "Moisés López López",
  title: "Salesforce Full Stack Developer",
  location: "A Coruña, Spain",
  description: "Passionate software engineer and full-stack developer with expertise in Salesforce.",
  avatar: "/avatar.jpg",
  email: "moiseslopezlopez@gmail.com",
  cv: "/cv/curriculum_en.pdf",
  socials: [
    {
      name: "Email",
      icon: <EmailIcon />,
      url: "mailto:moiseslopezlopez@gmail.com",
      color: "bg-blue-500 hover:bg-blue-600 text-white"
    },

    {
      name: "Resume",
      icon: <ResumeIcon />,
      url: "/cv/curriculum_en.pdf",
      color: "bg-gray-200 hover:bg-gray-300 text-gray-900"
    },

    {
      name: "GitHub",
      icon: <GithubIcon />,
      url: "https://github.com/moilolon",
      color: "bg-gray-800 hover:bg-gray-900 text-white"
    },

    {
      name: "LinkedIn",
      icon: <LinkedInIcon />,
      url: "https://linkedin.com/in/moilolon",
      color: "bg-blue-700 hover:bg-blue-800 text-white"
    }
  ]
};
