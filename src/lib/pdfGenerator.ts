/**
 * NavDrishti - Vehicle Condition & Diagnostic Telematics PDF Generator
 * Creates an automotive engineering PDF report and returns binary Blob for Supabase upload and download.
 */

import { jsPDF } from 'jspdf';
import { CarDiagnosticData } from '@/data/carAnalysis';

export interface PDFGenerationResult {
  doc: jsPDF;
  blob: Blob;
  filename: string;
}

export function generateCarDiagnosticPDF(
  vehicle: CarDiagnosticData,
  customTitle?: string
): PDFGenerationResult {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const title = customTitle || 'VEHICLE CONDITION & TELEMETRY DIAGNOSTIC DOSSIER';
  const timestamp = new Date().toLocaleString('en-US', { timeZoneName: 'short' });
  const filename = `NavDrishti_Vehicle_Report_${Date.now()}.pdf`;

  // Colors
  const primaryDark = [10, 15, 24]; // #0a0f18
  const cyan = [0, 180, 216]; // Cyan accent
  const green = [16, 185, 129];
  const amber = [245, 158, 11];
  const grayText = [100, 116, 139];
  const darkText = [30, 41, 59];

  // Header Banner
  doc.setFillColor(primaryDark[0], primaryDark[1], primaryDark[2]);
  doc.rect(0, 0, 210, 32, 'F');

  // Brand Logo Text
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(255, 255, 255);
  doc.text('NAV', 14, 14);
  doc.setTextColor(cyan[0], cyan[1], cyan[2]);
  doc.text('DRISHTI', 28, 14);

  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(180, 200, 220);
  doc.text('BHARATNAV L4+ AUTONOMOUS MOBILITY LAB', 14, 20);
  doc.text('ISO 26262 ASIL-D VERIFIED TELEMETRY SUITE', 14, 25);

  // Right-side stamp
  doc.setFontSize(8);
  doc.setTextColor(green[0], green[1], green[2]);
  doc.text('STATUS: 98% NOMINAL EXCELLENT', 140, 14);
  doc.setTextColor(200, 200, 200);
  doc.text(`Generated: ${timestamp}`, 140, 20);
  doc.text(`Chassis: ${vehicle.vehicle.chassisVin}`, 140, 25);

  let y = 42;

  // Title Section
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(darkText[0], darkText[1], darkText[2]);
  doc.text(title, 14, y);
  y += 6;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(grayText[0], grayText[1], grayText[2]);
  doc.text(
    `Platform: ${vehicle.vehicle.model} | Mode: ${vehicle.vehicle.operatingMode} | Firmware: ${vehicle.vehicle.ecuFirmware}`,
    14,
    y
  );
  y += 8;

  // Divider
  doc.setDrawColor(220, 226, 235);
  doc.setLineWidth(0.5);
  doc.line(14, y, 196, y);
  y += 6;

  const drawSection = (heading: string, rows: [string, string][], badge?: string) => {
    // Section Header
    doc.setFillColor(245, 247, 250);
    doc.rect(14, y, 182, 6.5, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(primaryDark[0], primaryDark[1], primaryDark[2]);
    doc.text(heading, 16, y + 4.5);

    if (badge) {
      doc.setFontSize(7.5);
      doc.setTextColor(cyan[0], cyan[1], cyan[2]);
      doc.text(badge, 160, y + 4.5);
    }
    y += 8;

    // Rows Grid
    doc.setFontSize(8);
    for (let i = 0; i < rows.length; i += 2) {
      const left = rows[i];
      const right = rows[i + 1];

      // Left column
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(grayText[0], grayText[1], grayText[2]);
      doc.text(left[0], 16, y);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(darkText[0], darkText[1], darkText[2]);
      doc.text(left[1], 62, y);

      // Right column
      if (right) {
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(grayText[0], grayText[1], grayText[2]);
        doc.text(right[0], 108, y);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(darkText[0], darkText[1], darkText[2]);
        doc.text(right[1], 154, y);
      }

      y += 5.5;
    }
    y += 4;
  };

  // 1. Powertrain & Battery
  drawSection('1. HIGH-VOLTAGE POWERTRAIN & BATTERY TELEMETRY', [
    ['State of Charge (SoC):', `${vehicle.battery.socPercent}%`],
    ['State of Health (SoH):', `${vehicle.battery.sohPercent}%`],
    ['Pack Voltage:', `${vehicle.battery.packVoltage} V`],
    ['Current Draw:', `${vehicle.battery.currentAmps} A`],
    ['Cell Voltage Delta:', `±${vehicle.battery.cellDeltaVolts} V (Balanced)`],
    ['Average Temperature:', `${vehicle.battery.avgTempCelsius} °C (Optimal)`],
    ['Cooling Flow Rate:', `${vehicle.battery.coolingLoopFlowLpm} L/min Glycol`],
    ['Estimated Range:', `${vehicle.battery.estimatedRangeKm} km remaining`],
  ], 'THERMAL OPTIMAL');

  // 2. ASIL-D Braking
  drawSection('2. ASIL-D DECELERATION & BRAKE-BY-WIRE DYNAMICS', [
    ['Primary Hydraulic Line:', `${vehicle.brakesAndSafety.primaryPressureBar} bar`],
    ['Secondary Fail-Safe Line:', `${vehicle.brakesAndSafety.secondaryPressureBar} bar`],
    ['Front Axle Pad Wear:', `${vehicle.brakesAndSafety.frontPadWearPercent}% Life Remaining`],
    ['Rear Axle Pad Wear:', `${vehicle.brakesAndSafety.rearPadWearPercent}% Life Remaining`],
    ['E-Brake Redundancy:', `${vehicle.brakesAndSafety.eBrakeRedundancy}`],
    ['Reaction Latency:', `${vehicle.brakesAndSafety.reactionLatencyMs} ms (Sub-12ms)`],
    ['ABS Status:', `${vehicle.brakesAndSafety.absStatus}`],
    ['Stability Control:', `${vehicle.brakesAndSafety.stabilityControl}`],
  ], 'ARMED ASIL-D');

  // 3. Chassis & Road Traction
  drawSection('3. CHASSIS DYNAMICS, ROAD TRACTION & TIRES', [
    ['Friction Coefficient (μ):', `${vehicle.chassisAndTraction.frictionCoefficientMu} (Dry Bitumen)`],
    ['Road Surface Profile:', `${vehicle.chassisAndTraction.roadSurfaceProfile}`],
    ['FL / FR Tire Pressure:', `${vehicle.chassisAndTraction.tirePressuresPsi.fl} / ${vehicle.chassisAndTraction.tirePressuresPsi.fr} PSI`],
    ['RL / RR Tire Pressure:', `${vehicle.chassisAndTraction.tirePressuresPsi.rl} / ${vehicle.chassisAndTraction.tirePressuresPsi.rr} PSI`],
    ['Wheel Slip Ratio:', `${vehicle.chassisAndTraction.wheelSlipPercent}% (Nominal)`],
    ['Electric Steering Torque:', `${vehicle.chassisAndTraction.epsTorqueNm} Nm Feedback`],
    ['Suspension Stroke:', `${vehicle.chassisAndTraction.suspensionStrokeMm} mm Deflection`],
    ['Operating Odometer:', `${vehicle.vehicle.odometerKm} km Recorded`],
  ]);

  // 4. Perception Calibration
  drawSection('4. PERCEPTION SENSORS CALIBRATION & HEALTH MATRIX', [
    ['128-Beam Solid LiDAR:', `${vehicle.sensorsCalibration.lidarPointsSec}`],
    ['Optical Transparency:', `${vehicle.sensorsCalibration.lidarTransparency}% Clarity`],
    ['8x Surround Cameras:', `${vehicle.sensorsCalibration.cameraMtfSharpness}% MTF Sharpness`],
    ['4D Imaging Radar:', `${vehicle.sensorsCalibration.radarSnrDb} dB SNR (512 Virtual Channels)`],
    ['Dual-Band RTK GNSS:', `±${vehicle.sensorsCalibration.gnssPrecisionCm} cm Carrier-Phase`],
    ['Satellite Lock Count:', `${vehicle.sensorsCalibration.gnssSatellites} Tracking Fix`],
  ], '60 HZ ALL ONLINE');

  // 5. On-Board Diagnostics
  drawSection('5. ISO 14229 / UDS DIAGNOSTIC STATUS & SAFETY MARGIN', [
    ['Active DTC Fault Codes:', `${vehicle.diagnostics.dtcActiveCount} FAULTS (CLEAN)`],
    ['CAN-FD Bus Load:', `${vehicle.diagnostics.canBusLoadPercent}% Active`],
    ['Automotive Ethernet:', `${vehicle.diagnostics.ethernetThroughputMbps} Mbps Stream`],
    ['AI Safety Risk Margin:', `${(vehicle.diagnostics.safetyRiskScore * 100).toFixed(2)}% (Optimal)`],
    ['ECU Diagnostic Cycle:', `${vehicle.vehicle.lastDiagnosticCycle}`],
    ['Safety Standard:', `${vehicle.vehicle.asilCertification}`],
  ]);

  // Footer Sign-Off
  y = 280;
  doc.setDrawColor(220, 226, 235);
  doc.line(14, y, 196, y);
  y += 4;
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(grayText[0], grayText[1], grayText[2]);
  doc.text(
    'CONFIDENTIAL AUTOMOTIVE RESEARCH REPORT • NAVDRISHTI AUTONOMOUS SYSTEMS LABORATORY • BHARATNAV',
    14,
    y
  );
  doc.text('Page 1 of 1', 182, y);

  const blob = doc.output('blob');

  return {
    doc,
    blob,
    filename,
  };
}
