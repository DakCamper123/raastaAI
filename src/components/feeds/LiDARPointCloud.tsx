'use client';

/**
 * NavDrishti - LiDARPointCloud Component
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
      const maxR = cy - 4;

      // 1. Concentric Range Rings
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.18)';
      ctx.lineWidth = 1;

      for (let r = 8; r <= maxR; r += 8) {
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Cross Axis
      ctx.beginPath();
      ctx.moveTo(cx, 2);
      ctx.lineTo(cx, canvas.height - 2);
      ctx.moveTo(cx - maxR - 4, cy);
      ctx.lineTo(cx + maxR + 4, cy);
      ctx.stroke();

      // 2. Rotating Radar/LiDAR Sweep Line
      angle += 0.05;
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.9)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(angle) * maxR, cy + Math.sin(angle) * maxR);
      ctx.stroke();

      // Sweep Sector Gradient
      ctx.fillStyle = 'rgba(0, 240, 255, 0.1)';
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, maxR, angle - 0.35, angle);
      ctx.closePath();
      ctx.fill();

      // 3. Simulated Dynamic Point Cloud Cluster Returns
      ctx.fillStyle = '#ffaa00';
      const points = [
        { r: maxR * 0.45, theta: 0.8 },
        { r: maxR * 0.5, theta: 0.84 },
        { r: maxR * 0.48, theta: 0.76 },
        { r: maxR * 0.78, theta: -1.2 },
        { r: maxR * 0.82, theta: -1.18 },
        { r: maxR * 0.32, theta: 2.4 },
        { r: maxR * 0.36, theta: 2.45 },
      ];

      for (const pt of points) {
        const px = cx + Math.cos(pt.theta) * pt.r;
        const py = cy + Math.sin(pt.theta) * pt.r;
        ctx.beginPath();
        ctx.arc(px, py, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <GlassCard className={`relative overflow-hidden p-1.5 flex flex-col gap-1 font-mono text-[9px] ${className}`}>
      {/* Header Bar */}
      <div className="flex items-center justify-between px-0.5 leading-none">
        <span className="flex items-center gap-1 text-[var(--accent-cyan)] font-bold text-[8px] truncate">
          <Disc className="w-2.5 h-2.5 animate-spin shrink-0" />
          <span>128-BEAM LIDAR</span>
        </span>
        <span className="text-[var(--text-muted)] text-[7px] shrink-0">1.4M PTS/S</span>
      </div>

      {/* Compact Canvas Container */}
      <div className="relative h-14 w-full rounded overflow-hidden border border-[var(--border-subtle)] bg-[#040810] flex items-center justify-center">
        <canvas ref={canvasRef} width={140} height={70} className="w-full h-full block" />
      </div>
    </GlassCard>
  );
}
