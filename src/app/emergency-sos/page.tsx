'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function EmergencySOSPage() {
  const [countdown, setCountdown] = useState<number | null>(3);
  const [isAlertTriggered, setIsAlertTriggered] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const alarmIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Simulated High-Precision Indian Road RTK-GPS Coordinates
  const gpsData = {
    latitude: '18.52043° N',
    longitude: '73.85674° E',
    altitude: '562.4 m',
    corridor: 'NH-48 Pune-Bengaluru National Expressway, Km 124.8',
    satellites: '14 Satellites (NavIC / GPS Dual-Band L1+L5)',
    accuracy: '±1.2 cm (RTK-Fixed)',
    emergencyContact: 'National Emergency Response (Dial 112) & NHAI Highway Patrol'
  };

  // Real-time timestamp stream
  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      setCurrentTime(now.toISOString().replace('T', ' ').substring(0, 23) + ' IST');
    };
    updateTimer();
    const interval = setInterval(updateTimer, 80);
    return () => clearInterval(interval);
  }, []);

  // Countdown timer logic (3 seconds to cancel)
  useEffect(() => {
    if (countdown === null || isCancelled || isAlertTriggered) return;

    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown((prev) => (prev !== null && prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      triggerFinalAlert();
    }
  }, [countdown, isCancelled, isAlertTriggered]);

  // Voice Announcement using Web Speech API
  const speakVoice = (text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.95;
        utterance.pitch = 1.05;
        window.speechSynthesis.speak(utterance);
      } catch (err) {
        console.warn('Speech synthesis restricted:', err);
      }
    }
  };

  // Alarm sound synthesis
  const playAlarmBeep = () => {
    if (!soundEnabled || typeof window === 'undefined') return;
    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AudioCtx) audioCtxRef.current = new AudioCtx();
      }
      if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
      if (audioCtxRef.current) {
        const osc = audioCtxRef.current.createOscillator();
        const gain = audioCtxRef.current.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(880, audioCtxRef.current.currentTime);
        gain.gain.setValueAtTime(0.12, audioCtxRef.current.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 0.3);
        osc.connect(gain);
        gain.connect(audioCtxRef.current.destination);
        osc.start();
        osc.stop(audioCtxRef.current.currentTime + 0.3);
      }
    } catch {}
  };

  // Trigger final alert sequence
  const triggerFinalAlert = () => {
    setIsAlertTriggered(true);
    setCountdown(0);
    speakVoice("Emergency SOS Sent! Location sent to emergency contacts. Autonomous vehicle fail-safe braking engaged.");

    playAlarmBeep();
    if (!alarmIntervalRef.current) {
      alarmIntervalRef.current = setInterval(() => {
        playAlarmBeep();
      }, 500);
    }
  };

  // Cancel countdown
  const handleCancelCountdown = () => {
    setIsCancelled(true);
    setCountdown(null);
    if (alarmIntervalRef.current) {
      clearInterval(alarmIntervalRef.current);
      alarmIntervalRef.current = null;
    }
    speakVoice("Emergency SOS Canceled. System standing down.");
  };

  // Instant Manual Trigger
  const handleManualTrigger = () => {
    if (!isAlertTriggered) {
      triggerFinalAlert();
    }
  };

  // Reset sequence
  const handleReset = () => {
    if (alarmIntervalRef.current) {
      clearInterval(alarmIntervalRef.current);
      alarmIntervalRef.current = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsAlertTriggered(false);
    setIsCancelled(false);
    setCountdown(3);
  };

  return (
    <main className="relative min-h-screen w-full bg-[#160205] text-white flex flex-col items-center justify-between p-4 md:p-8 overflow-hidden select-none font-sans">
      {/* Background Animated Hazard Strobe & Ambient Glow */}
      <motion.div
        animate={{
          opacity: isAlertTriggered ? [0.65, 0.95, 0.65] : [0.35, 0.55, 0.35],
          scale: [1, 1.05, 1],
        }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(255,20,40,0.55)_0%,rgba(60,0,10,0.85)_65%,rgba(10,0,2,0.98)_100%)]"
      />

      {/* Top Hazard Bar */}
      <div className="absolute top-0 left-0 right-0 h-3 bg-[repeating-linear-gradient(45deg,#ffcc00,#ffcc00_15px,#111_15px,#111_30px)] shadow-[0_0_20px_rgba(255,40,60,0.8)] z-20" />

      {/* Header Bar */}
      <header className="relative z-10 w-full max-w-6xl flex items-center justify-between pt-3 pb-2 border-b border-red-500/30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-red-600/30 border border-red-400 flex items-center justify-center text-xl shadow-[0_0_15px_rgba(255,30,60,0.8)]">
            🚨
          </div>
          <div>
            <span className="text-xs font-mono font-bold tracking-widest text-amber-400 uppercase">
              RAASTA.AI • ASIL-D FAIL-SAFE INTERVENTION
            </span>
            <h1 className="text-xl md:text-2xl font-black text-white tracking-wide">
              EMERGENCY SOS SYSTEM
            </h1>
          </div>
        </div>

        {/* Audio Mute & Simulator Return */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="px-3 py-1.5 rounded-lg border border-red-500/40 bg-red-950/60 hover:bg-red-900/80 text-xs font-mono transition-colors"
            title="Toggle Emergency Siren Audio"
          >
            {soundEnabled ? '🔊 Audio ON' : '🔇 Audio Muted'}
          </button>
          <Link
            href="/#simulator"
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/30 text-xs font-mono font-bold text-white transition-all shadow-md hover:scale-105"
          >
            <span>←</span> Return to Simulator
          </Link>
        </div>
      </header>

      {/* Centerpiece: Countdown OR Massive Pulsating SOS Button */}
      <section className="relative z-10 my-auto flex flex-col items-center justify-center w-full max-w-2xl py-6">
        {/* Countdown Alert Banner */}
        <AnimatePresence>
          {countdown !== null && countdown > 0 && !isCancelled && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="mb-8 w-full bg-red-950/90 border-2 border-red-500 rounded-2xl p-5 text-center shadow-[0_0_40px_rgba(255,40,40,0.6)] backdrop-blur-md"
            >
              <span className="inline-block px-3 py-1 mb-2 text-xs font-mono font-black uppercase tracking-wider bg-red-600 text-white rounded-full animate-pulse">
                CRITICAL WARNING: BROADCAST IMMINENT
              </span>
              <p className="text-sm md:text-base text-red-200 font-medium">
                Dispatching Hardware E-Brake & High-Priority C-V2X Packet in:
              </p>
              <div className="text-6xl md:text-7xl font-mono font-black text-amber-300 my-2 tracking-tighter drop-shadow-[0_0_25px_rgba(255,200,0,0.8)]">
                00:0{countdown}
              </div>
              <div className="flex items-center justify-center gap-4 mt-3">
                <button
                  onClick={handleCancelCountdown}
                  className="px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-mono font-black text-sm uppercase tracking-wider shadow-[0_0_25px_rgba(255,200,0,0.6)] hover:scale-105 transition-all"
                >
                  ✕ CANCEL COUNTDOWN
                </button>
                <button
                  onClick={handleManualTrigger}
                  className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-mono font-bold text-sm uppercase tracking-wider shadow-[0_0_25px_rgba(255,40,40,0.8)] hover:scale-105 transition-all"
                >
                  ⚡ TRIGGER NOW
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Cancellation Message */}
        {isCancelled && !isAlertTriggered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 w-full bg-slate-900/90 border border-amber-400/50 rounded-2xl p-5 text-center shadow-lg"
          >
            <span className="text-2xl">⚠️</span>
            <h3 className="text-lg font-bold text-amber-300 mt-1">EMERGENCY SOS CANCELLED</h3>
            <p className="text-xs text-slate-300 font-mono mt-1">
              Vehicle autonomous controls restored to nominal state.
            </p>
            <div className="flex justify-center gap-3 mt-4">
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-red-600/80 hover:bg-red-600 rounded-lg text-xs font-mono font-bold text-white transition-all"
              >
                ↺ Arm Countdown Again
              </button>
              <Link
                href="/#simulator"
                className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-mono font-bold text-white transition-all"
              >
                Return to Simulator →
              </Link>
            </div>
          </motion.div>
        )}

        {/* MASSIVE PULSATING EMERGENCY SOS BUTTON */}
        <div className="relative flex items-center justify-center p-8">
          {/* Concentric Expanding Ripple Rings */}
          <motion.div
            animate={{
              scale: [1, 2.1],
              opacity: [0.8, 0],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: 'easeOut',
            }}
            className="absolute w-64 h-64 md:w-80 md:h-80 rounded-full border-4 border-red-500 pointer-events-none"
          />
          <motion.div
            animate={{
              scale: [1, 1.7],
              opacity: [0.9, 0],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: 'easeOut',
              delay: 0.7,
            }}
            className="absolute w-64 h-64 md:w-80 md:h-80 rounded-full border-2 border-amber-400 pointer-events-none"
          />

          {/* Glowing Ambient Backdrop Halo */}
          <div className="absolute w-72 h-72 md:w-96 md:h-96 rounded-full bg-red-600/30 blur-3xl pointer-events-none animate-pulse" />

          {/* The Massive Button */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleManualTrigger}
            className={`relative w-56 h-56 md:w-72 md:h-72 rounded-full flex flex-col items-center justify-center text-center shadow-[0_0_60px_rgba(255,20,40,0.9),inset_0_0_35px_rgba(255,255,255,0.4)] border-4 transition-all duration-300 z-10 ${
              isAlertTriggered
                ? 'bg-gradient-to-b from-red-600 via-red-700 to-rose-950 border-amber-300 ring-8 ring-red-500/50'
                : 'bg-gradient-to-b from-red-500 via-red-600 to-red-950 border-white ring-8 ring-red-600/30 hover:ring-red-500/60 cursor-pointer'
            }`}
          >
            <span className="text-4xl md:text-5xl mb-1 animate-bounce">🚨</span>
            <span className="text-2xl md:text-3xl font-black tracking-wider uppercase text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
              EMERGENCY
            </span>
            <span className="text-3xl md:text-4xl font-black tracking-widest text-amber-300 drop-shadow-[0_2px_12px_rgba(255,200,0,0.8)]">
              SOS
            </span>
            <span className="mt-2 text-[10px] md:text-xs font-mono font-bold tracking-widest text-red-200 uppercase bg-black/40 px-3 py-0.5 rounded-full border border-red-400/40">
              {isAlertTriggered ? '● ALERT DISPATCHED' : 'PRESS TO TRANSMIT'}
            </span>
          </motion.button>
        </div>
      </section>

      {/* LIVE STATUS INDICATOR BOX */}
      <section className="relative z-10 w-full max-w-4xl bg-black/75 border border-red-500/40 rounded-2xl p-5 backdrop-blur-xl shadow-[0_0_35px_rgba(255,30,50,0.35)] mb-4">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-red-500/20">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <span className="font-mono text-xs md:text-sm font-bold text-emerald-400 uppercase tracking-wide">
              {isAlertTriggered
                ? 'LOCATION SENT TO EMERGENCY CONTACTS'
                : 'LOCATION MONITORING ACTIVE • READY FOR DISPATCH'}
            </span>
          </div>
          <div className="font-mono text-xs text-amber-300">
            TIMESTAMP: <span className="text-white font-bold">{currentTime}</span>
          </div>
        </div>

        {/* Telemetry & GPS Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 text-xs font-mono">
          <div className="space-y-2 bg-red-950/40 p-3.5 rounded-xl border border-red-500/20">
            <div className="text-amber-400 font-bold tracking-wider uppercase text-[11px]">
              📍 SIMULATED GPS TELEMETRY
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">LATITUDE:</span>
              <span className="text-white font-bold">{gpsData.latitude}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">LONGITUDE:</span>
              <span className="text-white font-bold">{gpsData.longitude}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">ALTITUDE / ACCURACY:</span>
              <span className="text-emerald-400">{gpsData.altitude} ({gpsData.accuracy})</span>
            </div>
            <div className="text-slate-300 pt-1 text-[11px]">
              ROADWAY: <strong className="text-white">{gpsData.corridor}</strong>
            </div>
          </div>

          <div className="space-y-2 bg-red-950/40 p-3.5 rounded-xl border border-red-500/20">
            <div className="text-cyan-400 font-bold tracking-wider uppercase text-[11px]">
              📡 DISPATCH TARGETS & PROTOCOL
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">CARRIER:</span>
              <span className="text-white">5G NR C-V2X + NavIC Satellite</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">SATELLITE FIX:</span>
              <span className="text-emerald-400 font-bold">{gpsData.satellites}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">CAN-BUS STATUS:</span>
              <span className="text-amber-300 font-bold">HYDRAULIC E-BRAKE LOCKED (100%)</span>
            </div>
            <div className="text-slate-300 pt-1 text-[11px]">
              CONTACTS: <strong className="text-white">{gpsData.emergencyContact}</strong>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-3 border-t border-red-500/20">
          <button
            onClick={() => speakVoice("Emergency SOS Sent! Location confirmed on NH-48.")}
            className="px-3.5 py-1.5 rounded-lg bg-red-900/60 hover:bg-red-800 border border-red-400/30 text-xs font-mono text-red-200 transition-colors"
          >
            🔊 Replay Voice Dispatch
          </button>
          <div className="flex items-center gap-3">
            <button
              onClick={handleReset}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono font-bold text-white transition-colors"
            >
              ↺ Reset System
            </button>
            <Link
              href="/#simulator"
              className="px-5 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-xs font-mono font-bold text-black transition-all shadow-[0_0_20px_rgba(0,240,255,0.4)]"
            >
              Return to Simulator →
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom Hazard Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-3 bg-[repeating-linear-gradient(45deg,#ffcc00,#ffcc00_15px,#111_15px,#111_30px)] shadow-[0_0_20px_rgba(255,40,60,0.8)] z-20" />
    </main>
  );
}
