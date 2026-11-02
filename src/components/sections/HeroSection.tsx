import React from 'react';
import { ArrowDown, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { StatusBadge } from '../visual/StatusBadge';
import { AppleMeshGlow } from '../visual/AppleMeshGlow';
import { TerminalPreview } from '../visual/TerminalPreview';

export const HeroSection: React.FC = () => {
  const { heroSettings, profile } = usePortfolio();

  const mainHeadline =
    heroSettings?.main_headline ||
    "Quality isn't an afterthought.\nIt's engineered.";

  const subHeadline =
    heroSettings?.sub_headline ||
    "I'm Rishi — a Software Quality Engineer building reliable applications through intelligent automation, thoughtful testing, and engineering excellence.";

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-between pt-32 pb-16 px-6 overflow-hidden bg-white dark:bg-black transition-colors"
    >
      {/* Background Ambient Glow */}
      {heroSettings?.enable_ambient_canvas !== false && <AppleMeshGlow />}

      <div className="relative z-10 max-w-5xl mx-auto w-full my-auto text-center flex flex-col items-center">
        {/* Availability Status Pill */}
        <div className="mb-6 animate-in fade-in duration-500">
          <StatusBadge
            statusText={
              heroSettings?.availability_status ||
              profile.availability_status ||
              'Available for SDET & Quality Engineering Roles'
            }
          />
        </div>

        {/* Editorial Apple Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-apple-light-primary dark:text-apple-dark-primary mb-6 whitespace-pre-line leading-[1.05] max-w-4xl">
          {mainHeadline}
        </h1>

        {/* Supporting Narrative */}
        <p className="text-lg sm:text-xl md:text-2xl text-apple-light-secondary dark:text-apple-dark-secondary font-normal max-w-3xl leading-relaxed mb-10 tracking-tight text-balance">
          {subHeadline}
        </p>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 w-full sm:w-auto">
          <a
            href={heroSettings?.primary_cta_link || '#projects'}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-apple-light-accent dark:bg-apple-dark-accent text-white dark:text-black font-medium text-sm sm:text-base hover:opacity-95 transition-all shadow-apple-md hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>{heroSettings?.primary_cta_text || 'Explore My Work'}</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <a
            href={heroSettings?.secondary_cta_link || '#contact'}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/15 text-apple-light-primary dark:text-apple-dark-primary font-medium text-sm sm:text-base border border-black/5 dark:border-white/10 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>{heroSettings?.secondary_cta_text || "Let's Connect"}</span>
          </a>
        </div>

        {/* Interactive Live Test Harness Visual Component */}
        <div className="w-full pt-4 animate-in fade-in duration-700">
          <TerminalPreview />
        </div>

        {/* Quick Engineering Metrics */}
        {heroSettings?.metrics && heroSettings.metrics.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-12 mt-16 max-w-3xl w-full border-t border-black/5 dark:border-white/10 pt-10">
            {heroSettings.metrics.map((metric, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <span className="text-3xl sm:text-4xl font-bold tracking-tight text-apple-light-primary dark:text-apple-dark-primary mb-1">
                  {metric.value}
                </span>
                <span className="text-xs sm:text-sm font-medium text-apple-light-secondary dark:text-apple-dark-secondary">
                  {metric.label}
                </span>
                {metric.description && (
                  <span className="text-[11px] text-apple-light-secondary/70 dark:text-apple-dark-secondary/70 mt-0.5">
                    {metric.description}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Gentle Scroll Indicator */}
      <div className="relative z-10 mx-auto pt-8 flex justify-center text-apple-light-secondary dark:text-apple-dark-secondary opacity-60 hover:opacity-100 transition-opacity">
        <a href="#about" aria-label="Scroll to About section" className="animate-bounce">
          <ArrowDown className="w-5 h-5" />
        </a>
      </div>
    </section>
  );
};

