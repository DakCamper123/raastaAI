'use client';

/**
 * NavDrishti - PhilosophyHero Component
 * Full-viewport cinematic hero with RoadParticleField, AnimatedTagline, and CTA.
 */

import React from 'react';
import Link from 'next/link';
import { RoadParticleField } from './RoadParticleField';
import { AnimatedTagline } from './AnimatedTagline';
import { GlowButton } from '@/components/ui/GlowButton';
import { ShieldCheck, Play, Layers } from 'lucide-react';

export function PhilosophyHero() {
  return (
    <section className="relative w-full min-h-[90vh] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 overflow-hidden py-16">
      {/* Three.js Flowing Road Particle Field */}
      <RoadParticleField />

      {/* Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center gap-6">
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[var(--accent-cyan)]/30 bg-[var(--surface-glass)] text-[var(--accent-cyan)] font-mono text-xs tracking-wider shadow-cyan-glow">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-cyan)] animate-pulse" />
            BHARATNAV L4+ AUTONOMY CORE
          </span>
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full border border-[var(--border-subtle)] bg-[var(--surface-glass)] text-[var(--text-secondary)] font-mono text-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-[var(--success-green)]" />
            ISO 26262 ASIL-D ALIGNED
          </span>
        </div>

        {/* Brand Display Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black font-display tracking-tight text-[var(--text-primary)]">
          Adaptive Path Planning for{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-cyan)] via-[var(--accent-amber)] to-[var(--accent-cyan)] glow-cyan">
            Unstructured Indian Roads
          </span>
        </h1>

        {/* Animated Philosophy Tagline */}
        <div className="max-w-4xl py-3 px-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-glass)]/60 backdrop-blur-xl">
          <AnimatedTagline />
        </div>

        {/* Subtitle / Value Proposition */}
        <p className="max-w-2xl text-sm sm:text-base text-[var(--text-secondary)] font-body leading-relaxed">
          Navigating chaotic traffic, stray animals, and unpredictable road hazards in real time using intelligent AI path planning.
        </p>

        {/* Call to Actions */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link href="/dashboard">
            <GlowButton variant="cyan" size="lg" icon={<Play className="w-5 h-5 fill-current" />}>
              Enter Simulation Cockpit
            </GlowButton>
          </Link>
          <Link href="/scenarios">
            <GlowButton variant="ghost" size="lg" icon={<Layers className="w-5 h-5" />}>
              Explore 5 Edge Scenarios
            </GlowButton>
          </Link>
        </div>
      </div>
    </section>
  );
}
