'use client';

/**
 * RAASTA.AI - FailSafeCoreBlock Component
 * Drive-by-wire actuation, ISO 26262 ASIL-D hydraulic fail-safe, 5G C-V2X broadcast, and acoustic siren.
 */

import React from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { ShieldAlert, Radio, Volume2, Lock } from 'lucide-react';

export function FailSafeCoreBlock() {
  return (
    <GlassCard glow="danger" variant="danger" className="p-6 flex flex-col gap-4 font-mono">
      <div className="flex items-center justify-between border-b border-[var(--danger-red)]/30 pb-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-[var(--danger-red)]/20 text-[var(--danger-red)] shadow-[0_0_15px_rgba(255,51,85,0.4)] animate-pulse">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] text-[var(--danger-red)] uppercase tracking-widest font-bold">
              STAGE 05 • DRIVE-BY-WIRE &amp; FAIL-SAFE SAFETY CORE
            </span>
            <h3 className="font-display font-bold text-xl text-[var(--text-primary)]">
              ASIL-D E-Brake &amp; 5G C-V2X Emergency Transmission
            </h3>
          </div>
        </div>
        <span className="px-2 py-1 rounded bg-[var(--danger-red)]/20 text-[var(--danger-red)] text-xs font-bold">
          LATENCY &lt; 11.2 MS
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div className="p-3 rounded-lg border border-[var(--danger-red)]/30 bg-[var(--bg-secondary)] flex flex-col gap-1.5">
          <span className="text-[var(--danger-red)] font-bold flex items-center gap-1.5">
            <Lock className="w-4 h-4" /> ASIL-D Hydraulic E-Brake Loop
          </span>
          <p className="text-[var(--text-secondary)] font-body text-[11px] leading-relaxed">
            Dual-redundant brake-by-wire hydraulic pressure clamp initiating full 8.5 m/s² deceleration within 40 milliseconds of human or planner E-Stop trigger.
          </p>
        </div>

        <div className="p-3 rounded-lg border border-[var(--danger-red)]/30 bg-[var(--bg-secondary)] flex flex-col gap-1.5">
          <span className="text-[var(--accent-amber)] font-bold flex items-center gap-1.5">
            <Radio className="w-4 h-4" /> 5G NR C-V2X URLLC Broadcast
          </span>
          <p className="text-[var(--text-secondary)] font-body text-[11px] leading-relaxed">
            Transmits high-priority emergency packets over 5G NR Band n78 (3.5 GHz) to surrounding connected infrastructure and emergency dispatch.
          </p>
        </div>

        <div className="p-3 rounded-lg border border-[var(--danger-red)]/30 bg-[var(--bg-secondary)] flex flex-col gap-1.5">
          <span className="text-[var(--accent-cyan)] font-bold flex items-center gap-1.5">
            <Volume2 className="w-4 h-4" /> Acoustic Siren &amp; Voice Synthesis
          </span>
          <p className="text-[var(--text-secondary)] font-body text-[11px] leading-relaxed">
            Instantaneous cockpit and exterior alert synthesizing 800Hz / 1200Hz dual-frequency siren and natural language speech synthesis via Web Audio.
          </p>
        </div>
      </div>
    </GlassCard>
  );
}
