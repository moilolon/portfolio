'use client';

import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { GithubIcon, LiveIcon } from '@/components/icons/projects';
import type { Project } from '@/types/projects';
import type { Technology } from '@/types/technologies';
import { tint } from '@/lib/colors';

type TechnologyFilter = Pick<Technology, 'name' | 'color'> & { count: number; quick: boolean };

// Number of technologies shown on each project card before "+N more"
const PREVIEW_TECHNOLOGIES = 3;

// Number of quick filters shown before "Show all": taken from the technologies in daily use
const QUICK_FILTERS = 6;

const filterChipClass = 'px-3 py-1 rounded-full text-sm transition-colors cursor-pointer border';

interface ProjectsGridProps {
  projects: Project[];
  // Names of the technologies marked as daily use in the Technologies section (the current stack)
  dailyTechnologies: string[];
}

export default function ProjectsGrid({ projects, dailyTechnologies }: ProjectsGridProps) {
  const t = useTranslations('projects');
  const [expandedProjects, setExpandedProjects] = useState<string[]>([]);
  const [selectedTechnology, setSelectedTechnology] = useState<string | null>(null);
  const [showAllFilters, setShowAllFilters] = useState(false);

  // Every technology used across the projects, sorted by number of projects; ties go to the most
  // recent project (projects are listed newest first, so first appearance = most recent).
  // The quick filters (daily-use stack) come first so they keep their place when "Show all" is open.
  const technologyFilters = useMemo<TechnologyFilter[]>(() => {
    const filters = new Map<string, TechnologyFilter & { firstSeen: number }>();
    projects.flatMap((project) => project.technologies).forEach((tech, position) => {
      const current = filters.get(tech.name);
      filters.set(tech.name, {
        name: tech.name,
        color: tech.color,
        count: (current?.count ?? 0) + 1,
        quick: false,
        firstSeen: current?.firstSeen ?? position,
      });
    });
    const sorted = [...filters.values()].sort((a, b) => b.count - a.count || a.firstSeen - b.firstSeen);
    const quick = sorted.filter((tech) => dailyTechnologies.includes(tech.name)).slice(0, QUICK_FILTERS);
    const rest = sorted.filter((tech) => !quick.includes(tech));
    return [...quick.map((tech) => ({ ...tech, quick: true })), ...rest];
  }, [projects, dailyTechnologies]);

  const visibleFilters = technologyFilters.filter((tech) =>
    showAllFilters || tech.quick || tech.name === selectedTechnology,
  );
  const hiddenFiltersCount = technologyFilters.length - visibleFilters.length;

  const filteredProjects = selectedTechnology
    ? projects.filter((project) => project.technologies.some((tech) => tech.name === selectedTechnology))
    : projects;

  const toggleTechnology = (name: string) => {
    setSelectedTechnology((current) => (current === name ? null : name));
  };

  return (
    <section id="projects" className="py-20 bg-foreground/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">{t('title')}</h2>

        {/* Technology filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10" role="group" aria-label={t('filterLabel')}>
          <button
            type="button"
            onClick={() => setSelectedTechnology(null)}
            aria-pressed={selectedTechnology === null}
            className={`${filterChipClass} ${
              selectedTechnology === null
                ? 'bg-foreground text-background border-foreground'
                : 'bg-background border-foreground/15 hover:bg-foreground/10'
            }`}
          >
            {t('all', { count: projects.length })}
          </button>
          {visibleFilters.map((tech) => {
            const isSelected = selectedTechnology === tech.name;
            return (
              <button
                key={tech.name}
                type="button"
                onClick={() => toggleTechnology(tech.name)}
                aria-pressed={isSelected}
                className={filterChipClass}
                style={{
                  backgroundColor: tint(tech.color, isSelected ? 30 : 12),
                  borderColor: isSelected ? tech.color : 'transparent',
                  color: tech.color,
                  fontWeight: isSelected ? 600 : undefined,
                }}
              >
                {tech.name} ({tech.count})
              </button>
            );
          })}
          {(hiddenFiltersCount > 0 || showAllFilters) && (
            <button
              type="button"
              onClick={() => setShowAllFilters((current) => !current)}
              className={`${filterChipClass} bg-background border-dashed border-foreground/30 hover:bg-foreground/10`}
            >
              {showAllFilters ? t('showLess') : t('showAll', { count: hiddenFiltersCount })}
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {filteredProjects.map((project: Project) => {
            const isExpanded = expandedProjects.includes(project.name);
            return (
              <div
                key={project.name}
                className="bg-card dark:border dark:border-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative h-48 bg-white">
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold md:line-clamp-2 md:min-h-14" title={project.name}>{project.name}</h3>
                    <span className="text-sm text-foreground/60 shrink-0 ml-4 text-right">{project.owner}</span>
                  </div>

                  <p className="mb-4 md:line-clamp-3 md:min-h-12">{project.summary}</p>

                  <div className="grid grid-cols-2 gap-2 mb-4 sm:flex sm:flex-wrap">
                    {project.technologies.slice(0, PREVIEW_TECHNOLOGIES).map((tech) => (
                      <span
                        key={tech.name}
                        title={tech.name}
                        className="flex items-center justify-center px-3 py-1 rounded-full text-xs leading-tight text-center transition-colors sm:flex-1 sm:basis-0 sm:min-w-fit sm:whitespace-nowrap"
                        style={{
                          backgroundColor: tint(tech.color),
                          color: tech.color,
                        }}
                      >
                        {tech.name}
                      </span>
                    ))}
                    {project.technologies.length > PREVIEW_TECHNOLOGIES && (
                      <span className="flex items-center justify-center px-3 py-1 bg-foreground/10 rounded-full text-xs leading-tight text-center sm:flex-1 sm:basis-0 sm:min-w-fit sm:whitespace-nowrap">
                        {t('more', { count: project.technologies.length - PREVIEW_TECHNOLOGIES })}
                      </span>
                    )}
                  </div>

                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => {
                        setExpandedProjects((prev) =>
                          prev.includes(project.name)
                            ? prev.filter((name) => name !== project.name)
                            : [...prev, project.name],
                        );
                      }}
                      className="text-sm font-medium hover:underline disabled:cursor-not-allowed cursor-pointer"
                    >
                      {isExpanded ? t('viewLess') : t('viewDetails')}
                    </button>

                    <div className="flex gap-3">
                      {project.links.github && (
                        <Link
                          href={project.links.github}
                          target="_blank"
                          aria-label={t('github', { name: project.name })}
                          className="text-foreground/70 hover:text-foreground transition-colors"
                        >
                          <GithubIcon />
                        </Link>
                      )}
                      {project.links.live && (
                        <Link
                          href={project.links.live}
                          target="_blank"
                          aria-label={t('live', { name: project.name })}
                          className="text-foreground/70 hover:text-foreground transition-colors"
                        >
                          <LiveIcon />
                        </Link>
                      )}
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-foreground/10 animate-fadeIn">
                      <ul className="mb-4 pl-5 list-disc space-y-1 text-foreground/80 marker:text-foreground/40">
                        {project.highlights.map((highlight) => (
                          <li key={highlight}>{highlight}</li>
                        ))}
                      </ul>
                      <div className="mb-4">
                        <h4 className="font-medium mb-2">{t('technologiesUsed')}</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech) => (
                            <span
                              key={tech.name}
                              className="px-2 py-1 rounded-full text-xs transition-colors"
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
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
