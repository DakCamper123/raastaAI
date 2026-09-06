'use client';

/**
 * RAASTA.AI - GlassCard Component
 * Glassmorphic surface container with dynamic cyber glow and border transitions.
 */

import React from 'react';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  glow?: 'cyan' | 'emerald' | 'amber' | 'danger' | 'none';
  variant?: 'default' | 'elevated' | 'danger';
  className?: string;
}

export function GlassCard({
  children,
  glow = 'none',
  variant = 'default',
  className = '',
  ...props
}: GlassCardProps) {
  let glowClasses = '';
  if (glow === 'cyan' || glow === 'emerald') glowClasses = 'hover:border-[var(--accent-cyan)] hover:shadow-cyan-glow';
  if (glow === 'amber') glowClasses = 'hover:border-[var(--accent-amber)] hover:shadow-amber-glow';
  if (glow === 'danger') glowClasses = 'hover:border-[var(--danger-red)] hover:shadow-[0_0_20px_rgba(255,51,85,0.4)]';

  let variantBg = 'bg-[var(--surface-glass)]';
  if (variant === 'elevated') variantBg = 'bg-[var(--bg-tertiary)]/80';
  if (variant === 'danger') variantBg = 'bg-[var(--danger-red)]/10 border-[var(--danger-red)]/40';

  return (
    <div
      className={`relative rounded-xl border border-[var(--border-subtle)] ${variantBg} backdrop-blur-md transition-all duration-300 ${glowClasses} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
