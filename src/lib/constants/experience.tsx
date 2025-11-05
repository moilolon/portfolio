import { technologies } from './technologies';
import type { Experience, ExperienceTechnology } from '@/types/experience';

const mapTechnology = (name: string): ExperienceTechnology => {
  const found = technologies.flatMap(cat => cat.items).find(t => t.name === name);
  if (!found) {
    throw new Error(`Technology "${name}" not found in technologies`);
  }
  return {
    name: found.name,
    color: found.color
  };
};

export const experiences: Experience[] = [
  {
    company: '3MT Global Services',
    title: 'Salesforce Developer Analyst',
    period: 'Dec 2019 - Present',
    description: 'Analysis and software development on the Salesforce Commerce Cloud (SFCC) platform for the clothing line brand Guess. Led the creation and development of a sophisticated SFCC site and management of integrations with various systems and applications through API services. Mentored junior developers and conducting thorough code reviews to ensure high-quality standards.',
    technologies: ['Salesforce Commerce Cloud', 'Node.js', 'JavaScript', 'jQuery', 'HTML5', 'CSS3'].map(mapTechnology),
  },
  {
    company: 'Altia',
    title: 'Java Developer Analyst',
    period: 'Feb 2019 - Nov 2019',
    description: 'Analysis and software development in the realm of public administration, involving conducting analytical tasks by leveraging expertise in object-oriented design and software design patterns. The software development was accomplished using technologies from the J2EE platform.',
    technologies: ['Java', 'Spring', 'JSP', 'JavaScript', 'Web Services'].map(mapTechnology),
  },
  {
    company: 'atSistemas',
    title: 'Senior Software Engineer',
    period: 'Aug 2016 - Jan 2019',
    description: 'Analysis and software development in the checkout sector for stores within the Inditex group focuses on integration projects, involving conducting analytical tasks leveraging expertise in object-oriented design and software patterns. Additionally, software development was accomplished using technologies from the J2EE platform.',
    technologies: ['Java', 'Spring', 'Hibernate', 'JSP', 'JavaScript', 'Maven', 'Web Services'].map(mapTechnology),
  },
  {
    company: 'Indra',
    title: 'Software Engineer',
    period: 'May 2014 - Jul 2016',
    description: 'Software development leveraging J2EE platform technologies that encompasses a range of powerful tools and frameworks which facilitate dependency injection and transaction management. The development process also utilized JavaScript and Maven for project management. Furthermore, SOAP Web Services, alongside Oracle, SQL, and PL/SQL, play crucial roles in data handling and integration within applications.',
    technologies: ['Java', 'JPA', 'Hibernate', 'Spring', 'JSP', 'JavaScript', 'Maven', 'Web Services', 'Oracle', 'SQL'].map(mapTechnology),
  },
];
