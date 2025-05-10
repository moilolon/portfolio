'use client';

import { useState } from 'react';

// Define experience data
const experiences = [
  {
    company: '3MT Global Services',
    title: 'Salesforce Developer Analyst',
    period: 'Dec 2019 - Present',
    description: 'Analysis and software development on the Salesforce Commerce Cloud (SFCC) platform for the clothing line brand Guess. Led the creation and development of a sophisticated SFCC site and management of integrations with various systems and applications through API services. Mentored junior developers and conducting thorough code reviews to ensure high-quality standards.',
    technologies: ['Salesforce Commerce Cloud', 'Node.js', 'JavaScript', 'jQuery', 'HTML5', 'CSS3'],
  },
  {
    company: 'Altia',
    title: 'Java Developer Analyst',
    period: 'Feb 2019 - Nov 2019',
    description: 'Analysis and software development in the realm of public administration, involving conducting analytical tasks by leveraging expertise in object-oriented design and software design patterns. The software development was accomplished using technologies from the J2EE platform.',
    technologies: ['Java', 'Spring', 'JSP', 'JavaScript', 'Web Services'],
  },
  {
    company: 'atSistemas',
    title: 'Senior Software Engineer',
    period: 'Aug 2016 - Jan 2019',
    description: 'Analysis and software development in the checkout sector for stores within the Inditex group focuses on integration projects, involving conducting analytical tasks leveraging expertise in object-oriented design and software patterns. Additionally, software development was accomplished using technologies from the J2EE platform.',
    technologies: ['Java', 'Spring', 'Hibernate', 'JSP', 'JavaScript', 'Maven', 'Web Services'],
  },
  {
    company: 'Indra',
    title: 'Software Engineer',
    period: 'May 2014 - Jul 2016',
    description: 'Software development leveraging J2EE platform technologies that encompasses a range of powerful tools and frameworks which facilitate dependency injection and transaction management. The development process also utilized JavaScript and Maven for project management. Furthermore, SOAP Web Services, alongside Oracle, SQL, and PL/SQL, play crucial roles in data handling and integration within applications.',
    technologies: ['Java', 'JPA', 'Hibernate', 'Spring', 'JSP', 'JavaScript', 'Maven', 'Web Services', 'Oracle', 'SQL'],
  },
];

export default function Experience() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section id="experience" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Experience</h2>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className={`bg-background rounded-lg p-6 shadow-sm transition-all duration-300 ${
                expandedIndex === index ? 'ring-2 ring-foreground/20' : 'hover:shadow-md'
              }`}
            >
              <div
                className="flex flex-col sm:flex-row sm:items-center justify-between cursor-pointer"
                onClick={() => toggleExpand(index)}
              >
                <div>
                  <h3 className="text-xl font-semibold">{exp.title}</h3>
                  <p className="text-lg text-foreground/80">{exp.company}</p>
                </div>
                <div className="flex items-center mt-2 sm:mt-0">
                  <span className="text-sm text-foreground/60">{exp.period}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-5 w-5 ml-2 transition-transform ${expandedIndex === index ? 'rotate-180' : ''}`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>

              {expandedIndex === index && (
                <div className="mt-4 pt-4 border-t border-foreground/10 animate-fadeIn">
                  <p className="mb-4">{exp.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-foreground/10 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
