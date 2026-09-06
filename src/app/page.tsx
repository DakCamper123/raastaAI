'use client';

/**
 * NavDrishti - Landing Page (System Overview)
 */

import React from 'react';
import Link from 'next/link';
import { PhilosophyHero } from '@/components/hero/PhilosophyHero';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassCard } from '@/components/ui/GlassCard';
import { GlowButton } from '@/components/ui/GlowButton';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import {
  ShieldAlert,
  CheckCircle2,
  Cpu,
  Compass,
  Zap,
  Play,
  ArrowRight,
  Eye,
  Layers,
} from 'lucide-react';

export default function HomePage() {
  const problems = [
    {
      western: 'Laser-straight painted lane dividers and pristine geometric curbs.',
      india: 'Unmarked asphalt patches, missing dividers, dirt shoulders, and seasonal potholes.',
    },
    {
      western: 'Homogeneous vehicle classes conforming strictly to speed and right-of-way rules.',
      india: 'Extreme heterogeneity: bullock carts, pushcarts, two-wheelers, auto-rickshaws, and multi-axle lorries.',
    },
    {
      western: 'Fenced freeways with strictly regulated, predictable pedestrian behavior.',
      india: 'Dynamic pedestrian swarms, cattle resting in fast lanes, and sudden crossing goats/dogs.',
    },
    {
      western: 'Linear rule-based right-of-way queues at signalized four-way stops.',
      india: 'Non-verbal micro-negotiation, visual headlight cues, and tactical gap-filling at un-signaled junctions.',
    },
  ];

  const solutions = [
    {
      icon: <Compass className="w-6 h-6 text-[var(--accent-cyan)]" />,
      title: 'Kinodynamic Potential Fields (APF)',
      desc: 'Creates virtual repulsive energy walls around obstacles, potholes, and road drop-offs, driving the vehicle safely toward open corridor minima.',
      tag: '60 HZ GRADIENT',
    },
    {
      icon: <Cpu className="w-6 h-6 text-[var(--accent-amber)]" />,
      title: 'Dynamic Window Approach (DWA)',
      desc: 'Samples feasible acceleration windows in real time, scoring heading alignment, obstacle clearance, and speed to guarantee kinematically valid avoidance.',
      tag: 'VELOCITY OPTIMIZER',
    },
    {
      icon: <Eye className="w-6 h-6 text-[var(--success-green)]" />,
      title: 'Bovine-PoseNet Biological Tracker',
      desc: 'Specialized deep learning model estimating 18 biological keypoints of cows and buffaloes to predict head turns and movement vectors without horn panic.',
      tag: 'BIOLOGICAL POSE',
    },
    {
      icon: <Zap className="w-6 h-6 text-[var(--danger-red)]" />,
      title: 'ASIL-D E-Brake & 5G C-V2X',
      desc: 'Sub-40ms hydraulic fail-safe stop loop combined with ultra-low latency C-V2X emergency packet broadcast over 5G NR Band n78.',
      tag: 'SAFETY FAIL-SAFE',
    },
  ];

  return (
    <div className="w-full flex flex-col items-center">
      {/* 1. Full-Bleed Cinematic Hero */}
      <PhilosophyHero />

      {/* 2. The Problem: Silicon Valley vs Indian Road Reality */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-[var(--border-subtle)]">
        <ScrollReveal>
          <SectionHeading
            tag="THE AUTONOMOUS DILEMMA"
            title="Silicon Valley Assumptions vs. Indian Road Reality"
            description="Conventional Level 4 autonomous driving stacks break down when exported to India because their foundation relies on predictable rules and geometric lane structure."
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {problems.map((item, idx) => (
            <ScrollReveal key={idx} delay={idx * 0.1}>
              <GlassCard className="p-6 flex flex-col gap-4 font-mono text-xs h-full justify-between">
                {/* Western Assumption */}
                <div className="p-3.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-secondary)] flex flex-col gap-1.5 opacity-70">
                  <div className="flex items-center gap-1.5 text-[var(--text-muted)] text-[10px] uppercase font-bold tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-[var(--text-muted)]" />
                    Conventional Autonomous Assumption (US / EU)
                  </div>
                  <p className="text-[var(--text-secondary)] font-body text-xs line-through decoration-red-500/50">
                    {item.western}
                  </p>
                </div>

                {/* Indian Reality */}
                <div className="p-3.5 rounded-lg border border-[var(--accent-cyan)]/40 bg-[var(--accent-cyan)]/10 flex flex-col gap-1.5">
                  <div className="flex items-center gap-1.5 text-[var(--accent-cyan)] text-[10px] uppercase font-bold tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-[var(--accent-cyan)] animate-pulse" />
                    Indian Corridor Ground Reality (Solved by NavDrishti)
                  </div>
                  <p className="text-[var(--text-primary)] font-body text-xs font-semibold leading-relaxed">
                    {item.india}
                  </p>
                </div>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* 3. The NavDrishti Solution Engine */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-[var(--border-subtle)]">
        <ScrollReveal>
          <SectionHeading
            tag="CORE INNOVATIONS"
            title="How NavDrishti Tames the Chaos"
            description="Our multi-layer kinematic architecture synthesizes physics-driven energy surfaces, tactical multi-agent game theory, and biological neural networks."
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {solutions.map((sol, idx) => (
            <ScrollReveal key={idx} delay={idx * 0.1}>
              <GlassCard glow="cyan" className="p-6 flex flex-col gap-3.5 h-full justify-between font-mono">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] shadow-inner">
                      {sol.icon}
                    </div>
                    <span className="text-[9px] px-2 py-0.5 rounded bg-[var(--surface-glass)] text-[var(--text-muted)] border border-[var(--border-subtle)]">
                      {sol.tag}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-lg text-[var(--text-primary)]">
                    {sol.title}
                  </h3>

                  <p className="text-xs text-[var(--text-secondary)] font-body leading-relaxed">
                    {sol.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-[var(--border-subtle)]/60 text-[10px] text-[var(--accent-cyan)] font-bold">
                  ACTIVE AT 60 HZ CYCLE
                </div>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* 4. Bottom Interactive Cockpit CTA */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 mb-12">
        <ScrollReveal>
          <GlassCard glow="cyan" className="p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div className="flex flex-col gap-2 max-w-2xl">
              <span className="font-mono text-xs text-[var(--accent-cyan)] font-bold tracking-widest uppercase">
                EXPERIENCE THE SIMULATION
              </span>
              <h2 className="text-2xl sm:text-4xl font-black font-display text-[var(--text-primary)]">
                Ready to Test Indian Edge Corridors?
              </h2>
              <p className="text-sm text-[var(--text-secondary)] font-body">
                Step into the simulation cockpit to monitor real-time kinematic APF gradient fields,
                inspect 360° sensor feeds, and test the 5 Indian road edge scenarios live.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
              <Link href="/dashboard">
                <GlowButton variant="cyan" size="lg" icon={<Play className="w-5 h-5 fill-current" />}>
                  Enter Simulator
                </GlowButton>
              </Link>
              <Link href="/scenarios">
                <GlowButton variant="ghost" size="lg" icon={<Layers className="w-5 h-5" />}>
                  Explore 5 Scenarios
                </GlowButton>
              </Link>
            </div>
          </GlassCard>
        </ScrollReveal>
      </section>
    </div>
  );
}
