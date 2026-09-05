'use client';

/**
 * RAASTA.AI - AnimatedTagline Component
 * Typewriter effect revealing the Chandni Chowk -> Kerala ghat -> rural highway quote word by word.
 */

import React, { useState, useEffect } from 'react';

interface AnimatedTaglineProps {
  text?: string;
  speedMs?: number;
  className?: string;
}

const DEFAULT_TAGLINE =
  "If an autonomous vehicle can master Old Delhi's Chandni Chowk, navigate a monsoon ghat in Kerala, and out-negotiate an unmarked rural highway merge — it can drive anywhere on Planet Earth.";

export function AnimatedTagline({
  text = DEFAULT_TAGLINE,
  speedMs = 80,
  className = '',
}: AnimatedTaglineProps) {
  const words = React.useMemo(() => (text || '').split(/\s+/).filter(Boolean), [text]);
  const [displayedCount, setDisplayedCount] = useState(0);

  useEffect(() => {
    setDisplayedCount(0);
    const interval = setInterval(() => {
      setDisplayedCount((prev) => {
        if (prev < words.length) {
          return prev + 1;
        }
        clearInterval(interval);
        return prev;
      });
    }, speedMs);

    return () => clearInterval(interval);
  }, [words, speedMs]);

  return (
    <blockquote className={`relative font-display text-lg sm:text-xl md:text-2xl font-medium text-[var(--text-primary)] leading-relaxed italic ${className}`}>
      <span>&ldquo;</span>
      {words.slice(0, displayedCount).map((word, idx) => {
        const isHighlight =
          Boolean(word) &&
          (word.includes('Chandni') || word.includes('Kerala') || word.includes('Planet'));
        return (
          <span
            key={idx}
            className={`inline-block mr-1.5 transition-opacity duration-150 ${
              isHighlight ? 'text-[var(--accent-cyan)] font-bold not-italic' : ''
            }`}
          >
            {word}
          </span>
        );
      })}
      <span className="inline-block w-2.5 h-6 bg-[var(--accent-cyan)] ml-1 animate-pulse align-middle" />
      <span>&rdquo;</span>
    </blockquote>
  );
}

