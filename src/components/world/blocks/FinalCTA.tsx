"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { Magnetic, prefersReduced } from "@/components/world/motion";
import { EVENT } from "@/data/cr5";

/** Finale: a big closing call to register. */
export default function FinalCTA({
  title = "Pass the baton",
  sub = `Round 01 is online and open to every college in India. ${EVENT.teamSize} per team. Free to enter.`,
}: {
  title?: string;
  sub?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReduced()) return;
    const q = gsap.utils.selector(el);
    const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 70%", end: "bottom bottom", scrub: 0.6 } });
    tl.fromTo(q(".fc-word"), { yPercent: 90, rotate: (i) => (i % 2 ? 8 : -8) }, { yPercent: 0, rotate: 0, stagger: 0.1, ease: "none" });
    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  const words = title.split(" ");
  return (
    <section ref={ref} data-world="cr" data-world-y="3.2" data-world-my="4" className="relative flex flex-col justify-end py-28 sm:py-40">
      <div className="relative mx-auto flex max-w-[1300px] flex-col items-center px-5 text-center">
        <span className="label glass rounded-full px-3.5 py-1.5 ring-1 ring-[var(--ink)]/15">
          Code Relay 5.0 · {EVENT.hashtag}
        </span>
        <h2 className="mt-8 font-display text-[clamp(56px,11vw,190px)]">
          {words.map((w, i) => (
            <span key={i} className="inline-block overflow-hidden px-[0.1em] align-bottom">
              <span className={`fc-word inline-block ${i === words.length - 1 ? "text-[var(--crimson)]" : ""}`}>{w}</span>
            </span>
          ))}
        </h2>
        <p className="mt-6 max-w-xl text-lg text-[var(--ink)]/75">{sub}</p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Magnetic strength={0.4}>
            <Link href="/register" className="btn-chunky bg-[var(--crimson)] !px-9 !py-5 !text-base text-[var(--cream)]" data-cursor="Go!">
              Register your team ↗
            </Link>
          </Magnetic>
          <Magnetic strength={0.4}>
            <Link href="/event" className="btn-ghost !text-base">
              Read the rules
            </Link>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
