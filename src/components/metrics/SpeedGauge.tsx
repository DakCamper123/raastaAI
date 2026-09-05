'use client';

/**
 * RAASTA.AI - SpeedGauge Component
 * SVG radial speedometer with digital speed readout and dynamic needle sweep.
 */

import React from 'react';

interface SpeedGaugeProps {
  speedKmh: number;
  maxSpeedKmh?: number;
  size?: number;
}

export function SpeedGauge({
  speedKmh,
  maxSpeedKmh = 120,
  size = 180,
}: SpeedGaugeProps) {
  const clampedSpeed = Math.max(0, Math.min(maxSpeedKmh, speedKmh));
  // Needle angle: -135deg to +135deg (total 270deg sweep)
  const angle = -135 + (clampedSpeed / maxSpeedKmh) * 270;
  const radius = size * 0.38;
  const cx = size / 2;
  const cy = size / 2;

  // Arc calculation
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (circumference * 0.75 * (clampedSpeed / maxSpeedKmh));

  return (
    <div className="relative flex flex-col items-center justify-center font-mono">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="overflow-visible">
        {/* Background Gauge Arc */}
        <circle
          cx={cx}
          cy={cy}
          r={radius}
          fill="none"
          stroke="var(--border-subtle)"
          strokeWidth="10"
          strokeDasharray={`${circumference * 0.75} ${circumference * 0.25}`}
          strokeDashoffset={-circumference * 0.125}
          strokeLinecap="round"
        />

        {/* Dynamic Velocity Colored Arc */}
        <circle
          cx={cx}
          cy={cy}
          r={radius}
          fill="none"
          stroke={clampedSpeed > 80 ? 'var(--danger-red)' : clampedSpeed > 50 ? 'var(--accent-amber)' : 'var(--accent-cyan)'}
          strokeWidth="10"
          strokeDasharray={`${circumference * 0.75 * (clampedSpeed / maxSpeedKmh)} ${circumference}`}
          strokeDashoffset={-circumference * 0.125}
          strokeLinecap="round"
          className="transition-all duration-150"
        />

        {/* Speedometer Needle */}
        <g transform={`rotate(${angle}, ${cx}, ${cy})`}>
          <line
            x1={cx}
            y1={cy}
            x2={cx + radius - 6}
            y2={cy}
            stroke="var(--accent-cyan)"
            strokeWidth="3"
            strokeLinecap="round"
            className="transition-transform duration-100 ease-out"
          />
          <circle cx={cx} cy={cy} r="6" fill="var(--accent-cyan)" />
        </g>
      </svg>

      {/* Digital Readout In Center */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-4">
        <span className="font-display font-black text-3xl text-[var(--text-primary)]">
          {Math.round(clampedSpeed)}
        </span>
        <span className="text-[9px] uppercase tracking-widest text-[var(--text-muted)] -mt-1 font-bold">
          KM / H
        </span>
      </div>
    </div>
  );
}
