'use client';

import { useState } from 'react';
import { experiences } from '@/lib/constants/experience';
import { ChevronIcon } from '@/components/icons/experience';
import type { Experience } from '@/types/experience';

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
          {experiences.map((exp: Experience, index) => (
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
                  <div className={`ml-2 transition-transform ${expandedIndex === index ? 'rotate-180' : ''}`}>
                    <ChevronIcon />
                  </div>
                </div>
              </div>

              {expandedIndex === index && (
                <div className="mt-4 pt-4 border-t border-foreground/10 animate-fadeIn">
                  <p className="mb-4">{exp.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech.name}
                        className="px-3 py-1 rounded-full text-sm transition-colors"
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
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
