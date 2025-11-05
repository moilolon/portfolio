'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { projects } from '@/lib/constants/projects';
import { GithubIcon, LiveIcon } from '@/components/icons/projects';
import type { Project } from '@/types/projects';

export default function Projects() {
  const [selectedProjects, setSelectedProjects] = useState<number[]>([]);

  return (
    <section id="projects" className="py-20 bg-foreground/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Projects</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {projects.map((project: Project, index) => (
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

                <p className="mb-4 line-clamp-3">{project.summary}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech.name}
                      className="px-2 py-1 rounded-full text-xs transition-colors"
                      style={{
                        backgroundColor: `${tech.color}20`,
                        color: tech.color,
                      }}
                    >
                      {tech.name}
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
                    onClick={() => {
                      setSelectedProjects(prev =>
                        prev.includes(index)
                          ? prev.filter(i => i !== index)
                          : [...prev, index]
                      );
                    }}
                    className="text-sm font-medium hover:underline disabled:cursor-not-allowed cursor-pointer"
                  >
                    {selectedProjects.includes(index) ? 'View Less' : 'View Details'}
                  </button>

                  <div className="flex gap-3">
                    {project.links.github && (
                      <Link
                        href={project.links.github}
                        target="_blank"
                        className="text-foreground/70 hover:text-foreground transition-colors"
                      >
                        <GithubIcon />
                      </Link>
                    )}
                    {project.links.live && (
                      <Link
                        href={project.links.live}
                        target="_blank"
                        className="text-foreground/70 hover:text-foreground transition-colors"
                      >
                        <LiveIcon />
                      </Link>
                    )}
                  </div>
                </div>

                {selectedProjects.includes(index) && (
                  <div className="mt-4 pt-4 border-t border-foreground/10 animate-fadeIn">
                    <p className="mb-4">{project.description}</p>
                    <div className="mb-4">
                      <h4 className="font-medium mb-2">Technologies Used:</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech.name}
                            className="px-2 py-1 rounded-full text-xs transition-colors"
                            style={{
                              backgroundColor: `${tech.color}20`,
                              color: tech.color,
                            }}
                          >
                            {tech.name}
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
