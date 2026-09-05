/**
 * RAASTA.AI - Core Constants and Physics Constraints
 */

export const VEHICLE_CONSTANTS = {
  WHEELBASE_METERS: 2.85, // Passenger Sedan / SUV Wheelbase
  VEHICLE_WIDTH_METERS: 1.95,
  VEHICLE_LENGTH_METERS: 4.75,
  MAX_SPEED_KMH: 120,
  MAX_SPEED_MS: 33.33,
  MAX_ACCEL_MS2: 3.5,
  MAX_DECEL_MS2: 8.5, // E-Brake Deceleration Limit
  MAX_STEERING_DEG: 40,
  MAX_YAW_RATE_RADS: 0.85,
  MIN_TURNING_RADIUS: 5.2,
};

export const SIMULATION_CONSTANTS = {
  CANVAS_LOGICAL_WIDTH: 1200,
  CANVAS_LOGICAL_HEIGHT: 600,
  PIXELS_PER_METER: 12,
  ROAD_WIDTH_METERS: 14,
  LANE_WIDTH_METERS: 3.5,
  CYCLE_HZ: 60,
  DT: 1 / 60,
};

export const DEFAULT_APF_PARAMS = {
  kAtt: 1.2,
  kRep: 250.0,
  rho0: 16.0, // Obstacle influence perimeter in meters
};

export const DEFAULT_DWA_PARAMS = {
  alpha: 0.25, // Heading alignment weight
  beta: 0.45,  // Clearance weight
  gamma: 0.30, // Forward velocity weight
};

export const NH48_GPS_COORDINATES = {
  LATITUDE: 18.52043,
  LONGITUDE: 73.85674,
  ALTITUDE_METERS: 560.2,
  ACCURACY_CM: 1.4,
  CORRIDOR: 'NH-48 Pune-Bengaluru Expressway (KM 42.8)',
};
