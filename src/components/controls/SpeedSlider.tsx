'use client';

/**
 * NavDrishti - SpeedSlider Component
 * Controls simulation speed multiplier (0.25x to 4.0x).
 */

import React from 'react';
import { useSimulationContext } from '@/context/SimulationContext';
import { FastForward } from 'lucide-react';

export function SpeedSlider() {
  const { playbackSpeed, setPlaybackSpeed } = useSimulationContext();

  const presets = [0.5, 1.0, 2.0, 4.0];

  return (
    <div className="flex flex-col gap-2 font-mono text-xs w-full">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-[var(--text-secondary)]">
          <FastForward className="w-3.5 h-3.5 text-[var(--accent-amber)]" />
          SIMULATION WARP
        </span>
        <span className="font-bold text-[var(--accent-amber)]">{playbackSpeed.toFixed(2)}x</span>
      </div>

      <input
        type="range"
        min="0.25"
        max="4.0"
        step="0.25"
        value={playbackSpeed}
        onChange={(e) => setPlaybackSpeed(parseFloat(e.target.value))}
        className="w-full accent-[var(--accent-amber)] cursor-pointer"
        aria-label="Simulation speed"
      />

      <div className="flex justify-between gap-1">
        {presets.map((p) => (
          <button
            key={p}
            onClick={() => setPlaybackSpeed(p)}
            className={`px-2 py-0.5 rounded text-[10px] font-bold border transition-colors ${
              playbackSpeed === p
                ? 'bg-[var(--accent-amber)] text-black border-[var(--accent-amber)]'
                : 'border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--text-primary)]'
            }`}
          >
            {p}x
          </button>
        ))}
      </div>
    </div>
  );
}
