'use client';

/**
 * NavDrishti - useSimulationLoop Hook
 * 60Hz RequestAnimationFrame loop executing kinematics, APF forces, and DWA planning.
 */

import { useEffect, useRef } from 'react';
import { useSimulationContext } from '@/context/SimulationContext';
import { computeAPF } from '@/lib/apf-engine';
import { planDWA } from '@/lib/dwa-planner';
import { stepKinematics } from '@/lib/kinematics';
import { generateMockTelemetry } from '@/data/telemetry';

export function useSimulationLoop() {
  const {
    ego,
    setEgo,
    obstacles,
    setObstacles,
    isPlaying,
    playbackSpeed,
    apfParams,
    dwaParams,
    setTrajectory,
    setTelemetry,
    scenario,
  } = useSimulationContext();

  const animFrameIdRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  useEffect(() => {
    if (!isPlaying) {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      return;
    }

    const loop = (timestamp: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const elapsed = (timestamp - lastTimeRef.current) / 1000;
      lastTimeRef.current = timestamp;

      // Cap delta time to prevent tunneling during tab switch
      const dt = Math.min(0.05, Math.max(0.005, elapsed)) * playbackSpeed;

      setEgo((prevEgo) => {
        // Goal waypoint: 80 meters ahead along current lane center
        const goalX = prevEgo.x + 80;
        const goalY = 0; // Centerline

        // 1. APF force and steering target
        const apf = computeAPF(prevEgo, goalX, goalY, obstacles, apfParams, scenario.roadWidth / 2);

        // 2. DWA local trajectory planning
        const dwa = planDWA(prevEgo, goalX, goalY, obstacles, dwaParams, 2.0, 0.2);
        setTrajectory(dwa.projectedTrajectory);

        // 3. Blend APF & DWA steering command
        const blendedSteerDeg = apf.targetSteeringAngle * 0.6 + dwa.bestSteeringDeg * 0.4;
        const targetSpeed = prevEgo.emergencyStop ? 0 : Math.min(prevEgo.targetSpeed, apf.recommendedSpeedKmh);

        // 4. Update kinematics
        const nextEgo = stepKinematics(prevEgo, blendedSteerDeg, targetSpeed, dt);

        // Update telemetry
        setTelemetry(generateMockTelemetry(nextEgo.speed, nextEgo.steeringAngle, nextEgo.emergencyStop));

        return nextEgo;
      });

      // Update dynamic obstacles (translate forward/backward)
      setObstacles((prevObstacles) =>
        prevObstacles.map((obs) => {
          let nextX = obs.x + obs.vx * dt;
          let nextY = obs.y + obs.vy * dt;

          // Wrap obstacles or reverse direction if they go too far
          if (nextX < -50) nextX += 500;
          if (nextX > 600) nextX -= 500;

          return {
            ...obs,
            x: nextX,
            y: nextY,
          };
        })
      );

      animFrameIdRef.current = requestAnimationFrame(loop);
    };

    animFrameIdRef.current = requestAnimationFrame(loop);

    return () => {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, [isPlaying, playbackSpeed, apfParams, dwaParams, obstacles, scenario, setEgo, setObstacles, setTrajectory, setTelemetry]);
}
