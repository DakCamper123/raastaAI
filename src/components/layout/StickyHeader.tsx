'use client';

/**
 * NavDrishti - StickyHeader Navigation Component
 * Houses Brand Radar, Nav Links, Live CAN-Bus Ticker, Theme Toggle, and Emergency SOS button.
 */

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { GlowButton } from '@/components/ui/GlowButton';
import { useSOSProtocol } from '@/hooks/useSOSProtocol';
import { AlertTriangle, Menu, X, Radio, User, LogIn, LogOut, ShieldCheck } from 'lucide-react';

export function StickyHeader() {
  const pathname = usePathname();
  const { triggerEmergency } = useSOSProtocol();
  const { user, isAuthenticated, openAuthModal, signOut } = useAuth();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Philosophy' },
    { href: '/dashboard', label: 'Simulation Cockpit' },
    { href: '/analysis', label: 'Car Analysis' },
    { href: '/architecture', label: 'Architecture' },
    { href: '/scenarios', label: '5 Edge Cases' },
    { href: '/team', label: 'Research Team' },
  ];

  return (
    <>
      {/* Skip to Content for Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 z-50 px-4 py-2 bg-[var(--accent-cyan)] text-black font-mono text-sm rounded-md"
      >
        Skip to main content
      </a>

      <header className="sticky top-0 z-40 w-full border-b border-[var(--border-subtle)] bg-[var(--surface-glass)] backdrop-blur-xl transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Brand Logo with Animated Radar */}
          <Link href="/" className="flex items-center gap-3 group focus:outline-none">
            <div className="relative w-9 h-9 rounded-full border border-[var(--accent-cyan)] flex items-center justify-center bg-[var(--accent-cyan)]/10 overflow-hidden shadow-cyan-glow">
              <div className="absolute inset-0 rounded-full border-t border-[var(--accent-cyan)] animate-spin" />
              <div className="w-2 h-2 rounded-full bg-[var(--accent-cyan)] shadow-[0_0_8px_var(--accent-cyan)]" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1 font-display font-black text-xl tracking-tight text-[var(--text-primary)]">
                <span>NAV</span>
                <span className="text-[var(--accent-cyan)]">DRISHTI</span>
              </div>
              <span className="font-mono text-[9px] uppercase tracking-widest text-[var(--text-muted)] -mt-1">
                BharatNav L4+
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-1.5 rounded-lg font-mono text-xs uppercase tracking-wider transition-all duration-200 ${
                    isActive
                      ? 'bg-[var(--accent-cyan)]/15 text-[var(--accent-cyan)] border border-[var(--accent-cyan)]/30 font-bold'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-glass)]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Action Header Items */}
          <div className="flex items-center gap-2.5">
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Supabase Free Auth Status Button */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen((prev) => !prev)}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[var(--accent-cyan)]/40 bg-[var(--accent-cyan)]/10 font-mono text-xs text-[var(--accent-cyan)] hover:bg-[var(--accent-cyan)]/20 transition-all focus:outline-none"
                  title="User Profile & Access Status"
                  aria-label="User profile and access status"
                >
                  <span className="w-2 h-2 rounded-full bg-[var(--success-green)] animate-pulse" />
                  <User className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline max-w-[100px] truncate">
                    {user?.email?.split('@')[0]}
                  </span>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 p-2 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] shadow-2xl z-50 flex flex-col gap-1 font-mono text-xs">
                    <div className="px-2 py-1.5 border-b border-[var(--border-subtle)] text-[10px] text-[var(--text-muted)] truncate">
                      {user?.email}
                    </div>
                    <div className="px-2 py-1.5 text-[10px] text-[var(--success-green)] flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Full Telematics Unlocked</span>
                    </div>
                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        signOut();
                      }}
                      className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-[var(--danger-red)] hover:bg-[var(--danger-red)]/10 transition-colors text-left"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <GlowButton
                variant="cyan"
                size="sm"
                onClick={() => openAuthModal('signin')}
                icon={<LogIn className="w-3.5 h-3.5" />}
                title="Sign in or register for free telemetry & diagnostics"
              >
                <span className="hidden sm:inline">Sign In</span>
                <span className="sm:hidden">Login</span>
              </GlowButton>
            )}

            {/* Emergency SOS Button */}
            <Link href="/emergency-sos">
              <GlowButton
                variant="danger"
                size="sm"
                icon={<AlertTriangle className="w-4 h-4 animate-bounce" />}
                title="Dedicated ASIL-D Emergency SOS Page (Ctrl+Shift+E)"
                aria-label="Open Emergency SOS Page"
              >
                <span className="hidden sm:inline">Emergency</span> SOS
              </GlowButton>
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileNavOpen((prev) => !prev)}
              className="md:hidden p-2 rounded-lg border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] focus:outline-none"
              aria-expanded={isMobileNavOpen}
              aria-label="Toggle navigation menu"
            >
              {isMobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* CAN-Bus Real-Time Telemetry Marquee Ticker */}
        <div className="w-full bg-[var(--bg-secondary)] border-t border-[var(--border-subtle)]/50 py-1 px-4 overflow-hidden">
          <div className="flex items-center gap-6 font-mono text-[10px] text-[var(--text-secondary)] whitespace-nowrap animate-marquee">
            <span className="flex items-center gap-1.5 text-[var(--accent-cyan)]">
              <Radio className="w-3 h-3 animate-pulse" />
              CAN-BUS: <strong>60 HZ REAL-TIME</strong>
            </span>
            <span>GNSS RTK: <strong className="text-[var(--text-primary)]">FIXED (±1.4 CM)</strong></span>
            <span>ROAD SURFACE: <strong className="text-[var(--text-primary)]">UNSTRUCTURED / MIXED</strong></span>
            <span>V2X URLLC: <strong className="text-[var(--success-green)]">5G NR BAND n78 CONNECTED</strong></span>
            <span>PLANNER: <strong className="text-[var(--accent-amber)]">DWA + KINODYNAMIC APF</strong></span>
            <span>FAIL-SAFE LATENCY: <strong className="text-[var(--text-primary)]">11.2 MS</strong></span>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMobileNavOpen && (
          <div className="md:hidden border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)]/95 backdrop-blur-2xl p-4 flex flex-col gap-2 animate-fadeIn">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileNavOpen(false)}
                className={`px-4 py-2.5 rounded-lg font-mono text-xs uppercase tracking-wider ${
                  pathname === link.href
                    ? 'bg-[var(--accent-cyan)]/15 text-[var(--accent-cyan)] font-bold'
                    : 'text-[var(--text-secondary)] hover:bg-[var(--surface-glass)]'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile Auth row */}
            {isAuthenticated ? (
              <div className="px-4 py-2.5 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-subtle)] flex items-center justify-between font-mono text-xs">
                <div className="flex items-center gap-2 text-[var(--accent-cyan)]">
                  <span className="w-2 h-2 rounded-full bg-[var(--success-green)]" />
                  <span className="truncate max-w-[150px]">{user?.email}</span>
                </div>
                <button
                  onClick={() => {
                    setIsMobileNavOpen(false);
                    signOut();
                  }}
                  className="text-[var(--danger-red)] flex items-center gap-1 font-bold"
                >
                  <LogOut className="w-3.5 h-3.5" /> Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setIsMobileNavOpen(false);
                  openAuthModal('signin');
                }}
                className="px-4 py-2.5 rounded-lg font-mono text-xs uppercase tracking-wider text-[var(--accent-cyan)] bg-[var(--accent-cyan)]/15 border border-[var(--accent-cyan)]/30 font-bold flex items-center gap-2"
              >
                <LogIn className="w-4 h-4" /> Sign In (Free Access)
              </button>
            )}

            <Link
              href="/emergency-sos"
              onClick={() => setIsMobileNavOpen(false)}
              className="px-4 py-2.5 rounded-lg font-mono text-xs uppercase tracking-wider text-[var(--danger-red)] bg-[var(--danger-red)]/15 font-bold border border-[var(--danger-red)]/30 flex items-center gap-2"
            >
              <AlertTriangle className="w-4 h-4" /> Emergency SOS
            </Link>
          </div>
        )}
      </header>
    </>
  );
}
