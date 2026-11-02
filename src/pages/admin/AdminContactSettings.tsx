import React, { useState } from 'react';
import { Save, Check, Mail, Linkedin, Github, FileText, User } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export const AdminContactSettings: React.FC = () => {
  const { profile, updateProfile } = usePortfolio();
  const [form, setForm] = useState(profile);
  const [saved, setSaved] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-apple-light-primary dark:text-apple-dark-primary">
            Contact &amp; Profile Information
          </h1>
          <p className="text-xs sm:text-sm text-apple-light-secondary dark:text-apple-dark-secondary">
            Manage your personal branding, direct channels, LinkedIn, GitHub, and resume links.
          </p>
        </div>

        <button
          onClick={handleSave}
          type="button"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-apple-light-accent dark:bg-apple-dark-accent text-white dark:text-black font-semibold text-xs transition-transform active:scale-95 shadow-sm"
        >
          {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          <span>{saved ? 'Saved Changes!' : 'Save Information'}</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-apple-dark-surface border border-black/5 dark:border-white/10 shadow-apple-sm space-y-5">
          <h3 className="text-base font-bold tracking-tight text-apple-light-primary dark:text-apple-dark-primary pb-3 border-b border-black/5 dark:border-white/10">
            Personal Identity &amp; Positioning
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase font-bold text-apple-light-secondary dark:text-apple-dark-secondary mb-1">
                Full Display Name
              </label>
              <input
                type="text"
                required
                value={form.full_name}
                onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-apple-gray-100 dark:bg-black/50 border border-black/5 dark:border-white/10 text-xs sm:text-sm text-apple-light-primary dark:text-apple-dark-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs uppercase font-bold text-apple-light-secondary dark:text-apple-dark-secondary mb-1">
                Professional Title
              </label>
              <input
                type="text"
                required
                value={form.professional_title}
                onChange={(e) => setForm({ ...form, professional_title: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-apple-gray-100 dark:bg-black/50 border border-black/5 dark:border-white/10 text-xs sm:text-sm text-apple-light-primary dark:text-apple-dark-primary focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase font-bold text-apple-light-secondary dark:text-apple-dark-secondary mb-1">
                Current Role &amp; Company
              </label>
              <input
                type="text"
                value={form.current_role}
                onChange={(e) => setForm({ ...form, current_role: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-apple-gray-100 dark:bg-black/50 border border-black/5 dark:border-white/10 text-xs sm:text-sm text-apple-light-primary dark:text-apple-dark-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs uppercase font-bold text-apple-light-secondary dark:text-apple-dark-secondary mb-1">
                Career Direction
              </label>
              <input
                type="text"
                value={form.career_direction}
                onChange={(e) => setForm({ ...form, career_direction: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-apple-gray-100 dark:bg-black/50 border border-black/5 dark:border-white/10 text-xs sm:text-sm text-apple-light-primary dark:text-apple-dark-primary focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase font-bold text-apple-light-secondary dark:text-apple-dark-secondary mb-1">
              Tagline (Quotes)
            </label>
            <input
              type="text"
              value={form.tagline}
              onChange={(e) => setForm({ ...form, tagline: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-apple-gray-100 dark:bg-black/50 border border-black/5 dark:border-white/10 text-xs sm:text-sm text-apple-light-primary dark:text-apple-dark-primary focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs uppercase font-bold text-apple-light-secondary dark:text-apple-dark-secondary mb-1">
              Alternative Headline
            </label>
            <input
              type="text"
              value={form.headline}
              onChange={(e) => setForm({ ...form, headline: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-apple-gray-100 dark:bg-black/50 border border-black/5 dark:border-white/10 text-xs sm:text-sm text-apple-light-primary dark:text-apple-dark-primary focus:outline-none"
            />
          </div>
        </div>

        {/* Communication Channels */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-apple-dark-surface border border-black/5 dark:border-white/10 shadow-apple-sm space-y-5">
          <h3 className="text-base font-bold tracking-tight text-apple-light-primary dark:text-apple-dark-primary pb-3 border-b border-black/5 dark:border-white/10">
            Direct Communication Links
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase font-bold text-apple-light-secondary dark:text-apple-dark-secondary mb-1 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" />
                Email Address
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-apple-gray-100 dark:bg-black/50 border border-black/5 dark:border-white/10 text-xs sm:text-sm text-apple-light-primary dark:text-apple-dark-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs uppercase font-bold text-apple-light-secondary dark:text-apple-dark-secondary mb-1 flex items-center gap-1.5">
                <Linkedin className="w-3.5 h-3.5" />
                LinkedIn Profile URL
              </label>
              <input
                type="url"
                value={form.linkedin_url}
                onChange={(e) => setForm({ ...form, linkedin_url: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-apple-gray-100 dark:bg-black/50 border border-black/5 dark:border-white/10 text-xs sm:text-sm text-apple-light-primary dark:text-apple-dark-primary focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase font-bold text-apple-light-secondary dark:text-apple-dark-secondary mb-1 flex items-center gap-1.5">
                <Github className="w-3.5 h-3.5" />
                GitHub Profile URL
              </label>
              <input
                type="url"
                value={form.github_url}
                onChange={(e) => setForm({ ...form, github_url: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-apple-gray-100 dark:bg-black/50 border border-black/5 dark:border-white/10 text-xs sm:text-sm text-apple-light-primary dark:text-apple-dark-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs uppercase font-bold text-apple-light-secondary dark:text-apple-dark-secondary mb-1 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" />
                Resume File URL
              </label>
              <input
                type="text"
                value={form.resume_url}
                onChange={(e) => setForm({ ...form, resume_url: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-apple-gray-100 dark:bg-black/50 border border-black/5 dark:border-white/10 text-xs sm:text-sm text-apple-light-primary dark:text-apple-dark-primary focus:outline-none"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

