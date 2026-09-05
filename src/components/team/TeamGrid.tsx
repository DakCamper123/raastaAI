'use client';

/**
 * RAASTA.AI - TeamGrid Component
 * Responsive team grid displaying all 6 core members with Framer Motion entrance stagger.
 */

import React from 'react';
import { TEAM_MEMBERS } from '@/data/team';
import { MemberCard } from './MemberCard';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export function TeamGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      {TEAM_MEMBERS.map((member, idx) => (
        <ScrollReveal key={member.id} delay={idx * 0.08}>
          <MemberCard member={member} />
        </ScrollReveal>
      ))}
    </div>
  );
}
