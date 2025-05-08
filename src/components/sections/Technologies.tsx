'use client';

import { useState } from 'react';

// Define technology categories and items
const technologies = [
  {
    category: 'Frontend',
    items: [
      { name: 'React', icon: '⚛️', level: 90 },
      { name: 'Next.js', icon: '▲', level: 85 },
      { name: 'TypeScript', icon: '𝐓𝐒', level: 80 },
      { name: 'Tailwind CSS', icon: '🌊', level: 95 },
      { name: 'JavaScript', icon: '𝐉𝐒', level: 90 },
      { name: 'HTML5', icon: '🌐', level: 95 },
      { name: 'CSS3', icon: '🎨', level: 90 },
    ],
  },
  {
    category: 'Backend',
    items: [
      { name: 'Node.js', icon: '🟢', level: 85 },
      { name: 'Express', icon: '🚂', level: 80 },
      { name: 'Supabase', icon: '⚡', level: 75 },
      { name: 'PostgreSQL', icon: '🐘', level: 70 },
      { name: 'MongoDB', icon: '🍃', level: 75 },
      { name: 'GraphQL', icon: '◯', level: 65 },
    ],
  },
  {
    category: 'DevOps & Tools',
    items: [
      { name: 'Git', icon: '🔄', level: 85 },
      { name: 'Docker', icon: '🐳', level: 70 },
      { name: 'GitHub Actions', icon: '🔄', level: 75 },
      { name: 'Vercel', icon: '▲', level: 90 },
      { name: 'VS Code', icon: '📝', level: 95 },
      { name: 'Jest', icon: '🃏', level: 80 },
    ],
  },
];

export default function Technologies() {
  const [activeCategory, setActiveCategory] = useState(technologies[0].category);

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
              className={`px-6 py-3 rounded-full text-sm font-medium transition-colors ${
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
            ?.items.map((item) => (
              <div
                key={item.name}
                className="bg-background rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-2xl">{item.icon}</div>
                  <h3 className="text-xl font-semibold">{item.name}</h3>
                </div>

                <div className="w-full bg-foreground/10 rounded-full h-2.5">
                  <div
                    className="bg-foreground h-2.5 rounded-full"
                    style={{ width: `${item.level}%` }}
                  ></div>
                </div>
                <div className="mt-2 text-sm text-foreground/70 text-right">
                  Proficiency: {item.level}%
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
