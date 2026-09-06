'use client';

/**
 * NavDrishti - Modern Cyber-HUD Footer Component
 * Styled after modern design system with 4-column layout, contact info, social links,
 * and giant responsive outlined brand watermark.
 */

import React from 'react';
import Link from 'next/link';
import {
  Heart,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Globe,
  Github,
  ShieldCheck,
} from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const aboutLinks = [
    { label: 'Platform Overview', href: '/' },
    { label: 'Research Team', href: '/team' },
    { label: '5 Edge Scenarios', href: '/scenarios' },
    { label: 'ASIL-D Fail-Safe Protocol', href: '/emergency-sos' },
    { label: 'Autonomous Research Lab', href: '/' },
  ];

  const helpfulLinks = [
    { label: 'Simulation Cockpit', href: '/dashboard' },
    { label: 'Car Condition & Diagnostics', href: '/analysis' },
    { label: 'Live Telemetry Stream', href: '/dashboard' },
    { label: 'C-V2X Emergency SOS', href: '/emergency-sos' },
    { label: 'CAN-Bus Telemetry Logs', href: '/analysis' },
  ];

  return (
    <footer className="relative w-full bg-[var(--bg-primary)] border-t border-[var(--border-subtle)] pt-16 overflow-hidden transition-colors duration-300">
      {/* Subtle top ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-b from-[var(--accent-cyan)]/5 to-transparent blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12">
          {/* Column 1: Brand & Summary (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2.5 group w-fit focus:outline-none">
              <div className="relative flex items-center justify-center">
                <Heart className="w-5 h-5 text-[var(--accent-cyan)] fill-[var(--accent-cyan)] drop-shadow-[0_0_10px_var(--accent-cyan)] transition-transform group-hover:scale-110" />
              </div>
              <div className="flex items-center font-display font-black text-2xl tracking-tight text-[var(--text-primary)]">
                <span>Nav</span>
                <span className="text-[var(--accent-cyan)]">/drishti</span>
              </div>
            </Link>

            <p className="text-[var(--text-secondary)] font-body text-sm leading-relaxed max-w-sm">
              Next-generation Level 4+ autonomous mobility simulation, real-time sensor fusion HUD, and ASIL-D safety architecture engineered for unstructured, chaotic Indian road corridors.
            </p>

            <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)] pt-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-[var(--border-subtle)] bg-[var(--surface-glass)] text-[var(--accent-cyan)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-cyan)] animate-pulse" />
                BHARATNAV L4+
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border border-[var(--border-subtle)] bg-[var(--surface-glass)] text-[var(--success-green)]">
                <ShieldCheck className="w-3 h-3" />
                ASIL-D ALIGNED
              </span>
            </div>
          </div>

          {/* Column 2: About Us (2.5 cols) */}
          <div className="lg:col-span-2 sm:col-span-1 flex flex-col gap-3.5">
            <h3 className="font-display font-bold text-sm tracking-wider uppercase text-[var(--text-primary)]">
              About Us
            </h3>
            <ul className="flex flex-col gap-2.5 font-body text-sm text-[var(--text-secondary)]">
              {aboutLinks.map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={item.href}
                    className="hover:text-[var(--accent-cyan)] transition-colors inline-block"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Helpful Links (2.5 cols) */}
          <div className="lg:col-span-3 sm:col-span-1 flex flex-col gap-3.5">
            <h3 className="font-display font-bold text-sm tracking-wider uppercase text-[var(--text-primary)]">
              Helpful Links
            </h3>
            <ul className="flex flex-col gap-2.5 font-body text-sm text-[var(--text-secondary)]">
              {helpfulLinks.map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={item.href}
                    className="hover:text-[var(--accent-cyan)] transition-colors inline-block"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Us (3 cols) */}
          <div className="lg:col-span-3 flex flex-col gap-3.5">
            <h3 className="font-display font-bold text-sm tracking-wider uppercase text-[var(--text-primary)]">
              Contact Us
            </h3>
            <div className="flex flex-col gap-3 font-body text-sm text-[var(--text-secondary)]">
              <a
                href="mailto:contact@navdrishti.ai"
                className="flex items-center gap-3 hover:text-[var(--accent-cyan)] transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-secondary)] flex items-center justify-center shrink-0 group-hover:border-[var(--accent-cyan)]/50 transition-colors">
                  <Mail className="w-4 h-4 text-[var(--accent-cyan)]" />
                </div>
                <span className="font-mono text-xs">contact@navdrishti.ai</span>
              </a>

              <a
                href="tel:+918637373116"
                className="flex items-center gap-3 hover:text-[var(--accent-cyan)] transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-secondary)] flex items-center justify-center shrink-0 group-hover:border-[var(--accent-cyan)]/50 transition-colors">
                  <Phone className="w-4 h-4 text-[var(--accent-cyan)]" />
                </div>
                <span className="font-mono text-xs">+91 86373 73116</span>
              </a>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-secondary)] flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-[var(--accent-cyan)]" />
                </div>
                <span className="font-mono text-xs leading-relaxed text-[var(--text-secondary)]">
                  NH-48 Autonomous Corridor Testbed, Pune, Maharashtra, India
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider Line */}
        <div className="w-full h-px bg-[var(--border-subtle)]" />

        {/* Social Icons & Copyright Row */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[var(--text-secondary)]">
          {/* Social Icons */}
          <div className="flex items-center gap-3">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-8 h-8 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-glass)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] hover:border-[var(--accent-cyan)]/40 hover:shadow-cyan-glow transition-all"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-8 h-8 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-glass)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] hover:border-[var(--accent-cyan)]/40 hover:shadow-cyan-glow transition-all"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter / X"
              className="w-8 h-8 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-glass)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] hover:border-[var(--accent-cyan)]/40 hover:shadow-cyan-glow transition-all"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a
              href="https://github.com/DakCamper123/raastaAI"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Repository"
              className="w-8 h-8 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-glass)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] hover:border-[var(--accent-cyan)]/40 hover:shadow-cyan-glow transition-all"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://navdrishti.ai"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Web Portal"
              className="w-8 h-8 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-glass)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] hover:border-[var(--accent-cyan)]/40 hover:shadow-cyan-glow transition-all"
            >
              <Globe className="w-4 h-4" />
            </a>
          </div>

          {/* Copyright notice */}
          <div className="flex items-center gap-2">
            <span>&copy; {currentYear} NavDrishti. All rights reserved.</span>
          </div>
        </div>
      </div>

      {/* Giant Outlined Typography Watermark */}
      <div className="relative w-full overflow-hidden flex justify-center items-center pointer-events-none select-none -mt-4 sm:-mt-8 pb-0">
        <span className="font-display font-black tracking-tight text-[15.5vw] leading-none uppercase text-transparent footer-watermark-stroke whitespace-nowrap">
          NAVDRISHTI
        </span>
      </div>
    </footer>
  );
}
