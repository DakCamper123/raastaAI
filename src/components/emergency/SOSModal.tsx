'use client';

/**
 * RAASTA.AI - SOSModal Component
 * Glassmorphic emergency fail-safe modal with countdown, massive central button, GPS telemetry, and C-V2X logs.
 */

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSOSProtocol } from '@/hooks/useSOSProtocol';
import { CountdownTimer } from './CountdownTimer';
import { GPSCoordinateDisplay } from './GPSCoordinateDisplay';
import { VoiceSiren } from './VoiceSiren';
import { CV2XPacketLog } from './CV2XPacketLog';
import { GlowButton } from '@/components/ui/GlowButton';
import { AlertOctagon, X, ArrowLeft, ShieldAlert } from 'lucide-react';

export function SOSModal() {
  const {
    isModalOpen,
    closeModal,
    sosState,
    abortCountdown,
    triggerImmediateSOS,
    returnToSimulation,
  } = useSOSProtocol();

  const isCountingDown = sosState.status === 'COUNTDOWN';
  const isDispatched = sosState.status === 'DISPATCHED';

  return (
    <AnimatePresence>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Translucent Glass Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="fixed inset-0 bg-[#060103]/80 backdrop-blur-xl transition-opacity"
            aria-hidden="true"
          />

          {/* Modal Dialog Card */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="sos-modal-title"
            className="relative z-10 w-full max-w-2xl rounded-2xl border-2 border-[var(--danger-red)] bg-[#120306]/95 backdrop-blur-2xl p-6 shadow-[0_0_60px_rgba(255,51,85,0.6)] flex flex-col gap-5 overflow-hidden my-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[var(--danger-red)]/40 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[var(--danger-red)] text-white shadow-[0_0_20px_rgba(255,51,85,0.8)] animate-pulse">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2 font-mono text-[10px] text-[var(--accent-amber)] font-bold uppercase tracking-wider">
                    <span className="px-1.5 py-0.5 rounded bg-[var(--danger-red)]/30 text-[var(--danger-red)]">
                      IN-PAGE E-STOP
                    </span>
                    CRITICAL SAFETY INTERVENTION
                  </div>
                  <h2 id="sos-modal-title" className="font-display font-black text-2xl text-white">
                    EMERGENCY SOS SYSTEM
                  </h2>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={returnToSimulation}
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--accent-cyan)] bg-[var(--accent-cyan)]/20 text-[var(--accent-cyan)] font-mono text-xs font-bold hover:bg-[var(--accent-cyan)] hover:text-black transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Simulator
                </button>
                <button
                  onClick={closeModal}
                  className="p-2 rounded-lg border border-white/20 text-white/70 hover:text-white hover:bg-white/10"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Central Interactive Content */}
            {isCountingDown ? (
              <div className="py-2">
                <CountdownTimer
                  secondsRemaining={sosState.countdownSeconds}
                  onAbort={abortCountdown}
                />
              </div>
            ) : (
              /* Massive Pulsating Center Button */
              <div className="flex flex-col items-center justify-center py-4 gap-3">
                <button
                  onClick={triggerImmediateSOS}
                  className={`relative w-44 h-44 rounded-full border-4 flex flex-col items-center justify-center text-white transition-all transform active:scale-95 ${
                    isDispatched
                      ? 'border-[var(--success-green)] bg-gradient-to-br from-green-600 to-emerald-900 shadow-[0_0_50px_rgba(0,255,136,0.6)]'
                      : 'border-white bg-gradient-to-br from-[#ff1744] to-[#990018] shadow-[0_0_50px_rgba(255,51,85,0.8)] animate-pulse-red'
                  }`}
                  aria-label="Trigger hardware emergency e-brake"
                >
                  <AlertOctagon className="w-12 h-12 mb-1" />
                  <span className="font-display font-black text-xl tracking-tight leading-none">
                    {isDispatched ? 'DISPATCHED' : 'EMERGENCY'}
                  </span>
                  <span className="font-display font-black text-sm tracking-widest mt-1">
                    {isDispatched ? 'ACTIVE' : 'SOS'}
                  </span>
                </button>

                <span className="font-mono text-xs text-[var(--accent-amber)] font-bold text-center">
                  {isDispatched
                    ? '✓ E-BRAKE CLAMPED • 5G URLLC PACKET DISPATCHED'
                    : 'PRESS TO TRIGGER HARDWARE E-STOP & C-V2X TRANSMISSION'}
                </span>
              </div>
            )}

            {/* GPS Telemetry Readout */}
            <GPSCoordinateDisplay />

            {/* Voice & Acoustic Siren Component */}
            <VoiceSiren />

            {/* Scrolling 5G C-V2X Packet Terminal */}
            <CV2XPacketLog />

            {/* Bottom Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-[var(--border-subtle)] font-mono text-xs">
              <span className="text-[var(--text-muted)]">
                SHORTCUT: <strong className="text-white">Ctrl + Shift + E</strong>
              </span>
              <GlowButton variant="ghost" size="sm" onClick={returnToSimulation}>
                ← Return to Simulation Cockpit
              </GlowButton>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
