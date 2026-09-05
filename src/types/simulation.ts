/**
 * RAASTA.AI - Autonomous Vehicle Simulation Types
 */

export type ObstacleType = 'cow' | 'rickshaw' | 'pedestrian' | 'truck' | 'car' | 'pothole';

export interface Obstacle {
  id: string;
  type: ObstacleType;
  label: string;
  x: number; // meters from road origin
  y: number; // lateral offset in meters
  vx: number; // forward velocity m/s
  vy: number; // lateral velocity m/s
  width: number;
  length: number;
  heading: number; // radians
  confidence: number; // 0.0 - 1.0
  ttc: number; // time to collision in seconds
  color: string;
}

export interface VehicleState {
  x: number;
  y: number;
  vx: number;
  vy: number;
  speed: number; // km/h
  speedMs: number; // m/s
  heading: number; // radians
  steeringAngle: number; // degrees (-45 to +45)
  acceleration: number; // m/s^2 (-6 to +4)
  lateralAccel: number; // m/s^2 (-4 to +4)
  brakeLevel: number; // 0 - 100%
  throttleLevel: number; // 0 - 100%
  emergencyStop: boolean;
  targetSpeed: number; // km/h
}

export interface APFParameters {
  kAtt: number; // attractive gain
  kRep: number; // repulsive gain
  rho0: number; // obstacle influence radius (meters)
}

export interface DWAParameters {
  alpha: number; // heading alignment weight
  beta: number;  // obstacle clearance weight
  gamma: number; // forward velocity weight
}

export interface TrajectoryPoint {
  x: number;
  y: number;
  vx: number;
  yaw: number;
  cost?: number;
}

export interface ScenarioDefinition {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  location: string;
  threatProfile: string;
  mitigationStrategy: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  egoSpeedInitial: number;
  roadWidth: number;
  surfaceCondition: string;
  imagePath: string;
  obstacles: Obstacle[];
}

export interface TelemetryData {
  timestamp: number;
  speedKmh: number;
  steeringDeg: number;
  lateralAccelMs2: number;
  ttcSec: number;
  occupancyDensity: number; // 0 - 100%
  gnssAccuracyCm: number;
  canbusState: 'NOMINAL' | 'DEGRADED' | 'E-STOP' | 'RECOVERY';
  fps: number;
}
