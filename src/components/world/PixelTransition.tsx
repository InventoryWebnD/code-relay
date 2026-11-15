"use client";

import { useEffect, useRef } from "react";

/* ---------------------------------------------------------------
   Code Relay pixel transition
   phase="cover"  : tiles fill the screen from the edges in
   phase="reveal" : tiles clear from the centre out
   phase="idle"   : nothing on screen
   --------------------------------------------------------------- */

type PixelOptions = {
  tile: number; gap: number; coverMs: number; revealMs: number; tileMs: number; twinkle: boolean;
  base: string; flash: string;
  palette: { deep: string; navy: string; maroon: string; hot: string; cream: string };
};
type Tile = { x: number; y: number; col: string; d: number; p: number; inDelay: number; outDelay: number; tw: number };

export function createPixelTransition(canvas: HTMLCanvasElement, opts: Partial<PixelOptions> = {}) {
  const cfg = {
    tile: 40,                 // tile size in CSS px
    gap: 3,                   // gap between tiles
    coverMs: 780,             // total time to cover the screen
    revealMs: 680,            // total time to reveal the page
    tileMs: 340,              // how long each tile takes to grow or shrink
    twinkle: true,            // subtle colour shimmer while covered
    base: '#0a1136',          // gap colour (and centre)
    palette: { deep: '#0e1a4d', navy: '#13235f', maroon: '#7e1734', hot: '#a8204a', cream: '#f5efe6' },
    flash: '#d63c64',         // colour a tile flashes as it appears
    ...opts,
  };

  const ctx = canvas.getContext('2d')!;
  const reduced = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;
  let W = 0, H = 0, dpr = 1, raf = 0, state = 'hidden';
  let tiles: Tile[] = [];

  const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
  const easeIn = (t: number) => t * t * t;
  const clamp = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

  function hexToRgb(h: string) { const n = parseInt(h.slice(1), 16); return [n >> 16, (n >> 8) & 255, n & 255]; }
  function mix(a: string, b: string, t: number) { const A = hexToRgb(a), B = hexToRgb(b); return `rgb(${A.map((v, i) => Math.round(v + (B[i] - v) * t)).join(',')})`; }

  function layout() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth; H = window.innerHeight;
    canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
    canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const S = cfg.tile, cols = Math.ceil(W / S) + 1, rows = Math.ceil(H / S) + 1;
    const ox = (W - cols * S) / 2, oy = (H - rows * S) / 2;
    const P = cfg.palette;
    tiles = [];
    let seed = 1337; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
      const x = ox + c * S, y = oy + r * S;
      const dx = (x + S / 2 - W / 2) / W, dy = (y + S / 2 - H / 2) / H;
      const d = Math.min(1, Math.hypot(dx, dy * 1.35) * 1.55);   // 0 centre, 1 edges
      const p = rnd();
      let col: string = P.deep;
      if (p < d * 0.9) col = P.navy;
      if (p < d * 0.45) col = P.maroon;
      if (p < d * 0.18) col = P.hot;
      if (p < d * 0.04) col = P.cream;
      tiles.push({
        x, y, col, d, p: rnd(),
        inDelay: (1 - d) * 0.75 + rnd() * 0.25,    // edges first
        outDelay: d * 0.75 + rnd() * 0.25,         // centre first
        tw: rnd() * Math.PI * 2,
      });
    }
  }

  function drawTile(t: Tile, k: number, flashAmt: number) {
    if (k <= 0) return;
    const S = cfg.tile, g = cfg.gap;
    const s = S * k, cx = t.x + S / 2, cy = t.y + S / 2;
    ctx.fillStyle = cfg.base;
    ctx.fillRect(cx - s / 2 - 0.5, cy - s / 2 - 0.5, s + 1, s + 1);
    const inner = Math.max(0, (S - g * 2) * k);
    ctx.fillStyle = flashAmt > 0 ? mix(t.col, cfg.flash, flashAmt) : t.col;
    ctx.fillRect(cx - inner / 2, cy - inner / 2, inner, inner);
  }

  function frame(progress: number, dir: 'in' | 'out') {
    ctx.clearRect(0, 0, W, H);
    const total = dir === 'in' ? cfg.coverMs : cfg.revealMs;
    const span = 1 - cfg.tileMs / total;
    for (const t of tiles) {
      const delay = (dir === 'in' ? t.inDelay : t.outDelay) * span;
      const local = clamp((progress - delay) / (1 - span));
      let k: number, flash = 0;
      if (dir === 'in') { k = easeOut(local); flash = local < 1 ? (1 - local) * 0.85 * (t.p < 0.5 ? 1 : 0.4) : 0; }
      else { k = 1 - easeIn(local); }
      drawTile(t, k, flash);
    }
  }

  function rest(time: number) {
    ctx.clearRect(0, 0, W, H);
    const P = cfg.palette;
    for (const t of tiles) {
      let col: string = t.col;
      if (cfg.twinkle && t.d > 0.35) {
        const w = Math.sin(time / 900 + t.tw);
        if (w > 0.985 && t.col !== P.cream) col = mix(t.col, P.hot, (w - 0.985) / 0.015);
      }
      const S = cfg.tile, g = cfg.gap;
      ctx.fillStyle = cfg.base; ctx.fillRect(t.x - 0.5, t.y - 0.5, S + 1, S + 1);
      ctx.fillStyle = col; ctx.fillRect(t.x + g, t.y + g, S - g * 2, S - g * 2);
    }
  }

  function run(dir: 'in' | 'out'): Promise<void> {
    cancelAnimationFrame(raf);
    return new Promise((resolve) => {
      const total = dir === 'in' ? cfg.coverMs : cfg.revealMs;
      if (reduced) {
        if (dir === 'in') { state = 'covered'; rest(0); } else { state = 'hidden'; ctx.clearRect(0, 0, W, H); }
        return resolve();
      }
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / total);
        frame(p, dir);
        if (p < 1) { raf = requestAnimationFrame(tick); return; }
        if (dir === 'in') {
          state = 'covered';
          if (cfg.twinkle) { const loop = (t: number) => { rest(t); raf = requestAnimationFrame(loop); }; raf = requestAnimationFrame(loop); }
          else rest(0);
        } else { state = 'hidden'; ctx.clearRect(0, 0, W, H); }
        resolve();
      };
      raf = requestAnimationFrame(tick);
    });
  }

  const onResize = () => { layout(); if (state === 'covered') rest(performance.now()); };
  layout();
  window.addEventListener('resize', onResize);

  return {
    cover: () => { state = 'covering'; return run('in'); },
    reveal: () => { state = 'revealing'; return run('out'); },
    get state() { return state; },
    destroy() { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize); },
  };
}


type Phase = "cover" | "reveal" | "idle";

export default function PixelTransition({
  phase,
  onCovered,
  onRevealed,
  centreFade = true,
  options,
}: {
  phase: Phase;
  onCovered?: () => void;
  onRevealed?: () => void;
  centreFade?: boolean;
  options?: Partial<PixelOptions>;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engine = useRef<ReturnType<typeof createPixelTransition> | null>(null);
  const covered = phase === "cover";

  useEffect(() => {
    engine.current = createPixelTransition(canvasRef.current!, options);
    return () => engine.current?.destroy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const t = engine.current;
    if (!t) return;
    if (phase === "cover") t.cover().then(() => onCovered?.());
    if (phase === "reveal") t.reveal().then(() => onRevealed?.());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{ position: "fixed", inset: 0, zIndex: 50, pointerEvents: "none" }}
      />
      {centreFade && (
        <div
          aria-hidden="true"
          style={{
            position: "fixed", inset: 0, zIndex: 51, pointerEvents: "none",
            opacity: covered ? 1 : 0,
            transition: covered ? "opacity 400ms ease 650ms" : "opacity 200ms ease",
            background: "radial-gradient(40% 36% at 50% 50%, rgba(10,17,54,.94) 0 45%, rgba(10,17,54,0) 100%)",
          }}
        />
      )}
    </>
  );
}
