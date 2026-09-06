'use client';

/**
 * NavDrishti - MemberCard Component
 * Profile card showcasing an autonomous vehicle core researcher/engineer.
 */

import React from 'react';
import { TeamMember } from '@/data/team';
import { GlassCard } from '@/components/ui/GlassCard';

export function MemberCard({ member }: { member: TeamMember }) {
  return (
    <GlassCard
      glow="cyan"
      className="p-6 flex flex-col items-center text-center gap-3.5 font-mono group"
    >
      {/* Avatar Circle with Initials and Glow */}
      <div className="relative w-20 h-20 rounded-full border-2 border-[var(--accent-cyan)] flex items-center justify-center bg-gradient-to-tr from-[var(--bg-tertiary)] to-[var(--accent-cyan)]/20 shadow-cyan-glow group-hover:scale-105 transition-transform duration-300">
        <span className="font-display font-black text-2xl text-[var(--accent-cyan)]">
          {member.initials}
        </span>
        <span className="absolute -bottom-1 -right-1 text-lg">
          {member.icon}
        </span>
      </div>

      {/* Name and Role Badge */}
      <div className="flex flex-col items-center gap-1">
        <h3 className="font-display font-bold text-xl text-[var(--text-primary)] group-hover:text-[var(--accent-cyan)] transition-colors">
          {member.name}
        </h3>
        <span className="px-2.5 py-0.5 rounded-full border border-[var(--accent-cyan)]/40 bg-[var(--accent-cyan)]/15 text-[var(--accent-cyan)] text-xs font-bold uppercase tracking-wider">
          {member.role}
        </span>
      </div>

      {/* Sub-tag / Focus Area */}
      <p className="text-xs text-[var(--text-secondary)] font-body leading-relaxed max-w-xs">
        {member.focusArea}
      </p>

      {/* Badges List */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 pt-2 border-t border-[var(--border-subtle)] w-full">
        {member.badges.map((badge, idx) => (
          <span
            key={idx}
            className="px-2 py-0.5 rounded bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-[10px] text-[var(--text-muted)] font-mono"
          >
            {badge}
          </span>
        ))}
      </div>
    </GlassCard>
  );
}
