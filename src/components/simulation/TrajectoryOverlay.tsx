/**
 * RAASTA.AI - TrajectoryOverlay Canvas Renderer
 * Renders the DWA projected kinodynamic trajectory ribbon.
 */

import { TrajectoryPoint } from '@/types/simulation';

export function drawTrajectory(
  ctx: CanvasRenderingContext2D,
  trajectory: TrajectoryPoint[],
  pixelsPerMeter: number,
  isDark: boolean
) {
  if (!trajectory || trajectory.length < 2) return;

  ctx.save();
  ctx.strokeStyle = isDark ? '#10b981' : '#059669';
  ctx.lineWidth = 3;
  ctx.setLineDash([6, 4]);

  ctx.beginPath();
  ctx.moveTo(trajectory[0].x * pixelsPerMeter, trajectory[0].y * pixelsPerMeter);

  for (let i = 1; i < trajectory.length; i++) {
    ctx.lineTo(trajectory[i].x * pixelsPerMeter, trajectory[i].y * pixelsPerMeter);
  }
  ctx.stroke();

  // Draw end-point target bead
  const last = trajectory[trajectory.length - 1];
  ctx.fillStyle = isDark ? '#10b981' : '#059669';
  ctx.setLineDash([]);
  ctx.beginPath();
  ctx.arc(last.x * pixelsPerMeter, last.y * pixelsPerMeter, 5, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}
