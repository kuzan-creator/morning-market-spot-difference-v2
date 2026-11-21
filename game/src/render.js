// render.js — draws one scene panel: the picture, the green rings on the
// differences already found, red X marks for wrong clicks, and the
// keyboard crosshair. Also draws the magnifier lens.
import { circle } from './draw.js';

export function drawPanel(ctx, scene, right, found, wrongMarks, crosshair) {
  const W = ctx.canvas.width;
  const H = ctx.canvas.height;
  ctx.clearRect(0, 0, W, H);
  ctx.save();
  scene.draw(ctx, right);
  ctx.restore();
  // Green rings on every difference found so far, on BOTH panels.
  for (const idx of found) {
    const d = scene.diffs[idx];
    ctx.beginPath();
    ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
    ctx.strokeStyle = '#00c853';
    ctx.lineWidth = 6;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(d.x, d.y, d.r - 8, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255,255,255,0.9)';
    ctx.lineWidth = 2;
    ctx.stroke();
  }
  // Red X marks where the player clicked wrongly (fade handled by caller).
  // A hint mark is a green ring instead of a red X.
  for (const w of wrongMarks) {
    if (w.hint) {
      ctx.beginPath();
      ctx.arc(w.x, w.y, 26, 0, Math.PI * 2);
      ctx.strokeStyle = '#00c853';
      ctx.lineWidth = 5;
      ctx.stroke();
      continue;
    }
    ctx.strokeStyle = '#e63946';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(w.x - 12, w.y - 12); ctx.lineTo(w.x + 12, w.y + 12);
    ctx.moveTo(w.x + 12, w.y - 12); ctx.lineTo(w.x - 12, w.y + 12);
    ctx.stroke();
  }
  // Keyboard crosshair, only on the panel it sits on.
  if (crosshair && crosshair.panel === (right ? 'right' : 'left')) {
    circle(ctx, crosshair.x, crosshair.y, 14, null, '#e63946');
    ctx.strokeStyle = '#e63946';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(crosshair.x - 20, crosshair.y); ctx.lineTo(crosshair.x + 20, crosshair.y);
    ctx.moveTo(crosshair.x, crosshair.y - 20); ctx.lineTo(crosshair.x, crosshair.y + 20);
    ctx.stroke();
  }
}

export function drawMagnifier(magCtx, sourceCtx, cx, cy, zoom) {
  // Copy a small square around the cursor from the source panel, enlarged.
  const S = 180;
  const srcSize = S / zoom;
  magCtx.clearRect(0, 0, S, S);
  magCtx.save();
  magCtx.beginPath();
  magCtx.arc(S / 2, S / 2, S / 2, 0, Math.PI * 2);
  magCtx.clip();
  magCtx.imageSmoothingEnabled = false;
  magCtx.drawImage(sourceCtx.canvas, cx - srcSize / 2, cy - srcSize / 2, srcSize, srcSize, 0, 0, S, S);
  magCtx.restore();
  magCtx.beginPath();
  magCtx.arc(S / 2, S / 2, S / 2 - 2, 0, Math.PI * 2);
  magCtx.strokeStyle = '#231303';
  magCtx.lineWidth = 4;
  magCtx.stroke();
  // Cross lines in the lens so the exact spot is easy to read.
  magCtx.strokeStyle = 'rgba(230,57,70,0.9)';
  magCtx.lineWidth = 2;
  magCtx.beginPath();
  magCtx.moveTo(S / 2 - 18, S / 2); magCtx.lineTo(S / 2 + 18, S / 2);
  magCtx.moveTo(S / 2, S / 2 - 18); magCtx.lineTo(S / 2, S / 2 + 18);
  magCtx.stroke();
}
