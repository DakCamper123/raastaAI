/**
 * RAASTA.AI - VehicleSprite Canvas Renderer
 * Draws the ego autonomous vehicle with lidar sensor cone and wheel steering angles.
 */

import { VehicleState } from '@/types/simulation';
import { VEHICLE_CONSTANTS } from '@/lib/constants';

export function drawEgoVehicle(
  ctx: CanvasRenderingContext2D,
  ego: VehicleState,
  pixelsPerMeter: number,
  isDark: boolean
) {
  ctx.save();
  ctx.translate(ego.x * pixelsPerMeter, ego.y * pixelsPerMeter);
  ctx.rotate(ego.heading);

  const w = VEHICLE_CONSTANTS.VEHICLE_WIDTH_METERS * pixelsPerMeter;
  const l = VEHICLE_CONSTANTS.VEHICLE_LENGTH_METERS * pixelsPerMeter;

  // 1. 360° LiDAR Sensor Beam Sweep Visualization
  ctx.save();
  const grad = ctx.createRadialGradient(0, 0, 5, 0, 0, 18 * pixelsPerMeter);
  grad.addColorStop(0, isDark ? 'rgba(0, 240, 255, 0.25)' : 'rgba(0, 119, 204, 0.2)');
  grad.addColorStop(0.7, isDark ? 'rgba(0, 240, 255, 0.06)' : 'rgba(0, 119, 204, 0.04)');
  grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(0, 0, 18 * pixelsPerMeter, -0.6, 0.6);
  ctx.lineTo(0, 0);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  // 2. Vehicle Chassis Body
  ctx.fillStyle = ego.emergencyStop ? '#ff3355' : isDark ? '#0f172a' : '#ffffff';
  ctx.strokeStyle = ego.emergencyStop ? '#ff3355' : isDark ? '#00f0ff' : '#0077cc';
  ctx.lineWidth = 2.5;

  ctx.beginPath();
  ctx.roundRect(-l / 2, -w / 2, l, w, 6);
  ctx.fill();
  ctx.stroke();

  // Windshield
  ctx.fillStyle = isDark ? 'rgba(0, 240, 255, 0.35)' : 'rgba(0, 119, 204, 0.25)';
  ctx.fillRect(-l / 6, -w / 2 + 3, l / 3, w - 6);

  // Headlights
  ctx.fillStyle = '#ffaa00';
  ctx.fillRect(l / 2 - 3, -w / 2 + 2, 3, 5);
  ctx.fillRect(l / 2 - 3, w / 2 - 7, 3, 5);

  // Brake lights
  if (ego.brakeLevel > 0 || ego.emergencyStop) {
    ctx.fillStyle = '#ff3355';
    ctx.shadowColor = '#ff3355';
    ctx.shadowBlur = 10;
    ctx.fillRect(-l / 2, -w / 2 + 2, 4, 6);
    ctx.fillRect(-l / 2, w / 2 - 8, 4, 6);
    ctx.shadowBlur = 0;
  }

  // Front Wheels with Steering Angle
  const wheelW = 4;
  const wheelL = 12;
  const steerRad = (ego.steeringAngle * Math.PI) / 180;

  // Front Left Wheel
  ctx.save();
  ctx.translate(l / 2 - 8, -w / 2);
  ctx.rotate(steerRad);
  ctx.fillStyle = '#64748b';
  ctx.fillRect(-wheelL / 2, -wheelW / 2, wheelL, wheelW);
  ctx.restore();

  // Front Right Wheel
  ctx.save();
  ctx.translate(l / 2 - 8, w / 2);
  ctx.rotate(steerRad);
  ctx.fillStyle = '#64748b';
  ctx.fillRect(-wheelL / 2, -wheelW / 2, wheelL, wheelW);
  ctx.restore();

  // Roof LiDAR Puck
  ctx.fillStyle = '#00f0ff';
  ctx.beginPath();
  ctx.arc(0, 0, 4, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}
