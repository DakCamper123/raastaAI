'use client';

/**
 * RAASTA.AI - Simulation Cockpit Page
 * Main cockpit orchestrating the 2D simulator canvas, CAN-bus metrics, sensor feeds, and control panel.
 */

import React, { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useSimulationContext } from '@/context/SimulationContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ScrollableSidebar } from '@/components/layout/ScrollableSidebar';
import { SimulationCanvas } from '@/components/simulation/SimulationCanvas';
import { LiveMetrics } from '@/components/metrics/LiveMetrics';
import { ControlPanel } from '@/components/controls/ControlPanel';
import { SensorFeeds } from '@/components/feeds/SensorFeeds';

function DashboardContent() {
  const searchParams = useSearchParams();
  const { selectScenario } = useSimulationContext();

  // If a scenario query param is present (?scenario=02), pre-load that edge case
  useEffect(() => {
    const scenarioParam = searchParams.get('scenario');
    if (scenarioParam) {
      selectScenario(scenarioParam);
    }
  }, [searchParams, selectScenario]);

  return (
    <DashboardLayout
      sidebar={<ScrollableSidebar />}
      canvas={<SimulationCanvas />}
      metrics={<LiveMetrics />}
      controls={<ControlPanel />}
      feeds={<SensorFeeds />}
    />
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="w-full h-screen flex items-center justify-center font-mono text-xs text-[var(--accent-cyan)]">LOADING SIMULATION COCKPIT...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
