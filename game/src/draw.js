// draw.js — small canvas helpers shared by every market scene.
// All coordinates are in the scene's own 560x400 space.

export function circle(ctx, x, y, r, fill, stroke) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  if (fill) { ctx.fillStyle = fill; ctx.fill(); }
  if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = 3; ctx.stroke(); }
}

export function ellipse(ctx, x, y, rx, ry, fill, stroke) {
  ctx.beginPath();
  ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
  if (fill) { ctx.fillStyle = fill; ctx.fill(); }
  if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = 3; ctx.stroke(); }
}

export function rect(ctx, x, y, w, h, fill, stroke) {
  if (fill) { ctx.fillStyle = fill; ctx.fillRect(x, y, w, h); }
  if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = 3; ctx.strokeRect(x, y, w, h); }
}

export function roundRect(ctx, x, y, w, h, r, fill, stroke) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
  if (fill) { ctx.fillStyle = fill; ctx.fill(); }
  if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = 3; ctx.stroke(); }
}

export function poly(ctx, points, fill, stroke) {
  ctx.beginPath();
  ctx.moveTo(points[0][0], points[0][1]);
  for (let i = 1; i < points.length; i++) ctx.lineTo(points[i][0], points[i][1]);
  ctx.closePath();
  if (fill) { ctx.fillStyle = fill; ctx.fill(); }
  if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = 3; ctx.stroke(); }
}

export function star(ctx, x, y, r, fill) {
  ctx.beginPath();
  for (let i = 0; i < 10; i++) {
    const ang = -Math.PI / 2 + (i * Math.PI) / 5;
    const rad = i % 2 === 0 ? r : r * 0.45;
    const px = x + Math.cos(ang) * rad;
    const py = y + Math.sin(ang) * rad;
    if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.fillStyle = fill; ctx.fill();
}

export function text(ctx, str, x, y, size, color, align) {
  ctx.fillStyle = color;
  ctx.font = '900 ' + size + 'px "Trebuchet MS", Verdana, sans-serif';
  ctx.textAlign = align || 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(str, x, y);
}

export function sky(ctx, top, bottom) {
  const g = ctx.createLinearGradient(0, 0, 0, 240);
  g.addColorStop(0, top);
  g.addColorStop(1, bottom);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 560, 240);
}

export function ground(ctx, color) {
  ctx.fillStyle = color;
  ctx.fillRect(0, 330, 560, 70);
}

export function awning(ctx, colors) {
  // Striped market awning across the top of the stall.
  for (let i = 0; i < 7; i++) {
    poly(ctx, [[i * 80, 0], [(i + 1) * 80, 0], [(i + 1) * 80 - 14, 62], [i * 80 + 14, 62]], colors[i % colors.length]);
  }
  rect(ctx, 0, 58, 560, 10, '#231303');
}

export function table(ctx, color) {
  rect(ctx, 30, 250, 500, 18, '#8b5a2b', '#231303');
  rect(ctx, 44, 268, 16, 62, '#6b4423');
  rect(ctx, 500, 268, 16, 62, '#6b4423');
  rect(ctx, 30, 250, 500, 18, color);
  rect(ctx, 30, 250, 500, 6, 'rgba(255,255,255,0.35)');
}

export function sun(ctx, x, y, color) {
  circle(ctx, x, y, 30, color, '#e67e00');
  for (let i = 0; i < 8; i++) {
    const a = (i * Math.PI) / 4;
    ctx.strokeStyle = '#e67e00';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(x + Math.cos(a) * 36, y + Math.sin(a) * 36);
    ctx.lineTo(x + Math.cos(a) * 48, y + Math.sin(a) * 48);
    ctx.stroke();
  }
}

export function cloud(ctx, x, y) {
  circle(ctx, x, y, 18, '#ffffff');
  circle(ctx, x + 20, y - 8, 22, '#ffffff');
  circle(ctx, x + 42, y, 18, '#ffffff');
  rect(ctx, x - 12, y, 66, 18, '#ffffff');
}

export function bird(ctx, x, y, color) {
  ctx.strokeStyle = color || '#231303';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(x - 10, y, 10, Math.PI * 1.15, Math.PI * 1.85);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(x + 10, y, 10, Math.PI * 1.15, Math.PI * 1.85);
  ctx.stroke();
}

export function basket(ctx, x, y, w, color) {
  poly(ctx, [[x, y], [x + w, y], [x + w - 10, y + 34], [x + 10, y + 34]], color, '#231303');
  ctx.strokeStyle = '#231303';
  ctx.lineWidth = 2;
  for (let i = 1; i < 4; i++) {
    ctx.beginPath();
    ctx.moveTo(x + (w * i) / 4, y + 2);
    ctx.lineTo(x + (w * i) / 4 - 4, y + 32);
    ctx.stroke();
  }
}

export function priceTag(ctx, x, y, label, color) {
  roundRect(ctx, x - 26, y - 16, 52, 32, 8, '#ffffff', '#231303');
  text(ctx, label, x, y + 1, 20, color || '#e63946');
}
