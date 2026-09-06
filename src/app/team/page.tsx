'use client';

/**
 * NavDrishti - Autonomous Navigation Core Team Page
 */

import React from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TeamGrid } from '@/components/team/TeamGrid';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export default function TeamPage() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col gap-10">
      {/* Heading */}
      <ScrollReveal>
        <SectionHeading
          tag="AUTONOMOUS SYSTEMS LABORATORY"
          title="Autonomous Navigation Core Team"
          description="Building the future of autonomous driving through advanced simulation and safety tech for complex road networks."
        />
      </ScrollReveal>

      {/* Team Profiles Grid */}
      <TeamGrid />
    </div>
  );
}
