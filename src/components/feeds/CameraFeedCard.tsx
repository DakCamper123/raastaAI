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
  // Clean, condensed label
  const shortLabel = feed.label
    .replace('Front Primary 4K Telephoto (120°)', 'Front 4K (120°)')
    .replace('Left Lateral Fisheye (180°)', 'Left Fisheye (180°)')
    .replace('Right Lateral Fisheye (180°)', 'Right Fisheye (180°)');

  return (
    <GlassCard className="relative overflow-hidden p-1.5 flex flex-col gap-1 font-mono text-[9px]">
      {/* Header Bar */}
      <div className="flex items-center justify-between px-0.5 leading-none">
        <span className="flex items-center gap-1 text-[var(--text-primary)] font-bold text-[8px] truncate">
          <Eye className="w-2.5 h-2.5 text-[var(--accent-amber)] shrink-0" />
          <span className="truncate">{shortLabel}</span>
        </span>
        <span className="inline-flex items-center gap-0.5 px-1 py-0.5 rounded bg-[var(--danger-red)]/20 text-[var(--danger-red)] font-bold text-[7px] animate-live-blink shrink-0">
          <span className="w-1 h-1 rounded-full bg-[var(--danger-red)]" />
          LIVE
        </span>
      </div>

      {/* Compact Feed Visual Container */}
      <div className="relative h-14 w-full rounded overflow-hidden border border-[var(--border-subtle)] bg-black">
        {/* Synthetic or image background */}
        <img
          src={feed.imageFallback}
          alt=""
          className="w-full h-full object-cover opacity-70"
        />

        {/* HUD Crosshairs Overlay */}
        <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-1 bg-gradient-to-t from-black/80 via-transparent to-black/30">
          <div className="flex items-center justify-between">
            <span className="text-[7px] font-mono bg-black/70 px-1 py-0.2 rounded text-[var(--accent-cyan)] font-bold">
              {feed.detectionsCount} OBJS
            </span>
            <span className="text-[7px] font-mono bg-black/70 px-1 py-0.2 rounded text-[var(--text-muted)]">
              {feed.fps} FPS
            </span>
          </div>

          <div className="flex items-center justify-between text-[6.5px] font-mono text-white/70">
            <span>{feed.resolution.split('x')[1]}p</span>
            <span>{feed.latencyMs}ms</span>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
