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
    <div className={`grid grid-cols-1 sm:grid-cols-2 gap-3 w-full ${className}`}>
      {/* 1. LiDAR Point Cloud */}
      <LiDARPointCloud />

      {/* 2. Front 4K Telephoto */}
      <CameraFeedCard feed={CAMERA_FEEDS[0]} />

      {/* 3. Left Lateral Fisheye */}
      <CameraFeedCard feed={CAMERA_FEEDS[1]} />

      {/* 4. Right Lateral Fisheye */}
      <CameraFeedCard feed={CAMERA_FEEDS[2]} />
    </div>
  );
}
