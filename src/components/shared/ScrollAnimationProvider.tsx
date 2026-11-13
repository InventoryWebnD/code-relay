"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getSkewTrajectory, isLowEndDevice } from "@/hooks/useGsapScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ScrollAnimationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Respect reduced motion accessibility
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const lowEnd = isLowEndDevice();

    // Allow Next.js DOM to settle after page/route transition
    let ctx: gsap.Context | null = null;
    const timer = setTimeout(() => {
      ctx = gsap.context(() => {
        // Query all sections on the current route
        const sections = document.querySelectorAll(
          "main section:not([data-no-scroll-animate='true'])"
        );

        sections.forEach((section, sectionIndex) => {
          const elementsToAnimate: Element[] = [];

          // 1. Section Header: on low-end, animate header container as single unit; on desktop, animate direct children
          const headerContainer = section.querySelector(
            ":scope > div > div.flex-col, :scope > div > div.flex.flex-col, :scope > div > div:first-child"
          );

          if (headerContainer && headerContainer.querySelector("h1, h2, h3")) {
            if (lowEnd) {
              elementsToAnimate.push(headerContainer);
            } else {
              Array.from(headerContainer.children).forEach((child) => {
                elementsToAnimate.push(child);
              });
            }
          } else {
            const headings = section.querySelectorAll(":scope > div > h1, :scope > div > h2, :scope > div > h3");
            headings.forEach((h) => elementsToAnimate.push(h));
          }

          // 2. Identify Cards & Content Grids (capped to avoid dozens of simultaneous tweens)
          const grids = section.querySelectorAll(":scope > div > .grid, :scope > div > div > .grid");
          grids.forEach((grid) => {
            const cardLimit = lowEnd ? 4 : 8;
            Array.from(grid.children).slice(0, cardLimit).forEach((card) => {
              elementsToAnimate.push(card);
            });
          });

          // 3. Standalone Cards/Articles (e.g. CTA banners, highlight blocks)
          const standaloneCards = section.querySelectorAll(
            ":scope > div > article, :scope > div > div.rounded-2xl:not(.grid *):not(.space-y-4 *):not(.space-y-6 *)"
          );
          standaloneCards.forEach((card) => {
            elementsToAnimate.push(card);
          });

          // 4. On desktop only: Stack items (e.g. schedule, judging) capped
          if (!lowEnd) {
            const stackItems = section.querySelectorAll(
              ":scope > div > .space-y-4 > *, :scope > div > .space-y-6 > *, :scope > div > [data-drop='item']"
            );
            Array.from(stackItems).slice(0, 5).forEach((item) => {
              elementsToAnimate.push(item);
            });
          }

          // Deduplicate and filter out nested elements
          const uniqueElements = Array.from(new Set(elementsToAnimate)).filter((el) => {
            return !elementsToAnimate.some((parent) => parent !== el && parent.contains(el));
          });

          if (uniqueElements.length === 0) return;

          // Check if section is already in or above the initial viewport
          const rect = section.getBoundingClientRect();
          const isAboveOrInView = rect.top < window.innerHeight * 0.85;

          // Animate elements with hardware-adapted trajectory
          uniqueElements.forEach((el, elIndex) => {
            const traj = getSkewTrajectory(elIndex + sectionIndex * 2, lowEnd);

            gsap.fromTo(
              el,
              {
                x: traj.x,
                y: traj.y,
                skewX: traj.skewX,
                skewY: traj.skewY,
                rotation: traj.rotation,
                opacity: 0,
                scale: lowEnd ? 1 : 0.96,
              },
              {
                x: 0,
                y: 0,
                skewX: 0,
                skewY: 0,
                rotation: 0,
                opacity: 1,
                scale: 1,
                duration: lowEnd ? 0.45 : 0.85,
                delay: (isAboveOrInView ? 0.04 : 0) + elIndex * (lowEnd ? 0.04 : 0.08),
                ease: lowEnd ? "power2.out" : "back.out(1.25)",
                scrollTrigger: isAboveOrInView
                  ? undefined
                  : {
                      trigger: section,
                      start: "top 85%",
                      once: true,
                      toggleActions: "play none none none",
                    },
                onComplete: () => {
                  gsap.set(el, { clearProps: "transform" });
                },
              }
            );
          });
        });

        ScrollTrigger.refresh();
      });
    }, 120);

    return () => {
      clearTimeout(timer);
      ctx?.revert();
    };
  }, [pathname]);

  return <>{children}</>;
}
