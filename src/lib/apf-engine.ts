/**
 * RAASTA.AI - Kinodynamic Artificial Potential Field (APF) Engine
 * Calculates attractive goal gradient and repulsive obstacle potential vectors.
 */

import { APFParameters, Obstacle, VehicleState } from '@/types/simulation';
import { VEHICLE_CONSTANTS } from './constants';

export interface APFResult {
  uTotal: number;
  uAtt: number;
  uRep: number;
  forceX: number; // Combined forward/longitudinal force
  forceY: number; // Combined lateral force (drives steering)
  targetSteeringAngle: number; // Recommended steering angle in degrees
  recommendedSpeedKmh: number;
}

/**
 * Computes APF potential and force vectors for the ego vehicle relative to a goal waypoint and obstacle swarm.
 */
export function computeAPF(
  ego: VehicleState,
  goalX: number,
  goalY: number,
  obstacles: Obstacle[],
  params: APFParameters,
  roadHalfWidth: number = 7.0
): APFResult {
  const { kAtt, kRep, rho0 } = params;

  // 1. Attractive Potential & Force
  const dxGoal = goalX - ego.x;
  const dyGoal = goalY - ego.y;
  const distGoal = Math.sqrt(dxGoal * dxGoal + dyGoal * dyGoal);

  // U_att = 0.5 * k_att * distGoal^2
  const uAtt = 0.5 * kAtt * (distGoal * distGoal);

  // F_att is directed toward the goal
  const fAttX = kAtt * dxGoal;
  const fAttY = kAtt * dyGoal;

  // 2. Repulsive Potential & Force from Obstacles
  let uRepTotal = 0;
  let fRepXTotal = 0;
  let fRepYTotal = 0;

  const vRatio = Math.max(0.2, ego.speedMs / VEHICLE_CONSTANTS.MAX_SPEED_MS);

  for (const obs of obstacles) {
    const dx = ego.x - obs.x;
    const dy = ego.y - obs.y;
    // Effective Euclidean distance from vehicle perimeter to obstacle
    const centerDist = Math.sqrt(dx * dx + dy * dy);
    const effectiveDist = Math.max(0.1, centerDist - (obs.width / 2 + VEHICLE_CONSTANTS.VEHICLE_WIDTH_METERS / 2));

    if (effectiveDist < rho0) {
      // U_rep = 0.5 * k_rep * (1/rho - 1/rho0)^2 * (v_ego / v_max)
      const diff = 1 / effectiveDist - 1 / rho0;
      const uRep = 0.5 * kRep * (diff * diff) * vRatio;
      uRepTotal += uRep;

      // Force magnitude
      const fMag = kRep * diff * (1 / (effectiveDist * effectiveDist)) * vRatio;
      // Unit vector pushing ego AWAY from obstacle
      const ux = dx / (centerDist || 1);
      const uy = dy / (centerDist || 1);

      fRepXTotal += fMag * ux;
      fRepYTotal += fMag * uy;
    }
  }

  // 3. Road Boundary Repulsive Field (keeps vehicle inside pavement)
  const distToLeftEdge = roadHalfWidth - ego.y;
  const distToRightEdge = roadHalfWidth + ego.y;
  const edgeMargin = 2.0;

  if (distToLeftEdge < edgeMargin) {
    const d = Math.max(0.1, distToLeftEdge);
    const fEdge = kRep * 0.4 * (1 / d - 1 / edgeMargin) * (1 / (d * d));
    fRepYTotal -= fEdge; // Push right / downward
  }
  if (distToRightEdge < edgeMargin) {
    const d = Math.max(0.1, distToRightEdge);
    const fEdge = kRep * 0.4 * (1 / d - 1 / edgeMargin) * (1 / (d * d));
    fRepYTotal += fEdge; // Push left / upward
  }

  // 4. Combined Forces
  const totalForceX = fAttX + fRepXTotal;
  const totalForceY = fAttY + fRepYTotal;
  const uTotal = uAtt + uRepTotal;

  // 5. Convert Lateral Force into Recommended Steering Angle
  // Heading error relative to force vector
  const desiredAngleRad = Math.atan2(totalForceY, Math.max(5.0, totalForceX));
  const angleErrorRad = desiredAngleRad - ego.heading;

  // Steering conversion with P-gain
  const rawSteerDeg = (angleErrorRad * 180) / Math.PI * 1.6;
  const targetSteeringAngle = Math.max(-VEHICLE_CONSTANTS.MAX_STEERING_DEG, 
    Math.min(VEHICLE_CONSTANTS.MAX_STEERING_DEG, rawSteerDeg));

  // Speed scaling: decelerate if repulsive field is intense
  let speedFactor = 1.0;
  if (uRepTotal > 50) {
    speedFactor = Math.max(0.2, 1.0 - (uRepTotal / 400));
  }
  const recommendedSpeedKmh = ego.targetSpeed * speedFactor;

  return {
    uTotal,
    uAtt,
    uRep: uRepTotal,
    forceX: totalForceX,
    forceY: totalForceY,
    targetSteeringAngle,
    recommendedSpeedKmh,
  };
}

/**
 * Generates a 2D scalar potential grid slice for visualization.
 */
export function generatePotentialGrid(
  obstacles: Obstacle[],
  params: APFParameters,
  gridWidth: number = 30,
  gridHeight: number = 20,
  scale: number = 1.5
): number[][] {
  const grid: number[][] = [];
  const { kRep, rho0 } = params;

  for (let r = 0; r < gridHeight; r++) {
    const row: number[] = [];
    const y = (r - gridHeight / 2) * scale;

    for (let c = 0; c < gridWidth; c++) {
      const x = (c - gridWidth / 2) * scale;
      let val = 0;

      for (const obs of obstacles) {
        const dx = x - obs.x;
        const dy = y - obs.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < rho0 && dist > 0.1) {
          const diff = 1 / dist - 1 / rho0;
          val += 0.5 * kRep * (diff * diff);
        }
      }
      row.push(Math.min(100, val));
    }
    grid.push(row);
  }

  return grid;
}
