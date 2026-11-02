import React, { useState } from 'react';
import {
  Download,
  Upload,
  RotateCcw,
  Check,
  Database,
  ShieldCheck,
  Server,
  Code,
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

export const AdminSiteSettings: React.FC = () => {
  const {
    profile,
    heroSettings,
    aboutSettings,
    headerSettings,
    seoSettings,
    projects,
    experiences,
    skills,
    messages,
    resetToDefaults,
  } = usePortfolio();

  const { isSupabaseConnected } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [copiedStatus, setCopiedStatus] = useState(false);

  // Export JSON backup
  const handleExportJSON = () => {
    const backupData = {
      exportedAt: new Date().toISOString(),
      profile,
      heroSettings,
      aboutSettings,
      headerSettings,
      seoSettings,
      projects,
      experiences,
      skills,
      messages,
    };

    const blob = new Blob([JSON.stringify(backupData, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `rishi_portfolio_backup_${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleResetDefaults = () => {
    if (
      window.confirm(
        'Are you sure you want to reset all data to default seed data? Any custom modifications will be replaced.'
      )
    ) {
      resetToDefaults();
      setCopiedStatus(true);
      setTimeout(() => setCopiedStatus(false), 2500);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-apple-light-primary dark:text-apple-dark-primary mb-1">
          System &amp; Database Settings
        </h1>
        <p className="text-xs sm:text-sm text-apple-light-secondary dark:text-apple-dark-secondary">
          Backend diagnostics, storage connection status, and JSON data portability.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Backend Architecture Status */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-apple-dark-surface border border-black/5 dark:border-white/10 shadow-apple-sm space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-apple-light-accent/10 dark:bg-apple-dark-accent/10 text-apple-light-accent dark:text-apple-dark-accent">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold tracking-tight text-apple-light-primary dark:text-apple-dark-primary">
                Backend Connection Status
              </h3>
              <p className="text-xs text-apple-light-secondary dark:text-apple-dark-secondary">
                Supabase PostgreSQL &amp; Auth Diagnostics
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-apple-light-secondary dark:text-apple-dark-secondary">
                Current Engine:
              </span>
              <span
                className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                  isSupabaseConnected
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                    : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                }`}
              >
                {isSupabaseConnected ? 'Connected to Supabase' : 'Offline / Local Store'}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-apple-light-secondary dark:text-apple-dark-secondary">
                Row-Level Security:
              </span>
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                Enabled (schema.sql)
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-apple-light-secondary dark:text-apple-dark-secondary">
                Storage Buckets:
              </span>
              <span className="text-xs font-semibold text-apple-light-primary dark:text-apple-dark-primary">
                portfolio-media, documents
              </span>
            </div>
          </div>

          <p className="text-xs text-apple-light-secondary dark:text-apple-dark-secondary leading-relaxed">
            To connect your live cloud Supabase project, supply <code className="px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/10 font-mono text-[11px]">VITE_SUPABASE_URL</code> and <code className="px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/10 font-mono text-[11px]">VITE_SUPABASE_ANON_KEY</code> in your <code className="font-mono">.env</code> file.
          </p>
        </div>

        {/* Data Backup & Portability */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-apple-dark-surface border border-black/5 dark:border-white/10 shadow-apple-sm space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold tracking-tight text-apple-light-primary dark:text-apple-dark-primary">
                Data Portability &amp; Backups
              </h3>
              <p className="text-xs text-apple-light-secondary dark:text-apple-dark-secondary">
                Export and restore complete JSON snapshot
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleExportJSON}
              type="button"
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/15 text-xs font-semibold text-apple-light-primary dark:text-apple-dark-primary transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Export Portfolio Data (JSON Snapshot)</span>
            </button>

            <button
              onClick={handleResetDefaults}
              type="button"
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-red-500/10 hover:bg-red-500/20 text-xs font-semibold text-red-600 dark:text-red-400 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{copiedStatus ? 'Seed Data Restored!' : 'Reset to Default Seed Data'}</span>
            </button>
          </div>

          <p className="text-xs text-apple-light-secondary dark:text-apple-dark-secondary leading-relaxed">
            Exporting creates a full offline JSON backup containing all 6 demonstration projects, career experience entries, skills matrix, and message logs.
          </p>
        </div>
      </div>
    </div>
  );
};

