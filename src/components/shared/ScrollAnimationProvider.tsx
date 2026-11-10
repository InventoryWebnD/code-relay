"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getSkewTrajectory } from "@/hooks/useGsapScrollTrigger";

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

          // 1. Identify Header Container (first child container with heading)
          const headerContainer = section.querySelector(
            ":scope > div > div.flex-col, :scope > div > div.flex.flex-col, :scope > div > div:first-child"
          );

          if (headerContainer && headerContainer.querySelector("h1, h2, h3")) {
            // Animate immediate children of the header container (badge, h1/h2, intro paragraph, pills)
            Array.from(headerContainer.children).forEach((child) => {
              elementsToAnimate.push(child);
            });
          } else {
            // Fallback: collect direct heading and direct intro paragraphs in this section
            const headings = section.querySelectorAll(":scope > div > h1, :scope > div > h2, :scope > div > h3");
            headings.forEach((h) => elementsToAnimate.push(h));
          }

          // 2. Identify Cards & Content Grids
          const grids = section.querySelectorAll(":scope > div > .grid, :scope > div > div > .grid");
          grids.forEach((grid) => {
            Array.from(grid.children).forEach((card) => {
              elementsToAnimate.push(card);
            });
          });

          // 3. Identify Stack/List containers (e.g. Schedule days, FAQ items, Judging cards, Sponsor forms)
          const stackItems = section.querySelectorAll(
            ":scope > div > .space-y-4 > *, :scope > div > .space-y-6 > *, :scope > div > div > .space-y-4 > *, :scope > div > div > .space-y-6 > *, :scope > div > [data-drop='item']"
          );
          stackItems.forEach((item) => {
            elementsToAnimate.push(item);
          });

          // 4. Standalone Buttons / Action Bars
          const actionButtons = section.querySelectorAll(
            ":scope > div > .btn-pressable, :scope > div > .btn-pressable-hero, :scope > div > div > .btn-pressable:not(.grid *)"
          );
          actionButtons.forEach((btn) => {
            elementsToAnimate.push(btn);
          });

          // 5. Standalone Cards/Articles (e.g. CTA banners, highlight blocks)
          const standaloneCards = section.querySelectorAll(
            ":scope > div > article, :scope > div > div.rounded-2xl:not(.grid *):not(.space-y-4 *):not(.space-y-6 *)"
          );
          standaloneCards.forEach((card) => {
            elementsToAnimate.push(card);
          });

          // Deduplicate and filter out nested elements
          const uniqueElements = Array.from(new Set(elementsToAnimate)).filter((el) => {
            return !elementsToAnimate.some((parent) => parent !== el && parent.contains(el));
          });

          if (uniqueElements.length === 0) return;

          // Check if section is already in or above the initial viewport
          const rect = section.getBoundingClientRect();
          const isAboveOrInView = rect.top < window.innerHeight * 0.85;

          // Animate each element from its own unique skew direction
          uniqueElements.forEach((el, elIndex) => {
            // Offset the index with sectionIndex to create dynamic variety across different sections
            const traj = getSkewTrajectory(elIndex + sectionIndex * 2);

            gsap.fromTo(
              el,
              {
                x: traj.x,
                y: traj.y,
                skewX: traj.skewX,
                skewY: traj.skewY,
                rotation: traj.rotation,
                opacity: 0,
                scale: 0.96,
              },
              {
                x: 0,
                y: 0,
                skewX: 0,
                skewY: 0,
                rotation: 0,
                opacity: 1,
                scale: 1,
                duration: 0.85,
                delay: (isAboveOrInView ? 0.05 : 0) + elIndex * 0.08,
                ease: "back.out(1.25)",
                scrollTrigger: isAboveOrInView
                  ? undefined
                  : {
                      trigger: section,
                      start: "top 85%",
                      once: true,
                      toggleActions: "play none none none",
                    },
                onComplete: () => {
                  // Clear inline transform styles so CSS hover/active states stay responsive
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
