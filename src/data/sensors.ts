/**
 * NavDrishti - Sensor Suite Specifications
 */

import { SensorSpecification, CameraFeedInfo } from '@/types/sensors';

export const SENSOR_SUITE: SensorSpecification[] = [
  {
    id: 'lidar-roof',
    name: '128-Beam 360° Solid-State LiDAR',
    type: 'lidar',
    frequency: '20 Hz',
    resolution: '1.4M points/sec',
    fov: '360° Horiz / 40° Vert',
    rangeMeters: 250,
    status: 'ONLINE',
    latencyMs: 8.4,
    description: 'High-density point cloud penetrating dust, exhaust fumes, and monsoon downpours.',
  },
  {
    id: 'cam-surround',
    name: '8x 4K HDR Low-Latency Optical Cameras',
    type: 'camera',
    frequency: '60 Hz',
    resolution: '3840 x 2160 HDR',
    fov: '360° Panoramic Surround',
    rangeMeters: 180,
    status: 'ONLINE',
    latencyMs: 11.2,
    description: 'Automotive Sony IMX sensors feeding real-time BEVFormer bird-eye-view transformer.',
  },
  {
    id: 'radar-4d',
    name: '4D Ultra-Res Millimeter-Wave Imaging Radar',
    type: 'radar',
    frequency: '77-79 GHz (20 Hz)',
    resolution: '512 Virtual Channels',
    fov: '120° Azimuth / 30° Elevation',
    rangeMeters: 300,
    status: 'ONLINE',
    latencyMs: 4.6,
    description: 'Doppler velocity measurement piercing thick fog, dirt particulate, and spray.',
  },
  {
    id: 'gnss-rtk',
    name: 'Dual-Band RTK-GNSS + 6-DOF Tactical IMU',
    type: 'gnss',
    frequency: '100 Hz',
    resolution: '±1.4 cm Accuracy',
    fov: 'Omni Satellite Tracking',
    rangeMeters: 0,
    status: 'ONLINE',
    latencyMs: 2.1,
    description: 'Centimeter-level carrier-phase positioning with dead-reckoning during tunnel loss.',
  },
];

export const CAMERA_FEEDS: CameraFeedInfo[] = [
  {
    id: 'cam-front',
    label: 'Front Primary 4K Telephoto (120°)',
    fov: '120° Wide',
    resolution: '3840x2160',
    fps: 60,
    latencyMs: 9.8,
    detectionsCount: 8,
    imageFallback: '/assets/hero/hero_sensor_hud.jpg',
  },
  {
    id: 'cam-left',
    label: 'Left Lateral Fisheye (180°)',
    fov: '180° Ultra-Wide',
    resolution: '1920x1080',
    fps: 60,
    latencyMs: 10.4,
    detectionsCount: 4,
    imageFallback: '/assets/scenarios/dense_market.jpg',
  },
  {
    id: 'cam-right',
    label: 'Right Lateral Fisheye (180°)',
    fov: '180° Ultra-Wide',
    resolution: '1920x1080',
    fps: 60,
    latencyMs: 10.2,
    detectionsCount: 3,
    imageFallback: '/assets/scenarios/cattle_crossing.jpg',
  },
  {
    id: 'cam-rear',
    label: 'Rear Long-Range Radar & Optical',
    fov: '90° Telephoto',
    resolution: '2560x1440',
    fps: 60,
    latencyMs: 11.0,
    detectionsCount: 2,
    imageFallback: '/assets/scenarios/highway_merge.jpg',
  },
];
