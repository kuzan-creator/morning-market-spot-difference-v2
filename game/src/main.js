// main.js — game state, timer, score, hints, levels and the win flow.
// One level = one stall. Find every difference in the stall before its
// timer runs out. Found differences stay ringed on both panels.
import { SCENES, totalDifferences } from './scenes.js';
import { drawPanel, drawMagnifier } from './render.js';
import { SoundFX } from './audio.js';
import { attachInput } from './input.js';
import { readShot } from './shots.js';

const $ = (id) => document.getElementById(id);
const leftCanvas = $('canvas-left');
const rightCanvas = $('canvas-right');
const leftCtx = leftCanvas.getContext('2d');
const rightCtx = rightCanvas.getContext('2d');
const magCanvas = $('magnifier');
const magCtx = magCanvas.getContext('2d');
const sfx = new SoundFX();

const state = {
  level: 0,
  found: new Set(),
  wrongMarks: [],
  hintsLeft: 3,
  timeLeft: SCENES[0].time,
  score: 0,
  streak: 0,
  totalFound: 0,
  doneLevels: new Set(),
  playing: false,
  frozen: false,
  showingStart: false,
  crosshair: { panel: 'left', x: 280, y: 200 },
  crosshairOn: false,
  lastTick: 0,
};

const shot = readShot();
if (shot) {
  state.frozen = true;
  state.playing = true;
}

function scene() {
  return SCENES[state.level];
}

function formatTime(sec) {
  const s = Math.max(0, Math.ceil(sec));
  return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0');
}

export function updateHud() {
  const sc = scene();
  $('hud-level').textContent = (state.level + 1) + ' / ' + SCENES.length;
  $('hud-found').textContent = state.found.size + ' of ' + sc.diffs.length + ' found';
  $('hud-time').textContent = formatTime(state.timeLeft);
  $('hud-score').textContent = String(state.score);
  $('hud-streak').textContent = 'x' + state.streak;
  $('hint-count').textContent = String(state.hintsLeft);
  $('level-name').textContent = (state.level + 1) + ' · ' + sc.name + ' — ' + sc.sub;
  document.querySelectorAll('.level-dot').forEach((b, i) => {
    b.classList.toggle('active', i === state.level);
    b.classList.toggle('done', state.doneLevels.has(i));
  });
}

export function render() {
  const sc = scene();
  const foundArr = [...state.found];
  drawPanel(leftCtx, sc, false, foundArr, state.wrongMarks, state.crosshairOn ? state.crosshair : null);
  drawPanel(rightCtx, sc, true, foundArr, state.wrongMarks, state.crosshairOn ? state.crosshair : null);
}

function setMessage(msg) {
  $('message').textContent = msg;
}

export function loadLevel(index, keepScore) {
  state.level = index;
  state.found = new Set();
  state.wrongMarks = [];
  state.hintsLeft = 3;
  state.timeLeft = SCENES[index].time;
  state.streak = 0;
  state.frozen = false;
  if (!keepScore) state.score = 0;
  state.playing = true;
  hideOverlay();
  updateHud();
  render();
  setMessage('Find the differences in the ' + SCENES[index].name + '!');
}

function showOverlay(kicker, title, text, stats, button) {
  $('overlay-kicker').textContent = kicker;
  $('overlay-title').textContent = title;
  $('overlay-text').textContent = text;
  $('overlay-stats').textContent = stats || '';
  $('overlay-button').textContent = button;
  $('overlay').classList.remove('hidden');
}

function hideOverlay() {
  $('overlay').classList.add('hidden');
  $('start-cards').classList.add('hidden');
  $('overlay-how').classList.add('hidden');
  state.showingStart = false;
}

function showStartOverlay() {
  showOverlay(
    'WELCOME TO THE MARKET',
    'MORNING MARKET',
    'Spot the Difference — 6 stalls • 50 hidden differences',
    '6 stalls  •  50 differences  •  3 hints per stall',
    '▶  Play — Start at Fruit Stall'
  );
  const wrap = $('start-cards');
  wrap.innerHTML = '';
  SCENES.forEach((sc, i) => {
    const d = document.createElement('div');
    d.className = 'start-card';
    d.style.borderTopColor = sc.accent;
    const name = document.createElement('b');
    name.textContent = (i + 1) + ' · ' + sc.name;
    const meta = document.createElement('span');
    meta.textContent = sc.sub + ' • ' + sc.diffs.length + ' differences';
    d.appendChild(name);
    d.appendChild(meta);
    wrap.appendChild(d);
  });
  wrap.classList.remove('hidden');
  $('overlay-how').classList.remove('hidden');
  state.showingStart = true;
}

function levelComplete() {
  const sc = scene();
  state.doneLevels.add(state.level);
  state.score += Math.round(state.timeLeft) * 10 + 200;
  state.totalFound += sc.diffs.length;
  sfx.levelComplete();
  updateHud();
  render();
  if (state.doneLevels.size === SCENES.length) {
    winGame();
    return;
  }
  state.playing = false;
  const next = (state.level + 1) % SCENES.length;
  showOverlay(
    'STALL CLEARED!',
    sc.name + ' complete!',
    'You found all ' + sc.diffs.length + ' differences. The next stall is waiting.',
    'Score: ' + state.score + '  •  Total found: ' + state.totalFound + ' of ' + totalDifferences(),
    'Go to ' + SCENES[next].name
  );
  $('overlay-button').onclick = () => loadLevel(next, true);
}

function winGame() {
  state.playing = false;
  sfx.win();
  showOverlay(
    'YOU DID IT!',
    'All 50 differences found!',
    'Every stall in the morning market is checked, circled and complete. You are the sharpest eyes in the market!',
    'Final score: ' + state.score + '  •  50 of 50 differences  •  6 of 6 stalls',
    'Play again'
  );
  $('overlay-button').onclick = () => {
    state.doneLevels.clear();
    state.totalFound = 0;
    state.score = 0;
    loadLevel(0, false);
  };
}

function timeUp() {
  state.playing = false;
  state.streak = 0;
  updateHud();
  showOverlay(
    "TIME'S UP!",
    'Out of time in the ' + scene().name,
    'You found ' + state.found.size + ' of ' + scene().diffs.length + ' differences. Try the stall again!',
    'Score: ' + state.score,
    'Try this stall again'
  );
  $('overlay-button').onclick = () => loadLevel(state.level, true);
}

export function checkSpot(panel, x, y) {
  if (!state.playing) return;
  sfx.ensure();
  const sc = scene();
  let hit = -1;
  for (let i = 0; i < sc.diffs.length; i++) {
    if (state.found.has(i)) continue;
    const d = sc.diffs[i];
    const dx = x - d.x;
    const dy = y - d.y;
    if (dx * dx + dy * dy <= (d.r + 14) * (d.r + 14)) { hit = i; break; }
  }
  if (hit >= 0) {
    state.found.add(hit);
    state.streak += 1;
    const bonus = 100 + Math.min(state.streak, 5) * 20 + Math.round(state.timeLeft);
    state.score += bonus;
    sfx.found();
    setMessage('Found it! ' + sc.diffs[hit].label + '  (+' + bonus + ')');
    render();
    updateHud();
    if (state.found.size === sc.diffs.length) levelComplete();
  } else {
    state.timeLeft = Math.max(0, state.timeLeft - 5);
    state.streak = 0;
    state.wrongMarks.push({ x, y });
    setTimeout(() => {
      state.wrongMarks.shift();
      render();
    }, 900);
    sfx.wrong();
    setMessage('Not a difference — 5 seconds lost!');
    render();
    updateHud();
    if (state.timeLeft <= 0) timeUp();
  }
}

export function useHint() {
  if (!state.playing) return;
  const sc = scene();
  if (state.hintsLeft <= 0) { setMessage('No hints left in this stall!'); return; }
  const remaining = sc.diffs.map((d, i) => i).filter((i) => !state.found.has(i));
  if (remaining.length === 0) return;
  const pick = remaining[Math.floor(Math.random() * remaining.length)];
  state.hintsLeft -= 1;
  state.score = Math.max(0, state.score - 25);
  sfx.hint();
  const d = sc.diffs[pick];
  setMessage('Hint: look near the ' + d.label.toLowerCase() + '!');
  // Flash a pulsing ring on the hinted spot for a moment.
  state.wrongMarks.push({ x: d.x, y: d.y, hint: true });
  render();
  setTimeout(() => { state.wrongMarks.pop(); render(); }, 1200);
  updateHud();
}

function tick(now) {
  if (state.playing && !state.frozen && state.lastTick) {
    const dt = (now - state.lastTick) / 1000;
    state.timeLeft -= dt;
    if (state.timeLeft <= 0) {
      state.timeLeft = 0;
      updateHud();
      render();
      timeUp();
    } else {
      $('hud-time').textContent = formatTime(state.timeLeft);
    }
  }
  state.lastTick = now;
  requestAnimationFrame(tick);
}

function showMagnifier(panel, x, y, clientX, clientY) {
  const boards = $('boards').getBoundingClientRect();
  magCanvas.style.display = 'block';
  magCanvas.style.left = Math.min(clientX - boards.left + 24, boards.width - 190) + 'px';
  magCanvas.style.top = Math.max(clientY - boards.top - 190, 0) + 'px';
  const srcCtx = panel === 'left' ? leftCtx : rightCtx;
  drawMagnifier(magCtx, srcCtx, x, y, 2.2);
}

function hideMagnifier() {
  magCanvas.style.display = 'none';
}

function buildLevelButtons() {
  const wrap = $('level-buttons');
  SCENES.forEach((sc, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'level-dot';
    b.textContent = String(i + 1);
    b.title = sc.name;
    b.addEventListener('click', () => loadLevel(i, true));
    wrap.appendChild(b);
  });
}

function init() {
  buildLevelButtons();
  $('btn-hint').addEventListener('click', () => useHint());
  $('btn-restart').addEventListener('click', () => loadLevel(state.level, true));
  $('btn-next').addEventListener('click', () => loadLevel((state.level + 1) % SCENES.length, true));
  $('btn-mute').addEventListener('click', () => {
    sfx.muted = !sfx.muted;
    $('btn-mute').textContent = sfx.muted ? 'Sound: OFF (M)' : 'Sound: ON (M)';
  });
  $('overlay-button').addEventListener('click', () => {
    if (!$('overlay').classList.contains('hidden') && state.doneLevels.size === 0 && state.found.size === 0) {
      loadLevel(0, false);
    }
  });

  attachInput(leftCanvas, rightCanvas, {
    onSpot: (panel, x, y) => checkSpot(panel, x, y),
    onMove: (panel, x, y, clientX, clientY) => {
      if (!state.playing) return;
      showMagnifier(panel, x, y, clientX, clientY);
    },
    onLeave: () => hideMagnifier(),
    onArrow: (key) => {
      state.crosshairOn = true;
      const step = 18;
      if (key === 'ArrowLeft') state.crosshair.x = Math.max(14, state.crosshair.x - step);
      if (key === 'ArrowRight') state.crosshair.x = Math.min(546, state.crosshair.x + step);
      if (key === 'ArrowUp') state.crosshair.y = Math.max(14, state.crosshair.y - step);
      if (key === 'ArrowDown') state.crosshair.y = Math.min(386, state.crosshair.y + step);
      const el = $('crosshair');
      const boards = $('boards').getBoundingClientRect();
      const canvas = state.crosshair.panel === 'left' ? leftCanvas : rightCanvas;
      const r = canvas.getBoundingClientRect();
      el.style.display = 'block';
      el.style.left = (r.left - boards.left + (state.crosshair.x / 560) * r.width) + 'px';
      el.style.top = (r.top - boards.top + (state.crosshair.y / 400) * r.height) + 'px';
      render();
    },
    onEnter: () => {
      if (state.showingStart) { loadLevel(0, false); return; }
      if (!state.playing) return;
      checkSpot(state.crosshair.panel, state.crosshair.x, state.crosshair.y);
    },
    onHint: () => useHint(),
    onRestart: () => loadLevel(state.level, true),
    onNext: () => loadLevel((state.level + 1) % SCENES.length, true),
    onMute: () => {
      sfx.muted = !sfx.muted;
      $('btn-mute').textContent = sfx.muted ? 'Sound: OFF (M)' : 'Sound: ON (M)';
    },
    onLevel: (i) => loadLevel(i, true),
  });

  if (shot) {
    state.level = shot.level;
    state.found = new Set(shot.found);
    state.timeLeft = shot.frozenTime;
    state.score = shot.name === 'end' ? 4850 : shot.found.length * 120;
    state.totalFound = shot.name === 'end' ? 50 : shot.found.length;
    if (shot.name === 'end') {
      state.doneLevels = new Set([0, 1, 2, 3, 4, 5]);
      state.found = new Set(SCENES[5].diffs.map((d, i) => i));
    }
    updateHud();
    render();
    if (shot.overlay === 'start') {
      state.playing = false;
      setMessage('Welcome to the morning market!');
      showStartOverlay();
    } else if (shot.overlay === 'win') {
      setMessage('All 50 differences found — you win!');
      showOverlay(
        'YOU DID IT!',
        'All 50 differences found!',
        'Every stall in the morning market is checked, circled and complete. You are the sharpest eyes in the market!',
        'Final score: ' + state.score + '  •  50 of 50 differences  •  6 of 6 stalls',
        'Play again'
      );
    } else {
      setMessage('Find the differences in the ' + scene().name + '!');
    }
  } else {
    updateHud();
    render();
    showOverlay(
      'WELCOME TO THE MARKET',
      'Spot the Difference',
      'Six busy stalls. Fifty sneaky changes. Find them all before the clock runs out!',
      '6 stalls  •  50 differences  •  3 hints per stall',
      'Start playing'
    );
  }
  requestAnimationFrame(tick);
}

init();
