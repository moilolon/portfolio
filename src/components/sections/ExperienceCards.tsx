'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ChevronIcon } from '@/components/icons/experience';
import type { Experience } from '@/types/experience';
import { tint } from '@/lib/colors';

interface ExperienceCardsProps {
  experiences: Experience[];
}

export default function ExperienceCards({ experiences }: ExperienceCardsProps) {
  const t = useTranslations('experience');
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section id="experience" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">{t('title')}</h2>

        <div className="space-y-8">
          {experiences.map((exp: Experience, index) => (
            <div
              key={index}
              className={`bg-card dark:border dark:border-border rounded-lg p-6 shadow-sm transition-all duration-300 ${
                expandedIndex === index ? 'ring-2 ring-foreground/20' : 'hover:shadow-md'
              }`}
            >
              {/* A heading that is a button: reachable with the keyboard and announced as expandable */}
              <h3>
                <button
                  type="button"
                  onClick={() => toggleExpand(index)}
                  aria-expanded={expandedIndex === index}
                  aria-controls={`experience-${index}`}
                  className="flex w-full flex-col sm:flex-row sm:items-center justify-between text-left cursor-pointer rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500"
                >
                  <span>
                    <span className="block text-xl font-semibold">{exp.title}</span>
                    <span className="block text-lg text-foreground/80">{exp.company}</span>
                  </span>
                  <span className="flex items-center mt-2 sm:mt-0">
                    <span className="text-sm text-foreground/60">{exp.period}</span>
                    <span className={`ml-2 transition-transform ${expandedIndex === index ? 'rotate-180' : ''}`}>
                      <ChevronIcon />
                    </span>
                  </span>
                </button>
              </h3>

              {expandedIndex === index && (
                <div id={`experience-${index}`} className="mt-4 pt-4 border-t border-foreground/10 animate-fadeIn">
                  <p className="mb-3">{exp.description}</p>
                  <ul className="mb-4 pl-5 list-disc space-y-1 text-foreground/80 marker:text-foreground/40">
                    {exp.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech.name}
                        className="px-3 py-1 rounded-full text-sm transition-colors"
                        style={{
                          backgroundColor: tint(tech.color),
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
