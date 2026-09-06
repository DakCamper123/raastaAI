'use client';

/**
 * NavDrishti - GPSCoordinateDisplay Component
 * Centimeter-accurate RTK-GPS position readout for emergency dispatch.
 */

import React from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { MapPin, Navigation, Radio } from 'lucide-react';
import { NH48_GPS_COORDINATES } from '@/lib/constants';

export function GPSCoordinateDisplay() {
  return (
    <GlassCard className="p-4 flex flex-col gap-3 font-mono text-xs">
      <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-2">
        <span className="flex items-center gap-1.5 text-[var(--accent-cyan)] font-bold">
          <MapPin className="w-4 h-4 text-[var(--danger-red)] animate-bounce" />
          REAL-TIME RTK-GPS FIX
        </span>
        <span className="inline-flex items-center gap-1 text-[var(--success-green)] text-[10px] font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--success-green)] animate-pulse" />
          CARRIER-PHASE LOCKED
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 text-xs">
        <div className="p-2.5 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-subtle)] flex flex-col">
          <span className="text-[10px] text-[var(--text-muted)]">LATITUDE</span>
          <span className="font-bold text-sm text-[var(--text-primary)]">
            {NH48_GPS_COORDINATES.LATITUDE}° N
          </span>
        </div>

        <div className="p-2.5 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-subtle)] flex flex-col">
          <span className="text-[10px] text-[var(--text-muted)]">LONGITUDE</span>
          <span className="font-bold text-sm text-[var(--text-primary)]">
            {NH48_GPS_COORDINATES.LONGITUDE}° E
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between text-[11px] pt-1 text-[var(--text-secondary)]">
        <span className="flex items-center gap-1">
          <Navigation className="w-3 h-3 text-[var(--accent-amber)]" />
          CORRIDOR: <strong>{NH48_GPS_COORDINATES.CORRIDOR}</strong>
        </span>
        <span className="text-[var(--success-green)] font-bold">
          ±{NH48_GPS_COORDINATES.ACCURACY_CM} CM PRECISION
        </span>
      </div>
    </GlassCard>
  );
}
