'use client';

/**
 * NavDrishti - ScenarioTable Component
 * Responsive comparison data table breaking down the 5 Indian road edge scenarios.
 */

import React from 'react';
import Link from 'next/link';
import { SCENARIOS } from '@/data/scenarios';
import { Play, AlertTriangle } from 'lucide-react';

export function ScenarioTable() {
  return (
    <div className="w-full overflow-x-auto rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-glass)] backdrop-blur-md">
      <table className="w-full text-left font-mono text-xs border-collapse">
        <thead>
          <tr className="border-b border-[var(--border-subtle)] bg-[var(--bg-secondary)] text-[var(--text-muted)] text-[11px] uppercase tracking-wider">
            <th className="py-3 px-4">#</th>
            <th className="py-3 px-4">Scenario Name</th>
            <th className="py-3 px-4">Threat Profile</th>
            <th className="py-3 px-4">Mitigation Strategy</th>
            <th className="py-3 px-4 text-center">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--border-subtle)]/60 text-[var(--text-secondary)] font-body">
          {SCENARIOS.map((sc) => (
            <tr key={sc.id} className="hover:bg-[var(--surface-glass)] transition-colors">
              <td className="py-3.5 px-4 font-mono font-bold text-[var(--accent-cyan)]">
                {sc.id}
              </td>
              <td className="py-3.5 px-4">
                <div className="flex flex-col">
                  <span className="font-display font-bold text-sm text-[var(--text-primary)]">
                    {sc.title}
                  </span>
                  <span className="font-mono text-[10px] text-[var(--text-muted)]">
                    {sc.location}
                  </span>
                </div>
              </td>
              <td className="py-3.5 px-4 max-w-xs text-xs">
                <div className="flex items-start gap-1.5">
                  <AlertTriangle className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${sc.severity === 'CRITICAL' ? 'text-[var(--danger-red)]' : 'text-[var(--accent-amber)]'}`} />
                  <span>{sc.threatProfile}</span>
                </div>
              </td>
              <td className="py-3.5 px-4 max-w-sm text-xs leading-relaxed">
                {sc.mitigationStrategy}
              </td>
              <td className="py-3.5 px-4 text-center">
                <Link
                  href={`/dashboard?scenario=${sc.id}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--accent-cyan)] bg-[var(--accent-cyan)]/15 text-[var(--accent-cyan)] font-mono font-bold text-[11px] hover:bg-[var(--accent-cyan)] hover:text-black transition-all duration-200"
                >
                  <Play className="w-3 h-3 fill-current" />
                  Simulate
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
