'use client';

/**
 * RAASTA.AI - SensorFeeds Component
 * 4-card feed grid showing LiDAR point cloud, 2x camera feeds, and radar heatmap.
 * Gated behind Supabase free email authentication.
 */

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { CAMERA_FEEDS } from '@/data/sensors';
import { CameraFeedCard } from './CameraFeedCard';
import { LiDARPointCloud } from './LiDARPointCloud';
import { Lock, Sparkles } from 'lucide-react';

export function SensorFeeds({ className = '' }: { className?: string }) {
  const { isAuthenticated, openAuthModal } = useAuth();

  return (
    <div className={`relative flex flex-col gap-1 w-full overflow-hidden ${className}`}>
      <div className="flex items-center justify-between px-1 text-[8px] font-mono text-[var(--text-muted)] uppercase tracking-wider">
        <span className="flex items-center gap-1">
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              isAuthenticated ? 'bg-[var(--success-green)] animate-pulse' : 'bg-[var(--accent-amber)]'
            }`}
          />
          {isAuthenticated ? 'PERCEPTION FEEDS (4X)' : 'PERCEPTION FEEDS (LOCKED)'}
        </span>
        <span>{isAuthenticated ? '60 HZ BEV' : 'SIGN IN FREE'}</span>
      </div>

      <div className="grid grid-cols-2 gap-1.5 w-full">
        {/* 1. LiDAR Point Cloud */}
        <LiDARPointCloud />

        {/* 2. Front 4K Telephoto */}
        <CameraFeedCard feed={CAMERA_FEEDS[0]} />

        {/* 3. Left Lateral Fisheye */}
        <CameraFeedCard feed={CAMERA_FEEDS[1]} />

        {/* 4. Right Lateral Fisheye */}
        <CameraFeedCard feed={CAMERA_FEEDS[2]} />
      </div>

      {/* Cyber Lock Overlay when Unauthenticated */}
      {!isAuthenticated && (
        <div className="absolute inset-0 z-20 rounded-xl bg-[var(--bg-secondary)]/90 backdrop-blur-[3px] border border-[var(--border-subtle)] flex flex-col items-center justify-center p-3 text-center gap-2 shadow-2xl animate-fadeIn">
          <div className="w-8 h-8 rounded-full border border-[var(--accent-cyan)] bg-[var(--accent-cyan)]/20 flex items-center justify-center shadow-cyan-glow">
            <Lock className="w-4 h-4 text-[var(--accent-cyan)]" />
          </div>

          <div className="flex flex-col gap-0.5">
            <span className="font-mono text-[10px] font-bold text-[var(--text-primary)]">
              Perception Feeds Protected
            </span>
            <span className="font-mono text-[8.5px] text-[var(--text-secondary)] max-w-[200px] leading-tight">
              Sign in or create a free account to inspect 60Hz LiDAR point clouds & multi-camera feeds.
            </span>
          </div>

          <button
            onClick={() =>
              openAuthModal(
                'signin',
                'Sign in or create a free account to unlock live 60Hz LiDAR point clouds & perception cameras.'
              )
            }
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[var(--accent-cyan)]/20 border border-[var(--accent-cyan)]/50 text-[var(--accent-cyan)] font-mono text-[9px] uppercase tracking-wider font-bold hover:bg-[var(--accent-cyan)]/30 hover:shadow-cyan-glow transition-all"
          >
            <Sparkles className="w-3 h-3" />
            <span>Unlock Feeds (Free)</span>
          </button>
        </div>
      )}
    </div>
  );
}
