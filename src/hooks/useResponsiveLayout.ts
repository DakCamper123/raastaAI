'use client';

/**
 * NavDrishti - useResponsiveLayout Hook
 * Detects device viewport breakpoints and orientation changes.
 */

import { useState, useEffect } from 'react';

export type Breakpoint = 'mobile' | 'tablet' | 'desktop';
export type Orientation = 'portrait' | 'landscape';

export interface ResponsiveLayoutInfo {
  breakpoint: Breakpoint;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  orientation: Orientation;
  width: number;
  height: number;
}

export function useResponsiveLayout(): ResponsiveLayoutInfo {
  const [layoutInfo, setLayoutInfo] = useState<ResponsiveLayoutInfo>({
    breakpoint: 'desktop',
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    orientation: 'landscape',
    width: 1440,
    height: 900,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const updateLayout = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const orientation: Orientation = width > height ? 'landscape' : 'portrait';

      let breakpoint: Breakpoint = 'desktop';
      if (width < 768) {
        breakpoint = 'mobile';
      } else if (width < 1280) {
        breakpoint = 'tablet';
      }

      setLayoutInfo({
        breakpoint,
        isMobile: breakpoint === 'mobile',
        isTablet: breakpoint === 'tablet',
        isDesktop: breakpoint === 'desktop',
        orientation,
        width,
        height,
      });
    };

    updateLayout();
    window.addEventListener('resize', updateLayout);
    const mediaOrientation = window.matchMedia('(orientation: portrait)');
    mediaOrientation.addEventListener('change', updateLayout);

    return () => {
      window.removeEventListener('resize', updateLayout);
      mediaOrientation.removeEventListener('change', updateLayout);
    };
  }, []);

  return layoutInfo;
}
