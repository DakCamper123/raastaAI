'use client';

/**
 * RAASTA.AI - ScrollableSidebar Component
 * Overflow-safe sidebar housing Scenario Selector, Scenario Inspector, and Simulation Parameters.
 */

import React from 'react';
import { useSimulationContext } from '@/context/SimulationContext';
import { SCENARIOS } from '@/data/scenarios';
import { GlassCard } from '@/components/ui/GlassCard';
import { Layers, MapPin, Gauge } from 'lucide-react';

export function ScrollableSidebar({ className = '' }: { className?: string }) {
  const { scenario, selectScenario, isPlaying } = useSimulationContext();

  return (
    <aside
      className={`flex flex-col gap-4 overflow-y-auto pr-1 h-full font-mono text-xs ${className}`}
      aria-label="Simulation Scenarios and Settings"
    >
      {/* Active Scenario Card */}
      <GlassCard glow="cyan" className="p-4 flex flex-col gap-2.5">
        <div className="flex items-center justify-between text-[11px] text-[var(--accent-cyan)] font-bold">
          <span className="flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5" />
            ACTIVE SCENARIO
          </span>
          <span className="px-1.5 py-0.5 rounded bg-[var(--accent-cyan)]/20 text-[var(--accent-cyan)]">
            {scenario.code}
          </span>
        </div>

        <h4 className="font-display font-bold text-base text-[var(--text-primary)]">
          {scenario.title}
        </h4>

        <div className="flex items-center gap-1 text-[var(--text-secondary)] text-[11px]">
          <MapPin className="w-3 h-3 text-[var(--accent-amber)]" />
          <span className="truncate">{scenario.location}</span>
        </div>

        <p className="text-[11px] text-[var(--text-muted)] font-body leading-relaxed">
          {scenario.threatProfile}
        </p>

        <div className="pt-2 border-t border-[var(--border-subtle)] flex items-center justify-between text-[10px]">
          <span>INIT SPEED: <strong>{scenario.egoSpeedInitial} KM/H</strong></span>
          <span className={`font-bold ${scenario.severity === 'CRITICAL' ? 'text-[var(--danger-red)]' : 'text-[var(--accent-amber)]'}`}>
            {scenario.severity}
          </span>
        </div>
      </GlassCard>

      {/* Scenario Picker List */}
      <div className="flex flex-col gap-2">
        <span className="text-[10px] text-[var(--text-muted)] tracking-wider uppercase font-bold px-1">
          Select Edge Corridor:
        </span>
        {SCENARIOS.map((sc) => {
          const isSelected = scenario.id === sc.id;
          return (
            <button
              key={sc.id}
              onClick={() => selectScenario(sc.id)}
              className={`p-3 rounded-lg border text-left transition-all duration-200 flex flex-col gap-1 ${
                isSelected
                  ? 'border-[var(--accent-cyan)] bg-[var(--accent-cyan)]/15 text-[var(--accent-cyan)] font-bold shadow-cyan-glow'
                  : 'border-[var(--border-subtle)] bg-[var(--surface-glass)] text-[var(--text-secondary)] hover:border-[var(--accent-cyan)]/50 hover:text-[var(--text-primary)]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-display font-semibold text-xs text-[var(--text-primary)]">
                  {sc.title}
                </span>
                <span className="text-[9px] px-1 py-0.5 rounded bg-[var(--border-subtle)] font-mono">
                  {sc.code}
                </span>
              </div>
              <span className="text-[10px] text-[var(--text-muted)] truncate">
                {sc.subtitle}
              </span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
