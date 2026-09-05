'use client';

/**
 * RAASTA.AI - AnimatedTagline Component
 * Typewriter effect revealing the Chandni Chowk -> Kerala ghat -> rural highway quote word by word.
 */

import React, { useState, useEffect, useMemo } from 'react';

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
  const words = useMemo(() => (text ? text.split(' ') : []), [text]);
  const [visibleCount, setVisibleCount] = useState<number>(0);

  useEffect(() => {
    setVisibleCount(0);
    if (!words.length) return;

    const interval = setInterval(() => {
      setVisibleCount((prev) => {
        if (prev < words.length) {
          return prev + 1;
        }
        clearInterval(interval);
        return prev;
      });
    }, speedMs);

    return () => clearInterval(interval);
  }, [words, speedMs]);

  const displayedWords = words.slice(0, visibleCount);

  return (
    <blockquote className={`relative font-display text-lg sm:text-xl md:text-2xl font-medium text-[var(--text-primary)] leading-relaxed italic ${className}`}>
      <span>&ldquo;</span>
      {displayedWords.map((word, idx) => {
        if (!word) return null;
        const isHighlight =
          word.includes('Chandni') ||
          word.includes('Kerala') ||
          word.includes('Planet') ||
          word.includes('Earth');

        return (
          <span
            key={`${idx}-${word}`}
            className={`inline-block mr-1.5 transition-opacity duration-150 ${
              isHighlight
                ? 'text-[var(--accent-cyan)] font-bold not-italic'
                : ''
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

