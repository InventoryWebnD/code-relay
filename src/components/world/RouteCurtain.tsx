"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";
import PixelTransition from "./PixelTransition";

const LABELS: Record<string, string> = {
  "/": "Home",
  "/event": "The Event",
  "/sponsors": "Sponsors",
  "/past-editions": "Past Editions",
  "/problem-statements": "PS Vault",
  "/register": "Register",
  "/login": "Sign In",
  "/profile": "Profile",
};

type Phase = "cover" | "reveal" | "idle";

/** A calm pass of the pixel transition: night-sky navies with a hint of maroon,
 *  no bright tiles, no flash, no twinkle, and quicker in and out. */
const SUBTLE = {
  coverMs: 560,
  revealMs: 520,
  tileMs: 260,
  twinkle: false,
  base: "#0a1136",
  flash: "#1a2668",
  palette: { deep: "#0c1642", navy: "#101d52", maroon: "#2a1446", hot: "#3c1a4e", cream: "#14215c" },
};
const useIso = typeof window !== "undefined" ? useLayoutEffect : useEffect;

function labelFor(path: string) {
  const base = "/" + (path.split("/")[1] ?? "");
  return LABELS[base] ?? "Code Relay";
}

/**
 * Page transition: pixel tiles cover the screen from the edges in, the
 * destination's name slides in, we navigate, then the tiles clear from the
 * centre out on arrival.
 */
export default function RouteCurtain() {
  const router = useRouter();
  const pathname = usePathname();
  const labelRef = useRef<HTMLDivElement>(null);
  const busy = useRef(false);
  const dest = useRef<string | null>(null);
  const first = useRef(true);
  const safety = useRef<number | undefined>(undefined);
  const [label, setLabel] = useState("");
  const [phase, setPhase] = useState<Phase>("idle");

  useIso(() => {
    if (labelRef.current) gsap.set(labelRef.current, { yPercent: 30, autoAlpha: 0 });
  }, []);

  // Intercept internal link clicks → cover → navigate.
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as HTMLElement | null)?.closest("a");
      if (!a || a.target === "_blank" || a.hasAttribute("download") || a.dataset.noCurtain !== undefined) return;
      const href = a.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname) return; // same page (hash/query) → let it be
      // preventDefault alone stops Next's <Link> from navigating (it checks
      // defaultPrevented). Propagation must continue: stopping it here swallowed
      // the link's own onClick, e.g. the mobile menu never closed after a tap.
      e.preventDefault();
      if (busy.current) return;
      busy.current = true;

      dest.current = url.pathname + url.search + url.hash;
      setLabel(labelFor(url.pathname));
      router.prefetch(dest.current);
      setPhase("cover");
    };

    window.addEventListener("click", onClick, true);
    return () => window.removeEventListener("click", onClick, true);
  }, [router]);

  const reveal = () => {
    window.clearTimeout(safety.current);
    const el = labelRef.current;
    if (!el) return setPhase("reveal");
    // overwrite: the slide-in may still be running on a fast arrival; it must not win
    gsap.to(el, { yPercent: -30, autoAlpha: 0, duration: 0.3, ease: "power2.in", overwrite: true, onComplete: () => setPhase("reveal") });
  };

  // Tiles are down: show where we're going, then go.
  const onCovered = () => {
    const el = labelRef.current;
    if (el) gsap.fromTo(el, { yPercent: 30, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.45, ease: "power3.out" });
    if (dest.current) router.push(dest.current);
    // Safety net: never leave the screen covered if navigation truly stalls.
    // Generous on purpose: revealing early (e.g. while a route is still being
    // compiled in dev) shows the old page and makes the click look ignored.
    safety.current = window.setTimeout(() => {
      if (busy.current) reveal();
    }, 12000);
  };

  const onRevealed = () => {
    if (labelRef.current) gsap.set(labelRef.current, { autoAlpha: 0, yPercent: 30, overwrite: true });
    busy.current = false;
    setPhase("idle");
  };

  // On arrival → clear the tiles.
  useIso(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (!busy.current) return;
    reveal();
  }, [pathname]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[150]" aria-hidden>
      <PixelTransition phase={phase} onCovered={onCovered} onRevealed={onRevealed} options={SUBTLE} />
      {/* the label (text + mascot) only exists while a transition runs: once the
          tiles have cleared it is hidden outright, whatever any tween is doing */}
      <div
        className="absolute inset-0 z-[52] flex items-center justify-center overflow-hidden"
        style={{ visibility: phase === "idle" ? "hidden" : undefined }}
      >
        <div ref={labelRef} className="flex items-center gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/webnd-mascot-fly.webp" alt="" className="h-10 w-10 sm:h-14 sm:w-14 object-contain -scale-x-100" />
          <span className="font-display text-[clamp(26px,4vw,56px)] text-[var(--cream)]">{label}</span>
        </div>
      </div>
    </div>
  );
}
