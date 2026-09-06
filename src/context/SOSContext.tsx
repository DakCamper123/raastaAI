'use client';

/**
 * NavDrishti - Emergency SOS State Machine & Audio Engine Context
 */

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { SOSState, CV2XEmergencyPacket } from '@/types/emergency';
import { generateCV2XPacket } from '@/data/telemetry';
import { NH48_GPS_COORDINATES } from '@/lib/constants';

interface SOSContextValue {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  sosState: SOSState;
  startSOSCountdown: () => void;
  triggerImmediateSOS: () => void;
  abortCountdown: () => void;
  resetSOS: () => void;
  speakMessage: (text: string) => void;
}

const SOSContext = createContext<SOSContextValue | undefined>(undefined);

export function SOSProvider({ children }: { children: React.ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sosState, setSosState] = useState<SOSState>({
    status: 'IDLE',
    countdownSeconds: 3,
    isSirenActive: false,
    isVoiceActive: false,
    lastDispatchedAt: null,
    packetsLog: [],
    coordinates: {
      lat: NH48_GPS_COORDINATES.LATITUDE,
      lng: NH48_GPS_COORDINATES.LONGITUDE,
      accuracyCm: NH48_GPS_COORDINATES.ACCURACY_CM,
      locationName: NH48_GPS_COORDINATES.CORRIDOR,
    },
  });

  const countdownTimerRef = useRef<NodeJS.Timeout | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const sirenOscillatorRef = useRef<OscillatorNode | null>(null);

  // Web Speech API Alert
  const speakMessage = useCallback((text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1.05;
        utterance.pitch = 1.0;
        utterance.volume = 1.0;
        window.speechSynthesis.speak(utterance);
      } catch (e) {
        console.warn('Speech synthesis error:', e);
      }
    }
  }, []);

  // Web Audio Siren Generator (800Hz / 1200Hz alternating alarm)
  const startSirenAudio = useCallback(() => {
    if (typeof window === 'undefined') return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;

      if (!audioContextRef.current) {
        audioContextRef.current = new AudioCtx();
      }
      if (audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume();
      }

      if (sirenOscillatorRef.current) {
        sirenOscillatorRef.current.stop();
        sirenOscillatorRef.current.disconnect();
      }

      const osc = audioContextRef.current.createOscillator();
      const gain = audioContextRef.current.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(800, audioContextRef.current.currentTime);

      // Modulate frequency between 800Hz and 1200Hz
      const now = audioContextRef.current.currentTime;
      for (let i = 0; i < 20; i++) {
        osc.frequency.setValueAtTime(800, now + i * 0.4);
        osc.frequency.setValueAtTime(1200, now + i * 0.4 + 0.2);
      }

      gain.gain.setValueAtTime(0.08, now);
      osc.connect(gain);
      gain.connect(audioContextRef.current.destination);

      osc.start();
      sirenOscillatorRef.current = osc;
    } catch (e) {
      console.warn('Web Audio Siren unavailable:', e);
    }
  }, []);

  const stopSirenAudio = useCallback(() => {
    if (sirenOscillatorRef.current) {
      try {
        sirenOscillatorRef.current.stop();
        sirenOscillatorRef.current.disconnect();
      } catch {}
      sirenOscillatorRef.current = null;
    }
  }, []);

  // Trigger Final Dispatched Alert
  const triggerImmediateSOS = useCallback(() => {
    if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);

    const nowStr = new Date().toLocaleTimeString('en-IN', { hour12: false });
    const newPacket = generateCV2XPacket(0);

    setSosState((prev) => ({
      ...prev,
      status: 'DISPATCHED',
      countdownSeconds: 0,
      isSirenActive: true,
      lastDispatchedAt: nowStr,
      packetsLog: [newPacket, ...prev.packetsLog.slice(0, 19)],
    }));

    startSirenAudio();
    speakMessage('Emergency stop initiated. All systems halting. Location and telemetry transmitted to emergency response.');
  }, [speakMessage, startSirenAudio]);

  // Start 3-Second Abortable Countdown
  const startSOSCountdown = useCallback(() => {
    if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);

    setSosState((prev) => ({
      ...prev,
      status: 'COUNTDOWN',
      countdownSeconds: 3,
    }));

    countdownTimerRef.current = setInterval(() => {
      setSosState((prev) => {
        if (prev.status !== 'COUNTDOWN') return prev;
        if (prev.countdownSeconds <= 1) {
          if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
          // Trigger alert on timer zero
          setTimeout(() => triggerImmediateSOS(), 10);
          return { ...prev, countdownSeconds: 0 };
        }
        return { ...prev, countdownSeconds: prev.countdownSeconds - 1 };
      });
    }, 1000);
  }, [triggerImmediateSOS]);

  // Abort Countdown
  const abortCountdown = useCallback(() => {
    if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
    stopSirenAudio();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setSosState((prev) => ({
      ...prev,
      status: 'ABORTED',
      countdownSeconds: 3,
      isSirenActive: false,
    }));
  }, [stopSirenAudio]);

  // Full Reset
  const resetSOS = useCallback(() => {
    abortCountdown();
    setSosState((prev) => ({
      ...prev,
      status: 'IDLE',
      countdownSeconds: 3,
      isSirenActive: false,
    }));
  }, [abortCountdown]);

  const openModal = useCallback(() => {
    setIsModalOpen(true);
    startSOSCountdown();
  }, [startSOSCountdown]);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    abortCountdown();
  }, [abortCountdown]);

  // Global Keyboard Shortcut: Ctrl + Shift + E opens SOS
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && (e.key === 'E' || e.key === 'e')) {
        e.preventDefault();
        openModal();
      } else if (e.key === 'Escape' && isModalOpen) {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, openModal, closeModal]);

  return (
    <SOSContext.Provider
      value={{
        isModalOpen,
        openModal,
        closeModal,
        sosState,
        startSOSCountdown,
        triggerImmediateSOS,
        abortCountdown,
        resetSOS,
        speakMessage,
      }}
    >
      {children}
    </SOSContext.Provider>
  );
}

export function useSOSContext() {
  const ctx = useContext(SOSContext);
  if (!ctx) {
    throw new Error('useSOSContext must be used within SOSProvider');
  }
  return ctx;
}
