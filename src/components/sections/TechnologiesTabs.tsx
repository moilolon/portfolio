'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import type { Technology, TechnologyCategory, TechnologyUsage } from '@/types/technologies';

const usageGroups: TechnologyUsage[] = ['daily', 'experienced'];

interface TechnologiesTabsProps {
  technologies: TechnologyCategory[];
}

export default function TechnologiesTabs({ technologies }: TechnologiesTabsProps) {
  const t = useTranslations('technologies');
  // The position, not the name: the name of a category changes with the language
  const [activeIndex, setActiveIndex] = useState(0);

  const hasIconAndUsage = (item: Technology): item is Technology & { icon: NonNullable<Technology['icon']>; usage: TechnologyUsage } => {
    return Boolean(item.icon && item.usage);
  };

  const items = technologies[activeIndex].items.filter(hasIconAndUsage);

  return (
    <section id="technologies" className="py-20 bg-foreground/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">{t('title')}</h2>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {technologies.map((tech, index) => (
            <button
              key={tech.category}
              onClick={() => setActiveIndex(index)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-colors disabled:cursor-not-allowed cursor-pointer ${
                activeIndex === index
                  ? 'bg-foreground text-background'
                  : 'bg-foreground/10 hover:bg-foreground/20'
              }`}
            >
              {tech.category}
            </button>
          ))}
        </div>

        {/* Technology Items grouped by usage */}
        <div className="space-y-10">
          {usageGroups.map((usage) => {
            const groupItems = items.filter((item) => item.usage === usage);
            if (groupItems.length === 0) {
              return null;
            }

            return (
              <div key={usage}>
                <h3 className="text-lg font-semibold mb-4 text-foreground/70">{t(usage)}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {groupItems.map((item) => (
                    <div
                      key={item.name}
                      className="flex items-center gap-4 bg-card rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow border-l-4 dark:border-y dark:border-r dark:border-border"
                      style={{ borderLeftColor: item.color }}
                    >
                      <div className="relative h-8 w-8">
                        {item.icon}
                      </div>
                      <h4 className="text-xl font-semibold">{item.name}</h4>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
