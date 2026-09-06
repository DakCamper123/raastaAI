'use client';

/**
 * NavDrishti - Simulation Context
 * Central orchestrator for vehicle kinematics, APF, DWA, obstacles, and telemetry.
 */

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import {
  VehicleState,
  Obstacle,
  ScenarioDefinition,
  APFParameters,
  DWAParameters,
  TrajectoryPoint,
  TelemetryData,
} from '@/types/simulation';
import { SCENARIOS } from '@/data/scenarios';
import { DEFAULT_APF_PARAMS, DEFAULT_DWA_PARAMS } from '@/lib/constants';
import { createInitialVehicleState } from '@/lib/kinematics';
import { generateMockTelemetry } from '@/data/telemetry';
import { fetchUserSettings, saveUserSettings } from '@/lib/analysisHistory';

interface SimulationContextValue {
  scenario: ScenarioDefinition;
  selectScenario: (id: string) => void;
  ego: VehicleState;
  setEgo: React.Dispatch<React.SetStateAction<VehicleState>>;
  obstacles: Obstacle[];
  setObstacles: React.Dispatch<React.SetStateAction<Obstacle[]>>;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  togglePlay: () => void;
  resetSimulation: () => void;
  playbackSpeed: number;
  setPlaybackSpeed: (speed: number) => void;
  apfParams: APFParameters;
  setApfParams: React.Dispatch<React.SetStateAction<APFParameters>>;
  dwaParams: DWAParameters;
  setDwaParams: React.Dispatch<React.SetStateAction<DWAParameters>>;
  trajectory: TrajectoryPoint[];
  setTrajectory: (traj: TrajectoryPoint[]) => void;
  telemetry: TelemetryData;
  setTelemetry: React.Dispatch<React.SetStateAction<TelemetryData>>;
  triggerEStop: () => void;
  clearEStop: () => void;
}

const SimulationContext = createContext<SimulationContextValue | undefined>(undefined);

export function SimulationProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [scenario, setScenario] = useState<ScenarioDefinition>(SCENARIOS[0]);
  const [ego, setEgo] = useState<VehicleState>(() => createInitialVehicleState(SCENARIOS[0].egoSpeedInitial));
  const [obstacles, setObstacles] = useState<Obstacle[]>(() => JSON.parse(JSON.stringify(SCENARIOS[0].obstacles)));
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [apfParams, setApfParams] = useState<APFParameters>(DEFAULT_APF_PARAMS);
  const [dwaParams, setDwaParams] = useState<DWAParameters>(DEFAULT_DWA_PARAMS);
  const [trajectory, setTrajectory] = useState<TrajectoryPoint[]>([]);
  const [telemetry, setTelemetry] = useState<TelemetryData>(() =>
    generateMockTelemetry(SCENARIOS[0].egoSpeedInitial, 0, false)
  );
  const [hasLoadedSettings, setHasLoadedSettings] = useState(false);

  // Load previous user settings on startup or auth change
  useEffect(() => {
    fetchUserSettings(user?.id).then((saved) => {
      if (saved) {
        setApfParams((prev) => ({
          ...prev,
          kAtt: saved.kAtt ?? prev.kAtt,
          kRep: saved.kRep ?? prev.kRep,
        }));
        if (saved.speedWarp) {
          setPlaybackSpeed(saved.speedWarp);
        }
      }
      setHasLoadedSettings(true);
    });
  }, [user?.id]);

  // Persist modified settings to Supabase and localStorage
  useEffect(() => {
    if (!hasLoadedSettings) return;
    const timeout = setTimeout(() => {
      saveUserSettings(
        {
          kAtt: apfParams.kAtt,
          kRep: apfParams.kRep,
          speedWarp: playbackSpeed,
        },
        user?.id
      );
    }, 500);
    return () => clearTimeout(timeout);
  }, [apfParams.kAtt, apfParams.kRep, playbackSpeed, user?.id, hasLoadedSettings]);

  const selectScenario = useCallback((id: string) => {
    const found = SCENARIOS.find((s) => s.id === id) || SCENARIOS[0];
    setScenario(found);
    setObstacles(JSON.parse(JSON.stringify(found.obstacles)));
    setEgo(createInitialVehicleState(found.egoSpeedInitial));
    setTrajectory([]);
    setTelemetry(generateMockTelemetry(found.egoSpeedInitial, 0, false));
  }, []);

  const resetSimulation = useCallback(() => {
    setObstacles(JSON.parse(JSON.stringify(scenario.obstacles)));
    setEgo(createInitialVehicleState(scenario.egoSpeedInitial));
    setTrajectory([]);
    setTelemetry(generateMockTelemetry(scenario.egoSpeedInitial, 0, false));
    setIsPlaying(true);
  }, [scenario]);

  const togglePlay = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  const triggerEStop = useCallback(() => {
    setEgo((prev) => ({
      ...prev,
      emergencyStop: true,
      brakeLevel: 100,
      throttleLevel: 0,
      targetSpeed: 0,
    }));
  }, []);

  const clearEStop = useCallback(() => {
    setEgo((prev) => ({
      ...prev,
      emergencyStop: false,
      brakeLevel: 0,
      targetSpeed: scenario.egoSpeedInitial,
    }));
  }, [scenario.egoSpeedInitial]);

  return (
    <SimulationContext.Provider
      value={{
        scenario,
        selectScenario,
        ego,
        setEgo,
        obstacles,
        setObstacles,
        isPlaying,
        setIsPlaying,
        togglePlay,
        resetSimulation,
        playbackSpeed,
        setPlaybackSpeed,
        apfParams,
        setApfParams,
        dwaParams,
        setDwaParams,
        trajectory,
        setTrajectory,
        telemetry,
        setTelemetry,
        triggerEStop,
        clearEStop,
      }}
    >
      {children}
    </SimulationContext.Provider>
  );
}

export function useSimulationContext() {
  const ctx = useContext(SimulationContext);
  if (!ctx) {
    throw new Error('useSimulationContext must be used within SimulationProvider');
  }
  return ctx;
}
