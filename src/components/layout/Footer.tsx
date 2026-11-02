import React from 'react';
import { ArrowUp, Github, Linkedin, Mail, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePortfolio } from '../../context/PortfolioContext';

export const Footer: React.FC = () => {
  const { profile } = usePortfolio();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-black/5 dark:border-white/10 bg-apple-gray-50 dark:bg-black py-16 transition-colors">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-12 border-b border-black/5 dark:border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl font-bold tracking-tight text-apple-light-primary dark:text-apple-dark-primary">
                {profile.full_name}
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/10 text-apple-light-secondary dark:text-apple-dark-secondary">
                SDET & QA
              </span>
            </div>
            <p className="text-sm text-apple-light-secondary dark:text-apple-dark-secondary max-w-md">
              {profile.tagline || 'Building confidence in every release.'}
            </p>
          </div>

          {/* Social Links & Back To Top */}
          <div className="flex items-center gap-4">
            {profile.github_url && (
              <a
                href={profile.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-black/5 dark:bg-white/10 text-apple-light-secondary dark:text-apple-dark-secondary hover:text-apple-light-primary dark:hover:text-apple-dark-primary transition-colors"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>
            )}

            {profile.linkedin_url && (
              <a
                href={profile.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-black/5 dark:bg-white/10 text-apple-light-secondary dark:text-apple-dark-secondary hover:text-apple-light-primary dark:hover:text-apple-dark-primary transition-colors"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            )}

            {profile.email && (
              <a
                href={`mailto:${profile.email}`}
                className="p-2.5 rounded-full bg-black/5 dark:bg-white/10 text-apple-light-secondary dark:text-apple-dark-secondary hover:text-apple-light-primary dark:hover:text-apple-dark-primary transition-colors"
                aria-label="Send Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            )}

            <button
              onClick={scrollToTop}
              type="button"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-black/5 dark:bg-white/10 text-apple-light-secondary dark:text-apple-dark-secondary hover:text-apple-light-primary dark:hover:text-apple-dark-primary text-xs font-medium transition-colors"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bottom Legal / Footnotes */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-apple-light-secondary dark:text-apple-dark-secondary gap-4">
          <p>
            Copyright &copy; {currentYear} {profile.full_name}. All rights reserved. Designed with Apple-inspired precision.
          </p>

          <div className="flex items-center space-x-6">
            <span className="text-[11px] opacity-75">
              Portfolio Demonstrations &middot; Not Affiliated with Apple Inc.
            </span>
            <Link
              to="/admin"
              className="inline-flex items-center gap-1 text-[11px] hover:underline opacity-60 hover:opacity-100 transition-opacity"
            >
              <ShieldCheck className="w-3 h-3" />
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

