"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import type { ProblemStatement } from "@/data/problemStatements";
import PageHero from "@/components/world/PageHero";
import { prefersReduced } from "@/components/world/motion";
import { useLenis } from "@/components/world/SmoothScroll";

type Edition = "4.0" | "3.0";
type TrackF = "ALL" | "Web2" | "Web3";

const TRACK_COLOR = { Web2: "var(--crimson)", Web3: "var(--navy)" } as const;

export function VaultHero({ selectedEdition, onEditionChange }: { selectedEdition: Edition; onEditionChange: (e: Edition) => void }) {
  return (
    <PageHero
      label="Problem statement vault"
      title={"Crack\nthe vault"}
      sub="The challenges that shaped previous editions of Code Relay across Web2 and Web3. Use them to warm up before Round 01."
      world="cube"
      worldX={6.4}
    >
      <div className="mt-10 inline-flex gap-1 rounded-full bg-[var(--ink)] p-1.5">
        {(["4.0", "3.0"] as Edition[]).map((e) => (
          <button
            key={e}
            onClick={() => onEditionChange(e)}
            className={`rounded-full px-6 py-3 font-display text-sm transition-colors duration-300 sm:px-8 sm:text-base ${
              selectedEdition === e ? "bg-[var(--sun)] text-[var(--ink)]" : "text-[var(--cream)] hover:bg-white/10"
            }`}
          >
            Code Relay {e}
          </button>
        ))}
      </div>
    </PageHero>
  );
}

export function VaultFilters({
  selectedTrack,
  onSelectTrack,
  searchQuery,
  onSearchChange,
  totalCount,
  web2Count,
  web3Count,
  filteredCount,
  selectedEdition,
  onReset,
}: {
  selectedTrack: TrackF;
  onSelectTrack: (t: TrackF) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  totalCount: number;
  web2Count: number;
  web3Count: number;
  filteredCount: number;
  selectedEdition: Edition;
  onReset: () => void;
}) {
  const tabs: { id: TrackF; label: string; n: number; bg: string }[] = [
    { id: "ALL", label: "All", n: totalCount, bg: "var(--ink)" },
    { id: "Web2", label: "Web2", n: web2Count, bg: "var(--crimson)" },
    { id: "Web3", label: "Web3", n: web3Count, bg: "var(--navy)" },
  ];
  return (
    <div className="glass sticky top-[84px] z-30 border-y border-[var(--ink)]/10">
      <div className="mx-auto flex max-w-[1500px] flex-col gap-3 px-5 py-4 sm:px-10 lg:flex-row lg:items-center lg:justify-between lg:px-16">
        <div className="flex flex-wrap gap-2">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => onSelectTrack(t.id)}
              className={`flex items-center gap-2 rounded-full px-4 py-2 font-bold transition-all duration-300 ${
                selectedTrack === t.id ? "text-[var(--cream)]" : "bg-[var(--ink)]/5 hover:bg-[var(--ink)]/10"
              }`}
              style={selectedTrack === t.id ? { background: t.bg } : undefined}
            >
              {t.label}
              <span className="label text-[10px] opacity-70">{t.n}</span>
            </button>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <label className="relative flex-1 lg:w-[360px]">
            <span className="sr-only">Search problem statements</span>
            <input
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={`Search CR ${selectedEdition} statements…`}
              className="w-full border-b-2 border-[var(--ink)] bg-transparent px-1 py-2 pr-8 font-medium outline-none placeholder:text-[var(--ink)]/40 focus:border-[var(--crimson)]"
            />
            {searchQuery && (
              <button onClick={() => onSearchChange("")} className="absolute right-1 top-1/2 -translate-y-1/2 font-bold" aria-label="Clear search">
                ✕
              </button>
            )}
          </label>
          <span className="label whitespace-nowrap">{filteredCount} shown</span>
          {(selectedTrack !== "ALL" || searchQuery) && (
            <button onClick={onReset} className="label underline underline-offset-4">
              Reset
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export function VaultGrid({
  statements,
  onExplore,
  onResetFilters,
}: {
  statements: ProblemStatement[];
  onExplore: (s: ProblemStatement) => void;
  onResetFilters: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const key = statements.map((s) => s.id).join("|");

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReduced()) return;
    gsap.fromTo(el.children, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "expo.out", stagger: 0.04 });
  }, [key]);

  return (
    <section data-world="floor" data-world-fade="0.55" className="relative py-16 sm:py-24">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-10 lg:px-16">
        {statements.length === 0 ? (
          <div className="mx-auto max-w-lg py-16 text-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/cr-mascot.png" alt="" className="mx-auto w-28 wiggle-hover" />
            <h3 className="mt-4 font-display text-3xl">Nothing here</h3>
            <p className="mt-2 text-[var(--ink)]/70">No statements match that search. Try another keyword.</p>
            <button onClick={onResetFilters} className="btn-chunky mt-6 bg-[var(--sun)] text-[var(--ink)]">
              Reset filters
            </button>
          </div>
        ) : (
          <div ref={ref} className="border-b-2 border-[var(--ink)]/15">
            {statements.map((s) => (
              <button
                key={s.id}
                onClick={() => onExplore(s)}
                className="row-flood group grid w-full grid-cols-[56px_1fr_auto] items-center gap-4 px-2 py-6 text-left sm:grid-cols-[90px_1.2fr_1.4fr_100px_40px] sm:gap-8 sm:px-4"
                style={{ ["--flood" as string]: TRACK_COLOR[s.track] }}
                data-cursor="Open"
              >
                <span className="font-display text-2xl text-[var(--ink)]/30 transition-colors group-hover:text-[var(--sun)] sm:text-4xl">
                  {String(s.number).padStart(2, "0")}
                </span>
                <h3 className="font-display text-lg !normal-case tracking-tight sm:text-2xl">{s.title}</h3>
                <p className="hidden text-sm opacity-70 line-clamp-2 sm:block">{s.description}</p>
                <span className="label hidden rounded-full border-2 border-current px-3 py-1 text-center sm:block">{s.track}</span>
                <span className="text-2xl transition-transform duration-500 group-hover:-rotate-45">→</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export function VaultModal({
  statement,
  onClose,
  copiedId,
  onCopyCitation,
}: {
  statement: ProblemStatement | null;
  onClose: () => void;
  copiedId: string | null;
  onCopyCitation: (s: ProblemStatement) => void;
}) {
  const box = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  useEffect(() => {
    if (!statement) return;
    lenis?.stop();
    if (box.current && !prefersReduced()) {
      gsap.fromTo(box.current, { y: 80, scale: 0.92, opacity: 0 }, { y: 0, scale: 1, opacity: 1, duration: 0.6, ease: "expo.out" });
    }
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    return () => {
      lenis?.start();
      window.removeEventListener("keydown", esc);
    };
  }, [statement, lenis, onClose]);

  if (!statement) return null;
  return (
    <div className="fixed inset-0 z-[180] grid place-items-center bg-[var(--ink)]/60 p-4 backdrop-blur-md" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="ps-title">
      <div ref={box} className="max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-[36px] bg-[var(--paper)] p-8 sm:p-12" onClick={(e) => e.stopPropagation()} data-lenis-prevent>
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="label rounded-full px-3 py-1 text-[var(--cream)]" style={{ background: TRACK_COLOR[statement.track] }}>
              {statement.track} · #{String(statement.number).padStart(2, "0")}
            </span>
            <span className="label text-[var(--ink)]/55">{statement.editionLabel}</span>
          </div>
          <button onClick={onClose} aria-label="Close" className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[var(--sun)] font-bold transition-transform hover:rotate-90">
            ✕
          </button>
        </div>
        <h2 id="ps-title" className="mt-6 font-display text-[clamp(26px,3.4vw,42px)] !normal-case tracking-tight">
          {statement.title}
        </h2>
        <p className="mt-5 whitespace-pre-line leading-relaxed text-[var(--ink)]/80">{statement.description}</p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <button onClick={() => onCopyCitation(statement)} className="btn-chunky bg-[var(--crimson)] text-[var(--cream)]">
            {copiedId === statement.id ? "Copied ✓" : "Copy citation"}
          </button>
          <button onClick={onClose} className="btn-ghost">
            Back to vault
          </button>
        </div>
      </div>
    </div>
  );
}
