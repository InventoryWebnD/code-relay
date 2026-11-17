"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Anton } from "next/font/google";
import gsap from "gsap";
import type { WebbyScene } from "./introWebby";

const anton = Anton({ weight: "400", subsets: ["latin"], display: "swap" });

const useIso = typeof window !== "undefined" ? useLayoutEffect : useEffect;

const MSGS: [number, string][] = [
  [0, "Lacing up Webby…"],
  [0.25, "Building the track…"],
  [0.55, "Loading the 3D world…"],
  [0.82, "Fetching the baton…"],
  [0.99, "Pass the baton!"],
];
/** simulated progress length; real page load can hold it at 90% */
const RUN_MS = 3800;
/** never wait on window "load" longer than this */
const LOAD_CAP_MS = 9000;
const MARQUEE = Array.from({ length: 8 }, () => "#SprintToInnovation ✦ Pass the baton ✦ ").join("");

function finishIntro() {
  window.__crIntroDone = true;
  window.dispatchEvent(new Event("cr:intro-done"));
}

/** CSS-pixel box of the "O" glyph itself (not its line box), from canvas text metrics */
function glyphBox(o: HTMLElement) {
  const r = o.getBoundingClientRect();
  const ctx = document.createElement("canvas").getContext("2d");
  if (!ctx) return { x: r.left + r.width / 2, y: r.top + r.height / 2, hw: r.width * 0.45, hh: r.height * 0.4 };
  ctx.font = getComputedStyle(o).font;
  const m = ctx.measureText("O");
  // an inline box's rect is its font content area, so its top + font ascent is the baseline
  const baseline = r.top + m.fontBoundingBoxAscent;
  const hh = (m.actualBoundingBoxAscent + m.actualBoundingBoxDescent) / 2;
  const hw = (m.actualBoundingBoxLeft + m.actualBoundingBoxRight) / 2;
  return { x: r.left + r.width / 2, y: baseline - m.actualBoundingBoxAscent + hh, hw, hh };
}

/**
 * Webby loader → the wordmark fills in → the "O" of CODE opens onto the page
 * and we fly through it. Full sequence on the first visit of a session (or
 * with ?intro), a quick fade afterwards.
 */
export default function IntroLoader() {
  const root = useRef<HTMLDivElement>(null);
  const finishRef = useRef<() => void>(() => {});
  const [gone, setGone] = useState(false);

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
    const one = <T extends Element = HTMLElement>(s: string) => el.querySelector<T>(s)!;

    if ((seen && !force) || reduced) {
      const t = gsap.timeline({ onComplete: done });
      gsap.set(q(".intro-content"), { autoAlpha: 0 });
      t.add(finishIntro, 0.05).to(el, { autoAlpha: 0, duration: reduced ? 0.01 : 0.6, ease: "power2.out" }, 0.1);
      return () => {
        t.kill();
        html.style.overflow = "";
      };
    }

    const stage = one(".cr-stage");
    const bg = one(".cr-bg");
    const words = one(".cr-words");
    const canvas = one<HTMLCanvasElement>("canvas");
    const pct = one(".cr-pct-n");
    const status = one(".cr-status");

    let alive = true;
    let raf = 0;
    let webby: WebbyScene | null = null;
    let shown = 0;
    let target = 0;
    let finishing = false;
    let exiting = false;
    let render3d = true;
    let parallax = true;
    let lastMsg = -1;
    let mx = 0;
    let my = 0;
    let sx = 0;
    let sy = 0;
    const ex = { k: 0 };
    let loaded = document.readyState === "complete";
    const t0 = performance.now();
    let last = t0;
    let exitTl: gsap.core.Timeline | null = null;

    const onLoad = () => (loaded = true);
    const onMove = (e: PointerEvent) => {
      mx = (e.clientX / window.innerWidth) * 2 - 1;
      my = (e.clientY / window.innerHeight) * 2 - 1;
    };
    const onResize = () => webby?.resize();
    window.addEventListener("load", onLoad);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("resize", onResize);

    import("./introWebby")
      .then(({ createWebby }) => {
        if (!alive || !render3d) return;
        webby = createWebby(canvas);
        webby.resize();
        gsap.to(q(".cr-boot"), { autoAlpha: 0, scale: 0.4, duration: 0.3 });
      })
      .catch(() => {
        // no WebGL: the counter, wordmark and the dive through the O still run
      });

    finishRef.current = () => {
      finishing = true;
    };

    const setHole = (x: number, y: number, rx: number, ry: number) => {
      const m = `radial-gradient(${rx.toFixed(2)}px ${ry.toFixed(2)}px at ${x.toFixed(1)}px ${y.toFixed(1)}px, transparent 98%, #000 100%)`;
      bg.style.maskImage = m;
      bg.style.webkitMaskImage = m;
    };

    const startExit = () => {
      exiting = true;
      mx = my = 0; // let the parallax settle while Webby dashes
      const hole = { r: 0 };
      let box = { x: 0, y: 0, hw: 0, hh: 0 };

      exitTl = gsap
        .timeline({ onComplete: done })
        // Webby dashes at the camera, the vault swells
        .to(ex, { k: 1, duration: 1, ease: "power2.inOut" }, 0)
        .to(q(".cr-hud"), { autoAlpha: 0, y: 12, duration: 0.35, ease: "power2.in" }, 0)
        // the outlined wordmark fills in behind him
        .to(q(".cr-fill"), { color: "#f6f0e8", duration: 0.5, ease: "power2.out" }, 0.45)
        .to(q(".cr-fill-teal"), { color: "#5aa7a7", duration: 0.5, ease: "power2.out" }, 0.45)
        .to(canvas, { autoAlpha: 0, duration: 0.4, ease: "power2.out" }, 0.6)
        .add(() => {
          render3d = false;
          parallax = false;
          words.style.transform = "none";
          box = glyphBox(one("[data-portal]"));
          gsap.set(stage, { transformOrigin: `${box.x}px ${box.y}px` });
        }, 1.0)
        // the O's counter opens onto the page underneath
        .to(
          hole,
          {
            r: 1,
            duration: 0.45,
            ease: "power3.out",
            onUpdate: () => setHole(box.x, box.y, box.hw * 0.62 * hole.r + 0.01, box.hh * 0.78 * hole.r + 0.01),
          },
          1.0,
        )
        // …and we fly through it
        .to(stage, { scale: 90, duration: 1.2, ease: "expo.in" }, 1.25)
        .add(finishIntro, 1.95)
        .to(q(".cr-top"), { autoAlpha: 0, duration: 0.35, ease: "power2.out" }, 2.1)
        .to(el, { autoAlpha: 0, duration: 0.3, ease: "power2.out" }, 2.3);
    };

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const t = (now - t0) / 1000;

      if (!finishing) {
        const e = (now - t0) / RUN_MS;
        const ready = loaded || now - t0 > LOAD_CAP_MS;
        target = Math.min(1, 1 - Math.pow(1 - Math.min(e, 1), 1.8));
        if (!ready) target = Math.min(target, 0.9);
        if (e >= 1 && ready) finishing = true;
      } else target = 1;
      shown += (target - shown) * (1 - Math.exp(-(finishing ? 12 : 5) * dt));
      if (finishing && shown > 0.994) shown = 1;

      if (!exiting) {
        pct.textContent = String(Math.round(shown * 100)).padStart(3, "0");
        let m = 0;
        MSGS.forEach(([at], i) => {
          if (shown >= at) m = i;
        });
        if (m !== lastMsg) {
          lastMsg = m;
          status.textContent = MSGS[m][1];
        }
        if (finishing && shown >= 1) startExit();
      }

      sx += (mx - sx) * 0.08;
      sy += (my - sy) * 0.08;
      if (parallax) words.style.transform = `translate(${(sx * -14).toFixed(2)}px, ${(sy * -10).toFixed(2)}px)`;

      if (webby && render3d) webby.frame({ dt, t, shown, sx, sy, exit: ex.k, reduce: reduced });
      // once the canvas is gone, GSAP drives the rest of the exit
      if (exiting && !render3d) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      exitTl?.kill();
      window.removeEventListener("load", onLoad);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", onResize);
      webby?.dispose();
      html.style.overflow = "";
    };
  }, []);

  if (gone) return null;

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[200] overflow-hidden text-[var(--cream)]"
      role="status"
      aria-live="polite"
      aria-label="Loading Code Relay 5.0"
    >
      <style>{`
        @keyframes cr-mq { to { transform: translateX(-50%) } }
        @keyframes cr-pl { 50% { transform: scale(1.8); opacity: .5 } }
        @media (prefers-reduced-motion: reduce) { .cr-marq-run, .cr-boot { animation: none !important } }
      `}</style>

      {/* everything in the stage zooms through the O at the end */}
      <div className="cr-stage absolute inset-0 will-change-transform">
        <div className="cr-bg absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_45%,#1d0a12_0%,#0a0709_70%)]" />
        <div aria-hidden className="intro-content absolute inset-0 grid place-content-center select-none">
          <div
            className={`cr-words ${anton.className} grid text-center text-[clamp(70px,19vw,280px)] leading-[0.88] tracking-[0.02em] [-webkit-text-stroke:1.5px_rgba(153,27,61,0.55)] will-change-transform`}
          >
            <span className="cr-fill text-transparent">
              C<span data-portal="">O</span>DE
            </span>
            <span className="cr-fill text-transparent">
              RELAY <b className="cr-fill-teal font-normal text-transparent [-webkit-text-stroke:1.5px_rgba(87,165,168,0.5)]">5.0</b>
            </span>
          </div>
        </div>
        {/* instant CSS-only pulse so there is no blank frame before three.js arrives */}
        <div className="cr-boot intro-content absolute left-1/2 top-[46%] -m-[7px] h-[14px] w-[14px] rounded-full bg-[#ff3b6b] shadow-[0_0_40px_10px_rgba(255,59,107,0.5)] [animation:cr-pl_1s_ease-in-out_infinite]" />
        <canvas className="intro-content absolute inset-0 block h-full w-full" />
      </div>

      {/* top bar lines up with the site navbar so the hand-off is seamless */}
      <div className="cr-top intro-content absolute left-0 right-0 top-0">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-5 pt-5 sm:px-10 sm:pt-7 lg:px-16">
          <span className="flex items-center gap-2.5">
            <span className="block h-8 w-8 shrink-0 rounded-full bg-[var(--cream)] p-[3px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/cr-logo-128.png" alt="" className="h-full w-full" />
            </span>
            <span className="label">Code Relay 5.0</span>
          </span>
          <span className="label hidden opacity-70 md:inline">5th Edition</span>
          <span className="label text-right opacity-85">WebnD · IIT Bhubaneswar</span>
        </div>
      </div>

      <div className="cr-hud intro-content absolute bottom-[34px] left-0 right-0 flex items-end justify-between px-[clamp(16px,4vw,44px)] py-5">
        <div className={`${anton.className} text-[clamp(64px,13vw,170px)] leading-[0.85] tabular-nums`}>
          <span className="cr-pct-n">000</span>
          <small className="ml-[0.1em] text-[0.32em] text-[#ff3b6b]">%</small>
        </div>
        <div className="cr-status label min-h-[1.4em] flex-1 px-3 text-center text-[var(--teal)]">Lacing up Webby…</div>
        <button
          type="button"
          onClick={() => finishRef.current()}
          className="label rounded-full border border-[rgba(246,240,232,0.35)] px-4 py-2.5 transition-colors hover:bg-[var(--cream)] hover:text-[var(--ink)]"
        >
          Skip intro →
        </button>
      </div>

      <div
        aria-hidden
        className="cr-hud intro-content absolute bottom-0 left-0 right-0 h-[30px] overflow-hidden whitespace-nowrap border-t border-[rgba(246,240,232,0.12)] text-[11px] uppercase leading-[30px] tracking-[0.3em] text-[rgba(246,240,232,0.55)]"
      >
        <div className="cr-marq-run inline-block [animation:cr-mq_22s_linear_infinite]">
          {MARQUEE}
          {MARQUEE}
        </div>
      </div>
    </div>
  );
}
