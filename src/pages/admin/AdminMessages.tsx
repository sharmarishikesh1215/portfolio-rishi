import React, { useState } from 'react';
import { Mail, Check, Archive, Trash2, MailOpen, Clock, AlertCircle } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { formatDate } from '../../lib/utils';
import { ContactMessage } from '../../types/portfolio';

export const AdminMessages: React.FC = () => {
  const { messages, updateMessageStatus, deleteMessage } = usePortfolio();
  const [filter, setFilter] = useState<'all' | 'unread' | 'read' | 'archived'>('all');
  const [activeMessage, setActiveMessage] = useState<ContactMessage | null>(null);

  const filteredMessages =
    filter === 'all' ? messages : messages.filter((m) => m.status === filter);

  const handleDelete = async (id: string) => {
    if (window.confirm('Delete this message permanently?')) {
      await deleteMessage(id);
      if (activeMessage?.id === id) setActiveMessage(null);
    }
  };

  const handleSelectMessage = (msg: ContactMessage) => {
    setActiveMessage(msg);
    if (msg.status === 'unread') {
      updateMessageStatus(msg.id, 'read');
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-apple-light-primary dark:text-apple-dark-primary mb-1">
          Inquiries &amp; Messages Inbox
        </h1>
        <p className="text-xs sm:text-sm text-apple-light-secondary dark:text-apple-dark-secondary">
          Submissions received from the public portfolio contact form.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setFilter('all')}
          type="button"
          className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
            filter === 'all'
              ? 'bg-apple-light-primary dark:bg-white text-white dark:text-black'
              : 'bg-white dark:bg-apple-dark-surface text-apple-light-secondary border border-black/5 dark:border-white/10'
          }`}
        >
          All ({messages.length})
        </button>
        <button
          onClick={() => setFilter('unread')}
          type="button"
          className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
            filter === 'unread'
              ? 'bg-apple-light-accent dark:bg-apple-dark-accent text-white dark:text-black'
              : 'bg-white dark:bg-apple-dark-surface text-apple-light-secondary border border-black/5 dark:border-white/10'
          }`}
        >
          Unread ({messages.filter((m) => m.status === 'unread').length})
        </button>
        <button
          onClick={() => setFilter('read')}
          type="button"
          className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
            filter === 'read'
              ? 'bg-apple-light-primary dark:bg-white text-white dark:text-black'
              : 'bg-white dark:bg-apple-dark-surface text-apple-light-secondary border border-black/5 dark:border-white/10'
          }`}
        >
          Read ({messages.filter((m) => m.status === 'read').length})
        </button>
        <button
          onClick={() => setFilter('archived')}
          type="button"
          className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
            filter === 'archived'
              ? 'bg-apple-light-primary dark:bg-white text-white dark:text-black'
              : 'bg-white dark:bg-apple-dark-surface text-apple-light-secondary border border-black/5 dark:border-white/10'
          }`}
        >
          Archived ({messages.filter((m) => m.status === 'archived').length})
        </button>
      </div>

      {/* Messages Two-Pane Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Messages List */}
        <div className="lg:col-span-5 space-y-3">
          {filteredMessages.length === 0 ? (
            <div className="p-8 text-center bg-white dark:bg-apple-dark-surface rounded-3xl border border-black/5 dark:border-white/10 text-xs text-apple-light-secondary">
              No messages found in this view.
            </div>
          ) : (
            filteredMessages.map((msg) => (
              <div
                key={msg.id}
                onClick={() => handleSelectMessage(msg)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  activeMessage?.id === msg.id
                    ? 'border-apple-light-accent dark:border-apple-dark-accent bg-white dark:bg-apple-dark-surface shadow-apple-sm'
                    : msg.status === 'unread'
                    ? 'bg-apple-light-accent/5 dark:bg-apple-dark-accent/10 border-apple-light-accent/20 dark:border-apple-dark-accent/30'
                    : 'bg-white/60 dark:bg-apple-dark-surface/60 border-black/5 dark:border-white/5 hover:bg-white dark:hover:bg-apple-dark-surface'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-apple-light-primary dark:text-apple-dark-primary truncate">
                    {msg.name}
                  </span>
                  <span className="text-[10px] text-apple-light-secondary shrink-0 font-mono">
                    {formatDate(msg.created_at)}
                  </span>
                </div>

                <div className="text-xs font-semibold text-apple-light-primary dark:text-apple-dark-primary truncate mb-1">
                  {msg.subject}
                </div>

                <p className="text-[11px] text-apple-light-secondary dark:text-apple-dark-secondary line-clamp-2">
                  {msg.message}
                </p>

                <div className="mt-2 flex items-center justify-between">
                  <span
                    className={`text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${
                      msg.status === 'unread'
                        ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                        : msg.status === 'read'
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                        : 'bg-gray-500/10 text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    {msg.status}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Selected Message Reader */}
        <div className="lg:col-span-7">
          {activeMessage ? (
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-apple-dark-surface border border-black/5 dark:border-white/10 shadow-apple-sm space-y-6 sticky top-24">
              {/* Message Header */}
              <div className="flex items-start justify-between gap-4 pb-6 border-b border-black/5 dark:border-white/10">
                <div>
                  <h3 className="text-xl font-bold tracking-tight text-apple-light-primary dark:text-apple-dark-primary mb-1">
                    {activeMessage.subject}
                  </h3>
                  <div className="text-xs text-apple-light-secondary dark:text-apple-dark-secondary">
                    From: <span className="font-semibold text-apple-light-primary dark:text-apple-dark-primary">{activeMessage.name}</span> &lt;
                    <a
                      href={`mailto:${activeMessage.email}`}
                      className="text-apple-light-accent hover:underline"
                    >
                      {activeMessage.email}
                    </a>
                    &gt;
                  </div>
                  <div className="text-[11px] text-apple-light-secondary mt-1">
                    Sent on {formatDate(activeMessage.created_at)}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() =>
                      updateMessageStatus(
                        activeMessage.id,
                        activeMessage.status === 'archived' ? 'read' : 'archived'
                      )
                    }
                    type="button"
                    className="p-2 rounded-xl text-apple-light-secondary hover:text-apple-light-primary hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                    title={activeMessage.status === 'archived' ? 'Unarchive' : 'Archive'}
                  >
                    <Archive className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleDelete(activeMessage.id)}
                    type="button"
                    className="p-2 rounded-xl text-red-500 hover:text-red-700 hover:bg-red-500/10 transition-colors"
                    title="Delete message"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Message Content */}
              <div className="text-sm text-apple-light-primary dark:text-apple-dark-primary leading-relaxed whitespace-pre-wrap">
                {activeMessage.message}
              </div>

              {/* Reply CTA */}
              <div className="pt-6 border-t border-black/5 dark:border-white/10 flex items-center justify-between">
                <a
                  href={`mailto:${activeMessage.email}?subject=Re: ${encodeURIComponent(
                    activeMessage.subject
                  )}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-apple-light-accent dark:bg-apple-dark-accent text-white dark:text-black font-semibold text-xs"
                >
                  <Mail className="w-4 h-4" />
                  <span>Reply via Email</span>
                </a>

                <button
                  onClick={() =>
                    updateMessageStatus(
                      activeMessage.id,
                      activeMessage.status === 'unread' ? 'read' : 'unread'
                    )
                  }
                  type="button"
                  className="text-xs text-apple-light-secondary hover:text-apple-light-primary font-medium"
                >
                  Mark as {activeMessage.status === 'unread' ? 'Read' : 'Unread'}
                </button>
              </div>
            </div>
          ) : (
            <div className="p-16 rounded-3xl bg-white dark:bg-apple-dark-surface border border-black/5 dark:border-white/10 shadow-apple-sm text-center text-xs text-apple-light-secondary">
              Select an inquiry from the left to read full details and reply.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

