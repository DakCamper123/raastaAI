'use client';

/**
 * RAASTA.AI - VoiceSiren Component
 * Status monitor and manual trigger for the dual-frequency siren and speech alert.
 */

import React from 'react';
import { useSOSContext } from '@/context/SOSContext';
import { Volume2, VolumeX, Radio } from 'lucide-react';

export function VoiceSiren() {
  const { sosState, speakMessage } = useSOSContext();

  return (
    <div className="flex items-center justify-between p-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-secondary)] font-mono text-xs">
      <div className="flex items-center gap-2">
        {sosState.isSirenActive ? (
          <div className="p-2 rounded-full bg-[var(--danger-red)]/20 text-[var(--danger-red)] animate-pulse">
            <Volume2 className="w-5 h-5" />
          </div>
        ) : (
          <div className="p-2 rounded-full bg-[var(--border-subtle)] text-[var(--text-muted)]">
            <VolumeX className="w-5 h-5" />
          </div>
        )}
        <div className="flex flex-col">
          <span className="font-bold text-[var(--text-primary)]">
            {sosState.isSirenActive ? 'DUAL-FREQUENCY SIREN: ACTIVE' : 'ACOUSTIC SIREN: STANDBY'}
          </span>
          <span className="text-[10px] text-[var(--text-muted)]">
            800 Hz / 1200 Hz Alternating + Web Speech Synthesizer
          </span>
        </div>
      </div>

      <button
        onClick={() => speakMessage('Emergency SOS alert test. Voice synthesizer online.')}
        className="px-2.5 py-1 rounded bg-[var(--surface-glass)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-[10px]"
        title="Test speech synthesis"
      >
        Test Voice
      </button>
    </div>
  );
}
