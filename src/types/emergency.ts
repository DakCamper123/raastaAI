/**
 * RAASTA.AI - Emergency SOS & Fail-Safe Protocol Types
 */

export type SOSStatus = 'IDLE' | 'COUNTDOWN' | 'DISPATCHED' | 'ABORTED' | 'STANDBY';

export interface CV2XEmergencyPacket {
  id: string;
  timestamp: string;
  packetSeq: number;
  stationId: string;
  priorityLevel: 'URLLC_CRITICAL_0' | 'URLLC_HIGH_1';
  band: string;
  latitude: number;
  longitude: number;
  altitudeMeters: number;
  speedKmh: number;
  brakeDecelMs2: number;
  hazardType: string;
  crcStatus: 'VALID' | 'CORRUPT';
}

export interface SOSState {
  status: SOSStatus;
  countdownSeconds: number;
  isSirenActive: boolean;
  isVoiceActive: boolean;
  lastDispatchedAt: string | null;
  packetsLog: CV2XEmergencyPacket[];
  coordinates: {
    lat: number;
    lng: number;
    accuracyCm: number;
    locationName: string;
  };
}
