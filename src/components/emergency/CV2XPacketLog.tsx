'use client';

/**
 * RAASTA.AI - CV2XPacketLog Component
 * Scrolling terminal log displaying 3GPP Release 17 URLLC emergency broadcast packets.
 */

import React from 'react';
import { useSOSContext } from '@/context/SOSContext';
import { Radio } from 'lucide-react';

export function CV2XPacketLog() {
  const { sosState } = useSOSContext();
  const packets = sosState.packetsLog;

  return (
    <div className="flex flex-col gap-2 font-mono text-xs w-full">
      <div className="flex items-center justify-between text-[11px] text-[var(--accent-cyan)] font-bold">
        <span className="flex items-center gap-1.5">
          <Radio className="w-3.5 h-3.5 animate-pulse" />
          5G NR C-V2X PACKET LOG (BAND n78)
        </span>
        <span className="text-[10px] text-[var(--text-muted)]">3GPP REL-17 URLLC</span>
      </div>

      <div className="h-36 w-full rounded-lg border border-[var(--border-subtle)] bg-black/80 p-3 overflow-y-auto text-[11px] flex flex-col gap-1.5 shadow-inner">
        {packets.length === 0 ? (
          <div className="text-[var(--text-muted)] italic py-2">
            No emergency packets transmitted. System armed and ready on Band n78...
          </div>
        ) : (
          packets.map((pkt) => (
            <div key={pkt.id} className="flex flex-col border-b border-white/5 pb-1 text-[var(--text-secondary)]">
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-[var(--danger-red)] font-bold">{pkt.id}</span>
                <span className="text-[var(--accent-amber)]">{pkt.timestamp}</span>
              </div>
              <div className="text-[10px] text-white">
                STATION: {pkt.stationId} | PRIORITY: {pkt.priorityLevel}
              </div>
              <div className="text-[9px] text-[var(--text-muted)]">
                LOC: {pkt.latitude.toFixed(5)}°N, {pkt.longitude.toFixed(5)}°E | DECEL: {pkt.brakeDecelMs2} m/s² | CRC: {pkt.crcStatus}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
