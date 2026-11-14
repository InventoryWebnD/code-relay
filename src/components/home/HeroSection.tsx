"use client";

import Image from "next/image";
import Link from "next/link";
import { useRegisterModal } from "@/context/RegisterModalContext";
import { useParallaxSlide } from "@/hooks/useGsapScrollTrigger";

interface HeroSectionProps {
  onRegisterClick?: () => void;
}

export default function HeroSection({ onRegisterClick }: HeroSectionProps) {
  const modalContext = useRegisterModal();

  const handleRegister = () => {
    if (onRegisterClick) {
      onRegisterClick();
    } else {
      modalContext.openRegisterModal();
    }
  };

  // Parallax slide hooks for layered depth on scroll
  const bgGlowRef = useParallaxSlide<HTMLDivElement>(0.15, "vertical");
  const foregroundRef = useParallaxSlide<HTMLDivElement>(-0.2, "vertical");

  return (
    <section
      id="home"
      data-no-scroll-animate="true"
      className="relative w-full flex flex-col justify-start overflow-hidden bg-[#160207] border-b border-[#620821]/40 pt-2 sm:pt-3 pb-12 sm:pb-16"
    >
      {/* 1. Atmospheric Mountain / Horizon Backdrop with Fiery Amber & Crimson Glow */}
      <div
        ref={bgGlowRef}
        className="absolute inset-0 pointer-events-none z-0"
      >
        {/* Deep mountain ridges SVG silhouette */}
        <div className="absolute inset-0 opacity-40 mix-blend-screen">
          <svg
            viewBox="0 0 1440 800"
            fill="none"
            preserveAspectRatio="none"
            className="w-full h-full"
          >
            {/* Distant mountain layer */}
            <polygon
              points="0,480 240,280 480,420 720,220 980,390 1200,240 1440,380 1440,800 0,800"
              fill="url(#mountainGrad1)"
              opacity="0.85"
            />
            {/* Mid-range peak layer */}
            <polygon
              points="0,560 320,360 620,510 880,310 1140,480 1440,360 1440,800 0,800"
              fill="url(#mountainGrad2)"
              opacity="0.95"
            />
            {/* Horizon water / lake glow reflection */}
            <rect x="0" y="580" width="1440" height="220" fill="url(#lakeGrad)" opacity="0.9" />

            <defs>
              <linearGradient id="mountainGrad1" x1="720" y1="200" x2="720" y2="800" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#E44714" stopOpacity="0.8" />
                <stop offset="45%" stopColor="#991B3D" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#160207" />
              </linearGradient>
              <linearGradient id="mountainGrad2" x1="720" y1="300" x2="720" y2="800" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.7" />
                <stop offset="35%" stopColor="#B82A4F" stopOpacity="0.85" />
                <stop offset="85%" stopColor="#22020A" />
                <stop offset="100%" stopColor="#160207" />
              </linearGradient>
              <linearGradient id="lakeGrad" x1="720" y1="580" x2="720" y2="800" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.4" />
                <stop offset="25%" stopColor="#991B3D" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#160207" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Ambient Warm Golden Horizon Flare */}
        <div className="absolute top-[35%] left-[20%] w-[60vw] h-[350px] bg-gradient-to-t from-[#E44714]/25 via-[#991B3D]/30 to-transparent blur-[120px] rounded-full pointer-events-none" />
        {/* Slate-blue celestial glow */}
        <div className="absolute top-0 right-[10%] w-[35vw] h-[280px] bg-[#4B5D86]/20 blur-[100px] rounded-full pointer-events-none" />
      </div>

      {/* 2. Main Content Grid — Full Screen Wide */}
      <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-20 2xl:px-24 pt-0 sm:pt-1 pb-4 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full">

          {/* Left Column: Massive Editorial Headline & CTAs (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Hanging Nameplate Assembly: chains + plate + swing */}
            <div
              className="relative w-full max-w-[580px] xl:max-w-[640px] mb-6 mt-1 sm:mt-2 nameplate-swing"
              style={{ transformOrigin: "50% -90px" }}
            >
              {/* Nameplate Container with centered text & attached chains */}
              <div className="relative w-full aspect-[2/1] flex items-center justify-center">
                {/* Left chain — ends at 50% inside the height of the nameplate */}
                <div
                  className="absolute left-[20%] sm:left-[22%] top-[-90px] sm:top-[-115px] bottom-[50%] w-5 sm:w-7 z-0 pointer-events-none select-none filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)]"
                  style={{
                    backgroundImage: "url('/decoratives/chain.webp')",
                    backgroundRepeat: "repeat-y",
                    backgroundSize: "100% auto",
                    backgroundPosition: "bottom center",
                  }}
                />

                {/* Right chain — ends at 50% inside the height of the nameplate */}
                <div
                  className="absolute right-[20%] sm:right-[22%] top-[-90px] sm:top-[-115px] bottom-[50%] w-5 sm:w-7 z-0 pointer-events-none select-none filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)]"
                  style={{
                    backgroundImage: "url('/decoratives/chain.webp')",
                    backgroundRepeat: "repeat-y",
                    backgroundSize: "100% auto",
                    backgroundPosition: "bottom center",
                  }}
                />

                {/* Nameplate Base Image — in front of the chains */}
                <Image
                  src="/decoratives/namePlate.webp"
                  alt="Code Relay Nameplate"
                  fill
                  className="object-contain pointer-events-none select-none filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.85)] z-10"
                  priority
                />

                {/* Text Container: exactly 50% width and 50% height of the image, center-aligned */}
                <div className="relative z-20 w-[50%] h-[50%] flex flex-col items-center justify-center text-center">
                  <h1 className="metallic-hero-text font-heading text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-black uppercase tracking-tight leading-[0.92] select-none text-center">
                    CODE<br />
                    RELAY<span className="text-[#E44714] ml-1">5.0</span>
                  </h1>
                </div>
              </div>
            </div>

            {/* Concise Tagline */}
            <p className="text-base sm:text-lg lg:text-xl text-[#E0D4C3] font-normal leading-relaxed mb-8 max-w-xl">
              A premier nationwide Web2 and Web3 hackathon. Join collegiate innovators across India to build scalable infrastructure, intelligent web systems, and decentralized protocols.
            </p>

            {/* Reference-Styled Pill Buttons ("Adventure ▶" in reference) */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <Link
                href="/register"
                className="btn-pill-primary group"
              >
                <span>Register Now</span>
                <span className="text-xs transition-transform group-hover:translate-x-1">▶</span>
              </Link>

              <Link
                href="/event"
                className="btn-pill-secondary group"
              >
                <span>Explore the Event</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>

          </div>

          {/* Right Column: Layered 3D Subject with Parallax Slide (5 cols) */}
          <div
            ref={foregroundRef}
            className="lg:col-span-5 relative flex justify-center items-center w-full"
          >
            {/* Glowing Backdrop Portal Behind Subject */}
            <div className="relative w-full max-w-md lg:max-w-lg xl:max-w-xl aspect-square flex items-center justify-center">

              {/* Radial Sunset Light Ring */}
              <div className="absolute w-[85%] h-[85%] rounded-full bg-gradient-to-tr from-[#991B3D]/50 via-[#E44714]/30 to-[#4B5D86]/20 blur-2xl pointer-events-none" />

              {/* Circular Portal Frame */}
              <div className="absolute w-[80%] h-[80%] rounded-full border border-[#B82A4F]/40 bg-[#22020A]/40 backdrop-blur-sm shadow-[0_0_50px_rgba(153,27,61,0.3)]" />

              {/* 3D Foreground Hero Asset: The Monolith & Tech Artifacts */}
              <div className="relative z-10 w-full h-full flex items-center justify-center">
                {/* Main 3D Monolith Obelisk */}
                <div className="relative w-[75%] h-[90%] transform hover:scale-105 transition-transform duration-500">
                  <Image
                    src="/decoratives/monolith.webp"
                    alt="Code Relay 3D Monolith"
                    fill
                    className="object-contain filter drop-shadow-[0_25px_35px_rgba(0,0,0,0.9)]"
                    priority
                  />
                </div>

                {/* Satellite 3D Tech Cube */}
                <div className="absolute -bottom-2 -left-4 w-28 h-28 transform hover:scale-110 transition-transform duration-300">
                  <Image
                    src="/decoratives/cube.webp"
                    alt="3D Tech Cube"
                    width={112}
                    height={112}
                    className="object-contain filter drop-shadow-[0_15px_20px_rgba(0,0,0,0.8)]"
                  />
                </div>

                {/* Satellite 3D Holographic Laptop */}
                <div className="absolute -top-3 -right-3 w-28 h-28 transform hover:scale-110 transition-transform duration-300">
                  <Image
                    src="/decoratives/laptop.webp"
                    alt="3D Holographic Laptop"
                    width={112}
                    height={112}
                    className="object-contain filter drop-shadow-[0_15px_20px_rgba(0,0,0,0.8)]"
                  />
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
