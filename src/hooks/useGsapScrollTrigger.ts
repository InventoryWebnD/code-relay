"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Ensure ScrollTrigger is registered safely on client
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };

export interface SkewTrajectory {
  x: number;
  y: number;
  skewX: number;
  skewY: number;
  rotation: number;
}

export function isLowEndDevice(): boolean {
  if (typeof window === "undefined") return false;
  const isMobile = window.innerWidth < 768;
  const lowCores =
    typeof navigator !== "undefined" &&
    Boolean(navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4);
  const lowMemory =
    typeof navigator !== "undefined" &&
    Boolean(
      (navigator as unknown as { deviceMemory?: number }).deviceMemory &&
        (navigator as unknown as { deviceMemory?: number }).deviceMemory! <= 4
    );
  return isMobile || lowCores || lowMemory;
}

// Flat trajectory — skews and rotations removed
export function getSkewTrajectory(..._args: unknown[]): SkewTrajectory {
  void _args;
  return { y: 0, x: 0, skewX: 0, skewY: 0, rotation: 0 };
}

/**
 * Parallax slide hook for smooth scrolling layered depth
 */
export function useParallaxSlide<T extends HTMLElement = HTMLDivElement>(
  speed: number = 0.25,
  direction: "vertical" | "horizontal" = "vertical"
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current || typeof window === "undefined") return;
    const el = ref.current;

    const ctx = gsap.context(() => {
      if (direction === "vertical") {
        gsap.to(el, {
          yPercent: speed * 40,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      } else {
        gsap.to(el, {
          xPercent: speed * 30,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }
    });

    return () => ctx.revert();
  }, [speed, direction]);

  return ref;
}

export interface ScrollDropOptions {
  trajectory?: SkewTrajectory | number;
  duration?: number;
  stagger?: number;
  ease?: string;
  start?: string;
  once?: boolean;
  delay?: number;
}

export function animateElementsDrop(
  targets: gsap.TweenTarget,
  options: ScrollDropOptions = {},
  triggerElement?: Element | null
) {
  const {
    duration = 0.5,
    stagger = 0.05,
    ease = "power2.out",
    start = "top 85%",
    once = true,
    delay = 0,
  } = options;

  const targetArray = Array.isArray(targets)
    ? targets
    : targets instanceof NodeList || targets instanceof HTMLCollection
    ? Array.from(targets as NodeListOf<Element>)
    : [targets];

  const animations: gsap.core.Tween[] = [];

  targetArray.forEach((target, index) => {
    const config: gsap.TweenVars = {
      y: 0,
      opacity: 1,
      duration,
      ease,
      delay: delay + index * stagger,
      onComplete: () => {
        gsap.set(target, { clearProps: "all" });
      },
    };

    if (triggerElement) {
      config.scrollTrigger = {
        trigger: triggerElement,
        start,
        once,
        toggleActions: "play none none none",
      };
    }

    const tween = gsap.fromTo(
      target,
      { y: 15, opacity: 0 },
      config
    );

    animations.push(tween);
  });

  return animations;
}
