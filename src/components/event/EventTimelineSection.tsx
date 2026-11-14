"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/hooks/useGsapScrollTrigger";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface TimelineItem {
  id: string;
  phase: string;
  date: string;
  statusBadge: string;
  statusColor: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  icon: string;
}

const TIMELINE_EVENTS: TimelineItem[] = [
  {
    id: "01",
    phase: "PHASE 01",
    date: "15 NOV",
    statusBadge: "Portal Live",
    statusColor: "border-[#B82A4F]/60 bg-[#991B3D]/25 text-[#FF8DA7]",
    title: "Online Listing",
    subtitle: "Official Launch & Portal Release",
    description:
      "Code Relay 5.0 officially goes live across collegiate engineering networks. Portal listings, challenge domain briefs, and discord hacker community officially open for team exploration.",
    highlights: ["Portal Listing", "Challenge Previews", "Community Opening"],
    icon: "/decoratives/bannerBoard.webp",
  },
  {
    id: "02",
    phase: "PHASE 02",
    date: "Till 12 DEC",
    statusBadge: "Round 1 (Online)",
    statusColor: "border-[#F59E0B]/50 bg-[#F59E0B]/15 text-[#FCD34D]",
    title: "Registration & Idea Submission (PPT)",
    subtitle: "Round 1 Online Screening",
    description:
      "Teams of 2–4 student hackers finalize registration and submit their technical architecture proposal deck (PPT). Mentor juries screen submissions for feasibility, innovation, and track alignment.",
    highlights: ["2–4 Hackers / Team", "Architecture Deck (PPT)", "Mentor Screening"],
    icon: "/decoratives/laptop.webp",
  },
  {
    id: "03",
    phase: "PHASE 03",
    date: "Jan 15–17",
    statusBadge: "Round 2 (OFFLINE)",
    statusColor: "border-[#FF8DA7] bg-gradient-to-r from-[#991B3D] to-[#B82A4F] text-white shadow-[0_0_15px_rgba(232,115,141,0.5)]",
    title: "Round 2 (OFFLINE)",
    subtitle: "36-Hour Hackathon Finale @ IIT Bhubaneswar",
    description:
      "Shortlisted finalist teams arrive on-campus at IIT Bhubaneswar for the flagship 36-hour offline marathon sprint. Continuous relay development, mentor office hours, live jury evaluations, and valedictory awards.",
    highlights: ["36-Hour Offline Sprint", "IIT Bhubaneswar Campus", "Live Pitches & Awards"],
    icon: "/decoratives/trophy.webp",
  },
];

export default function EventTimelineSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const spineTrackRef = useRef<HTMLDivElement>(null);
  const beamProgressRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current || typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      // 1. Vertical Beam Progress Animation (ScrollTrigger scrub)
      if (beamProgressRef.current && containerRef.current) {
        gsap.fromTo(
          beamProgressRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            transformOrigin: "top center",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 65%",
              end: "bottom 80%",
              scrub: 0.6,
            },
          }
        );
      }

      // 2. Individual Milestone Cards Entrance (ScrollTrigger stagger & flare)
      itemsRef.current.forEach((itemEl, idx) => {
        if (!itemEl) return;

        const card = itemEl.querySelector(".timeline-card");
        const beacon = itemEl.querySelector(".timeline-beacon");
        const dateTag = itemEl.querySelector(".timeline-date");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: itemEl,
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        });

        tl.fromTo(
          beacon,
          { scale: 0.4, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(2)" }
        )
          .fromTo(
            dateTag,
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
            "-=0.3"
          )
          .fromTo(
            card,
            {
              opacity: 0,
              x: idx % 2 === 0 ? -40 : 40,
              y: 20,
            },
            {
              opacity: 1,
              x: 0,
              y: 0,
              duration: 0.7,
              ease: "power3.out",
            },
            "-=0.2"
          );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="timeline"
      ref={containerRef}
      className="relative w-full py-20 sm:py-28 border-b border-[rgba(255,255,255,0.08)] bg-[#160207] overflow-hidden"
    >
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 w-[70vw] h-[400px] bg-gradient-to-b from-[#991B3D]/15 via-[#E44714]/10 to-transparent blur-[140px] rounded-full" />
      <div className="pointer-events-none absolute bottom-1/4 left-1/3 w-[50vw] h-[350px] bg-[radial-gradient(circle,rgba(184,42,79,0.2)_0%,transparent_70%)] blur-[120px] rounded-full" />

      <div className="relative w-full px-6 sm:px-10 lg:px-16 xl:px-20 2xl:px-24">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16 sm:mb-20">
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-[#F6F0E8]">
            EVENT TIMELINE
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#E0D4C3] max-w-3xl font-normal leading-relaxed">
            Key milestones and competition stages for Code Relay 5.0, from online listings and idea screening through the grand offline finale at IIT Bhubaneswar.
          </p>
        </div>

        {/* Vertical Timeline Structure */}
        <div className="relative w-full max-w-6xl mx-auto py-8">
          {/* Vertical Spine (Center on Desktop lg+, Left-aligned on mobile) */}
          <div
            ref={spineTrackRef}
            className="absolute top-0 bottom-0 left-6 sm:left-8 lg:left-1/2 -translate-x-1/2 w-[3px] bg-[#620821]/30 rounded-full"
          >
            {/* Glowing animated light beam that fills down on scroll */}
            <div
              ref={beamProgressRef}
              className="absolute inset-x-0 top-0 w-full h-full bg-gradient-to-b from-[#FFA3B9] via-[#E44714] to-[#B82A4F] rounded-full shadow-[0_0_15px_#B82A4F,0_0_25px_rgba(232,115,141,0.8)] origin-top"
              style={{ transform: "scaleY(0)" }}
            />
          </div>

          {/* Timeline Milestones List */}
          <div className="space-y-14 sm:space-y-20 lg:space-y-24">
            {TIMELINE_EVENTS.map((item, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={item.id}
                  ref={(el) => {
                    itemsRef.current[idx] = el;
                  }}
                  className="relative flex flex-col lg:flex-row items-start lg:items-center w-full"
                >
                  {/* Central Timeline Beacon Node */}
                  <div className="absolute left-6 sm:left-8 lg:left-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
                    <div className="timeline-beacon relative flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full border-2 border-[#FFA3B9] bg-[#160207] shadow-[0_0_20px_rgba(232,115,141,0.8),inset_0_0_12px_rgba(184,42,79,0.6)]">
                      {/* Pulse Ring */}
                      <span className="absolute inset-0 rounded-full bg-[#B82A4F] animate-ping opacity-30" />
                      {/* Inner luminous core */}
                      <span className="h-4 w-4 rounded-full bg-gradient-to-br from-white via-[#FFA3B9] to-[#991B3D] shadow-[0_0_10px_#FFF]" />
                    </div>
                  </div>

                  {/* Desktop Alternating Layout: Card on Left or Right */}
                  <div className="w-full flex flex-col lg:flex-row items-center">
                    {/* Left Column (Desktop) */}
                    <div
                      className={`w-full lg:w-1/2 pl-16 sm:pl-20 lg:pl-0 ${
                        isEven
                          ? "lg:pr-14 xl:pr-16 lg:text-right"
                          : "lg:order-2 lg:pl-14 xl:pl-16 lg:text-left"
                      }`}
                    >
                      {/* Timeline Card */}
                      <div className="timeline-card editorial-card group relative rounded-3xl p-6 sm:p-8 overflow-hidden transition-all duration-300 hover:border-[#FFA3B9]/60 hover:shadow-[0_0_30px_rgba(184,42,79,0.35)]">
                        {/* Subtle top edge specular reflection */}
                        <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />

                        {/* Top Meta Header */}
                        <div
                          className={`flex flex-wrap items-center gap-3 mb-4 ${
                            isEven ? "lg:justify-end" : "lg:justify-start"
                          }`}
                        >
                          <span className="font-mono text-xs font-bold text-[#E8738D] tracking-wider uppercase">
                            {item.phase}
                          </span>
                          <span
                            className={`rounded-full border px-3 py-0.5 text-xs font-mono font-bold uppercase tracking-wider ${item.statusColor}`}
                          >
                            {item.statusBadge}
                          </span>
                        </div>

                        {/* Card Content with 3D Vignette Icon */}
                        <div
                          className={`flex flex-col sm:flex-row items-start gap-4 mb-4 ${
                            isEven ? "lg:flex-row-reverse" : ""
                          }`}
                        >
                          <div className="relative w-14 h-14 shrink-0 rounded-2xl border border-[rgba(255,255,255,0.12)] bg-[#24040d]/80 p-2 shadow-md">
                            <Image
                              src={item.icon}
                              alt={item.title}
                              fill
                              className="object-contain p-1.5"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-heading text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#F6F0E8] mb-1">
                              {item.title}
                            </h3>
                            <span className="font-mono text-xs text-[#E8738D] font-semibold block mb-2">
                              {item.subtitle}
                            </span>
                          </div>
                        </div>

                        <p className="text-sm sm:text-base text-[#D6C6CC] leading-relaxed font-normal mb-6">
                          {item.description}
                        </p>

                        {/* Feature Highlights Pills */}
                        <div
                          className={`flex flex-wrap gap-2 pt-4 border-t border-[rgba(255,255,255,0.08)] ${
                            isEven ? "lg:justify-end" : "lg:justify-start"
                          }`}
                        >
                          {item.highlights.map((h, i) => (
                            <span
                              key={i}
                              className="rounded-full border border-[rgba(255,255,255,0.1)] bg-white/5 px-3 py-1 text-xs font-mono font-semibold text-[#E0D4C3]"
                            >
                              {h}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Opposite Column (Desktop Date Billboard Tag) */}
                    <div
                      className={`hidden lg:flex w-1/2 ${
                        isEven
                          ? "lg:pl-14 xl:pl-16 lg:justify-start"
                          : "lg:order-1 lg:pr-14 xl:pr-16 lg:justify-end"
                      }`}
                    >
                      <div className="timeline-date flex flex-col items-start gap-1">
                        <div className="rounded-2xl border border-[#FFA3B9]/40 bg-[#22020A]/70 px-5 py-2.5 backdrop-blur-md shadow-[0_0_20px_rgba(153,27,61,0.3)]">
                          <span className="font-heading text-2xl xl:text-3xl font-black uppercase tracking-tight text-white drop-shadow-[0_0_10px_rgba(255,210,225,0.7)]">
                            {item.date}
                          </span>
                        </div>
                        <span className="font-mono text-xs text-[#E0D4C3]/70 uppercase tracking-widest pl-1">
                          {item.statusBadge}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
