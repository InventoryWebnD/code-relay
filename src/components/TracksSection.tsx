"use client";

import Link from "next/link";

interface TracksSectionProps {
  onSelectTrack?: (track: "web2" | "web3") => void;
}

export default function TracksSection({ onSelectTrack }: TracksSectionProps) {
  return (
    <section id="tracks" className="relative w-full py-16 border-b-2 border-[#160207] bg-[#F6F0E8]">
      <div className="w-full px-6 sm:px-10 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 rounded-md border-2 border-[#160207] bg-[#620821] px-3 py-1 shadow-hard-xs mb-3">
            <span className="font-mono text-xs font-bold text-[#F6F0E8] uppercase tracking-wider">
              Dual Track Architecture
            </span>
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#620821]">
            TWO TRACKS. ONE RELAY.
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#3A1822] max-w-4xl font-medium">
            Choose your engineering discipline. Both tracks run concurrently over 36 hours. Hover over each track card to release the blast shield and inspect challenge parameters.
          </p>
        </div>

        {/* Dual Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          
          {/* ================= WEB2 TRACK CARD ================= */}
          <div 
            onClick={() => onSelectTrack && onSelectTrack("web2")}
            className="group relative overflow-hidden rounded-2xl border-2 border-[#160207] bg-[#380412] shadow-hard-xl transition-all duration-300 cursor-pointer text-white"
          >
            
            {/* FULLY COVERING SHUTTERS (cover-upper & cover-lower) */}
            <div className="absolute top-0 left-0 right-0 h-[52%] z-30 pointer-events-none transform transition-transform duration-500 ease-in-out group-hover:-translate-y-[105%]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/cover-upper.svg"
                alt="Track Blast Shield Upper"
                className="w-full h-full object-fill filter drop-shadow-[0px_4px_8px_rgba(0,0,0,0.8)]"
              />
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-[52%] z-30 pointer-events-none transform transition-transform duration-500 ease-in-out group-hover:translate-y-[105%]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/cover-lower.svg"
                alt="Track Blast Shield Lower"
                className="w-full h-full object-fill filter drop-shadow-[0px_-4px_8px_rgba(0,0,0,0.8)]"
              />
            </div>

            {/* Center Lock Badge (Hidden when hovered) */}
            <div className="absolute inset-0 z-40 flex flex-col items-center justify-center pointer-events-none transition-all duration-300 group-hover:opacity-0 group-hover:scale-95">
              <div className="flex items-center gap-2.5 rounded-xl border-2 border-[#160207] bg-[#22020A] px-5 py-3 shadow-hard-lg">
                <span className="font-mono text-xs sm:text-sm font-black uppercase tracking-wider text-white">
                  Hover to reveal Web2 specifications
                </span>
                <span className="text-[#F6F0E8] font-mono text-sm">↓↑</span>
              </div>
            </div>

            {/* REVEALED CONTENT UNDERNEATH */}
            <div className="relative z-10 flex flex-col justify-between p-6 sm:p-8 min-h-[500px]">
              <div>
                {/* Top Badge & Number */}
                <div className="flex items-center justify-between pb-4 border-b-2 border-[#160207] mb-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-[#160207] bg-[#991B3D] text-white shadow-hard-xs">
                      <span className="font-mono font-black text-sm">01</span>
                    </div>
                    <div>
                      <span className="block font-mono text-[11px] font-bold text-[#E0D4C3] uppercase tracking-wider">
                        PRIMARY TRACK
                      </span>
                      <h3 className="font-heading text-2xl sm:text-3xl font-black uppercase text-white">
                        WEB2 TRACK
                      </h3>
                    </div>
                  </div>
                  <span className="rounded-md border-2 border-[#160207] bg-[#991B3D] px-3 py-1 text-xs font-black uppercase text-white shadow-hard-xs">
                    SCALABLE SYSTEMS
                  </span>
                </div>

                {/* 2.5D Geometric Web/Interface Illustration */}
                <div className="relative w-full rounded-xl border-2 border-[#160207] bg-[#22020A] p-5 mb-6 shadow-hard-md overflow-hidden">
                  <svg viewBox="0 0 400 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
                    <rect x="36" y="26" width="330" height="110" rx="8" fill="#160207" />
                    <rect x="30" y="20" width="330" height="110" rx="8" fill="#4D0719" stroke="#160207" strokeWidth="2.5" />
                    
                    <path d="M 30 28 Q 30 20 38 20 L 352 20 Q 360 20 360 28 L 360 44 L 30 44 Z" fill="#620821" stroke="#160207" strokeWidth="2.5" />
                    <circle cx="48" cy="32" r="4" fill="#991B3D" stroke="#160207" strokeWidth="1" />
                    <circle cx="62" cy="32" r="4" fill="#E0D4C3" stroke="#160207" strokeWidth="1" />
                    <circle cx="76" cy="32" r="4" fill="#F6F0E8" stroke="#160207" strokeWidth="1" />
                    
                    <rect x="110" y="25" width="180" height="14" rx="4" fill="#22020A" stroke="#160207" strokeWidth="1.5" />
                    <text x="130" y="35" fill="#F6F0E8" fontSize="8" fontFamily="monospace" fontWeight="bold">https://relay.web2/api/v1</text>

                    <rect x="46" y="56" width="70" height="62" rx="4" fill="#380412" stroke="#160207" strokeWidth="1.5" />
                    <rect x="54" y="66" width="54" height="6" rx="2" fill="#991B3D" />
                    <rect x="54" y="78" width="40" height="4" rx="1" fill="#E0D4C3" />
                    <rect x="54" y="86" width="46" height="4" rx="1" fill="#E0D4C3" />
                    <rect x="54" y="94" width="32" height="4" rx="1" fill="#E0D4C3" />

                    <rect x="126" y="56" width="140" height="62" rx="4" fill="#2A040E" stroke="#160207" strokeWidth="1.5" />
                    <rect x="140" y="90" width="16" height="20" fill="#991B3D" stroke="#160207" strokeWidth="1" />
                    <rect x="162" y="76" width="16" height="34" fill="#B82A4F" stroke="#160207" strokeWidth="1" />
                    <rect x="184" y="66" width="16" height="44" fill="#E0D4C3" stroke="#160207" strokeWidth="1" />
                    <rect x="206" y="80" width="16" height="30" fill="#991B3D" stroke="#160207" strokeWidth="1" />
                    <rect x="228" y="70" width="16" height="40" fill="#F6F0E8" stroke="#160207" strokeWidth="1" />

                    <rect x="278" y="60" width="72" height="52" rx="4" fill="#160207" />
                    <rect x="275" y="56" width="72" height="52" rx="4" fill="#991B3D" stroke="#160207" strokeWidth="2" />
                    <text x="283" y="74" fill="#ffffff" fontSize="9" fontFamily="monospace" fontWeight="bold">STATUS: 200</text>
                    <text x="283" y="87" fill="#F6F0E8" fontSize="8" fontFamily="monospace">&gt; LATENCY: 8ms</text>
                    <text x="283" y="99" fill="#E0D4C3" fontSize="8" fontFamily="monospace">&gt; SERVERS: OK</text>
                  </svg>
                </div>

                <p className="text-base sm:text-lg font-medium text-[#F6F0E8] leading-relaxed mb-6">
                  Engineer resilient web applications, high-performance distributed backends, developer tooling, and intelligent AI-augmented digital platforms.
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {["Distributed Cloud", "Real-Time APIs", "AI Toolchains", "Edge Runtimes", "Modern UX"].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-[#160207] bg-[#620821] px-2.5 py-1 text-xs font-mono font-semibold text-[#F6F0E8] shadow-hard-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t-2 border-[#160207] flex items-center justify-between">
                <span className="font-mono text-xs text-[#E0D4C3]">Track 01 · Architecture</span>
                <Link
                  href="/problem-statements"
                  className="btn-pressable inline-flex items-center gap-2 rounded-lg border-2 border-[#160207] bg-[#991B3D] hover:bg-[#7A122E] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-hard-xs"
                >
                  <span>Explore Web2 Archive</span>
                  <span>→</span>
                </Link>
              </div>
            </div>

          </div>

          {/* ================= WEB3 TRACK CARD ================= */}
          <div 
            onClick={() => onSelectTrack && onSelectTrack("web3")}
            className="group relative overflow-hidden rounded-2xl border-2 border-[#160207] bg-[#2A344A] shadow-hard-xl transition-all duration-300 cursor-pointer text-white"
          >
            
            {/* FULLY COVERING SHUTTERS */}
            <div className="absolute top-0 left-0 right-0 h-[52%] z-30 pointer-events-none transform transition-transform duration-500 ease-in-out group-hover:-translate-y-[105%]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/cover-upper.svg"
                alt="Track Blast Shield Upper"
                className="w-full h-full object-fill filter drop-shadow-[0px_4px_8px_rgba(0,0,0,0.8)]"
              />
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-[52%] z-30 pointer-events-none transform transition-transform duration-500 ease-in-out group-hover:translate-y-[105%]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/cover-lower.svg"
                alt="Track Blast Shield Lower"
                className="w-full h-full object-fill filter drop-shadow-[0px_-4px_8px_rgba(0,0,0,0.8)]"
              />
            </div>

            {/* Center Lock Badge */}
            <div className="absolute inset-0 z-40 flex flex-col items-center justify-center pointer-events-none transition-all duration-300 group-hover:opacity-0 group-hover:scale-95">
              <div className="flex items-center gap-2.5 rounded-xl border-2 border-[#160207] bg-[#1E2638] px-5 py-3 shadow-hard-lg">
                <span className="font-mono text-xs sm:text-sm font-black uppercase tracking-wider text-white">
                  Hover to reveal Web3 specifications
                </span>
                <span className="text-[#F6F0E8] font-mono text-sm">↓↑</span>
              </div>
            </div>

            {/* REVEALED CONTENT UNDERNEATH */}
            <div className="relative z-10 flex flex-col justify-between p-6 sm:p-8 min-h-[500px]">
              <div>
                {/* Top Badge & Number */}
                <div className="flex items-center justify-between pb-4 border-b-2 border-[#160207] mb-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-[#160207] bg-[#4B5D86] text-white shadow-hard-xs">
                      <span className="font-mono font-black text-sm">02</span>
                    </div>
                    <div>
                      <span className="block font-mono text-[11px] font-bold text-[#D8CCD0] uppercase tracking-wider">
                        DECENTRALIZED TRACK
                      </span>
                      <h3 className="font-heading text-2xl sm:text-3xl font-black uppercase text-white">
                        WEB3 TRACK
                      </h3>
                    </div>
                  </div>
                  <span className="rounded-md border-2 border-[#160207] bg-[#4B5D86] px-3 py-1 text-xs font-black uppercase text-white shadow-hard-xs">
                    ON-CHAIN PROTOCOLS
                  </span>
                </div>

                {/* 2.5D Geometric Blockchain Illustration */}
                <div className="relative w-full rounded-xl border-2 border-[#160207] bg-[#1B2332] p-5 mb-6 shadow-hard-md overflow-hidden">
                  <svg viewBox="0 0 400 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
                    <rect x="20" y="10" width="360" height="135" rx="8" fill="#2A344A" stroke="#160207" strokeWidth="2" />
                    
                    <line x1="85" y1="80" x2="160" y2="80" stroke="#657AA8" strokeWidth="3" strokeDasharray="4 3" />
                    <line x1="210" y1="80" x2="280" y2="80" stroke="#657AA8" strokeWidth="3" strokeDasharray="4 3" />
                    <line x1="185" y1="45" x2="185" y2="115" stroke="#4B5D86" strokeWidth="2" strokeDasharray="2 2" />

                    <g id="chain-node-1">
                      <rect x="46" y="52" width="46" height="46" rx="4" fill="#160207" />
                      <rect x="40" y="46" width="46" height="46" rx="4" fill="#4B5D86" stroke="#160207" strokeWidth="2.5" />
                      <text x="50" y="73" fill="#ffffff" fontSize="10" fontFamily="monospace" fontWeight="black">B#01</text>
                    </g>

                    <g id="chain-node-2">
                      <polygon points="175,60 215,60 235,100 195,100" fill="#160207" />
                      <polygon points="185,35 225,50 185,65 145,50" fill="#F6F0E8" stroke="#160207" strokeWidth="2.5" />
                      <polygon points="145,50 185,65 185,110 145,95" fill="#4B5D86" stroke="#160207" strokeWidth="2.5" />
                      <polygon points="185,65 225,50 225,95 185,110" fill="#364464" stroke="#160207" strokeWidth="2.5" />
                      <text x="172" y="88" fill="#ffffff" fontSize="9" fontFamily="monospace" fontWeight="bold">0xETH</text>
                    </g>

                    <g id="chain-node-3">
                      <rect x="286" y="52" width="46" height="46" rx="4" fill="#160207" />
                      <rect x="280" y="46" width="46" height="46" rx="4" fill="#4B5D86" stroke="#160207" strokeWidth="2.5" />
                      <text x="290" y="73" fill="#ffffff" fontSize="10" fontFamily="monospace" fontWeight="black">B#02</text>
                    </g>

                    <rect x="136" y="118" width="130" height="20" rx="4" fill="#160207" />
                    <rect x="132" y="115" width="130" height="20" rx="4" fill="#364464" stroke="#160207" strokeWidth="1.5" />
                    <circle cx="142" cy="125" r="3" fill="#F6F0E8" />
                    <text x="150" y="128" fill="#F6F0E8" fontSize="8" fontFamily="monospace" fontWeight="bold">STATE: CONSENSUS_OK</text>
                  </svg>
                </div>

                <p className="text-base sm:text-lg font-medium text-[#F6F0E8] leading-relaxed mb-6">
                  Develop decentralized applications, zero-knowledge smart contracts, trustless financial primitives, and interoperable on-chain infrastructure.
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {["Smart Contracts", "Account Abstraction", "DeFi Protocols", "ZK-Proofs", "DAO Governance"].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-[#160207] bg-[#364464] px-2.5 py-1 text-xs font-mono font-semibold text-[#F6F0E8] shadow-hard-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t-2 border-[#160207] flex items-center justify-between">
                <span className="font-mono text-xs text-[#D8CCD0]">Track 02 · On-Chain</span>
                <Link
                  href="/problem-statements"
                  className="btn-pressable inline-flex items-center gap-2 rounded-lg border-2 border-[#160207] bg-[#4B5D86] hover:bg-[#364464] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-hard-xs"
                >
                  <span>Explore Web3 Archive</span>
                  <span>→</span>
                </Link>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
