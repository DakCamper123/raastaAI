'use client';

/**
 * NavDrishti - MotionControllerBlock Component
 * Hybrid APF repulsive field and DWA velocity window path planning.
 */

import React from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Navigation, Compass, Gauge } from 'lucide-react';

export function MotionControllerBlock() {
  return (
    <GlassCard glow="cyan" className="p-6 flex flex-col gap-4 font-mono">
      <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-[var(--accent-cyan)]/20 text-[var(--accent-cyan)] shadow-cyan-glow">
            <Navigation className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] text-[var(--accent-cyan)] uppercase tracking-widest font-bold">
              STAGE 04 • KINODYNAMIC MOTION CONTROLLER
            </span>
            <h3 className="font-display font-bold text-xl text-[var(--text-primary)]">
              Artificial Potential Fields (APF) + Dynamic Window (DWA)
            </h3>
          </div>
        </div>
        <span className="px-2 py-1 rounded bg-[var(--accent-cyan)]/15 text-[var(--accent-cyan)] text-xs font-bold">
          CYCLE: 16.6 MS (60 HZ)
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div className="p-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-secondary)] flex flex-col gap-1.5">
          <span className="text-[var(--accent-cyan)] font-bold flex items-center gap-1.5">
            <Compass className="w-4 h-4" /> APF Repulsive Energy Surface
          </span>
          <p className="text-[var(--text-secondary)] font-body text-[11px] leading-relaxed">
            Erects dynamic virtual energy walls around unpaved shoulders, cows, and road edges, guiding the vehicle toward safe corridor minima.
          </p>
        </div>

        <div className="p-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-secondary)] flex flex-col gap-1.5">
          <span className="text-[var(--accent-amber)] font-bold flex items-center gap-1.5">
            <Gauge className="w-4 h-4" /> DWA Feasible Velocity Space
          </span>
          <p className="text-[var(--text-secondary)] font-body text-[11px] leading-relaxed">
            Searches permissible dynamic accelerations $[v, \omega] \in V_d$ in real time to guarantee kinematically feasible collision-free trajectories.
          </p>
        </div>

        <div className="p-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-secondary)] flex flex-col gap-1.5">
          <span className="text-[var(--success-green)] font-bold flex items-center gap-1.5">
            <Navigation className="w-4 h-4" /> Curvature &amp; Slip Clamping
          </span>
          <p className="text-[var(--text-secondary)] font-body text-[11px] leading-relaxed">
            Accounts for tire-road friction coefficient on wet monsoon asphalt and mud drop-offs, clamping maximum lateral acceleration to &le; 3.2 m/s&sup2;.
          </p>
        </div>
      </div>
    </GlassCard>
  );
}
