'use client';

/**
 * RAASTA.AI - SensorFeeds Component
 * 4-card feed grid showing LiDAR point cloud, 2x camera feeds, and radar heatmap.
 */

import React from 'react';
import { CAMERA_FEEDS } from '@/data/sensors';
import { CameraFeedCard } from './CameraFeedCard';
import { LiDARPointCloud } from './LiDARPointCloud';

export function SensorFeeds({ className = '' }: { className?: string }) {
  return (
    <div className={`flex flex-col gap-1 w-full ${className}`}>
      <div className="flex items-center justify-between px-1 text-[8px] font-mono text-[var(--text-muted)] uppercase tracking-wider">
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--success-green)] animate-pulse" />
          PERCEPTION FEEDS (4X)
        </span>
        <span>60 HZ BEV</span>
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
    </div>
  );
}
