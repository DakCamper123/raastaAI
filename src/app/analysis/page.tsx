'use client';

/**
 * RAASTA.AI - Car Condition & Analysis Center
 * Full diagnostic telemetry, battery health, ASIL-D braking metrics, multi-format report exporter,
 * and Supabase cloud persistence for historical vehicle analysis snapshots.
 */

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { CURRENT_VEHICLE_CONDITION, generateTelemetryCSV, CarDiagnosticData } from '@/data/carAnalysis';
import {
  AnalysisHistoryItem,
  fetchAnalysisHistory,
  saveAnalysisSnapshot,
  deleteAnalysisSnapshot,
} from '@/lib/analysisHistory';
import { GlassCard } from '@/components/ui/GlassCard';
import { GlowButton } from '@/components/ui/GlowButton';
import {
  Car,
  BatteryCharging,
  ShieldCheck,
  Activity,
  Gauge,
  Cpu,
  FileSpreadsheet,
  FileCode,
  Printer,
  Lock,
  Sparkles,
  Radio,
  CheckCircle2,
  HardDrive,
  Sliders,
  History,
  Save,
  Trash2,
  Eye,
  RotateCcw,
  Clock,
  FileText,
  Cloud,
} from 'lucide-react';
import { generateCarDiagnosticPDF } from '@/lib/pdfGenerator';

export default function CarAnalysisPage() {
  const { user, isAuthenticated, openAuthModal } = useAuth();
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);
  const [history, setHistory] = useState<AnalysisHistoryItem[]>([]);
  const [selectedSnapshot, setSelectedSnapshot] = useState<AnalysisHistoryItem | null>(null);
  const [isSavingSnapshot, setIsSavingSnapshot] = useState(false);

  // Active vehicle diagnostic payload (either historical selection or current real-time)
  const vehicle: CarDiagnosticData = selectedSnapshot
    ? selectedSnapshot.diagnostics_payload
    : CURRENT_VEHICLE_CONDITION;

  // Load previous analysis snapshots on mount or user change
  useEffect(() => {
    fetchAnalysisHistory(user?.id).then((items) => {
      setHistory(items);
    });
  }, [user?.id]);

  const triggerNotice = (msg: string) => {
    setDownloadSuccess(msg);
    setTimeout(() => setDownloadSuccess(null), 4500);
  };

  // Helper: Persist snapshot and optional PDF to cloud/local history
  const persistCurrentState = async (customTitle?: string, pdfBlob?: Blob) => {
    const title =
      customTitle ||
      `Analysis Snapshot - ${new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })} IST`;

    const saved = await saveAnalysisSnapshot(
      {
        title,
        diagnostics: CURRENT_VEHICLE_CONDITION,
        pdfBlob,
        telemetryStats: {
          speedKmh: 42.4,
          steerDeg: 2.1,
          latAccel: 0.34,
          batterySoC: CURRENT_VEHICLE_CONDITION.battery.socPercent,
          batteryTemp: CURRENT_VEHICLE_CONDITION.battery.avgTempCelsius,
          packVoltage: CURRENT_VEHICLE_CONDITION.battery.packVoltage,
          brakePressure: CURRENT_VEHICLE_CONDITION.brakesAndSafety.primaryPressureBar,
          frictionMu: CURRENT_VEHICLE_CONDITION.chassisAndTraction.frictionCoefficientMu,
          rtkPrecisionCm: CURRENT_VEHICLE_CONDITION.sensorsCalibration.gnssPrecisionCm,
        },
        feedStats: {
          lidar: CURRENT_VEHICLE_CONDITION.sensorsCalibration.lidarPointsSec,
          cameraMtf: CURRENT_VEHICLE_CONDITION.sensorsCalibration.cameraMtfSharpness,
          radarSnr: CURRENT_VEHICLE_CONDITION.sensorsCalibration.radarSnrDb,
          rtkSatellites: CURRENT_VEHICLE_CONDITION.sensorsCalibration.gnssSatellites,
        },
      },
      user?.id
    );

    setHistory((prev) => [saved, ...prev.filter((p) => p.id !== saved.id)]);
    return saved;
  };

  // 1. Download JSON & persist snapshot
  const handleDownloadJSON = async () => {
    if (!isAuthenticated) {
      openAuthModal('signup', 'Sign in or create a free account to export raw CAN-bus vehicle telemetry.');
      return;
    }

    // Persist snapshot to history
    await persistCurrentState('CAN-Bus Telemetry JSON Export');

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(vehicle, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `RaastaAI_Vehicle_Analysis_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    triggerNotice('CAN-Bus Telemetry JSON Exported & Saved to History');
  };

  // 2. Download CSV & persist snapshot
  const handleDownloadCSV = async () => {
    if (!isAuthenticated) {
      openAuthModal('signup', 'Sign in or create a free account to download the vehicle dynamics CSV dataset.');
      return;
    }

    await persistCurrentState('Dynamics CSV Timeseries Export');

    const csvContent = generateTelemetryCSV();
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `RaastaAI_Dynamics_Log_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    triggerNotice('Dynamics CSV Exported & Saved to History');
  };

  // 3. Generate real PDF, upload to Supabase Storage, and trigger download
  const handleDownloadPDF = async () => {
    if (!isAuthenticated) {
      openAuthModal('signup', 'Sign in or create a free account to download the complete diagnostic PDF and save it to Supabase.');
      return;
    }

    const { doc, blob, filename } = generateCarDiagnosticPDF(vehicle, 'VEHICLE CONDITION & TELEMETRY DIAGNOSTIC DOSSIER');

    // Save to user's device
    doc.save(filename);

    // Save all stats and PDF to Supabase Storage & Database
    await persistCurrentState('Automotive Engineering PDF Dossier', blob);
    triggerNotice('PDF Downloaded & Backed Up to Supabase Storage');
  };

  // 4. Explicit Save Snapshot action (saves all stats & PDF to Supabase)
  const handleManualSaveSnapshot = async () => {
    if (!isAuthenticated) {
      openAuthModal('signup', 'Sign in or create a free account to save vehicle condition snapshots and PDFs to cloud history.');
      return;
    }

    setIsSavingSnapshot(true);
    const { blob } = generateCarDiagnosticPDF(CURRENT_VEHICLE_CONDITION);
    await persistCurrentState(undefined, blob);
    setIsSavingSnapshot(false);
    triggerNotice('Current Vehicle Condition Stats & PDF Saved to Supabase');
  };

  // 5. Delete historical snapshot
  const handleDeleteSnapshot = async (id: string, e: React.MouseEvent, pdfUrl?: string | null) => {
    e.stopPropagation();
    await deleteAnalysisSnapshot(id, user?.id, pdfUrl);
    setHistory((prev) => prev.filter((item) => item.id !== id));
    if (selectedSnapshot?.id === id) {
      setSelectedSnapshot(null);
    }
    triggerNotice('Previous snapshot removed from history');
  };

  return (
    <div className="w-full min-h-screen bg-[var(--bg-primary)] p-4 sm:p-6 lg:p-8 font-mono">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        {/* Historical Snapshot Inspection Alert Banner */}
        {selectedSnapshot && (
          <div className="p-4 rounded-xl border border-[var(--accent-amber)] bg-[var(--accent-amber)]/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-amber-glow animate-fadeIn">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-[var(--accent-amber)] shrink-0" />
              <div className="flex flex-col">
                <span className="text-sm font-bold text-[var(--text-primary)]">
                  INSPECTING HISTORICAL SNAPSHOT: {selectedSnapshot.title}
                </span>
                <span className="text-xs text-[var(--text-secondary)]">
                  Recorded on: {new Date(selectedSnapshot.created_at).toLocaleString()} • Health Index:{' '}
                  <strong className="text-[var(--success-green)]">{selectedSnapshot.health_index}%</strong>
                </span>
              </div>
            </div>

            <GlowButton
              variant="amber"
              size="sm"
              onClick={() => setSelectedSnapshot(null)}
              icon={<RotateCcw className="w-4 h-4" />}
            >
              Return to Live Vehicle Stream
            </GlowButton>
          </div>
        )}

        {/* Top Header Card */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-glass)] backdrop-blur-xl shadow-[0_0_30px_rgba(0,240,255,0.06)]">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-[var(--accent-cyan)]/15 text-[var(--accent-cyan)] border border-[var(--accent-cyan)]/30">
                <Car className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-display font-black text-xl sm:text-2xl text-[var(--text-primary)] tracking-tight">
                    VEHICLE CONDITION & TELEMETRY ANALYSIS
                  </h1>
                  <span className="hidden sm:inline px-2 py-0.5 rounded text-[10px] bg-[var(--success-green)]/15 text-[var(--success-green)] border border-[var(--success-green)]/30 font-bold">
                    ASIL-D CERTIFIED
                  </span>
                </div>
                <p className="text-xs text-[var(--text-secondary)]">
                  Chassis VIN: <strong className="text-[var(--accent-cyan)]">{vehicle.vehicle.chassisVin}</strong> • Platform: {vehicle.vehicle.model}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Health Meter & Download Action Bar */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="px-4 py-2 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] flex items-center gap-3">
              <div className="flex flex-col text-right">
                <span className="text-[10px] text-[var(--text-muted)] uppercase">Health Index</span>
                <span className="text-base font-bold text-[var(--success-green)]">
                  {vehicle.diagnostics.overallHealthIndex}% NOMINAL
                </span>
              </div>
              <div className="w-8 h-8 rounded-full border border-[var(--success-green)] flex items-center justify-center bg-[var(--success-green)]/15">
                <ShieldCheck className="w-5 h-5 text-[var(--success-green)]" />
              </div>
            </div>

            {/* Main Action Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              <GlowButton
                variant="ghost"
                size="sm"
                onClick={handleManualSaveSnapshot}
                disabled={isSavingSnapshot}
                icon={<Save className="w-4 h-4 text-[var(--accent-cyan)]" />}
                title="Save current snapshot into history database"
              >
                Save Snapshot
              </GlowButton>

              <GlowButton
                variant="cyan"
                size="sm"
                onClick={handleDownloadPDF}
                icon={<Printer className="w-4 h-4" />}
                title="Download Printable HUD Diagnostic Dossier (PDF)"
              >
                Print / Save PDF
              </GlowButton>

              <GlowButton
                variant="amber"
                size="sm"
                onClick={handleDownloadJSON}
                icon={<FileCode className="w-4 h-4" />}
                title="Export Telemetry JSON"
              >
                Export JSON
              </GlowButton>

              <GlowButton
                variant="ghost"
                size="sm"
                onClick={handleDownloadCSV}
                icon={<FileSpreadsheet className="w-4 h-4" />}
                title="Export Dynamics CSV"
              >
                Export CSV
              </GlowButton>
            </div>
          </div>
        </div>

        {/* Notice Banner */}
        {downloadSuccess && (
          <div className="p-3.5 rounded-xl bg-[var(--success-green)]/15 border border-[var(--success-green)]/40 text-[var(--success-green)] text-xs flex items-center gap-2.5 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{downloadSuccess}</span>
          </div>
        )}

        {/* Unauthenticated Access Warning Banner */}
        {!isAuthenticated && (
          <div className="p-4 rounded-xl border border-[var(--accent-cyan)]/40 bg-[var(--accent-cyan)]/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-cyan-glow animate-fadeIn">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[var(--accent-cyan)]/20 text-[var(--accent-cyan)]">
                <Lock className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-sm text-[var(--text-primary)]">
                  Free Account Required to Download Analysis & Unlock Live Telemetry
                </span>
                <span className="text-xs text-[var(--text-secondary)]">
                  Sign in or create your free account in 10 seconds to export complete vehicle dossiers, persist previous snapshots, and access raw sensor streams.
                </span>
              </div>
            </div>

            <GlowButton
              variant="cyan"
              size="sm"
              onClick={() => openAuthModal('signup', 'Sign up for free to download full vehicle condition analysis and telematics datasets.')}
              icon={<Sparkles className="w-4 h-4" />}
              className="shrink-0"
            >
              Sign Up Free (Instant Unlock)
            </GlowButton>
          </div>
        )}

        {/* Diagnostics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Card 1: High-Voltage EV Powertrain & Battery */}
          <GlassCard glow="cyan" className="p-5 flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-2.5">
              <div className="flex items-center gap-2 text-[var(--accent-cyan)] font-bold text-xs">
                <BatteryCharging className="w-4 h-4" />
                <span>HV BATTERY & POWERTRAIN</span>
              </div>
              <span className="text-[10px] text-[var(--success-green)]">OPTIMAL {vehicle.battery.avgTempCelsius}°C</span>
            </div>

            {/* Battery SoC Bar */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-[var(--text-secondary)]">State of Charge (SoC):</span>
                <strong className="text-[var(--accent-cyan)]">{vehicle.battery.socPercent}%</strong>
              </div>
              <div className="w-full h-2.5 rounded-full bg-[var(--bg-primary)] overflow-hidden border border-[var(--border-subtle)]">
                <div
                  className="h-full bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--success-green)] rounded-full transition-all duration-500"
                  style={{ width: `${vehicle.battery.socPercent}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs pt-1">
              <div className="p-2 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-subtle)] flex flex-col">
                <span className="text-[9px] text-[var(--text-muted)]">PACK VOLTAGE</span>
                <span className="font-bold text-[var(--text-primary)]">{vehicle.battery.packVoltage} V</span>
              </div>
              <div className="p-2 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-subtle)] flex flex-col">
                <span className="text-[9px] text-[var(--text-muted)]">CURRENT DRAW</span>
                <span className="font-bold text-[var(--text-primary)]">{vehicle.battery.currentAmps} A</span>
              </div>
              <div className="p-2 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-subtle)] flex flex-col">
                <span className="text-[9px] text-[var(--text-muted)]">CELL DELTA</span>
                <span className="font-bold text-[var(--success-green)]">±{vehicle.battery.cellDeltaVolts} V</span>
              </div>
              <div className="p-2 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-subtle)] flex flex-col">
                <span className="text-[9px] text-[var(--text-muted)]">EST. RANGE</span>
                <span className="font-bold text-[var(--accent-cyan)]">{vehicle.battery.estimatedRangeKm} km</span>
              </div>
            </div>

            <div className="text-[10px] text-[var(--text-muted)] flex items-center justify-between border-t border-[var(--border-subtle)] pt-2">
              <span>Cooling Loop: Glycol Active</span>
              <span className="text-[var(--text-secondary)]">{vehicle.battery.coolingLoopFlowLpm} L/min</span>
            </div>
          </GlassCard>

          {/* Card 2: ASIL-D Redundant Braking & Deceleration */}
          <GlassCard glow="danger" className="p-5 flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-2.5">
              <div className="flex items-center gap-2 text-[var(--danger-red)] font-bold text-xs">
                <Gauge className="w-4 h-4" />
                <span>ASIL-D BRAKE-BY-WIRE</span>
              </div>
              <span className="text-[10px] text-[var(--danger-red)] animate-pulse">ARMED & READY</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-subtle)] flex flex-col">
                <span className="text-[9px] text-[var(--text-muted)]">PRIMARY LINE PRESSURE</span>
                <span className="font-bold text-[var(--text-primary)]">{vehicle.brakesAndSafety.primaryPressureBar} bar</span>
              </div>
              <div className="p-2 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-subtle)] flex flex-col">
                <span className="text-[9px] text-[var(--text-muted)]">SECONDARY FAILSAFE</span>
                <span className="font-bold text-[var(--text-primary)]">{vehicle.brakesAndSafety.secondaryPressureBar} bar</span>
              </div>
            </div>

            {/* Brake Pad Life Remaining */}
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-[var(--text-secondary)]">Front Axle Pad Life:</span>
                  <strong className="text-[var(--text-primary)]">{vehicle.brakesAndSafety.frontPadWearPercent}%</strong>
                </div>
                <div className="w-full h-1.5 rounded-full bg-[var(--bg-primary)] overflow-hidden">
                  <div className="h-full bg-[var(--success-green)] rounded-full" style={{ width: `${vehicle.brakesAndSafety.frontPadWearPercent}%` }} />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-[var(--text-secondary)]">Rear Axle Pad Life:</span>
                  <strong className="text-[var(--text-primary)]">{vehicle.brakesAndSafety.rearPadWearPercent}%</strong>
                </div>
                <div className="w-full h-1.5 rounded-full bg-[var(--bg-primary)] overflow-hidden">
                  <div className="h-full bg-[var(--success-green)] rounded-full" style={{ width: `${vehicle.brakesAndSafety.rearPadWearPercent}%` }} />
                </div>
              </div>
            </div>

            <div className="text-[10px] text-[var(--text-muted)] flex items-center justify-between border-t border-[var(--border-subtle)] pt-2">
              <span>Hardware Intervention Latency:</span>
              <strong className="text-[var(--accent-cyan)]">{vehicle.brakesAndSafety.reactionLatencyMs} ms</strong>
            </div>
          </GlassCard>

          {/* Card 3: Kinodynamics & Tire Traction */}
          <GlassCard glow="amber" className="p-5 flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-2.5">
              <div className="flex items-center gap-2 text-[var(--accent-amber)] font-bold text-xs">
                <Activity className="w-4 h-4" />
                <span>CHASSIS DYNAMICS & TIRES</span>
              </div>
              <span className="text-[10px] text-[var(--accent-amber)]">μ = {vehicle.chassisAndTraction.frictionCoefficientMu}</span>
            </div>

            {/* 4 Tire Pressure Gauges */}
            <div className="flex flex-col gap-1">
              <span className="text-[9px] text-[var(--text-muted)] uppercase">4-Wheel Pressure Status (PSI)</span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 rounded bg-[var(--bg-secondary)] border border-[var(--border-subtle)] flex justify-between">
                  <span className="text-[var(--text-muted)]">FL:</span>
                  <strong className="text-[var(--text-primary)]">{vehicle.chassisAndTraction.tirePressuresPsi.fl} psi</strong>
                </div>
                <div className="p-2 rounded bg-[var(--bg-secondary)] border border-[var(--border-subtle)] flex justify-between">
                  <span className="text-[var(--text-muted)]">FR:</span>
                  <strong className="text-[var(--text-primary)]">{vehicle.chassisAndTraction.tirePressuresPsi.fr} psi</strong>
                </div>
                <div className="p-2 rounded bg-[var(--bg-secondary)] border border-[var(--border-subtle)] flex justify-between">
                  <span className="text-[var(--text-muted)]">RL:</span>
                  <strong className="text-[var(--text-primary)]">{vehicle.chassisAndTraction.tirePressuresPsi.rl} psi</strong>
                </div>
                <div className="p-2 rounded bg-[var(--bg-secondary)] border border-[var(--border-subtle)] flex justify-between">
                  <span className="text-[var(--text-muted)]">RR:</span>
                  <strong className="text-[var(--text-primary)]">{vehicle.chassisAndTraction.tirePressuresPsi.rr} psi</strong>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-subtle)] flex flex-col">
                <span className="text-[9px] text-[var(--text-muted)]">WHEEL SLIP</span>
                <span className="font-bold text-[var(--success-green)]">{vehicle.chassisAndTraction.wheelSlipPercent}% (NOMINAL)</span>
              </div>
              <div className="p-2 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-subtle)] flex flex-col">
                <span className="text-[9px] text-[var(--text-muted)]">STEERING TORQUE</span>
                <span className="font-bold text-[var(--text-primary)]">{vehicle.chassisAndTraction.epsTorqueNm} Nm</span>
              </div>
            </div>

            <div className="text-[10px] text-[var(--text-muted)] border-t border-[var(--border-subtle)] pt-2 truncate">
              Road: {vehicle.chassisAndTraction.roadSurfaceProfile}
            </div>
          </GlassCard>

          {/* Card 4: Sensor Calibration & Perception Health */}
          <GlassCard className="p-5 flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-2.5">
              <div className="flex items-center gap-2 text-[var(--accent-cyan)] font-bold text-xs">
                <Radio className="w-4 h-4" />
                <span>PERCEPTION CALIBRATION</span>
              </div>
              <span className="text-[10px] text-[var(--success-green)]">ALL ONLINE</span>
            </div>

            <div className="flex flex-col gap-2 text-xs">
              <div className="flex items-center justify-between p-2 rounded bg-[var(--bg-secondary)] border border-[var(--border-subtle)]">
                <span className="text-[var(--text-secondary)]">128-Beam Solid LiDAR:</span>
                <strong className="text-[var(--text-primary)]">{vehicle.sensorsCalibration.lidarPointsSec}</strong>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-[var(--bg-secondary)] border border-[var(--border-subtle)]">
                <span className="text-[var(--text-secondary)]">Camera MTF Clarity:</span>
                <strong className="text-[var(--success-green)]">{vehicle.sensorsCalibration.cameraMtfSharpness}% MTF</strong>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-[var(--bg-secondary)] border border-[var(--border-subtle)]">
                <span className="text-[var(--text-secondary)]">4D Radar SNR:</span>
                <strong className="text-[var(--accent-amber)]">{vehicle.sensorsCalibration.radarSnrDb} dB</strong>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-[var(--bg-secondary)] border border-[var(--border-subtle)]">
                <span className="text-[var(--text-secondary)]">RTK Precision:</span>
                <strong className="text-[var(--accent-cyan)]">±{vehicle.sensorsCalibration.gnssPrecisionCm} cm ({vehicle.sensorsCalibration.gnssSatellites} Sats)</strong>
              </div>
            </div>
          </GlassCard>

          {/* Card 5: ISO 14229 / UDS OBD-II Diagnostics */}
          <GlassCard className="p-5 flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-2.5">
              <div className="flex items-center gap-2 text-[var(--success-green)] font-bold text-xs">
                <HardDrive className="w-4 h-4" />
                <span>ISO 14229 UDS / OBD-II</span>
              </div>
              <span className="text-[10px] text-[var(--success-green)]">0 ACTIVE DTCS</span>
            </div>

            <div className="flex flex-col gap-2 text-xs">
              <div className="p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-subtle)] flex items-center justify-between">
                <span className="text-[var(--text-muted)]">CAN-FD Bus Load:</span>
                <strong className="text-[var(--accent-cyan)]">{vehicle.diagnostics.canBusLoadPercent}%</strong>
              </div>

              <div className="p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-subtle)] flex items-center justify-between">
                <span className="text-[var(--text-muted)]">Ethernet Throughput:</span>
                <strong className="text-[var(--text-primary)]">{vehicle.diagnostics.ethernetThroughputMbps} Mbps</strong>
              </div>

              <div className="p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-subtle)] flex items-center justify-between">
                <span className="text-[var(--text-muted)]">ECU Loop Cycle:</span>
                <strong className="text-[var(--success-green)]">{vehicle.vehicle.lastDiagnosticCycle}</strong>
              </div>
            </div>
          </GlassCard>

          {/* Card 6: AI Motion Planning Risk & Safety */}
          <GlassCard className="p-5 flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-2.5">
              <div className="flex items-center gap-2 text-[var(--accent-amber)] font-bold text-xs">
                <Cpu className="w-4 h-4" />
                <span>MOTION PLANNER SAFETY INDEX</span>
              </div>
              <span className="text-[10px] text-[var(--accent-cyan)]">KINODYNAMIC APF</span>
            </div>

            <div className="flex flex-col gap-2.5 text-xs">
              <div className="flex justify-between">
                <span className="text-[var(--text-secondary)]">Collision Risk Probability:</span>
                <strong className="text-[var(--success-green)]">{(vehicle.diagnostics.safetyRiskScore * 100).toFixed(2)}% (SAFE)</strong>
              </div>

              <div className="flex justify-between">
                <span className="text-[var(--text-secondary)]">ECU Firmware:</span>
                <strong className="text-[var(--text-primary)]">{vehicle.vehicle.ecuFirmware}</strong>
              </div>

              <div className="flex justify-between">
                <span className="text-[var(--text-secondary)]">Odometer Recorded:</span>
                <strong className="text-[var(--text-primary)]">{vehicle.vehicle.odometerKm} km</strong>
              </div>

              <div className="p-2.5 rounded bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-[10px] text-[var(--text-muted)]">
                Autonomous motion planner conforms to BharatNav Level 4+ standards with deterministic safety envelopes.
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Previous Vehicle Analysis History Section (Persisted in Supabase & Local Cache) */}
        <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-glass)] backdrop-blur-xl p-6 flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--border-subtle)] pb-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-[var(--accent-cyan)]/15 text-[var(--accent-cyan)]">
                <History className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-display font-bold text-base text-[var(--text-primary)] flex items-center gap-2">
                  <span>PREVIOUS VEHICLE ANALYSIS HISTORY</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[var(--accent-cyan)]/20 text-[var(--accent-cyan)]">
                    {history.length} {history.length === 1 ? 'RECORD' : 'RECORDS'}
                  </span>
                </h2>
                <p className="text-xs text-[var(--text-secondary)]">
                  Persisted in Supabase cloud database & cached locally for fast comparison.
                </p>
              </div>
            </div>

            <GlowButton
              variant="cyan"
              size="sm"
              onClick={handleManualSaveSnapshot}
              disabled={isSavingSnapshot}
              icon={<Save className="w-4 h-4" />}
            >
              {isSavingSnapshot ? 'Saving to Cloud...' : 'Save Current Snapshot'}
            </GlowButton>
          </div>

          {history.length === 0 ? (
            <div className="py-8 flex flex-col items-center justify-center text-center gap-2 text-xs text-[var(--text-muted)]">
              <History className="w-8 h-8 opacity-40 text-[var(--accent-cyan)]" />
              <span>No historical snapshots saved yet.</span>
              <span className="text-[11px] text-[var(--text-secondary)]">
                Click <strong>&quot;Save Current Snapshot&quot;</strong> or export any report above to create your first persistent record.
              </span>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-[var(--border-subtle)] text-[var(--text-muted)] uppercase text-[10px]">
                    <th className="py-2.5 px-3">Title / Drive Cycle</th>
                    <th className="py-2.5 px-3">Recorded At</th>
                    <th className="py-2.5 px-3">Health Index</th>
                    <th className="py-2.5 px-3">Battery SoC</th>
                    <th className="py-2.5 px-3">Brake Pressure</th>
                    <th className="py-2.5 px-3">Friction (μ)</th>
                    <th className="py-2.5 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-subtle)]/40 text-[var(--text-secondary)]">
                  {history.map((item) => {
                    const isCurrentSelection = selectedSnapshot?.id === item.id;
                    return (
                      <tr
                        key={item.id}
                        className={`hover:bg-[var(--surface-glass)] transition-colors ${
                          isCurrentSelection ? 'bg-[var(--accent-amber)]/10 text-[var(--text-primary)]' : ''
                        }`}
                      >
                        <td className="py-3 px-3 font-semibold text-[var(--text-primary)] flex items-center gap-2">
                          {isCurrentSelection && (
                            <span className="w-2 h-2 rounded-full bg-[var(--accent-amber)] animate-pulse" />
                          )}
                          <span className="truncate max-w-[180px]">{item.title}</span>
                          {item.pdf_url && (
                            <span className="px-1.5 py-0.5 rounded text-[8px] bg-[var(--success-green)]/15 text-[var(--success-green)] border border-[var(--success-green)]/30 flex items-center gap-1 font-mono">
                              <Cloud className="w-2.5 h-2.5" /> SUPABASE
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-3 text-[11px] text-[var(--text-muted)]">
                          {new Date(item.created_at).toLocaleString()}
                        </td>
                        <td className="py-3 px-3">
                          <span className="text-[var(--success-green)] font-bold">{item.health_index}%</span>
                        </td>
                        <td className="py-3 px-3 text-[var(--accent-cyan)] font-bold">{item.battery_soc}%</td>
                        <td className="py-3 px-3">{item.brake_pressure} bar</td>
                        <td className="py-3 px-3 text-[var(--accent-amber)] font-bold">{item.friction_mu}</td>
                        <td className="py-3 px-3 text-right">
                          <div className="flex items-center justify-end gap-2">
                            {/* Stored Supabase PDF or on-the-fly PDF download button */}
                            {item.pdf_url ? (
                              <a
                                href={item.pdf_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                download={`RaastaAI_Diagnostic_${item.id}.pdf`}
                                className="flex items-center gap-1 px-2 py-1 rounded bg-[var(--accent-cyan)]/15 text-[var(--accent-cyan)] hover:bg-[var(--accent-cyan)]/25 border border-[var(--accent-cyan)]/30 text-[10px] font-bold transition-all"
                                title="Download PDF stored in Supabase Storage"
                              >
                                <Cloud className="w-3 h-3 text-[var(--accent-cyan)]" /> PDF
                              </a>
                            ) : (
                              <button
                                onClick={() => {
                                  const { doc, filename } = generateCarDiagnosticPDF(item.diagnostics_payload, item.title);
                                  doc.save(filename);
                                }}
                                className="flex items-center gap-1 px-2 py-1 rounded bg-[var(--surface-glass)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-subtle)] text-[10px] font-bold transition-all"
                                title="Generate & Download PDF"
                              >
                                <FileText className="w-3 h-3" /> PDF
                              </button>
                            )}

                            {isCurrentSelection ? (
                              <button
                                onClick={() => setSelectedSnapshot(null)}
                                className="px-2 py-1 rounded bg-[var(--accent-amber)]/20 text-[var(--accent-amber)] border border-[var(--accent-amber)] text-[10px] font-bold"
                              >
                                Active
                              </button>
                            ) : (
                              <button
                                onClick={() => setSelectedSnapshot(item)}
                                className="flex items-center gap-1 px-2 py-1 rounded bg-[var(--accent-cyan)]/15 text-[var(--accent-cyan)] hover:bg-[var(--accent-cyan)]/25 border border-[var(--accent-cyan)]/30 text-[10px] font-bold transition-all"
                                title="Inspect this snapshot in the diagnostic gauges"
                              >
                                <Eye className="w-3 h-3" /> Inspect
                              </button>
                            )}

                            <button
                              onClick={(e) => handleDeleteSnapshot(item.id, e, item.pdf_url)}
                              className="p-1 rounded text-[var(--text-muted)] hover:text-[var(--danger-red)] transition-colors"
                              title="Delete from history"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Detailed Timeseries Telemetry Section (Gated if unauthenticated) */}
        <div className="relative rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-glass)] backdrop-blur-xl p-6 overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Sliders className="w-5 h-5 text-[var(--accent-cyan)]" />
              <h2 className="font-display font-bold text-base text-[var(--text-primary)]">
                LIVE 60 HZ CAN-BUS TELEMATICS STREAM
              </h2>
            </div>
            <span className="text-xs text-[var(--text-muted)] font-mono">
              NH-48 Corridor Stream • Buffer: 1,024 Packets
            </span>
          </div>

          {/* Table Preview */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-[var(--border-subtle)] text-[var(--text-muted)] uppercase text-[10px]">
                  <th className="py-2.5 px-3">Timestamp (IST)</th>
                  <th className="py-2.5 px-3">Speed (km/h)</th>
                  <th className="py-2.5 px-3">Steer Angle</th>
                  <th className="py-2.5 px-3">Lat Accel</th>
                  <th className="py-2.5 px-3">Battery SoC</th>
                  <th className="py-2.5 px-3">Brake Pressure</th>
                  <th className="py-2.5 px-3">RTK Precision</th>
                  <th className="py-2.5 px-3">CAN Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)]/40 text-[var(--text-secondary)]">
                <tr>
                  <td className="py-2 px-3 font-bold text-[var(--text-primary)]">2026-09-05 15:28:01.412</td>
                  <td className="py-2 px-3 text-[var(--accent-cyan)]">42.4 km/h</td>
                  <td className="py-2 px-3">+2.1°</td>
                  <td className="py-2 px-3">0.34 m/s²</td>
                  <td className="py-2 px-3 text-[var(--success-green)]">78.4%</td>
                  <td className="py-2 px-3">142.5 bar</td>
                  <td className="py-2 px-3">±1.4 cm</td>
                  <td className="py-2 px-3 text-[var(--success-green)] font-bold">NOMINAL</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-bold text-[var(--text-primary)]">2026-09-05 15:28:03.412</td>
                  <td className="py-2 px-3 text-[var(--accent-cyan)]">41.8 km/h</td>
                  <td className="py-2 px-3">-1.4°</td>
                  <td className="py-2 px-3">0.28 m/s²</td>
                  <td className="py-2 px-3 text-[var(--success-green)]">78.3%</td>
                  <td className="py-2 px-3">142.2 bar</td>
                  <td className="py-2 px-3">±1.3 cm</td>
                  <td className="py-2 px-3 text-[var(--success-green)] font-bold">NOMINAL</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-bold text-[var(--text-primary)]">2026-09-05 15:28:05.412</td>
                  <td className="py-2 px-3 text-[var(--accent-cyan)]">43.1 km/h</td>
                  <td className="py-2 px-3">+0.8°</td>
                  <td className="py-2 px-3">0.19 m/s²</td>
                  <td className="py-2 px-3 text-[var(--success-green)]">78.3%</td>
                  <td className="py-2 px-3">142.4 bar</td>
                  <td className="py-2 px-3">±1.4 cm</td>
                  <td className="py-2 px-3 text-[var(--success-green)] font-bold">NOMINAL</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* If NOT authenticated: Cyber lock overlay for continuous recording */}
          {!isAuthenticated && (
            <div className="absolute inset-0 bg-black/75 backdrop-blur-[2px] flex flex-col items-center justify-center p-6 text-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[var(--accent-cyan)]/20 border border-[var(--accent-cyan)] flex items-center justify-center shadow-cyan-glow">
                <Lock className="w-5 h-5 text-[var(--accent-cyan)]" />
              </div>
              <span className="font-bold text-sm text-[var(--text-primary)]">
                Full 60Hz CAN-Bus Telemetry Stream & Exports Protected
              </span>
              <p className="text-xs text-[var(--text-secondary)] max-w-md">
                Sign in or register for free to inspect high-frequency CAN frames, wheel torque distribution, and export full timeseries logs.
              </p>
              <div className="flex items-center gap-3 mt-1">
                <GlowButton
                  variant="cyan"
                  size="sm"
                  onClick={() => openAuthModal('signin')}
                  icon={<Sparkles className="w-4 h-4" />}
                >
                  Sign In to View All
                </GlowButton>
                <GlowButton
                  variant="ghost"
                  size="sm"
                  onClick={() => openAuthModal('signup')}
                >
                  Create Free Account
                </GlowButton>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
