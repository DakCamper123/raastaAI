'use client';

/**
 * RAASTA.AI - TTCIndicator Component
 * Time-To-Collision bar with color-coded safety zones.
 */

import React from 'react';
import { AlertCircle, CheckCircle, ShieldAlert } from 'lucide-react';

interface TTCIndicatorProps {
  ttcSec: number;
}

export function TTCIndicator({ ttcSec }: { ttcSec: number }) {
  // Safety thresholds
  const isCritical = ttcSec < 2.0;
  const isWarning = ttcSec >= 2.0 && ttcSec < 4.0;
  const isSafe = ttcSec >= 4.0;

  let colorClass = 'text-[var(--success-green)] border-[var(--success-green)]';
  let barColor = 'bg-[var(--success-green)]';
  let label = 'SAFETY MARGIN: NOMINAL';
  let Icon = CheckCircle;

  if (isCritical) {
    colorClass = 'text-[var(--danger-red)] border-[var(--danger-red)]';
    barColor = 'bg-[var(--danger-red)]';
    label = 'CRITICAL TTC: BRAKE ARMED';
    Icon = ShieldAlert;
  } else if (isWarning) {
    colorClass = 'text-[var(--accent-amber)] border-[var(--accent-amber)]';
    barColor = 'bg-[var(--accent-amber)]';
    label = 'CAUTION: PROXIMITY CLOSING';
    Icon = AlertCircle;
  }

  // Bar percentage (0 to 6 seconds range)
  const barPercent = Math.min(100, Math.max(5, (ttcSec / 6.0) * 100));

  return (
    <div className="flex flex-col gap-2 font-mono text-xs w-full">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-[var(--text-secondary)]">
          <Icon className={`w-3.5 h-3.5 ${colorClass}`} />
          TIME TO COLLISION
        </span>
        <span className={`font-bold text-sm ${colorClass}`}>
          {ttcSec >= 90 ? '∞' : `${ttcSec.toFixed(1)}s`}
        </span>
      </div>

      {/* Progress Bar Container */}
      <div className="w-full h-2.5 rounded-full bg-[var(--bg-tertiary)] overflow-hidden border border-[var(--border-subtle)]">
        <div
          className={`h-full ${barColor} transition-all duration-300 rounded-full`}
          style={{ width: `${barPercent}%` }}
        />
      </div>

      <span className={`text-[10px] font-bold ${colorClass}`}>
        {label}
      </span>
    </div>
  );
}
