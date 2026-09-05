'use client';

/**
 * RAASTA.AI - LiDARPointCloud Component
 * 128-beam 360-degree point cloud visualization with polar coordinate sweep.
 */

import React, { useRef, useEffect } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Disc } from 'lucide-react';

export function LiDARPointCloud({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let angle = 0;
    let animId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const maxR = cx - 10;

      // 1. Concentric Range Rings (10m, 20m, 30m, 50m)
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.15)';
      ctx.lineWidth = 1;

      for (let r = 20; r <= maxR; r += 20) {
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Cross Axis
      ctx.beginPath();
      ctx.moveTo(cx, 10);
      ctx.lineTo(cx, canvas.height - 10);
      ctx.moveTo(10, cy);
      ctx.lineTo(canvas.width - 10, cy);
      ctx.stroke();

      // 2. Rotating Radar/LiDAR Sweep Line
      angle += 0.04;
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.8)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(angle) * maxR, cy + Math.sin(angle) * maxR);
      ctx.stroke();

      // Sweep Sector Gradient
      ctx.fillStyle = 'rgba(0, 240, 255, 0.08)';
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, maxR, angle - 0.4, angle);
      ctx.closePath();
      ctx.fill();

      // 3. Simulated Dynamic Point Cloud Cluster Returns
      ctx.fillStyle = '#ffaa00';
      const points = [
        { r: 42, theta: 0.8 },
        { r: 46, theta: 0.84 },
        { r: 44, theta: 0.76 },
        { r: 70, theta: -1.2 },
        { r: 74, theta: -1.18 },
        { r: 25, theta: 2.4 },
        { r: 28, theta: 2.45 },
      ];

      for (const pt of points) {
        const px = cx + Math.cos(pt.theta) * pt.r;
        const py = cy + Math.sin(pt.theta) * pt.r;
        ctx.beginPath();
        ctx.arc(px, py, 2, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <GlassCard className={`p-2 flex flex-col gap-1.5 font-mono text-[10px] ${className}`}>
      <div className="flex items-center justify-between px-1">
        <span className="flex items-center gap-1.5 text-[var(--accent-cyan)] font-bold">
          <Disc className="w-3 h-3 animate-spin" />
          128-BEAM 360° LIDAR
        </span>
        <span className="text-[var(--text-muted)]">1.4M PTS/S</span>
      </div>

      <div className="relative aspect-square w-full rounded-lg overflow-hidden border border-[var(--border-subtle)] bg-[#040810] flex items-center justify-center">
        <canvas ref={canvasRef} width={180} height={180} className="w-full h-full block" />
      </div>
    </GlassCard>
  );
}
