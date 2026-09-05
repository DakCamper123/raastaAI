'use client';

/**
 * RAASTA.AI - FusionEngineBlock Component
 * BEVFormer multi-cam projection, dynamic occupancy grid, and EKF pose estimation.
 */

import React from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Cpu, Layers, Activity } from 'lucide-react';

export function FusionEngineBlock() {
  return (
    <GlassCard glow="cyan" className="p-6 flex flex-col gap-4 font-mono">
      <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-[var(--accent-cyan)]/20 text-[var(--accent-cyan)] shadow-cyan-glow">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] text-[var(--accent-cyan)] uppercase tracking-widest font-bold">
              STAGE 02 • SENSOR FUSION ENGINE
            </span>
            <h3 className="font-display font-bold text-xl text-[var(--text-primary)]">
              BEVFormer + EKF Dynamic Occupancy
            </h3>
          </div>
        </div>
        <span className="px-2 py-1 rounded bg-[var(--accent-cyan)]/15 text-[var(--accent-cyan)] text-xs font-bold">
          60 HZ PIPELINE
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div className="p-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-secondary)] flex flex-col gap-1.5">
          <span className="text-[var(--accent-cyan)] font-bold flex items-center gap-1.5">
            <Layers className="w-4 h-4" /> BEVFormer Spatial Cross-Attention
          </span>
          <p className="text-[var(--text-secondary)] font-body text-[11px] leading-relaxed">
            Fuses 8 surround optical feeds into unified top-down 3D Bird-Eye-View feature maps at 60 FPS without perspective distortion.
          </p>
        </div>

        <div className="p-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-secondary)] flex flex-col gap-1.5">
          <span className="text-[var(--accent-amber)] font-bold flex items-center gap-1.5">
            <Activity className="w-4 h-4" /> Dynamic Occupancy Grid (Voxel)
          </span>
          <p className="text-[var(--text-secondary)] font-body text-[11px] leading-relaxed">
            Continuously resolves unmodeled Indian road hazards (potholes, debris, unpaved shoulders) into probabilistic risk voxels.
          </p>
        </div>

        <div className="p-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-secondary)] flex flex-col gap-1.5">
          <span className="text-[var(--success-green)] font-bold flex items-center gap-1.5">
            <Cpu className="w-4 h-4" /> Extended Kalman Filter (EKF)
          </span>
          <p className="text-[var(--text-secondary)] font-body text-[11px] leading-relaxed">
            Fused IMU and GNSS-RTK dead-reckoning guaranteeing ±1.4 cm positional lock even during dense tree canopies or flyover underpasses.
          </p>
        </div>
      </div>
    </GlassCard>
  );
}
