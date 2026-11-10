"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";

export interface PageInfo {
  tag: string;
  title: string;
  subtitle: string;
}

export const ROUTE_MAP: Record<string, PageInfo> = {
  "/": {
    tag: "IIT BHUBANESWAR · EDITION 5.0",
    title: "CODE RELAY 5.0",
    subtitle: "NATIONWIDE WEB2 & WEB3 HACKATHON",
  },
  "/event": {
    tag: "SPECIFICATIONS & TIMELINE",
    title: "THE EVENT",
    subtitle: "36-HOUR DUAL TRACK RELAY SPRINT",
  },
  "/problem-statements": {
    tag: "CHALLENGE VAULT",
    title: "PROBLEM STATEMENTS",
    subtitle: "DISTRIBUTED SYSTEMS · PROTOCOLS · DEV TOOLS",
  },
  "/past-editions": {
    tag: "COMMUNITY LEGACY",
    title: "PAST EDITIONS",
    subtitle: "EDITIONS 1.0 — 4.0 · 2,900+ HACKERS",
  },
  "/sponsors": {
    tag: "PARTNERSHIP OPPORTUNITIES",
    title: "SPONSORS",
    subtitle: "BACKING INDIA'S TOP COLLEGIATE BUILDERS",
  },
};

export function getPageInfo(path: string): PageInfo {
  const cleanPath = path.split("#")[0].split("?")[0] || "/";
  if (ROUTE_MAP[cleanPath]) {
    return ROUTE_MAP[cleanPath];
  }
  const segment = cleanPath.replace(/^\//, "").replace(/-/g, " ").toUpperCase();
  return {
    tag: "SYSTEM NAVIGATION",
    title: segment || "CODE RELAY",
    subtitle: "IIT BHUBANESWAR · WEBND",
  };
}

export default function PageTransitionSplash() {
  const router = useRouter();

  const [pageInfo, setPageInfo] = useState<PageInfo>({
    tag: "IIT BHUBANESWAR · EDITION 5.0",
    title: "CODE RELAY 5.0",
    subtitle: "NATIONWIDE WEB2 & WEB3 HACKATHON",
  });

  const overlayRef = useRef<HTMLDivElement>(null);
  const backPanelRef = useRef<HTMLDivElement>(null);
  const mainPanelRef = useRef<HTMLDivElement>(null);
  const centerContentRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLSpanElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLSpanElement>(null);
  const isAnimatingRef = useRef(false);

  const triggerTransition = useCallback((info: PageInfo, destinationHref?: string) => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    // Immediately update React state and direct DOM text
    setPageInfo(info);
    if (headingRef.current) headingRef.current.textContent = info.title;
    if (tagRef.current) tagRef.current.textContent = info.tag;
    if (subtitleRef.current) subtitleRef.current.textContent = info.subtitle;

    const overlay = overlayRef.current;
    const backPanel = backPanelRef.current;
    const mainPanel = mainPanelRef.current;
    const centerContent = centerContentRef.current;
    const heading = headingRef.current;

    if (!overlay || !backPanel || !mainPanel || !centerContent || !heading) {
      isAnimatingRef.current = false;
      if (destinationHref) router.push(destinationHref);
      return;
    }

    // Stop any existing tweens and reset display
    gsap.killTweensOf([overlay, backPanel, mainPanel, centerContent, heading]);
    gsap.set(overlay, { display: "flex", opacity: 1, pointerEvents: "auto" });
    gsap.set(centerContent, { opacity: 1, clearProps: "transform" });

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(overlay, { display: "none", pointerEvents: "none" });
        gsap.set([backPanel, mainPanel, centerContent, heading], { clearProps: "all" });
        isAnimatingRef.current = false;
      },
    });

    // 1. Curtains slam down with angular skew
    tl.fromTo(
      backPanel,
      { yPercent: -105, skewY: -8, skewX: -4, scaleY: 1.1 },
      { yPercent: 0, skewY: 0, skewX: 0, scaleY: 1, duration: 0.35, ease: "power4.inOut" },
      0
    ).fromTo(
      mainPanel,
      { yPercent: -105, skewY: -6, skewX: -3, scaleY: 1.1 },
      { yPercent: 0, skewY: 0, skewX: 0, scaleY: 1, duration: 0.38, ease: "power4.inOut" },
      0.03
    );

    // 2. Center Content with bold angular skew entrance
    tl.fromTo(
      centerContent,
      {
        y: -65,
        x: -30,
        skewX: 18,
        skewY: -4,
        rotation: -4,
        opacity: 0,
        scale: 0.85,
      },
      {
        y: 0,
        x: 0,
        skewX: 0,
        skewY: 0,
        rotation: 0,
        opacity: 1,
        scale: 1,
        duration: 0.45,
        ease: "back.out(1.35)",
      },
      0.15
    );

    // 3. Trigger route navigation while splash fully covers the screen
    tl.call(() => {
      if (destinationHref) {
        router.push(destinationHref);
      }
    }, [], 0.38);

    // 4. Center heading skews and zooms out after hold
    tl.to(
      centerContent,
      {
        y: 45,
        x: 25,
        skewX: -14,
        skewY: 3,
        rotation: 3,
        opacity: 0,
        scale: 1.08,
        duration: 0.28,
        ease: "power3.in",
      },
      "+=0.4"
    );

    // 6. Curtains slide away with reverse skew
    tl.to(
      mainPanel,
      { yPercent: 105, skewY: 6, skewX: 3, scaleY: 1.1, duration: 0.38, ease: "power4.inOut" },
      "-=0.1"
    ).to(
      backPanel,
      { yPercent: 105, skewY: 8, skewX: 4, scaleY: 1.1, duration: 0.38, ease: "power4.inOut" },
      "-=0.34"
    );
  }, [router]);

  // Global click listener to intercept internal link clicks
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      const anchor = (e.target as Element)?.closest("a");
      if (!anchor) return;

      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
      if (anchor.target === "_blank" || anchor.hasAttribute("download")) return;

      const rawHref = anchor.getAttribute("href");
      if (!rawHref || rawHref.startsWith("#")) return;

      try {
        const url = new URL(rawHref, window.location.origin);
        if (url.origin !== window.location.origin) return;

        const targetPath = url.pathname;
        const currentPath = window.location.pathname;

        // If clicking the current route without hash change, ignore
        if (targetPath === currentPath) return;

        // Intercept navigation and trigger the full-screen skewed splash
        e.preventDefault();
        const info = getPageInfo(targetPath);
        triggerTransition(info, rawHref);
      } catch {
        // Fallback to default browser navigation
      }
    };

    document.addEventListener("click", handleDocumentClick, true);

    return () => {
      document.removeEventListener("click", handleDocumentClick, true);
    };
  }, [triggerTransition]);

  // Handle browser back and forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const info = getPageInfo(window.location.pathname);
      triggerTransition(info);
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [triggerTransition]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[200] hidden items-center justify-center overflow-hidden pointer-events-none select-none"
      style={{ display: "none" }}
    >
      {/* Layer 1: Dark Neo-Brutalist Backing Slab */}
      <div
        ref={backPanelRef}
        className="absolute inset-0 bg-[#160207] border-y-4 border-black origin-center"
      />

      {/* Layer 2: Main Brand Burgundy Panel */}
      <div
        ref={mainPanelRef}
        className="absolute inset-0 bg-[#620821] border-y-4 border-[#160207] flex flex-col justify-between p-6 sm:p-12 origin-center shadow-2xl"
      >
        {/* Top Header Strip inside Splash */}
        <div className="w-full flex items-center justify-between border-b-2 border-[#160207]/40 pb-4">
          <div className="flex items-center gap-2">
            <span className="flex h-3 w-3 rounded-full bg-[#991B3D] animate-ping" />
            <span className="font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-[#F6F0E8]">
              CODE RELAY 5.0
            </span>
          </div>
          <span className="font-mono text-xs font-semibold text-[#E0D4C3] uppercase tracking-widest hidden sm:inline-block">
            IIT BHUBANESWAR // WEBnD
          </span>
        </div>

        {/* Center Hero Heading Container */}
        <div
          ref={centerContentRef}
          className="relative z-20 my-auto flex flex-col items-center justify-center text-center px-4"
        >
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 rounded-lg border-2 border-[#160207] bg-[#991B3D] px-4 py-1.5 shadow-hard-xs mb-5">
            <span
              ref={tagRef}
              className="text-xs sm:text-sm font-mono font-black text-white uppercase tracking-widest"
            >
              {pageInfo.tag}
            </span>
          </div>

          {/* Massive Section Heading */}
          <h1
            ref={headingRef}
            className="font-heading text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tight text-white drop-shadow-[6px_6px_0px_#160207] max-w-6xl leading-[0.95]"
          >
            {pageInfo.title}
          </h1>

          {/* Subtitle / Description */}
          <div className="mt-6 inline-flex items-center gap-3 rounded-md border border-[#160207] bg-[#22020A] px-4 py-2 shadow-hard-xs max-w-xl">
            <span
              ref={subtitleRef}
              className="font-mono text-xs sm:text-sm font-bold text-[#E0D4C3] tracking-wider uppercase"
            >
              {pageInfo.subtitle}
            </span>
          </div>
        </div>

        {/* Bottom Relay Status Ticker */}
        <div className="w-full flex items-center justify-between border-t-2 border-[#160207]/40 pt-4 font-mono text-[11px] sm:text-xs text-[#E0D4C3]/80 uppercase">
          <div className="flex items-center gap-2">
            <span className="text-[#991B3D] font-bold">&gt;&gt;&gt;</span>
            <span>SYSTEM RELAY HANDOFF IN PROGRESS</span>
          </div>
          <span className="hidden sm:inline-block">
            DISCIPLINE // WEB2 &amp; WEB3
          </span>
        </div>
      </div>
    </div>
  );
}
