"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * Playful two-part cursor: a crimson dot + an ink ring that swells over
 * interactive elements. Add `data-cursor="Label"` to show a word inside.
 */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const text = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const d = dot.current!;
    const r = ring.current!;
    document.documentElement.classList.add("has-cursor");
    gsap.set([d, r], { xPercent: -50, yPercent: -50, autoAlpha: 1 });

    const dx = gsap.quickTo(d, "x", { duration: 0.08, ease: "power3" });
    const dy = gsap.quickTo(d, "y", { duration: 0.08, ease: "power3" });
    const rx = gsap.quickTo(r, "x", { duration: 0.45, ease: "power3" });
    const ry = gsap.quickTo(r, "y", { duration: 0.45, ease: "power3" });

    let lastX = 0;
    let lastY = 0;
    let hovering: Element | null = null;
    let restScale = 1;

    const move = (e: PointerEvent) => {
      dx(e.clientX);
      dy(e.clientY);
      rx(e.clientX);
      ry(e.clientY);
      // squash & stretch with velocity
      const vx = e.clientX - lastX;
      const vy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;
      if (!hovering) {
        const speed = Math.min(Math.hypot(vx, vy) / 60, 0.22);
        const angle = (Math.atan2(vy, vx) * 180) / Math.PI;
        gsap.to(r, { scaleX: 1 + speed, scaleY: 1 - speed * 0.6, rotate: angle, duration: 0.2, overwrite: "auto" });
      }
    };

    const over = (e: PointerEvent) => {
      const t = (e.target as HTMLElement).closest("a, button, [data-cursor], input, textarea, select, label");
      if (t === hovering) return;
      hovering = t;
      // Buttons and links already say what they do: the cursor only rings them,
      // it never sits on top of their text. Labels are for surfaces with no
      // text of their own (drag the dome, flip a coin).
      const control = !!t?.matches("a, button");
      const label = control ? "" : (t?.getAttribute("data-cursor") ?? "");
      if (text.current) text.current.textContent = label;
      restScale = !t ? 1 : t.matches("input, textarea, select") ? 0.6 : label ? 2.6 : 1.6;
      if (t) {
        gsap.to(r, {
          rotate: 0,
          scaleX: restScale,
          scaleY: restScale,
          backgroundColor: label ? "#991B3D" : "rgba(153,27,61,0.08)",
          borderColor: label ? "#991B3D" : "rgba(21,6,11,0.55)",
          duration: 0.4,
          ease: "power3.out",
          overwrite: "auto",
        });
        gsap.to(d, { scale: label ? 0 : 0.5, duration: 0.3, ease: "power3.out" });
      } else {
        gsap.to(r, { scaleX: 1, scaleY: 1, backgroundColor: "rgba(0,0,0,0)", borderColor: "#15060B", duration: 0.4, ease: "power3.out", overwrite: "auto" });
        gsap.to(d, { scale: 1, duration: 0.3, ease: "power3.out" });
      }
    };

    const down = () => gsap.to(r, { scale: restScale * 0.85, duration: 0.15, ease: "power2.out", overwrite: "auto" });
    const up = () => gsap.to(r, { scale: restScale, duration: 0.35, ease: "power3.out", overwrite: "auto" });
    const leave = () => gsap.to([d, r], { autoAlpha: 0, duration: 0.2 });
    const enter = () => gsap.to([d, r], { autoAlpha: 1, duration: 0.2 });

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerover", over);
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    document.documentElement.addEventListener("pointerleave", leave);
    document.documentElement.addEventListener("pointerenter", enter);

    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      document.documentElement.removeEventListener("pointerleave", leave);
      document.documentElement.removeEventListener("pointerenter", enter);
    };
  }, []);

  return (
    <>
      <div
        ref={ring}
        className="pointer-events-none fixed left-0 top-0 z-[300] invisible grid h-9 w-9 place-items-center rounded-full border-2 border-[var(--ink)] mix-blend-normal"
      >
        <span ref={text} className="font-mono text-[4.5px] font-bold uppercase tracking-wider text-[var(--cream)]" />
      </div>
      <div
        ref={dot}
        className="pointer-events-none fixed left-0 top-0 z-[301] invisible h-2.5 w-2.5 rounded-full bg-[var(--crimson)]"
      />
    </>
  );
}
