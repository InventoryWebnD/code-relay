"use client";

import { useState } from "react";
import PageHero from "@/components/world/PageHero";
import SectionHead from "@/components/world/SectionHead";
import { CountUp, Reveal } from "@/components/world/motion";
import {
  CR3_HIGHLIGHTS,
  CR4_HIGHLIGHTS,
  EVENT,
  FOOD_MODELS,
  FOOD_NEEDS,
  FOOD_PARTNERS,
  FOOD_PITCH,
  FOOD_STATS,
  PARTNER_OPTIONS,
  SPONSOR_TIERS,
  WHY_SPONSOR,
} from "@/data/cr5";

/* ------------------------------------------------------------------ */
export function SponsorsHero() {
  return (
    <PageHero
      label="Partner with Code Relay 5.0"
      title={"Fuel\nthe relay"}
      sub="Put your brand in front of thousands of India's sharpest student builders, before, during and long after the 30-hour final."
      world="podium"
      worldX={6}
      actions={[
        { href: EVENT.brochures.sponsorship, label: "Sponsorship brochure ↓", primary: true, external: true },
        { href: "#tiers", label: "See tiers" },
        { href: "#contact", label: "Talk to us" },
      ]}
    />
  );
}

/* ------------------------------------------------------------------ */
export function ReachBlock() {
  return (
    <section data-world="scatter" className="relative overflow-hidden rounded-t-[48px] bg-[var(--ink)] py-24 text-[var(--cream)] sm:py-32">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-10 lg:px-16">
        <SectionHead dark label="Your reach" title={"The crowd\nyou'll meet"} sub="Highlights from the last two editions of Code Relay." />
        <Reveal group className="mt-16 grid grid-cols-2 [container-type:inline-size] lg:grid-cols-4" stagger={0.1}>
          {CR4_HIGHLIGHTS.map((s, i) => (
            <div key={s.label} className={`py-6 pr-4 ${i ? "lg:border-l-2 lg:border-[var(--cream)]/15 lg:pl-8" : ""}`}>
              <span className="label text-[var(--sun)]">CR 4.0</span>
              {/* sized from the row width (cqw): every number the same size, none can collide */}
              <CountUp value={s.value} suffix={s.suffix} className="mt-3 block whitespace-nowrap font-display text-[min(10cqw,84px)] tabular-nums lg:text-[min(4.6cqw,84px)]" />
              <span className="label mt-3 block text-[var(--cream)]/60">{s.label}</span>
            </div>
          ))}
        </Reveal>
        <Reveal className="mt-8 flex flex-wrap gap-6 border-t-2 border-[var(--cream)]/15 pt-6">
          {CR3_HIGHLIGHTS.map((s) => (
            <span key={s.label} className="label text-[var(--cream)]/70">
              CR 3.0 · <span className="text-[var(--cream)]">{s.value.toLocaleString("en-IN")}{s.suffix}</span> {s.label}
            </span>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Tier ladder: each tier is a full-width rung; open one to see perks  */
/* ------------------------------------------------------------------ */
export function TierStack() {
  const [open, setOpen] = useState(0);

  return (
    <section id="tiers" data-world="stairs" data-world-x="0" data-world-fade="0.6" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-[1300px] px-5 sm:px-10 lg:px-16">
        <SectionHead label="Sponsorship levels" title={"Climb the\nladder"} sub="Five rungs. Each one comes with logo placement and a direct line to our builders." />

        <div className="mt-14 border-b-2 border-[var(--ink)]/15">
          {SPONSOR_TIERS.map((t, i) => {
            const isOpen = open === i;
            return (
              <div key={t.id} className="border-t-2 border-[var(--ink)]/15">
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  onPointerEnter={() => setOpen(i)}
                  className="group relative grid w-full grid-cols-[1fr_auto] items-center gap-4 overflow-hidden px-2 py-5 text-left sm:grid-cols-[90px_1fr_auto] sm:px-4"
                  aria-expanded={isOpen}
                >
                  <span
                    className="absolute inset-0 -z-0 origin-left transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)]"
                    style={{ background: t.color, transform: `scaleX(${isOpen ? 1 : 0})` }}
                  />
                  <span className="label relative hidden sm:block" style={{ color: isOpen ? t.ink : undefined }}>
                    Rung 0{5 - i}
                  </span>
                  <span className="relative font-display text-[clamp(40px,7vw,108px)] leading-none transition-colors duration-500" style={{ color: isOpen ? t.ink : "var(--ink)" }}>
                    {t.name}
                  </span>
                  <span className="relative font-display text-xl transition-colors duration-500 sm:text-3xl" style={{ color: isOpen ? t.ink : "var(--crimson)" }}>
                    {t.price}
                  </span>
                </button>
                <div className="grid transition-[grid-template-rows] duration-700 ease-[cubic-bezier(.22,1,.36,1)]" style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}>
                  <div className="overflow-hidden">
                    <ul className="grid gap-x-10 gap-y-3 px-2 pb-8 pt-6 sm:grid-cols-2 sm:px-4 sm:pl-[106px] lg:grid-cols-3">
                      {t.perks.map((p, k) => (
                        <li key={p} className="flex items-start gap-3 text-[15px]">
                          <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: t.id === "silver" ? "var(--ink)" : t.color }} />
                          <span style={{ animation: isOpen ? `rowIn .5s ${k * 0.04}s both` : undefined }}>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
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
export function PartnerOptions() {
  return (
    <section data-world="towers" data-world-fade="0.2" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-[1100px] px-5 sm:px-10">
        <SectionHead align="center" label="Partner options" title={"Own a track.\nHire the winners."} />
        <div className="mt-16 grid gap-16 lg:grid-cols-2 lg:gap-0">
          {PARTNER_OPTIONS.map((p, i) => (
            <Reveal key={p.id} variant={i ? "right" : "left"} className={i ? "lg:border-l-2 lg:border-[var(--ink)]/15 lg:pl-12" : "lg:pr-12"}>
              <span className="grid h-20 w-20 place-items-center rounded-full font-display text-3xl" style={{ background: i ? "var(--sun)" : "var(--teal)" }}>
                {i ? "★" : "⚑"}
              </span>
              <h3 className="mt-6 font-display text-[clamp(34px,4vw,56px)]">{p.name}</h3>
              <span className="mt-1 block font-display text-xl text-[var(--crimson)]">{p.price}</span>
              <ul className="mt-8 border-b-2 border-[var(--ink)]/15">
                {p.perks.map((x, k) => (
                  <li key={x} className="flex gap-4 border-t-2 border-[var(--ink)]/15 py-3">
                    <span className="label pt-1 text-[var(--ink)]/45">{String(k + 1).padStart(2, "0")}</span>
                    <span className="font-medium">{x}</span>
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

/* ------------------------------------------------------------------ */
/* Food & beverage: same editorial language as the rest of the page —   */
/* section head, numbered row-flood rows, quiet supporting columns       */
export function FoodBlock() {
  return (
    <section id="food" data-world="scatter" data-world-fade="0.5" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-[1300px] px-5 sm:px-10 lg:px-16">
        <div className="grid items-end gap-10 lg:grid-cols-[1.2fr_1fr]">
          <SectionHead label="Food & beverage partners" title={"Feed the\nbuilders"} />
          <Reveal>
            <p className="max-w-md text-lg leading-relaxed text-[var(--ink)]/75">{FOOD_PITCH}</p>
            <div className="mt-8 flex gap-10">
              {FOOD_STATS.map((s) => (
                <div key={s.label}>
                  <div className="font-display text-3xl text-[var(--crimson)] sm:text-4xl">{s.value}</div>
                  <div className="label mt-1 text-[var(--ink)]/55">{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="mt-14 border-b-2 border-[var(--ink)]/15">
          {FOOD_PARTNERS.map((f, i) => (
            <Reveal key={f.name} delay={i * 0.05}>
              <div
                className="row-flood group grid grid-cols-[56px_1fr] items-baseline gap-4 px-2 py-6 sm:grid-cols-[90px_1fr_1.4fr] sm:gap-8 sm:px-4"
                style={{ ["--flood" as string]: "var(--ink)" }}
              >
                <span className="font-display text-2xl text-[var(--crimson)] transition-colors group-hover:text-[var(--sun)] sm:text-3xl">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-xl !normal-case tracking-tight sm:text-2xl">{f.name}</h3>
                <p className="col-start-2 text-[15px] opacity-75 sm:col-start-auto">{f.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {FOOD_MODELS.map((m, i) => (
            <Reveal key={m.title} delay={i * 0.06}>
              <span className="label text-[var(--ink)]/45">{String(i + 1).padStart(2, "0")}</span>
              <h4 className="mt-1 font-display text-lg">{m.title}</h4>
              <p className="mt-1 text-[15px] text-[var(--ink)]/70">{m.body}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 flex flex-col gap-4 border-t-2 border-[var(--ink)]/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <span className="label text-[var(--ink)]/55">Covers {FOOD_NEEDS.join(" · ").toLowerCase()}</span>
          <a href={EVENT.brochures.food} target="_blank" rel="noreferrer" className="btn-chunky self-start bg-[var(--ink)] text-[var(--cream)] sm:self-auto">
            Food &amp; beverage brochure ↓
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
export function WhySponsor() {
  return (
    <section data-world="ring" data-world-fade="0.55" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-[1300px] px-5 sm:px-10 lg:px-16">
        <SectionHead label="Why sponsor" title={"Ten reasons\nto run with us"} />
        <div className="mt-14 grid gap-x-16 md:grid-cols-2">
          {WHY_SPONSOR.map((w, i) => (
            <Reveal key={w.title} delay={(i % 2) * 0.08}>
              <div className="row-flood group grid grid-cols-[64px_1fr] gap-4 px-2 py-6" style={{ ["--flood" as string]: "var(--ink)" }}>
                <span className="font-display text-3xl text-[var(--crimson)] transition-colors group-hover:text-[var(--sun)]">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h4 className="font-display text-xl !normal-case tracking-tight">{w.title}</h4>
                  <p className="mt-1 text-[15px] opacity-75">{w.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
export function ContactDesk() {
  return (
    <section id="contact" data-world="cube" className="relative overflow-hidden rounded-t-[48px] bg-[var(--navy)] py-24 text-[var(--cream)] sm:py-32">
      <div className="relative mx-auto grid max-w-[1300px] items-center gap-14 px-5 sm:px-10 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
        <div>
          <SectionHead
            dark
            label="Contact"
            title={"Let's\ntalk."}
            sub="Tell us what you'd like to do at Code Relay 5.0. We'll put together a package that fits, from a single bounty to the title slot."
          />
          <Reveal className="mt-10 flex flex-wrap gap-3">
            <a href={EVENT.brochures.sponsorship} target="_blank" rel="noreferrer" className="btn-chunky border-[var(--cream)] bg-[var(--sun)] text-[var(--ink)]">
              Sponsorship brochure ↓
            </a>
            <a href={EVENT.brochures.food} target="_blank" rel="noreferrer" className="btn-chunky border-[var(--cream)] bg-[var(--teal)] text-[var(--ink)]">
              Food &amp; beverage brochure ↓
            </a>
          </Reveal>
        </div>

        {/* the partnership contact card (as on the brochure's last page) */}
        <Reveal variant="pop">
          <div className="stk relative bg-[var(--paper)] p-6 text-[var(--ink)] sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="label text-[var(--crimson)]">Partnership contact</span>
                <h3 className="mt-2 font-display text-[clamp(28px,3vw,40px)] leading-none">{EVENT.contact.name}</h3>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/webnd-mascot-stand.webp" alt="WebnD mascot" className="-mt-2 w-20 shrink-0 bob sm:w-24" />
            </div>
            <ul className="mt-6 border-b-2 border-[var(--ink)]/15">
              {[
                { k: "Email", v: EVENT.contact.email, href: `mailto:${EVENT.contact.email}?subject=Code%20Relay%205.0%20Partnership` },
                { k: "Phone", v: EVENT.contact.phone, href: EVENT.contact.phoneHref },
                { k: "LinkedIn", v: EVENT.contact.linkedin, href: EVENT.contact.linkedinUrl, ext: true },
                { k: "Instagram", v: EVENT.contact.instagram, href: EVENT.contact.instagramUrl, ext: true },
              ].map((r) => (
                <li key={r.k} className="border-t-2 border-[var(--ink)]/15">
                  <a
                    href={r.href}
                    {...(r.ext ? { target: "_blank", rel: "noreferrer" } : {})}
                    className="group flex items-center justify-between gap-4 py-3.5"
                  >
                    <span className="label text-[var(--ink)]/50">{r.k}</span>
                    <span className="flex min-w-0 items-center gap-2 text-right font-semibold transition-colors group-hover:text-[var(--crimson)]">
                      <span className="break-all">{r.v}</span>
                      <span className="transition-transform duration-500 group-hover:-rotate-45" aria-hidden>
                        →
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
