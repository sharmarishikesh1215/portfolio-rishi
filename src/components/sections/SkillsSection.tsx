import React, { useState } from 'react';
import { Layers, Terminal, CheckCircle2, Sparkles, Filter } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { SkillCategory } from '../../types/portfolio';

const ALL_CATEGORIES: SkillCategory[] = [
  'Automation Testing',
  'Manual Testing',
  'API Testing',
  'Mobile Testing',
  'Programming Languages',
  'Frontend Development',
  'Backend Development',
  'DevOps & CI/CD',
  'Monitoring & Infrastructure',
  'Database Technologies',
];

export const SkillsSection: React.FC = () => {
  const { skills } = usePortfolio();
  const [activeCategory, setActiveCategory] = useState<string>('All');

  // Deduplicate skills by name and category to guarantee zero duplicate chips
  const uniqueSkills = skills.filter((skill, index, self) =>
    index === self.findIndex((s) => s.name.toLowerCase().trim() === skill.name.toLowerCase().trim() && s.category === skill.category)
  );

  const filteredSkills =
    activeCategory === 'All'
      ? uniqueSkills
      : uniqueSkills.filter((s) => s.category === activeCategory);

  // Group skills by category for "All" view or current category
  const categoriesToShow =
    activeCategory === 'All' ? ALL_CATEGORIES : [activeCategory as SkillCategory];

  return (
    <section id="skills" className="py-24 sm:py-32 px-6 bg-white dark:bg-black transition-colors">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 text-center mx-auto">
          <span className="text-xs uppercase tracking-widest text-apple-light-accent dark:text-apple-dark-accent font-semibold block mb-3">
            Capabilities
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-apple-light-primary dark:text-apple-dark-primary mb-4">
            The tools behind the quality.
          </h2>
          <p className="text-base sm:text-lg text-apple-light-secondary dark:text-apple-dark-secondary">
            Mastered technologies, testing frameworks, and engineering infrastructure.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-16 max-w-4xl mx-auto">
          <button
            onClick={() => setActiveCategory('All')}
            type="button"
            className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
              activeCategory === 'All'
                ? 'bg-apple-light-primary dark:bg-white text-white dark:text-black shadow-apple-sm'
                : 'bg-apple-gray-100 dark:bg-apple-dark-surface text-apple-light-secondary dark:text-apple-dark-secondary hover:text-apple-light-primary dark:hover:text-apple-dark-primary border border-black/5 dark:border-white/10'
            }`}
          >
            All Disciplines ({uniqueSkills.length})
          </button>

          {ALL_CATEGORIES.map((cat) => {
            const count = uniqueSkills.filter((s) => s.category === cat).length;
            if (count === 0) return null;

            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                type="button"
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-apple-light-accent dark:bg-apple-dark-accent text-white dark:text-black shadow-apple-sm'
                    : 'bg-apple-gray-100 dark:bg-apple-dark-surface text-apple-light-secondary dark:text-apple-dark-secondary hover:text-apple-light-primary dark:hover:text-apple-dark-primary border border-black/5 dark:border-white/10'
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>

        {/* Categorized Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoriesToShow.map((cat) => {
            const catSkills = filteredSkills.filter((s) => s.category === cat);
            if (catSkills.length === 0) return null;

            return (
              <div
                key={cat}
                className="p-6 rounded-3xl bg-apple-gray-50 dark:bg-apple-dark-surface border border-black/5 dark:border-white/10 shadow-apple-sm hover:shadow-apple-md transition-all duration-300"
              >
                <div className="flex items-center justify-between pb-4 border-b border-black/5 dark:border-white/10 mb-4">
                  <h3 className="text-sm font-bold tracking-tight text-apple-light-primary dark:text-apple-dark-primary">
                    {cat}
                  </h3>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/10 text-apple-light-secondary dark:text-apple-dark-secondary">
                    {catSkills.length} tools
                  </span>
                </div>

                <div className="space-y-2.5">
                  {catSkills.map((skill) => (
                    <div
                      key={skill.id}
                      className="group flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-black/40 border border-black/5 dark:border-white/5 hover:border-black/15 dark:hover:border-white/20 transition-all"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-apple-light-accent dark:bg-apple-dark-accent group-hover:scale-150 transition-transform"></span>
                        <span className="text-xs sm:text-[13px] font-medium text-apple-light-primary dark:text-apple-dark-primary tracking-tight">
                          {skill.name}
                        </span>
                      </div>

                      <span className="text-[10px] uppercase font-semibold tracking-wider text-apple-light-secondary dark:text-apple-dark-secondary px-2 py-0.5 rounded bg-black/5 dark:bg-white/10">
                        {skill.proficiency_level || 'Proficient'}
                      </span>
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
};

