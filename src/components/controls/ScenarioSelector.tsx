'use client';

/**
 * NavDrishti - ScenarioSelector Component
 * Quick picker dropdown for the 5 Indian edge scenarios.
 */

import React from 'react';
import { useSimulationContext } from '@/context/SimulationContext';
import { SCENARIOS } from '@/data/scenarios';
import { Layers } from 'lucide-react';

export function ScenarioSelector() {
  const { scenario, selectScenario } = useSimulationContext();

  return (
    <div className="flex flex-col gap-1.5 font-mono text-xs w-full">
      <label htmlFor="scenario-select" className="flex items-center gap-1.5 text-[var(--text-secondary)]">
        <Layers className="w-3.5 h-3.5 text-[var(--accent-cyan)]" />
        ACTIVE EDGE SCENARIO
      </label>

      <select
        id="scenario-select"
        value={scenario.id}
        onChange={(e) => selectScenario(e.target.value)}
        className="w-full p-2.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-secondary)] text-[var(--text-primary)] font-bold text-xs focus:outline-none focus:border-[var(--accent-cyan)] focus:ring-1 focus:ring-[var(--accent-cyan)] cursor-pointer"
      >
        {SCENARIOS.map((sc) => (
          <option key={sc.id} value={sc.id} className="bg-[var(--bg-secondary)] text-[var(--text-primary)]">
            {sc.code}: {sc.title}
          </option>
        ))}
      </select>
    </div>
  );
}
