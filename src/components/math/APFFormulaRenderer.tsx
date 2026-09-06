'use client';

/**
 * RAASTA.AI - APFFormulaRenderer Component
 * Renders mathematical formulation of Artificial Potential Fields with interactive parameter sliders
 * and real-time 2D potential field contour canvas visualization.
 */

import React, { useState, useEffect, useRef } from 'react';
import katex from 'katex';
import { GlassCard } from '@/components/ui/GlassCard';
import { Sliders } from 'lucide-react';

export function APFFormulaRenderer() {
  const [kAtt, setKAtt] = useState<number>(1.2);
  const [kRep, setKRep] = useState<number>(250);
  const [rho0, setRho0] = useState<number>(16);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // LaTeX equation strings
  const formulaTotal = katex.renderToString('U_{total}(q) = U_{att}(q) + \\sum_{i=1}^{N} U_{rep, i}(q)', {
    throwOnError: false,
    displayMode: true,
  });

  const formulaAtt = katex.renderToString('U_{att}(q) = \\frac{1}{2} k_{att} \\cdot \\|q - q_{goal}\\|^2', {
    throwOnError: false,
    displayMode: true,
  });

  const formulaRep = katex.renderToString(
    'U_{rep}(q) = \\begin{cases} \\frac{1}{2} k_{rep} \\left( \\frac{1}{\\rho(q)} - \\frac{1}{\\rho_0} \\right)^2 \\left(\\frac{v_{ego}}{v_{max}}\\right) & \\text{if } \\rho(q) \\le \\rho_0 \\\\ 0 & \\text{if } \\rho(q) > \\rho_0 \\end{cases}',
    { throwOnError: false, displayMode: true }
  );

  // Draw 2D potential field slice on mini canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    const goalX = w - 40;
    const goalY = h / 2;
    const obsX = w / 2;
    const obsY = h / 2;

    const imgData = ctx.createImageData(w, h);
    const data = imgData.data;

    for (let py = 0; py < h; py += 2) {
      for (let px = 0; px < w; px += 2) {
        // Goal distance
        const dg = Math.hypot(px - goalX, py - goalY) * 0.1;
        const uAttVal = 0.5 * kAtt * dg * dg;

        // Obstacle distance
        const dobs = Math.max(1, Math.hypot(px - obsX, py - obsY) * 0.1);
        let uRepVal = 0;
        if (dobs < rho0) {
          const diff = 1 / dobs - 1 / rho0;
          uRepVal = 0.5 * kRep * diff * diff;
        }

        const uTotal = uAttVal + uRepVal;
        const intensity = Math.min(255, Math.floor(uTotal * 1.8));

        // Color gradient: cyan to purple/amber to bright red
        const index = (py * w + px) * 4;
        data[index] = Math.min(255, intensity * 2); // R
        data[index + 1] = Math.max(0, 180 - intensity); // G
        data[index + 2] = Math.min(255, 255 - intensity); // B
        data[index + 3] = 160; // Alpha
      }
    }

    ctx.putImageData(imgData, 0, 0);

    // Draw Obstacle & Goal Markers
    ctx.fillStyle = '#10b981';
    ctx.beginPath();
    ctx.arc(goalX, goalY, 6, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#ff3355';
    ctx.beginPath();
    ctx.arc(obsX, obsY, 8, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#f59e0b';
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.arc(obsX, obsY, rho0 * 10, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);
  }, [kAtt, kRep, rho0]);

  return (
    <GlassCard glow="cyan" className="p-6 flex flex-col gap-6 font-mono text-xs">
      <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
        <h3 className="font-display font-bold text-lg text-[var(--text-primary)]">
          Artificial Potential Field (APF) Energy Formulation
        </h3>
        <span className="px-2 py-0.5 rounded bg-[var(--accent-cyan)]/20 text-[var(--accent-cyan)] text-[10px] font-bold">
          KATEX RENDERED
        </span>
      </div>

      {/* KaTeX Math Blocks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
        <div className="flex flex-col gap-4 text-[var(--text-primary)] bg-[var(--bg-secondary)]/80 p-4 rounded-xl border border-[var(--border-subtle)] overflow-x-auto">
          <div dangerouslySetInnerHTML={{ __html: formulaTotal }} />
          <div dangerouslySetInnerHTML={{ __html: formulaAtt }} />
          <div dangerouslySetInnerHTML={{ __html: formulaRep }} />
        </div>

        {/* Real-time 2D Canvas Heatmap */}
        <div className="flex flex-col items-center gap-2">
          <span className="text-[11px] text-[var(--text-secondary)] font-bold">
            Real-Time 2D Energy Potential Gradient (Heatmap)
          </span>
          <div className="relative rounded-xl border border-[var(--border-subtle)] overflow-hidden shadow-inner bg-black">
            <canvas ref={canvasRef} width={280} height={160} />
            <div className="absolute bottom-2 left-2 flex items-center gap-2 text-[9px] bg-black/70 px-2 py-0.5 rounded">
              <span className="text-[var(--danger-red)]">● Obstacle</span>
              <span className="text-[var(--accent-amber)]">◌ ρ₀ Perimeter</span>
              <span className="text-[var(--accent-cyan)]">● Goal</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Parameter Tuning Sliders */}
      <div className="flex flex-col gap-3 pt-4 border-t border-[var(--border-subtle)]">
        <div className="flex items-center gap-2 text-xs text-[var(--accent-amber)] font-bold">
          <Sliders className="w-4 h-4" />
          INTERACTIVE PARAMETER TUNING
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex flex-col gap-1.5 p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-subtle)]">
            <div className="flex justify-between">
              <span>Goal Attract Gain (k_att)</span>
              <strong className="text-[var(--accent-cyan)]">{kAtt.toFixed(2)}</strong>
            </div>
            <input
              type="range"
              min="0.2"
              max="4.0"
              step="0.1"
              value={kAtt}
              onChange={(e) => setKAtt(parseFloat(e.target.value))}
              className="accent-[var(--accent-cyan)] cursor-pointer"
            />
          </div>

          <div className="flex flex-col gap-1.5 p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-subtle)]">
            <div className="flex justify-between">
              <span>Repulsive Barrier Gain (k_rep)</span>
              <strong className="text-[var(--danger-red)]">{kRep}</strong>
            </div>
            <input
              type="range"
              min="50"
              max="600"
              step="10"
              value={kRep}
              onChange={(e) => setKRep(parseFloat(e.target.value))}
              className="accent-[var(--danger-red)] cursor-pointer"
            />
          </div>

          <div className="flex flex-col gap-1.5 p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-subtle)]">
            <div className="flex justify-between">
              <span>Influence Radius (ρ₀)</span>
              <strong className="text-[var(--accent-amber)]">{rho0}m</strong>
            </div>
            <input
              type="range"
              min="6"
              max="28"
              step="1"
              value={rho0}
              onChange={(e) => setRho0(parseFloat(e.target.value))}
              className="accent-[var(--accent-amber)] cursor-pointer"
            />
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
