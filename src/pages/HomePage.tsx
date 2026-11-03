import React, { useEffect } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { HeroSection } from '../components/sections/HeroSection';
import { AboutSection } from '../components/sections/AboutSection';
import { ExperienceSection } from '../components/sections/ExperienceSection';
import { ProjectsSection } from '../components/sections/ProjectsSection';
import { SkillsSection } from '../components/sections/SkillsSection';
import { ContactSection } from '../components/sections/ContactSection';
import { Footer } from '../components/layout/Footer';
import { usePortfolio } from '../context/PortfolioContext';

export const HomePage: React.FC = () => {
  const { seoSettings } = usePortfolio();

  // Update dynamic SEO page title & meta description
  useEffect(() => {
    if (seoSettings?.meta_title) {
      document.title = seoSettings.meta_title;
    }
    if (seoSettings?.meta_description) {
      const meta = document.querySelector('meta[name="description"]');
      if (meta) {
        meta.setAttribute('content', seoSettings.meta_description);
      }
    }
  }, [seoSettings]);

  return (
    <div className="min-h-screen bg-white dark:bg-black text-apple-light-primary dark:text-apple-dark-primary transition-colors">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};
