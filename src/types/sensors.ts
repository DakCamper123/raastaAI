/**
 * RAASTA.AI - Sensor Suite and Point Cloud Types
 */

export type SensorModal = 'lidar' | 'camera' | 'radar' | 'gnss';

export interface SensorSpecification {
  id: string;
  name: string;
  type: SensorModal;
  frequency: string;
  resolution: string;
  fov: string;
  rangeMeters: number;
  status: 'ONLINE' | 'STANDBY' | 'CALIBRATING';
  latencyMs: number;
  description: string;
}

export interface LiDARPoint {
  x: number;
  y: number;
  z: number;
  intensity: number;
  range: number;
}

export interface CameraFeedInfo {
  id: string;
  label: string;
  fov: string;
  resolution: string;
  fps: number;
  latencyMs: number;
  detectionsCount: number;
  imageFallback: string;
}
