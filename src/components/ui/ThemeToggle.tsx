'use client';

/**
 * RAASTA.AI - ThemeToggle Component
 * Toggles Obsidian Cyber-HUD vs Titanium Lab Telemetry
 */

import React from 'react';
import { useTheme } from '@/hooks/useTheme';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className = '' }: ThemeToggleProps) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`relative inline-flex items-center justify-center p-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-glass)] backdrop-blur-md transition-all duration-300 hover:border-[var(--accent-cyan)] hover:shadow-cyan-glow focus:outline-none focus:ring-2 focus:ring-[var(--accent-cyan)] ${className}`}
      title={isDark ? 'Switch to Titanium Lab Telemetry (Light)' : 'Switch to Obsidian Cyber-HUD (Dark)'}
      aria-label="Toggle theme mode"
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        {isDark ? (
          <Sun className="w-5 h-5 text-[var(--accent-amber)] transition-transform duration-300 hover:rotate-45" />
        ) : (
          <Moon className="w-5 h-5 text-[var(--accent-cyan)] transition-transform duration-300 hover:-rotate-12" />
        )}
      </div>
    </button>
  );
}
