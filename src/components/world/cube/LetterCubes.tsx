"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { onIntroDone, prefersReduced } from "../motion";

const FACE_SETS = [
  ["#F6F0E8", "#991B3D", "#0B1B4D", "#F5B000"],
  ["#991B3D", "#F6F0E8", "#F5B000", "#0B1B4D"],
  ["#0B1B4D", "#F5B000", "#F6F0E8", "#991B3D"],
  ["#F6F0E8", "#5AA7A7", "#991B3D", "#F6F0E8"],
];
const INK_ON = (bg: string) => (bg === "#F6F0E8" || bg === "#F5B000" ? "#15060B" : "#F6F0E8");

export const BASE_RX = -16;
export const BASE_RY = 24;

/** One letter on a real CSS 3D cube. Rolls a quarter turn on hover / tap. */
export function LetterCube({ ch, set = 0, className = "" }: { ch: string; set?: number; className?: string }) {
  const inner = useRef<HTMLSpanElement>(null);
  const turns = useRef(0);
  const faces = FACE_SETS[set % FACE_SETS.length];

  const roll = () => {
    const el = inner.current;
    if (!el || prefersReduced()) return;
    turns.current += 1;
    gsap.to(el, { rotationX: BASE_RX - turns.current * 90, duration: 0.7, ease: "back.out(1.6)", overwrite: "auto" });
  };

  const half = "0.5em";
  const ring = [0, 90, 180, 270]; // faces around the X axis
  return (
    <span
      className={`lc relative inline-block h-[1em] w-[1em] [perspective:6em] ${className}`}
      onPointerEnter={roll}
      onClick={roll}
      aria-hidden
    >
      <span
        ref={inner}
        className="lc-inner absolute inset-0 [transform-style:preserve-3d]"
        style={{ transform: `rotateX(${BASE_RX}deg) rotateY(${BASE_RY}deg)` }}
      >
        {ring.map((deg, i) => (
          <span
            key={deg}
            className="absolute inset-0 grid place-items-center [backface-visibility:hidden] font-display leading-none"
            style={{
              background: faces[i],
              color: INK_ON(faces[i]),
              transform: `rotateX(${deg}deg) translateZ(${half})`,
              boxShadow: "inset 0 0 0 0.045em #15060B",
              fontSize: "0.72em",
              paddingTop: "0.08em",
            }}
          >
            <span style={{ fontSize: "1.389em" }}>{ch}</span>
          </span>
        ))}
        {[90, -90].map((deg) => (
          <span
            key={deg}
            className="absolute inset-0 [backface-visibility:hidden]"
            style={{
              background: deg > 0 ? "#620821" : "#2A1118",
              transform: `rotateY(${deg}deg) translateZ(${half})`,
              boxShadow: "inset 0 0 0 0.045em #15060B",
            }}
          />
        ))}
      </span>
    </span>
  );
}

/**
 * A word made of letter cubes. `trigger="intro"` tumbles them in after the
 * loader; "scroll" when visible; "none" leaves them static.
 */
export function CubeWord({
  text,
  className = "",
  gap = "0.08em",
  trigger = "scroll",
  setOffset = 0,
}: {
  text: string;
  className?: string;
  gap?: string;
  trigger?: "intro" | "scroll" | "none";
  setOffset?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || trigger === "none" || prefersReduced()) return;
    const cubes = el.querySelectorAll<HTMLElement>(".lc");
    gsap.set(cubes, { y: "-1.6em", opacity: 0 });
    const play = () => {
      gsap.to(cubes, { y: 0, opacity: 1, duration: 0.9, ease: "bounce.out", stagger: { each: 0.06, from: "start" } });
      cubes.forEach((c, i) => {
        const inner = c.querySelector(".lc-inner");
        gsap.fromTo(inner, { rotationX: BASE_RX + 270, rotationY: BASE_RY }, { rotationX: BASE_RX, duration: 1.1, ease: "power3.out", delay: i * 0.06 });
      });
    };
    let io: IntersectionObserver | undefined;
    let off = () => {};
    if (trigger === "intro") off = onIntroDone(play);
    else {
      io = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) {
            play();
            io?.disconnect();
          }
        },
        { threshold: 0.4 }
      );
      io.observe(el);
    }
    return () => {
      off();
      io?.disconnect();
    };
  }, [trigger]);

  let n = setOffset;
  return (
    <span ref={ref} className={`inline-flex flex-wrap items-end ${className}`} style={{ gap }} aria-label={text}>
      {Array.from(text).map((ch, i) =>
        ch === " " ? (
          <span key={i} className="inline-block w-[0.35em]" />
        ) : (
          <LetterCube key={i} ch={ch} set={n++} />
        )
      )}
    </span>
  );
}
