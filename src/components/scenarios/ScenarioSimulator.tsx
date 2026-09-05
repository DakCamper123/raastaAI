'use client';

/**
 * RAASTA.AI - ScenarioSimulator Component
 * Mini-interactive scenario preview with danger vector inspector.
 */

import React from 'react';
import { ScenarioDefinition } from '@/types/simulation';
import { GlassCard } from '@/components/ui/GlassCard';
import { Crosshair, ShieldAlert } from 'lucide-react';

export function ScenarioSimulator({ scenario }: { scenario: ScenarioDefinition }) {
  return (
    <GlassCard glow="cyan" className="p-4 flex flex-col gap-3 font-mono text-xs">
      <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-2">
        <span className="flex items-center gap-1.5 text-[var(--accent-cyan)] font-bold">
          <Crosshair className="w-4 h-4" />
          EDGE CASE INSPECTION • {scenario.code}
        </span>
        <span className="text-[var(--accent-amber)] font-bold">{scenario.title}</span>
      </div>

      <div className="relative aspect-video w-full rounded-lg overflow-hidden border border-[var(--border-subtle)] bg-black">
        <img
          src={scenario.imagePath}
          alt={scenario.title}
          className="w-full h-full object-cover"
        />

        {/* Dynamic Obstacle Overlays */}
        {scenario.obstacles.map((obs, idx) => (
          <div
            key={obs.id}
            className="absolute p-1.5 rounded border border-[var(--danger-red)] bg-black/80 text-[10px] text-[var(--danger-red)] font-bold flex items-center gap-1 shadow-lg"
            style={{
              top: `${35 + idx * 22}%`,
              left: `${20 + idx * 28}%`,
            }}
          >
            <ShieldAlert className="w-3 h-3 animate-pulse" />
            <span>{obs.label}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
        <div>ROAD WIDTH: <strong className="text-[var(--text-primary)]">{scenario.roadWidth}M</strong></div>
        <div>SURFACE: <strong className="text-[var(--text-primary)]">{scenario.surfaceCondition}</strong></div>
      </div>
    </GlassCard>
  );
}
