import React, { useState } from 'react';
import { Save, Check, Plus, Trash2 } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export const AdminAboutSettings: React.FC = () => {
  const { aboutSettings, updateAboutSettings } = usePortfolio();
  const [form, setForm] = useState(aboutSettings);
  const [saved, setSaved] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateAboutSettings(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleAddStat = () => {
    setForm({
      ...form,
      statistics: [
        ...form.statistics,
        { label: 'New Metric', value: '100%', description: 'Metric detail' },
      ],
    });
  };

  const handleRemoveStat = (index: number) => {
    setForm({
      ...form,
      statistics: form.statistics.filter((_, idx) => idx !== index),
    });
  };

  const handleUpdateStat = (index: number, field: string, val: string) => {
    const updated = [...form.statistics];
    updated[index] = { ...updated[index], [field]: val };
    setForm({ ...form, statistics: updated });
  };

  const handleAddParagraph = () => {
    setForm({
      ...form,
      paragraphs: [...form.paragraphs, 'New professional narrative paragraph...'],
    });
  };

  const handleRemoveParagraph = (index: number) => {
    setForm({
      ...form,
      paragraphs: form.paragraphs.filter((_, idx) => idx !== index),
    });
  };

  const handleUpdateParagraph = (index: number, val: string) => {
    const updated = [...form.paragraphs];
    updated[index] = val;
    setForm({ ...form, paragraphs: updated });
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-apple-light-primary dark:text-apple-dark-primary">
            About Section &amp; Metrics
          </h1>
          <p className="text-xs sm:text-sm text-apple-light-secondary dark:text-apple-dark-secondary">
            Manage your narrative story, professional introduction, and verifiable engineering metrics.
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

      <form onSubmit={handleSave} className="space-y-8">
        {/* Headings */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-apple-dark-surface border border-black/5 dark:border-white/10 shadow-apple-sm space-y-5">
          <h3 className="text-base font-bold tracking-tight text-apple-light-primary dark:text-apple-dark-primary pb-3 border-b border-black/5 dark:border-white/10">
            About Headlines
          </h3>

          <div>
            <label className="block text-xs uppercase font-bold text-apple-light-secondary dark:text-apple-dark-secondary mb-2">
              Main Section Heading
            </label>
            <input
              type="text"
              value={form.heading}
              onChange={(e) => setForm({ ...form, heading: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-apple-gray-100 dark:bg-black/50 border border-black/5 dark:border-white/10 text-xs sm:text-sm text-apple-light-primary dark:text-apple-dark-primary focus:outline-none focus:border-apple-light-accent"
            />
          </div>

          <div>
            <label className="block text-xs uppercase font-bold text-apple-light-secondary dark:text-apple-dark-secondary mb-2">
              Subheading / Philosophy
            </label>
            <input
              type="text"
              value={form.subheading}
              onChange={(e) => setForm({ ...form, subheading: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-apple-gray-100 dark:bg-black/50 border border-black/5 dark:border-white/10 text-xs sm:text-sm text-apple-light-primary dark:text-apple-dark-primary focus:outline-none focus:border-apple-light-accent"
            />
          </div>
        </div>

        {/* Narrative Paragraphs */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-apple-dark-surface border border-black/5 dark:border-white/10 shadow-apple-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-black/5 dark:border-white/10">
            <h3 className="text-base font-bold tracking-tight text-apple-light-primary dark:text-apple-dark-primary">
              Narrative Paragraphs
            </h3>
            <button
              onClick={handleAddParagraph}
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-black/5 dark:bg-white/10 hover:bg-apple-light-accent hover:text-white dark:hover:bg-apple-dark-accent dark:hover:text-black transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Paragraph</span>
            </button>
          </div>

          <div className="space-y-4">
            {form.paragraphs.map((p, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <textarea
                  rows={3}
                  value={p}
                  onChange={(e) => handleUpdateParagraph(idx, e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-apple-gray-100 dark:bg-black/50 border border-black/5 dark:border-white/10 text-xs sm:text-sm text-apple-light-primary dark:text-apple-dark-primary focus:outline-none focus:border-apple-light-accent"
                />
                <button
                  onClick={() => handleRemoveParagraph(idx)}
                  type="button"
                  className="p-2.5 rounded-xl text-red-500 hover:bg-red-500/10 transition-colors"
                  title="Remove paragraph"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Statistics Counters */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-apple-dark-surface border border-black/5 dark:border-white/10 shadow-apple-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-black/5 dark:border-white/10">
            <div>
              <h3 className="text-base font-bold tracking-tight text-apple-light-primary dark:text-apple-dark-primary">
                Professional Engineering Statistics
              </h3>
              <p className="text-xs text-apple-light-secondary dark:text-apple-dark-secondary">
                Verifiable metrics displayed on the public about section
              </p>
            </div>
            <button
              onClick={handleAddStat}
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-black/5 dark:bg-white/10 hover:bg-apple-light-accent hover:text-white dark:hover:bg-apple-dark-accent dark:hover:text-black transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Statistic</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {form.statistics.map((stat, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/5 dark:border-white/5 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono text-apple-light-secondary dark:text-apple-dark-secondary">
                    STAT 0{idx + 1}
                  </span>
                  <button
                    onClick={() => handleRemoveStat(idx)}
                    type="button"
                    className="text-red-500 hover:text-red-700 p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-apple-light-secondary dark:text-apple-dark-secondary mb-1">
                      Value (e.g. 3+)
                    </label>
                    <input
                      type="text"
                      value={stat.value}
                      onChange={(e) => handleUpdateStat(idx, 'value', e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-apple-gray-100 dark:bg-black/40 border border-black/5 dark:border-white/10 text-xs text-apple-light-primary dark:text-apple-dark-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-apple-light-secondary dark:text-apple-dark-secondary mb-1">
                      Label
                    </label>
                    <input
                      type="text"
                      value={stat.label}
                      onChange={(e) => handleUpdateStat(idx, 'label', e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-apple-gray-100 dark:bg-black/40 border border-black/5 dark:border-white/10 text-xs text-apple-light-primary dark:text-apple-dark-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold text-apple-light-secondary dark:text-apple-dark-secondary mb-1">
                    Description Subtitle
                  </label>
                  <input
                    type="text"
                    value={stat.description || ''}
                    onChange={(e) => handleUpdateStat(idx, 'description', e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-apple-gray-100 dark:bg-black/40 border border-black/5 dark:border-white/10 text-xs text-apple-light-primary dark:text-apple-dark-primary"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
};

