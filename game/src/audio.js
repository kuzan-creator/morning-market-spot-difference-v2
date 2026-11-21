// audio.js — all sounds are synthesised with WebAudio. No audio files.
export class SoundFX {
  constructor() {
    this.ctx = null;
    this.muted = false;
  }

  ensure() {
    if (!this.ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (AC) this.ctx = new AC();
    }
    if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume();
  }

  tone(freq, dur, type, vol, when) {
    if (this.muted || !this.ctx) return;
    const t0 = this.ctx.currentTime + (when || 0);
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = type || 'sine';
    osc.frequency.setValueAtTime(freq, t0);
    gain.gain.setValueAtTime(0.0001, t0);
    gain.gain.exponentialRampToValueAtTime(vol || 0.15, t0 + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(gain).connect(this.ctx.destination);
    osc.start(t0);
    osc.stop(t0 + dur + 0.05);
  }

  found() {
    this.ensure();
    this.tone(660, 0.12, 'sine', 0.18);
    this.tone(880, 0.2, 'sine', 0.18, 0.09);
  }

  wrong() {
    this.ensure();
    this.tone(160, 0.25, 'sawtooth', 0.1);
  }

  hint() {
    this.ensure();
    this.tone(520, 0.1, 'triangle', 0.14);
    this.tone(780, 0.14, 'triangle', 0.14, 0.08);
  }

  levelComplete() {
    this.ensure();
    this.tone(523, 0.14, 'sine', 0.18);
    this.tone(659, 0.14, 'sine', 0.18, 0.12);
    this.tone(784, 0.3, 'sine', 0.2, 0.24);
  }

  win() {
    this.ensure();
    const notes = [523, 659, 784, 1047, 784, 1047];
    notes.forEach((n, i) => this.tone(n, 0.22, 'sine', 0.18, i * 0.14));
  }

  click() {
    this.ensure();
    this.tone(440, 0.06, 'triangle', 0.08);
  }
}
