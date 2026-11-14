"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReduced } from "@/components/world/motion";
import { ROUNDS, EVENT } from "@/data/cr5";

const ACCENT = ["var(--crimson)", "var(--teal)", "var(--navy)"];

export default function RelayRun({ id = "relay" }: { id?: string }) {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sec = section.current;
    const tr = track.current;
    if (!sec || !tr || prefersReduced()) return;
    const mm = gsap.matchMedia();

    mm.add("(min-width: 900px)", () => {
      const q = gsap.utils.selector(sec);
      const dist = () => tr.scrollWidth - window.innerWidth;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sec,
          start: "top top",
          end: () => `+=${dist() + window.innerHeight * 0.4}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
      tl.to(tr, { x: () => -dist(), ease: "none" }, 0)
        .to(q(".rr-runner"), { left: "calc(100% - 120px)", ease: "none" }, 0)
        .to(q(".rr-fill"), { scaleX: 1, ease: "none" }, 0);

      q(".rr-lap").forEach((p) => {
        gsap.from(p.querySelectorAll(".rr-pop"), {
          y: 80,
          rotate: 4,
          opacity: 0,
          ease: "expo.out",
          duration: 1,
          stagger: 0.07,
          scrollTrigger: { trigger: p, containerAnimation: tl, start: "left 78%", toggleActions: "play none none reverse" },
        });
        const num = p.querySelector(".rr-num");
        if (num)
          gsap.fromTo(num, { xPercent: 30 }, { xPercent: -30, ease: "none", scrollTrigger: { trigger: p, containerAnimation: tl, start: "left right", end: "right left", scrub: true } });
      });
      return () => tl.scrollTrigger?.kill();
    });

    const t = setTimeout(() => ScrollTrigger.refresh(), 200);
    return () => {
      clearTimeout(t);
      mm.revert();
    };
  }, []);

  return (
    <section id={id} ref={section} data-world="path" className="relative overflow-hidden min-[900px]:h-screen">
      <div
        ref={track}
        className="flex h-full flex-col gap-20 px-5 py-24 min-[900px]:w-max min-[900px]:flex-row min-[900px]:items-center min-[900px]:gap-[10vw] min-[900px]:px-[8vw] min-[900px]:py-0"
      >
        <div className="rr-lap flex shrink-0 flex-col justify-center min-[900px]:w-[40vw]">
          <span className="rr-pop label text-[var(--crimson)]">The format</span>
          <h2 className="rr-pop mt-5 font-display text-[clamp(48px,7vw,124px)]">
            How the
            <br />
            <span className="text-[var(--crimson)]">relay</span> runs
          </h2>
          <p className="rr-pop mt-6 max-w-md text-lg text-[var(--ink)]/75">
            Two rounds, one baton. Start online from anywhere in India, finish with a {EVENT.hackHours}-hour sprint on campus. Follow the path.
          </p>
        </div>

        {ROUNDS.map((r, i) => (
          <article key={r.id} className="rr-lap relative flex shrink-0 flex-col justify-center min-[900px]:w-[min(620px,44vw)]">
            <span
              className="rr-num pointer-events-none absolute -top-[0.55em] right-0 font-display text-[clamp(160px,22vw,360px)] leading-none opacity-90"
              style={{ color: "transparent", WebkitTextStroke: `3px ${ACCENT[i]}` }}
              aria-hidden
            >
              0{i + 1}
            </span>
            <div className="relative">
              <div className="rr-pop flex flex-wrap items-center gap-3">
                <span className="label rounded-full px-3 py-1.5 text-[var(--cream)]" style={{ background: ACCENT[i] }}>
                  {r.label}
                </span>
                <span className="label">{r.mode}</span>
                <span className="label text-[var(--ink)]/55">· {r.when}</span>
              </div>
              <h3 className="rr-pop mt-6 font-display text-[clamp(40px,4.6vw,76px)]">{r.title}</h3>
              <p className="rr-pop mt-4 max-w-md text-lg text-[var(--ink)]/80">{r.body}</p>
              <div className="rr-pop mt-8 flex items-baseline gap-4">
                <span className="font-display text-[clamp(44px,4.6vw,72px)]" style={{ color: ACCENT[i] }}>
                  {r.stat}
                </span>
                <span className="label text-[var(--ink)]/60">{r.statLabel}</span>
              </div>
            </div>
          </article>
        ))}

        <div className="rr-lap flex shrink-0 flex-col items-start justify-center min-[900px]:w-[38vw] min-[900px]:pr-[6vw]">
          <div className="rr-pop grid h-36 w-36 place-items-center rounded-full bg-[var(--crimson)] text-[var(--cream)] spin-slow">
            <span className="text-center font-display text-lg leading-tight">
              FINISH
              <br />
              LINE
            </span>
          </div>
          <h3 className="rr-pop mt-8 font-display text-[clamp(36px,4.5vw,72px)]">
            Winners take
            <br />
            <span className="text-[var(--crimson)]">the podium.</span>
          </h3>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-8 left-0 right-0 hidden px-[4vw] min-[900px]:block">
        <div className="relative h-2 rounded-full bg-[var(--ink)]/10">
          <div className="rr-fill absolute inset-0 origin-left scale-x-0 rounded-full bg-[var(--crimson)]" />
          <div className="rr-runner absolute -top-[86px] left-0 h-[96px] w-[120px]">
            <div className="absolute right-[78%] top-1/2 flex -translate-y-1/2 flex-col gap-1.5">
              {[30, 52, 24].map((w, i) => (
                <span key={i} className="block h-[3px] rounded-full bg-[var(--ink)]" style={{ width: w }} />
              ))}
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/webnd-mascot-fly.webp" alt="" className="relative h-full w-full -scale-x-100 object-contain" />
          </div>
        </div>
      </div>
    </section>
  );
}
