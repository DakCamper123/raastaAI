'use client';

/**
 * RAASTA.AI - DashboardLayout Component
 * High-level layout wrapper providing responsive drawer management and floating action buttons.
 */

import React from 'react';
import { PanelGrid } from './PanelGrid';
import { usePanelState, DrawerType } from '@/hooks/usePanelState';
import { useResponsiveLayout } from '@/hooks/useResponsiveLayout';
import { CollapsibleDrawer } from './CollapsibleDrawer';
import { SOSModal } from '@/components/emergency/SOSModal';
import { useSOSProtocol } from '@/hooks/useSOSProtocol';
import { Activity, Radio, Sliders, Layers, AlertOctagon } from 'lucide-react';

interface DashboardLayoutProps {
  sidebar: React.ReactNode;
  canvas: React.ReactNode;
  metrics: React.ReactNode;
  controls: React.ReactNode;
  feeds: React.ReactNode;
}

export function DashboardLayout({
  sidebar,
  canvas,
  metrics,
  controls,
  feeds,
}: DashboardLayoutProps) {
  const { isMobile } = useResponsiveLayout();
  const { activeDrawer, openDrawer, closeDrawer } = usePanelState();
  const { triggerEmergency } = useSOSProtocol();

  return (
    <div className="relative w-full min-h-[calc(100vh-105px)] bg-[var(--bg-primary)]">
      {/* Grid Layout Shell */}
      <PanelGrid
        sidebar={sidebar}
        canvas={canvas}
        metrics={metrics}
        controls={controls}
        feeds={feeds}
      />

      {/* Mobile Floating Action Buttons (FABs) */}
      {isMobile && (
        <div className="fixed bottom-4 right-4 z-30 flex flex-col gap-2.5">
          <button
            onClick={() => openDrawer('metrics')}
            className="p-3 rounded-full bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] text-[var(--accent-cyan)] shadow-lg hover:shadow-cyan-glow"
            title="Open Telemetry Metrics"
            aria-label="Open Telemetry Metrics"
          >
            <Activity className="w-5 h-5" />
          </button>
          <button
            onClick={() => openDrawer('controls')}
            className="p-3 rounded-full bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] text-[var(--accent-amber)] shadow-lg hover:shadow-amber-glow"
            title="Open Controls"
            aria-label="Open Controls"
          >
            <Sliders className="w-5 h-5" />
          </button>
          <button
            onClick={() => openDrawer('scenarios')}
            className="p-3 rounded-full bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] text-[var(--text-primary)] shadow-lg"
            title="Open Scenarios"
            aria-label="Open Scenarios"
          >
            <Layers className="w-5 h-5" />
          </button>
          <button
            onClick={triggerEmergency}
            className="p-3 rounded-full bg-[var(--danger-red)] text-white shadow-[0_0_15px_rgba(255,51,85,0.7)] animate-pulse"
            title="Trigger Emergency SOS"
            aria-label="Trigger Emergency SOS"
          >
            <AlertOctagon className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Collapsible Drawers for Mobile Mode */}
      <CollapsibleDrawer
        isOpen={activeDrawer === 'metrics'}
        onClose={closeDrawer}
        title="Live CAN-Bus Telemetry"
      >
        {metrics}
      </CollapsibleDrawer>

      <CollapsibleDrawer
        isOpen={activeDrawer === 'controls'}
        onClose={closeDrawer}
        title="Simulation & Planner Controls"
      >
        {controls}
      </CollapsibleDrawer>

      <CollapsibleDrawer
        isOpen={activeDrawer === 'scenarios'}
        onClose={closeDrawer}
        title="Select Edge Corridor"
      >
        {sidebar}
      </CollapsibleDrawer>

      <CollapsibleDrawer
        isOpen={activeDrawer === 'feeds'}
        onClose={closeDrawer}
        title="Sensor Feeds & Perception"
      >
        {feeds}
      </CollapsibleDrawer>

      {/* Global In-Page Emergency SOS Modal */}
      <SOSModal />
    </div>
  );
}
