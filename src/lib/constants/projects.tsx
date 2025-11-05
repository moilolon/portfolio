import { technologies } from './technologies';
import type { Project } from '@/types/projects';
import type { Technology } from '@/types/technologies';

const mapTechnology = (name: string): Technology => {
  const found = technologies.flatMap(cat => cat.items).find(t => t.name === name);
  if (!found) {
    throw new Error(`Technology "${name}" not found in technologies`);
  }
  return {
    name: found.name,
    color: found.color
  };
};

export const projects: Project[] = [
  {
    name: 'My Portfolio',
    owner: 'Personal Project',
    summary: 'A personal portfolio website to showcase skills, experience, and projects.',
    description: 'A responsive portfolio website to showcase skills, experience, and projects. Features smooth scrolling, dark mode, and contact form integration.',
    technologies: ['Next.js', 'Tailwind CSS', 'TypeScript', 'Supabase', 'Resend', 'Google reCAPTCHA', 'Vercel'].map(mapTechnology),
    image: '/projects/portfolio.png',
    links: {
      github: 'https://github.com/moilolon/portfolio',
      live: 'https://portfolio.moilolon.com',
    },
  },
  {
    name: 'Flexia',
    owner: 'Altia',
    summary: 'System designed for processing files in public administration seamlessly.',
    description: 'Software development in the realm of public administration, involving tasks leveraging expertise in object-oriented design and software design patterns. The software development was accomplished using technologies from the J2EE platform. It integrates various electronic services provided by the government, including FACe and the document management platform Alfresco.',
    technologies: ['Java', 'Spring', 'JSP', 'JavaScript', 'REST', 'Maven', 'HTML5', 'CSS3'].map(mapTechnology),
    image: '/projects/altia.png',
    links: {},
  },
  {
    name: 'PDF generator for electronic tickets in the Inditex stores',
    owner: 'atSistemas',
    summary: 'The application facilitates the generation of PDF electronic tickets for stores within the Inditex group.',
    description: 'Software development in the checkout sector for stores within the Inditex group focuses on integration projects, involving tasks leveraging expertise in object-oriented design and software patterns. It seamlessly integrates various services from the cash registers of Inditex group stores, enhancing operational efficiency and oversight. Additionally, software development was accomplished using technologies from the J2EE platform.',
    technologies: ['Java', 'Spring', 'JSP', 'JavaScript', 'REST', 'Maven', 'HTML5', 'CSS3'].map(mapTechnology),
    image: '/projects/inditex.png',
    links: {},
  },
  {
    name: 'Electronic tickets generation in PDF',
    owner: 'University of A Coruña',
    summary: 'Design and implementation of a Java web application to facilitate the generation of electronic tickets in PDF format.',
    description: 'The design and implementation of a Java web application, leveraging the MVC architecture, was focused on streamlining the generation of electronic tickets in PDF format. The project encompasses several key features, including ticket generation, a user-friendly interface, and robust data validation. This application empowers users to create and download electronic tickets in PDF format, ensuring adherence to legal requirements.',
    technologies: ['Java', 'Spring', 'JSP', 'JavaScript', 'REST', 'Maven', 'HTML5', 'CSS3'].map(mapTechnology),
    image: '/projects/udc.png',
    links: {},
  },
  {
    name: 'Store closure viewer in the Inditex Store Management Terminals',
    owner: 'atSistemas',
    summary: 'The application enables users to view store closures within the Store Management Terminals (TGT) of the Inditex group.',
    description: 'Software development in the checkout sector for stores within the Inditex group focuses on integration projects, involving tasks leveraging expertise in object-oriented design and software patterns. It seamlessly integrates various services from the cash registers of Inditex group stores, enhancing operational efficiency and oversight. Additionally, software development was accomplished using technologies from the J2EE platform.',
    technologies: ['Java', 'Spring', 'JSP', 'JavaScript', 'REST', 'Maven', 'HTML5', 'CSS3'].map(mapTechnology),
    image: '/projects/inditex.png',
    links: {},
  },
  {
    name: 'Customer Relationship Management',
    owner: 'Indra',
    summary: 'Project centres on enhancements to Jazztel\'s CRM system.',
    description: 'Software development leveraging J2EE platform technologies that encompasses a range of powerful tools and frameworks which facilitate dependency injection and transaction management. The development process also utilized JavaScript and Maven for project management. Furthermore, SOAP Web Services, alongside Oracle, SQL, and PL/SQL, play crucial roles in data handling and integration within applications.',
    technologies: ['Java', 'JPA', 'Hibernate', 'Spring', 'JSP', 'JavaScript', 'Maven', 'Web Services', 'Oracle', 'SQL'].map(mapTechnology),
    image: '/projects/jazztel.png',
    links: {},
  },
  {
    name: 'In-TIC Portal',
    owner: 'University of A Coruña',
    summary: 'The sharing of experiences and resources related to the In-TIC project.',
    description: 'The design and implementation of a .NET web application utilizing MVC architecture aims to facilitate the exchange of experiences and resources for the In-TIC project. It includes features such as user authentication, resource sharing, and a user-friendly interface.',
    technologies: ['ASP.NET Core', 'Entity Framework Core', 'SQL Server', 'HTML5', 'CSS3'].map(mapTechnology),
    image: '/projects/in-tic.png',
    links: {
      live: 'https://proyectosfundacionorange.es/intic',
    },
  },
];
