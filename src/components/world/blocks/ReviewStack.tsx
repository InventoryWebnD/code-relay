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

        <div className="relative mt-14 text-center">
          <span className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 font-display text-[180px] leading-none text-[var(--crimson)]/20" aria-hidden>
            “
          </span>
          <p ref={quote} className="relative mx-auto max-w-4xl font-display text-[clamp(26px,3.6vw,54px)] !normal-case !leading-[1.08] tracking-tight">
            {r.quote.split(" ").map((w, i) => (
              <span key={`${idx}-${i}`} className="inline-block overflow-hidden align-bottom">
                <span className="qw inline-block pr-[0.25em]">{w}</span>
              </span>
            ))}
          </p>
          <div className="label mt-8 flex items-center justify-center gap-3 text-[var(--ink)]/60">
            <span className="h-px w-8 bg-current" />
            {r.name} · {r.meta}
            <span className="h-px w-8 bg-current" />
          </div>
        </div>

        <div className="mt-12 flex items-center justify-center gap-3">
          <button
            onClick={() => go(idx - 1)}
            className="grid h-12 w-12 place-items-center rounded-full border-2 border-[var(--ink)] text-lg transition-colors hover:bg-[var(--ink)] hover:text-[var(--cream)]"
            aria-label="Previous review"
          >
            ←
          </button>
          {reviews.map((rv, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              aria-label={`Review ${i + 1}`}
              className="grid h-12 w-12 place-items-center rounded-full font-display text-xs transition-all duration-500"
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
            className="grid h-12 w-12 place-items-center rounded-full border-2 border-[var(--ink)] text-lg transition-colors hover:bg-[var(--ink)] hover:text-[var(--cream)]"
            aria-label="Next review"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
