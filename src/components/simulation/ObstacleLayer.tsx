/**
 * RAASTA.AI - ObstacleLayer Canvas Renderer
 * Renders heterogeneous obstacles: cows, rickshaws, pedestrians, trucks, and potholes with TTC tags.
 */

import { Obstacle } from '@/types/simulation';

export function drawObstacles(
  ctx: CanvasRenderingContext2D,
  obstacles: Obstacle[],
  pixelsPerMeter: number,
  isDark: boolean
) {
  for (const obs of obstacles) {
    ctx.save();
    ctx.translate(obs.x * pixelsPerMeter, obs.y * pixelsPerMeter);
    ctx.rotate(obs.heading);

    const w = obs.width * pixelsPerMeter;
    const l = obs.length * pixelsPerMeter;

    if (obs.type === 'cow') {
      // Zebu Cow (Bovine) with distinct hump and horns
      ctx.fillStyle = isDark ? '#b45309' : '#d97706';
      ctx.strokeStyle = '#ffaa00';
      ctx.lineWidth = 1.5;

      // Body
      ctx.beginPath();
      ctx.ellipse(0, 0, l / 2, w / 2, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Hump
      ctx.fillStyle = '#78350f';
      ctx.beginPath();
      ctx.arc(-l / 6, 0, w / 3, 0, Math.PI * 2);
      ctx.fill();

      // Head
      ctx.fillStyle = '#92400e';
      ctx.beginPath();
      ctx.arc(l / 2, 0, w / 3.2, 0, Math.PI * 2);
      ctx.fill();
    } else if (obs.type === 'rickshaw') {
      // Auto-Rickshaw (Yellow/Green characteristic hood)
      ctx.fillStyle = '#ffaa00';
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 2;

      ctx.beginPath();
      ctx.roundRect(-l / 2, -w / 2, l, w, 4);
      ctx.fill();
      ctx.stroke();

      // Green Canvas Roof
      ctx.fillStyle = '#15803d';
      ctx.fillRect(-l / 4, -w / 2 + 2, l / 1.8, w - 4);
    } else if (obs.type === 'pothole') {
      // Pothole crater on asphalt
      ctx.fillStyle = '#1e1b4b';
      ctx.strokeStyle = '#dc2626';
      ctx.lineWidth = 2;
      ctx.setLineDash([3, 3]);

      ctx.beginPath();
      ctx.ellipse(0, 0, l / 2, w / 2, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.setLineDash([]);
    } else {
      // General Vehicles & Pedestrians
      ctx.fillStyle = obs.color || '#64748b';
      ctx.strokeStyle = isDark ? '#ffffff' : '#0f172a';
      ctx.lineWidth = 1.5;

      ctx.beginPath();
      ctx.roundRect(-l / 2, -w / 2, l, w, 4);
      ctx.fill();
      ctx.stroke();
    }

    ctx.restore();

    // Draw Perception Bounding Box and Label
    ctx.save();
    ctx.translate(obs.x * pixelsPerMeter, obs.y * pixelsPerMeter);

    ctx.fillStyle = isDark ? 'rgba(0, 0, 0, 0.75)' : 'rgba(255, 255, 255, 0.9)';
    ctx.strokeStyle = obs.color || '#00f0ff';
    ctx.lineWidth = 1;

    const labelText = `${obs.label} [TTC: ${obs.ttc}s]`;
    ctx.font = '10px "JetBrains Mono", monospace';
    const textWidth = ctx.measureText(labelText).width;

    const pad = 4;
    ctx.fillRect(-textWidth / 2 - pad, -obs.width * pixelsPerMeter - 16, textWidth + pad * 2, 14);
    ctx.strokeRect(-textWidth / 2 - pad, -obs.width * pixelsPerMeter - 16, textWidth + pad * 2, 14);

    ctx.fillStyle = obs.color || '#00f0ff';
    ctx.fillText(labelText, -textWidth / 2, -obs.width * pixelsPerMeter - 6);

    ctx.restore();
  }
}
