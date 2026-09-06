'use client';

/**
 * NavDrishti - SensorNode Component
 * Card representing a hardware sensor module in the architecture stack.
 */

import React from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { SensorSpecification } from '@/types/sensors';
import { Radio, Eye, Disc, Navigation } from 'lucide-react';

export function SensorNode({ sensor }: { sensor: SensorSpecification }) {
  const getIcon = () => {
    switch (sensor.type) {
      case 'lidar':
        return <Disc className="w-5 h-5 text-[var(--accent-cyan)] animate-spin" />;
      case 'camera':
        return <Eye className="w-5 h-5 text-[var(--accent-amber)]" />;
      case 'radar':
        return <Radio className="w-5 h-5 text-[var(--success-green)]" />;
      case 'gnss':
        return <Navigation className="w-5 h-5 text-[var(--accent-cyan)]" />;
    }
  };

  return (
    <GlassCard glow="cyan" className="p-4 flex flex-col gap-2 font-mono text-xs flex-1 min-w-[240px]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {getIcon()}
          <span className="font-display font-bold text-sm text-[var(--text-primary)]">
            {sensor.name}
          </span>
        </div>
        <span className="px-1.5 py-0.5 rounded bg-[var(--success-green)]/15 text-[var(--success-green)] text-[10px] font-bold">
          {sensor.status}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-1 text-[11px] text-[var(--text-secondary)] pt-1 border-t border-[var(--border-subtle)]">
        <span>RATE: <strong className="text-[var(--text-primary)]">{sensor.frequency}</strong></span>
        <span>LATENCY: <strong className="text-[var(--accent-cyan)]">{sensor.latencyMs} ms</strong></span>
        <span>FOV: <strong className="text-[var(--text-primary)]">{sensor.fov}</strong></span>
        <span>RES: <strong className="text-[var(--text-primary)]">{sensor.resolution}</strong></span>
      </div>

      <p className="text-[11px] text-[var(--text-muted)] font-body mt-1 leading-snug">
        {sensor.description}
      </p>
    </GlassCard>
  );
}
