import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, ShieldCheck, Download } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { usePortfolio } from '../../context/PortfolioContext';
import { ThemeToggle } from './ThemeToggle';

export const Navbar: React.FC = () => {
  const { headerSettings, profile } = usePortfolio();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = headerSettings?.nav_links || [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'apple-glass border-b border-black/5 dark:border-white/10 py-3 shadow-apple-sm'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          {/* Logo / Personal Brand */}
          <a
            href="#hero"
            className="group flex items-center gap-2.5 text-apple-light-primary dark:text-apple-dark-primary font-semibold tracking-tight transition-opacity hover:opacity-80"
          >
            <span className="text-xl font-bold tracking-tight">
              {headerSettings?.logo_text || profile.full_name}
            </span>
            <span className="text-[10px] tracking-wider uppercase px-2 py-0.5 rounded-full font-medium bg-black/5 dark:bg-white/10 text-apple-light-secondary dark:text-apple-dark-secondary group-hover:bg-apple-light-accent group-hover:text-white dark:group-hover:bg-apple-dark-accent dark:group-hover:text-black transition-colors">
              {headerSettings?.logo_badge || 'SQE'}
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-3.5 py-1.5 text-xs lg:text-[13px] font-medium text-apple-light-secondary dark:text-apple-dark-secondary hover:text-apple-light-primary dark:hover:text-apple-dark-primary transition-colors rounded-full hover:bg-black/5 dark:hover:bg-white/5"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action Icons & Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <ThemeToggle />

            {/* Resume Button */}
            <a
              href={headerSettings?.resume_url || profile.resume_url || '/resume.pdf'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded-full bg-black/5 dark:bg-white/10 hover:bg-apple-light-accent hover:text-white dark:hover:bg-apple-dark-accent dark:hover:text-black text-apple-light-primary dark:text-apple-dark-primary transition-all duration-200"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{headerSettings?.resume_button_text || 'Resume'}</span>
            </a>

            {/* Admin Portal Gateway Icon */}
            <Link
              to="/admin"
              title="Admin Portal"
              className="p-1.5 rounded-full text-apple-light-secondary dark:text-apple-dark-secondary hover:text-apple-light-primary dark:hover:text-apple-dark-primary hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            >
              <ShieldCheck className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-2 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="p-2 rounded-lg text-apple-light-primary dark:text-apple-dark-primary hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Modal Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 apple-glass pt-24 px-6 md:hidden flex flex-col justify-between pb-12 animate-in fade-in duration-200">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-2xl font-semibold tracking-tight text-apple-light-primary dark:text-apple-dark-primary hover:text-apple-light-accent dark:hover:text-apple-dark-accent transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="pt-8 border-t border-black/10 dark:border-white/10 space-y-4">
            <a
              href={headerSettings?.resume_url || profile.resume_url || '/resume.pdf'}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex justify-center items-center gap-2 py-3 rounded-xl bg-apple-light-accent dark:bg-apple-dark-accent text-white dark:text-black font-medium text-sm transition-transform active:scale-95"
            >
              <Download className="w-4 h-4" />
              Download Full Resume
            </a>

            <div className="flex items-center justify-between text-xs text-apple-light-secondary dark:text-apple-dark-secondary pt-2">
              <Link
                to="/admin"
                className="inline-flex items-center gap-1.5 hover:text-apple-light-primary dark:hover:text-apple-dark-primary"
              >
                <ShieldCheck className="w-4 h-4" />
                Admin Dashboard
              </Link>
              <span>{profile.availability_status}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

