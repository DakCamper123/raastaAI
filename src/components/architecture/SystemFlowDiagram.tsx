'use client';

/**
 * NavDrishti - SystemFlowDiagram Component
 * Animated vertical flow diagram connecting the autonomous stack stages with pulsing SVG signals.
 */

import React from 'react';
import { SENSOR_SUITE } from '@/data/sensors';
import { SensorNode } from './SensorNode';
import { FusionEngineBlock } from './FusionEngineBlock';
import { PredictionPipeline } from './PredictionPipeline';
import { MotionControllerBlock } from './MotionControllerBlock';
import { FailSafeCoreBlock } from './FailSafeCoreBlock';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export function SystemFlowDiagram() {
  return (
    <div className="w-full flex flex-col items-center gap-6 py-8">
      {/* Stage 1: Hardware Sensor Array */}
      <ScrollReveal className="w-full">
        <div className="flex flex-col gap-2">
          <span className="font-mono text-xs text-[var(--accent-cyan)] font-bold tracking-widest uppercase">
            STAGE 01 • PERCEPTION SENSOR HARDWARE SUITE
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
            {SENSOR_SUITE.map((sensor) => (
              <SensorNode key={sensor.id} sensor={sensor} />
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* Animated Flow Connector 1 -> 2 */}
      <div className="w-full flex justify-center py-2">
        <svg width="200" height="40" viewBox="0 0 200 40" fill="none" className="overflow-visible">
          <path
            d="M 100 0 L 100 40"
            stroke="var(--accent-cyan)"
            strokeWidth="2"
            strokeDasharray="4 4"
            className="animate-pulse"
          />
          <polygon points="96,35 100,40 104,35" fill="var(--accent-cyan)" />
        </svg>
      </div>

      {/* Stage 2: Sensor Fusion Engine */}
      <ScrollReveal delay={0.1} className="w-full">
        <FusionEngineBlock />
      </ScrollReveal>

      {/* Animated Flow Connector 2 -> 3 */}
      <div className="w-full flex justify-center py-2">
        <svg width="200" height="40" viewBox="0 0 200 40" fill="none">
          <path
            d="M 100 0 L 100 40"
            stroke="var(--accent-amber)"
            strokeWidth="2"
            strokeDasharray="4 4"
            className="animate-pulse"
          />
          <polygon points="96,35 100,40 104,35" fill="var(--accent-amber)" />
        </svg>
      </div>

      {/* Stage 3: Prediction & Intention */}
      <ScrollReveal delay={0.2} className="w-full">
        <PredictionPipeline />
      </ScrollReveal>

      {/* Animated Flow Connector 3 -> 4 */}
      <div className="w-full flex justify-center py-2">
        <svg width="200" height="40" viewBox="0 0 200 40" fill="none">
          <path
            d="M 100 0 L 100 40"
            stroke="var(--accent-cyan)"
            strokeWidth="2"
            strokeDasharray="4 4"
            className="animate-pulse"
          />
          <polygon points="96,35 100,40 104,35" fill="var(--accent-cyan)" />
        </svg>
      </div>

      {/* Stage 4: Motion Controller */}
      <ScrollReveal delay={0.3} className="w-full">
        <MotionControllerBlock />
      </ScrollReveal>

      {/* Animated Flow Connector 4 -> 5 */}
      <div className="w-full flex justify-center py-2">
        <svg width="200" height="40" viewBox="0 0 200 40" fill="none">
          <path
            d="M 100 0 L 100 40"
            stroke="var(--danger-red)"
            strokeWidth="2"
            strokeDasharray="4 4"
            className="animate-pulse"
          />
          <polygon points="96,35 100,40 104,35" fill="var(--danger-red)" />
        </svg>
      </div>

      {/* Stage 5: Drive-by-Wire Fail-Safe */}
      <ScrollReveal delay={0.4} className="w-full">
        <FailSafeCoreBlock />
      </ScrollReveal>
    </div>
  );
}
