'use client';

/**
 * RAASTA.AI - useSOSProtocol Hook
 * Binds Emergency SOS state machine with simulator E-Brake actuation.
 */

import { useSOSContext } from '@/context/SOSContext';
import { useSimulationContext } from '@/context/SimulationContext';
import { useCallback } from 'react';

export function useSOSProtocol() {
  const sos = useSOSContext();
  const sim = useSimulationContext();

  const triggerEmergency = useCallback(() => {
    sim.triggerEStop();
    sos.openModal();
  }, [sim, sos]);

  const cancelEmergency = useCallback(() => {
    sos.abortCountdown();
    sim.clearEStop();
  }, [sim, sos]);

  const returnToSimulation = useCallback(() => {
    sos.closeModal();
    sim.clearEStop();
  }, [sim, sos]);

  return {
    ...sos,
    triggerEmergency,
    cancelEmergency,
    returnToSimulation,
  };
}
