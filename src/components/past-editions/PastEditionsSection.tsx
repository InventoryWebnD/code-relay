"use client";

import Link from "next/link";

interface EditionCard {
  edition: string;
  year: string;
  tag: string;
  title: string;
  description: string;
  metadata: string;
  accentColor: string;
}

export default function PastEditionsSection() {
  const editions: EditionCard[] = [
    {
      edition: "CR 4.0",
      year: "2024",
      tag: "FLAGSHIP WEB & AI",
      title: "Code Relay 4.0: Autonomous Infrastructure",
      description: "Over 1,200 nationwide participants competed in building decentralized agent workflows, high-throughput streaming systems, and distributed real-time dev tools.",
      metadata: "1,200+ HACKERS · ₹2,00,000 PRIZE · 48 FINAL TEAMS",
      accentColor: "#2563eb",
    },
    {
      edition: "CR 3.0",
      year: "2023",
      tag: "THE DECENTRALIZED FORK",
      title: "Code Relay 3.0: Protocols & Primitives",
      description: "Introduced the dedicated Web3 track. 42 smart-contract and decentralized governance projects were deployed live across multiple testnets.",
      metadata: "850+ HACKERS · ₹1,50,000 PRIZE · 42 SUBMISSIONS",
      accentColor: "#7c3aed",
    },
    {
      edition: "CR 2.0",
      year: "2022",
      tag: "THE RELAY FOUNDATION",
      title: "Code Relay 2.0: Collaborative Sprint",
      description: "Established our signature continuous 24-hour relay sprint where teams passed architectural batons across frontend, backend, and interface layers.",
      metadata: "500+ HACKERS · ₹1,00,000 PRIZE · 30 FINAL TEAMS",
      accentColor: "#d4ff00",
    },
  ];

  return (
    <section id="past-editions" className="relative w-full py-20 border-b-2 border-black bg-[#050912]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 sm:mb-16 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-md border-2 border-black bg-[#0d1424] px-3 py-1 shadow-hard-xs mb-3">
              <span className="font-mono text-xs font-bold text-[#60a5fa] uppercase">
                {"// SECTION 03: ARCHIVE & LEGACY"}
              </span>
            </div>
            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white">
              BUILT BY THE COMMUNITY.
            </h2>
          </div>
          <p className="text-sm sm:text-base text-slate-400 max-w-md">
            Four previous editions. Thousands of lines of code pushed. A growing alumni network of founders, protocol researchers, and core engineers.
          </p>
        </div>

        {/* 3 Horizontal Dimensional Cards with Header & Footer SVGs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {editions.map((item) => (
            <div
              key={item.edition}
              className="group card-25d relative flex flex-col justify-between rounded-xl border-2 border-black bg-[#0d1424] shadow-hard-lg hover:bg-[#121c33] transition-all overflow-hidden"
            >
              {/* DECORATIVE HEADER SVG ON TOP OF CARD (Section 3 Requirement) */}
              <div className="relative w-full h-8 sm:h-9 bg-[#070b14] border-b border-black">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/header.svg"
                  alt="Card Header Frame"
                  className="w-full h-full object-fill transition-opacity duration-300 group-hover:opacity-0"
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/header-hover.svg"
                  alt="Card Header Frame Hover"
                  className="absolute inset-0 w-full h-full object-fill opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
              </div>

              {/* CARD INTERIOR CONTENT */}
              <div className="px-7 py-7 sm:px-8 sm:py-8 flex flex-col justify-between flex-1">
                <div>
                  {/* Visual Placeholder Box with 2.5D Badge */}
                  <div className="relative w-full h-36 rounded-lg border-2 border-black bg-[#080d1a] mb-5 p-3.5 flex flex-col justify-between overflow-hidden shadow-hard-sm">
                    {/* Subtle Grid Pattern */}
                    <div 
                      className="absolute inset-0 opacity-20"
                      style={{
                        backgroundImage: 'radial-gradient(#38bdf8 1px, transparent 1px)',
                        backgroundSize: '16px 16px'
                      }}
                    />

                    {/* Top Bar of the visual placeholder */}
                    <div className="relative z-10 flex items-center justify-between">
                      <span className="font-mono text-[10px] font-bold text-slate-400">
                        ARCHIVE_ID // {item.year}
                      </span>
                      <span 
                        className="rounded-md border border-black px-2 py-0.5 text-[9px] font-black uppercase shadow-hard-xs"
                        style={{
                          backgroundColor: item.accentColor,
                          color: item.accentColor === "#d4ff00" ? "#000000" : "#ffffff"
                        }}
                      >
                        {item.tag}
                      </span>
                    </div>

                    {/* Center Graphic */}
                    <div className="relative z-10 flex items-center justify-center my-auto">
                      <div className="flex items-center gap-2">
                        <div className="h-10 w-10 rounded-lg border-2 border-black bg-[#162238] flex items-center justify-center shadow-hard-xs">
                          <span className="font-heading font-black text-lg text-white">
                            {item.edition.split(" ")[1]}
                          </span>
                        </div>
                        <div className="flex flex-col text-left">
                          <span className="font-heading font-black text-base text-white tracking-wide">
                            {item.edition}
                          </span>
                          <span className="font-mono text-[9px] text-slate-400">
                            EDITION {item.year}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Technical Coordinates */}
                    <div className="relative z-10 flex justify-between items-center text-[9px] font-mono text-slate-500">
                      <span>SYS_RECORD: PASS</span>
                      <span>VERIFIED ✔</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-heading text-xl font-bold text-white mb-2 leading-snug group-hover:text-[#60a5fa] transition-colors">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-slate-300 leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                {/* Minimal Metadata Line */}
                <div className="pt-3 border-t-2 border-black mb-2">
                  <div className="rounded-md border border-black bg-[#080d1a] px-3 py-2 shadow-hard-xs">
                    <span className="block font-mono text-[11px] font-bold text-slate-300">
                      {item.metadata}
                    </span>
                  </div>
                </div>
              </div>

              {/* DECORATIVE FOOTER SVG ON EACH CARD (Section 3 Requirement) */}
              <div className="relative w-full h-6 sm:h-7 bg-[#070b14] border-t border-black">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/footer.svg"
                  alt="Card Footer Frame"
                  className="w-full h-full object-fill transition-opacity duration-300 group-hover:opacity-0"
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/footer-hover.svg"
                  alt="Card Footer Frame Hover"
                  className="absolute inset-0 w-full h-full object-fill opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
              </div>

            </div>
          ))}
        </div>

        {/* Explore Past Editions link */}
        <div className="flex justify-center">
          <Link
            href="#past-editions"
            className="btn-pressable inline-flex items-center gap-3 rounded-xl border-2 border-black bg-[#131d33] px-8 py-3.5 text-sm sm:text-base font-heading font-bold text-white shadow-hard hover:bg-[#1a2744]"
          >
            <span>Explore Past Editions & Winning Projects</span>
            <span className="text-[#d4ff00]">→</span>
          </Link>
        </div>

      </div>
    </section>
  );
}
