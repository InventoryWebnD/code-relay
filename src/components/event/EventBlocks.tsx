"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { CountUp, Marquee, prefersReduced, Reveal } from "@/components/world/motion";
import SectionHead from "@/components/world/SectionHead";
import { JUDGING_CRITERIA, PARTICIPATION_FORMATS, SCHEDULE_DAYS } from "@/data/eventData";
import { EVENT } from "@/data/cr5";

/* ------------------------------------------------------------------ */
export function FactsRibbon() {
  const facts = [
    `Teams of ${EVENT.teamSize}`,
    "Round 01 is free",
    "Open to all of India",
    `${EVENT.hackHours}-hour final`,
    `${EVENT.shortlist} teams on campus`,
    "Web2 × Web3 · 4 tracks",
  ];
  return (
    <div className="relative z-10 -rotate-1 bg-[var(--ink)] py-4 text-[var(--cream)]">
      <Marquee speed={26}>
        {facts.map((f, i) => (
          <span key={f} className="mx-5 flex items-center gap-5 font-display text-xl sm:text-3xl">
            <span style={{ color: ["var(--sun)", "var(--teal)", "var(--blush)"][i % 3] }}>✦</span>
            {f}
          </span>
        ))}
      </Marquee>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Schedule: big day switcher + timeline rows                          */
/* ------------------------------------------------------------------ */
export function ScheduleBlock() {
  const [day, setDay] = useState(0);
  const list = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = list.current;
    if (!el || prefersReduced()) return;
    gsap.fromTo(el.children, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "expo.out", stagger: 0.07 });
  }, [day]);

  const d = SCHEDULE_DAYS[day];

  return (
    <section id="schedule" data-world="floor" data-world-fade="0.5" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-[1300px] px-5 sm:px-10 lg:px-16">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHead label="Round 02 · On campus" title={"The 30-hour\nrun sheet"} />
          <span className="label max-w-xs text-[var(--crimson)]">⚠ Provisional. The final schedule is shared with finalists.</span>
        </div>

        <div className="mt-14 grid grid-cols-3 gap-3 sm:flex sm:flex-wrap sm:gap-x-10 sm:gap-y-2">
          {SCHEDULE_DAYS.map((s, i) => (
            <button key={s.day} onClick={() => setDay(i)} className="group text-left">
              <span className={`label block transition-colors ${day === i ? "text-[var(--crimson)]" : "text-[var(--ink)]/45"}`}>Day 0{i + 1}</span>
              <span
                className="block font-display text-[clamp(20px,6.2vw,56px)] transition-all duration-500 sm:text-[clamp(28px,4vw,56px)]"
                style={{ color: day === i ? "var(--ink)" : "transparent", WebkitTextStroke: day === i ? "0" : "1.5px var(--ink)" }}
              >
                {s.day.split(":")[1]?.trim().split(" ")[0] ?? `Day ${i + 1}`}
              </span>
            </button>
          ))}
        </div>

        <div ref={list} className="mt-10 border-b-2 border-[var(--ink)]/15">
          {d.events.map((e) => (
            <div key={e.title} className="row-flood group grid gap-2 px-2 py-6 sm:grid-cols-[180px_1fr_1.3fr] sm:items-center sm:gap-8 sm:px-4" style={{ ["--flood" as string]: "var(--crimson)" }}>
              <span className="font-mono text-sm font-bold text-[var(--crimson)] transition-colors group-hover:text-[var(--sun)]">{e.time}</span>
              <h4 className="font-display text-xl !leading-[1.08] !normal-case tracking-tight sm:text-2xl">{e.title}</h4>
              <p className="text-[15px] opacity-75">{e.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Judging: huge weights with growing rules                            */
/* ------------------------------------------------------------------ */
const METER = ["var(--crimson)", "var(--navy)", "var(--teal)", "var(--sun)"];

export function JudgingBlock() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReduced()) return;
    const bars = el.querySelectorAll<HTMLElement>(".jm-fill");
    gsap.set(bars, { scaleX: 0 });
    const tw = gsap.to(bars, { scaleX: 1, duration: 1.6, ease: "expo.out", stagger: 0.12, scrollTrigger: { trigger: el, start: "top 75%", once: true } });
    return () => {
      tw.scrollTrigger?.kill();
      tw.kill();
    };
  }, []);

  return (
    <section data-world="helix" data-world-x="9" data-world-fade="0.3" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-[1300px] px-5 sm:px-10 lg:px-16">
        <SectionHead label="How we judge" title={"What gets\nyou points"} sub="Your demo is scored across four weighted criteria." />
        <div ref={ref} className="mt-14 max-w-4xl">
          {JUDGING_CRITERIA.map((c, i) => {
            const pct = parseInt(c.weight, 10);
            return (
              <div key={c.title} className="py-7">
                <div className="grid items-end gap-3 sm:grid-cols-[auto_1fr] sm:gap-10">
                  <CountUp value={pct} suffix="%" className="whitespace-nowrap font-display text-[clamp(56px,6vw,96px)] leading-none tabular-nums sm:w-[2.2em]" />
                  <div>
                    <h4 className="font-display text-xl !leading-[1.08] !normal-case tracking-tight sm:text-2xl">{c.title}</h4>
                    <p className="mt-1 text-[15px] text-[var(--ink)]/70">{c.desc}</p>
                  </div>
                </div>
                <div className="mt-5 h-[6px] w-full rounded-full bg-[var(--ink)]/10">
                  <div className="jm-fill h-full origin-left rounded-full" style={{ width: `${pct * 3.2}%`, background: METER[i] }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Rules: numbered columns split by rules                              */
/* ------------------------------------------------------------------ */
const DOTS = ["var(--sun)", "var(--teal)", "var(--crimson)", "var(--blush)"];

export function RulesBento() {
  return (
    <section data-world="ring" data-world-fade="0.45" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-10 lg:px-16">
        <SectionHead label="Who can play" title={"The fine print,\nbut fun"} />
        <Reveal group className="mt-14 grid gap-y-10 md:grid-cols-2 lg:grid-cols-4" stagger={0.1}>
          {PARTICIPATION_FORMATS.map((p, i) => (
            <div key={p.title} className={`group relative pr-6 lg:pl-6 ${i ? "lg:border-l-2 lg:border-[var(--ink)]/15" : "lg:pl-0"}`}>
              <span
                className="grid h-16 w-16 place-items-center rounded-full font-display text-lg transition-transform duration-700 ease-[cubic-bezier(.34,1.56,.64,1)] group-hover:scale-125 group-hover:-rotate-12"
                style={{ background: DOTS[i], color: i === 2 ? "var(--cream)" : "var(--ink)" }}
              >
                0{i + 1}
              </span>
              <span className="label mt-6 block text-[var(--ink)]/55">{p.tag}</span>
              <h3 className="mt-2 font-display text-2xl">{p.title}</h3>
              <p className="mt-3 text-[15px] text-[var(--ink)]/75">{p.description}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
