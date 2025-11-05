'use client';

import { useState } from 'react';
import { technologies } from '@/lib/constants/technologies';
import type { Technology } from '@/types/technologies';

export default function Technologies() {
  const [activeCategory, setActiveCategory] = useState(technologies[0].category);

  const hasIconAndLevel = (item: Technology): item is Technology & { icon: NonNullable<Technology['icon']>, level: NonNullable<Technology['level']> } => {
    return Boolean(item.icon && item.level);
  };

  return (
    <section id="technologies" className="py-20 bg-foreground/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Technologies</h2>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {technologies.map((tech) => (
            <button
              key={tech.category}
              onClick={() => setActiveCategory(tech.category)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-colors disabled:cursor-not-allowed cursor-pointer ${
                activeCategory === tech.category
                  ? 'bg-foreground text-background'
                  : 'bg-foreground/10 hover:bg-foreground/20'
              }`}
            >
              {tech.category}
            </button>
          ))}
        </div>

        {/* Technology Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {technologies
            .find((tech) => tech.category === activeCategory)
            ?.items
            .filter(hasIconAndLevel)
            .map((item) => (
              <div
                key={item.name}
                className="bg-background rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative h-8 w-8">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold">{item.name}</h3>
                  <div className="text-sm text-foreground/70 ml-auto text-right">
                    Proficiency: {item.level}%
                  </div>
                </div>

                <div className="w-full bg-foreground/10 rounded-full h-2.5">
                  <div
                    className="bg-foreground h-2.5 rounded-full"
                    style={{
                      width: `${item.level}%`,
                      backgroundColor: item.color,
                    }}
                  ></div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
