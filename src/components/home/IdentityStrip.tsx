"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FOCUS_ITEMS } from "@/data/homeData";
import { useParallaxSlide } from "@/hooks/useGsapScrollTrigger";

export default function IdentityStrip() {
  const [activeSlide, setActiveSlide] = useState(0);

  // Parallax slide hooks
  const sectionParallaxRef = useParallaxSlide<HTMLDivElement>(0.1, "vertical");

  const cards = [
    {
      id: "01",
      tag: "SCALABLE SYSTEMS",
      title: "Web2 Architecture",
      desc: "Engineer resilient web applications, high-performance distributed backends, developer tooling, and intelligent AI-augmented digital platforms.",
      link: "/event#tracks",
      cta: "Explore Web2 Track",
      image: "/decoratives/computers.webp",
      alt: "3D Computers Workstation",
      colorBar: "bg-[#E44714]",
      glowColor: "from-[#E44714]/30 via-[#991B3D]/25 to-transparent",
    },
    {
      id: "02",
      tag: "ON-CHAIN PROTOCOLS",
      title: "Web3 Protocols",
      desc: "Develop decentralized applications, zero-knowledge smart contracts, trustless financial primitives, and interoperable on-chain infrastructure.",
      link: "/event#tracks",
      cta: "Explore Web3 Track",
      image: "/decoratives/cube.webp",
      alt: "3D Tech Cube",
      colorBar: "bg-[#4B5D86]",
      glowColor: "from-[#4B5D86]/35 via-[#364464]/25 to-transparent",
    },
    {
      id: "03",
      tag: "NATIONAL ARENA",
      title: "36-Hour Marathon",
      desc: "2–4 hackers per team, continuous relay sprint, and prize grants pool. Connect with leading engineering mentors and technical judges.",
      link: "/event",
      cta: "View Specifications",
      image: "/decoratives/trophy.webp",
      alt: "3D Golden Trophy",
      colorBar: "bg-[#F59E0B]",
      glowColor: "from-[#F59E0B]/35 via-[#991B3D]/20 to-transparent",
    },
  ];

  const handlePrev = () => {
    setActiveSlide((prev) => (prev === 0 ? cards.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveSlide((prev) => (prev === cards.length - 1 ? 0 : prev + 1));
  };

  return (
    <section
      ref={sectionParallaxRef}
      data-no-scroll-animate="true"
      className="relative w-full py-20 sm:py-28 overflow-hidden bg-[#160207] border-b border-[#620821]/40"
    >

      <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-20 2xl:px-24 relative z-10">

        {/* ================= SECTION HEADER (Matching Reference Section 2) ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end mb-12 sm:mb-16">

          {/* Left Column: Title */}
          <div className="lg:col-span-6 flex items-start">
            <div>
              <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black uppercase text-white tracking-tight leading-[1.05]">
                Choose your<br />
                Relay Track
              </h2>
            </div>
          </div>

          {/* Right Column: Description */}
          <div className="lg:col-span-6 flex flex-col justify-end">
            <p className="text-sm sm:text-base text-[#D6C6CC] leading-relaxed max-w-xl">
              Choose your engineering discipline. Both tracks run concurrently over 36 hours. Join collegiate innovators across India to build scalable infrastructure, intelligent web systems, and decentralized protocols.
            </p>
          </div>

        </div>

        {/* ================= 3 CARDS CAROUSEL (Matching Reference Layout) ================= */}
        <div className="relative">

          {/* Navigation Arrows (Floating left/right matching reference) */}
          <button
            onClick={handlePrev}
            aria-label="Previous track"
            className="hidden md:flex absolute -left-5 lg:-left-6 top-1/2 -translate-y-1/2 z-30 h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-[#160207]/90 text-white backdrop-blur-md hover:bg-[#991B3D] hover:border-[#B82A4F] transition-all shadow-lg"
          >
            <span className="text-sm font-bold">◀</span>
          </button>

          <button
            onClick={handleNext}
            aria-label="Next track"
            className="hidden md:flex absolute -right-5 lg:-right-6 top-1/2 -translate-y-1/2 z-30 h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-[#160207]/90 text-white backdrop-blur-md hover:bg-[#991B3D] hover:border-[#B82A4F] transition-all shadow-lg"
          >
            <span className="text-sm font-bold">▶</span>
          </button>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {cards.map((card, idx) => (
              <div
                key={card.id}
                className={`editorial-card group relative flex flex-col justify-between rounded-2xl p-6 sm:p-8 overflow-hidden min-h-[460px] ${activeSlide === idx ? "ring-1 ring-[#B82A4F]" : ""
                  }`}
              >
                <div>
                  {/* Card Top Index Badge */}
                  <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                    <span className="font-mono text-xs font-bold text-[#E0D4C3] uppercase tracking-wider">
                      {card.tag}
                    </span>
                    <span className="font-mono font-black text-xs text-[#657AA8]">
                      {card.id}
                    </span>
                  </div>

                  {/* Circular Vignette Portal with 3D Illustration Breaking Out */}
                  <div className="relative w-full aspect-square max-w-[210px] mx-auto my-4 flex items-center justify-center">

                    {/* Vignette Background Glow */}
                    <div className={`portal-vignette absolute inset-0 bg-gradient-to-tr ${card.glowColor}`} />

                    {/* 3D Decorative Asset Popping Out */}
                    <div className="relative z-10 w-[95%] h-[95%] transform group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-300 flex items-center justify-center">
                      <Image
                        src={card.image}
                        alt={card.alt}
                        width={180}
                        height={180}
                        className="object-contain filter drop-shadow-[0_15px_20px_rgba(0,0,0,0.8)]"
                      />
                    </div>
                  </div>

                  {/* Card Title */}
                  <h3 className="font-heading text-2xl font-black uppercase text-white mt-4 mb-2 text-center group-hover:text-[#F6F0E8]">
                    {card.title}
                  </h3>

                  {/* Card Description */}
                  <p className="text-xs sm:text-sm text-[#D6C6CC] text-center leading-relaxed mb-6">
                    {card.desc}
                  </p>
                </div>

                <div>
                  {/* Action Button */}
                  <div className="flex justify-center">
                    <Link
                      href={card.link}
                      className="btn-pill-primary w-full text-center text-xs py-2.5 shadow-[0_0_15px_rgba(153,27,61,0.35)]"
                    >
                      <span>{card.cta}</span>
                      <span>→</span>
                    </Link>
                  </div>

                  {/* Bottom Colored Accent Line (Reference Detail) */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1.5 ${card.colorBar}`} />
                </div>
              </div>
            ))}
          </div>

          {/* Mobile slide indicator pills */}
          <div className="flex md:hidden items-center justify-center gap-2 mt-6">
            {cards.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveSlide(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2 rounded-full transition-all ${activeSlide === i ? "w-6 bg-[#E44714]" : "w-2 bg-white/20"
                  }`}
              />
            ))}
          </div>

        </div>

        {/* ================= EDITION 5.0 CORE FOCUS ITEMS (PRESERVED CONTENT) ================= */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-heading text-xs font-bold text-[#E0D4C3] uppercase tracking-wider">
              Edition 5.0 Core Focus:
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {FOCUS_ITEMS.map((item) => (
              <div
                key={item.label}
                className="inline-flex items-center rounded-full border border-white/15 bg-[#22020A]/70 px-4 py-1.5 text-xs font-heading font-semibold text-white backdrop-blur-sm hover:border-[#B82A4F] transition-colors"
              >
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
