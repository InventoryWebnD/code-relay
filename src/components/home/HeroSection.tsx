"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import DimensionalHeroObject from "./DimensionalHeroObject";
import { useRegisterModal } from "@/context/RegisterModalContext";
import gsap from "gsap";
import { isLowEndDevice } from "@/hooks/useGsapScrollTrigger";

interface HeroSectionProps {
  onRegisterClick?: () => void;
}

export default function HeroSection({ onRegisterClick }: HeroSectionProps) {
  const modalContext = useRegisterModal();
  const heroRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const objectRef = useRef<HTMLDivElement>(null);

  const handleRegister = () => {
    if (onRegisterClick) {
      onRegisterClick();
    } else {
      modalContext.openRegisterModal();
    }
  };

  useEffect(() => {
    if (!heroRef.current) return;
    const lowEnd = isLowEndDevice();

    const ctx = gsap.context(() => {
      if (lowEnd) {
        // Fast, high-efficiency entrance for mobile / low-end devices
        const tl = gsap.timeline({
          defaults: { ease: "power2.out", duration: 0.4 },
          delay: 0.05,
        });

        tl.fromTo(
          [eyebrowRef.current, headingRef.current, paraRef.current],
          { y: -20, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.06 }
        )
          .fromTo(
            ctaRef.current ? Array.from(ctaRef.current.children) : [],
            { y: -15, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.05 },
            "-=0.2"
          )
          .fromTo(
            objectRef.current,
            { y: -20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.45 },
            "-=0.25"
          );

        tl.eventCallback("onComplete", () => {
          gsap.set(
            [
              eyebrowRef.current,
              headingRef.current,
              paraRef.current,
              ctaRef.current,
              ctaRef.current?.children ? Array.from(ctaRef.current.children) : [],
              objectRef.current,
            ].flat(),
            { clearProps: "all" }
          );
        });
      } else {
        // Full expressive skew drop for desktop devices
        const tl = gsap.timeline({
          defaults: { ease: "back.out(1.25)", duration: 0.85 },
          delay: 0.1,
        });

        tl.fromTo(
          eyebrowRef.current,
          { x: -35, y: -50, skewX: -7, rotation: -4, opacity: 0 },
          { x: 0, y: 0, skewX: 0, rotation: 0, opacity: 1 }
        )
          .fromTo(
            headingRef.current,
            { x: 45, y: -70, skewX: 7, rotation: 3.5, opacity: 0 },
            { x: 0, y: 0, skewX: 0, rotation: 0, opacity: 1 },
            "-=0.65"
          )
          .fromTo(
            paraRef.current,
            { x: -30, y: -45, skewX: -5, rotation: -2, opacity: 0 },
            { x: 0, y: 0, skewX: 0, rotation: 0, opacity: 1 },
            "-=0.6"
          )
          .fromTo(
            ctaRef.current ? Array.from(ctaRef.current.children) : [],
            { x: (i) => (i % 2 === 0 ? -30 : 35), y: -50, skewX: (i) => (i % 2 === 0 ? -6 : 7), rotation: (i) => (i % 2 === 0 ? -3 : 4), opacity: 0 },
            { x: 0, y: 0, skewX: 0, rotation: 0, opacity: 1, stagger: 0.1 },
            "-=0.55"
          )
          .fromTo(
            objectRef.current,
            { x: 60, y: -85, skewX: -8, skewY: 4, rotation: 6, opacity: 0, scale: 0.92 },
            { x: 0, y: 0, skewX: 0, skewY: 0, rotation: 0, opacity: 1, scale: 1 },
            "-=0.7"
          );

        tl.eventCallback("onComplete", () => {
          gsap.set(
            [
              eyebrowRef.current,
              headingRef.current,
              paraRef.current,
              ctaRef.current,
              ctaRef.current?.children ? Array.from(ctaRef.current.children) : [],
              objectRef.current,
            ].flat(),
            { clearProps: "transform" }
          );
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      data-no-scroll-animate="true"
      className="relative w-full pt-10 pb-16 md:pt-16 md:pb-24 overflow-hidden border-b-2 border-[#160207] bg-[#F6F0E8]"
    >
      <div className="w-full px-6 sm:px-10 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Left Column: Typography & CTAs (7 cols on desktop) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Eyebrow Label */}
            <div
              ref={eyebrowRef}
              className="inline-flex items-center rounded-lg border-2 border-[#160207] bg-[#FFFDF9] px-3.5 py-1.5 shadow-hard-xs mb-6"
            >
              <span className="text-xs sm:text-sm font-heading font-bold tracking-wider text-[#620821] uppercase">
                WEB &amp; DESIGN SOCIETY, IIT BHUBANESWAR
              </span>
            </div>

            {/* Oversized Headline */}
            <div className="relative mb-6">
              <h1
                ref={headingRef}
                className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-black uppercase tracking-tight leading-[0.95] text-[#620821]"
              >
                CODE RELAY{" "}
                <span className="inline-block relative">
                  <span className="relative z-10 text-[#991B3D]">
                    5.0
                  </span>
                  {/* Hard shadow underline block */}
                  <span className="absolute -bottom-1 left-0 w-full h-3 bg-[#4B5D86] border-2 border-[#160207] -z-0 transform -rotate-1"></span>
                </span>
              </h1>
            </div>

            {/* Concise Tagline */}
            <p
              ref={paraRef}
              className="text-lg sm:text-xl text-[#3A1822] font-medium leading-relaxed mb-8 max-w-3xl"
            >
              A premier nationwide Web2 and Web3 hackathon. Join collegiate innovators across India to build scalable infrastructure, intelligent web systems, and decentralized protocols.
            </p>

            {/* Primary & Secondary Call to Actions */}
            <div
              ref={ctaRef}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto"
            >
              <button
                onClick={handleRegister}
                className="btn-pressable-hero inline-flex items-center justify-center gap-3 rounded-xl border-2 border-[#160207] bg-[#991B3D] hover:bg-[#7A122E] px-8 py-4 text-base sm:text-lg font-heading font-black uppercase tracking-wide text-white shadow-hard-md"
              >
                <span>Register Now</span>
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>

              <Link
                href="/event"
                className="btn-pressable inline-flex items-center justify-center gap-2 rounded-xl border-2 border-[#160207] bg-[#FFFDF9] hover:bg-[#EADBCC] px-7 py-4 text-base sm:text-lg font-heading font-bold text-[#620821] shadow-hard"
              >
                <span>Explore the Event</span>
                <svg className="w-5 h-5 text-[#620821]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>

          </div>

          {/* Right Column: Dimensional Hero Object (5 cols on desktop) */}
          <div
            ref={objectRef}
            className="lg:col-span-5 flex justify-center items-center w-full"
          >
            <DimensionalHeroObject />
          </div>

        </div>
      </div>
    </section>
  );
}
