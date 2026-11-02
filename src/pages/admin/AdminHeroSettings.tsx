import React, { useState } from 'react';
import { Save, Check, RefreshCw, Eye } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export const AdminHeroSettings: React.FC = () => {
  const { heroSettings, headerSettings, updateHeroSettings, updateHeaderSettings } = usePortfolio();

  const [heroForm, setHeroForm] = useState(heroSettings);
  const [headerForm, setHeaderForm] = useState(headerSettings);
  const [saved, setSaved] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateHeroSettings(heroForm);
    await updateHeaderSettings(headerForm);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-apple-light-primary dark:text-apple-dark-primary">
            Hero &amp; Header Settings
          </h1>
          <p className="text-xs sm:text-sm text-apple-light-secondary dark:text-apple-dark-secondary">
            Manage your landing headlines, call-to-actions, and navigation bar.
          </p>
        </div>

        <button
          onClick={handleSave}
          type="button"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-apple-light-accent dark:bg-apple-dark-accent text-white dark:text-black font-semibold text-xs transition-transform active:scale-95 shadow-sm"
        >
          {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          <span>{saved ? 'Saved Changes!' : 'Save All Settings'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Editor Form */}
        <form onSubmit={handleSave} className="lg:col-span-7 space-y-6">
          {/* Header Bar Settings */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-apple-dark-surface border border-black/5 dark:border-white/10 shadow-apple-sm space-y-5">
            <h3 className="text-base font-bold tracking-tight text-apple-light-primary dark:text-apple-dark-primary pb-3 border-b border-black/5 dark:border-white/10">
              Navigation Bar
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase font-bold text-apple-light-secondary dark:text-apple-dark-secondary mb-2">
                  Wordmark / Logo Text
                </label>
                <input
                  type="text"
                  value={headerForm.logo_text}
                  onChange={(e) => setHeaderForm({ ...headerForm, logo_text: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-apple-gray-100 dark:bg-black/50 border border-black/5 dark:border-white/10 text-xs sm:text-sm text-apple-light-primary dark:text-apple-dark-primary focus:outline-none focus:border-apple-light-accent"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-bold text-apple-light-secondary dark:text-apple-dark-secondary mb-2">
                  Role Badge Text
                </label>
                <input
                  type="text"
                  value={headerForm.logo_badge}
                  onChange={(e) => setHeaderForm({ ...headerForm, logo_badge: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-apple-gray-100 dark:bg-black/50 border border-black/5 dark:border-white/10 text-xs sm:text-sm text-apple-light-primary dark:text-apple-dark-primary focus:outline-none focus:border-apple-light-accent"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase font-bold text-apple-light-secondary dark:text-apple-dark-secondary mb-2">
                  Resume Button Text
                </label>
                <input
                  type="text"
                  value={headerForm.resume_button_text}
                  onChange={(e) =>
                    setHeaderForm({ ...headerForm, resume_button_text: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-apple-gray-100 dark:bg-black/50 border border-black/5 dark:border-white/10 text-xs sm:text-sm text-apple-light-primary dark:text-apple-dark-primary focus:outline-none focus:border-apple-light-accent"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-bold text-apple-light-secondary dark:text-apple-dark-secondary mb-2">
                  Resume Link / URL
                </label>
                <input
                  type="text"
                  value={headerForm.resume_url}
                  onChange={(e) => setHeaderForm({ ...headerForm, resume_url: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-apple-gray-100 dark:bg-black/50 border border-black/5 dark:border-white/10 text-xs sm:text-sm text-apple-light-primary dark:text-apple-dark-primary focus:outline-none focus:border-apple-light-accent"
                />
              </div>
            </div>
          </div>

          {/* Hero Section Editorial */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-apple-dark-surface border border-black/5 dark:border-white/10 shadow-apple-sm space-y-5">
            <h3 className="text-base font-bold tracking-tight text-apple-light-primary dark:text-apple-dark-primary pb-3 border-b border-black/5 dark:border-white/10">
              Hero Section Content
            </h3>

            <div>
              <label className="block text-xs uppercase font-bold text-apple-light-secondary dark:text-apple-dark-secondary mb-2">
                Availability Status Pill
              </label>
              <input
                type="text"
                value={heroForm.availability_status}
                onChange={(e) =>
                  setHeroForm({ ...heroForm, availability_status: e.target.value })
                }
                className="w-full px-4 py-2.5 rounded-xl bg-apple-gray-100 dark:bg-black/50 border border-black/5 dark:border-white/10 text-xs sm:text-sm text-apple-light-primary dark:text-apple-dark-primary focus:outline-none focus:border-apple-light-accent"
              />
            </div>

            <div>
              <label className="block text-xs uppercase font-bold text-apple-light-secondary dark:text-apple-dark-secondary mb-2">
                Main Editorial Headline (Supports line breaks)
              </label>
              <textarea
                rows={3}
                value={heroForm.main_headline}
                onChange={(e) => setHeroForm({ ...heroForm, main_headline: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-apple-gray-100 dark:bg-black/50 border border-black/5 dark:border-white/10 text-xs sm:text-sm text-apple-light-primary dark:text-apple-dark-primary focus:outline-none focus:border-apple-light-accent font-mono"
              />
            </div>

            <div>
              <label className="block text-xs uppercase font-bold text-apple-light-secondary dark:text-apple-dark-secondary mb-2">
                Supporting Text / Narrative
              </label>
              <textarea
                rows={3}
                value={heroForm.sub_headline}
                onChange={(e) => setHeroForm({ ...heroForm, sub_headline: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-apple-gray-100 dark:bg-black/50 border border-black/5 dark:border-white/10 text-xs sm:text-sm text-apple-light-primary dark:text-apple-dark-primary focus:outline-none focus:border-apple-light-accent"
              />
            </div>

            {/* CTAs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase font-bold text-apple-light-secondary dark:text-apple-dark-secondary mb-2">
                  Primary CTA Label
                </label>
                <input
                  type="text"
                  value={heroForm.primary_cta_text}
                  onChange={(e) =>
                    setHeroForm({ ...heroForm, primary_cta_text: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-apple-gray-100 dark:bg-black/50 border border-black/5 dark:border-white/10 text-xs sm:text-sm text-apple-light-primary dark:text-apple-dark-primary focus:outline-none focus:border-apple-light-accent"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-bold text-apple-light-secondary dark:text-apple-dark-secondary mb-2">
                  Primary CTA Target
                </label>
                <input
                  type="text"
                  value={heroForm.primary_cta_link}
                  onChange={(e) =>
                    setHeroForm({ ...heroForm, primary_cta_link: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-apple-gray-100 dark:bg-black/50 border border-black/5 dark:border-white/10 text-xs sm:text-sm text-apple-light-primary dark:text-apple-dark-primary focus:outline-none focus:border-apple-light-accent"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase font-bold text-apple-light-secondary dark:text-apple-dark-secondary mb-2">
                  Secondary CTA Label
                </label>
                <input
                  type="text"
                  value={heroForm.secondary_cta_text}
                  onChange={(e) =>
                    setHeroForm({ ...heroForm, secondary_cta_text: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-apple-gray-100 dark:bg-black/50 border border-black/5 dark:border-white/10 text-xs sm:text-sm text-apple-light-primary dark:text-apple-dark-primary focus:outline-none focus:border-apple-light-accent"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-bold text-apple-light-secondary dark:text-apple-dark-secondary mb-2">
                  Secondary CTA Target
                </label>
                <input
                  type="text"
                  value={heroForm.secondary_cta_link}
                  onChange={(e) =>
                    setHeroForm({ ...heroForm, secondary_cta_link: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-apple-gray-100 dark:bg-black/50 border border-black/5 dark:border-white/10 text-xs sm:text-sm text-apple-light-primary dark:text-apple-dark-primary focus:outline-none focus:border-apple-light-accent"
                />
              </div>
            </div>

            {/* Ambient Toggle */}
            <div className="pt-2 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-apple-light-primary dark:text-apple-dark-primary block">
                  Interactive Ambient Canvas Lighting
                </span>
                <span className="text-[11px] text-apple-light-secondary dark:text-apple-dark-secondary block">
                  Renders Apple-style fluid light background in hero
                </span>
              </div>
              <input
                type="checkbox"
                checked={heroForm.enable_ambient_canvas}
                onChange={(e) =>
                  setHeroForm({ ...heroForm, enable_ambient_canvas: e.target.checked })
                }
                className="w-4 h-4 rounded text-apple-light-accent focus:ring-0"
              />
            </div>
          </div>
        </form>

        {/* Live Preview Card */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-3xl bg-white dark:bg-apple-dark-surface border border-black/5 dark:border-white/10 shadow-apple-sm sticky top-24 space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-black/5 dark:border-white/10">
              <Eye className="w-4 h-4 text-apple-light-accent dark:text-apple-dark-accent" />
              <h3 className="text-xs uppercase font-bold tracking-wider text-apple-light-primary dark:text-apple-dark-primary">
                Live Dynamic Preview
              </h3>
            </div>

            {/* Mini preview container */}
            <div className="p-6 rounded-2xl bg-apple-gray-100 dark:bg-black/80 border border-black/5 dark:border-white/10 text-center space-y-4">
              <div className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                &bull; {heroForm.availability_status}
              </div>

              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-apple-light-primary dark:text-apple-dark-primary whitespace-pre-line leading-tight">
                {heroForm.main_headline}
              </h2>

              <p className="text-xs text-apple-light-secondary dark:text-apple-dark-secondary line-clamp-3">
                {heroForm.sub_headline}
              </p>

              <div className="flex items-center justify-center gap-2 pt-2">
                <span className="px-3 py-1 rounded-full bg-apple-light-accent dark:bg-apple-dark-accent text-white dark:text-black text-[11px] font-semibold">
                  {heroForm.primary_cta_text}
                </span>
                <span className="px-3 py-1 rounded-full bg-black/5 dark:bg-white/10 text-[11px] font-medium text-apple-light-primary dark:text-apple-dark-primary">
                  {heroForm.secondary_cta_text}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

