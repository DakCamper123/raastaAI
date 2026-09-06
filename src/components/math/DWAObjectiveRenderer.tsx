'use client';

/**
 * NavDrishti - DWAObjectiveRenderer Component
 * KaTeX rendering of Dynamic Window Approach multi-objective scoring function
 * with interactive weight sliders (alpha, beta, gamma).
 */

import React, { useState } from 'react';
import katex from 'katex';
import { GlassCard } from '@/components/ui/GlassCard';
import { Sliders } from 'lucide-react';

export function DWAObjectiveRenderer() {
  const [alpha, setAlpha] = useState<number>(0.25);
  const [beta, setBeta] = useState<number>(0.45);
  const [gamma, setGamma] = useState<number>(0.30);

  const formulaDWA = katex.renderToString(
    'G(v, \\omega) = \\alpha \\cdot \\text{heading}(v, \\omega) + \\beta \\cdot \\text{dist}(v, \\omega) + \\gamma \\cdot \\text{velocity}(v, \\omega)',
    { throwOnError: false, displayMode: true }
  );

  const formulaWindow = katex.renderToString(
    'V_d = \\left\\{ (v, \\omega) \\mid v \\in [v - \\dot{v}_{max} \\Delta t, v + \\dot{v}_{max} \\Delta t], \\; \\omega \\in [\\omega - \\dot{\\omega}_{max} \\Delta t, \\omega + \\dot{\\omega}_{max} \\Delta t] \\right\\}',
    { throwOnError: false, displayMode: true }
  );

  return (
    <GlassCard glow="amber" className="p-6 flex flex-col gap-6 font-mono text-xs">
      <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
        <h3 className="font-display font-bold text-lg text-[var(--text-primary)]">
          Dynamic Window Approach (DWA) Objective Optimization
        </h3>
        <span className="px-2 py-0.5 rounded bg-[var(--accent-amber)]/20 text-[var(--accent-amber)] text-[10px] font-bold">
          KATEX RENDERED
        </span>
      </div>

      {/* KaTeX Math Blocks */}
      <div className="flex flex-col gap-4 text-[var(--text-primary)] bg-[var(--bg-secondary)]/80 p-4 rounded-xl border border-[var(--border-subtle)] overflow-x-auto">
        <div dangerouslySetInnerHTML={{ __html: formulaDWA }} />
        <div dangerouslySetInnerHTML={{ __html: formulaWindow }} />
      </div>

      {/* Interactive Weight Sliders */}
      <div className="flex flex-col gap-3 pt-2 border-t border-[var(--border-subtle)]">
        <div className="flex items-center gap-2 text-xs text-[var(--accent-cyan)] font-bold">
          <Sliders className="w-4 h-4" />
          TRAJECTORY COST WEIGHT ALLOCATION (α + β + γ = 1.0)
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex flex-col gap-1.5 p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-subtle)]">
            <div className="flex justify-between">
              <span>Goal Heading Weight (α)</span>
              <strong className="text-[var(--accent-cyan)]">{alpha.toFixed(2)}</strong>
            </div>
            <input
              type="range"
              min="0.05"
              max="0.8"
              step="0.05"
              value={alpha}
              onChange={(e) => setAlpha(parseFloat(e.target.value))}
              className="accent-[var(--accent-cyan)] cursor-pointer"
            />
          </div>

          <div className="flex flex-col gap-1.5 p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-subtle)]">
            <div className="flex justify-between">
              <span>Obstacle Clearance Weight (β)</span>
              <strong className="text-[var(--danger-red)]">{beta.toFixed(2)}</strong>
            </div>
            <input
              type="range"
              min="0.05"
              max="0.8"
              step="0.05"
              value={beta}
              onChange={(e) => setBeta(parseFloat(e.target.value))}
              className="accent-[var(--danger-red)] cursor-pointer"
            />
          </div>

          <div className="flex flex-col gap-1.5 p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-subtle)]">
            <div className="flex justify-between">
              <span>Velocity Maximizer Weight (γ)</span>
              <strong className="text-[var(--accent-amber)]">{gamma.toFixed(2)}</strong>
            </div>
            <input
              type="range"
              min="0.05"
              max="0.8"
              step="0.05"
              value={gamma}
              onChange={(e) => setGamma(parseFloat(e.target.value))}
              className="accent-[var(--accent-amber)] cursor-pointer"
            />
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
