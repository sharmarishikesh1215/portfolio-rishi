import React from 'react';

interface StatusBadgeProps {
  statusText?: string;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  statusText = 'Available for SDET & Quality Engineering Roles',
  className = '',
}) => {
  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border border-black/5 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-md shadow-apple-sm transition-all duration-300 hover:border-black/10 dark:hover:border-white/20 ${className}`}
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
      </span>
      <span className="text-apple-light-secondary dark:text-apple-dark-secondary">
        {statusText}
      </span>
    </div>
  );
};

