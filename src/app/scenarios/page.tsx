'use client';

/**
 * RAASTA.AI - The 5 Indian Road Edge Scenarios Page
 */

import React from 'react';
import { SCENARIOS } from '@/data/scenarios';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ScenarioTable } from '@/components/scenarios/ScenarioTable';
import { ScenarioCard } from '@/components/scenarios/ScenarioCard';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export default function ScenariosPage() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col gap-12">
      {/* Heading */}
      <ScrollReveal>
        <SectionHeading
          tag="BENCHMARK EDGE MATRIX"
          title="The 5 Indian Road Edge Scenarios"
          description="A curated dataset of extreme, unstructured edge cases that defeat Western autonomous driving models—from un-signaled five-way junctions to bovine incursions and monsoon drop-offs."
        />
      </ScrollReveal>

      {/* 1. Comparison Data Table */}
      <ScrollReveal delay={0.1}>
        <div className="flex flex-col gap-3">
          <span className="font-mono text-xs text-[var(--accent-cyan)] font-bold uppercase tracking-wider">
            SCENARIO DATASET MATRIX &amp; MITIGATION PROTOCOLS
          </span>
          <ScenarioTable />
        </div>
      </ScrollReveal>

      {/* 2. Masonry Grid of Scenario Cards */}
      <div className="flex flex-col gap-4 mt-6">
        <span className="font-mono text-xs text-[var(--accent-amber)] font-bold uppercase tracking-wider">
          CORRIDOR INSPECTOR CARDS
        </span>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SCENARIOS.map((sc, idx) => (
            <ScrollReveal key={sc.id} delay={idx * 0.08}>
              <ScenarioCard scenario={sc} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
