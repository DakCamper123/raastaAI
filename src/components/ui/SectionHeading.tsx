'use client';

/**
 * RAASTA.AI - SectionHeading Component
 * Standardized cyber-HUD section title with tag badge and description.
 */

import React from 'react';

interface SectionHeadingProps {
  tag: string;
  title: string;
  highlightWord?: string;
  description?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export function SectionHeading({
  tag,
  title,
  highlightWord,
  description,
  align = 'left',
  className = '',
}: SectionHeadingProps) {
  const alignClass =
    align === 'center' ? 'text-center items-center' : align === 'right' ? 'text-right items-end' : 'text-left items-start';

  return (
    <div className={`flex flex-col gap-2.5 mb-8 ${alignClass} ${className}`}>
      {/* HUD Cyber-Tag Badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--border-subtle)] bg-[var(--surface-glass)] backdrop-blur-md">
        <span className="w-2 h-2 rounded-full bg-[var(--accent-cyan)] shadow-[0_0_8px_var(--accent-cyan)] animate-pulse" />
        <span className="font-mono text-xs uppercase tracking-widest text-[var(--accent-cyan)]">
          {tag}
        </span>
      </div>

      {/* Main Heading */}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[var(--text-primary)] font-display">
        {highlightWord ? (
          <>
            {title.replace(highlightWord, '')}
            <span className="text-[var(--accent-cyan)] glow-cyan">{highlightWord}</span>
          </>
        ) : (
          title
        )}
      </h2>

      {/* Description */}
      {description && (
        <p className="max-w-3xl text-sm sm:text-base text-[var(--text-secondary)] font-body leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
