"use client";

import { useEffect, useRef } from "react";

const COLORS = ["#991B3D", "#F5B000", "#5AA7A7", "#0B1B4D", "#15060B"];

/** Global click sparks: chunky lines burst from every click. */
export default function ClickSpark() {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const c = canvas.current!;
    const ctx = c.getContext("2d")!;
    let raf = 0;
    type Spark = { x: number; y: number; a: number; t: number; color: string; len: number };
    let sparks: Spark[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      c.width = window.innerWidth * dpr;
      c.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.clearRect(0, 0, c.width, c.height);
      sparks = sparks.filter((s) => s.t < 1);
      for (const s of sparks) {
        s.t += 0.045;
        const e = 1 - Math.pow(1 - s.t, 3);
        const d = 10 + e * 38;
        const l = s.len * (1 - e);
        const x1 = s.x + Math.cos(s.a) * d;
        const y1 = s.y + Math.sin(s.a) * d;
        ctx.strokeStyle = s.color;
        ctx.lineWidth = 3.5;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x1 + Math.cos(s.a) * l, y1 + Math.sin(s.a) * l);
        ctx.stroke();
      }
      if (sparks.length) raf = requestAnimationFrame(draw);
    };

    const click = (e: MouseEvent) => {
      const n = 9;
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      for (let i = 0; i < n; i++) {
        sparks.push({ x: e.clientX, y: e.clientY, a: (i / n) * Math.PI * 2, t: 0, color, len: 16 });
      }
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(draw);
    };
    window.addEventListener("pointerdown", click);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointerdown", click);
    };
  }, []);

  return <canvas ref={canvas} className="pointer-events-none fixed inset-0 z-[299] h-screen w-screen" aria-hidden />;
}
