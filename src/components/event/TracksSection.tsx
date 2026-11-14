"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface TracksSectionProps {
  onSelectTrack?: (track: "web2" | "web3") => void;
}

export default function TracksSection({ onSelectTrack }: TracksSectionProps) {
  const [isWeb2Open, setIsWeb2Open] = useState(false);
  const [isWeb3Open, setIsWeb3Open] = useState(false);

  const toggleTrack = (track: "web2" | "web3", e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("a, button")) {
      return;
    }
    if (track === "web2") {
      setIsWeb2Open((prev) => !prev);
    } else {
      setIsWeb3Open((prev) => !prev);
    }
    if (onSelectTrack) {
      onSelectTrack(track);
    }
  };

  const handleKeyDown = (track: "web2" | "web3", e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      if ((e.target as HTMLElement).closest("a, button")) return;
      e.preventDefault();
      if (track === "web2") {
        setIsWeb2Open((prev) => !prev);
      } else {
        setIsWeb3Open((prev) => !prev);
      }
    }
  };

  return (
    <section
      id="tracks"
      className="relative w-full py-20 border-b border-[rgba(255,255,255,0.08)] bg-[#160207] overflow-hidden"
    >
      <div className="relative w-full px-6 sm:px-10 lg:px-16 xl:px-20 2xl:px-24">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-12 sm:mb-16">
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-[#F6F0E8]">
            TWO TRACKS. ONE RELAY.
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#E0D4C3] max-w-4xl font-normal leading-relaxed">
            Choose your engineering discipline. Both tracks run concurrently over 36 hours. Release the blast shield to inspect challenge parameters.
          </p>
        </div>

        {/* Dual Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          
          {/* ================= WEB2 TRACK CARD ================= */}
          <div 
            onClick={(e) => toggleTrack("web2", e)}
            onKeyDown={(e) => handleKeyDown("web2", e)}
            tabIndex={0}
            role="button"
            aria-expanded={isWeb2Open}
            aria-label="Toggle Web2 track details"
            className="group relative overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.12)] bg-gradient-to-b from-[#2a0813] to-[#160207] shadow-[0_20px_50px_rgba(0,0,0,0.6)] transition-all duration-300 cursor-pointer text-white focus:outline-none focus:ring-2 focus:ring-[#991B3D]"
          >
            {/* FULLY COVERING SHUTTERS */}
            <div
              className={`absolute top-0 left-0 right-0 h-[52%] z-30 pointer-events-none transform transition-transform duration-500 ease-in-out ${
                isWeb2Open ? "-translate-y-[105%]" : "translate-y-0"
              } group-hover:-translate-y-[105%]`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/cover-upper.svg"
                alt="Track Blast Shield Upper"
                className="w-full h-full object-fill filter drop-shadow-[0px_4px_12px_rgba(0,0,0,0.9)]"
              />
            </div>

            <div
              className={`absolute bottom-0 left-0 right-0 h-[52%] z-30 pointer-events-none transform transition-transform duration-500 ease-in-out ${
                isWeb2Open ? "translate-y-[105%]" : "translate-y-0"
              } group-hover:translate-y-[105%]`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/cover-lower.svg"
                alt="Track Blast Shield Lower"
                className="w-full h-full object-fill filter drop-shadow-[0px_-4px_12px_rgba(0,0,0,0.9)]"
              />
            </div>

            {/* REVEALED CONTENT UNDERNEATH */}
            <div className="relative z-10 flex flex-col justify-between p-6 sm:p-8 min-h-[520px]">
              <div>
                {/* Top Badge & Number */}
                <div className="flex items-center justify-between pb-4 border-b border-[rgba(255,255,255,0.1)] mb-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[rgba(255,255,255,0.15)] bg-[#991B3D] text-white shadow-md">
                      <span className="font-mono font-black text-sm">01</span>
                    </div>
                    <div>
                      <h3 className="font-heading text-2xl sm:text-3xl font-black uppercase text-[#F6F0E8]">
                        WEB2 TRACK
                      </h3>
                    </div>
                  </div>
                  <span className="rounded-full border border-[#E8738D]/30 bg-[#991B3D]/30 px-3.5 py-1 text-xs font-mono font-bold uppercase text-[#F6F0E8]">
                    SCALABLE SYSTEMS
                  </span>
                </div>

                {/* Decorative vignette portal + SVG diagram */}
                <div className="relative w-full rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#100104]/80 p-5 mb-6 overflow-hidden">
                  <div className="absolute right-4 top-2 pointer-events-none opacity-25 w-28 h-28">
                    <Image
                      src="/decoratives/computers.webp"
                      alt="Web2 Systems"
                      fill
                      className="object-contain"
                    />
                  </div>

                  <svg viewBox="0 0 400 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-10 w-full h-auto">
                    <rect x="36" y="26" width="330" height="110" rx="8" fill="#160207" />
                    <rect x="30" y="20" width="330" height="110" rx="8" fill="#380412" stroke="#4a0d1b" strokeWidth="2" />
                    
                    <path d="M 30 28 Q 30 20 38 20 L 352 20 Q 360 20 360 28 L 360 44 L 30 44 Z" fill="#4d081a" stroke="#4a0d1b" strokeWidth="2" />
                    <circle cx="48" cy="32" r="4" fill="#991B3D" stroke="#160207" strokeWidth="1" />
                    <circle cx="62" cy="32" r="4" fill="#E0D4C3" stroke="#160207" strokeWidth="1" />
                    <circle cx="76" cy="32" r="4" fill="#F6F0E8" stroke="#160207" strokeWidth="1" />
                    
                    <rect x="110" y="25" width="180" height="14" rx="4" fill="#1c0309" stroke="#3d0917" strokeWidth="1" />
                    <text x="130" y="35" fill="#F6F0E8" fontSize="8" fontFamily="monospace" fontWeight="bold">https://relay.web2/api/v1</text>

                    <rect x="46" y="56" width="70" height="62" rx="4" fill="#24040d" stroke="#3d0917" strokeWidth="1" />
                    <rect x="54" y="66" width="54" height="6" rx="2" fill="#991B3D" />
                    <rect x="54" y="78" width="40" height="4" rx="1" fill="#E0D4C3" />
                    <rect x="54" y="86" width="46" height="4" rx="1" fill="#E0D4C3" />
                    <rect x="54" y="94" width="32" height="4" rx="1" fill="#E0D4C3" />

                    <rect x="126" y="56" width="140" height="62" rx="4" fill="#20030b" stroke="#3d0917" strokeWidth="1" />
                    <rect x="140" y="90" width="16" height="20" fill="#991B3D" stroke="#160207" strokeWidth="1" />
                    <rect x="162" y="76" width="16" height="34" fill="#B82A4F" stroke="#160207" strokeWidth="1" />
                    <rect x="184" y="66" width="16" height="44" fill="#E0D4C3" stroke="#160207" strokeWidth="1" />
                    <rect x="206" y="80" width="16" height="30" fill="#991B3D" stroke="#160207" strokeWidth="1" />
                    <rect x="228" y="70" width="16" height="40" fill="#F6F0E8" stroke="#160207" strokeWidth="1" />

                    <rect x="278" y="60" width="72" height="52" rx="4" fill="#160207" />
                    <rect x="275" y="56" width="72" height="52" rx="4" fill="#991B3D" stroke="#3d0917" strokeWidth="1.5" />
                    <text x="283" y="74" fill="#ffffff" fontSize="9" fontFamily="monospace" fontWeight="bold">STATUS: 200</text>
                    <text x="283" y="87" fill="#F6F0E8" fontSize="8" fontFamily="monospace">&gt; LATENCY: 8ms</text>
                    <text x="283" y="99" fill="#E0D4C3" fontSize="8" fontFamily="monospace">&gt; SERVERS: OK</text>
                  </svg>
                </div>

                <p className="text-base sm:text-lg font-normal text-[#E0D4C3] leading-relaxed mb-6">
                  Engineer resilient web applications, high-performance distributed backends, developer tooling, and intelligent AI-augmented digital platforms.
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {["Distributed Cloud", "Real-Time APIs", "AI Toolchains", "Edge Runtimes", "Modern UX"].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[rgba(255,255,255,0.1)] bg-[#1f040b] px-3 py-1 text-xs font-mono font-medium text-[#E0D4C3]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[rgba(255,255,255,0.1)] flex items-center justify-between">
                <span className="font-mono text-xs text-[#E8738D]">Track 01 · Architecture</span>
                <Link
                  href="/problem-statements"
                  className="btn-pill-primary inline-flex items-center gap-2"
                >
                  <span>Explore Web2 Archive</span>
                  <span>→</span>
                </Link>
              </div>
            </div>

          </div>

          {/* ================= WEB3 TRACK CARD ================= */}
          <div 
            onClick={(e) => toggleTrack("web3", e)}
            onKeyDown={(e) => handleKeyDown("web3", e)}
            tabIndex={0}
            role="button"
            aria-expanded={isWeb3Open}
            aria-label="Toggle Web3 track details"
            className="group relative overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.12)] bg-gradient-to-b from-[#18233a] to-[#101726] shadow-[0_20px_50px_rgba(0,0,0,0.6)] transition-all duration-300 cursor-pointer text-white focus:outline-none focus:ring-2 focus:ring-[#4B5D86]"
          >
            {/* FULLY COVERING SHUTTERS */}
            <div
              className={`absolute top-0 left-0 right-0 h-[52%] z-30 pointer-events-none transform transition-transform duration-500 ease-in-out ${
                isWeb3Open ? "-translate-y-[105%]" : "translate-y-0"
              } group-hover:-translate-y-[105%]`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/cover-upper.svg"
                alt="Track Blast Shield Upper"
                className="w-full h-full object-fill filter drop-shadow-[0px_4px_12px_rgba(0,0,0,0.9)]"
              />
            </div>

            <div
              className={`absolute bottom-0 left-0 right-0 h-[52%] z-30 pointer-events-none transform transition-transform duration-500 ease-in-out ${
                isWeb3Open ? "translate-y-[105%]" : "translate-y-0"
              } group-hover:translate-y-[105%]`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/cover-lower.svg"
                alt="Track Blast Shield Lower"
                className="w-full h-full object-fill filter drop-shadow-[0px_-4px_12px_rgba(0,0,0,0.9)]"
              />
            </div>

            {/* REVEALED CONTENT UNDERNEATH */}
            <div className="relative z-10 flex flex-col justify-between p-6 sm:p-8 min-h-[520px]">
              <div>
                {/* Top Badge & Number */}
                <div className="flex items-center justify-between pb-4 border-b border-[rgba(255,255,255,0.1)] mb-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[rgba(255,255,255,0.15)] bg-[#4B5D86] text-white shadow-md">
                      <span className="font-mono font-black text-sm">02</span>
                    </div>
                    <div>
                      <h3 className="font-heading text-2xl sm:text-3xl font-black uppercase text-[#F6F0E8]">
                        WEB3 TRACK
                      </h3>
                    </div>
                  </div>
                  <span className="rounded-full border border-[#8E9DBE]/30 bg-[#4B5D86]/30 px-3.5 py-1 text-xs font-mono font-bold uppercase text-[#F6F0E8]">
                    ON-CHAIN PROTOCOLS
                  </span>
                </div>

                {/* Decorative vignette portal + SVG diagram */}
                <div className="relative w-full rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#0c121d]/80 p-5 mb-6 overflow-hidden">
                  <div className="absolute right-4 top-2 pointer-events-none opacity-25 w-28 h-28">
                    <Image
                      src="/decoratives/cube.webp"
                      alt="Web3 Cube"
                      fill
                      className="object-contain"
                    />
                  </div>

                  <svg viewBox="0 0 400 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-10 w-full h-auto">
                    <rect x="20" y="10" width="360" height="135" rx="8" fill="#131b2a" stroke="#253550" strokeWidth="1.5" />
                    
                    <line x1="85" y1="80" x2="160" y2="80" stroke="#657AA8" strokeWidth="2" strokeDasharray="4 3" />
                    <line x1="210" y1="80" x2="280" y2="80" stroke="#657AA8" strokeWidth="2" strokeDasharray="4 3" />
                    <line x1="185" y1="45" x2="185" y2="115" stroke="#4B5D86" strokeWidth="1.5" strokeDasharray="2 2" />

                    <g id="chain-node-1">
                      <rect x="46" y="52" width="46" height="46" rx="4" fill="#0d1420" />
                      <rect x="40" y="46" width="46" height="46" rx="4" fill="#3a4b6f" stroke="#1f2c42" strokeWidth="2" />
                      <text x="50" y="73" fill="#ffffff" fontSize="10" fontFamily="monospace" fontWeight="black">B#01</text>
                    </g>

                    <g id="chain-node-2">
                      <polygon points="175,60 215,60 235,100 195,100" fill="#0d1420" />
                      <polygon points="185,35 225,50 185,65 145,50" fill="#F6F0E8" stroke="#1f2c42" strokeWidth="2" />
                      <polygon points="145,50 185,65 185,110 145,95" fill="#4B5D86" stroke="#1f2c42" strokeWidth="2" />
                      <polygon points="185,65 225,50 225,95 185,110" fill="#2b3852" stroke="#1f2c42" strokeWidth="2" />
                      <text x="172" y="88" fill="#ffffff" fontSize="9" fontFamily="monospace" fontWeight="bold">0xETH</text>
                    </g>

                    <g id="chain-node-3">
                      <rect x="286" y="52" width="46" height="46" rx="4" fill="#0d1420" />
                      <rect x="280" y="46" width="46" height="46" rx="4" fill="#3a4b6f" stroke="#1f2c42" strokeWidth="2" />
                      <text x="290" y="73" fill="#ffffff" fontSize="10" fontFamily="monospace" fontWeight="black">B#02</text>
                    </g>

                    <rect x="136" y="118" width="130" height="20" rx="4" fill="#0d1420" />
                    <rect x="132" y="115" width="130" height="20" rx="4" fill="#2b3852" stroke="#1f2c42" strokeWidth="1" />
                    <circle cx="142" cy="125" r="3" fill="#F6F0E8" />
                    <text x="150" y="128" fill="#F6F0E8" fontSize="8" fontFamily="monospace" fontWeight="bold">STATE: CONSENSUS_OK</text>
                  </svg>
                </div>

                <p className="text-base sm:text-lg font-normal text-[#E0D4C3] leading-relaxed mb-6">
                  Develop decentralized applications, zero-knowledge smart contracts, trustless financial primitives, and interoperable on-chain infrastructure.
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {["Smart Contracts", "Account Abstraction", "DeFi Protocols", "ZK-Proofs", "DAO Governance"].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[rgba(255,255,255,0.1)] bg-[#162033] px-3 py-1 text-xs font-mono font-medium text-[#E0D4C3]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[rgba(255,255,255,0.1)] flex items-center justify-between">
                <span className="font-mono text-xs text-[#8E9DBE]">Track 02 · On-Chain</span>
                <Link
                  href="/problem-statements"
                  className="rounded-full bg-[#4B5D86] text-white hover:bg-[#5C70A0] px-6 py-2.5 font-bold uppercase text-xs tracking-wider transition-all shadow-[0_4px_16px_rgba(75,93,134,0.4)] inline-flex items-center gap-2"
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
