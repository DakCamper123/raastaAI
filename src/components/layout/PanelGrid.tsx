'use client';

/**
 * NavDrishti - PanelGrid Component
 * CSS Grid orchestrator adapting dynamically to Desktop, Tablet, and Mobile breakpoints.
 */

import React from 'react';
import { useResponsiveLayout } from '@/hooks/useResponsiveLayout';

interface PanelGridProps {
  sidebar: React.ReactNode;
  canvas: React.ReactNode;
  metrics: React.ReactNode;
  controls: React.ReactNode;
  feeds?: React.ReactNode;
  className?: string;
}

export function PanelGrid({
  sidebar,
  canvas,
  metrics,
  controls,
  feeds,
  className = '',
}: PanelGridProps) {
  const { isDesktop, isTablet, isMobile } = useResponsiveLayout();

  if (isDesktop) {
    return (
      <div
        className={`grid grid-cols-[250px_1fr_320px_280px] gap-4 h-[calc(100vh-105px)] p-4 ${className}`}
      >
        <div className="h-full overflow-hidden">{sidebar}</div>
        <div className="relative h-full overflow-hidden rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] flex flex-col">
          {canvas}
          {feeds && (
            <div className="absolute bottom-3 right-3 z-20 w-64 max-w-[260px] hidden xl:block">
              {feeds}
            </div>
          )}
        </div>
        <div className="h-full overflow-hidden">{metrics}</div>
        <div className="h-full overflow-hidden">{controls}</div>
      </div>
    );
  }

  if (isTablet) {
    return (
      <div className={`flex flex-col gap-4 p-4 min-h-screen ${className}`}>
        {/* Full width canvas */}
        <div className="w-full h-[450px] rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] overflow-hidden">
          {canvas}
        </div>
        {/* 2-column metrics and feeds */}
        <div className="grid grid-cols-2 gap-4">
          <div>{metrics}</div>
          <div>{feeds || controls}</div>
        </div>
        {/* Sidebar & controls row */}
        <div className="grid grid-cols-2 gap-4">
          <div>{sidebar}</div>
          <div>{controls}</div>
        </div>
      </div>
    );
  }

  // Mobile layout (<768px): canvas locked 16:9, modules expandable
  return (
    <div className={`flex flex-col gap-4 p-3 pb-24 ${className}`}>
      <div className="w-full aspect-video rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] overflow-hidden shadow-lg">
        {canvas}
      </div>
      <div className="flex flex-col gap-4">
        {controls}
        {metrics}
        {sidebar}
        {feeds}
      </div>
    </div>
  );
}
