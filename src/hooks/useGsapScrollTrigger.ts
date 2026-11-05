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
  /** Horizontal skew offset in pixels */
  x: number;
  /** Vertical drop offset in pixels (negative means falls from above) */
  y: number;
  /** Horizontal skew angle in degrees */
  skewX: number;
  /** Vertical skew angle in degrees */
  skewY: number;
  /** Initial rotation angle in degrees */
  rotation: number;
}

/**
 * Pre-calibrated varied skew falling directions:
 * Top-left, Top-right, Steep-left, Wide-right, Diagonal angles, etc.
 */
export const SKEW_PRESETS: SkewTrajectory[] = [
  { y: -70, x: -45, skewX: -8, skewY: 0, rotation: -4 },
  { y: -65, x: 45, skewX: 8, skewY: 0, rotation: 4 },
  { y: -80, x: -25, skewX: -5, skewY: -4, rotation: -3 },
  { y: -75, x: 35, skewX: 6, skewY: 3, rotation: 3.5 },
  { y: -60, x: -55, skewX: -9, skewY: 2, rotation: -5 },
  { y: -60, x: 55, skewX: 9, skewY: -2, rotation: 5 },
  { y: -85, x: -15, skewX: -4, skewY: -3, rotation: -2 },
  { y: -85, x: 20, skewX: 5, skewY: 2, rotation: 2.5 },
];

export function getSkewTrajectory(index: number): SkewTrajectory {
  return SKEW_PRESETS[Math.abs(index) % SKEW_PRESETS.length];
}

export interface ScrollDropOptions {
  /** Optional custom skew trajectory, or index to pick from presets */
  trajectory?: SkewTrajectory | number;
  /** Duration in seconds. Default 0.85 */
  duration?: number;
  /** Stagger between child elements in seconds. Default 0.08 */
  stagger?: number;
  /** GSAP easing. Default "back.out(1.25)" */
  ease?: string;
  /** ScrollTrigger start position. Default "top 85%" */
  start?: string;
  /** Whether the animation triggers only once. Default true */
  once?: boolean;
  /** Additional delay before starting in seconds. Default 0 */
  delay?: number;
}

/**
 * Animate elements falling from skewed directions into their respective positions
 */
export function animateElementsDrop(
  targets: gsap.TweenTarget,
  options: ScrollDropOptions = {},
  triggerElement?: Element | null
) {
  const {
    trajectory,
    duration = 0.85,
    stagger = 0.08,
    ease = "back.out(1.25)",
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
    const traj =
      typeof trajectory === "object"
        ? trajectory
        : typeof trajectory === "number"
        ? getSkewTrajectory(trajectory)
        : getSkewTrajectory(index);

    const config: gsap.TweenVars = {
      x: 0,
      y: 0,
      skewX: 0,
      skewY: 0,
      rotation: 0,
      opacity: 1,
      scale: 1,
      duration,
      ease,
      delay: delay + index * stagger,
      onComplete: () => {
        // Clear inline transforms so native CSS hovers/active states work unimpeded
        gsap.set(target, { clearProps: "transform" });
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
      {
        x: traj.x,
        y: traj.y,
        skewX: traj.skewX,
        skewY: traj.skewY,
        rotation: traj.rotation,
        opacity: 0,
        scale: 0.96,
      },
      config
    );

    animations.push(tween);
  });

  return animations;
}

/**
 * Custom React hook for adding a scroll-triggered skew drop animation to a container
 */
export function useScrollDrop<T extends HTMLElement = HTMLDivElement>(
  options: ScrollDropOptions = {},
  targetSelector?: string
) {
  const containerRef = useRef<T>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // Find targets: either specified selector or default children (headers, paragraphs, buttons, cards)
      const targets = targetSelector
        ? container.querySelectorAll(targetSelector)
        : container.querySelectorAll(
            "h1, h2, h3, h4, p, button, a.btn-pressable, a.btn-pressable-hero, .badge, article, [data-drop]"
          );

      if (targets.length > 0) {
        animateElementsDrop(targets, options, container);
      }
    }, container);

    return () => {
      ctx.revert();
    };
  }, [options, targetSelector]);

  return containerRef;
}
