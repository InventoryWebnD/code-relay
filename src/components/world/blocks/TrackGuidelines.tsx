"use client";

import { useState } from "react";
import { Reveal } from "@/components/world/motion";
import SectionHead from "@/components/world/SectionHead";
import { TRACKS, TRACK_FREE_NOTE, WEB3_GUIDE, tracksIn, type Track, type TrackGuide } from "@/data/cr5";

/** switcher options: each Web2 track has its own rulebook; the Web3 tracks share one */
const OPTIONS = [
  ...TRACKS.filter((t) => t.guide).map((t) => ({ key: t.id, label: t.name })),
  { key: "web3", label: "Web3 tracks" },
];

/** Round 01 guidelines for CR 5.0, in the site's editorial row style. */
export default function TrackGuidelines({ id = "guidelines" }: { id?: string }) {
  const [active, setActive] = useState(0);
  const opt = OPTIONS[active];
  const t = TRACKS.find((x) => x.id === opt.key);

  return (
    <section id={id} data-world="floor" data-world-fade="0.55" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-[1300px] px-5 sm:px-10 lg:px-16">
        <SectionHead label="Round 01 · Guidelines" title={"Read before\nyou build"} sub={TRACK_FREE_NOTE} />

        {/* switcher (same control as the PS vault's edition switch) */}
        <div className="mt-10 inline-flex flex-wrap gap-1 rounded-full bg-[var(--ink)] p-1.5">
          {OPTIONS.map((o, i) => (
            <button
              key={o.key}
              onClick={() => setActive(i)}
              className={`rounded-full px-5 py-3 font-display text-sm transition-colors duration-300 sm:px-8 sm:text-base ${
                active === i ? "bg-[var(--sun)] text-[var(--ink)]" : "text-[var(--cream)] hover:bg-white/10"
              }`}
            >
              {o.label}
            </button>
          ))}
        </div>

        {t?.guide ? <Web2Guide key={t.id} t={t} g={t.guide} /> : <Web3Guide key="web3" />}
      </div>
    </section>
  );
}

function Web2Guide({ t, g }: { t: Track; g: TrackGuide }) {
  const total = g.judging.reduce((n, j) => n + j.points, 0);
  return (
    <div key={t.id} className="mt-12 border-t-2 border-[var(--ink)] pt-10" style={{ animation: "rowIn 0.6s both cubic-bezier(.22,1,.36,1)" }}>
      <div className="flex flex-wrap items-center gap-2">
        <span className="label rounded-full px-3 py-1 text-[var(--cream)]" style={{ background: t.color }}>
          {t.name}
        </span>
        <span className="label text-[var(--ink)]/55">{t.domain} domain · Track {String(t.order).padStart(2, "0")}{t.partner ? ` · with ${t.partner}` : ""}</span>
      </div>

      {/* overview + what to build | sub-tracks */}
      <div className="mt-8 grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
        <div>
          <p className="text-lg leading-relaxed text-[var(--ink)]/85">{g.overview}</p>
          <span className="label mt-8 block text-[var(--ink)]/50">What to build</span>
          <p className="mt-2 leading-relaxed text-[var(--ink)]/75">{g.build}</p>
        </div>
        <div>
          <span className="label text-[var(--ink)]/50">Sub-tracks · choose one</span>
          <ul className="mt-3 border-b-2 border-[var(--ink)]/15">
            {t.items.map((it, i) => (
              <li key={it.title} className="flex gap-4 border-t-2 border-[var(--ink)]/15 py-3">
                <span className="font-display text-[var(--crimson)]">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-display !normal-case tracking-tight">{it.title}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* requirements */}
      <Reveal className="mt-16">
        <h3 className="font-display text-[clamp(26px,3vw,40px)]">{g.requirementsLabel}</h3>
        <p className="mt-3 max-w-3xl text-[var(--ink)]/75">{g.requirementsRule}</p>
      </Reveal>
      <div className="mt-6 border-b-2 border-[var(--ink)]/15">
        {g.requirements.map((r, i) => (
          <div
            key={r.name}
            className="row-flood group grid grid-cols-[48px_1fr] items-baseline gap-4 px-2 py-5 sm:grid-cols-[72px_0.8fr_1.4fr_auto] sm:gap-8 sm:px-4"
            style={{ ["--flood" as string]: t.color }}
          >
            <span className="font-display text-xl text-[var(--crimson)] transition-colors group-hover:text-[var(--sun)] sm:text-2xl">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h4 className="font-display text-lg !normal-case tracking-tight sm:text-xl">{r.name}</h4>
            <p className="col-start-2 text-[15px] opacity-75 sm:col-start-auto">{r.expect}</p>
            <span className="col-start-2 sm:col-start-auto">
              {r.compulsory && (
                <span className="label rounded-full border-2 border-current px-3 py-1 text-[10px]">Compulsory</span>
              )}
            </span>
          </div>
        ))}
      </div>
      <p className="mt-5 text-[15px] text-[var(--ink)]/70">{g.declare}</p>

      {/* judging */}
      <Reveal className="mt-16">
        <h3 className="font-display text-[clamp(26px,3vw,40px)]">How you are judged</h3>
      </Reveal>
      <div className="mt-6 grid grid-cols-2 gap-y-8 sm:grid-cols-3 lg:grid-cols-6">
        {g.judging.map((j, i) => (
          <div key={j.label} className={`pr-4 ${i ? "lg:border-l-2 lg:border-[var(--ink)]/15 lg:pl-5" : ""}`}>
            <div className="font-display text-3xl sm:text-4xl" style={{ color: t.color }}>
              {j.points}
            </div>
            <div className="label mt-1 text-[var(--ink)]/60">{j.label}</div>
          </div>
        ))}
      </div>
      <p className="label mt-8 text-[var(--ink)]/55">
        Out of {total}, plus a {g.bonus.toLowerCase()} · {g.tieBreaker}
      </p>

      {/* submission */}
      <Reveal className="mt-16">
        <h3 className="font-display text-[clamp(26px,3vw,40px)]">Submission</h3>
      </Reveal>
      <div className="mt-6 grid gap-8 sm:grid-cols-2">
        {g.submission.map((s) => (
          <div key={s.tier} className="border-t-2 border-[var(--ink)]/15 pt-4">
            <span className="label" style={{ color: t.color }}>
              {s.tier} tier
            </span>
            <p className="mt-2 text-[15px] text-[var(--ink)]/80">{s.body}</p>
          </div>
        ))}
      </div>

      {/* not accepted */}
      <div className="mt-12 border-t-2 border-[var(--ink)] pt-6">
        <span className="label text-[var(--crimson)]">Not accepted</span>
        <p className="mt-2 max-w-3xl text-[15px] text-[var(--ink)]/75">{g.notAccepted}</p>
      </div>
    </div>
  );
}

function Web3Guide() {
  const tracks = tracksIn("Web3");
  return (
    <div className="mt-12 border-t-2 border-[var(--ink)] pt-10" style={{ animation: "rowIn 0.6s both cubic-bezier(.22,1,.36,1)" }}>
      <div className="flex flex-wrap items-center gap-2">
        <span className="label rounded-full bg-[var(--navy)] px-3 py-1 text-[var(--cream)]">Web3 domain</span>
        <span className="label text-[var(--ink)]/55">{WEB3_GUIDE.chains}</span>
      </div>

      {/* the two problem statements */}
      <div className="mt-8 grid gap-12 lg:grid-cols-2 lg:gap-16">
        {tracks.map((tr) => (
          <div key={tr.id}>
            <span className="label" style={{ color: tr.color }}>
              Track {String(tr.order).padStart(2, "0")}
            </span>
            <h3 className="mt-2 font-display text-[clamp(26px,3vw,40px)]">{tr.name}</h3>
            <p className="mt-4 leading-relaxed text-[var(--ink)]/80">{tr.problem}</p>
            <span className="label mt-6 block text-[var(--ink)]/50">{tr.itemsLabel}</span>
            <ul className="mt-3 border-b-2 border-[var(--ink)]/15">
              {tr.items.map((it, i) => (
                <li key={it.title} className="flex gap-4 border-t-2 border-[var(--ink)]/15 py-3">
                  <span className="font-display text-[var(--crimson)]">{String(i + 1).padStart(2, "0")}</span>
                  <span>
                    <span className="font-display !normal-case tracking-tight">{it.title}</span>
                    <span className="mt-0.5 block text-[15px] text-[var(--ink)]/70">{it.body}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* submission */}
      <Reveal className="mt-16">
        <h3 className="font-display text-[clamp(26px,3vw,40px)]">Round 1 submission</h3>
        <p className="mt-3 max-w-3xl text-[var(--ink)]/75">{WEB3_GUIDE.submission} (both tracks)</p>
      </Reveal>
      <div className="mt-6 border-b-2 border-[var(--ink)]/15">
        {WEB3_GUIDE.checklist.map((c, i) => (
          <div
            key={c}
            className="row-flood group grid grid-cols-[48px_1fr] items-baseline gap-4 px-2 py-5 sm:grid-cols-[72px_1fr] sm:px-4"
            style={{ ["--flood" as string]: "var(--navy)" }}
          >
            <span className="font-display text-xl text-[var(--crimson)] transition-colors group-hover:text-[var(--sun)] sm:text-2xl">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="font-display text-lg !normal-case tracking-tight sm:text-xl">{c}</span>
          </div>
        ))}
      </div>
      <p className="label mt-5 text-[var(--ink)]/60">{WEB3_GUIDE.bonus}</p>

      {/* judging */}
      <Reveal className="mt-16">
        <h3 className="font-display text-[clamp(26px,3vw,40px)]">What judges look for in Round 1</h3>
      </Reveal>
      <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {WEB3_GUIDE.judging.map((j) => (
          <div key={j.label} className="border-t-2 border-[var(--ink)]/15 pt-4">
            <span className="label text-[var(--navy)]">{j.label}</span>
            <p className="mt-2 text-[15px] text-[var(--ink)]/80">{j.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
