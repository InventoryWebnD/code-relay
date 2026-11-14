"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { Magnetic, Reveal, Scramble, SplitText } from "./motion";
import type { FormationName } from "./cube/formations";

export type HeroAction = { href: string; label: string; primary?: boolean; external?: boolean };

/**
 * Page opener. The cube world builds `world` on the right while the title
 * rises on the left.
 */
export default function PageHero({
  label,
  title,
  sub,
  world = "cube",
  worldX = 6.8,
  worldY = 0,
  actions = [],
  children,
}: {
  label: string;
  title: string;
  sub?: string;
  world?: FormationName;
  worldX?: number;
  worldY?: number;
  actions?: HeroAction[];
  children?: ReactNode;
}) {
  return (
    <section
      data-world={world}
      data-world-x={worldX}
      data-world-y={worldY}
      data-world-mx="0"
      data-world-my="4"
      className="relative flex min-h-[92svh] w-full flex-col justify-end overflow-hidden pb-16 pt-32 sm:pb-20"
    >
      <div className="relative z-10 mx-auto w-full max-w-[1500px] px-5 sm:px-10 lg:px-16">
        <Reveal variant="pop">
          <span className="label inline-flex items-center gap-2 rounded-full bg-[var(--ink)] px-4 py-2 text-[var(--cream)]">
            <span className="h-2 w-2 rounded-full bg-[var(--sun)] pulse-dot" />
            <Scramble text={label} onMount />
          </span>
        </Reveal>
        <SplitText as="h1" trigger="intro" text={title} stagger={0.03} delay={0.1} className="mt-6 max-w-[11ch] font-display text-[clamp(56px,10vw,176px)]" />
        {sub && (
          <Reveal delay={0.3}>
            <p className="mt-6 max-w-xl text-lg text-[var(--ink)]/75 sm:text-xl">{sub}</p>
          </Reveal>
        )}
        {actions.length > 0 && (
          <Reveal delay={0.4} className="mt-8 flex flex-wrap items-center gap-3">
            {actions.map((a) => {
              const cls = a.primary ? "btn-chunky bg-[var(--crimson)] text-[var(--cream)]" : "btn-ghost";
              return (
                <Magnetic key={a.href + a.label}>
                  {a.external ? (
                    <a href={a.href} target="_blank" rel="noreferrer" className={cls}>
                      {a.label}
                    </a>
                  ) : (
                    <Link href={a.href} className={cls}>
                      {a.label}
                    </Link>
                  )}
                </Magnetic>
              );
            })}
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}
