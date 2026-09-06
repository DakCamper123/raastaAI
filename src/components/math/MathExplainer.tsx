'use client';

/**
 * NavDrishti - MathExplainer Component
 * Interactive technical breakdown of APF + DWA kinematic synthesis.
 */

import React from 'react';
import { APFFormulaRenderer } from './APFFormulaRenderer';
import { DWAObjectiveRenderer } from './DWAObjectiveRenderer';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function MathExplainer() {
  return (
    <div className="w-full flex flex-col gap-8 py-8">
      <SectionHeading
        tag="MATHEMATICAL FOUNDATION"
        title="Kinodynamic Energy Surfaces & Velocity Optimization"
        description="NavDrishti operates on a dual-layer mathematical engine running synchronously at 60 Hz: continuous potential field gradient descent hybridized with discrete reachable velocity search."
      />

      <ScrollReveal>
        <APFFormulaRenderer />
      </ScrollReveal>

      <ScrollReveal delay={0.15}>
        <DWAObjectiveRenderer />
      </ScrollReveal>
    </div>
  );
}
