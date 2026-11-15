"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { CountUp, Parallax, prefersReduced, Reveal } from "@/components/world/motion";
import CurvedLoop from "@/components/world/CurvedLoop";
import { ABOUT_CR, ABOUT_WEBND, CR4_HIGHLIGHTS } from "@/data/cr5";

function ScrollWords({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReduced()) return;
    const words = el.querySelectorAll(".sw");
    const tw = gsap.fromTo(
      words,
      { opacity: 0.12, y: 6 },
      { opacity: 1, y: 0, stagger: 0.1, ease: "none", scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 45%", scrub: 0.8 } }
    );
    return () => {
      tw.scrollTrigger?.kill();
      tw.kill();
    };
  }, []);
  const accent = new Set(["flagship", "India.", "ship,", "biggest", "relay", "yet."]);
  return (
    <p ref={ref} className="font-display text-[clamp(28px,4.4vw,68px)] !normal-case !leading-[1.02] !tracking-[-0.03em]">
      {text.split(" ").map((w, i) => (
        <span key={i} className={`sw mr-[0.25em] inline-block ${accent.has(w) ? "text-[var(--crimson)]" : ""}`}>
          {w}
        </span>
      ))}
    </p>
  );
}

export default function Manifesto() {
  return (
    <section data-world="scatter" data-world-fade="0.25" className="relative overflow-hidden">
      <CurvedLoop text="#SprintToInnovation ✦ Pass the baton ✦ " color="var(--crimson)" className="-mb-4 mt-4" />

      <div className="mx-auto max-w-[1500px] px-5 pb-24 sm:px-10 sm:pb-32 lg:px-16">
        <div className="grid items-start gap-16 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Reveal variant="pop">
              <span className="label inline-flex items-center gap-2 rounded-full bg-[var(--sun)] px-3.5 py-1.5">
                <span className="h-2 w-2 rounded-full bg-[var(--ink)]" />
                What is Code Relay?
              </span>
            </Reveal>
            <div className="mt-8">
              <ScrollWords text={ABOUT_CR} />
            </div>
          </div>

          {/* organiser: a dark orb, no box */}
          <div className="relative lg:col-span-4 lg:pt-10">
            <Parallax speed={0.25}>
              <div className="relative mx-auto aspect-square w-full max-w-[380px]">
                <div className="absolute inset-[6%] rounded-full bg-[var(--crimson)]" />
                <div className="absolute inset-[6%] rounded-full border-2 border-dashed border-[var(--sun)]/50 spin-slow" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/brand/webnd-mascot-stand.webp" alt="Webby, the WebnD mascot" className="absolute bottom-[4%] left-1/2 w-[52%] -translate-x-1/2 bob" />
                {/* reads top-down: who → their mark → their mascot */}
                <div className="absolute left-1/2 top-[13%] flex -translate-x-1/2 flex-col items-center gap-2.5">
                  <span className="label whitespace-nowrap text-[10px] text-[var(--cream)]/70">Organised by</span>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/brand/webnd-mark.png" alt="WebnD" className="h-9 w-auto" />
                </div>
              </div>
            </Parallax>
            <Reveal className="mt-6">
              <h3 className="font-display text-2xl">Web &amp; Design Society</h3>
              <p className="mt-3 text-[var(--ink)]/75 leading-relaxed">{ABOUT_WEBND}</p>
              <p className="label mt-4 text-[var(--crimson)]">Psst: the one in the cape is Webby, our mascot.</p>
            </Reveal>
          </div>
        </div>

        {/* CR 4.0 numbers: open row, divided by rules */}
        <div className="mt-24 sm:mt-32">
          <Reveal className="mb-8 flex items-end justify-between gap-4">
            <h3 className="font-display text-[clamp(22px,2.6vw,36px)]">Last lap · CR 4.0</h3>
            <span className="label hidden text-[var(--ink)]/60 sm:block">Numbers that made us do it again</span>
          </Reveal>
          <Reveal group className="grid grid-cols-2 [container-type:inline-size] lg:grid-cols-4" stagger={0.1}>
            {CR4_HIGHLIGHTS.map((s, i) => (
              <div
                key={s.label}
                className={`group relative border-t-2 border-[var(--ink)] py-6 pr-4 lg:border-l-2 lg:border-t-0 lg:py-2 lg:pl-6 ${i === 0 ? "lg:border-l-0 lg:pl-0" : ""}`}
              >
                {/* sized from the row width (cqw): every number the same size, none can collide */}
                <CountUp
                  value={s.value}
                  suffix={s.suffix}
                  className="block whitespace-nowrap font-display text-[min(10cqw,84px)] tabular-nums transition-colors lg:text-[min(4.6cqw,84px)] duration-300 group-hover:text-[var(--crimson)]"
                />
                <span className="label mt-3 block text-[var(--ink)]/65">{s.label}</span>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
