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
  MessageSquare,
  Brain,
  Search,
  BarChart3,
  Sparkles,
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

  const workflowSteps = [
    {
      step: '01',
      title: 'Ask',
      desc: 'Users ask questions naturally using voice or text in their preferred language.',
      icon: <MessageSquare className="w-5 h-5 text-[var(--accent-cyan)]" />,
      accent: 'cyan',
    },
    {
      step: '02',
      title: 'Understand',
      desc: 'NavDrishti understands the underlying intent and parameters behind the query.',
      icon: <Brain className="w-5 h-5 text-[var(--accent-cyan)]" />,
      accent: 'cyan',
    },
    {
      step: '03',
      title: 'Find',
      desc: 'Relevant organizational and operational information is instantly located across repositories.',
      icon: <Search className="w-5 h-5 text-[var(--accent-amber)]" />,
      accent: 'amber',
    },
    {
      step: '04',
      title: 'Analyze',
      desc: 'Connected data streams and documents are contextualized and correlated.',
      icon: <BarChart3 className="w-5 h-5 text-[var(--accent-amber)]" />,
      accent: 'amber',
    },
    {
      step: '05',
      title: 'Insight',
      desc: 'NavDrishti generates understandable plain-language summaries, charts, and data tables.',
      icon: <Sparkles className="w-5 h-5 text-[var(--success-green)]" />,
      accent: 'green',
    },
    {
      step: '06',
      title: 'Decide',
      desc: 'Decision-makers leverage real-time insights to take informed, confident action.',
      icon: <CheckCircle2 className="w-5 h-5 text-[var(--success-green)]" />,
      accent: 'green',
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

      {/* 3. How NavDrishti Works */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-[var(--border-subtle)]">
        <ScrollReveal>
          <SectionHeading
            tag="HOW IT WORKS"
            title="How NavDrishti Works"
            description="A structured process designed to transform natural language queries into decision-grade clarity."
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {workflowSteps.map((item, idx) => (
            <ScrollReveal key={idx} delay={idx * 0.08}>
              <GlassCard glow={item.accent === 'amber' ? 'amber' : 'cyan'} className="p-6 flex flex-col gap-4 h-full justify-between group transition-all duration-300 hover:border-[var(--accent-cyan)]/40 font-mono">
                <div className="flex flex-col gap-3.5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-2xl font-black text-[var(--accent-cyan)] tracking-wider">
                      {item.step}
                    </span>
                    <div className="p-2.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] shadow-inner group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                  </div>

                  <h3 className="font-display font-bold text-xl text-[var(--text-primary)] group-hover:text-[var(--accent-cyan)] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-body leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-[var(--border-subtle)]/60 flex items-center justify-between text-[10px] font-mono text-[var(--text-muted)]">
                  <span>STAGE {item.step}</span>
                  <span className="text-[var(--accent-cyan)] font-semibold">DECISION PIPELINE</span>
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
