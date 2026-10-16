import { technologies } from './technologies';
import type { Experience, ExperienceTechnology } from '@/types/experience';

const mapTechnology = (name: string): ExperienceTechnology => {
  const found = technologies.flatMap((cat) => cat.items).find((t) => t.name === name);
  if (!found) {
    throw new Error(`Technology "${name}" not found in technologies`);
  }
  return {
    name: found.name,
    color: found.color,
  };
};

export const experiences: Experience[] = [
  {
    company: '3MT Global Services',
    title: 'Salesforce Developer Analyst',
    period: 'Dec 2019 - Present',
    description: 'Analyst developer in the Guess e-commerce team, building and maintaining the Guess and Rag & Bone online stores on Salesforce Commerce Cloud (SFRA) for Europe and North America.',
    highlights: [
      'Functional and technical analysis of new features together with the Guess business team.',
      'Backend development on SFCC: controllers, models, OCAPI/SCAPI hooks, jobs and services.',
      'Frontend development with ISML, JavaScript, Web Components and SASS.',
      'Third-party integrations through REST APIs: payments, search, tax, fraud and CRM.',
      'Mentoring junior developers and reviewing code to keep quality standards high.',
      'Improving the development workflow with continuous integration, unit testing and AI-assisted development.',
    ],
    technologies: ['Salesforce Commerce Cloud', 'Node.js', 'JavaScript', 'ISML', 'jQuery', 'SASS', 'REST', 'GitHub Actions', 'Azure AI Foundry', 'Claude Code'].map(mapTechnology),
  },
  {
    company: 'Altia',
    title: 'Java Developer Analyst',
    period: 'Feb 2019 - Nov 2019',
    description: 'Analyst developer in public administration projects, working on Flexia, an electronic case-processing system.',
    highlights: [
      'Object-oriented analysis and design applying software design patterns.',
      'J2EE web development with Spring, JSP and JavaScript.',
      'Integration with e-government services (FACe) and the Alfresco document management platform.',
      'Report and document generation with JasperReports.',
    ],
    technologies: ['Java', 'Spring', 'JSP', 'JavaScript', 'Web Services'].map(mapTechnology),
  },
  {
    company: 'atSistemas',
    title: 'Senior Software Engineer',
    period: 'Aug 2016 - Jan 2019',
    description: 'Software engineer in the checkout area of the Inditex group stores, on integration projects with the point-of-sale systems.',
    highlights: [
      'Object-oriented analysis and design applying software patterns.',
      'PDF electronic ticket generator connected to the store tills.',
      'Store-closure viewer for the Store Management Terminals (TGT).',
      'Backend development with Spring and Hibernate, integrated through web services.',
    ],
    technologies: ['Java', 'Spring', 'Hibernate', 'JSP', 'JavaScript', 'Maven', 'Web Services'].map(mapTechnology),
  },
  {
    company: 'Indra',
    title: 'Software Engineer',
    period: 'May 2014 - Jul 2016',
    description: 'Software engineer on the evolutive and corrective development of the Jazztel CRM.',
    highlights: [
      'J2EE applications with Spring: dependency injection, transaction management and JMS messaging.',
      'Persistence with JPA and Hibernate on Oracle, plus SQL and PL/SQL queries and procedures.',
      'Scheduled jobs with Quartz.',
      'Web layer with Servlets, JSP and Struts, integrated through SOAP web services.',
    ],
    technologies: ['Java', 'Spring', 'JPA', 'Hibernate', 'JSP', 'JavaScript', 'Maven', 'Web Services', 'Oracle', 'PL/SQL'].map(mapTechnology),
  },
];
