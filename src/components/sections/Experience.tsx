'use client';

import { useState } from 'react';

// Define experience data
const experiences = [
  {
    company: 'Tech Innovations Inc.',
    title: 'Senior Frontend Developer',
    period: 'Jan 2022 - Present',
    description: 'Led the development of a complex SPA using React, Next.js, and TypeScript. Implemented CI/CD pipelines and improved performance by 40%. Mentored junior developers and conducted code reviews.',
    technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Jest'],
  },
  {
    company: 'Digital Solutions Ltd.',
    title: 'Full Stack Developer',
    period: 'Mar 2019 - Dec 2021',
    description: 'Developed and maintained multiple web applications using the MERN stack. Collaborated with UX/UI designers to implement responsive designs. Optimized database queries and API endpoints.',
    technologies: ['MongoDB', 'Express', 'React', 'Node.js', 'Redux', 'SCSS'],
  },
  {
    company: 'WebCraft Agency',
    title: 'Junior Web Developer',
    period: 'Jun 2017 - Feb 2019',
    description: 'Created responsive websites for clients across various industries. Implemented frontend designs using HTML, CSS, and JavaScript. Assisted in the development of WordPress themes and plugins.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'WordPress', 'PHP', 'jQuery'],
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
