'use client';

/**
 * NavDrishti - useSensorData Hook
 * Real-time telemetry feed hook providing live vehicle and sensor metrics.
 */

import { useSimulationContext } from '@/context/SimulationContext';
import { TelemetryData } from '@/types/simulation';

export function useSensorData(): TelemetryData {
  const { telemetry } = useSimulationContext();
  return telemetry;
}
