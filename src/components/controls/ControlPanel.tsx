'use client';

/**
 * RAASTA.AI - ControlPanel Component
 * Playback, Scenario picker, Warp slider, and APF/DWA parameters control center.
 */

import React from 'react';
import { useSimulationContext } from '@/context/SimulationContext';
import { useSOSProtocol } from '@/hooks/useSOSProtocol';
import { GlassCard } from '@/components/ui/GlassCard';
import { GlowButton } from '@/components/ui/GlowButton';
import { SpeedSlider } from './SpeedSlider';
import { ScenarioSelector } from './ScenarioSelector';
import { Play, Pause, RotateCcw, Sliders, AlertOctagon } from 'lucide-react';

export function ControlPanel({ className = '' }: { className?: string }) {
  const {
    isPlaying,
    togglePlay,
    resetSimulation,
    apfParams,
    setApfParams,
  } = useSimulationContext();
  const { triggerEmergency } = useSOSProtocol();

  return (
    <div className={`flex flex-col gap-4 overflow-y-auto pr-1 h-full font-mono text-xs ${className}`}>
      {/* Simulation Playback Card */}
      <GlassCard glow="cyan" className="p-4 flex flex-col gap-3">
        <div className="flex items-center justify-between text-[11px] text-[var(--accent-cyan)] font-bold">
          <span className="flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5" />
            SIMULATION PLAYBACK
          </span>
          <span className="px-1.5 py-0.5 rounded bg-[var(--accent-cyan)]/20 text-[var(--accent-cyan)] text-[10px]">
            {isPlaying ? 'ACTIVE 60 HZ' : 'PAUSED'}
          </span>
        </div>

        {/* Primary Controls Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <GlowButton
            variant={isPlaying ? 'amber' : 'cyan'}
            size="sm"
            onClick={togglePlay}
            icon={isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
          >
            {isPlaying ? 'Pause' : 'Resume'}
          </GlowButton>

          <GlowButton
            variant="ghost"
            size="sm"
            onClick={resetSimulation}
            icon={<RotateCcw className="w-4 h-4" />}
          >
            Reset
          </GlowButton>
        </div>

        {/* Speed Slider */}
        <div className="pt-2 border-t border-[var(--border-subtle)]">
          <SpeedSlider />
        </div>

        {/* Scenario Picker */}
        <div className="pt-2 border-t border-[var(--border-subtle)]">
          <ScenarioSelector />
        </div>
      </GlassCard>

      {/* APF Live Tuning Parameters Card */}
      <GlassCard className="p-4 flex flex-col gap-3">
        <span className="text-[11px] text-[var(--text-secondary)] font-bold uppercase tracking-wider">
          APF Planner Tuning
        </span>

        <div className="flex flex-col gap-2">
          <div className="flex justify-between text-[11px]">
            <span>Goal Attract (k_att):</span>
            <strong className="text-[var(--accent-cyan)]">{apfParams.kAtt.toFixed(2)}</strong>
          </div>
          <input
            type="range"
            min="0.5"
            max="3.0"
            step="0.1"
            value={apfParams.kAtt}
            onChange={(e) =>
              setApfParams((prev) => ({ ...prev, kAtt: parseFloat(e.target.value) }))
            }
            className="accent-[var(--accent-cyan)] cursor-pointer"
          />

          <div className="flex justify-between text-[11px] mt-1">
            <span>Obstacle Barrier (k_rep):</span>
            <strong className="text-[var(--danger-red)]">{apfParams.kRep}</strong>
          </div>
          <input
            type="range"
            min="50"
            max="500"
            step="10"
            value={apfParams.kRep}
            onChange={(e) =>
              setApfParams((prev) => ({ ...prev, kRep: parseFloat(e.target.value) }))
            }
            className="accent-[var(--danger-red)] cursor-pointer"
          />
        </div>
      </GlassCard>

      {/* Quick Emergency Intervene Trigger */}
      <GlassCard glow="danger" variant="danger" className="p-3.5 flex flex-col gap-2">
        <div className="flex items-center justify-between text-[11px] text-[var(--danger-red)] font-bold">
          <span>FAIL-SAFE INTERVENTION</span>
          <span className="animate-pulse">ASIL-D</span>
        </div>
        <GlowButton
          variant="danger"
          size="sm"
          onClick={triggerEmergency}
          icon={<AlertOctagon className="w-4 h-4" />}
          className="w-full"
        >
          Trigger Hardware E-Brake
        </GlowButton>
      </GlassCard>
    </div>
  );
}
