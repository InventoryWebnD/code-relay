"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { Magnetic, onIntroDone, prefersReduced, Scramble } from "@/components/world/motion";
import { CubeWord } from "@/components/world/cube/LetterCubes";
import { EVENT, ROUNDS } from "@/data/cr5";

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || prefersReduced()) return;
    const q = gsap.utils.selector(el);
    gsap.set(q(".h-pop"), { y: 40, opacity: 0 });
    gsap.set(q(".h-stamp"), { scale: 3, rotate: -40, opacity: 0 });
    const off = onIntroDone(() => {
      gsap
        .timeline({ defaults: { ease: "expo.out" } })
        .to(q(".h-pop"), { y: 0, opacity: 1, duration: 1, stagger: 0.08 }, 0.5)
        .to(q(".h-stamp"), { scale: 1, rotate: -12, opacity: 1, duration: 0.5, ease: "power4.in" }, 0.9);
    });
    const tw = gsap.to(q(".h-content"), {
      yPercent: 18,
      opacity: 0,
      ease: "none",
      scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: 0.5 },
    });
    return () => {
      off();
      tw.scrollTrigger?.kill();
      tw.kill();
    };
  }, []);

  return (
    <section
      ref={root}
      data-world="cube"
      data-world-x="6.6"
      data-world-y="-0.4"
      data-world-mx="0"
      data-world-my="3.4"
      className="relative flex min-h-[100svh] w-full flex-col justify-end overflow-hidden pb-10 pt-28 sm:pt-32"
    >
      <div className="h-content relative z-10 mx-auto w-full max-w-[1500px] px-5 sm:px-10 lg:px-16">
        <div className="h-pop label inline-flex items-center gap-3 rounded-full bg-[var(--ink)] py-1.5 pl-1.5 pr-4 text-[var(--cream)]">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-[var(--ink)] ring-2 ring-[var(--sun)]/40">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/webnd-mark.png" alt="WebnD" className="h-4 w-auto" />
          </span>
          <Scramble text={`${EVENT.orgShort} · ${EVENT.institute} presents`} onMount />
        </div>

        <h1 className="relative mt-8 text-[clamp(46px,9.2vw,150px)]">
          <span className="sr-only">Code Relay 5.0</span>
          <span className="flex flex-col items-start gap-[0.1em]">
            <CubeWord text="CODE" trigger="intro" />
            <CubeWord text="RELAY" trigger="intro" setOffset={2} />
          </span>
          <span className="h-stamp absolute left-[calc(4*1.08em+0.15em)] top-[0.05em] hidden sm:grid h-[0.95em] w-[0.95em] place-items-center rounded-full bg-[var(--crimson)] text-[var(--cream)] ring-4 ring-[var(--ink)]">
            <span className="text-center leading-none">
              <span className="block font-display text-[0.32em]">5.0</span>
              <span className="label mt-1 block !text-[0.08em]">edition</span>
            </span>
          </span>
        </h1>

        <div className="mt-10 max-w-xl">
          <p className="h-pop text-lg font-medium text-[var(--ink)]/80 sm:text-xl">
            Step into the relay. Two tracks, one baton and{" "}
            <span className="font-bold text-[var(--crimson)]">{EVENT.hackHours} hours</span> of building at IIT Bhubaneswar.
          </p>
          <div className="h-pop mt-7 flex flex-wrap items-center gap-3">
            <Magnetic>
              <Link href="/register" className="btn-chunky bg-[var(--crimson)] text-[var(--cream)]" data-cursor="Go!">
                Register now
                <span className="grid h-6 w-6 place-items-center rounded-full bg-[var(--cream)] text-[var(--crimson)]">↗</span>
              </Link>
            </Magnetic>
            <Magnetic>
              <Link href="/event" className="btn-ghost">
                Explore the event
              </Link>
            </Magnetic>
          </div>
        </div>

        <div className="h-pop mt-14 grid grid-cols-2 gap-y-4 border-t-2 border-[var(--ink)]/15 pt-5 lg:grid-cols-4">
          {ROUNDS.filter((r) => r.id !== "shortlist").map((r) => (
            <div key={r.id}>
              <div className="label text-[var(--crimson)]">
                {r.label} · {r.mode}
              </div>
              <div className="mt-1 font-bold">{r.when}</div>
            </div>
          ))}
          <div className="hidden lg:block">
            <div className="label text-[var(--crimson)]">Squad</div>
            <div className="mt-1 font-bold">Teams of {EVENT.teamSize}</div>
          </div>
          <div className="hidden items-center gap-3 lg:flex">
            <span className="relative h-10 w-6 rounded-full border-2 border-[var(--ink)]">
              <span className="absolute left-1/2 top-1.5 h-2.5 w-1.5 -translate-x-1/2 animate-bounce rounded-full bg-[var(--crimson)]" />
            </span>
            <span className="label">Scroll to enter</span>
          </div>
        </div>
      </div>
    </section>
  );
}
