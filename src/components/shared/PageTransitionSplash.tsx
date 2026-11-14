"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
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
  const cleanPath = (path.split("#")[0].split("?")[0] || "/").replace(/\/+$/, "") || "/";
  if (ROUTE_MAP[cleanPath]) {
    return ROUTE_MAP[cleanPath];
  }
  const segment = cleanPath.replace(/^\//, "").replace(/-/g, " ").toUpperCase();
  return {
    tag: "SYSTEM NAVIGATION",
    title: segment || "CODE RELAY 5.0",
    subtitle: "IIT BHUBANESWAR · WEBND",
  };
}

export default function PageTransitionSplash() {
  const router = useRouter();
  const pathname = usePathname();

  const [transitionInfo, setTransitionInfo] = useState<PageInfo | null>(null);
  const activeInfo = transitionInfo || getPageInfo(pathname || "/");

  const overlayRef = useRef<HTMLDivElement>(null);
  const backPanelRef = useRef<HTMLDivElement>(null);
  const mainPanelRef = useRef<HTMLDivElement>(null);
  const centerContentRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLSpanElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLSpanElement>(null);
  const isAnimatingRef = useRef(false);

  // Synchronize document title with active pathname
  useEffect(() => {
    if (pathname) {
      const info = getPageInfo(pathname);
      const docTitle =
        info.title === "CODE RELAY 5.0"
          ? "Code Relay 5.0 | Nationwide Web2 & Web3 Hackathon — WebnD IIT Bhubaneswar"
          : `${info.title} | Code Relay 5.0`;
      document.title = docTitle;
    }
  }, [pathname]);

  const triggerTransition = useCallback((info: PageInfo, destinationHref?: string) => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    // Immediately update transition info and direct DOM text
    setTransitionInfo(info);
    if (headingRef.current) headingRef.current.textContent = info.title;
    if (tagRef.current) tagRef.current.textContent = info.tag;
    if (subtitleRef.current) subtitleRef.current.textContent = info.subtitle;

    // Immediately update the browser document title to the target page title
    const docTitle =
      info.title === "CODE RELAY 5.0"
        ? "Code Relay 5.0 | Nationwide Web2 & Web3 Hackathon — WebnD IIT Bhubaneswar"
        : `${info.title} | Code Relay 5.0`;
    document.title = docTitle;

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
        setTransitionInfo(null);
        isAnimatingRef.current = false;
      },
    });

    tl.fromTo(
      mainPanel,
      { yPercent: -100 },
      { yPercent: 0, duration: 0.3, ease: "power3.inOut" },
      0
    )
      .fromTo(
        centerContent,
        { y: -25, opacity: 0, scale: 0.98 },
        { y: 0, opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" },
        0.08
      )
      .call(() => {
        if (destinationHref) router.push(destinationHref);
      }, [], 0.3)
      .to(
        centerContent,
        { y: 20, opacity: 0, duration: 0.22, ease: "power2.in" },
        "+=0.2"
      )
      .to(
        mainPanel,
        { yPercent: 100, duration: 0.3, ease: "power3.inOut" },
        "-=0.06"
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
      className="fixed inset-0 z-[200] hidden items-center justify-center overflow-hidden pointer-events-none select-none h-[100dvh]"
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
        className="absolute inset-0 bg-[#620821] border-y-2 sm:border-y-4 border-[#160207] flex flex-col justify-between p-4 sm:p-8 md:p-12 origin-center shadow-2xl h-[100dvh]"
      >
        {/* Top Header Strip inside Splash */}
        <div className="w-full flex items-center justify-between border-b border-[#160207]/40 pb-3 sm:pb-4 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="relative w-6 h-6 shrink-0 rounded-md overflow-hidden border border-[#B82A4F]/60 bg-[#991B3D]/80 p-0.5">
              <Image
                src="/assets/cr_logo.png"
                alt="Code Relay Logo"
                width={24}
                height={24}
                className="w-full h-full object-contain"
              />
            </div>
            <span className="font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-[#F6F0E8]">
              CODE RELAY 5.0
            </span>
          </div>
          <span className="font-mono text-[11px] sm:text-xs font-semibold text-[#E0D4C3] uppercase tracking-widest hidden sm:inline-block">
            IIT BHUBANESWAR · WEBnD
          </span>
        </div>

        {/* Center Hero Heading Container */}
        <div
          ref={centerContentRef}
          className="relative z-20 my-auto flex flex-col items-center justify-center text-center px-2 sm:px-4 w-full max-w-5xl mx-auto py-2"
        >
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-md sm:rounded-lg border-2 border-[#160207] bg-[#991B3D] px-3 py-1 sm:px-4 sm:py-1.5 shadow-hard-xs mb-3 sm:mb-5 max-w-[92vw]">
            <span
              ref={tagRef}
              className="text-[10px] xs:text-xs sm:text-sm font-mono font-black text-white uppercase tracking-wider sm:tracking-widest truncate sm:whitespace-normal"
            >
              {activeInfo.tag}
            </span>
          </div>

          {/* Massive Section Heading */}
          <h1
            ref={headingRef}
            className="font-heading text-3xl xs:text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black uppercase tracking-tight text-white drop-shadow-[3px_3px_0px_#160207] sm:drop-shadow-[6px_6px_0px_#160207] max-w-5xl leading-[1.05] sm:leading-[0.95] break-words hyphens-auto w-full px-2"
          >
            {activeInfo.title}
          </h1>

          {/* Subtitle / Description */}
          <div className="mt-3 sm:mt-6 inline-flex items-center justify-center gap-2 rounded-md border border-[#160207] bg-[#22020A] px-3 py-1.5 sm:px-4 sm:py-2 shadow-hard-xs max-w-[92vw]">
            <span
              ref={subtitleRef}
              className="font-mono text-[10px] xs:text-xs sm:text-sm font-bold text-[#E0D4C3] tracking-wide uppercase text-center"
            >
              {activeInfo.subtitle}
            </span>
          </div>
        </div>

        {/* Bottom Relay Status Ticker */}
        <div className="w-full flex items-center justify-between border-t border-[#160207]/40 pt-3 sm:pt-4 font-mono text-[10px] sm:text-xs text-[#E0D4C3]/80 uppercase shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-[#991B3D] font-bold">&gt;&gt;&gt;</span>
            <span className="truncate">SYSTEM RELAY HANDOFF IN PROGRESS</span>
          </div>
          <span className="hidden sm:inline-block">
            DISCIPLINE · WEB2 &amp; WEB3
          </span>
        </div>
      </div>
    </div>
  );
}
