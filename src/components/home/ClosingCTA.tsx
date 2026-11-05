"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useRegisterModal } from "@/context/RegisterModalContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ClosingCTA() {
  const { openRegisterModal } = useRegisterModal();
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const btnsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          once: true,
        },
      });

      tl.fromTo(
        cardRef.current,
        { x: -40, y: -70, skewX: -6, rotation: -3, opacity: 0, scale: 0.95 },
        { x: 0, y: 0, skewX: 0, rotation: 0, opacity: 1, scale: 1, duration: 0.85, ease: "back.out(1.2)" }
      )
        .fromTo(
          tagRef.current,
          { x: 25, y: -35, skewX: 6, rotation: 3, opacity: 0 },
          { x: 0, y: 0, skewX: 0, rotation: 0, opacity: 1, duration: 0.55, ease: "back.out(1.3)" },
          "-=0.4"
        )
        .fromTo(
          titleRef.current,
          { x: -30, y: -50, skewX: -5, rotation: -2.5, opacity: 0 },
          { x: 0, y: 0, skewX: 0, rotation: 0, opacity: 1, duration: 0.65, ease: "back.out(1.25)" },
          "-=0.35"
        )
        .fromTo(
          descRef.current,
          { x: 25, y: -35, skewX: 4, rotation: 2, opacity: 0 },
          { x: 0, y: 0, skewX: 0, rotation: 0, opacity: 1, duration: 0.55, ease: "power3.out" },
          "-=0.3"
        )
        .fromTo(
          btnsRef.current ? Array.from(btnsRef.current.children) : [],
          { x: (i) => (i % 2 === 0 ? -30 : 35), y: -45, skewX: (i) => (i % 2 === 0 ? -6 : 7), rotation: (i) => (i % 2 === 0 ? -3 : 4), opacity: 0 },
          { x: 0, y: 0, skewX: 0, rotation: 0, opacity: 1, duration: 0.65, stagger: 0.1, ease: "back.out(1.3)" },
          "-=0.25"
        );

      tl.eventCallback("onComplete", () => {
        gsap.set(
          [
            cardRef.current,
            tagRef.current,
            titleRef.current,
            descRef.current,
            btnsRef.current,
            btnsRef.current?.children ? Array.from(btnsRef.current.children) : [],
          ].flat(),
          { clearProps: "transform" }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-no-scroll-animate="true"
      className="relative w-full py-16 sm:py-20 border-b-2 border-[#160207] bg-[#F6F0E8]"
    >
      <div className="w-full px-6 sm:px-10 lg:px-12">
        <div
          ref={cardRef}
          className="relative rounded-2xl border-3 border-[#160207] bg-[#620821] p-8 sm:p-12 lg:p-16 shadow-hard-xl text-center text-white"
        >
          <div className="max-w-3xl mx-auto flex flex-col items-center">
            {/* Tag */}
            <div
              ref={tagRef}
              className="inline-flex items-center rounded-md border-2 border-[#160207] bg-[#991B3D] px-3.5 py-1.5 shadow-hard-xs mb-4"
            >
              <span className="font-heading text-xs font-bold text-white uppercase tracking-wider">
                Ready to Sprint?
              </span>
            </div>

            {/* Headline */}
            <h2
              ref={titleRef}
              className="font-heading text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-4"
            >
              Take the Relay Baton at Code Relay 5.0
            </h2>

            <p
              ref={descRef}
              className="text-base sm:text-lg text-[#F6F0E8]/90 max-w-2xl leading-relaxed mb-8"
            >
              Join collegiate teams nationwide for 36 hours of engineering, architecture, and deployment. Secure your spot on the priority roster today.
            </p>

            {/* Buttons */}
            <div
              ref={btnsRef}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
            >
              <button
                onClick={openRegisterModal}
                className="btn-pressable-hero w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-xl border-2 border-[#160207] bg-[#991B3D] hover:bg-[#7A122E] px-8 py-3.5 text-base font-heading font-black uppercase tracking-wider text-white shadow-hard-md"
              >
                <span>Register Now</span>
                <span className="text-[#F6F0E8]">→</span>
              </button>

              <Link
                href="/event"
                className="btn-pressable w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border-2 border-[#160207] bg-[#F6F0E8] hover:bg-white px-7 py-3.5 text-base font-heading font-bold text-[#620821] shadow-hard"
              >
                <span>Explore the Event</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
