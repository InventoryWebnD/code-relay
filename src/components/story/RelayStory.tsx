"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CHAPTERS, clamp, story } from "./store";
import { EVENT, ROUNDS, TRACKS } from "@/data/cr5";
import { useLenis } from "@/components/world/SmoothScroll";
import type { Score } from "./sound";

const StoryCanvas = dynamic(() => import("./StoryCanvas"), { ssr: false, loading: () => null });

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
  const [active, setActive] = useState(true);
  const [ready, setReady] = useState(false);
  const [sound, setSound] = useState(false);
  const score = useRef<Score | null>(null);
  const lenis = useLenis();

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
    const move = (e: PointerEvent) => {
      story.pointer.set((e.clientX / window.innerWidth) * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1);
    };
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    window.addEventListener("pointermove", move, { passive: true });
    const io = new IntersectionObserver(
      ([e]) => {
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

  // DOM overlay follows the (damped) story progress without re-rendering React
  useEffect(() => {
    let raf = 0;
    const chapters = Array.from(overlay.current?.querySelectorAll<HTMLElement>(".story-chapter") ?? []);
    const dots = Array.from(rail.current?.querySelectorAll<HTMLElement>("[data-dot]") ?? []);
    const fill = rail.current?.querySelector<HTMLElement>("[data-fill]");
    const loop = () => {
      const p = story.p;
      chapters.forEach((el, i) => {
        const c = CHAPTERS[i];
        const fadeIn = i === 0 ? 1 : clamp((p - c.from - 0.004) / 0.025);
        const fadeOut = i === CHAPTERS.length - 1 ? 1 : clamp((c.to - 0.012 - p) / 0.025);
        const o = Math.min(fadeIn, fadeOut);
        el.style.opacity = String(o);
        el.style.visibility = o > 0.01 ? "visible" : "hidden";
        el.style.transform = `translate3d(0, ${(1 - o) * (fadeIn < 1 ? 28 : -28)}px, 0)`;
      });
      const cur = CHAPTERS.findIndex((c) => p >= c.from && p < c.to);
      dots.forEach((d, i) => d.toggleAttribute("data-on", i <= cur));
      if (fill) fill.style.transform = `scaleY(${p})`;
      if (hours.current) {
        const s = CHAPTERS[4];
        const h = Math.round(clamp((p - s.from - 0.01) / (s.to - s.from - 0.02)) * 30);
        hours.current.textContent = String(h).padStart(2, "0");
      }
      raf = requestAnimationFrame(loop);
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
          onPointerDown={() => (story.jumpAt = performance.now() / 1000)}
        >
          <StoryCanvas active={active} onReady={() => setReady(true)} />
        </div>
        {!ready && (
          <div className="absolute inset-0 grid place-items-center">
            <div className="label animate-pulse text-[var(--cream)]/60">Building the track…</div>
          </div>
        )}

        {/* legibility gradients */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-[#07030f]/85 via-[#07030f]/30 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#07030f]/60 to-transparent" />

        <div ref={overlay} className="pointer-events-none absolute inset-0 [&_a]:pointer-events-auto [&_button]:pointer-events-auto">
          {/* 0 — title */}
          <div data-chapter={0} className="story-chapter pointer-events-none absolute inset-0 flex flex-col justify-end px-5 pb-20 sm:px-10 sm:pb-16 lg:px-16" style={{ opacity: 0 }}>
            <h1 className="font-display text-[clamp(48px,8.2vw,140px)] leading-[0.86] tracking-[-0.04em]">
              Code
              <br />
              Relay <span className="text-[var(--sun)]">5.0</span>
            </h1>
            <p className="mt-6 max-w-md text-base text-[var(--cream)]/75 sm:text-lg">
              Meet <span className="font-bold text-[#7fd6d6]">Webby</span>. Every relay starts with one runner and one idea. Scroll to run the
              story. Tap anywhere to make Webby jump.
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
                <div key={t.id} className="rounded-2xl border border-[var(--cream)]/15 bg-[var(--cream)]/[0.04] p-4 backdrop-blur-md">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: t.id === "web2" ? "#C2264F" : "#5AA7A7" }} />
                    <span className="font-display text-lg">{t.name}</span>
                  </div>
                  <div className="mt-1 text-sm text-[var(--cream)]/70">{t.tagline}</div>
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
                <div key={c.name} className="rounded-xl border border-[var(--cream)]/15 bg-[var(--cream)]/[0.04] p-2.5 backdrop-blur-md">
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
            {["Start", "Ideas", "Tracks", "Baton", "Sprint", "Finish"].map((name, i) => (
              <button
                key={name}
                data-dot
                onClick={() => jumpTo(i)}
                className="group relative z-10 grid h-3 w-3 place-items-center rounded-full border border-[var(--cream)]/50 bg-[#0b0618] transition-colors data-[on]:border-[var(--sun)] data-[on]:bg-[var(--sun)]"
                aria-label={`Go to chapter: ${name}`}
              >
                <span className="label pointer-events-none absolute right-6 whitespace-nowrap text-[10px] text-[var(--cream)]/0 transition-colors group-hover:text-[var(--cream)]/80">{name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* sound + hint */}
        <div className="absolute bottom-6 right-5 flex items-center gap-4 sm:right-10 lg:right-16">
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
