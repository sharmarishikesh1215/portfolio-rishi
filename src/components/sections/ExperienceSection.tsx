import React from 'react';
import { Briefcase, Calendar, CheckCircle2, ChevronRight, Award } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export const ExperienceSection: React.FC = () => {
  const { experiences } = usePortfolio();

  return (
    <section id="experience" className="py-24 sm:py-32 px-6 bg-white dark:bg-black transition-colors">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 text-center mx-auto">
          <span className="text-xs uppercase tracking-widest text-apple-light-accent dark:text-apple-dark-accent font-semibold block mb-3">
            Track Record
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-apple-light-primary dark:text-apple-dark-primary mb-4">
            Professional Experience
          </h2>
          <p className="text-base sm:text-lg text-apple-light-secondary dark:text-apple-dark-secondary">
            Driving quality assurance, automation architecture, and deployment validation in production ecosystems.
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="relative border-l-2 border-black/10 dark:border-white/10 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-16">
          {experiences.map((exp, idx) => (
            <div key={exp.id || idx} className="relative group">
              {/* Timeline Marker Dot */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-apple-light-accent dark:bg-apple-dark-accent border-4 border-white dark:border-black shadow-sm group-hover:scale-125 transition-transform" />

              {/* Experience Card */}
              <div className="p-6 sm:p-8 rounded-3xl bg-apple-gray-50 dark:bg-apple-dark-surface border border-black/5 dark:border-white/10 shadow-apple-sm hover:shadow-apple-md transition-all duration-300">
                {/* Header Info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-6 border-b border-black/5 dark:border-white/10 mb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-xl sm:text-2xl font-bold text-apple-light-primary dark:text-apple-dark-primary tracking-tight">
                        {exp.role}
                      </h3>
                      {exp.is_current && (
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                          Current Role
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm sm:text-base font-medium text-apple-light-accent dark:text-apple-dark-accent">
                      <Briefcase className="w-4 h-4" />
                      <span>{exp.company}</span>
                      <span className="text-apple-light-secondary dark:text-apple-dark-secondary">&bull;</span>
                      <span className="text-apple-light-secondary dark:text-apple-dark-secondary text-xs sm:text-sm">
                        {exp.employment_type || 'Full-time'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-apple-light-secondary dark:text-apple-dark-secondary bg-black/5 dark:bg-white/5 px-3 py-1.5 rounded-full w-fit">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>
                      {exp.start_date} &mdash; {exp.is_current ? 'Present' : exp.end_date}
                    </span>
                  </div>
                </div>

                {/* Role Description */}
                <p className="text-sm sm:text-base text-apple-light-secondary dark:text-apple-dark-secondary leading-relaxed mb-6">
                  {exp.description}
                </p>

                {/* Key Responsibilities */}
                <div className="space-y-3 mb-8">
                  <h4 className="text-xs uppercase font-bold tracking-wider text-apple-light-primary dark:text-apple-dark-primary">
                    Core Engineering Responsibilities
                  </h4>
                  <ul className="space-y-2.5">
                    {exp.responsibilities.map((resp, rIdx) => (
                      <li
                        key={rIdx}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-apple-light-secondary dark:text-apple-dark-secondary"
                      >
                        <CheckCircle2 className="w-4 h-4 text-apple-light-accent dark:text-apple-dark-accent mt-0.5 shrink-0" />
                        <span className="leading-relaxed">{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Achievements if any */}
                {exp.achievements && exp.achievements.length > 0 && (
                  <div className="mb-8 p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 space-y-2">
                    <h5 className="text-xs font-semibold text-apple-light-primary dark:text-apple-dark-primary flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-amber-500" />
                      Key Quantifiable Outcomes
                    </h5>
                    <ul className="space-y-1.5">
                      {exp.achievements.map((ach, aIdx) => (
                        <li key={aIdx} className="text-xs text-apple-light-secondary dark:text-apple-dark-secondary pl-5 relative before:content-['•'] before:absolute before:left-1 before:text-apple-light-accent">
                          {ach}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Technologies Stack Tags */}
                <div>
                  <h4 className="text-xs uppercase font-bold tracking-wider text-apple-light-primary dark:text-apple-dark-primary mb-3">
                    Technologies Applied
                  </h4>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {exp.technologies.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-3 py-1 rounded-full text-xs font-medium bg-black/5 dark:bg-white/10 text-apple-light-primary dark:text-apple-dark-primary border border-black/5 dark:border-white/10 hover:border-apple-light-accent transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

