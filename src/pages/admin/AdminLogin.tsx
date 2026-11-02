import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, ArrowRight, ShieldCheck, AlertCircle, ArrowLeft, CheckCircle2, UserPlus, LogIn } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { ThemeToggle } from '../../components/layout/ThemeToggle';

export const AdminLogin: React.FC = () => {
  const { login, signUp, isAdmin, isSupabaseConnected } = useAuth();
  const navigate = useNavigate();

  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('sharmarishikesh12.15@gmail.com');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [infoMessage, setInfoMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // If already logged in, redirect to /admin
  React.useEffect(() => {
    if (isAdmin) {
      navigate('/admin');
    }
  }, [isAdmin, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setInfoMessage('');
    setLoading(true);

    if (mode === 'signup') {
      const result = await signUp(email, password);
      setLoading(false);
      if (result.success) {
        if (result.message) {
          setInfoMessage(result.message);
          setMode('signin');
        } else {
          navigate('/admin');
        }
      } else {
        setError(result.error || 'Failed to create account.');
      }
    } else {
      const result = await login(email, password);
      setLoading(false);

      if (result.success) {
        navigate('/admin');
      } else {
        setError(result.error || 'Authentication failed. Please verify credentials.');
      }
    }
  };

  const handleUseDemo = () => {
    setEmail('admin@rishi.dev');
    setPassword('QualityFirst2026!');
    setMode('signin');
    setError('');
  };

  return (
    <div className="min-h-screen bg-apple-gray-100 dark:bg-black flex flex-col justify-between p-6 transition-colors">
      {/* Top Header */}
      <div className="max-w-5xl mx-auto w-full flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-apple-light-secondary dark:text-apple-dark-secondary hover:text-apple-light-primary dark:hover:text-apple-dark-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Portfolio</span>
        </Link>
        <ThemeToggle />
      </div>

      {/* Login Card */}
      <div className="max-w-md mx-auto w-full my-auto animate-in zoom-in-95 duration-300">
        <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-apple-dark-surface border border-black/10 dark:border-white/10 shadow-apple-lg">
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-2xl bg-apple-light-accent/10 dark:bg-apple-dark-accent/10 text-apple-light-accent dark:text-apple-dark-accent mx-auto flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-apple-light-primary dark:text-apple-dark-primary">
              Admin Gateway
            </h1>
            <p className="text-xs sm:text-sm text-apple-light-secondary dark:text-apple-dark-secondary mt-1">
              Protected portfolio management system
            </p>
          </div>

          {/* Mode Switcher (Sign In vs Create Supabase User) */}
          {isSupabaseConnected && (
            <div className="flex p-1 bg-apple-gray-100 dark:bg-black/40 rounded-xl mb-6 border border-black/5 dark:border-white/5">
              <button
                type="button"
                onClick={() => { setMode('signin'); setError(''); }}
                className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                  mode === 'signin'
                    ? 'bg-white dark:bg-apple-dark-surface text-apple-light-primary dark:text-apple-dark-primary shadow-sm'
                    : 'text-apple-light-secondary dark:text-apple-dark-secondary hover:text-apple-light-primary dark:hover:text-apple-dark-primary'
                }`}
              >
                <LogIn className="w-3.5 h-3.5" />
                Sign In
              </button>
              <button
                type="button"
                onClick={() => { setMode('signup'); setError(''); }}
                className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                  mode === 'signup'
                    ? 'bg-white dark:bg-apple-dark-surface text-apple-light-primary dark:text-apple-dark-primary shadow-sm'
                    : 'text-apple-light-secondary dark:text-apple-dark-secondary hover:text-apple-light-primary dark:hover:text-apple-dark-primary'
                }`}
              >
                <UserPlus className="w-3.5 h-3.5" />
                Register Admin
              </button>
            </div>
          )}

          {infoMessage && (
            <div className="mb-6 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{infoMessage}</span>
            </div>
          )}

          {error && (
            <div className="mb-6 p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs uppercase font-bold text-apple-light-secondary dark:text-apple-dark-secondary tracking-wider mb-2">
                Administrator Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="sharmarishikesh12.15@gmail.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-apple-gray-100 dark:bg-black/50 border border-black/5 dark:border-white/10 text-sm text-apple-light-primary dark:text-apple-dark-primary placeholder:text-apple-light-secondary/40 focus:outline-none focus:border-apple-light-accent dark:focus:border-apple-dark-accent transition-colors"
                />
                <Mail className="w-4 h-4 text-apple-light-secondary dark:text-apple-dark-secondary absolute left-3.5 top-3.5" />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase font-bold text-apple-light-secondary dark:text-apple-dark-secondary tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-apple-gray-100 dark:bg-black/50 border border-black/5 dark:border-white/10 text-sm text-apple-light-primary dark:text-apple-dark-primary placeholder:text-apple-light-secondary/40 focus:outline-none focus:border-apple-light-accent dark:focus:border-apple-dark-accent transition-colors"
                />
                <Lock className="w-4 h-4 text-apple-light-secondary dark:text-apple-dark-secondary absolute left-3.5 top-3.5" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-apple-light-accent dark:bg-apple-dark-accent text-white dark:text-black font-semibold text-sm hover:opacity-95 active:scale-98 transition-all disabled:opacity-50"
            >
              {loading ? (
                <span>Processing...</span>
              ) : (
                <>
                  <span>{mode === 'signup' ? 'Create Admin Account' : 'Sign In'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Notice */}
          <div className="mt-8 pt-6 border-t border-black/5 dark:border-white/10 text-center space-y-2">
            <p className="text-[11px] text-apple-light-secondary dark:text-apple-dark-secondary leading-relaxed">
              {isSupabaseConnected ? (
                <span className="text-emerald-500 font-medium inline-flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
                  Supabase Auth Engine Active
                </span>
              ) : (
                <span className="text-amber-500 font-medium">
                  Supabase not detected in build &bull; Offline / Demo mode active
                </span>
              )}
            </p>

            <button
              type="button"
              onClick={handleUseDemo}
              className="text-[11px] text-apple-light-secondary hover:text-apple-light-primary dark:text-apple-dark-secondary dark:hover:text-apple-dark-primary underline underline-offset-2 transition-colors"
            >
              Fill Demo Evaluation Credentials (admin@rishi.dev)
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-apple-light-secondary dark:text-apple-dark-secondary">
        Rishi Portfolio Admin &bull; Secure Session Protection
      </div>
    </div>
  );
};
