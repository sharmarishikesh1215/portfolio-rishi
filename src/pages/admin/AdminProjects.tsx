import React, { useState } from 'react';
import {
  Plus,
  Trash2,
  Edit2,
  Check,
  Eye,
  EyeOff,
  ArrowUp,
  ArrowDown,
  Github,
  ExternalLink,
  ShieldCheck,
  Image as ImageIcon,
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Project } from '../../types/portfolio';
import { slugify } from '../../lib/utils';

export const AdminProjects: React.FC = () => {
  const { projects, saveProject, deleteProject, reorderProjects } = usePortfolio();
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const initialNewProject: Project = {
    id: 'proj_' + Date.now(),
    title: '',
    slug: '',
    short_description: '',
    full_description: '',
    category: 'Automation Testing',
    cover_image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop',
    technologies: ['Java', 'Selenium', 'TestNG'],
    testing_coverage: ['Authentication validation', 'End-to-end regression suites'],
    key_highlights: ['Sample portfolio demonstration architecture.'],
    github_url: 'https://github.com/rishi-sqe',
    demo_url: '',
    featured: true,
    published: true,
    display_order: projects.length + 1,
  };

  const handleStartCreate = () => {
    setEditingProject(initialNewProject);
    setIsCreating(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    const projectToSave: Project = {
      ...editingProject,
      slug: editingProject.slug ? slugify(editingProject.slug) : slugify(editingProject.title),
      technologies: editingProject.technologies.filter((t) => t.trim().length > 0),
      testing_coverage: editingProject.testing_coverage.filter((c) => c.trim().length > 0),
      key_highlights: (editingProject.key_highlights || []).filter((h) => h.trim().length > 0),
    };

    await saveProject(projectToSave);
    setEditingProject(null);
    setIsCreating(false);
  };

  const handleDelete = async (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      await deleteProject(id);
    }
  };

  const handleTogglePublish = async (project: Project) => {
    await saveProject({ ...project, published: !project.published });
  };

  const handleMove = async (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= projects.length) return;

    const reordered = [...projects];
    const temp = reordered[index];
    reordered[index] = reordered[targetIdx];
    reordered[targetIdx] = temp;

    await reorderProjects(reordered);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-apple-light-primary dark:text-apple-dark-primary">
            Project Management
          </h1>
          <p className="text-xs sm:text-sm text-apple-light-secondary dark:text-apple-dark-secondary">
            Create, edit, publish, and reorder your testing and SDET demonstration projects.
          </p>
        </div>

        {!editingProject && (
          <button
            onClick={handleStartCreate}
            type="button"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-apple-light-accent dark:bg-apple-dark-accent text-white dark:text-black font-semibold text-xs transition-transform active:scale-95 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Project</span>
          </button>
        )}
      </div>

      {/* Editor Form Modal */}
      {editingProject && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-apple-dark-surface border border-black/10 dark:border-white/10 shadow-apple-lg space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-black/5 dark:border-white/10">
            <h3 className="text-lg font-bold text-apple-light-primary dark:text-apple-dark-primary">
              {isCreating ? 'Add New Project' : `Edit: ${editingProject.title}`}
            </h3>
            <button
              onClick={() => {
                setEditingProject(null);
                setIsCreating(false);
              }}
              type="button"
              className="text-xs text-apple-light-secondary dark:text-apple-dark-secondary hover:text-apple-light-primary"
            >
              Cancel
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase font-bold text-apple-light-secondary dark:text-apple-dark-secondary mb-1">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  value={editingProject.title}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      title: e.target.value,
                      slug: editingProject.slug || slugify(e.target.value),
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-apple-gray-100 dark:bg-black/50 border border-black/5 dark:border-white/10 text-xs sm:text-sm text-apple-light-primary dark:text-apple-dark-primary"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-bold text-apple-light-secondary dark:text-apple-dark-secondary mb-1">
                  Category
                </label>
                <select
                  value={editingProject.category}
                  onChange={(e) =>
                    setEditingProject({ ...editingProject, category: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-apple-gray-100 dark:bg-black/50 border border-black/5 dark:border-white/10 text-xs sm:text-sm text-apple-light-primary dark:text-apple-dark-primary"
                >
                  <option value="Automation Testing">Automation Testing</option>
                  <option value="API Testing">API Testing</option>
                  <option value="Mobile Testing">Mobile Testing</option>
                  <option value="DevOps & CI/CD">DevOps &amp; CI/CD</option>
                  <option value="Monitoring & Infrastructure">Monitoring &amp; Infrastructure</option>
                  <option value="Full-Stack Quality">Full-Stack Quality</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase font-bold text-apple-light-secondary dark:text-apple-dark-secondary mb-1">
                Short Description (Card summary) *
              </label>
              <textarea
                rows={2}
                required
                value={editingProject.short_description}
                onChange={(e) =>
                  setEditingProject({
                    ...editingProject,
                    short_description: e.target.value,
                  })
                }
                className="w-full px-4 py-2.5 rounded-xl bg-apple-gray-100 dark:bg-black/50 border border-black/5 dark:border-white/10 text-xs sm:text-sm text-apple-light-primary dark:text-apple-dark-primary"
              />
            </div>

            <div>
              <label className="block text-xs uppercase font-bold text-apple-light-secondary dark:text-apple-dark-secondary mb-1">
                Full Description (Modal &amp; Detailed view)
              </label>
              <textarea
                rows={4}
                value={editingProject.full_description}
                onChange={(e) =>
                  setEditingProject({
                    ...editingProject,
                    full_description: e.target.value,
                  })
                }
                className="w-full px-4 py-2.5 rounded-xl bg-apple-gray-100 dark:bg-black/50 border border-black/5 dark:border-white/10 text-xs sm:text-sm text-apple-light-primary dark:text-apple-dark-primary"
              />
            </div>

            <div>
              <label className="block text-xs uppercase font-bold text-apple-light-secondary dark:text-apple-dark-secondary mb-1">
                Cover Image URL
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={editingProject.cover_image}
                  onChange={(e) =>
                    setEditingProject({ ...editingProject, cover_image: e.target.value })
                  }
                  placeholder="https://images.unsplash.com/..."
                  className="flex-1 px-4 py-2.5 rounded-xl bg-apple-gray-100 dark:bg-black/50 border border-black/5 dark:border-white/10 text-xs sm:text-sm text-apple-light-primary dark:text-apple-dark-primary"
                />
              </div>
            </div>

            {/* Testing Coverage List */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs uppercase font-bold text-apple-light-secondary dark:text-apple-dark-secondary">
                  Testing Coverage Points (one per row)
                </label>
                <button
                  type="button"
                  onClick={() =>
                    setEditingProject({
                      ...editingProject,
                      testing_coverage: [...editingProject.testing_coverage, ''],
                    })
                  }
                  className="text-xs text-apple-light-accent font-semibold"
                >
                  + Add Coverage Item
                </button>
              </div>
              <div className="space-y-2">
                {editingProject.testing_coverage.map((cov, cIdx) => (
                  <div key={cIdx} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={cov}
                      onChange={(e) => {
                        const updated = [...editingProject.testing_coverage];
                        updated[cIdx] = e.target.value;
                        setEditingProject({ ...editingProject, testing_coverage: updated });
                      }}
                      className="flex-1 px-3 py-2 rounded-xl bg-apple-gray-100 dark:bg-black/50 border border-black/5 dark:border-white/10 text-xs text-apple-light-primary dark:text-apple-dark-primary"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setEditingProject({
                          ...editingProject,
                          testing_coverage: editingProject.testing_coverage.filter(
                            (_, i) => i !== cIdx
                          ),
                        })
                      }
                      className="text-red-500 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Technologies */}
            <div>
              <label className="block text-xs uppercase font-bold text-apple-light-secondary dark:text-apple-dark-secondary mb-1">
                Technology Stack (comma-separated)
              </label>
              <input
                type="text"
                value={editingProject.technologies.join(', ')}
                onChange={(e) =>
                  setEditingProject({
                    ...editingProject,
                    technologies: e.target.value.split(',').map((t) => t.trim()),
                  })
                }
                className="w-full px-4 py-2.5 rounded-xl bg-apple-gray-100 dark:bg-black/50 border border-black/5 dark:border-white/10 text-xs sm:text-sm text-apple-light-primary dark:text-apple-dark-primary"
              />
            </div>

            {/* External Links */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase font-bold text-apple-light-secondary dark:text-apple-dark-secondary mb-1">
                  GitHub Repository URL
                </label>
                <input
                  type="text"
                  value={editingProject.github_url}
                  onChange={(e) =>
                    setEditingProject({ ...editingProject, github_url: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-apple-gray-100 dark:bg-black/50 border border-black/5 dark:border-white/10 text-xs sm:text-sm text-apple-light-primary dark:text-apple-dark-primary"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-bold text-apple-light-secondary dark:text-apple-dark-secondary mb-1">
                  Live Demonstration URL
                </label>
                <input
                  type="text"
                  value={editingProject.demo_url}
                  onChange={(e) =>
                    setEditingProject({ ...editingProject, demo_url: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-apple-gray-100 dark:bg-black/50 border border-black/5 dark:border-white/10 text-xs sm:text-sm text-apple-light-primary dark:text-apple-dark-primary"
                />
              </div>
            </div>

            {/* Publish Toggle */}
            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="is_published"
                checked={editingProject.published}
                onChange={(e) =>
                  setEditingProject({ ...editingProject, published: e.target.checked })
                }
                className="w-4 h-4 rounded text-apple-light-accent"
              />
              <label htmlFor="is_published" className="text-xs font-semibold cursor-pointer">
                Publish this project immediately on public website
              </label>
            </div>

            <div className="pt-4 flex items-center justify-end gap-3 border-t border-black/5 dark:border-white/10">
              <button
                type="button"
                onClick={() => {
                  setEditingProject(null);
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
                Save Project
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Projects Table / Cards */}
      <div className="space-y-4">
        {projects.map((proj, idx) => (
          <div
            key={proj.id}
            className="p-5 rounded-3xl bg-white dark:bg-apple-dark-surface border border-black/5 dark:border-white/10 shadow-apple-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
          >
            {/* Visual thumbnail & title */}
            <div className="flex items-center gap-4 flex-1">
              <div className="w-20 h-14 rounded-xl overflow-hidden bg-black/5 dark:bg-white/5 shrink-0">
                <img
                  src={proj.cover_image}
                  alt={proj.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-mono text-apple-light-secondary dark:text-apple-dark-secondary">
                    #{idx + 1}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/10 font-semibold text-apple-light-secondary dark:text-apple-dark-secondary">
                    {proj.category}
                  </span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      proj.published
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                        : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                    }`}
                  >
                    {proj.published ? 'Published' : 'Draft'}
                  </span>
                </div>
                <h4 className="text-sm sm:text-base font-bold text-apple-light-primary dark:text-apple-dark-primary tracking-tight">
                  {proj.title}
                </h4>
              </div>
            </div>

            {/* Reorder and Action Buttons */}
            <div className="flex items-center gap-2 self-end md:self-center">
              {/* Order Controls */}
              <div className="flex items-center border border-black/5 dark:border-white/10 rounded-xl overflow-hidden mr-2">
                <button
                  onClick={() => handleMove(idx, 'up')}
                  disabled={idx === 0}
                  type="button"
                  className="p-2 hover:bg-black/5 dark:hover:bg-white/5 text-apple-light-secondary disabled:opacity-30"
                  title="Move Up"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleMove(idx, 'down')}
                  disabled={idx === projects.length - 1}
                  type="button"
                  className="p-2 hover:bg-black/5 dark:hover:bg-white/5 text-apple-light-secondary disabled:opacity-30 border-l border-black/5 dark:border-white/10"
                  title="Move Down"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Publish Toggle Button */}
              <button
                onClick={() => handleTogglePublish(proj)}
                type="button"
                className={`p-2 rounded-xl text-xs transition-colors ${
                  proj.published
                    ? 'text-emerald-600 hover:bg-emerald-500/10'
                    : 'text-amber-600 hover:bg-amber-500/10'
                }`}
                title={proj.published ? 'Unpublish' : 'Publish'}
              >
                {proj.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>

              {/* Edit Button */}
              <button
                onClick={() => {
                  setEditingProject(proj);
                  setIsCreating(false);
                }}
                type="button"
                className="p-2 rounded-xl text-apple-light-secondary hover:text-apple-light-primary hover:bg-black/5 dark:hover:bg-white/5"
                title="Edit Project"
              >
                <Edit2 className="w-4 h-4" />
              </button>

              {/* Delete Button */}
              <button
                onClick={() => handleDelete(proj.id, proj.title)}
                type="button"
                className="p-2 rounded-xl text-red-500 hover:text-red-700 hover:bg-red-500/10"
                title="Delete Project"
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

