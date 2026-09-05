'use client';

/**
 * RAASTA.AI - System Architecture & Mathematical Foundation Page
 */

import React from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SystemFlowDiagram } from '@/components/architecture/SystemFlowDiagram';
import { MathExplainer } from '@/components/math/MathExplainer';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export default function ArchitecturePage() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col gap-12">
      {/* Top Heading */}
      <ScrollReveal>
        <SectionHeading
          tag="FULL VERTICAL STACK"
          title="System Architecture & Dataflow Pipeline"
          description="From multi-modal raw sensor acquisition to 60Hz BEVFormer fusion, biological pose estimation, APF kinodynamic planning, and ASIL-D hydraulic brake clamping."
        />
      </ScrollReveal>

      {/* 1. Animated Vertical Flow Architecture Pipeline */}
      <SystemFlowDiagram />

      {/* 2. Mathematical Foundation & KaTeX Interactive Sliders */}
      <MathExplainer />
    </div>
  );
}
