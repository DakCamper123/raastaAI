/**
 * RAASTA.AI - Vehicle Condition & Diagnostic Telematics Data
 * Detailed real-world diagnostic specifications for the BharatNav Autonomous EV Mule.
 */

export interface CarDiagnosticData {
  vehicle: {
    model: string;
    chassisVin: string;
    platform: string;
    odometerKm: number;
    operatingMode: string;
    ecuFirmware: string;
    asilCertification: string;
    lastDiagnosticCycle: string;
  };
  battery: {
    socPercent: number;
    sohPercent: number;
    packVoltage: number;
    currentAmps: number;
    cellDeltaVolts: number;
    avgTempCelsius: number;
    coolingLoopFlowLpm: number;
    estimatedRangeKm: number;
  };
  brakesAndSafety: {
    primaryPressureBar: number;
    secondaryPressureBar: number;
    frontPadWearPercent: number;
    rearPadWearPercent: number;
    reactionLatencyMs: number;
    eBrakeRedundancy: string;
    absStatus: string;
    stabilityControl: string;
  };
  chassisAndTraction: {
    frictionCoefficientMu: number;
    roadSurfaceProfile: string;
    tirePressuresPsi: { fl: number; fr: number; rl: number; rr: number };
    wheelSlipPercent: number;
    epsTorqueNm: number;
    suspensionStrokeMm: number;
  };
  sensorsCalibration: {
    lidarPointsSec: string;
    lidarTransparency: number;
    cameraMtfSharpness: number;
    radarSnrDb: number;
    gnssSatellites: number;
    gnssPrecisionCm: number;
  };
  diagnostics: {
    dtcActiveCount: number;
    dtcCodes: string[];
    canBusLoadPercent: number;
    ethernetThroughputMbps: number;
    safetyRiskScore: number;
    overallHealthIndex: number; // 0-100
  };
}

export const CURRENT_VEHICLE_CONDITION: CarDiagnosticData = {
  vehicle: {
    model: 'BharatNav L4+ Autonomous Test Mule',
    chassisVin: 'IND-MH12-AUTON-2026-X77',
    platform: 'Custom EV Powertrain with ASIL-D Dual-Ring Actuation',
    odometerKm: 14892.4,
    operatingMode: 'AUTONOMOUS_MISSION_RUNNING',
    ecuFirmware: 'v4.18.2-rtk-rel17',
    asilCertification: 'ISO 26262 ASIL-D Aligned',
    lastDiagnosticCycle: '0.016s ago (60 Hz Real-Time Loop)',
  },
  battery: {
    socPercent: 78.4,
    sohPercent: 98.2,
    packVoltage: 394.2,
    currentAmps: 42.6,
    cellDeltaVolts: 0.008,
    avgTempCelsius: 28.4,
    coolingLoopFlowLpm: 3.2,
    estimatedRangeKm: 284,
  },
  brakesAndSafety: {
    primaryPressureBar: 142.5,
    secondaryPressureBar: 142.1,
    frontPadWearPercent: 93.8,
    rearPadWearPercent: 95.2,
    reactionLatencyMs: 11.2,
    eBrakeRedundancy: 'ARMED & ACTIVE (DUAL RING)',
    absStatus: 'STANDBY_OPTIMAL',
    stabilityControl: 'ACTIVE_KINODYNAMIC',
  },
  chassisAndTraction: {
    frictionCoefficientMu: 0.82,
    roadSurfaceProfile: 'Mixed Bitumen & Aggregate (NH-48 Standard)',
    tirePressuresPsi: { fl: 33.2, fr: 33.1, rl: 35.0, rr: 35.1 },
    wheelSlipPercent: 1.4,
    epsTorqueNm: 3.4,
    suspensionStrokeMm: 42,
  },
  sensorsCalibration: {
    lidarPointsSec: '1.42M pts/sec',
    lidarTransparency: 98.2,
    cameraMtfSharpness: 94.6,
    radarSnrDb: 28.4,
    gnssSatellites: 26,
    gnssPrecisionCm: 1.4,
  },
  diagnostics: {
    dtcActiveCount: 0,
    dtcCodes: [],
    canBusLoadPercent: 46.8,
    ethernetThroughputMbps: 240,
    safetyRiskScore: 0.038,
    overallHealthIndex: 98,
  },
};

/**
 * Generates an exportable CSV string of time-series telemetry data.
 */
export function generateTelemetryCSV(): string {
  const headers = [
    'Timestamp',
    'Speed_kmh',
    'Steer_deg',
    'Lat_Accel_ms2',
    'Battery_SoC_pct',
    'Hydraulic_Pressure_bar',
    'Friction_Mu',
    'GNSS_Accuracy_cm',
    'CAN_State',
    'DTC_Faults',
  ];

  const rows = [];
  const baseTime = Date.now() - 60000;
  for (let i = 0; i < 30; i++) {
    const t = new Date(baseTime + i * 2000).toISOString();
    const speed = (41 + Math.sin(i * 0.3) * 3 + Math.random() * 0.5).toFixed(1);
    const steer = (Math.sin(i * 0.2) * 5 + Math.random() * 0.4).toFixed(1);
    const latAccel = (0.2 + Math.abs(Math.sin(i * 0.2)) * 0.4).toFixed(2);
    const soc = (78.4 - i * 0.02).toFixed(2);
    const pressure = (142 + (Math.random() - 0.5) * 1.5).toFixed(1);
    const mu = (0.82 + (Math.random() - 0.5) * 0.02).toFixed(2);
    const gnss = (1.4 + (Math.random() - 0.5) * 0.1).toFixed(1);

    rows.push([t, speed, steer, latAccel, soc, pressure, mu, gnss, 'NOMINAL', '0'].join(','));
  }

  return [headers.join(','), ...rows].join('\n');
}
