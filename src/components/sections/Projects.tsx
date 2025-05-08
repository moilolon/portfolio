'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Define projects data
const projects = [
  {
    name: 'E-Commerce Platform',
    owner: 'Tech Innovations Inc.',
    description: 'A full-featured e-commerce platform with product management, shopping cart, payment processing, and order tracking. Implemented responsive design and optimized for performance.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Stripe', 'Supabase'],
    image: '/next.svg', // Placeholder - replace with actual project image
    links: {
      github: 'https://github.com/yourusername/ecommerce-platform',
      live: 'https://ecommerce-platform.example.com',
    },
  },
  {
    name: 'Task Management App',
    owner: 'Personal Project',
    description: 'A productivity application for managing tasks, projects, and deadlines. Features include drag-and-drop organization, priority levels, and data visualization for productivity tracking.',
    technologies: ['React', 'Redux', 'Node.js', 'Express', 'MongoDB'],
    image: '/next.svg', // Placeholder - replace with actual project image
    links: {
      github: 'https://github.com/yourusername/task-manager',
      live: 'https://task-manager.example.com',
    },
  },
  {
    name: 'Weather Dashboard',
    owner: 'WebCraft Agency',
    description: 'An interactive weather dashboard that displays current conditions and forecasts for multiple locations. Integrates with weather APIs and includes data visualization components.',
    technologies: ['JavaScript', 'Chart.js', 'CSS3', 'Weather API'],
    image: '/next.svg', // Placeholder - replace with actual project image
    links: {
      github: 'https://github.com/yourusername/weather-dashboard',
      live: 'https://weather-dashboard.example.com',
    },
  },
  {
    name: 'Portfolio Website',
    owner: 'Personal Project',
    description: 'A responsive portfolio website to showcase skills, experience, and projects. Features smooth scrolling, dark mode, and contact form integration.',
    technologies: ['Next.js', 'Tailwind CSS', 'TypeScript', 'Vercel'],
    image: '/next.svg', // Placeholder - replace with actual project image
    links: {
      github: 'https://github.com/yourusername/portfolio',
      live: 'https://portfolio.example.com',
    },
  },
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  return (
    <section id="projects" className="py-20 bg-foreground/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Projects</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-background rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative h-48 bg-foreground/10">
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold">{project.name}</h3>
                  <span className="text-sm text-foreground/60">{project.owner}</span>
                </div>

                <p className="mb-4 line-clamp-3">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-foreground/10 rounded-full text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-1 bg-foreground/10 rounded-full text-xs">
                      +{project.technologies.length - 3} more
                    </span>
                  )}
                </div>

                <div className="flex justify-between items-center">
                  <button
                    onClick={() => setSelectedProject(selectedProject === index ? null : index)}
                    className="text-sm font-medium hover:underline"
                  >
                    {selectedProject === index ? 'View Less' : 'View Details'}
                  </button>

                  <div className="flex gap-3">
                    <Link
                      href={project.links.github}
                      target="_blank"
                      className="text-foreground/70 hover:text-foreground transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </Link>
                    <Link
                      href={project.links.live}
                      target="_blank"
                      className="text-foreground/70 hover:text-foreground transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd" />
                      </svg>
                    </Link>
                  </div>
                </div>

                {selectedProject === index && (
                  <div className="mt-4 pt-4 border-t border-foreground/10 animate-fadeIn">
                    <p className="mb-4">{project.description}</p>
                    <div className="mb-4">
                      <h4 className="font-medium mb-2">Technologies Used:</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 bg-foreground/10 rounded-full text-xs"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
