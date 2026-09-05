'use client';

/**
 * RAASTA.AI - ScenarioCard Component
 * Individual edge case card with perception thumbnail, threat profile, and direct simulation launcher.
 */

import React from 'react';
import Link from 'next/link';
import { ScenarioDefinition } from '@/types/simulation';
import { GlassCard } from '@/components/ui/GlassCard';
import { GlowButton } from '@/components/ui/GlowButton';
import { MapPin, Play, ShieldAlert } from 'lucide-react';

export function ScenarioCard({ scenario }: { scenario: ScenarioDefinition }) {
  const isCritical = scenario.severity === 'CRITICAL';

  return (
    <GlassCard glow={isCritical ? 'danger' : 'amber'} className="overflow-hidden flex flex-col justify-between">
      {/* Thumbnail Illustration */}
      <div className="relative aspect-video w-full overflow-hidden border-b border-[var(--border-subtle)] bg-black">
        <img
          src={scenario.imagePath}
          alt={scenario.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        {/* Severity Badge */}
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-md border border-[var(--border-subtle)] font-mono text-[10px] font-bold">
          <ShieldAlert className={`w-3.5 h-3.5 ${isCritical ? 'text-[var(--danger-red)] animate-pulse' : 'text-[var(--accent-amber)]'}`} />
          <span className={isCritical ? 'text-[var(--danger-red)]' : 'text-[var(--accent-amber)]'}>
            {scenario.severity} RISK
          </span>
        </div>
        <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 font-mono text-[10px] text-[var(--accent-cyan)]">
          {scenario.code}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex flex-col gap-3 flex-1 justify-between">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1 text-[var(--text-muted)] font-mono text-xs">
            <MapPin className="w-3.5 h-3.5 text-[var(--accent-cyan)] shrink-0" />
            <span className="truncate">{scenario.location}</span>
          </div>

          <h3 className="font-display font-bold text-lg text-[var(--text-primary)]">
            {scenario.title}
          </h3>

          <p className="text-xs text-[var(--text-secondary)] font-body line-clamp-2">
            {scenario.subtitle}
          </p>

          <div className="p-2.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-secondary)] text-[11px] font-mono flex flex-col gap-1 mt-1">
            <span className="text-[var(--text-muted)] text-[9px] uppercase tracking-wider font-bold">
              Mitigation Protocol:
            </span>
            <span className="text-[var(--text-primary)] leading-relaxed">
              {scenario.mitigationStrategy}
            </span>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between">
          <span className="font-mono text-xs text-[var(--text-muted)]">
            EGO SPEED: <strong>{scenario.egoSpeedInitial} KM/H</strong>
          </span>
          <Link href={`/dashboard?scenario=${scenario.id}`}>
            <GlowButton variant="cyan" size="sm" icon={<Play className="w-3.5 h-3.5 fill-current" />}>
              Simulate
            </GlowButton>
          </Link>
        </div>
      </div>
    </GlassCard>
  );
}
