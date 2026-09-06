'use client';

/**
 * NavDrishti - OccupancyGridMini Component
 * 60Hz probabilistic occupancy grid mini thumbnail visualization.
 */

import React, { useRef, useEffect } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Grid } from 'lucide-react';

export function OccupancyGridMini({ density = 45 }: { density?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const cols = 16;
    const rows = 12;
    const cellW = canvas.width / cols;
    const cellH = canvas.height / rows;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        // Probabilistic cell occupancy
        const rand = Math.random() * 100;
        let color = 'rgba(0, 240, 255, 0.05)';

        if (rand < density * 0.4) {
          color = 'rgba(255, 170, 0, 0.35)';
        } else if (rand < density * 0.15) {
          color = 'rgba(255, 51, 85, 0.7)';
        }

        ctx.fillStyle = color;
        ctx.fillRect(c * cellW + 1, r * cellH + 1, cellW - 2, cellH - 2);
      }
    }
  }, [density]);

  return (
    <div className="flex flex-col gap-1.5 font-mono text-xs w-full">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-[var(--text-secondary)] text-[11px]">
          <Grid className="w-3 h-3 text-[var(--accent-cyan)]" />
          VOXEL OCCUPANCY
        </span>
        <span className="text-[var(--accent-cyan)] font-bold text-xs">{density}%</span>
      </div>

      <div className="w-full h-16 rounded-lg overflow-hidden border border-[var(--border-subtle)] bg-black/60">
        <canvas ref={canvasRef} width={200} height={64} className="w-full h-full block" />
      </div>
    </div>
  );
}
