"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PAST_EDITIONS, EditionWinner } from "@/data/pastEditionsData";

export default function PastEditionsShowcase() {
  const [selectedWinner, setSelectedWinner] = useState<EditionWinner | null>(null);

  return (
    <section className="relative w-full py-20 border-b border-[rgba(255,255,255,0.08)] bg-[#160207] overflow-hidden">
      <div className="relative w-full px-6 sm:px-10 lg:px-16 xl:px-20 2xl:px-24 space-y-16">
        {PAST_EDITIONS.map((edition) => (
          <div
            key={edition.edition}
            className="editorial-card rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.7)]"
          >
            {/* Top Banner Bar */}
            <div className="bg-[#24040d]/90 px-6 sm:px-8 lg:px-10 py-6 border-b border-[rgba(255,255,255,0.08)] flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="rounded-full border border-[rgba(255,255,255,0.15)] bg-white/5 px-3 py-0.5 text-xs font-mono font-bold uppercase tracking-wider text-[#E8738D]">
                    {edition.tag}
                  </span>
                </div>
                <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-[#F6F0E8]">
                  {edition.edition} ({edition.year})
                </h2>
                <p className="text-sm sm:text-base text-[#E0D4C3] font-mono mt-1">
                  Theme: <span className="text-[#F6F0E8]">{edition.theme}</span>
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <Link
                  href="/problem-statements"
                  className="btn-pill-primary inline-flex items-center gap-2 py-2 px-5 text-xs font-bold uppercase tracking-wider"
                >
                  <span>View Problem Statements</span>
                  <span>→</span>
                </Link>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 sm:p-8 lg:p-10">
              <div className="max-w-4xl">
                <h3 className="font-heading text-base font-bold text-[#E8738D] mb-3 uppercase tracking-wider">
                  Executive Summary
                </h3>
                <p className="text-base sm:text-lg text-[#E0D4C3] leading-relaxed font-normal mb-8">
                  {edition.description}
                </p>

                {/* Highlights Bullet List */}
                <div>
                  <h4 className="font-mono text-xs font-bold text-[#8E9DBE] uppercase tracking-wider mb-4">
                    KEY EDITION MILESTONES &amp; HIGHLIGHTS:
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                    {edition.highlights.map((item, idx) => (
                      <li
                        key={idx}
                        className="rounded-xl border border-[rgba(255,255,255,0.06)] bg-white/5 p-4 flex items-start gap-3 text-sm text-[#E0D4C3]"
                      >
                        <span className="text-[#E8738D] font-bold text-base shrink-0 leading-none">
                          ›
                        </span>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Winners Podium Showcase (For Edition with Winners Photos) */}
              {edition.winners && edition.winners.length > 0 && (
                <div className="mt-12 pt-10 border-t border-[rgba(255,255,255,0.08)]">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8">
                    <div>
                      <div className="inline-flex items-center gap-2 rounded-full border border-[#B82A4F]/40 bg-[#991B3D]/15 px-3 py-0.5 mb-2">
                        <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#E8738D]">
                          Official Podium
                        </span>
                      </div>
                      <h3 className="font-heading text-xl sm:text-2xl font-black uppercase text-[#F6F0E8] tracking-tight">
                        {edition.edition} Winning Teams
                      </h3>
                      <p className="text-xs sm:text-sm text-[#E0D4C3] mt-1 font-normal">
                        Celebrating the champions and runners-up across our Web2 and Web3 tracks. Click any photo to expand.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {edition.winners.map((winner) => (
                      <div
                        key={winner.teamName + winner.track + winner.place}
                        onClick={() => setSelectedWinner(winner)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            setSelectedWinner(winner);
                          }
                        }}
                        aria-label={`View photo of ${winner.teamName}`}
                        className="editorial-card rounded-2xl overflow-hidden group cursor-pointer hover:border-[#B82A4F]/60 transition-all duration-300 flex flex-col justify-between"
                      >
                        {/* Winner Photo with Aspect-Square Ratio */}
                        <div className="relative aspect-square w-full overflow-hidden bg-[#0d0104]">
                          <Image
                            src={winner.image}
                            alt={`${winner.teamName} - ${winner.place}`}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          />
                          {/* Dark overlay with hover reveal */}
                          <div className="absolute inset-0 bg-gradient-to-t from-[#160207]/80 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />

                          {/* Hover badge */}
                          <div className="absolute top-3 right-3 rounded-full bg-black/70 backdrop-blur-md px-2.5 py-1 text-[10px] font-mono font-bold text-white/90 border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                            Expand ↗
                          </div>
                        </div>

                        {/* Winner Info Box */}
                        <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 bg-[#1a0208]/60">
                          <div>
                            <div className="flex items-center justify-between gap-2 mb-2">
                              <span className="font-mono text-[10px] font-bold text-[#E8738D] uppercase tracking-wider">
                                {winner.track} Track
                              </span>
                              <span
                                className={`rounded-full border px-2 py-0.5 text-[9px] font-mono font-bold uppercase tracking-wider ${winner.badgeColor}`}
                              >
                                {winner.place}
                              </span>
                            </div>
                            <h4 className="font-heading text-lg font-black tracking-tight text-[#F6F0E8] group-hover:text-white transition-colors">
                              {winner.teamName}
                            </h4>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal for Winner Image Preview */}
      {selectedWinner && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn"
          onClick={() => setSelectedWinner(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="editorial-card relative max-w-2xl w-full rounded-3xl overflow-hidden border border-[#B82A4F]/60 p-4 sm:p-6 shadow-2xl bg-[#160207]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[rgba(255,255,255,0.08)]">
              <div>
                <span className="font-mono text-xs font-bold text-[#E8738D] uppercase tracking-wider">
                  {selectedWinner.track} Track · {selectedWinner.place}
                </span>
                <h3 className="font-heading text-xl sm:text-2xl font-black text-[#F6F0E8]">
                  {selectedWinner.teamName}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedWinner(null)}
                aria-label="Close modal"
                className="h-9 w-9 rounded-full bg-white/10 hover:bg-white/20 text-[#F6F0E8] flex items-center justify-center transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Expanded Photo */}
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-black/60 shadow-inner">
              <Image
                src={selectedWinner.image}
                alt={`${selectedWinner.teamName} - ${selectedWinner.place}`}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 672px"
                priority
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
