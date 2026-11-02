import React, { useState } from 'react';
import { Plus, Trash2, Cpu, Check, Filter } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Skill, SkillCategory } from '../../types/portfolio';

const CATEGORIES: SkillCategory[] = [
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

export const AdminSkills: React.FC = () => {
  const { skills, saveSkill, deleteSkill } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Quick Add Form
  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState<SkillCategory>('Automation Testing');
  const [newLevel, setNewLevel] = useState('Advanced');

  const handleAddSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const skill: Skill = {
      id: 'skill_' + Date.now(),
      name: newName.trim(),
      category: newCategory,
      proficiency_level: newLevel,
      display_order: skills.filter((s) => s.category === newCategory).length + 1,
    };

    await saveSkill(skill);
    setNewName('');
  };

  const handleDelete = async (id: string) => {
    await deleteSkill(id);
  };

  const displayedSkills =
    selectedCategory === 'All'
      ? skills
      : skills.filter((s) => s.category === selectedCategory);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-apple-light-primary dark:text-apple-dark-primary mb-1">
          Skills &amp; Technology Matrix
        </h1>
        <p className="text-xs sm:text-sm text-apple-light-secondary dark:text-apple-dark-secondary">
          Add, organize, and categorize tools across testing, languages, frameworks, and infrastructure.
        </p>
      </div>

      {/* Quick Add Form Card */}
      <div className="p-6 rounded-3xl bg-white dark:bg-apple-dark-surface border border-black/5 dark:border-white/10 shadow-apple-sm space-y-4">
        <h3 className="text-sm font-bold tracking-tight text-apple-light-primary dark:text-apple-dark-primary flex items-center gap-2">
          <Plus className="w-4 h-4 text-apple-light-accent dark:text-apple-dark-accent" />
          Quick Add New Skill
        </h3>

        <form onSubmit={handleAddSkill} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <div className="sm:col-span-2">
            <input
              type="text"
              required
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="e.g. Playwright, Kafka, RestAssured..."
              className="w-full px-4 py-2.5 rounded-xl bg-apple-gray-100 dark:bg-black/50 border border-black/5 dark:border-white/10 text-xs sm:text-sm text-apple-light-primary dark:text-apple-dark-primary focus:outline-none focus:border-apple-light-accent"
            />
          </div>

          <div>
            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value as SkillCategory)}
              className="w-full px-3 py-2.5 rounded-xl bg-apple-gray-100 dark:bg-black/50 border border-black/5 dark:border-white/10 text-xs text-apple-light-primary dark:text-apple-dark-primary focus:outline-none"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl bg-apple-light-accent dark:bg-apple-dark-accent text-white dark:text-black font-semibold text-xs transition-transform active:scale-95 shadow-sm"
            >
              Add Skill
            </button>
          </div>
        </form>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedCategory('All')}
          type="button"
          className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
            selectedCategory === 'All'
              ? 'bg-apple-light-primary dark:bg-white text-white dark:text-black'
              : 'bg-white dark:bg-apple-dark-surface text-apple-light-secondary dark:text-apple-dark-secondary border border-black/5 dark:border-white/10'
          }`}
        >
          All ({skills.length})
        </button>

        {CATEGORIES.map((cat) => {
          const count = skills.filter((s) => s.category === cat).length;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              type="button"
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-apple-light-accent dark:bg-apple-dark-accent text-white dark:text-black'
                  : 'bg-white dark:bg-apple-dark-surface text-apple-light-secondary dark:text-apple-dark-secondary border border-black/5 dark:border-white/10'
              }`}
            >
              {cat} ({count})
            </button>
          );
        })}
      </div>

      {/* Skills Matrix Table */}
      <div className="p-6 rounded-3xl bg-white dark:bg-apple-dark-surface border border-black/5 dark:border-white/10 shadow-apple-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {displayedSkills.map((skill) => (
            <div
              key={skill.id}
              className="flex items-center justify-between p-3 rounded-2xl bg-apple-gray-100/60 dark:bg-black/30 border border-black/5 dark:border-white/5"
            >
              <div>
                <span className="text-xs sm:text-sm font-semibold text-apple-light-primary dark:text-apple-dark-primary block">
                  {skill.name}
                </span>
                <span className="text-[10px] text-apple-light-secondary dark:text-apple-dark-secondary">
                  {skill.category}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-[10px] px-2 py-0.5 rounded-md font-semibold bg-black/5 dark:bg-white/10 text-apple-light-secondary dark:text-apple-dark-secondary">
                  {skill.proficiency_level || 'Proficient'}
                </span>
                <button
                  onClick={() => handleDelete(skill.id)}
                  type="button"
                  className="p-1 text-red-500 hover:text-red-700 hover:bg-red-500/10 rounded-lg transition-colors"
                  title="Remove Skill"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

