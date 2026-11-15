"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";

const BASE_RX = 0;

/** Wordmark letters (flip in on X). The "O" can double as the portal we dive through. */
function Word({ text, portal = false }: { text: string; portal?: boolean }) {
  return (
    <span className="flex font-display leading-[0.9]" aria-hidden>
      {Array.from(text).map((ch, i) => (
        <span key={i} className="lc relative inline-block [perspective:6em]" {...(portal && ch === "O" ? { "data-portal": "" } : {})}>
          <span className="lc-inner inline-block [transform-style:preserve-3d]">{ch}</span>
        </span>
      ))}
    </span>
  );
}

const useIso = typeof window !== "undefined" ? useLayoutEffect : useEffect;

function finishIntro() {
  window.__crIntroDone = true;
  window.dispatchEvent(new Event("cr:intro-done"));
}

/**
 * Logo reveal → dive through the "O" into the relay world.
 * Full sequence on the first visit of a session (or with ?intro), a quick
 * fade afterwards.
 */
export default function IntroLoader() {
  const root = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const [gone, setGone] = useState(false);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useIso(() => {
    const el = root.current;
    if (!el) return;
    const html = document.documentElement;
    html.style.overflow = "hidden";

    const seen = sessionStorage.getItem("cr5-intro") === "1";
    const force = new URLSearchParams(window.location.search).has("intro");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const done = () => {
      html.style.overflow = "";
      sessionStorage.setItem("cr5-intro", "1");
      setGone(true);
    };
    const q = gsap.utils.selector(el);

    if ((seen && !force) || reduced) {
      const t = gsap.timeline({ onComplete: done });
      gsap.set(q(".intro-content"), { autoAlpha: 0 });
      t.add(finishIntro, 0.05).to(el, { autoAlpha: 0, duration: reduced ? 0.01 : 0.6, ease: "power2.out" }, 0.1);
      tl.current = t;
      return () => {
        t.kill();
        html.style.overflow = "";
      };
    }

    const ctx = gsap.context(() => {
      const count = { v: 0 };
      const cubes = q(".lc");
      const inners = q(".lc-inner");
      gsap.set(cubes, { y: "-2.2em", opacity: 0 });
      gsap.set(inners, { rotationX: BASE_RX + 360 });
      gsap.set(".stamp", { scale: 4, rotate: -40, opacity: 0 });
      gsap.set(".tagline-char", { opacity: 0, y: 12 });
      gsap.set(".grid-line-h", { scaleX: 0 });
      gsap.set(".grid-line-v", { scaleY: 0 });
      gsap.set(".spark", { scale: 0 });
      gsap.set(".peek", { yPercent: 110 });

      const t = gsap.timeline({ defaults: { ease: "expo.out" }, onComplete: done });
      tl.current = t;

      t.to(".grid-line-h", { scaleX: 1, duration: 1.1, stagger: 0.04, ease: "power3.inOut" }, 0)
        .to(".grid-line-v", { scaleY: 1, duration: 1.1, stagger: 0.04, ease: "power3.inOut" }, 0.1)
        .to(count, {
          v: 100,
          duration: 2.7,
          ease: "power2.inOut",
          onUpdate: () => {
            if (counter.current) counter.current.textContent = String(Math.round(count.v)).padStart(3, "0");
          },
        }, 0.2)
        .to(".bar-fill", { scaleX: 1, duration: 2.7, ease: "power2.inOut" }, 0.2)
        .to(".runner", { left: "100%", xPercent: -100, duration: 2.7, ease: "power2.inOut" }, 0.2)
        .to(cubes, { y: 0, opacity: 1, duration: 1, ease: "bounce.out", stagger: { each: 0.08, from: "random" } }, 0.6)
        .to(inners, { rotationX: BASE_RX, duration: 1.2, ease: "power3.out", stagger: { each: 0.08, from: "random" } }, 0.6)
        .to(".stamp", { scale: 1, rotate: -12, opacity: 1, duration: 0.45, ease: "power4.in" }, 1.9)
        .to(".wordmark", { x: 8, yoyo: true, repeat: 5, duration: 0.04, ease: "none" }, 2.35)
        .to(".spark", { scale: 1, duration: 0.5, stagger: 0.03, ease: "back.out(3)" }, 2.35)
        .to(".spark", { opacity: 0, scale: 1.6, duration: 0.4 }, 2.75)
        .to(".peek", { yPercent: 0, duration: 0.8, ease: "back.out(2)" }, 2.3)
        .to(".tagline-char", { opacity: 1, y: 0, duration: 0.3, stagger: 0.025, ease: "power2.out" }, 2.5)
        // dive through the O
        .add(() => {
          const o = el.querySelector<HTMLElement>("[data-portal]");
          const stage = el.querySelector<HTMLElement>(".intro-stage");
          if (!o || !stage) return;
          const r = o.getBoundingClientRect();
          gsap.set(stage, { transformOrigin: `${r.left + r.width / 2}px ${r.top + r.height / 2}px` });
        }, 3.55)
        .to([".hud", ".stamp", ".peek-wrap"], { opacity: 0, duration: 0.3, ease: "power2.in" }, 3.55)
        .to(".intro-stage", { scale: 38, duration: 1.15, ease: "expo.in" }, 3.6)
        .add(finishIntro, 4.35)
        .to(el, { autoAlpha: 0, duration: 0.45, ease: "power2.out" }, 4.6);
    }, el);

    return () => {
      ctx.revert();
      html.style.overflow = "";
    };
  }, []);

  const skip = () => {
    const t = tl.current;
    if (t && t.time() < 3.5) t.seek(3.5);
  };

  if (gone) return null;
  const tagline = "#SprintToInnovation";

  return (
    <div ref={root} className="fixed inset-0 z-[200] overflow-hidden bg-[var(--cream)]" aria-label="Loading Code Relay 5.0" role="status">
      <div className="intro-stage intro-content absolute inset-0 will-change-transform">
        <div className="hud absolute inset-0">
          {Array.from({ length: 16 }).map((_, i) => (
            <span key={`h${i}`} className="grid-line-h absolute left-0 right-0 h-px origin-left bg-[rgba(21,6,11,0.09)]" style={{ top: `${(i + 1) * 6.25}%` }} />
          ))}
          {Array.from({ length: 24 }).map((_, i) => (
            <span key={`v${i}`} className="grid-line-v absolute top-0 bottom-0 w-px origin-top bg-[rgba(21,6,11,0.09)]" style={{ left: `${(i + 1) * 4.1667}%` }} />
          ))}
          <div className="absolute left-5 top-5 sm:left-8 sm:top-7 label text-[var(--ink)]/70">WebnD · IIT Bhubaneswar</div>
          <div className="absolute right-5 top-5 sm:right-8 sm:top-7 label text-[var(--ink)]/70">5th Edition</div>
        </div>

        {/* one centred column: mascot peeks over the wordmark, then a tidy
            stamp + tagline row — nothing overlaps the letters */}
        <div className="absolute inset-0 flex items-center justify-center px-5 pb-24">
          <div className="flex flex-col items-center">
            <div className="wordmark relative">
              <div className="peek-wrap absolute bottom-full left-[6%] h-[clamp(52px,8vw,112px)] w-[clamp(60px,9vw,128px)] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/brand/webnd-mascot-stand.webp" alt="" className="peek absolute bottom-[-38%] left-0 w-full" />
              </div>
              <div className="flex flex-col items-start gap-[0.12em] text-[clamp(44px,10vw,136px)]">
                <Word text="CODE" portal />
                <span className="text-[var(--crimson)]">
                  <Word text="RELAY" />
                </span>
              </div>
            </div>

            <div className="mt-[clamp(20px,3vw,36px)] flex items-center gap-4 sm:gap-6">
              <div className="stamp relative grid shrink-0 place-items-center rounded-full border-[3px] border-[var(--ink)] bg-[var(--crimson)] text-[var(--cream)] h-[clamp(58px,7vw,92px)] w-[clamp(58px,7vw,92px)]">
                <div className="text-center">
                  <div className="font-display text-[clamp(18px,2.4vw,32px)] leading-none">5.0</div>
                  <div className="label mt-0.5 text-[clamp(7px,0.7vw,9px)]">edition</div>
                </div>
                {Array.from({ length: 10 }).map((_, i) => (
                  <span key={i} className="spark absolute left-1/2 top-1/2 h-[4px] w-[34%] origin-left rounded-full bg-[var(--sun)]" style={{ transform: `rotate(${i * 36}deg) translateX(120%)` }} />
                ))}
              </div>
              <div className="hud font-mono text-sm font-bold text-[var(--crimson)] sm:text-base">
                {Array.from(tagline).map((c, i) => (
                  <span key={i} className="tagline-char inline-block">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="hud absolute bottom-7 left-5 right-5 sm:bottom-8 sm:left-8 sm:right-8">
          {/* room above the bar for the running mascot, so it never sits on the counter */}
          <div className="mb-[60px] flex items-end justify-between gap-4">
            <span ref={counter} className="font-display text-[clamp(34px,5vw,72px)] text-outline leading-none">
              000
            </span>
            <button onClick={skip} className="label rounded-full border-2 border-[var(--ink)] bg-[var(--paper)] px-4 py-2 transition-colors hover:bg-[var(--ink)] hover:text-[var(--cream)]">
              Skip intro →
            </button>
          </div>
          <div className="relative h-4 rounded-full border-[3px] border-[var(--ink)] bg-[var(--paper)]">
            <div className="bar-fill absolute inset-0 origin-left scale-x-0 rounded-full bg-[repeating-linear-gradient(-45deg,var(--crimson)_0_10px,var(--crimson-hot)_10px_20px)]" />
            <div className="runner absolute -top-[52px] left-0 h-[64px] w-[64px]">
              <div className="absolute right-[70%] top-1/2 flex -translate-y-1/2 flex-col gap-1.5">
                {[28, 44, 22].map((w, i) => (
                  <span key={i} className="block h-[3px] rounded-full bg-[var(--ink)]" style={{ width: w }} />
                ))}
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/webnd-mascot-fly.webp" alt="" className="relative h-full w-full -scale-x-100 object-contain" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
