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
  const [displayedWords, setDisplayedWords] = useState<string[]>([]);
  const words = text.split(' ');

  useEffect(() => {
    let index = 0;
    setDisplayedWords([]);

    const interval = setInterval(() => {
      if (index < words.length) {
        setDisplayedWords((prev) => [...prev, words[index]]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, speedMs);

    return () => clearInterval(interval);
  }, [text, speedMs]);

  return (
    <blockquote className={`relative font-display text-lg sm:text-xl md:text-2xl font-medium text-[var(--text-primary)] leading-relaxed italic ${className}`}>
      <span>&ldquo;</span>
      {displayedWords.map((word, idx) => (
        <span
          key={idx}
          className={`inline-block mr-1.5 transition-opacity duration-150 ${
            word.includes('Chandni') || word.includes('Kerala') || word.includes('Planet')
              ? 'text-[var(--accent-cyan)] font-bold not-italic'
              : ''
          }`}
        >
          {word}
        </span>
      ))}
      <span className="inline-block w-2.5 h-6 bg-[var(--accent-cyan)] ml-1 animate-pulse align-middle" />
      <span>&rdquo;</span>
    </blockquote>
  );
}
