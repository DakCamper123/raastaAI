/**
 * RAASTA.AI - Real-Time Telemetry and C-V2X Packet Generators
 */

import { TelemetryData } from '@/types/simulation';
import { CV2XEmergencyPacket } from '@/types/emergency';
import { NH48_GPS_COORDINATES } from '@/lib/constants';

let packetSequence = 1000;

/**
 * Generates synthetic telemetry readings with realistic vehicle dynamics noise.
 */
export function generateMockTelemetry(
  baseSpeedKmh: number = 42,
  baseSteeringDeg: number = 0,
  isEmergencyStop: boolean = false
): TelemetryData {
  const noiseSpeed = (Math.random() - 0.5) * 1.8;
  const noiseSteer = (Math.random() - 0.5) * 2.2;
  const noiseAccel = (Math.random() - 0.5) * 0.4;

  const currentSpeed = isEmergencyStop ? 0 : Math.max(0, baseSpeedKmh + noiseSpeed);
  const currentSteer = baseSteeringDeg + noiseSteer;
  const lateralAccel = ((currentSpeed / 3.6) * (currentSteer * Math.PI / 180) * 0.3) + noiseAccel;

  return {
    timestamp: Date.now(),
    speedKmh: Number(currentSpeed.toFixed(1)),
    steeringDeg: Number(currentSteer.toFixed(1)),
    lateralAccelMs2: Number(lateralAccel.toFixed(2)),
    ttcSec: isEmergencyStop ? 99.9 : Number((Math.max(1.2, 4.2 + (Math.random() - 0.5) * 0.8)).toFixed(1)),
    occupancyDensity: Number((42 + Math.random() * 16).toFixed(0)),
    gnssAccuracyCm: Number((NH48_GPS_COORDINATES.ACCURACY_CM + (Math.random() - 0.5) * 0.2).toFixed(1)),
    canbusState: isEmergencyStop ? 'E-STOP' : 'NOMINAL',
    fps: 60,
  };
}

/**
 * Generates a mock 3GPP Release 17 URLLC C-V2X Emergency Packet.
 */
export function generateCV2XPacket(speedKmh: number = 0): CV2XEmergencyPacket {
  packetSequence++;
  const date = new Date();
  const timestamp = date.toISOString().replace('T', ' ').substring(0, 23) + ' IST';

  return {
    id: `PKT-${packetSequence}`,
    timestamp,
    packetSeq: packetSequence,
    stationId: 'RAASTA-AV-IND-MH12-9981',
    priorityLevel: 'URLLC_CRITICAL_0',
    band: '5G NR Band n78 (3.5 GHz)',
    latitude: NH48_GPS_COORDINATES.LATITUDE + (Math.random() - 0.5) * 0.00008,
    longitude: NH48_GPS_COORDINATES.LONGITUDE + (Math.random() - 0.5) * 0.00008,
    altitudeMeters: NH48_GPS_COORDINATES.ALTITUDE_METERS + (Math.random() - 0.5) * 0.1,
    speedKmh,
    brakeDecelMs2: 8.5,
    hazardType: 'HARDWARE_E_STOP_VEHICLE_INTERVENTION',
    crcStatus: 'VALID',
  };
}
