'use client';

/**
 * NavDrishti - Modern Cinematic Footer Component
 * Full-width end-to-end container with About Us, Helpful Links, Contact Us, and giant luminous wordmark.
 */

import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Github } from 'lucide-react';

export function Footer() {
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
    <footer className="w-full pt-16 font-sans">
      {/* Full-width End-to-End Container */}
      <div className="relative w-full rounded-t-[32px] sm:rounded-t-[44px] md:rounded-t-[56px] bg-[#080c13] border-t border-white/[0.08] shadow-[0_-25px_60px_rgba(0,0,0,0.9)] overflow-hidden pt-12 sm:pt-16 md:pt-20 pb-0 flex flex-col justify-between">
        
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-48 bg-emerald-500/[0.07] blur-[100px] pointer-events-none rounded-full" />

        {/* Top Content Row: Brand dossier on left, 3 column link matrix on right */}
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 pb-14 sm:pb-16 relative z-10">
          
          {/* Brand Info (Left Column) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <Link href="/" className="inline-flex items-center gap-1.5 focus:outline-none group">
              <span className="font-display font-black text-2xl sm:text-3xl tracking-tight text-white group-hover:text-[var(--accent-cyan)] transition-colors">
                NAVDRISHTI
              </span>
            </Link>
            <p className="text-sm text-zinc-400 font-body leading-relaxed max-w-sm">
              Next-generation Level 4+ autonomous mobility simulation and telematics platform engineered specifically for chaotic, unstructured Indian road corridors.
            </p>
          </div>

          {/* Navigation Matrix (Right Columns: About Us, Helpful Links, Contact Us) */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10">
            {/* Column 1: About Us */}
            <div className="flex flex-col gap-3.5">
              <h4 className="text-sm font-semibold text-white tracking-wide font-display">
                About Us
              </h4>
              <ul className="flex flex-col gap-2.5 text-xs font-body text-zinc-400">
                {aboutLinks.map((item, idx) => (
                  <li key={`${item.label}-${idx}`}>
                    <Link
                      href={item.href}
                      className="hover:text-[var(--accent-cyan)] transition-colors duration-200"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: Helpful Links */}
            <div className="flex flex-col gap-3.5">
              <h4 className="text-sm font-semibold text-white tracking-wide font-display">
                Helpful Links
              </h4>
              <ul className="flex flex-col gap-2.5 text-xs font-body text-zinc-400">
                {helpfulLinks.map((item, idx) => (
                  <li key={`${item.label}-${idx}`}>
                    <Link
                      href={item.href}
                      className="hover:text-[var(--accent-cyan)] transition-colors duration-200"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Contact Us */}
            <div className="flex flex-col gap-3.5">
              <h4 className="text-sm font-semibold text-white tracking-wide font-display">
                Contact Us
              </h4>
              <div className="flex flex-col gap-3 text-xs font-body text-zinc-400">
                <a
                  href="mailto:contact@navdrishti.ai"
                  className="hover:text-[var(--accent-cyan)] transition-colors duration-200 inline-flex items-center gap-2"
                >
                  <Mail className="w-3.5 h-3.5 text-[var(--accent-cyan)] shrink-0" />
                  <span>contact@navdrishti.ai</span>
                </a>

                <a
                  href="tel:+918637373116"
                  className="hover:text-[var(--accent-cyan)] transition-colors duration-200 inline-flex items-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5 text-[var(--accent-cyan)] shrink-0" />
                  <span>+91 86373 73116</span>
                </a>

                <div className="inline-flex items-start gap-2 text-zinc-400 leading-relaxed pt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-[var(--accent-cyan)] shrink-0 mt-0.5" />
                  <span>NH-48 Autonomous Corridor Testbed, Pune, Maharashtra, India</span>
                </div>

                <div className="pt-2 border-t border-white/[0.06] flex items-center gap-3">
                  <a
                    href="https://github.com/DakCamper123/raastaAI"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[var(--accent-cyan)] transition-colors text-zinc-400 inline-flex items-center gap-1.5"
                  >
                    <Github className="w-3.5 h-3.5 text-white" />
                    <span>GitHub Repository</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sub-footer Copyright & Attribution Row */}
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 border-t border-white/[0.06] pt-6 pb-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500 relative z-10">
          <div>
            © {new Date().getFullYear()} NavDrishti. All rights reserved.
          </div>
          <div className="text-center sm:text-right">
            Engineered by Autonomous Systems Lab • Powered by BharatNav L4+
          </div>
        </div>

        {/* Giant Hero Brand Display Typography - Expands End to End */}
        <div className="w-full overflow-hidden flex justify-center items-end select-none pointer-events-none -mb-2 sm:-mb-3 md:-mb-4 relative z-0">
          <h2
            className="font-display font-black tracking-tighter text-[13.8vw] uppercase leading-[0.76] text-center w-full whitespace-nowrap bg-clip-text text-transparent bg-gradient-to-b from-[#04241d] via-[#059669] to-[#00f0ff]"
            style={{
              textShadow: '0 0 60px rgba(0, 240, 255, 0.15)',
            }}
          >
            NAVDRISHTI
          </h2>
        </div>
      </div>
    </footer>
  );
}
