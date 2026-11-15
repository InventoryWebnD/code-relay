"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CHAPTERS, clamp, story } from "./store";
import { EVENT, ROUNDS, TRACKS } from "@/data/cr5";
import { useLenis } from "@/components/world/SmoothScroll";
import { onIntroDone } from "@/components/world/motion";
import type { Score } from "./sound";

const StoryCanvas = dynamic(() => import("./StoryCanvas"), { ssr: false, loading: () => null });

const CHAPTER_NAMES = ["Start", "Ideas", "Tracks", "Baton", "Sprint", "Finish"];

/** scroll cue: waits for the intro + first frame, nudges if ignored, retires on first scroll */
type HintState = "waiting" | "show" | "nudge" | "done";
const HINT_DELAY = 900; // ms after the world fades in
const HINT_NUDGE = 6500; // ms of no scrolling before the cue asks again
const SCROLLED = 0.012; // story progress that counts as "they got it"

const CAST_CARDS = [
  { name: "Webby", role: "The opener", note: "Carries the idea", color: "#5AA7A7" },
  { name: "Rubi", role: "The anchor", note: "Takes the baton home", color: "#F5B000" },
  { name: "Kit", role: "The builder", note: "Ships at 3 AM", color: "#C2264F" },
  { name: "Nova", role: "The designer", note: "Makes it feel right", color: "#F2B8C6" },
];

const r1 = ROUNDS.find((r) => r.id === "r1")!;
const sl = ROUNDS.find((r) => r.id === "shortlist")!;
const r2 = ROUNDS.find((r) => r.id === "r2")!;

function Chapter({ n, label, children, align = "left" }: { n: number; label: string; children: React.ReactNode; align?: "left" | "right" }) {
  return (
    <div
      data-chapter={n}
      className={`story-chapter pointer-events-none absolute inset-x-0 bottom-0 px-5 pb-20 sm:px-10 sm:pb-16 lg:px-16 ${align === "right" ? "lg:flex lg:justify-end" : ""}`}
      style={{ opacity: 0, visibility: "hidden" }}
    >
      <div className="max-w-[560px]">
        <div className="label flex items-center gap-3 text-[var(--cream)]/70">
          <span className="text-[var(--sun)]">{String(n).padStart(2, "0")}</span>
          <span className="h-px w-10 bg-[var(--cream)]/40" />
          {label}
        </div>
        {children}
      </div>
    </div>
  );
}

export default function RelayStory() {
  const section = useRef<HTMLElement>(null);
  const overlay = useRef<HTMLDivElement>(null);
  const rail = useRef<HTMLDivElement>(null);
  const hours = useRef<HTMLSpanElement>(null);
  const progress = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(true);
  const activeRef = useRef(true);
  const [ready, setReady] = useState(false);
  const [introDone, setIntroDone] = useState(false);
  const [touch, setTouch] = useState(false);
  const [hint, setHint] = useState<HintState>("waiting");
  const hintRef = useRef<HintState>("waiting");
  const [sound, setSound] = useState(false);
  const score = useRef<Score | null>(null);
  const lenis = useLenis();

  const setHintState = (h: HintState) => {
    if (hintRef.current === h || hintRef.current === "done") return;
    hintRef.current = h;
    setHint(h);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- device capability is only known client-side
    setTouch(window.matchMedia("(pointer: coarse)").matches);
    return onIntroDone(() => setIntroDone(true));
  }, []);

  // the cue appears once the intro has cleared and the world is on screen
  useEffect(() => {
    if (!ready || !introDone) return;
    if (story.target > SCROLLED) {
      setHintState("done"); // landed mid-story (back nav, restored scroll)
      return;
    }
    const show = setTimeout(() => setHintState("show"), HINT_DELAY);
    const nudge = setTimeout(() => setHintState("nudge"), HINT_DELAY + HINT_NUDGE);
    return () => {
      clearTimeout(show);
      clearTimeout(nudge);
    };
  }, [ready, introDone]);

  // scroll → progress, pointer → story
  useEffect(() => {
    const el = section.current;
    if (!el) return;
    if (process.env.NODE_ENV !== "production") (window as unknown as { __story: typeof story }).__story = story;
    story.reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const measure = () => {
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      story.target = clamp(-r.top / Math.max(total, 1));
    };
    measure();
    story.p = story.target;
    // only a real mouse steers the camera: on touch the "pointer" is the finger
    // doing the scrolling, which would make the shot swim
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      story.pointer.set((e.clientX / window.innerWidth) * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1);
    };
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    window.addEventListener("pointermove", move, { passive: true });
    const io = new IntersectionObserver(
      ([e]) => {
        activeRef.current = e.isIntersecting;
        setActive(e.isIntersecting);
        if (!e.isIntersecting && score.current) {
          score.current.stop();
          setSound(false);
        }
      },
      { rootMargin: "200px" }
    );
    io.observe(el);
    return () => {
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
      window.removeEventListener("pointermove", move);
      io.disconnect();
    };
  }, []);

  // DOM overlay follows the (damped) story progress without re-rendering React.
  // Every write is skipped when its value hasn't changed, so an idle frame costs
  // nothing and the compositor never has to re-layer the text.
  useEffect(() => {
    let raf = 0;
    const chapters = Array.from(overlay.current?.querySelectorAll<HTMLElement>(".story-chapter") ?? []);
    const dots = Array.from(rail.current?.querySelectorAll<HTMLElement>("[data-dot]") ?? []);
    const fill = rail.current?.querySelector<HTMLElement>("[data-fill]");
    const pFill = progress.current?.querySelector<HTMLElement>("[data-fill]");
    const pNum = progress.current?.querySelector<HTMLElement>("[data-num]");
    const pName = progress.current?.querySelector<HTMLElement>("[data-name]");
    const lastO = chapters.map(() => -1);
    let lastP = -1;
    let lastCur = -2;
    let lastH = "";
    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (!activeRef.current) return;
      if (story.target > SCROLLED) setHintState("done");
      const p = story.p;
      if (Math.abs(p - lastP) < 1e-5) return;
      lastP = p;
      chapters.forEach((el, i) => {
        const c = CHAPTERS[i];
        const fadeIn = i === 0 ? 1 : clamp((p - c.from - 0.004) / 0.025);
        const fadeOut = i === CHAPTERS.length - 1 ? 1 : clamp((c.to - 0.012 - p) / 0.025);
        const o = Math.round(Math.min(fadeIn, fadeOut) * 1000) / 1000;
        if (o === lastO[i]) return;
        lastO[i] = o;
        el.style.opacity = String(o);
        el.style.visibility = o > 0.01 ? "visible" : "hidden";
        el.style.transform = `translate3d(0, ${(1 - o) * (fadeIn < 1 ? 28 : -28)}px, 0)`;
      });
      const cur = Math.max(CHAPTERS.findIndex((c) => p >= c.from && p < c.to), 0);
      if (cur !== lastCur) {
        lastCur = cur;
        dots.forEach((d, i) => d.toggleAttribute("data-on", i <= cur));
        if (pNum) pNum.textContent = String(cur + 1).padStart(2, "0");
        if (pName) pName.textContent = CHAPTER_NAMES[cur];
      }
      if (fill) fill.style.transform = `scaleY(${p})`;
      if (pFill) pFill.style.transform = `scaleX(${p})`;
      if (hours.current) {
        const s = CHAPTERS[4];
        const h = String(Math.round(clamp((p - s.from - 0.01) / (s.to - s.from - 0.02)) * 30)).padStart(2, "0");
        if (h !== lastH) hours.current.textContent = lastH = h;
      }
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  // sound
  const toggleSound = async () => {
    if (!sound) {
      if (!score.current) {
        const { Score } = await import("./sound");
        score.current = new Score();
      }
      await score.current.start();
      setSound(true);
    } else {
      score.current?.stop();
      setSound(false);
    }
  };
  useEffect(() => () => score.current?.stop(), []);

  const jumpTo = (i: number) => {
    const el = section.current;
    if (!el) return;
    const total = el.offsetHeight - window.innerHeight;
    const y = el.offsetTop + total * (CHAPTERS[i].from + (i === 0 ? 0 : 0.03));
    if (lenis) lenis.scrollTo(y, { duration: 2.2 });
    else window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <section ref={section} className="story relative h-[1100vh] w-full bg-[#0b0618] text-[var(--cream)]" aria-label="The Code Relay story">
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        {/* the world */}
        <div
          className="absolute inset-0 transition-opacity duration-[1400ms]"
          style={{ opacity: ready ? 1 : 0 }}
          // click, not pointerdown: a swipe to scroll must never count as a tap
          onClick={() => (story.jumpAt = performance.now() / 1000)}
        >
          <StoryCanvas active={active} onReady={() => setReady(true)} />
        </div>
        <div
          className={`pointer-events-none absolute inset-0 grid place-items-center transition-opacity duration-700 ${ready ? "opacity-0" : "opacity-100"}`}
          aria-hidden={ready}
        >
          <div className="flex flex-col items-center gap-4">
            <div className="label text-[var(--cream)]/60">Building the track</div>
            <div className="relative h-px w-40 overflow-hidden bg-[var(--cream)]/15">
              <span className="story-loading absolute inset-y-0 left-0 w-1/3 bg-[var(--sun)]" />
            </div>
          </div>
        </div>

        {/* legibility gradients */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[72%] sm:h-[55%] bg-gradient-to-t from-[#07030f]/85 via-[#07030f]/30 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#07030f]/60 to-transparent" />

        <div ref={overlay} className="pointer-events-none absolute inset-0 [&_a]:pointer-events-auto [&_button]:pointer-events-auto">
          {/* 0 — title */}
          <div data-chapter={0} className="story-chapter pointer-events-none absolute inset-0 flex flex-col justify-end px-5 pb-24 sm:px-10 sm:pb-20 lg:px-16" style={{ opacity: 0 }}>
            <h1 className="font-display text-[clamp(48px,8.2vw,140px)] leading-[0.86] tracking-[-0.04em]">
              Code
              <br />
              Relay <span className="text-[var(--sun)]">5.0</span>
            </h1>
            <p className="mt-6 max-w-md text-base text-[var(--cream)]/75 sm:text-lg">
              Meet <span className="font-bold text-[#7fd6d6]">Webby</span>. Every relay starts with one runner and one idea. Tap anywhere to
              make Webby jump.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link href="/register" className="btn-chunky border-[var(--sun)] bg-[var(--sun)] text-[var(--ink)]" data-cursor="Go!">
                Register now ↗
              </Link>
              <button onClick={() => jumpTo(1)} className="btn-ghost text-[var(--cream)]">
                Start the run
              </button>
            </div>
          </div>

          <Chapter n={1} label={`${r1.label} · ${r1.mode} · ${r1.when}`}>
            <h2 className="mt-5 font-display text-[clamp(28px,5vw,76px)] leading-[0.95] tracking-[-0.03em]">
              Ideas rise from <span className="text-[var(--sun)]">every corner</span> of India.
            </h2>
            <p className="mt-4 max-w-md text-sm text-[var(--cream)]/75 sm:mt-5 sm:text-base">
              {r1.body} Every idea lights the baton a little brighter.
            </p>
          </Chapter>

          <Chapter n={2} label="Two tracks · one road">
            <h2 className="mt-5 font-display text-[clamp(28px,5vw,76px)] leading-[0.95] tracking-[-0.03em]">Pick your path.</h2>
            <div className="mt-6 grid max-w-xl grid-cols-2 gap-4">
              {TRACKS.map((t) => (
                <div key={t.id} className="story-glass rounded-2xl border border-[var(--cream)]/15 p-3.5 sm:p-4">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: t.id === "web2" ? "#C2264F" : "#5AA7A7" }} />
                    <span className="font-display text-base leading-tight sm:text-lg">{t.name}</span>
                    <span className="label ml-auto text-[9px] text-[var(--cream)]/50">{t.domain}</span>
                  </div>
                  <div className="mt-1 text-sm text-[var(--cream)]/70">with {t.partner}</div>
                  <ul className="mt-3 hidden space-y-1 text-xs text-[var(--cream)]/55 sm:block">
                    {t.items.map((it) => (
                      <li key={it.title}>— {it.title}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Chapter>

          <Chapter n={3} label={`${sl.label} · ${sl.when}`} align="right">
            <h2 className="mt-5 font-display text-[clamp(28px,5vw,76px)] leading-[0.95] tracking-[-0.03em]">
              <span className="text-[var(--sun)]">{EVENT.shortlist}</span> teams keep their light.
            </h2>
            <p className="mt-4 max-w-md text-sm text-[var(--cream)]/75 sm:mt-5 sm:text-base">
              {sl.body} Then the opener hands over the baton. Nobody wins this alone: teams of {EVENT.teamSize}.
            </p>
            <div className="mt-6 grid grid-cols-4 gap-2">
              {CAST_CARDS.map((c) => (
                <div key={c.name} className="story-glass rounded-xl border border-[var(--cream)]/15 p-2 sm:p-2.5">
                  <span className="block h-1.5 w-6 rounded-full" style={{ background: c.color }} />
                  <div className="mt-2 font-display text-sm">{c.name}</div>
                  <div className="text-[10px] uppercase tracking-wider text-[var(--cream)]/55">{c.role}</div>
                  <div className="mt-1 hidden text-[11px] text-[var(--cream)]/45 sm:block">{c.note}</div>
                </div>
              ))}
            </div>
          </Chapter>

          <Chapter n={4} label={`${r2.label} · ${r2.mode} · ${r2.when}`}>
            <div className="mt-4 flex items-end gap-4">
              <span ref={hours} className="font-display text-[clamp(64px,13vw,200px)] leading-[0.8] tracking-[-0.05em] text-[var(--sun)]">
                00
              </span>
              <span className="label mb-3 text-[var(--cream)]/70">
                / {EVENT.hackHours}
                <br />
                hours
              </span>
            </div>
            <h2 className="mt-4 font-display text-[clamp(28px,3.6vw,54px)] leading-[0.95] tracking-[-0.03em]">The final sprint at {EVENT.institute}.</h2>
            <p className="mt-4 max-w-md text-sm text-[var(--cream)]/75 sm:text-base">{r2.body}</p>
          </Chapter>

          <Chapter n={5} label={`Finish line · ${EVENT.hashtag}`}>
            <h2 className="mt-5 font-display text-[clamp(44px,7vw,120px)] leading-[0.88] tracking-[-0.04em]">
              Your turn to
              <br />
              <span className="text-[var(--sun)]">take the baton.</span>
            </h2>
            <p className="mt-5 max-w-md text-[var(--cream)]/80">Round 01 is online, free and open to every college in India.</p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link href="/register" className="btn-chunky border-[var(--sun)] bg-[var(--sun)] text-[var(--ink)]" data-cursor="Go!">
                Register your team ↗
              </Link>
              <Link href="/event" className="btn-ghost text-[var(--cream)]">
                Read the rules
              </Link>
            </div>
          </Chapter>
        </div>

        {/* chapter rail */}
        <div ref={rail} className="absolute right-4 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-0 sm:flex lg:right-8">
          <div className="relative flex flex-col items-center gap-7 py-1">
            <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-[var(--cream)]/15" />
            <span data-fill className="absolute inset-y-0 left-1/2 w-px origin-top -translate-x-1/2 bg-[var(--sun)]" style={{ transform: "scaleY(0)" }} />
            {CHAPTER_NAMES.map((name, i) => (
              <button
                key={name}
                data-dot
                onClick={() => jumpTo(i)}
                className="group relative z-10 grid h-3 w-3 place-items-center rounded-full border border-[var(--cream)]/50 bg-[#0b0618] transition-colors data-[on]:border-[var(--sun)] data-[on]:bg-[var(--sun)]"
                aria-label={`Go to chapter: ${name}`}
              >
                <span className="label pointer-events-none absolute right-6 whitespace-nowrap text-[10px] text-[var(--cream)]/0 transition-colors group-hover:text-[var(--cream)]/80 group-focus-visible:text-[var(--cream)]/80">{name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* scroll cue: the first thing that tells a visitor what to do */}
        <button
          type="button"
          onClick={() => jumpTo(1)}
          tabIndex={hint === "show" || hint === "nudge" ? 0 : -1}
          aria-hidden={!(hint === "show" || hint === "nudge")}
          data-cursor="Run"
          className={`story-hint absolute bottom-5 left-5 z-20 flex items-center gap-3 rounded-full border border-[var(--cream)]/20 bg-[#0b0618]/60 py-1.5 pl-1.5 pr-4 text-left text-[var(--cream)] shadow-[0_10px_40px_-12px_rgba(245,176,0,0.45)] backdrop-blur-md transition-[opacity,translate] duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] sm:bottom-7 sm:left-1/2 sm:-translate-x-1/2 ${
            hint === "show" || hint === "nudge" ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
          } ${hint === "nudge" ? "is-nudge" : ""}`}
        >
          <span className="relative grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[var(--sun)] text-[var(--ink)]">
            <span className="hint-ring absolute inset-0 rounded-full border border-[var(--sun)]" />
            {touch ? (
              <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path className="hint-swipe" d="M4 9.5 8 5.5l4 4" />
              </svg>
            ) : (
              <span className="relative block h-[18px] w-[12px] rounded-full border-[1.5px] border-current" aria-hidden>
                <span className="hint-wheel absolute left-1/2 top-[3px] h-[4px] w-[2px] -translate-x-1/2 rounded-full bg-current" />
              </span>
            )}
          </span>
          <span className="flex flex-col leading-tight">
            <span className="label text-[9px] text-[var(--cream)]/55">The story starts here</span>
            <span className="mt-0.5 text-sm font-semibold">{touch ? "Swipe up to run" : "Scroll to run"}</span>
          </span>
        </button>

        {/* phones have no rail: a compact chapter readout takes the cue's place */}
        <div
          ref={progress}
          aria-hidden
          className={`pointer-events-none absolute bottom-6 left-5 flex items-center gap-3 transition-opacity duration-700 sm:hidden ${hint === "done" ? "opacity-100" : "opacity-0"}`}
        >
          <span className="label text-[10px] text-[var(--cream)]/80">
            <span data-num className="text-[var(--sun)]">01</span>
            <span className="text-[var(--cream)]/35"> / 06 · </span>
            <span data-name>Start</span>
          </span>
          <span className="relative h-px w-14 overflow-hidden bg-[var(--cream)]/20">
            <span data-fill className="absolute inset-0 origin-left bg-[var(--sun)]" style={{ transform: "scaleX(0)" }} />
          </span>
        </div>

        {/* sound — on phones it steps aside while the scroll cue owns the bottom edge */}
        <div
          className={`absolute bottom-6 right-5 flex items-center gap-4 transition-opacity duration-500 sm:right-10 sm:opacity-100 lg:right-16 ${
            hint === "show" || hint === "nudge" ? "pointer-events-none opacity-0 sm:pointer-events-auto" : "opacity-100"
          }`}
        >
          <button
            onClick={toggleSound}
            className="label flex items-center gap-2 rounded-full border border-[var(--cream)]/25 bg-[var(--cream)]/5 px-3.5 py-2 text-[var(--cream)]/80 backdrop-blur transition-colors hover:bg-[var(--cream)]/15"
            aria-pressed={sound}
          >
            <span className="flex h-3 items-end gap-[2px]">
              {[0, 1, 2, 3].map((i) => (
                <span
                  key={i}
                  className={`w-[2px] rounded-full bg-current ${sound ? "animate-[eq_0.9s_ease-in-out_infinite]" : ""}`}
                  style={{ height: sound ? undefined : 3, animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </span>
            Sound {sound ? "on" : "off"}
          </button>
        </div>
      </div>
    </section>
  );
}
