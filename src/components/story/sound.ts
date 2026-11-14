import { CHAPTERS, story } from "./store";

/**
 * A tiny generative score, synthesised live with WebAudio (no files):
 * a pad that changes chord per chapter, wind that follows your scroll speed,
 * soft footsteps synced to the runners and a chime on every new chapter.
 * The finish resolves to a major chord: sunrise.
 */
const N = (n: number) => 440 * Math.pow(2, (n - 69) / 12);
const CHORDS: Record<string, number[]> = {
  start: [50, 53, 57, 60], // Dm7
  idea: [46, 50, 53, 57], // Bbmaj7
  tracks: [41, 57, 60, 64], // Fmaj7
  pass: [48, 52, 55, 59], // Cmaj7
  sprint: [43, 50, 55, 57], // Gsus2
  finish: [50, 54, 57, 64], // D add9
};

export class Score {
  ctx: AudioContext;
  master: GainNode;
  pad: OscillatorNode[] = [];
  padGain: GainNode;
  wind: GainNode;
  windFilter: BiquadFilterNode;
  noise: AudioBuffer;
  chapter = "";
  steps = story.steps;
  lastP = story.p;
  lastStep = 0;
  raf = 0;

  constructor() {
    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    this.ctx = new Ctx();
    const c = this.ctx;
    this.master = c.createGain();
    this.master.gain.value = 0;
    const comp = c.createDynamicsCompressor();
    this.master.connect(comp).connect(c.destination);

    // reverb-ish: a short feedback delay
    const delay = c.createDelay(1);
    delay.delayTime.value = 0.32;
    const fb = c.createGain();
    fb.gain.value = 0.35;
    const wet = c.createGain();
    wet.gain.value = 0.3;
    delay.connect(fb).connect(delay);
    delay.connect(wet).connect(this.master);

    // pad
    this.padGain = c.createGain();
    this.padGain.gain.value = 0.05;
    const lp = c.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 900;
    lp.Q.value = 0.6;
    this.padGain.connect(lp).connect(this.master);
    lp.connect(delay);
    for (let i = 0; i < 4; i++) {
      for (const det of [-6, 6]) {
        const o = c.createOscillator();
        o.type = i === 0 ? "sine" : "triangle";
        o.detune.value = det;
        o.frequency.value = N(CHORDS.start[i]);
        o.connect(this.padGain);
        o.start();
        this.pad.push(o);
      }
    }

    // noise buffer for wind + steps
    this.noise = c.createBuffer(1, c.sampleRate * 2, c.sampleRate);
    const d = this.noise.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    const src = c.createBufferSource();
    src.buffer = this.noise;
    src.loop = true;
    this.windFilter = c.createBiquadFilter();
    this.windFilter.type = "bandpass";
    this.windFilter.frequency.value = 500;
    this.windFilter.Q.value = 0.7;
    this.wind = c.createGain();
    this.wind.gain.value = 0;
    src.connect(this.windFilter).connect(this.wind).connect(this.master);
    src.start();

    this.tick = this.tick.bind(this);
  }

  async start() {
    await this.ctx.resume();
    this.master.gain.setTargetAtTime(0.9, this.ctx.currentTime, 0.6);
    cancelAnimationFrame(this.raf);
    this.raf = requestAnimationFrame(this.tick);
  }

  stop() {
    this.master.gain.setTargetAtTime(0, this.ctx.currentTime, 0.25);
    cancelAnimationFrame(this.raf);
    setTimeout(() => this.ctx.state === "running" && this.master.gain.value < 0.02 && this.ctx.suspend(), 900);
  }

  chime(root: number) {
    const c = this.ctx;
    const t = c.currentTime;
    [0, 7, 12, 19].forEach((iv, i) => {
      const o = c.createOscillator();
      const g = c.createGain();
      o.type = "sine";
      o.frequency.value = N(root + 24 + iv);
      g.gain.setValueAtTime(0, t + i * 0.07);
      g.gain.linearRampToValueAtTime(0.05, t + i * 0.07 + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, t + i * 0.07 + 1.8);
      o.connect(g).connect(this.master);
      o.start(t + i * 0.07);
      o.stop(t + i * 0.07 + 2);
    });
  }

  step() {
    const c = this.ctx;
    const t = c.currentTime;
    const o = c.createOscillator();
    const g = c.createGain();
    o.type = "sine";
    o.frequency.setValueAtTime(120, t);
    o.frequency.exponentialRampToValueAtTime(48, t + 0.08);
    g.gain.setValueAtTime(0.09, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.12);
    o.connect(g).connect(this.master);
    o.start(t);
    o.stop(t + 0.14);
  }

  tick() {
    const c = this.ctx;
    const p = story.p;
    const ch = CHAPTERS.find((x) => p >= x.from && p < x.to) ?? CHAPTERS[0];
    if (ch.id !== this.chapter) {
      const first = this.chapter === "";
      this.chapter = ch.id;
      const notes = CHORDS[ch.id];
      for (let i = 0; i < this.pad.length; i++) this.pad[i].frequency.setTargetAtTime(N(notes[i >> 1]), c.currentTime, 0.5);
      if (!first) this.chime(notes[0]);
    }
    const v = Math.min(Math.abs(p - this.lastP) * 900, 1);
    this.lastP = p;
    this.wind.gain.setTargetAtTime(0.012 + v * 0.11, c.currentTime, 0.15);
    this.windFilter.frequency.setTargetAtTime(380 + v * 1400, c.currentTime, 0.2);
    if (story.steps !== this.steps) {
      this.steps = story.steps;
      // four runners share one counter: keep it to a light patter
      if (c.currentTime - this.lastStep > 0.11) {
        this.lastStep = c.currentTime;
        this.step();
      }
    }
    this.raf = requestAnimationFrame(this.tick);
  }
}
