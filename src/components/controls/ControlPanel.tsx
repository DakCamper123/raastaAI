'use client';

/**
 * NavDrishti - ControlPanel Component
 * Playback, Scenario picker, Warp slider, and APF/DWA parameters control center.
 * Tuning settings are protected behind Supabase free email authentication.
 */

import React from 'react';
import { useSimulationContext } from '@/context/SimulationContext';
import { useAuth } from '@/context/AuthContext';
import { useSOSProtocol } from '@/hooks/useSOSProtocol';
import { GlassCard } from '@/components/ui/GlassCard';
import { GlowButton } from '@/components/ui/GlowButton';
import { SpeedSlider } from './SpeedSlider';
import { ScenarioSelector } from './ScenarioSelector';
import { Play, Pause, RotateCcw, Sliders, AlertOctagon, Lock, Sparkles } from 'lucide-react';

export function ControlPanel({ className = '' }: { className?: string }) {
  const {
    isPlaying,
    togglePlay,
    resetSimulation,
    apfParams,
    setApfParams,
  } = useSimulationContext();
  const { isAuthenticated, openAuthModal } = useAuth();
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

      {/* APF Live Tuning Parameters Card (Gated) */}
      <div className="relative">
        <GlassCard className="p-4 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-[var(--text-secondary)] font-bold uppercase tracking-wider">
              APF Planner Tuning
            </span>
            {!isAuthenticated && (
              <span className="flex items-center gap-1 text-[10px] text-[var(--accent-amber)] font-bold">
                <Lock className="w-3 h-3" /> PROTECTED
              </span>
            )}
          </div>

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
              disabled={!isAuthenticated}
              onChange={(e) =>
                setApfParams((prev) => ({ ...prev, kAtt: parseFloat(e.target.value) }))
              }
              className="accent-[var(--accent-cyan)] cursor-pointer disabled:opacity-50"
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
              disabled={!isAuthenticated}
              onChange={(e) =>
                setApfParams((prev) => ({ ...prev, kRep: parseFloat(e.target.value) }))
              }
              className="accent-[var(--danger-red)] cursor-pointer disabled:opacity-50"
            />
          </div>
        </GlassCard>

        {/* Auth Lock Overlay for APF Tuning */}
        {!isAuthenticated && (
          <div className="absolute inset-0 z-20 rounded-xl bg-[var(--bg-secondary)]/90 backdrop-blur-[2px] border border-[var(--border-subtle)] flex flex-col items-center justify-center p-3 text-center gap-2">
            <div className="w-7 h-7 rounded-full border border-[var(--accent-cyan)] bg-[var(--accent-cyan)]/20 flex items-center justify-center shadow-cyan-glow">
              <Lock className="w-3.5 h-3.5 text-[var(--accent-cyan)]" />
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] font-bold text-[var(--text-primary)]">Planner Settings Locked</span>
              <span className="text-[9px] text-[var(--text-secondary)] max-w-[200px]">
                Sign in or register free to adjust artificial potential field weights.
              </span>
            </div>
            <button
              onClick={() =>
                openAuthModal(
                  'signin',
                  'Sign in or create a free account to customize APF planner gains and safety tolerances.'
                )
              }
              className="flex items-center gap-1 px-3 py-1 rounded bg-[var(--accent-cyan)]/20 border border-[var(--accent-cyan)] text-[var(--accent-cyan)] text-[9px] font-bold hover:bg-[var(--accent-cyan)]/30 hover:shadow-cyan-glow transition-all"
            >
              <Sparkles className="w-3 h-3" /> Unlock Settings (Free)
            </button>
          </div>
        )}
      </div>

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
