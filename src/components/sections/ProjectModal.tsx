import React, { useEffect } from 'react';
import { X, Github, ExternalLink, ShieldCheck, CheckCircle2, Layers, Cpu, Code2 } from 'lucide-react';
import { Project } from '../../types/portfolio';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [project]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity animate-in fade-in"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl rounded-3xl bg-white dark:bg-apple-dark-surface border border-black/10 dark:border-white/10 shadow-apple-lg overflow-hidden z-10 my-8 animate-in zoom-in-95 duration-200">
        {/* Cover Header */}
        <div className="relative h-60 sm:h-80 w-full overflow-hidden bg-apple-gray-100 dark:bg-black/50">
          <img
            src={project.cover_image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop'}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          {/* Close Button */}
          <button
            onClick={onClose}
            type="button"
            className="absolute top-4 right-4 p-2.5 rounded-full bg-black/50 text-white hover:bg-black/80 backdrop-blur-md transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Category & Tag on image */}
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full bg-apple-light-accent text-white dark:bg-apple-dark-accent dark:text-black">
                {project.category}
              </span>
              <span className="text-xs px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white font-medium">
                Portfolio Demonstration
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {project.title}
            </h3>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[calc(85vh-20rem)] overflow-y-auto space-y-8">
          {/* Deep-dive description */}
          <div>
            <h4 className="text-xs uppercase font-bold tracking-wider text-apple-light-secondary dark:text-apple-dark-secondary mb-2">
              Architecture &amp; System Overview
            </h4>
            <p className="text-base text-apple-light-primary dark:text-apple-dark-primary leading-relaxed">
              {project.full_description || project.short_description}
            </p>
          </div>

          {/* Testing Coverage List */}
          <div>
            <h4 className="text-xs uppercase font-bold tracking-wider text-apple-light-secondary dark:text-apple-dark-secondary mb-3 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              Automated Testing Coverage
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {project.testing_coverage?.map((cov, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2 p-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/5 dark:border-white/5 text-xs sm:text-sm text-apple-light-primary dark:text-apple-dark-primary"
                >
                  <CheckCircle2 className="w-4 h-4 text-apple-light-accent dark:text-apple-dark-accent mt-0.5 shrink-0" />
                  <span className="leading-snug">{cov}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Key Highlights */}
          {project.key_highlights && project.key_highlights.length > 0 && (
            <div>
              <h4 className="text-xs uppercase font-bold tracking-wider text-apple-light-secondary dark:text-apple-dark-secondary mb-3 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-apple-light-accent dark:text-apple-dark-accent" />
                Key Highlights
              </h4>
              <ul className="space-y-2">
                {project.key_highlights.map((hl, idx) => (
                  <li
                    key={idx}
                    className="text-xs sm:text-sm text-apple-light-secondary dark:text-apple-dark-secondary pl-5 relative before:content-['•'] before:absolute before:left-1.5 before:text-apple-light-accent"
                  >
                    {hl}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Technology Stack */}
          <div>
            <h4 className="text-xs uppercase font-bold tracking-wider text-apple-light-secondary dark:text-apple-dark-secondary mb-3 flex items-center gap-1.5">
              <Code2 className="w-4 h-4 text-apple-light-accent dark:text-apple-dark-accent" />
              Technology Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies?.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-full text-xs font-medium bg-black/5 dark:bg-white/10 text-apple-light-primary dark:text-apple-dark-primary border border-black/5 dark:border-white/10"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Demonstration Notice */}
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-800 dark:text-amber-300">
            <strong>Demonstration Notice:</strong> This project is a curated architectural sample built to demonstrate SDET practices, test framework scalability, and quality engineering standards.
          </div>
        </div>

        {/* Modal Action Bar */}
        <div className="p-6 border-t border-black/5 dark:border-white/10 bg-apple-gray-50 dark:bg-black/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-apple-light-primary dark:bg-white text-white dark:text-black text-xs font-semibold hover:opacity-90 transition-opacity"
              >
                <Github className="w-4 h-4" />
                <span>Source Code</span>
              </a>
            )}

            {project.demo_url && (
              <a
                href={project.demo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-black/5 dark:bg-white/10 text-apple-light-primary dark:text-apple-dark-primary text-xs font-medium hover:bg-black/10 dark:hover:bg-white/15 transition-colors"
              >
                <span>Live Demo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

          <button
            onClick={onClose}
            type="button"
            className="px-4 py-2 rounded-full text-xs font-medium text-apple-light-secondary dark:text-apple-dark-secondary hover:text-apple-light-primary dark:hover:text-apple-dark-primary transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

