import React from 'react';
import { ShieldCheck, Cpu, Smartphone, Network, Server, GitMerge } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export const AboutSection: React.FC = () => {
  const { aboutSettings, profile } = usePortfolio();

  const heading = aboutSettings?.heading || 'Engineering quality. One detail at a time.';
  const subheading =
    aboutSettings?.subheading ||
    'Beyond manual checkpoints. Architecting verifiable, reproducible test systems.';

  const paragraphs = aboutSettings?.paragraphs || [
    'As a Software QA Engineer at Frugal Testing, I approach quality from the ground up — not simply as a series of checks before a release, but as an architectural discipline woven into every commit, container, and deployment.',
    'My work spans the complete testing spectrum: from robust Selenium and Playwright browser automation suites to high-throughput RestAssured API contracts, Appium mobile test harnesses, and infrastructure sanity validation with Kafka, Redis, and Linux telemetry.',
  ];

  const statistics = aboutSettings?.statistics || [
    { label: 'Testing Domains', value: '3+', description: 'Web, Mobile & Backend Microservices' },
    { label: 'Technologies', value: '10+', description: 'Core Tools & Frameworks' },
    { label: 'Automation Frameworks', value: 'Multiple', description: 'Modular POM & Data-Driven' },
    { label: 'Validation Pipeline', value: 'Continuous', description: 'Automated CI/CD Integration' },
  ];

  const pillars = aboutSettings?.philosophy_pillars || [
    {
      title: 'Architectural Rigor',
      description:
        'Building maintainable, modular test frameworks utilizing the Page Object Model, thread-safe parallel runners, and resilient locators.',
    },
    {
      title: 'Shift-Left Integration',
      description:
        'Embedding regression gates and automated smoke verification directly into CI/CD pipelines to catch anomalies early.',
    },
    {
      title: 'Holistic Observability',
      description:
        'Validating not only client-side UI behavior, but asynchronous Kafka queues, Redis cache integrity, and Grafana system telemetry.',
    },
  ];

  const capabilities = [
    {
      icon: <Cpu className="w-5 h-5 text-apple-light-accent dark:text-apple-dark-accent" />,
      title: 'Web Automation',
      desc: 'Selenium WebDriver, TestNG, Playwright, Page Object Model, cross-browser concurrency.',
    },
    {
      icon: <Network className="w-5 h-5 text-apple-light-accent dark:text-apple-dark-accent" />,
      title: 'API & Microservices',
      desc: 'RestAssured, Postman, JSON Schema validation, OAuth2 tokens, idempotency checks.',
    },
    {
      icon: <Smartphone className="w-5 h-5 text-apple-light-accent dark:text-apple-dark-accent" />,
      title: 'Mobile Ecosystem',
      desc: 'Appium Android automation, UIAutomator2, ADB capability management, real-device testing.',
    },
    {
      icon: <GitMerge className="w-5 h-5 text-apple-light-accent dark:text-apple-dark-accent" />,
      title: 'CI/CD Pipelines',
      desc: 'Jenkins declarative pipelines, GitHub Actions workflows, Allure test telemetry, automated gates.',
    },
    {
      icon: <Server className="w-5 h-5 text-apple-light-accent dark:text-apple-dark-accent" />,
      title: 'Infrastructure Sanity',
      desc: 'Linux environments, Kafka message queues, Redis / KeyDB in-memory caching, Grafana metrics.',
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-apple-light-accent dark:text-apple-dark-accent" />,
      title: 'Quality Strategy',
      desc: 'Manual exploratory testing, sanity & regression suites, defect lifecycle management, zero-escape mindset.',
    },
  ];

  return (
    <section id="about" className="py-24 sm:py-32 px-6 bg-apple-gray-50 dark:bg-apple-dark-surface/40 transition-colors">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs uppercase tracking-widest text-apple-light-accent dark:text-apple-dark-accent font-semibold block mb-3">
            About &amp; Methodology
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-apple-light-primary dark:text-apple-dark-primary mb-6">
            {heading}
          </h2>
          <p className="text-lg sm:text-xl text-apple-light-secondary dark:text-apple-dark-secondary leading-relaxed">
            {subheading}
          </p>
        </div>

        {/* Narrative & Statistics Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          <div className="lg:col-span-7 space-y-6 text-base sm:text-lg text-apple-light-secondary dark:text-apple-dark-secondary leading-relaxed">
            {paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}

            <div className="p-6 rounded-2xl bg-white dark:bg-apple-dark-surface border border-black/5 dark:border-white/10 shadow-apple-sm mt-8">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-apple-light-accent dark:bg-apple-dark-accent"></span>
                <h4 className="text-sm font-semibold text-apple-light-primary dark:text-apple-dark-primary tracking-tight">
                  Current Trajectory
                </h4>
              </div>
              <p className="text-sm text-apple-light-secondary dark:text-apple-dark-secondary">
                Currently driving QA at <span className="font-medium text-apple-light-primary dark:text-apple-dark-primary">{profile.current_role}</span>, targeting <span className="font-medium text-apple-light-primary dark:text-apple-dark-primary">{profile.career_direction}</span> opportunities where engineering rigor meets high-velocity delivery.
              </p>
            </div>
          </div>

          {/* Editable Statistics Grid */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            {statistics.map((stat, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white dark:bg-apple-dark-surface border border-black/5 dark:border-white/10 shadow-apple-sm flex flex-col justify-between hover:border-black/15 dark:hover:border-white/20 transition-all"
              >
                <div>
                  <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-apple-light-primary dark:text-apple-dark-primary block mb-1">
                    {stat.value}
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-apple-light-primary dark:text-apple-dark-primary block mb-1">
                    {stat.label}
                  </span>
                </div>
                {stat.description && (
                  <span className="text-[11px] text-apple-light-secondary dark:text-apple-dark-secondary leading-snug mt-2">
                    {stat.description}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Engineering Pillars Bento Grid */}
        <div className="pt-8 border-t border-black/5 dark:border-white/10">
          <div className="mb-10 text-center max-w-2xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-apple-light-primary dark:text-apple-dark-primary mb-3">
              Core Technical Competencies
            </h3>
            <p className="text-sm text-apple-light-secondary dark:text-apple-dark-secondary">
              A comprehensive toolkit developed through hands-on enterprise quality engineering.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((cap, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white dark:bg-apple-dark-surface border border-black/5 dark:border-white/10 shadow-apple-sm hover:shadow-apple-md hover:border-black/15 dark:hover:border-white/20 transition-all duration-300"
              >
                <div className="p-2.5 rounded-xl bg-black/[0.03] dark:bg-white/5 w-fit mb-4">
                  {cap.icon}
                </div>
                <h4 className="text-base font-semibold text-apple-light-primary dark:text-apple-dark-primary mb-2 tracking-tight">
                  {cap.title}
                </h4>
                <p className="text-xs sm:text-sm text-apple-light-secondary dark:text-apple-dark-secondary leading-relaxed">
                  {cap.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Philosophy Pillars */}
        {pillars.length > 0 && (
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 border-t border-black/5 dark:border-white/10">
            {pillars.map((pillar, idx) => (
              <div key={idx} className="space-y-2">
                <span className="text-xs font-mono text-apple-light-accent dark:text-apple-dark-accent">
                  0{idx + 1}. PRINCIPLE
                </span>
                <h4 className="text-lg font-bold text-apple-light-primary dark:text-apple-dark-primary tracking-tight">
                  {pillar.title}
                </h4>
                <p className="text-sm text-apple-light-secondary dark:text-apple-dark-secondary leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

