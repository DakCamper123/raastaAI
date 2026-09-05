'use client';

/**
 * RAASTA.AI - useTheme Hook
 */

import { useThemeContext, ThemeMode } from '@/context/ThemeContext';

export function useTheme() {
  const { theme, isDark, toggleTheme, setTheme } = useThemeContext();

  return {
    theme,
    isDark,
    toggleTheme,
    setTheme,
  };
}

export type { ThemeMode };
