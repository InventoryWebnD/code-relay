"use client";

import { Reveal } from "@/components/world/motion";
import SectionHead from "@/components/world/SectionHead";
import { EVENT, OC_CR5 } from "@/data/cr5";

/** The CR 5.0 organising committee, in the site's editorial row style. */
export default function OrganisingCommittee({ id = "team" }: { id?: string }) {
  return (
    <section id={id} className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-[1300px] px-5 sm:px-10 lg:px-16">
        <SectionHead label={`Organising committee · CR ${EVENT.edition}`} title={`The crew\nbehind ${EVENT.edition}`} />
        <div className="mt-14 grid gap-12 md:grid-cols-3 md:gap-10">
          {OC_CR5.map((g, gi) => (
            <Reveal key={g.role} delay={gi * 0.08}>
              <div className="flex items-baseline justify-between pb-3">
                <h3 className="font-display text-xl">{g.role}</h3>
                <span className="label text-[var(--ink)]/45">{String(g.people.length).padStart(2, "0")}</span>
              </div>
              <ul className="border-b-2 border-[var(--ink)]/15">
                {g.people.map((p, i) => (
                  <li
                    key={p}
                    className="row-flood group flex items-center justify-between px-2 py-4"
                    style={{ ["--flood" as string]: "var(--crimson)" }}
                  >
                    <span className="font-display text-[clamp(26px,2.6vw,38px)] !normal-case tracking-tight">{p}</span>
                    <span className="label text-[var(--ink)]/40 transition-colors group-hover:text-[var(--cream)]/70">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
