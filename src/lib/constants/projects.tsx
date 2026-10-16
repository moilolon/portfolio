import { technologies } from './technologies';
import type { Project } from '@/types/projects';
import type { Technology } from '@/types/technologies';

const mapTechnology = (name: string): Technology => {
  const found = technologies.flatMap((cat) => cat.items).find((t) => t.name === name);
  if (!found) {
    throw new Error(`Technology "${name}" not found in technologies`);
  }
  return {
    name: found.name,
    color: found.color,
  };
};

export const projects: Project[] = [
  {
    name: 'Guess e-commerce',
    owner: '3MT Global Services',
    summary: 'Online stores for Guess and Rag & Bone in Europe and North America, built on Salesforce Commerce Cloud.',
    highlights: [
      'Backend: controllers, models, OCAPI/SCAPI hooks, jobs and services.',
      'Frontend: ISML templates, Web Components and SASS.',
      'Third-party integrations for payments, search, tax, fraud and CRM through REST APIs.',
      'Continuous integration, unit tests and code reviews as part of the workflow.',
      'AI-assisted development with Claude Code applied across the development lifecycle.',
    ],
    technologies: ['Salesforce Commerce Cloud', 'Node.js', 'JavaScript', 'ISML', 'jQuery', 'SASS', 'REST', 'GitHub Actions', 'Azure AI Foundry', 'Claude Code'].map(mapTechnology),
    image: '/projects/guess.png',
    links: {
      live: 'https://www.guess.com',
    },
  },
  {
    name: 'My Portfolio',
    owner: 'Personal Project',
    summary: 'A personal portfolio website to showcase skills, experience, and projects.',
    highlights: [
      'Light and dark themes that follow the system preference, with a manual toggle.',
      'Projects filterable by technology.',
      'Contact form stored in Supabase, with email notifications through Resend and Google reCAPTCHA protection.',
      'Deployed on Vercel with Analytics and Speed Insights.',
      'Developed with Claude Code as AI pair programmer.',
    ],
    technologies: ['Next.js', 'Tailwind CSS', 'TypeScript', 'Supabase', 'Resend', 'Google reCAPTCHA', 'Vercel', 'Claude Code'].map(mapTechnology),
    image: '/projects/portfolio-logo.svg',
    links: {
      github: 'https://github.com/moilolon/portfolio',
      live: 'https://portfolio.moilolon.com',
    },
  },
  {
    name: 'Flexia',
    owner: 'Altia',
    summary: 'Electronic case-processing system for public administration.',
    highlights: [
      'Object-oriented design applying software design patterns.',
      'Integration with government e-services such as FACe.',
      'Document management through the Alfresco platform.',
      'Reports and documents generated with JasperReports.',
    ],
    technologies: ['Java', 'Spring', 'JSP', 'JavaScript', 'Web Services', 'Maven'].map(mapTechnology),
    image: '/projects/altia.png',
    links: {},
  },
  {
    name: 'PDF generator for electronic tickets in the Inditex stores',
    owner: 'atSistemas',
    summary: 'The application facilitates the generation of PDF electronic tickets for stores within the Inditex group.',
    highlights: [
      'Generates electronic tickets in PDF format from the store till services.',
      'Built on the J2EE platform with Spring and Hibernate.',
      'Object-oriented design applying software patterns.',
    ],
    technologies: ['Java', 'Spring', 'Hibernate', 'JSP', 'JavaScript', 'Maven', 'Web Services'].map(mapTechnology),
    image: '/projects/inditex.png',
    links: {},
  },
  {
    name: 'Store closure viewer in the Inditex Store Management Terminals',
    owner: 'atSistemas',
    summary: 'The application enables users to view store closures within the Store Management Terminals (TGT) of the Inditex group.',
    highlights: [
      'Lets store staff review the store closures from the Store Management Terminals (TGT).',
      'Gathers the closure data from the store tills through web services.',
      'Built on the J2EE platform with Spring and Hibernate.',
    ],
    technologies: ['Java', 'Spring', 'Hibernate', 'JSP', 'JavaScript', 'Maven', 'Web Services'].map(mapTechnology),
    image: '/projects/inditex.png',
    links: {},
  },
  {
    name: 'Customer Relationship Management',
    owner: 'Indra',
    summary: 'Evolutive and corrective development of Jazztel\'s CRM system.',
    highlights: [
      'Spring for dependency injection, transaction management and JMS messaging.',
      'Persistence with JPA and Hibernate on Oracle, plus SQL and PL/SQL procedures.',
      'Scheduled jobs with Quartz.',
      'Web layer with Servlets, JSP and Struts, integrated through SOAP web services.',
    ],
    technologies: ['Java', 'Spring', 'JPA', 'Hibernate', 'JSP', 'JavaScript', 'Maven', 'Web Services', 'Oracle', 'PL/SQL'].map(mapTechnology),
    image: '/projects/jazztel.png',
    links: {},
  },
];
