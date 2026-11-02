import React, { useState } from 'react';
import { Github, ArrowRight, ShieldCheck, CheckCircle2, Layers } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Project } from '../../types/portfolio';
import { ProjectModal } from './ProjectModal';

export const ProjectsSection: React.FC = () => {
  const { projects } = usePortfolio();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const publishedProjects = projects
    .filter((p) => p.published)
    .sort((a, b) => a.display_order - b.display_order);

  const categories = ['All', ...Array.from(new Set(publishedProjects.map((p) => p.category)))];

  const filteredProjects =
    activeFilter === 'All'
      ? publishedProjects
      : publishedProjects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="py-24 sm:py-32 px-6 bg-apple-gray-50 dark:bg-apple-dark-surface/40 transition-colors">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs uppercase tracking-widest text-apple-light-accent dark:text-apple-dark-accent font-semibold block mb-3">
            Selected Work
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-apple-light-primary dark:text-apple-dark-primary mb-4">
            Selected work. Engineered with precision.
          </h2>
          <p className="text-base sm:text-lg text-apple-light-secondary dark:text-apple-dark-secondary">
            High-leverage test automation frameworks, API validation suites, and deployment verification architectures.
          </p>

          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 dark:bg-white/10 text-xs font-medium text-apple-light-secondary dark:text-apple-dark-secondary">
            <span className="w-2 h-2 rounded-full bg-apple-light-accent dark:bg-apple-dark-accent"></span>
            Curated Portfolio Demonstrations &bull; Architecture Prototypes
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              type="button"
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                activeFilter === cat
                  ? 'bg-apple-light-primary dark:bg-white text-white dark:text-black shadow-apple-sm'
                  : 'bg-white dark:bg-apple-dark-surface text-apple-light-secondary dark:text-apple-dark-secondary hover:text-apple-light-primary dark:hover:text-apple-dark-primary border border-black/5 dark:border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Alternating Apple-Style Product Story Cards */}
        <div className="space-y-16 lg:space-y-24">
          {filteredProjects.map((project, idx) => {
            const isReversed = idx % 2 === 1;

            return (
              <div
                key={project.id || idx}
                className="group p-6 sm:p-10 rounded-3xl bg-white dark:bg-apple-dark-surface border border-black/5 dark:border-white/10 shadow-apple-card dark:shadow-apple-dark-card hover:border-black/15 dark:hover:border-white/20 transition-all duration-500"
              >
                <div
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
                    isReversed ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  {/* Visual Side */}
                  <div
                    className={`lg:col-span-6 relative overflow-hidden rounded-2xl bg-apple-gray-100 dark:bg-black/60 shadow-apple-sm ${
                      isReversed ? 'lg:order-2' : 'lg:order-1'
                    }`}
                  >
                    <div className="aspect-[16/10] overflow-hidden relative">
                      <img
                        src={
                          project.cover_image ||
                          'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop'
                        }
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

                      {/* Image Overlays */}
                      <div className="absolute top-4 left-4">
                        <span className="text-[11px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-white/90 dark:bg-black/90 backdrop-blur-md text-apple-light-primary dark:text-apple-dark-primary shadow-sm">
                          {project.category}
                        </span>
                      </div>

                      <div className="absolute bottom-4 left-4 right-4 text-white text-xs font-mono flex items-center justify-between">
                        <span className="opacity-90">PROJECT 0{idx + 1}</span>
                        <span className="px-2 py-0.5 rounded bg-black/40 backdrop-blur-sm">
                          Sample Demonstration
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Narrative Side */}
                  <div
                    className={`lg:col-span-6 space-y-6 ${
                      isReversed ? 'lg:order-1' : 'lg:order-2'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-mono uppercase text-apple-light-accent dark:text-apple-dark-accent mb-2">
                        PROJECT 0{idx + 1} &bull; {project.category}
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-apple-light-primary dark:text-apple-dark-primary mb-3">
                        {project.title}
                      </h3>
                      <p className="text-sm sm:text-base text-apple-light-secondary dark:text-apple-dark-secondary leading-relaxed">
                        {project.short_description}
                      </p>
                    </div>

                    {/* Testing Coverage Snippet */}
                    <div className="space-y-2.5">
                      <h4 className="text-xs uppercase font-bold tracking-wider text-apple-light-primary dark:text-apple-dark-primary flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-emerald-500" />
                        Key Validation Points
                      </h4>
                      <ul className="space-y-1.5">
                        {project.testing_coverage?.slice(0, 3).map((cov, cIdx) => (
                          <li
                            key={cIdx}
                            className="flex items-start gap-2 text-xs sm:text-sm text-apple-light-secondary dark:text-apple-dark-secondary"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-apple-light-accent dark:text-apple-dark-accent mt-0.5 shrink-0" />
                            <span>{cov}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies?.slice(0, 6).map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-black/5 dark:bg-white/10 text-apple-light-primary dark:text-apple-dark-primary border border-black/5 dark:border-white/10"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="pt-2 flex items-center gap-4">
                      <button
                        onClick={() => setSelectedProject(project)}
                        type="button"
                        className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-apple-light-accent dark:bg-apple-dark-accent text-white dark:text-black font-semibold text-xs transition-all hover:opacity-90 active:scale-95 shadow-sm"
                      >
                        <span>View Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      {project.github_url && (
                        <a
                          href={project.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/15 text-apple-light-primary dark:text-apple-dark-primary text-xs font-medium transition-colors"
                        >
                          <Github className="w-3.5 h-3.5" />
                          <span>Code Repository</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Deep-Dive Project Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};

