'use client';

/**
 * RAASTA.AI - LiveMetrics Component
 * Telemetry dashboard panel displaying SpeedGauge, TTCIndicator, OccupancyGrid, and CAN-Bus metrics.
 */

import React from 'react';
import { useSensorData } from '@/hooks/useSensorData';
import { GlassCard } from '@/components/ui/GlassCard';
import { SpeedGauge } from './SpeedGauge';
import { TTCIndicator } from './TTCIndicator';
import { OccupancyGridMini } from './OccupancyGridMini';
import { Activity, Compass, Cpu, Radio } from 'lucide-react';

export function LiveMetrics({ className = '' }: { className?: string }) {
  const telemetry = useSensorData();

  return (
    <div className={`flex flex-col gap-4 overflow-y-auto pr-1 h-full font-mono text-xs ${className}`}>
      {/* Speedometer Card */}
      <GlassCard glow="cyan" className="p-4 flex flex-col items-center gap-2">
        <div className="w-full flex items-center justify-between text-[11px] text-[var(--accent-cyan)] font-bold">
          <span className="flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5" />
            TELEMETRY COCKPIT
          </span>
          <span className="px-1.5 py-0.5 rounded bg-[var(--accent-cyan)]/20 text-[var(--accent-cyan)]">
            {telemetry.canbusState}
          </span>
        </div>

        <SpeedGauge speedKmh={telemetry.speedKmh} size={170} />

        {/* Steering & Lateral Accel Readouts */}
        <div className="grid grid-cols-2 gap-2 w-full pt-2 border-t border-[var(--border-subtle)] text-[11px]">
          <div className="flex flex-col items-center p-2 rounded bg-[var(--bg-secondary)] border border-[var(--border-subtle)]">
            <span className="text-[var(--text-muted)] text-[9px] flex items-center gap-1">
              <Compass className="w-3 h-3 text-[var(--accent-cyan)]" /> STEER ANGLE
            </span>
            <span className="font-bold text-sm text-[var(--text-primary)]">
              {telemetry.steeringDeg > 0 ? `+${telemetry.steeringDeg}°` : `${telemetry.steeringDeg}°`}
            </span>
          </div>

          <div className="flex flex-col items-center p-2 rounded bg-[var(--bg-secondary)] border border-[var(--border-subtle)]">
            <span className="text-[var(--text-muted)] text-[9px] flex items-center gap-1">
              <Cpu className="w-3 h-3 text-[var(--accent-amber)]" /> LAT ACCEL
            </span>
            <span className="font-bold text-sm text-[var(--text-primary)]">
              {telemetry.lateralAccelMs2} m/s²
            </span>
          </div>
        </div>
      </GlassCard>

      {/* Time-To-Collision Indicator Card */}
      <GlassCard glow={telemetry.ttcSec < 2 ? 'danger' : telemetry.ttcSec < 4 ? 'amber' : 'none'} className="p-4">
        <TTCIndicator ttcSec={telemetry.ttcSec} />
      </GlassCard>

      {/* Dynamic Occupancy Grid Voxel Card */}
      <GlassCard className="p-4">
        <OccupancyGridMini density={telemetry.occupancyDensity} />
      </GlassCard>

      {/* GNSS & V2X Connectivity Tile */}
      <GlassCard className="p-3.5 flex flex-col gap-2 text-[11px]">
        <div className="flex items-center justify-between text-[var(--text-secondary)]">
          <span className="flex items-center gap-1.5">
            <Radio className="w-3.5 h-3.5 text-[var(--success-green)] animate-pulse" />
            GNSS RTK PRECISION
          </span>
          <strong className="text-[var(--success-green)]">±{telemetry.gnssAccuracyCm} CM</strong>
        </div>
        <div className="flex items-center justify-between text-[var(--text-secondary)]">
          <span>CYCLE LATENCY</span>
          <strong className="text-[var(--accent-cyan)]">16.6 MS (60 HZ)</strong>
        </div>
      </GlassCard>
    </div>
  );
}
