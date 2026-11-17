"use client";

import {
  Children,
  ElementType,
  ReactNode,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export const prefersReduced = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ------------------------------------------------------------------------ */
/* Intro coordination: hero animations wait until the loader has finished.   */
/* ------------------------------------------------------------------------ */
declare global {
  interface Window {
    __crIntroDone?: boolean;
    __crIntroReveal?: boolean;
  }
}

/** The loader has opened onto the page (the page is visible again, before the intro fully ends). */
export function onIntroReveal(cb: () => void) {
  if (typeof window === "undefined") return () => {};
  if (window.__crIntroReveal || window.__crIntroDone) {
    cb();
    return () => {};
  }
  const handler = () => cb();
  window.addEventListener("cr:intro-reveal", handler, { once: true });
  window.addEventListener("cr:intro-done", handler, { once: true });
  return () => {
    window.removeEventListener("cr:intro-reveal", handler);
    window.removeEventListener("cr:intro-done", handler);
  };
}

export function onIntroDone(cb: () => void) {
  if (typeof window === "undefined") return () => {};
  if (window.__crIntroDone) {
    cb();
    return () => {};
  }
  const handler = () => cb();
  window.addEventListener("cr:intro-done", handler, { once: true });
  return () => window.removeEventListener("cr:intro-done", handler);
}

/* ------------------------------------------------------------------------ */
/* SplitText — chars rise out of masked lines                                */
/* ------------------------------------------------------------------------ */
type SplitProps = {
  text: string;
  as?: ElementType;
  className?: string;
  charClassName?: string;
  /** "scroll" animates when it enters view, "intro" after the loader */
  trigger?: "scroll" | "intro" | "mount";
  delay?: number;
  stagger?: number;
  /** split mode */
  by?: "chars" | "words";
};

export function SplitText({
  text,
  as: Tag = "h2",
  className = "",
  charClassName = "",
  trigger = "scroll",
  delay = 0,
  stagger = 0.025,
  by = "chars",
}: SplitProps) {
  const ref = useRef<HTMLElement>(null);
  const lines = text.split("\n");

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const targets = el.querySelectorAll<HTMLElement>(".split-char");
    if (prefersReduced()) {
      gsap.set(targets, { y: 0, yPercent: 0, rotate: 0, opacity: 1 });
      return;
    }
    gsap.set(targets, { y: 0, yPercent: 115, rotate: 8, opacity: 1 });

    const play = () =>
      gsap.to(targets, {
        yPercent: 0,
        rotate: 0,
        duration: 1,
        ease: "expo.out",
        stagger,
        delay,
      });

    let st: ScrollTrigger | undefined;
    let off = () => {};
    if (trigger === "scroll") {
      st = ScrollTrigger.create({ trigger: el, start: "top 88%", once: true, onEnter: play });
    } else if (trigger === "intro") {
      off = onIntroDone(play);
    } else {
      play();
    }
    return () => {
      st?.kill();
      off();
    };
  }, [text]);

  return (
    <Tag ref={ref} className={className} aria-label={text.replace(/\n/g, " ")}>
      {lines.map((line, li) => (
        <span key={li} className="split-line" aria-hidden>
          {by === "words"
            ? line.split(" ").map((w, wi) => (
                <span key={wi} className={`split-char ${charClassName}`}>
                  {w}
                  {wi < line.split(" ").length - 1 ? " " : ""}
                </span>
              ))
            : line.split(" ").map((word, wi, arr) => (
                <span key={wi} className="inline-block whitespace-nowrap">
                  {Array.from(word).map((c, ci) => (
                    <span key={ci} className={`split-char ${charClassName}`}>
                      {c}
                    </span>
                  ))}
                  {wi < arr.length - 1 ? <span className="split-char">{" "}</span> : null}
                </span>
              ))}
        </span>
      ))}
    </Tag>
  );
}

/* ------------------------------------------------------------------------ */
/* Reveal — generic enter animation for any block                           */
/* ------------------------------------------------------------------------ */
type RevealProps = {
  children: ReactNode;
  className?: string;
  variant?: "up" | "pop" | "left" | "right" | "flip";
  delay?: number;
  stagger?: number;
  /** animate direct children individually */
  group?: boolean;
  as?: ElementType;
};

export function Reveal({
  children,
  className = "",
  variant = "up",
  delay = 0,
  stagger = 0.08,
  group = false,
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const targets = group ? Array.from(el.children) : [el];
    if (prefersReduced()) {
      gsap.set(targets, { opacity: 1 });
      return;
    }
    const from: gsap.TweenVars = { opacity: 0 };
    if (variant === "up") Object.assign(from, { y: 70, rotate: 2 });
    if (variant === "pop") Object.assign(from, { scale: 0.6, rotate: -8, y: 40 });
    if (variant === "left") Object.assign(from, { x: -90, rotate: -3 });
    if (variant === "right") Object.assign(from, { x: 90, rotate: 3 });
    if (variant === "flip") Object.assign(from, { rotateX: -80, y: 60, transformPerspective: 900 });

    gsap.set(targets, from);
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 90%",
      once: true,
      onEnter: () =>
        gsap.to(targets, {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          rotate: 0,
          rotateX: 0,
          duration: variant === "pop" ? 0.8 : 1.1,
          ease: variant === "pop" ? "back.out(1.15)" : "expo.out",
          stagger,
          delay,
        }),
    });
    return () => st.kill();
  }, []);

  return (
    <Tag
      ref={ref}
      className={className}
      data-reveal={group ? undefined : ""}
      data-reveal-group={group ? "" : undefined}
    >
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------------------ */
/* Magnetic — element leans toward the pointer                              */
/* ------------------------------------------------------------------------ */
export function Magnetic({
  children,
  strength = 0.35,
  className = "",
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const zone = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hit = zone.current;
    const el = ref.current;
    if (!hit || !el || prefersReduced() || window.matchMedia("(pointer: coarse)").matches) return;
    // The pointer is read from a static outer zone while only the inner layer moves.
    // Measuring the moving element itself made it slide out from under the cursor,
    // fire pointerleave, snap back and re-enter: a visible jitter at the edges.
    const xTo = gsap.quickTo(el, "x", { duration: 0.45, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.45, ease: "power3.out" });
    const MAX = 10;
    const clampPx = (v: number) => Math.max(-MAX, Math.min(MAX, v));
    const move = (e: PointerEvent) => {
      const r = hit.getBoundingClientRect();
      xTo(clampPx((e.clientX - (r.left + r.width / 2)) * strength));
      yTo(clampPx((e.clientY - (r.top + r.height / 2)) * strength));
    };
    const leave = () => {
      xTo(0);
      yTo(0);
    };
    hit.addEventListener("pointermove", move);
    hit.addEventListener("pointerleave", leave);
    return () => {
      hit.removeEventListener("pointermove", move);
      hit.removeEventListener("pointerleave", leave);
    };
  }, [strength]);

  return (
    <div ref={zone} className={`inline-block ${className}`}>
      <div ref={ref} className="inline-block will-change-transform">
        {children}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------ */
/* TiltCard — real 3D tilt with moving glare & depth layers                 */
/* children can use style={{ transform: "translateZ(40px)" }} for depth      */
/* ------------------------------------------------------------------------ */
export function TiltCard({
  children,
  className = "",
  max = 14,
  glare = true,
  style,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
  glare?: boolean;
  style?: React.CSSProperties;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const shine = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const w = wrap.current;
    const c = card.current;
    if (!w || !c || prefersReduced() || window.matchMedia("(pointer: coarse)").matches) return;
    const rx = gsap.quickTo(c, "rotateX", { duration: 0.5, ease: "power3.out" });
    const ry = gsap.quickTo(c, "rotateY", { duration: 0.5, ease: "power3.out" });
    const move = (e: PointerEvent) => {
      const r = w.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      ry((px - 0.5) * max * 2);
      rx(-(py - 0.5) * max * 2);
      if (shine.current) {
        shine.current.style.background = `radial-gradient(circle at ${px * 100}% ${py * 100}%, rgba(255,255,255,0.45), transparent 55%)`;
        shine.current.style.opacity = "1";
      }
    };
    const leave = () => {
      rx(0);
      ry(0);
      if (shine.current) shine.current.style.opacity = "0";
    };
    w.addEventListener("pointermove", move);
    w.addEventListener("pointerleave", leave);
    return () => {
      w.removeEventListener("pointermove", move);
      w.removeEventListener("pointerleave", leave);
    };
  }, [max]);

  return (
    <div ref={wrap} className="perspective" style={style}>
      <div ref={card} className={`relative preserve-3d will-change-transform ${className}`}>
        {children}
        {glare && (
          <div
            ref={shine}
            className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 mix-blend-soft-light"
          />
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------ */
/* CountUp                                                                   */
/* ------------------------------------------------------------------------ */
export function CountUp({
  value,
  suffix = "",
  prefix = "",
  className = "",
  duration = 2,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fmt = (n: number) => `${prefix}${Math.round(n).toLocaleString("en-IN")}${suffix}`;
    if (prefersReduced()) {
      el.textContent = fmt(value);
      return;
    }
    const obj = { n: 0 };
    el.textContent = fmt(0);
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 92%",
      once: true,
      onEnter: () =>
        gsap.to(obj, {
          n: value,
          duration,
          ease: "power4.out",
          onUpdate: () => {
            el.textContent = fmt(obj.n);
          },
        }),
    });
    return () => st.kill();
  }, [value, suffix, prefix, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------------------ */
/* Marquee — infinite ticker, speeds up with scroll velocity                */
/* ------------------------------------------------------------------------ */
export function Marquee({
  children,
  speed = 28,
  reverse = false,
  className = "",
}: {
  children: ReactNode;
  speed?: number;
  reverse?: boolean;
  className?: string;
}) {
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = track.current;
    if (!el || prefersReduced()) return;
    const anims = el.getAnimations();
    const st = ScrollTrigger.create({
      onUpdate: (self) => {
        const v = Math.min(Math.abs(self.getVelocity()) / 400, 4);
        anims.forEach((a) => (a.playbackRate = 1 + v));
      },
    });
    return () => st.kill();
  }, []);

  const items = Children.toArray(children);
  return (
    <div className={`marquee overflow-hidden ${className}`}>
      <div
        ref={track}
        className={`marquee-track ${reverse ? "rev" : ""}`}
        style={{ ["--marquee-speed" as string]: `${speed}s` }}
      >
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0 items-center" aria-hidden={k === 1}>
            {items}
            {items}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------ */
/* Scramble — hacker text shuffle on hover / mount                          */
/* ------------------------------------------------------------------------ */
const GLYPHS = "!<>-_\\/[]{}—=+*^?#01ABCDEFXYZ";

export function Scramble({
  text,
  className = "",
  onMount = false,
}: {
  text: string;
  className?: string;
  onMount?: boolean;
}) {
  const [out, setOut] = useState(text);
  const raf = useRef(0);

  const run = () => {
    if (prefersReduced()) return;
    cancelAnimationFrame(raf.current);
    let frame = 0;
    const total = text.length * 2 + 8;
    const step = () => {
      frame++;
      const revealed = Math.floor((frame / total) * text.length);
      setOut(
        Array.from(text)
          .map((c, i) =>
            i < revealed || c === " " ? c : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
          )
          .join("")
      );
      if (frame < total) raf.current = requestAnimationFrame(step);
      else setOut(text);
    };
    raf.current = requestAnimationFrame(step);
  };

  useEffect(() => {
    if (onMount) run();
    return () => cancelAnimationFrame(raf.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  return (
    <span className={className} onPointerEnter={run}>
      {out}
    </span>
  );
}

/* ------------------------------------------------------------------------ */
/* Parallax — scrub an element on scroll                                    */
/* ------------------------------------------------------------------------ */
export function Parallax({
  children,
  speed = 0.3,
  rotate = 0,
  className = "",
  style,
}: {
  children: ReactNode;
  speed?: number;
  rotate?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReduced()) return;
    const tw = gsap.fromTo(
      el,
      { yPercent: -speed * 50, rotate: -rotate },
      {
        yPercent: speed * 50,
        rotate,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.6 },
      }
    );
    return () => {
      tw.scrollTrigger?.kill();
      tw.kill();
    };
  }, [speed, rotate]);
  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
