'use client';

import { useState } from 'react';

// Define technology categories and items
const technologies = [
  {
    category: 'Frontend',
    items: [
      { name: 'Next.js', icon: '▲', level: 25 },
      { name: 'TypeScript', icon: '𝐓𝐒', level: 25 },
      { name: 'Tailwind CSS', icon: '🌊', level: 25 },
      { name: 'JavaScript', icon: '𝐉𝐒', level: 90 },
      { name: 'jQuery', icon: '💻', level: 90 },
      { name: 'HTML5', icon: '🌐', level: 90 },
      { name: 'CSS3', icon: '🎨', level: 90 },
      { name: 'JSP', icon: '📄', level: 90 },
      { name: 'Bootstrap', icon: '🅱️', level: 80},
      { name: 'SASS', icon: '🖌️', level: 80 },
    ],
  },
  {
    category: 'Backend',
    items: [
      { name: 'Node.js', icon: '🟢', level: 90 },
      { name: 'Java', icon: '☕', level: 95 },
      { name: 'Hibernate', icon: '🟡', level: 85 },
      { name: 'Spring', icon: '🌱', level: 85 },
      { name: 'Supabase', icon: '⚡', level: 25 },
      { name: 'Oracle', icon: '🔴', level: 85 },
      { name: 'PostgreSQL', icon: '🐘', level: 75 },
      { name: 'GraphQL', icon: '◯', level: 70 },
    ],
  },
  {
    category: 'DevOps & Tools',
    items: [
      { name: 'Git', icon: '🔄', level: 90 },
      { name: 'GitHub', icon: '😺', level: 95 },
      { name: 'Docker', icon: '🐳', level: 70 },
      { name: 'Vercel', icon: '▲', level: 25 },
      { name: 'Postman', icon: '📬', level: 95 },
      { name: 'VS Code', icon: '📝', level: 95 },
    ],
  },
  {
    category: 'AI & Cloud',
    items: [
      { name: 'Azure AI Foundry', icon: '🔍', level: 50 },
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
