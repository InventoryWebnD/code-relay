"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getSkewTrajectory, isLowEndDevice } from "@/hooks/useGsapScrollTrigger";
import { FOCUS_ITEMS } from "@/data/homeData";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function IdentityStrip() {
  const stripRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const itemsContainerRef = useRef<HTMLDivElement>(null);

  const items = FOCUS_ITEMS;

  useEffect(() => {
    if (!stripRef.current) return;
    const lowEnd = isLowEndDevice();

    const ctx = gsap.context(() => {
      const badges = itemsContainerRef.current?.children
        ? Array.from(itemsContainerRef.current.children)
        : [];

      if (lowEnd) {
        gsap.fromTo(
          [titleRef.current, ...badges],
          { y: -15, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            stagger: 0.04,
            ease: "power2.out",
            scrollTrigger: {
              trigger: stripRef.current,
              start: "top 95%",
              once: true,
            },
            onComplete: () => {
              if (titleRef.current) gsap.set(titleRef.current, { clearProps: "all" });
              badges.forEach((b) => gsap.set(b, { clearProps: "all" }));
            },
          }
        );
        return;
      }

      gsap.fromTo(
        titleRef.current,
        { x: -30, y: -35, skewX: -6, rotation: -3, opacity: 0 },
        {
          x: 0,
          y: 0,
          skewX: 0,
          rotation: 0,
          opacity: 1,
          duration: 0.65,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: stripRef.current,
            start: "top 90%",
            once: true,
          },
          onComplete: () => {
            if (titleRef.current) gsap.set(titleRef.current, { clearProps: "transform" });
          },
        }
      );

      if (badges.length > 0) {
        badges.forEach((badge, i) => {
          const traj = getSkewTrajectory(i + 1);
          gsap.fromTo(
            badge,
            {
              x: traj.x,
              y: traj.y,
              skewX: traj.skewX,
              skewY: traj.skewY,
              rotation: traj.rotation,
              opacity: 0,
              scale: 0.94,
            },
            {
              x: 0,
              y: 0,
              skewX: 0,
              skewY: 0,
              rotation: 0,
              opacity: 1,
              scale: 1,
              duration: 0.75,
              delay: i * 0.08,
              ease: "back.out(1.35)",
              scrollTrigger: {
                trigger: stripRef.current,
                start: "top 90%",
                once: true,
              },
              onComplete: () => {
                gsap.set(badge, { clearProps: "transform" });
              },
            }
          );
        });
      }
    }, stripRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={stripRef}
      data-no-scroll-animate="true"
      className="relative w-full border-b-2 border-[#160207] bg-[#620821] py-4 overflow-hidden"
    >
      <div className="w-full px-6 sm:px-10 lg:px-12 flex flex-wrap items-center justify-center sm:justify-between gap-3 sm:gap-4">
        <div ref={titleRef}>
          <span className="font-heading text-xs sm:text-sm font-bold text-[#F6F0E8] uppercase tracking-wider">
            Edition 5.0 Core Focus
          </span>
        </div>

        <div ref={itemsContainerRef} className="flex flex-wrap items-center gap-2 sm:gap-3">
          {items.map((item) => (
            <div
              key={item.label}
              className={`inline-flex items-center rounded-md border-2 border-[#160207] px-3 py-1 text-xs font-heading font-bold shadow-hard-xs ${item.color}`}
            >
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
