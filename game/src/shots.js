// shots.js — deterministic screenshot modes, read from the URL query.
// ?shot=start  — cover: distinct START screen (title + 6 stall cards +
// Play button), Fruit Stall panels faded behind the overlay
// ?shot=play   — Fruit Stall mid-game, 3 found, counter reads "3 of 8 found"
// ?shot=level2 — Coffee Stall mid-game, 4 found, counter reads "4 of 8 found"
// ?shot=end    — win screen: all 50 found, final score shown
// Without ?shot the game starts normally on the title overlay.
export const SHOTS = {
  start: { level: 0, found: [], frozenTime: 150, overlay: 'start' },
  play: { level: 0, found: [0, 2, 5], frozenTime: 132, overlay: false },
  level2: { level: 1, found: [0, 1, 3, 6], frozenTime: 118, overlay: false },
  end: { level: 5, found: [0, 1, 2, 3, 4, 5, 6, 7, 8], frozenTime: 0, overlay: 'win' },
};

export function readShot() {
  const q = new URLSearchParams(window.location.search);
  const name = q.get('shot');
  if (name && SHOTS[name]) return { name, ...SHOTS[name] };
  return null;
}
