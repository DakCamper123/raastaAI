'use client';

/**
 * RAASTA.AI - PhilosophyHero Component
 * Full-viewport cinematic hero with RoadParticleField, AnimatedTagline, and CTA.
 */

import React from 'react';
import Link from 'next/link';
import { RoadParticleField } from './RoadParticleField';
import { AnimatedTagline } from './AnimatedTagline';
import { GlowButton } from '@/components/ui/GlowButton';
import { ShieldCheck, Play, Layers, Cpu, ArrowRight } from 'lucide-react';

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
          Taming the chaotic dynamics of heterogeneous traffic, unmarked corridors, stray cattle,
          and aggressive lane cuts using <strong>Kinodynamic Artificial Potential Fields (APF)</strong> and <strong>Dynamic Window Approach (DWA)</strong>.
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
          <Link href="/architecture">
            <GlowButton variant="amber" size="lg" icon={<Cpu className="w-5 h-5" />}>
              System Architecture <ArrowRight className="w-4 h-4 ml-1" />
            </GlowButton>
          </Link>
        </div>

        {/* Real-time Hardware Telemetry Ticker Mini */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 w-full max-w-3xl pt-6 border-t border-[var(--border-subtle)]/60 font-mono text-xs">
          <div className="flex flex-col items-center">
            <span className="text-[var(--text-muted)] text-[10px]">INFERENCE CYCLE</span>
            <span className="text-[var(--accent-cyan)] font-bold text-base">60 HZ (16 MS)</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[var(--text-muted)] text-[10px]">GNSS POSITIONING</span>
            <span className="text-[var(--text-primary)] font-bold text-base">±1.4 CM RTK</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[var(--text-muted)] text-[10px]">URLLC C-V2X</span>
            <span className="text-[var(--success-green)] font-bold text-base">&lt;11.2 MS LATENCY</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[var(--text-muted)] text-[10px]">SENSOR FUSION</span>
            <span className="text-[var(--accent-amber)] font-bold text-base">128-BEAM + 8 CAM</span>
          </div>
        </div>
      </div>
    </section>
  );
}
