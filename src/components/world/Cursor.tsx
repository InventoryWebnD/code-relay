"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * Mascot cursor: Webby (the WebnD mascot) trails the pointer and leans into the
 * movement, while a small teal dot (the colour of his hood) marks the exact click point. Add
 * `data-cursor="Label"` to a surface (not a link/button) to show a word
 * beside the mascot.
 */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const buddy = useRef<HTMLDivElement>(null);
  const mascot = useRef<HTMLImageElement>(null);
  const pill = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const d = dot.current!;
    const b = buddy.current!;
    const m = mascot.current!;
    const p = pill.current!;
    document.documentElement.classList.add("has-cursor");
    // Hidden until the mouse actually moves (no stray cursor parked at 0,0).
    gsap.set(d, { xPercent: -50, yPercent: -50, autoAlpha: 0 });
    gsap.set(b, { autoAlpha: 0 });
    gsap.set(p, { autoAlpha: 0, x: -6 });
    let shown = false;

    const dx = gsap.quickTo(d, "x", { duration: 0.06, ease: "power3" });
    const dy = gsap.quickTo(d, "y", { duration: 0.06, ease: "power3" });
    // the mascot trails a touch behind, down-right of the click point
    const OFF_X = 14;
    const OFF_Y = 12;
    const bx = gsap.quickTo(b, "x", { duration: 0.42, ease: "power3" });
    const by = gsap.quickTo(b, "y", { duration: 0.42, ease: "power3" });
    const lean = gsap.quickTo(m, "rotate", { duration: 0.5, ease: "power3" });

    let lastX = 0;
    let hovering: Element | null = null;
    let restScale = 1;

    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return; // pen/touch on hybrid laptops: no follower
      if (!shown) {
        shown = true;
        gsap.set(d, { x: e.clientX, y: e.clientY });
        gsap.set(b, { x: e.clientX + OFF_X, y: e.clientY + OFF_Y });
        gsap.to([d, b], { autoAlpha: 1, duration: 0.25, ease: "power2.out" });
      }
      dx(e.clientX);
      dy(e.clientY);
      bx(e.clientX + OFF_X);
      by(e.clientY + OFF_Y);
      // lean into horizontal movement, settle when still
      const vx = e.clientX - lastX;
      lastX = e.clientX;
      lean(Math.max(-16, Math.min(16, vx * 0.9)));
    };

    const over = (e: PointerEvent) => {
      const t = (e.target as HTMLElement).closest("a, button, [data-cursor], input, textarea, select, label");
      if (t === hovering) return;
      hovering = t;
      // Links and buttons already say what they do: no label over their text.
      const control = !!t?.matches("a, button");
      const label = control ? "" : (t?.getAttribute("data-cursor") ?? "");
      const field = !!t?.matches("input, textarea, select");
      restScale = !t ? 1 : field ? 0.8 : 1.18;
      gsap.to(m, { scale: restScale, duration: 0.4, ease: "power3.out", overwrite: "auto" });
      gsap.to(d, {
        scale: !t ? 1 : field ? 0.6 : 1.7,
        backgroundColor: t && !field ? "rgba(90,167,167,0.16)" : "#5AA7A7",
        borderColor: t && !field ? "rgba(90,167,167,0.7)" : "rgba(90,167,167,0)",
        duration: 0.35,
        ease: "power3.out",
        overwrite: "auto",
      });
      if (label) p.textContent = label;
      gsap.to(p, { autoAlpha: label ? 1 : 0, x: label ? 0 : -6, duration: 0.3, ease: "power3.out", overwrite: "auto" });
    };

    const down = () => gsap.to(m, { scale: restScale * 0.88, y: 2, duration: 0.15, ease: "power2.out", overwrite: "auto" });
    const up = () => gsap.to(m, { scale: restScale, y: 0, duration: 0.35, ease: "power3.out", overwrite: "auto" });
    // Leaving the window: watch for a mouseout with no destination, and hide on
    // tab/window blur. The next pointermove brings it back under the pointer.
    const hide = () => {
      shown = false;
      gsap.to([d, b], { autoAlpha: 0, duration: 0.2, overwrite: "auto" });
    };
    const out = (e: MouseEvent) => {
      if (!e.relatedTarget) hide();
    };

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerover", over);
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    document.addEventListener("mouseout", out);
    window.addEventListener("blur", hide);

    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      document.removeEventListener("mouseout", out);
      window.removeEventListener("blur", hide);
    };
  }, []);

  return (
    <>
      <div ref={buddy} className="pointer-events-none fixed left-0 top-0 z-[300] invisible flex items-start gap-1.5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={mascot}
          src="/brand/webnd-mascot-fly.webp"
          alt=""
          draggable={false}
          className="h-auto w-9 origin-top-left select-none"
        />
        <span ref={pill} className="label invisible mt-1 whitespace-nowrap rounded-full bg-[var(--crimson)] px-2.5 py-1 text-[10px] text-[var(--cream)]" />
      </div>
      <div
        ref={dot}
        className="pointer-events-none fixed left-0 top-0 z-[301] invisible h-2 w-2 rounded-full border border-transparent bg-[var(--teal)]"
      />
    </>
  );
}
