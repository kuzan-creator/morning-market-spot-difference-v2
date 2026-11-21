// input.js — mouse and keyboard input for both panels.
// The game owns the state; this file only translates raw events into
// game calls: onSpot(panel, x, y), onMove(panel, x, y, clientX, clientY),
// onLeave(), and keyboard actions.
export function attachInput(leftCanvas, rightCanvas, actions) {
  function canvasPoint(canvas, ev) {
    const r = canvas.getBoundingClientRect();
    return {
      x: ((ev.clientX - r.left) / r.width) * canvas.width,
      y: ((ev.clientY - r.top) / r.height) * canvas.height,
    };
  }

  for (const [canvas, panel] of [[leftCanvas, 'left'], [rightCanvas, 'right']]) {
    canvas.addEventListener('click', (ev) => {
      const p = canvasPoint(canvas, ev);
      actions.onSpot(panel, p.x, p.y);
    });
    canvas.addEventListener('mousemove', (ev) => {
      const p = canvasPoint(canvas, ev);
      actions.onMove(panel, p.x, p.y, ev.clientX, ev.clientY);
    });
    canvas.addEventListener('mouseleave', () => actions.onLeave());
  }

  window.addEventListener('keydown', (ev) => {
    if (ev.key === 'ArrowLeft' || ev.key === 'ArrowRight' || ev.key === 'ArrowUp' || ev.key === 'ArrowDown') {
      ev.preventDefault();
      actions.onArrow(ev.key);
    } else if (ev.key === 'Enter') {
      ev.preventDefault();
      actions.onEnter();
    } else if (ev.key === 'h' || ev.key === 'H') {
      actions.onHint();
    } else if (ev.key === 'r' || ev.key === 'R') {
      actions.onRestart();
    } else if (ev.key === 'n' || ev.key === 'N') {
      actions.onNext();
    } else if (ev.key === 'm' || ev.key === 'M') {
      actions.onMute();
    } else if (/^[1-6]$/.test(ev.key)) {
      actions.onLevel(Number(ev.key) - 1);
    }
  });
}
