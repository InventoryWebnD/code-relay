"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";

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

const COLS = ["#991B3D", "#15060B", "#0B1B4D", "#15060B", "#991B3D"];
const useIso = typeof window !== "undefined" ? useLayoutEffect : useEffect;

function revealCurtain(el: HTMLDivElement | null, busy: { current: boolean }) {
  if (!el) return;
  const q = gsap.utils.selector(el);
  gsap
    .timeline({
      delay: 0.15,
      onComplete: () => {
        busy.current = false;
        gsap.set(el, { autoAlpha: 0 });
      },
    })
    .to(q(".rc-label"), { yPercent: -120, duration: 0.4, ease: "expo.in" })
    .to(q(".rc-col"), { yPercent: -100, duration: 0.75, ease: "expo.inOut", stagger: 0.045 }, "-=0.1");
}

function labelFor(path: string) {
  const base = "/" + (path.split("/")[1] ?? "");
  return LABELS[base] ?? "Code Relay";
}

export default function RouteCurtain() {
  const router = useRouter();
  const pathname = usePathname();
  const root = useRef<HTMLDivElement>(null);
  const busy = useRef(false);
  const pending = useRef<string | null>(null);
  const first = useRef(true);
  const [label, setLabel] = useState("");

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

      const dest = url.pathname + url.search + url.hash;
      pending.current = url.pathname;
      setLabel(labelFor(url.pathname));
      router.prefetch(dest);

      const el = root.current!;
      const q = gsap.utils.selector(el);
      gsap.set(el, { autoAlpha: 1 });
      gsap.set(q(".rc-col"), { yPercent: 100 });
      gsap.set(q(".rc-label"), { yPercent: 120 });
      gsap
        .timeline({
          onComplete: () => {
            router.push(dest);
            // Safety net: never leave the screen covered if navigation stalls.
            window.setTimeout(() => {
              if (busy.current) revealCurtain(root.current, busy);
            }, 4000);
          },
        })
        .to(q(".rc-col"), { yPercent: 0, duration: 0.55, ease: "expo.inOut", stagger: 0.045 })
        .to(q(".rc-label"), { yPercent: 0, duration: 0.5, ease: "expo.out" }, "-=0.2");
    };

    window.addEventListener("click", onClick, true);
    return () => window.removeEventListener("click", onClick, true);
  }, [router]);

  // On arrival → reveal.
  useIso(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (!busy.current) return;
    revealCurtain(root.current, busy);
  }, [pathname]);

  return (
    <div ref={root} className="pointer-events-none fixed inset-0 z-[150] invisible" aria-hidden>
      <div className="absolute inset-0 flex">
        {COLS.map((c, i) => (
          <div key={i} className="rc-col h-full flex-1" style={{ background: c }} />
        ))}
      </div>
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <div className="rc-label flex items-center gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/webnd-mascot-fly.webp" alt="" className="h-16 w-16 sm:h-24 sm:w-24 object-contain -scale-x-100" />
          <span className="font-display text-[clamp(40px,9vw,140px)] text-[var(--cream)]">{label}</span>
        </div>
      </div>
    </div>
  );
}
