"use client";

import { useEffect, useId, useRef } from "react";
import { prefersReduced } from "./motion";

/** Text running along a wavy SVG path, endlessly. Drag to scrub. */
export default function CurvedLoop({
  text,
  className = "",
  color = "var(--ink)",
  speed = 0.6,
  curve = 70,
}: {
  text: string;
  className?: string;
  color?: string;
  speed?: number;
  curve?: number;
}) {
  const id = useId().replace(/:/g, "");
  const tp = useRef<SVGTextPathElement>(null);
  const measure = useRef<SVGTextElement>(null);

  useEffect(() => {
    const t = tp.current;
    const m = measure.current;
    if (!t || !m) return;
    const unit = m.getComputedTextLength();
    let offset = -unit;
    let raf = 0;
    let dragging = false;
    let lastX = 0;
    let vel = speed;
    const reduced = prefersReduced();

    const loop = () => {
      if (!dragging) {
        vel += (speed - vel) * 0.05;
        offset += vel;
      }
      if (offset > 0) offset -= unit;
      if (offset < -unit) offset += unit;
      t.setAttribute("startOffset", `${offset}px`);
      raf = requestAnimationFrame(loop);
    };
    if (!reduced) raf = requestAnimationFrame(loop);

    const svg = t.ownerSVGElement!;
    const down = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      svg.setPointerCapture(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      lastX = e.clientX;
      offset += dx * 1.4;
      vel = dx * 1.4;
    };
    const up = () => (dragging = false);
    svg.addEventListener("pointerdown", down);
    svg.addEventListener("pointermove", move);
    svg.addEventListener("pointerup", up);
    svg.addEventListener("pointercancel", up);
    return () => {
      cancelAnimationFrame(raf);
      svg.removeEventListener("pointerdown", down);
      svg.removeEventListener("pointermove", move);
      svg.removeEventListener("pointerup", up);
      svg.removeEventListener("pointercancel", up);
    };
  }, [speed, text]);

  const repeated = Array(8).fill(text).join("");

  return (
    <div className={`w-full overflow-hidden select-none ${className}`} data-cursor="Drag">
      <svg viewBox="0 0 1440 220" className="block w-full" style={{ touchAction: "pan-y" }}>
        <text ref={measure} className="font-display" style={{ fontSize: 64, visibility: "hidden" }}>
          {text}
        </text>
        <defs>
          <path id={`cl-${id}`} d={`M-100,${110 - curve / 2} Q520,${110 + curve} 1440,${110 - curve / 2}`} fill="none" />
        </defs>
        <text className="font-display" style={{ fontSize: 64, fill: color, letterSpacing: "-0.02em" }}>
          <textPath ref={tp} href={`#cl-${id}`}>
            {repeated}
          </textPath>
        </text>
      </svg>
    </div>
  );
}
