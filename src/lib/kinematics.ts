/**
 * RAASTA.AI - Non-Linear Kinematic Bicycle Model
 * Computes vehicle translation, slip angle (beta), and yaw rate.
 */

import { VEHICLE_CONSTANTS, SIMULATION_CONSTANTS } from './constants';
import { VehicleState } from '@/types/simulation';

/**
 * Updates the vehicle state by one time-step (dt) using the non-linear kinematic bicycle model.
 * 
 * @param state Current vehicle state
 * @param steeringAngleTarget Desired front wheel angle in degrees (-40 to +40)
 * @param targetSpeedKmh Desired target velocity in km/h
 * @param dt Time delta in seconds (typically 1/60s)
 * @returns Updated VehicleState
 */
export function stepKinematics(
  state: VehicleState,
  steeringAngleTarget: number,
  targetSpeedKmh: number,
  dt: number = SIMULATION_CONSTANTS.DT
): VehicleState {
  const L = VEHICLE_CONSTANTS.WHEELBASE_METERS;
  const lr = L / 2; // Assume symmetrical mass distribution center

  // Clamp target steering angle
  const deltaTargetRad = (Math.max(-VEHICLE_CONSTANTS.MAX_STEERING_DEG, 
    Math.min(VEHICLE_CONSTANTS.MAX_STEERING_DEG, steeringAngleTarget)) * Math.PI) / 180;

  // Steering actuator dynamics (finite rate of change, max 30 deg/s)
  const currentDeltaRad = (state.steeringAngle * Math.PI) / 180;
  const maxSteerRateRad = (45 * Math.PI) / 180 * dt;
  const deltaRad = currentDeltaRad + Math.max(-maxSteerRateRad, Math.min(maxSteerRateRad, deltaTargetRad - currentDeltaRad));
  const newSteeringDeg = (deltaRad * 180) / Math.PI;

  // Speed regulation / Acceleration
  const targetSpeedMs = (Math.max(0, targetSpeedKmh) * 1000) / 3600;
  let accel = 0;
  let newSpeedMs = state.speedMs;

  if (state.emergencyStop) {
    // ASIL-D E-Brake clamp
    accel = -VEHICLE_CONSTANTS.MAX_DECEL_MS2;
    newSpeedMs = Math.max(0, state.speedMs + accel * dt);
  } else {
    const speedDiff = targetSpeedMs - state.speedMs;
    if (speedDiff > 0) {
      accel = Math.min(VEHICLE_CONSTANTS.MAX_ACCEL_MS2, speedDiff * 1.5);
    } else {
      accel = Math.max(-VEHICLE_CONSTANTS.MAX_DECEL_MS2 * 0.6, speedDiff * 2.0);
    }
    newSpeedMs = Math.max(0, state.speedMs + accel * dt);
  }

  // Slip angle beta at center of mass
  const beta = Math.atan((lr / L) * Math.tan(deltaRad));

  // State derivatives
  const dx = newSpeedMs * Math.cos(state.heading + beta);
  const dy = newSpeedMs * Math.sin(state.heading + beta);
  const dyaw = (newSpeedMs / L) * Math.cos(beta) * Math.tan(deltaRad);

  // Position and heading update
  const newX = state.x + dx * dt;
  const newY = state.y + dy * dt;
  const newHeading = state.heading + dyaw * dt;

  // Lateral acceleration: a_lat = v^2 * kappa = v * dyaw
  const lateralAccel = newSpeedMs * dyaw;

  return {
    ...state,
    x: newX,
    y: newY,
    vx: dx,
    vy: dy,
    speedMs: newSpeedMs,
    speed: (newSpeedMs * 3600) / 1000,
    heading: newHeading,
    steeringAngle: newSteeringDeg,
    acceleration: accel,
    lateralAccel,
    brakeLevel: state.emergencyStop ? 100 : (accel < 0 ? Math.min(100, Math.abs(accel) * 15) : 0),
    throttleLevel: !state.emergencyStop && accel > 0 ? Math.min(100, accel * 25) : 0,
    targetSpeed: targetSpeedKmh,
  };
}

/**
 * Creates an initial vehicle state
 */
export function createInitialVehicleState(initialSpeedKmh: number = 45): VehicleState {
  return {
    x: 50,
    y: 0,
    vx: (initialSpeedKmh * 1000) / 3600,
    vy: 0,
    speed: initialSpeedKmh,
    speedMs: (initialSpeedKmh * 1000) / 3600,
    heading: 0,
    steeringAngle: 0,
    acceleration: 0,
    lateralAccel: 0,
    brakeLevel: 0,
    throttleLevel: 30,
    emergencyStop: false,
    targetSpeed: initialSpeedKmh,
  };
}
