import React, { useState } from 'react';
import { Save, Check, Search, Globe, Eye } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export const AdminSEOSettings: React.FC = () => {
  const { seoSettings, updateSEOSettings } = usePortfolio();
  const [form, setForm] = useState(seoSettings);
  const [saved, setSaved] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateSEOSettings(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-apple-light-primary dark:text-apple-dark-primary">
            SEO &amp; Open Graph Settings
          </h1>
          <p className="text-xs sm:text-sm text-apple-light-secondary dark:text-apple-dark-secondary">
            Manage search engine metadata, social share previews, and indexing parameters.
          </p>
        </div>

        <button
          onClick={handleSave}
          type="button"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-apple-light-accent dark:bg-apple-dark-accent text-white dark:text-black font-semibold text-xs transition-transform active:scale-95 shadow-sm"
        >
          {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          <span>{saved ? 'Saved Changes!' : 'Save SEO Settings'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <form onSubmit={handleSave} className="lg:col-span-7 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-apple-dark-surface border border-black/5 dark:border-white/10 shadow-apple-sm space-y-5">
            <div>
              <label className="block text-xs uppercase font-bold text-apple-light-secondary dark:text-apple-dark-secondary mb-1">
                Page Title Tag (&lt;title&gt;)
              </label>
              <input
                type="text"
                required
                value={form.meta_title}
                onChange={(e) => setForm({ ...form, meta_title: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-apple-gray-100 dark:bg-black/50 border border-black/5 dark:border-white/10 text-xs sm:text-sm text-apple-light-primary dark:text-apple-dark-primary focus:outline-none focus:border-apple-light-accent"
              />
              <span className="text-[11px] text-apple-light-secondary mt-1 block">
                Recommended: 50–60 characters. Current: {form.meta_title.length} characters.
              </span>
            </div>

            <div>
              <label className="block text-xs uppercase font-bold text-apple-light-secondary dark:text-apple-dark-secondary mb-1">
                Meta Description
              </label>
              <textarea
                rows={4}
                required
                value={form.meta_description}
                onChange={(e) => setForm({ ...form, meta_description: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-apple-gray-100 dark:bg-black/50 border border-black/5 dark:border-white/10 text-xs sm:text-sm text-apple-light-primary dark:text-apple-dark-primary focus:outline-none focus:border-apple-light-accent"
              />
              <span className="text-[11px] text-apple-light-secondary mt-1 block">
                Recommended: 150–160 characters. Current: {form.meta_description.length} characters.
              </span>
            </div>

            <div>
              <label className="block text-xs uppercase font-bold text-apple-light-secondary dark:text-apple-dark-secondary mb-1">
                Target Keywords (comma-separated)
              </label>
              <input
                type="text"
                value={form.keywords}
                onChange={(e) => setForm({ ...form, keywords: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-apple-gray-100 dark:bg-black/50 border border-black/5 dark:border-white/10 text-xs sm:text-sm text-apple-light-primary dark:text-apple-dark-primary focus:outline-none focus:border-apple-light-accent"
              />
            </div>

            <div>
              <label className="block text-xs uppercase font-bold text-apple-light-secondary dark:text-apple-dark-secondary mb-1">
                Open Graph Image URL
              </label>
              <input
                type="text"
                value={form.og_image}
                onChange={(e) => setForm({ ...form, og_image: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-apple-gray-100 dark:bg-black/50 border border-black/5 dark:border-white/10 text-xs sm:text-sm text-apple-light-primary dark:text-apple-dark-primary focus:outline-none focus:border-apple-light-accent"
              />
            </div>
          </div>
        </form>

        {/* Google Search Result Preview */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-3xl bg-white dark:bg-apple-dark-surface border border-black/5 dark:border-white/10 shadow-apple-sm space-y-4">
            <h3 className="text-xs uppercase font-bold tracking-wider text-apple-light-secondary dark:text-apple-dark-secondary flex items-center gap-2">
              <Globe className="w-4 h-4 text-apple-light-accent dark:text-apple-dark-accent" />
              Google SERP Preview
            </h3>

            <div className="p-5 rounded-2xl bg-white border border-gray-200 text-left space-y-1 shadow-sm">
              <div className="text-[11px] text-gray-600 truncate">
                https://rishi-portfolio.dev
              </div>
              <div className="text-[#1a0dab] text-base font-medium truncate hover:underline cursor-pointer">
                {form.meta_title}
              </div>
              <div className="text-xs text-gray-700 leading-snug line-clamp-2">
                {form.meta_description}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

