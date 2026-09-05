'use client';

/**
 * RAASTA.AI - PredictionPipeline Component
 * Bovine-PoseNet, TTC vectors, and game-theoretic tactical negotiation model.
 */

import React from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Eye, Zap, Crosshair } from 'lucide-react';

export function PredictionPipeline() {
  return (
    <GlassCard glow="amber" className="p-6 flex flex-col gap-4 font-mono">
      <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-[var(--accent-amber)]/20 text-[var(--accent-amber)] shadow-amber-glow">
            <Eye className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] text-[var(--accent-amber)] uppercase tracking-widest font-bold">
              STAGE 03 • PREDICTION & POSE ESTIMATION
            </span>
            <h3 className="font-display font-bold text-xl text-[var(--text-primary)]">
              Biological Pose-Tracking & Multi-Agent Intention
            </h3>
          </div>
        </div>
        <span className="px-2 py-1 rounded bg-[var(--accent-amber)]/15 text-[var(--accent-amber)] text-xs font-bold">
          LATENCY &lt; 8.8 MS
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div className="p-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-secondary)] flex flex-col gap-1.5">
          <span className="text-[var(--accent-amber)] font-bold flex items-center gap-1.5">
            <Crosshair className="w-4 h-4" /> Bovine-PoseNet Keypoint Model
          </span>
          <p className="text-[var(--text-secondary)] font-body text-[11px] leading-relaxed">
            18-keypoint biological skeleton estimator predicting bovine head turns, ear twitching, and leg extension vectors before unexpected road steps.
          </p>
        </div>

        <div className="p-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-secondary)] flex flex-col gap-1.5">
          <span className="text-[var(--accent-cyan)] font-bold flex items-center gap-1.5">
            <Zap className="w-4 h-4" /> Time-To-Collision (TTC) Vectors
          </span>
          <p className="text-[var(--text-secondary)] font-body text-[11px] leading-relaxed">
            Computes dynamic collision cones across all heterogeneous agents (auto-rickshaws, bikes, pedestrians) at 60Hz.
          </p>
        </div>

        <div className="p-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-secondary)] flex flex-col gap-1.5">
          <span className="text-[var(--danger-red)] font-bold flex items-center gap-1.5">
            <Zap className="w-4 h-4" /> Game-Theoretic Micro-Yielding
          </span>
          <p className="text-[var(--text-secondary)] font-body text-[11px] leading-relaxed">
            Simulates non-verbal negotiation at intersections without traffic lights: asserts right-of-way smoothly or concedes with courteous deceleration.
          </p>
        </div>
      </div>
    </GlassCard>
  );
}
