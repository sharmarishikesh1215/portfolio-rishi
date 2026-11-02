import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Compass,
  User,
  Briefcase,
  FolderGit2,
  Cpu,
  Mail,
  MessageSquare,
  Search,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  ShieldCheck,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { usePortfolio } from '../../context/PortfolioContext';
import { ThemeToggle } from '../../components/layout/ThemeToggle';

export const AdminLayout: React.FC = () => {
  const { user, isAdmin, loading, logout, isSupabaseConnected } = useAuth();
  const { messages } = usePortfolio();
  const navigate = useNavigate();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Unread messages count
  const unreadCount = messages.filter((m) => m.status === 'unread').length;

  React.useEffect(() => {
    if (!loading && !isAdmin) {
      navigate('/admin/login');
    }
  }, [loading, isAdmin, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-apple-gray-100 dark:bg-black flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-2 border-apple-light-accent dark:border-apple-dark-accent border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-apple-light-secondary dark:text-apple-dark-secondary">
            Verifying admin authorization...
          </p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const navItems = [
    { label: 'Dashboard', path: '/admin', icon: LayoutDashboard, end: true },
    { label: 'Hero / Header Settings', path: '/admin/hero', icon: Compass },
    { label: 'About Settings', path: '/admin/about', icon: User },
    { label: 'Experience', path: '/admin/experiences', icon: Briefcase },
    { label: 'Projects', path: '/admin/projects', icon: FolderGit2 },
    { label: 'Skills', path: '/admin/skills', icon: Cpu },
    { label: 'Contact Information', path: '/admin/contact-info', icon: Mail },
    {
      label: 'Messages',
      path: '/admin/messages',
      icon: MessageSquare,
      badge: unreadCount > 0 ? unreadCount : undefined,
    },
    { label: 'SEO Settings', path: '/admin/seo', icon: Search },
    { label: 'Site Settings', path: '/admin/site-settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-apple-gray-100 dark:bg-black text-apple-light-primary dark:text-apple-dark-primary flex transition-colors">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-72 border-r border-black/10 dark:border-white/10 bg-white dark:bg-apple-dark-surface sticky top-0 h-screen justify-between p-6">
        <div>
          {/* Logo / Brand */}
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-black/5 dark:border-white/10">
            <Link to="/admin" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-apple-light-accent dark:bg-apple-dark-accent flex items-center justify-center text-white dark:text-black font-bold text-sm">
                R
              </div>
              <div>
                <span className="font-bold text-sm tracking-tight block">Rishi Admin</span>
                <span className="text-[10px] text-apple-light-secondary dark:text-apple-dark-secondary block">
                  SDET Management
                </span>
              </div>
            </Link>

            <span
              className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                isSupabaseConnected
                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                  : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
              }`}
            >
              {isSupabaseConnected ? 'Live Supabase' : 'Offline Store'}
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.end}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-apple-light-accent dark:bg-apple-dark-accent text-white dark:text-black shadow-apple-sm'
                        : 'text-apple-light-secondary dark:text-apple-dark-secondary hover:text-apple-light-primary dark:hover:text-apple-dark-primary hover:bg-black/5 dark:hover:bg-white/5'
                    }`
                  }
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-500 text-white">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="pt-6 border-t border-black/5 dark:border-white/10 space-y-3">
          <Link
            to="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs text-apple-light-secondary dark:text-apple-dark-secondary hover:text-apple-light-primary dark:hover:text-apple-dark-primary hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5" />
              <span>View Live Portfolio</span>
            </span>
          </Link>

          <button
            onClick={handleLogout}
            type="button"
            className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-red-600 dark:text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 apple-glass border-b border-black/10 dark:border-white/10 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              type="button"
              className="lg:hidden p-2 rounded-lg text-apple-light-primary dark:text-apple-dark-primary hover:bg-black/5 dark:hover:bg-white/10"
            >
              {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <h2 className="text-sm font-semibold tracking-tight text-apple-light-primary dark:text-apple-dark-primary hidden sm:block">
              Portfolio Control Center
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-black/5 dark:bg-white/10 hover:bg-black/10 text-apple-light-primary dark:text-apple-dark-primary transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Live Site</span>
            </Link>
            <div className="text-xs font-medium px-3 py-1.5 rounded-full bg-apple-light-accent/10 dark:bg-apple-dark-accent/10 text-apple-light-accent dark:text-apple-dark-accent">
              {user?.email || 'admin'}
            </div>
          </div>
        </header>

        {/* Mobile Navigation Drawer */}
        {mobileSidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm pt-20 px-6 pb-6">
            <div className="bg-white dark:bg-apple-dark-surface rounded-3xl p-6 shadow-apple-lg max-h-[85vh] overflow-y-auto space-y-4">
              <nav className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      end={item.end}
                      onClick={() => setMobileSidebarOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold ${
                          isActive
                            ? 'bg-apple-light-accent dark:bg-apple-dark-accent text-white dark:text-black'
                            : 'text-apple-light-secondary dark:text-apple-dark-secondary'
                        }`
                      }
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </div>
                      {item.badge !== undefined && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-500 text-white">
                          {item.badge}
                        </span>
                      )}
                    </NavLink>
                  );
                })}
              </nav>

              <button
                onClick={handleLogout}
                type="button"
                className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-red-600 dark:text-red-400 bg-red-500/10"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        )}

        {/* Nested Page Content */}
        <main className="p-6 sm:p-8 max-w-6xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

