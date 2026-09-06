'use client';

/**
 * NavDrishti - Dedicated Emergency SOS Full-Screen Route
 */

import React from 'react';
import Link from 'next/link';
import { useSOSProtocol } from '@/hooks/useSOSProtocol';
import { CountdownTimer } from '@/components/emergency/CountdownTimer';
import { GPSCoordinateDisplay } from '@/components/emergency/GPSCoordinateDisplay';
import { VoiceSiren } from '@/components/emergency/VoiceSiren';
import { CV2XPacketLog } from '@/components/emergency/CV2XPacketLog';
import { GlowButton } from '@/components/ui/GlowButton';
import { AlertOctagon, ArrowLeft, ShieldAlert } from 'lucide-react';

export default function EmergencySOSPage() {
  const {
    sosState,
    abortCountdown,
    triggerImmediateSOS,
    returnToSimulation,
  } = useSOSProtocol();

  const isCountingDown = sosState.status === 'COUNTDOWN';
  const isDispatched = sosState.status === 'DISPATCHED';

  return (
    <div className="relative w-full min-h-[calc(100vh-105px)] flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 bg-[#0a0104] sos-bg-pulse">
      {/* Centered Safety Card Container */}
      <div className="relative z-10 w-full max-w-2xl rounded-2xl border-2 border-[var(--danger-red)] bg-[#120306]/95 backdrop-blur-2xl p-6 sm:p-8 shadow-[0_0_80px_rgba(255,51,85,0.7)] flex flex-col gap-6 overflow-hidden my-auto">
        {/* Header Block */}
        <div className="flex items-center justify-between border-b border-[var(--danger-red)]/40 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-[var(--danger-red)] text-white shadow-[0_0_25px_rgba(255,51,85,0.9)] animate-pulse">
              <ShieldAlert className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2 font-mono text-[10px] text-[var(--accent-amber)] font-bold uppercase tracking-wider">
                <span className="px-2 py-0.5 rounded bg-[var(--danger-red)]/30 text-[var(--danger-red)]">
                  STANDALONE SAFETY ROUTE
                </span>
                CRITICAL HARDWARE E-STOP
              </div>
              <h1 className="font-display font-black text-2xl sm:text-3xl text-white">
                EMERGENCY SOS SYSTEM
              </h1>
            </div>
          </div>

          <Link href="/dashboard">
            <button
              onClick={returnToSimulation}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--accent-cyan)] bg-[var(--accent-cyan)]/20 text-[var(--accent-cyan)] font-mono text-xs font-bold hover:bg-[var(--accent-cyan)] hover:text-black transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Simulator
            </button>
          </Link>
        </div>

        {/* Central Interactive Trigger Area */}
        {isCountingDown ? (
          <div className="py-4">
            <CountdownTimer
              secondsRemaining={sosState.countdownSeconds}
              onAbort={abortCountdown}
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-4 gap-4">
            <button
              onClick={triggerImmediateSOS}
              className={`relative w-48 h-48 sm:w-56 sm:h-56 rounded-full border-4 flex flex-col items-center justify-center text-white transition-all transform active:scale-95 cursor-pointer ${
                isDispatched
                  ? 'border-[var(--success-green)] bg-gradient-to-br from-green-600 to-emerald-950 shadow-[0_0_60px_rgba(0,255,136,0.7)]'
                  : 'border-white bg-gradient-to-br from-[#ff1744] via-[#d50000] to-[#7f0000] shadow-[0_0_60px_rgba(255,51,85,0.9)] animate-pulse-red'
              }`}
              aria-label="Trigger hardware emergency e-brake"
            >
              <AlertOctagon className="w-14 h-14 mb-2" />
              <span className="font-display font-black text-2xl tracking-tight leading-none">
                {isDispatched ? 'DISPATCHED' : 'EMERGENCY'}
              </span>
              <span className="font-display font-black text-base tracking-widest mt-1">
                {isDispatched ? 'ACTIVE' : 'SOS'}
              </span>
              <span className="font-mono text-[9px] uppercase tracking-wider text-white/80 mt-1">
                {isDispatched ? 'BROADCASTING' : 'PRESS TO TRANSMIT'}
              </span>
            </button>

            <span className="font-mono text-xs text-[var(--accent-amber)] font-bold text-center">
              {isDispatched
                ? '✓ VEHICLE E-BRAKE CLAMPED • HIGH-PRIORITY C-V2X BROADCASTING'
                : 'PRESS TO INITIATE FULL HARDWARE E-STOP & TRANSMIT EMERGENCY PACKET'}
            </span>
          </div>
        )}

        {/* RTK-GPS Readout */}
        <GPSCoordinateDisplay />

        {/* Voice Alert & Siren Monitor */}
        <VoiceSiren />

        {/* 5G NR C-V2X Emergency Packet Stream */}
        <CV2XPacketLog />

        {/* Bottom Bar */}
        <div className="flex items-center justify-between pt-3 border-t border-[var(--border-subtle)] font-mono text-xs">
          <span className="text-[var(--text-muted)]">
            PROTOCOL: <strong className="text-white">ISO 26262 ASIL-D FAIL-SAFE</strong>
          </span>
          <Link href="/dashboard">
            <GlowButton variant="ghost" size="sm" onClick={returnToSimulation}>
              ← Return to Main Simulator
            </GlowButton>
          </Link>
        </div>
      </div>
    </div>
  );
}
