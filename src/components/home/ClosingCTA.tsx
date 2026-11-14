"use client";

import Image from "next/image";
import Link from "next/link";
import { useRegisterModal } from "@/context/RegisterModalContext";
import { useParallaxSlide } from "@/hooks/useGsapScrollTrigger";

export default function ClosingCTA() {
  const { openRegisterModal } = useRegisterModal();

  // Parallax slide hooks for smooth scroll depth
  const trophyParallaxRef = useParallaxSlide<HTMLDivElement>(-0.2, "vertical");
  const backgroundParallaxRef = useParallaxSlide<HTMLDivElement>(0.15, "vertical");

  return (
    <section
      data-no-scroll-animate="true"
      className="relative w-full py-20 sm:py-28 overflow-hidden bg-[#160207] border-b border-[#620821]/40"
    >
      {/* Ambient background glow */}
      <div
        ref={backgroundParallaxRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[350px] bg-gradient-to-r from-[#991B3D]/20 via-[#E44714]/15 to-[#4B5D86]/20 blur-[130px] rounded-full pointer-events-none"
      />

      <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-20 2xl:px-24 relative z-10">

        {/* ================= SECTION HEADER (Matching Reference Section 3) ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end mb-12 sm:mb-16">

          {/* Left Column: Title */}
          <div className="lg:col-span-7 flex items-start">
            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black uppercase text-white tracking-tight leading-[1.05]">
              Take the Relay Baton<br />
              at Code Relay 5.0
            </h2>
          </div>

          {/* Right Column: Description */}
          <div className="lg:col-span-5 flex flex-col justify-end">
            <p className="text-sm sm:text-base text-[#D6C6CC] leading-relaxed max-w-lg">
              Join collegiate teams nationwide for 36 hours of engineering, architecture, and deployment. Secure your spot on the priority roster today.
            </p>
          </div>

        </div>

        {/* ================= FEATURED EDITORIAL CARD WITH 3D VIGNETTE ================= */}
        <div className="editorial-card relative rounded-3xl p-8 sm:p-12 lg:p-14 overflow-hidden border border-[#620821]/50">

          {/* Decorative Corner Accents */}
          <div className="absolute top-4 left-4 font-mono text-xs text-[#657AA8] tracking-widest uppercase">
            [ARENA_STAGE_05]
          </div>
          <div className="absolute top-4 right-4 font-mono text-xs text-[#657AA8] tracking-widest uppercase">
            [T=36_HOURS]
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

            {/* Left Content (7 cols) */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">

              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 mb-4 text-xs font-mono text-[#E0D4C3]">
                <span>NATIONAL COLLEGIATE ARENA</span>
                <span>•</span>
                <span>EDITION 5.0</span>
              </div>

              <h3 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-white tracking-tight leading-tight mb-4">
                Sprint. Build. Ship.<br />
                Claim the Champion Relay.
              </h3>

              <p className="text-base text-[#D6C6CC] leading-relaxed mb-8 max-w-xl">
                Whether deploying high-throughput distributed backends or engineering zero-knowledge on-chain contracts, Code Relay 5.0 provides the proving ground for top collegiate builders.
              </p>

              {/* Technical Specifications Highlights */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8 w-full max-w-lg">
                <div className="rounded-xl border border-white/10 bg-[#160207]/60 p-3">
                  <div className="font-heading font-black text-xl text-white">36 HRS</div>
                  <div className="text-[10px] font-mono text-[#657AA8] uppercase">Sprint Duration</div>
                </div>
                <div className="rounded-xl border border-white/10 bg-[#160207]/60 p-3">
                  <div className="font-heading font-black text-xl text-white">2–4</div>
                  <div className="text-[10px] font-mono text-[#657AA8] uppercase">Hackers Per Team</div>
                </div>
                <div className="rounded-xl border border-white/10 bg-[#160207]/60 p-3 col-span-2 sm:col-span-1">
                  <div className="font-heading font-black text-xl text-[#F59E0B]">₹ POOL</div>
                  <div className="text-[10px] font-mono text-[#657AA8] uppercase">Prizes &amp; Grants</div>
                </div>
              </div>

              {/* Action Buttons matching Reference */}
              <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
                <Link
                  href="/register"
                  className="btn-pill-primary group text-sm py-3 px-8"
                >
                  <span>Register Now</span>
                  <span className="text-xs transition-transform group-hover:translate-x-1">▶</span>
                </Link>

                <Link
                  href="/event"
                  className="btn-pill-secondary group text-sm py-3 px-7"
                >
                  <span>Explore the Event</span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </div>

            </div>

            {/* Right Column: 3D Trophy & Arena Table inside Vignette Portal (5 cols) */}
            <div
              ref={trophyParallaxRef}
              className="lg:col-span-5 relative flex justify-center items-center w-full min-h-[320px]"
            >
              {/* Circular Vignette Portal */}
              <div className="relative w-72 sm:w-80 aspect-square flex items-center justify-center">

                {/* Radial Gold/Crimson Vignette Light */}
                <div className="portal-vignette absolute inset-0 bg-gradient-to-tr from-[#991B3D]/40 via-[#F59E0B]/25 to-transparent blur-md" />

                {/* 3D Golden Trophy Asset Popping Out */}
                <div className="relative z-20 w-[85%] h-[85%] transform hover:scale-110 transition-transform duration-500 flex items-center justify-center">
                  <Image
                    src="/decoratives/trophy.webp"
                    alt="Code Relay 3D Champion Trophy"
                    width={260}
                    height={260}
                    className="object-contain filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.9)]"
                  />
                </div>

                {/* Satellite 3D Exhibition Table */}
                <div className="absolute -bottom-4 -left-4 z-10 w-24 h-24 transform hover:scale-105 transition-transform">
                  <Image
                    src="/decoratives/exhibitionTable.webp"
                    alt="Exhibition Table"
                    width={96}
                    height={96}
                    className="object-contain filter drop-shadow-[0_10px_15px_rgba(0,0,0,0.8)]"
                  />
                </div>

                {/* Satellite 3D Judge Desk */}
                <div className="absolute -top-3 -right-4 z-10 w-24 h-24 transform hover:scale-105 transition-transform">
                  <Image
                    src="/decoratives/judgeTable.webp"
                    alt="Judge Table"
                    width={96}
                    height={96}
                    className="object-contain filter drop-shadow-[0_10px_15px_rgba(0,0,0,0.8)]"
                  />
                </div>

              </div>
            </div>

          </div>

          {/* Bottom Accent Line */}
          <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#991B3D] via-[#E44714] to-[#4B5D86]" />

        </div>

      </div>
    </section>
  );
}
