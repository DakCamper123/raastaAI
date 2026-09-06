'use client';

/**
 * NavDrishti - SimulationCanvas Component
 * ResizeObserver-driven 2D kinematic road canvas executing 60Hz physics and rendering.
 */

import React, { useRef, useEffect } from 'react';
import { useSimulationContext } from '@/context/SimulationContext';
import { useSimulationLoop } from '@/hooks/useSimulationLoop';
import { useTheme } from '@/hooks/useTheme';
import { drawEgoVehicle } from './VehicleSprite';
import { drawObstacles } from './ObstacleLayer';
import { drawTrajectory } from './TrajectoryOverlay';
import { SIMULATION_CONSTANTS } from '@/lib/constants';

export function SimulationCanvas({ className = '' }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { ego, obstacles, trajectory, scenario, isPlaying } = useSimulationContext();
  const { isDark } = useTheme();

  // Run the 60Hz kinematic & planning loop
  useSimulationLoop();

  // Render Canvas Scene
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    const ppm = SIMULATION_CONSTANTS.PIXELS_PER_METER;

    ctx.clearRect(0, 0, w, h);

    // Camera view offset: center ego vehicle around 25% from the left
    const cameraOffsetX = w * 0.25 - ego.x * ppm;
    const cameraOffsetY = h * 0.5 - ego.y * ppm;

    ctx.save();
    ctx.translate(cameraOffsetX, cameraOffsetY);

    // 1. Draw Road Surface & Shoulders
    const roadHalfWidth = (scenario.roadWidth / 2) * ppm;
    const roadLength = 2000 * ppm;

    // Grass / Mud shoulders
    ctx.fillStyle = isDark ? '#141c2b' : '#cbd5e1';
    ctx.fillRect(-200 * ppm, -roadHalfWidth - 80, roadLength, roadHalfWidth * 2 + 160);

    // Asphalt pavement
    ctx.fillStyle = isDark ? '#0b101b' : '#f1f5f9';
    ctx.fillRect(-200 * ppm, -roadHalfWidth, roadLength, roadHalfWidth * 2);

    // Road Edge Solid Lines
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(-200 * ppm, -roadHalfWidth);
    ctx.lineTo(roadLength, -roadHalfWidth);
    ctx.moveTo(-200 * ppm, roadHalfWidth);
    ctx.lineTo(roadLength, roadHalfWidth);
    ctx.stroke();

    // Centerline Dashes
    ctx.strokeStyle = '#ffaa00';
    ctx.lineWidth = 2;
    ctx.setLineDash([18, 14]);
    ctx.beginPath();
    ctx.moveTo(-200 * ppm, 0);
    ctx.lineTo(roadLength, 0);
    ctx.stroke();
    ctx.setLineDash([]);

    // 2. Draw Trajectory Ribbon
    drawTrajectory(ctx, trajectory, ppm, isDark);

    // 3. Draw Dynamic Obstacles
    drawObstacles(ctx, obstacles, ppm, isDark);

    // 4. Draw Ego Autonomous Vehicle
    drawEgoVehicle(ctx, ego, ppm, isDark);

    ctx.restore();
  }, [ego, obstacles, trajectory, scenario, isDark]);

  // Handle ResizeObserver
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        canvas.width = entry.contentRect.width;
        canvas.height = entry.contentRect.height;
      }
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full flex-1 overflow-hidden bg-[var(--bg-primary)] ${className}`}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block cursor-crosshair"
        role="img"
        aria-label={`NavDrishti Autonomous Path Planning 2D Simulator - Scenario: ${scenario.title}`}
      />

      {/* Top HUD Simulator Overlay */}
      <div className="absolute top-3 left-3 z-10 flex items-center gap-2 bg-[var(--surface-glass)] backdrop-blur-md px-3 py-1.5 rounded-lg border border-[var(--border-subtle)] font-mono text-xs">
        <span className="w-2 h-2 rounded-full bg-[var(--success-green)] animate-pulse" />
        <span className="text-[var(--accent-cyan)] font-bold">{scenario.code}</span>
        <span className="text-[var(--text-secondary)]">|</span>
        <span className="text-[var(--text-primary)] truncate max-w-[200px]">{scenario.title}</span>
      </div>

      {/* Simulator Pause Overlay */}
      {!isPlaying && (
        <div className="absolute inset-0 z-20 bg-black/40 backdrop-blur-xs flex items-center justify-center pointer-events-none">
          <div className="px-6 py-2.5 rounded-xl border border-[var(--accent-amber)] bg-black/80 font-mono text-sm font-bold text-[var(--accent-amber)] shadow-amber-glow">
            SIMULATION PAUSED
          </div>
        </div>
      )}
    </div>
  );
}
