'use client';

/**
 * NavDrishti - CountdownTimer Component
 * 3-second circular SVG countdown timer with animated progress ring and abort trigger.
 */

import React from 'react';
import { GlowButton } from '@/components/ui/GlowButton';
import { XCircle, AlertTriangle } from 'lucide-react';

interface CountdownTimerProps {
  secondsRemaining: number;
  totalSeconds?: number;
  onAbort: () => void;
}

export function CountdownTimer({
  secondsRemaining,
  totalSeconds = 3,
  onAbort,
}: CountdownTimerProps) {
  const size = 130;
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = secondsRemaining / totalSeconds;
  const strokeDashoffset = circumference - circumference * progress;

  return (
    <div className="flex flex-col items-center gap-4 font-mono">
      {/* Circular Progress Ring */}
      <div className="relative flex items-center justify-center">
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background Ring */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="var(--border-subtle)"
            strokeWidth={strokeWidth}
            fill="none"
          />
          {/* Active Animated Ring */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="var(--danger-red)"
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-linear"
          />
        </svg>

        {/* Big Digits in Center */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="font-display font-black text-4xl text-white glow-danger animate-pulse">
            0{secondsRemaining}
          </span>
          <span className="text-[9px] uppercase tracking-widest text-[var(--accent-amber)] font-bold">
            SECONDS
          </span>
        </div>
      </div>

      <div className="text-center">
        <p className="text-xs text-[var(--text-secondary)]">
          Transmitting Hardware E-Stop &amp; 5G C-V2X Packet in:
        </p>
      </div>

      {/* Abort Button */}
      <GlowButton
        variant="ghost"
        size="md"
        onClick={onAbort}
        icon={<XCircle className="w-5 h-5 text-[var(--danger-red)]" />}
        className="w-full border-[var(--danger-red)]/50 hover:bg-[var(--danger-red)]/20"
      >
        ✕ Cancel Countdown
      </GlowButton>
    </div>
  );
}
