'use client';

/**
 * NavDrishti - GlowButton Component
 * High-contrast cyber-styled CTA button with neon glow feedback.
 */

import React from 'react';

interface GlowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'cyan' | 'amber' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  className?: string;
}

export function GlowButton({
  children,
  variant = 'cyan',
  size = 'md',
  icon,
  className = '',
  ...props
}: GlowButtonProps) {
  let sizeClasses = 'px-4 py-2 text-sm';
  if (size === 'sm') sizeClasses = 'px-3 py-1.5 text-xs';
  if (size === 'lg') sizeClasses = 'px-6 py-3 text-base';

  let variantClasses = '';
  switch (variant) {
    case 'cyan':
      variantClasses =
        'bg-[var(--accent-cyan)] text-[#06090e] font-semibold hover:bg-white hover:shadow-cyan-glow border border-[var(--accent-cyan)]';
      break;
    case 'amber':
      variantClasses =
        'bg-[var(--accent-amber)] text-[#06090e] font-semibold hover:bg-white hover:shadow-amber-glow border border-[var(--accent-amber)]';
      break;
    case 'danger':
      variantClasses =
        'bg-[var(--danger-red)] text-white font-semibold hover:bg-red-600 hover:shadow-[0_0_20px_rgba(255,51,85,0.6)] border border-[var(--danger-red)]';
      break;
    case 'ghost':
      variantClasses =
        'bg-transparent text-[var(--text-primary)] hover:bg-[var(--surface-glass)] hover:text-[var(--accent-cyan)] border border-[var(--border-subtle)]';
      break;
  }

  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-mono uppercase tracking-wider transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${sizeClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {icon && <span className="flex items-center">{icon}</span>}
      {children}
    </button>
  );
}
