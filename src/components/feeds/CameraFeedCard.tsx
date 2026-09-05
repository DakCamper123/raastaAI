'use client';

/**
 * RAASTA.AI - CameraFeedCard Component
 * Optical sensor feed card with bounding boxes and live FPS/latency metrics.
 */

import React from 'react';
import { CameraFeedInfo } from '@/types/sensors';
import { GlassCard } from '@/components/ui/GlassCard';
import { Eye } from 'lucide-react';

export function CameraFeedCard({ feed }: { feed: CameraFeedInfo }) {
  return (
    <GlassCard className="relative overflow-hidden p-2 flex flex-col gap-2 font-mono text-[10px]">
      {/* Header Bar */}
      <div className="flex items-center justify-between px-1">
        <span className="flex items-center gap-1.5 text-[var(--text-primary)] font-bold truncate">
          <Eye className="w-3 h-3 text-[var(--accent-amber)]" />
          {feed.label}
        </span>
        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-[var(--danger-red)]/20 text-[var(--danger-red)] font-bold animate-live-blink">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--danger-red)]" />
          LIVE
        </span>
      </div>

      {/* Feed Visual Container */}
      <div className="relative aspect-video rounded-lg overflow-hidden border border-[var(--border-subtle)] bg-black">
        {/* Synthetic or image background */}
        <img
          src={feed.imageFallback}
          alt={feed.label}
          className="w-full h-full object-cover opacity-80"
        />

        {/* HUD Crosshairs Overlay */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 border border-[var(--accent-cyan)]/40 rounded-full" />
          <div className="absolute top-2 left-2 text-[9px] bg-black/60 px-1.5 py-0.5 rounded text-[var(--accent-cyan)]">
            DETECTIONS: {feed.detectionsCount}
          </div>
          <div className="absolute bottom-2 right-2 text-[9px] bg-black/60 px-1.5 py-0.5 rounded text-[var(--text-secondary)]">
            {feed.resolution} @ {feed.fps}FPS
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
