/**
 * RAASTA.AI - Dynamic Window Approach (DWA) Local Planner
 * Searches reachable velocity space (v, w) and optimizes trajectory score.
 */

import { DWAParameters, Obstacle, TrajectoryPoint, VehicleState } from '@/types/simulation';
import { VEHICLE_CONSTANTS } from './constants';

export interface DWAResult {
  bestV: number; // Selected forward velocity (m/s)
  bestOmega: number; // Selected yaw rate (rad/s)
  bestSteeringDeg: number;
  bestScore: number;
  projectedTrajectory: TrajectoryPoint[];
  allCandidatesCount: number;
}

/**
 * Executes a single DWA planning step.
 */
export function planDWA(
  ego: VehicleState,
  goalX: number,
  goalY: number,
  obstacles: Obstacle[],
  params: DWAParameters,
  timeHorizon: number = 2.0,
  dt: number = 0.2
): DWAResult {
  const { alpha, beta, gamma } = params;

  // 1. Determine Dynamic Window based on current speed and acceleration limits
  const vMin = Math.max(0, ego.speedMs - VEHICLE_CONSTANTS.MAX_DECEL_MS2 * 0.4);
  const vMax = Math.min((ego.targetSpeed * 1000) / 3600, ego.speedMs + VEHICLE_CONSTANTS.MAX_ACCEL_MS2 * 0.4);

  const currentOmega = (ego.vx !== 0) ? (ego.lateralAccel / ego.speedMs) : 0;
  const maxOmegaChange = VEHICLE_CONSTANTS.MAX_YAW_RATE_RADS * 0.5;
  const omegaMin = Math.max(-VEHICLE_CONSTANTS.MAX_YAW_RATE_RADS, currentOmega - maxOmegaChange);
  const omegaMax = Math.min(VEHICLE_CONSTANTS.MAX_YAW_RATE_RADS, currentOmega + maxOmegaChange);

  // Discrete search resolution
  const vSamples = 7;
  const omegaSamples = 11;
  const vStep = (vMax - vMin) / (vSamples - 1 || 1);
  const omegaStep = (omegaMax - omegaMin) / (omegaSamples - 1 || 1);

  let bestScore = -Infinity;
  let bestV = ego.speedMs;
  let bestOmega = 0;
  let bestTrajectory: TrajectoryPoint[] = [];
  let candidateCount = 0;

  for (let i = 0; i < vSamples; i++) {
    const vCandidate = vMin + i * vStep;

    for (let j = 0; j < omegaSamples; j++) {
      const omegaCandidate = omegaMin + j * omegaStep;
      candidateCount++;

      // Simulate trajectory rollout
      const traj: TrajectoryPoint[] = [];
      let simX = ego.x;
      let simY = ego.y;
      let simYaw = ego.heading;
      let minObsDist = Infinity;
      let collision = false;

      const steps = Math.floor(timeHorizon / dt);
      for (let s = 1; s <= steps; s++) {
        simX += vCandidate * Math.cos(simYaw) * dt;
        simY += vCandidate * Math.sin(simYaw) * dt;
        simYaw += omegaCandidate * dt;

        traj.push({ x: simX, y: simY, vx: vCandidate, yaw: simYaw });

        // Check distance to all obstacles
        for (const obs of obstacles) {
          const dist = Math.hypot(simX - obs.x, simY - obs.y);
          const clearance = dist - (obs.width / 2 + VEHICLE_CONSTANTS.VEHICLE_WIDTH_METERS / 2);
          if (clearance < minObsDist) minObsDist = clearance;
          if (clearance <= 0.2) {
            collision = true;
            break;
          }
        }
        if (collision) break;
      }

      if (collision) continue;

      // 1. Heading score: alignment between end of trajectory and goal
      const endPt = traj[traj.length - 1] || { x: ego.x, y: ego.y, yaw: ego.heading };
      const angleToGoal = Math.atan2(goalY - endPt.y, goalX - endPt.x);
      const headingDiff = Math.abs(angleToGoal - endPt.yaw);
      const headingScore = Math.PI - Math.min(Math.PI, headingDiff);

      // 2. Clearance score (normalized up to 10m)
      const clearanceScore = Math.min(10.0, Math.max(0, minObsDist));

      // 3. Velocity score (prefers maintaining nominal speed)
      const velocityScore = vCandidate;

      // Weighted multi-objective sum
      const score = alpha * (headingScore / Math.PI) + beta * (clearanceScore / 10.0) + gamma * (velocityScore / VEHICLE_CONSTANTS.MAX_SPEED_MS);

      if (score > bestScore) {
        bestScore = score;
        bestV = vCandidate;
        bestOmega = omegaCandidate;
        bestTrajectory = traj;
      }
    }
  }

  // Fallback if all collided: slow down and steer away
  if (bestTrajectory.length === 0) {
    bestV = Math.max(0, ego.speedMs - 3.0);
    bestOmega = 0;
  }

  // Convert yaw rate to equivalent front-wheel steering angle
  // omega = (v / L) * tan(delta) => delta = atan( (omega * L) / v )
  const effectiveV = Math.max(2.0, bestV);
  const bestSteerRad = Math.atan((bestOmega * VEHICLE_CONSTANTS.WHEELBASE_METERS) / effectiveV);
  const bestSteeringDeg = Math.max(-VEHICLE_CONSTANTS.MAX_STEERING_DEG, 
    Math.min(VEHICLE_CONSTANTS.MAX_STEERING_DEG, (bestSteerRad * 180) / Math.PI));

  return {
    bestV,
    bestOmega,
    bestSteeringDeg,
    bestScore: bestScore === -Infinity ? 0 : bestScore,
    projectedTrajectory: bestTrajectory,
    allCandidatesCount: candidateCount,
  };
}
