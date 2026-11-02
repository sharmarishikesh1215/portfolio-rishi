import React from 'react';
import { Link } from 'react-router-dom';
import {
  FolderGit2,
  CheckCircle,
  Clock,
  MessageSquare,
  ArrowRight,
  TrendingUp,
  Cpu,
  Briefcase,
  ExternalLink,
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { formatDate } from '../../lib/utils';

export const AdminDashboard: React.FC = () => {
  const { projects, messages, skills, experiences, updateMessageStatus } = usePortfolio();

  const totalProjects = projects.length;
  const publishedProjects = projects.filter((p) => p.published).length;
  const draftProjects = totalProjects - publishedProjects;
  const totalMessages = messages.length;
  const unreadMessages = messages.filter((m) => m.status === 'unread').length;

  const stats = [
    {
      title: 'Total Projects',
      value: totalProjects,
      description: `${publishedProjects} published &bull; ${draftProjects} draft`,
      icon: FolderGit2,
      link: '/admin/projects',
      color: 'text-blue-500 bg-blue-500/10',
    },
    {
      title: 'Live Published',
      value: publishedProjects,
      description: 'Active on public portfolio',
      icon: CheckCircle,
      link: '/admin/projects',
      color: 'text-emerald-500 bg-emerald-500/10',
    },
    {
      title: 'Contact Inquiries',
      value: totalMessages,
      description: `${unreadMessages} pending response`,
      icon: MessageSquare,
      link: '/admin/messages',
      color: 'text-purple-500 bg-purple-500/10',
    },
    {
      title: 'Active Skills',
      value: skills.length,
      description: 'Across 10 technical categories',
      icon: Cpu,
      link: '/admin/skills',
      color: 'text-amber-500 bg-amber-500/10',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-apple-light-primary dark:text-apple-dark-primary mb-1">
          Welcome back, Rishi.
        </h1>
        <p className="text-xs sm:text-sm text-apple-light-secondary dark:text-apple-dark-secondary">
          Here is an overview of your portfolio content, inquiries, and automation projects.
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <Link
              key={idx}
              to={stat.link}
              className="p-5 rounded-3xl bg-white dark:bg-apple-dark-surface border border-black/5 dark:border-white/10 shadow-apple-sm hover:shadow-apple-md hover:border-black/15 dark:hover:border-white/20 transition-all flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-apple-light-secondary dark:text-apple-dark-secondary">
                  {stat.title}
                </span>
                <div className={`p-2 rounded-xl ${stat.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div>
                <span className="text-3xl font-extrabold tracking-tight text-apple-light-primary dark:text-apple-dark-primary block mb-1">
                  {stat.value}
                </span>
                <span
                  className="text-xs text-apple-light-secondary dark:text-apple-dark-secondary"
                  dangerouslySetInnerHTML={{ __html: stat.description }}
                />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick Shortcuts & Recent Inquiries */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Recent Inquiries List */}
        <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl bg-white dark:bg-apple-dark-surface border border-black/5 dark:border-white/10 shadow-apple-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-black/5 dark:border-white/10">
            <div>
              <h3 className="text-base font-bold tracking-tight text-apple-light-primary dark:text-apple-dark-primary">
                Recent Inquiries
              </h3>
              <p className="text-xs text-apple-light-secondary dark:text-apple-dark-secondary">
                Submitted through the public contact form
              </p>
            </div>
            <Link
              to="/admin/messages"
              className="text-xs font-semibold text-apple-light-accent dark:text-apple-dark-accent hover:underline inline-flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {messages.length === 0 ? (
            <div className="py-12 text-center text-xs text-apple-light-secondary dark:text-apple-dark-secondary">
              No inquiries received yet.
            </div>
          ) : (
            <div className="space-y-3">
              {messages.slice(0, 4).map((msg) => (
                <div
                  key={msg.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    msg.status === 'unread'
                      ? 'bg-apple-light-accent/5 dark:bg-apple-dark-accent/10 border-apple-light-accent/20 dark:border-apple-dark-accent/30'
                      : 'bg-black/[0.01] dark:bg-white/[0.01] border-black/5 dark:border-white/5'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-apple-light-primary dark:text-apple-dark-primary">
                          {msg.name}
                        </span>
                        <span className="text-xs text-apple-light-secondary dark:text-apple-dark-secondary">
                          &bull; {msg.email}
                        </span>
                      </div>
                      <span className="text-xs font-medium text-apple-light-primary dark:text-apple-dark-primary block mt-0.5">
                        {msg.subject}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[11px] text-apple-light-secondary dark:text-apple-dark-secondary">
                        {formatDate(msg.created_at)}
                      </span>
                      <button
                        onClick={() =>
                          updateMessageStatus(
                            msg.id,
                            msg.status === 'unread' ? 'read' : 'unread'
                          )
                        }
                        type="button"
                        className={`text-[10px] px-2 py-0.5 rounded-full font-semibold transition-colors ${
                          msg.status === 'unread'
                            ? 'bg-apple-light-accent text-white dark:bg-apple-dark-accent dark:text-black'
                            : 'bg-black/5 dark:bg-white/10 text-apple-light-secondary dark:text-apple-dark-secondary'
                        }`}
                      >
                        {msg.status === 'unread' ? 'Mark Read' : 'Read'}
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-apple-light-secondary dark:text-apple-dark-secondary line-clamp-2 leading-relaxed">
                    {msg.message}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Management Shortcuts */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-6 rounded-3xl bg-white dark:bg-apple-dark-surface border border-black/5 dark:border-white/10 shadow-apple-sm space-y-4">
            <h3 className="text-sm font-bold tracking-tight text-apple-light-primary dark:text-apple-dark-primary">
              Management Centers
            </h3>

            <div className="space-y-2">
              <Link
                to="/admin/hero"
                className="flex items-center justify-between p-3 rounded-2xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-xs font-semibold text-apple-light-primary dark:text-apple-dark-primary"
              >
                <span>Edit Hero &amp; Navigation</span>
                <ArrowRight className="w-3.5 h-3.5 text-apple-light-secondary" />
              </Link>
              <Link
                to="/admin/about"
                className="flex items-center justify-between p-3 rounded-2xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-xs font-semibold text-apple-light-primary dark:text-apple-dark-primary"
              >
                <span>Edit About &amp; Metrics</span>
                <ArrowRight className="w-3.5 h-3.5 text-apple-light-secondary" />
              </Link>
              <Link
                to="/admin/projects"
                className="flex items-center justify-between p-3 rounded-2xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-xs font-semibold text-apple-light-primary dark:text-apple-dark-primary"
              >
                <span>Manage 6 Projects</span>
                <ArrowRight className="w-3.5 h-3.5 text-apple-light-secondary" />
              </Link>
              <Link
                to="/admin/experiences"
                className="flex items-center justify-between p-3 rounded-2xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-xs font-semibold text-apple-light-primary dark:text-apple-dark-primary"
              >
                <span>Update Experience Timeline</span>
                <ArrowRight className="w-3.5 h-3.5 text-apple-light-secondary" />
              </Link>
              <Link
                to="/admin/skills"
                className="flex items-center justify-between p-3 rounded-2xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-xs font-semibold text-apple-light-primary dark:text-apple-dark-primary"
              >
                <span>Add / Reorder Skills</span>
                <ArrowRight className="w-3.5 h-3.5 text-apple-light-secondary" />
              </Link>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-apple-light-accent/10 dark:bg-apple-dark-accent/10 border border-apple-light-accent/20 dark:border-apple-dark-accent/20 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-apple-light-accent dark:text-apple-dark-accent block">
              Pro SDET Tip
            </span>
            <p className="text-xs text-apple-light-primary dark:text-apple-dark-primary leading-relaxed">
              All personal headlines, statistics, project coverage checklists, and skill badges can be modified without writing code or redeploying.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

