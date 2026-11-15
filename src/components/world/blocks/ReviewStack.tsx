"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import SectionHead from "@/components/world/SectionHead";
import { prefersReduced } from "@/components/world/motion";
import { REVIEWS, Review } from "@/data/cr5";

/**
 * Reviews as one giant quote that swaps word-by-word, with round picks
 * underneath. No cards: the cube world orbits behind as a ring.
 */
export default function ReviewStack({ reviews = REVIEWS }: { reviews?: Review[] }) {
  const [idx, setIdx] = useState(0);
  const quote = useRef<HTMLParagraphElement>(null);
  const r = reviews[idx];

  const go = useCallback(
    (n: number) => {
      const el = quote.current;
      const next = (n + reviews.length) % reviews.length;
      if (!el || prefersReduced()) {
        setIdx(next);
        return;
      }
      gsap.to(el.querySelectorAll(".qw"), {
        yPercent: -110,
        opacity: 0,
        duration: 0.35,
        stagger: 0.012,
        ease: "power3.in",
        onComplete: () => setIdx(next),
      });
    },
    [reviews.length]
  );

  useEffect(() => {
    const el = quote.current;
    if (!el || prefersReduced()) return;
    gsap.fromTo(el.querySelectorAll(".qw"), { yPercent: 110, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.7, stagger: 0.02, ease: "expo.out" });
  }, [idx]);

  useEffect(() => {
    const t = setInterval(() => go(idx + 1), 7000);
    return () => clearInterval(t);
  }, [idx, go]);

  return (
    <section data-world="ring" className="relative overflow-hidden py-28 sm:py-36">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-10">
        <SectionHead align="center" label="Participant voices" title={"Heard at the\nfinish line"} />

        {/* the quote sits in a speech bubble that points at who said it */}
        <div className="mt-16 flex flex-col items-center">
          <div className="stk relative w-full max-w-4xl bg-[var(--paper)] px-6 pb-10 pt-12 text-center sm:px-14 sm:pb-14 sm:pt-16">
            <span
              className="absolute -top-7 left-6 grid h-14 w-14 place-items-center rounded-full border-[3px] border-[var(--ink)] bg-[var(--crimson)] pt-4 font-display text-5xl leading-none text-[var(--cream)] sm:left-10"
              aria-hidden
            >
              “
            </span>
            <p ref={quote} className="relative font-display text-[clamp(24px,3.2vw,48px)] !normal-case !leading-[1.08] tracking-tight">
              {r.quote.split(" ").map((w, i) => (
                <span key={`${idx}-${i}`} className="inline-block overflow-hidden align-bottom">
                  <span className="qw inline-block pr-[0.25em]">{w}</span>
                </span>
              ))}
            </p>
            {/* tail */}
            <span
              className="absolute -bottom-[15px] left-1/2 h-7 w-7 -translate-x-1/2 rotate-45 border-b-[3px] border-r-[3px] border-[var(--ink)] bg-[var(--paper)]"
              aria-hidden
            />
          </div>
          <span
            className="label mt-8 inline-flex items-center gap-2 rounded-full border-2 border-[var(--ink)] px-4 py-2 text-[var(--ink)] transition-colors duration-500"
            style={{ background: r.color }}
          >
            {r.name} · {r.meta}
          </span>
        </div>

        <div className="mt-12 flex items-center justify-center gap-2 sm:gap-3">
          <button
            onClick={() => go(idx - 1)}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full sm:h-12 sm:w-12 border-2 border-[var(--ink)] text-lg transition-colors hover:bg-[var(--ink)] hover:text-[var(--cream)]"
            aria-label="Previous review"
          >
            ←
          </button>
          {reviews.map((rv, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              aria-label={`Review ${i + 1}`}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full sm:h-12 sm:w-12 font-display text-xs transition-all duration-500"
              style={{
                background: i === idx ? "var(--ink)" : rv.color,
                color: i === idx ? "var(--cream)" : "var(--ink)",
                transform: i === idx ? "scale(1.2)" : "scale(1)",
              }}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => go(idx + 1)}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full sm:h-12 sm:w-12 border-2 border-[var(--ink)] text-lg transition-colors hover:bg-[var(--ink)] hover:text-[var(--cream)]"
            aria-label="Next review"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
