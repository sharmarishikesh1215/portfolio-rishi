import React, { useState } from 'react';
import { Plus, Trash2, Edit2, Check, Briefcase, Calendar, CheckCircle2 } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Experience } from '../../types/portfolio';

export const AdminExperiences: React.FC = () => {
  const { experiences, saveExperience, deleteExperience } = usePortfolio();
  const [editingExp, setEditingExp] = useState<Experience | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const initialNewExp: Experience = {
    id: 'exp_' + Date.now(),
    company: '',
    role: '',
    employment_type: 'Full-time',
    start_date: '',
    end_date: 'Present',
    description: '',
    responsibilities: [''],
    technologies: [''],
    achievements: [''],
    is_current: true,
    display_order: experiences.length + 1,
  };

  const handleStartCreate = () => {
    setEditingExp(initialNewExp);
    setIsCreating(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingExp) return;

    // Filter empty items
    const cleaned: Experience = {
      ...editingExp,
      responsibilities: editingExp.responsibilities.filter((r) => r.trim().length > 0),
      technologies: editingExp.technologies.filter((t) => t.trim().length > 0),
      achievements: (editingExp.achievements || []).filter((a) => a.trim().length > 0),
    };

    await saveExperience(cleaned);
    setEditingExp(null);
    setIsCreating(false);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this experience entry?')) {
      await deleteExperience(id);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-apple-light-primary dark:text-apple-dark-primary">
            Experience Timeline
          </h1>
          <p className="text-xs sm:text-sm text-apple-light-secondary dark:text-apple-dark-secondary">
            Manage your career history, roles, responsibilities, and key engineering impact.
          </p>
        </div>

        {!editingExp && (
          <button
            onClick={handleStartCreate}
            type="button"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-apple-light-accent dark:bg-apple-dark-accent text-white dark:text-black font-semibold text-xs transition-transform active:scale-95 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add Experience</span>
          </button>
        )}
      </div>

      {/* Editor Modal / Inline Form */}
      {editingExp && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-apple-dark-surface border border-black/10 dark:border-white/10 shadow-apple-md space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-black/5 dark:border-white/10">
            <h3 className="text-lg font-bold text-apple-light-primary dark:text-apple-dark-primary">
              {isCreating ? 'Add New Experience' : 'Edit Experience'}
            </h3>
            <button
              onClick={() => {
                setEditingExp(null);
                setIsCreating(false);
              }}
              type="button"
              className="text-xs text-apple-light-secondary dark:text-apple-dark-secondary hover:text-apple-light-primary"
            >
              Cancel
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase font-bold text-apple-light-secondary dark:text-apple-dark-secondary mb-1">
                  Company Name *
                </label>
                <input
                  type="text"
                  required
                  value={editingExp.company}
                  onChange={(e) => setEditingExp({ ...editingExp, company: e.target.value })}
                  placeholder="Frugal Testing"
                  className="w-full px-4 py-2.5 rounded-xl bg-apple-gray-100 dark:bg-black/50 border border-black/5 dark:border-white/10 text-xs sm:text-sm text-apple-light-primary dark:text-apple-dark-primary"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-bold text-apple-light-secondary dark:text-apple-dark-secondary mb-1">
                  Role Title *
                </label>
                <input
                  type="text"
                  required
                  value={editingExp.role}
                  onChange={(e) => setEditingExp({ ...editingExp, role: e.target.value })}
                  placeholder="Software QA Engineer"
                  className="w-full px-4 py-2.5 rounded-xl bg-apple-gray-100 dark:bg-black/50 border border-black/5 dark:border-white/10 text-xs sm:text-sm text-apple-light-primary dark:text-apple-dark-primary"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs uppercase font-bold text-apple-light-secondary dark:text-apple-dark-secondary mb-1">
                  Start Date (e.g. Oct 2023)
                </label>
                <input
                  type="text"
                  required
                  value={editingExp.start_date}
                  onChange={(e) => setEditingExp({ ...editingExp, start_date: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-apple-gray-100 dark:bg-black/50 border border-black/5 dark:border-white/10 text-xs sm:text-sm text-apple-light-primary dark:text-apple-dark-primary"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-bold text-apple-light-secondary dark:text-apple-dark-secondary mb-1">
                  End Date (or 'Present')
                </label>
                <input
                  type="text"
                  disabled={editingExp.is_current}
                  value={editingExp.is_current ? 'Present' : editingExp.end_date}
                  onChange={(e) => setEditingExp({ ...editingExp, end_date: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-apple-gray-100 dark:bg-black/50 border border-black/5 dark:border-white/10 text-xs sm:text-sm text-apple-light-primary dark:text-apple-dark-primary disabled:opacity-50"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-bold text-apple-light-secondary dark:text-apple-dark-secondary mb-1">
                  Employment Type
                </label>
                <input
                  type="text"
                  value={editingExp.employment_type}
                  onChange={(e) =>
                    setEditingExp({ ...editingExp, employment_type: e.target.value })
                  }
                  placeholder="Full-time"
                  className="w-full px-4 py-2.5 rounded-xl bg-apple-gray-100 dark:bg-black/50 border border-black/5 dark:border-white/10 text-xs sm:text-sm text-apple-light-primary dark:text-apple-dark-primary"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="is_current"
                checked={editingExp.is_current}
                onChange={(e) =>
                  setEditingExp({
                    ...editingExp,
                    is_current: e.target.checked,
                    end_date: e.target.checked ? 'Present' : editingExp.end_date,
                  })
                }
                className="w-4 h-4 rounded text-apple-light-accent"
              />
              <label htmlFor="is_current" className="text-xs font-medium cursor-pointer">
                This is my current role
              </label>
            </div>

            <div>
              <label className="block text-xs uppercase font-bold text-apple-light-secondary dark:text-apple-dark-secondary mb-1">
                Summary Description
              </label>
              <textarea
                rows={3}
                value={editingExp.description}
                onChange={(e) => setEditingExp({ ...editingExp, description: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-apple-gray-100 dark:bg-black/50 border border-black/5 dark:border-white/10 text-xs sm:text-sm text-apple-light-primary dark:text-apple-dark-primary"
              />
            </div>

            {/* Responsibilities list editor */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs uppercase font-bold text-apple-light-secondary dark:text-apple-dark-secondary">
                  Core Responsibilities (one per row)
                </label>
                <button
                  type="button"
                  onClick={() =>
                    setEditingExp({
                      ...editingExp,
                      responsibilities: [...editingExp.responsibilities, ''],
                    })
                  }
                  className="text-xs text-apple-light-accent font-semibold"
                >
                  + Add Responsibility
                </button>
              </div>
              <div className="space-y-2">
                {editingExp.responsibilities.map((resp, rIdx) => (
                  <div key={rIdx} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={resp}
                      onChange={(e) => {
                        const updated = [...editingExp.responsibilities];
                        updated[rIdx] = e.target.value;
                        setEditingExp({ ...editingExp, responsibilities: updated });
                      }}
                      className="flex-1 px-3 py-2 rounded-xl bg-apple-gray-100 dark:bg-black/50 border border-black/5 dark:border-white/10 text-xs text-apple-light-primary dark:text-apple-dark-primary"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setEditingExp({
                          ...editingExp,
                          responsibilities: editingExp.responsibilities.filter((_, i) => i !== rIdx),
                        })
                      }
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Technologies list */}
            <div>
              <label className="block text-xs uppercase font-bold text-apple-light-secondary dark:text-apple-dark-secondary mb-1">
                Technologies (comma-separated)
              </label>
              <input
                type="text"
                value={editingExp.technologies.join(', ')}
                onChange={(e) =>
                  setEditingExp({
                    ...editingExp,
                    technologies: e.target.value.split(',').map((t) => t.trim()),
                  })
                }
                className="w-full px-4 py-2.5 rounded-xl bg-apple-gray-100 dark:bg-black/50 border border-black/5 dark:border-white/10 text-xs sm:text-sm text-apple-light-primary dark:text-apple-dark-primary"
              />
            </div>

            <div className="pt-4 flex items-center justify-end gap-3 border-t border-black/5 dark:border-white/10">
              <button
                type="button"
                onClick={() => {
                  setEditingExp(null);
                  setIsCreating(false);
                }}
                className="px-5 py-2 rounded-full text-xs font-medium text-apple-light-secondary dark:text-apple-dark-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded-full bg-apple-light-accent dark:bg-apple-dark-accent text-white dark:text-black font-semibold text-xs"
              >
                Save Experience
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Experience List Cards */}
      <div className="space-y-4">
        {experiences.map((exp) => (
          <div
            key={exp.id}
            className="p-6 rounded-3xl bg-white dark:bg-apple-dark-surface border border-black/5 dark:border-white/10 shadow-apple-sm flex flex-col sm:flex-row items-start justify-between gap-6"
          >
            <div className="space-y-3 flex-1">
              <div className="flex items-center gap-3">
                <h3 className="text-xl font-bold tracking-tight text-apple-light-primary dark:text-apple-dark-primary">
                  {exp.role}
                </h3>
                {exp.is_current && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    Current
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold text-apple-light-accent dark:text-apple-dark-accent">
                <Briefcase className="w-3.5 h-3.5" />
                <span>{exp.company}</span>
                <span className="text-apple-light-secondary">&bull;</span>
                <span className="text-apple-light-secondary font-normal">{exp.employment_type}</span>
                <span className="text-apple-light-secondary">&bull;</span>
                <span className="text-apple-light-secondary font-normal">
                  {exp.start_date} &mdash; {exp.is_current ? 'Present' : exp.end_date}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-apple-light-secondary dark:text-apple-dark-secondary line-clamp-2">
                {exp.description}
              </p>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {exp.technologies?.slice(0, 6).map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-black/5 dark:bg-white/10 text-apple-light-primary dark:text-apple-dark-primary"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setEditingExp(exp);
                  setIsCreating(false);
                }}
                type="button"
                className="p-2.5 rounded-xl text-apple-light-secondary hover:text-apple-light-primary hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                title="Edit Experience"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(exp.id)}
                type="button"
                className="p-2.5 rounded-xl text-red-500 hover:text-red-700 hover:bg-red-500/10 transition-colors"
                title="Delete Experience"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

