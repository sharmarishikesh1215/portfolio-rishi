import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Github, ExternalLink, ShieldCheck, CheckCircle2, Layers, Code2 } from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { ShibaMascot } from '../components/mascot/ShibaMascot';
import { usePortfolio } from '../context/PortfolioContext';

export const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { projects } = usePortfolio();
  const navigate = useNavigate();

  const project = projects.find((p) => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (project) {
      document.title = `${project.title} — Rishi SDET Portfolio`;
    }
  }, [project]);

  if (!project) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex flex-col justify-between">
        <Navbar />
        <div className="max-w-2xl mx-auto text-center px-6 py-40">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <p className="text-apple-light-secondary dark:text-apple-dark-secondary mb-8">
            The project you are looking for does not exist or has been unpublished.
          </p>
          <Link
            to="/#projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-apple-light-accent dark:bg-apple-dark-accent text-white dark:text-black font-semibold text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Portfolio</span>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black text-apple-light-primary dark:text-apple-dark-primary transition-colors">
      <Navbar />

      <main className="pt-28 pb-24 px-6 max-w-5xl mx-auto">
        {/* Back Link */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/#projects')}
            type="button"
            className="inline-flex items-center gap-2 text-xs font-semibold text-apple-light-secondary dark:text-apple-dark-secondary hover:text-apple-light-primary dark:hover:text-apple-dark-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Projects</span>
          </button>
        </div>

        {/* Hero Header */}
        <div className="mb-12">
          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-apple-light-accent dark:bg-apple-dark-accent text-white dark:text-black">
              {project.category}
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-black/5 dark:bg-white/10 text-apple-light-secondary dark:text-apple-dark-secondary font-medium">
              Curated Portfolio Demonstration
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-apple-light-primary dark:text-apple-dark-primary mb-6">
            {project.title}
          </h1>

          <p className="text-lg sm:text-xl text-apple-light-secondary dark:text-apple-dark-secondary leading-relaxed max-w-3xl">
            {project.short_description}
          </p>
        </div>

        {/* Hero Visual Card */}
        <div className="relative rounded-3xl overflow-hidden mb-16 border border-black/10 dark:border-white/10 shadow-apple-lg">
          <img
            src={project.cover_image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop'}
            alt={project.title}
            className="w-full aspect-[21/9] object-cover"
          />
        </div>

        {/* Deep Dive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-12">
            <div>
              <h2 className="text-2xl font-bold tracking-tight mb-4">
                Architecture &amp; System Purpose
              </h2>
              <p className="text-base text-apple-light-secondary dark:text-apple-dark-secondary leading-relaxed">
                {project.full_description || project.short_description}
              </p>
            </div>

            {/* Testing Coverage List */}
            <div>
              <h2 className="text-2xl font-bold tracking-tight mb-6 flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-emerald-500" />
                Comprehensive Testing Coverage
              </h2>
              <div className="space-y-3">
                {project.testing_coverage?.map((cov, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-4 rounded-2xl bg-apple-gray-50 dark:bg-apple-dark-surface border border-black/5 dark:border-white/5 text-sm"
                  >
                    <CheckCircle2 className="w-5 h-5 text-apple-light-accent dark:text-apple-dark-accent shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{cov}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Architectural Highlights */}
            {project.key_highlights && project.key_highlights.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold tracking-tight mb-6 flex items-center gap-2">
                  <Layers className="w-6 h-6 text-apple-light-accent dark:text-apple-dark-accent" />
                  Engineering Highlights
                </h2>
                <ul className="space-y-3">
                  {project.key_highlights.map((hl, idx) => (
                    <li
                      key={idx}
                      className="p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 text-sm leading-relaxed"
                    >
                      {hl}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Sidebar Specs */}
          <div className="lg:col-span-4 space-y-8">
            <div className="p-6 rounded-3xl bg-apple-gray-50 dark:bg-apple-dark-surface border border-black/5 dark:border-white/10 space-y-6">
              <div>
                <h3 className="text-xs uppercase font-bold tracking-wider text-apple-light-secondary dark:text-apple-dark-secondary mb-3 flex items-center gap-1.5">
                  <Code2 className="w-4 h-4 text-apple-light-accent dark:text-apple-dark-accent" />
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies?.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full text-xs font-medium bg-white dark:bg-black/50 text-apple-light-primary dark:text-apple-dark-primary border border-black/5 dark:border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-black/5 dark:border-white/10 space-y-3">
                {project.github_url && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-apple-light-primary dark:bg-white text-white dark:text-black text-xs font-semibold hover:opacity-90 transition-opacity"
                  >
                    <Github className="w-4 h-4" />
                    <span>View Repository on GitHub</span>
                  </a>
                )}

                {project.demo_url && (
                  <a
                    href={project.demo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-black/5 dark:bg-white/10 text-apple-light-primary dark:text-apple-dark-primary text-xs font-semibold hover:bg-black/10 transition-colors"
                  >
                    <span>Launch Live Demonstration</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <ShibaMascot />
    </div>
  );
};

