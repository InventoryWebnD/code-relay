"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import gsap from "gsap";
import { useLenis } from "@/components/world/SmoothScroll";
import { EVENT } from "@/data/cr5";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/event", label: "The Event" },
  { href: "/past-editions", label: "Past Editions" },
  { href: "/sponsors", label: "Sponsors" },
  { href: "/problem-statements", label: "PS Vault" },
];

const MENU_LAYERS = ["#F5B000", "#5AA7A7", "#991B3D"];

export default function Navbar() {
  const pathname = usePathname();
  const { data: session, status } = useSession() ?? {};
  const authed = status === "authenticated" && Boolean(session?.user);
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lenis = useLenis();
  const menuRef = useRef<HTMLDivElement>(null);
  const menuTl = useRef<gsap.core.Timeline | null>(null);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  /* hide on scroll down, show on scroll up */
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (!open) setHidden(y > 300 && y > last + 2);
      if (y < last - 2) setHidden(false);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  /* staggered full-screen menu */
  useEffect(() => {
    const el = menuRef.current;
    if (!el) return;
    const q = gsap.utils.selector(el);
    gsap.set(el, { autoAlpha: 0 });
    gsap.set(q(".m-layer"), { xPercent: 100 });
    gsap.set(q(".m-panel"), { xPercent: 100 });
    gsap.set(q(".m-item"), { yPercent: 140, rotate: 6 });
    gsap.set(q(".m-foot"), { opacity: 0, y: 20 });
    gsap.set(q(".m-mascot"), { x: 200, rotate: 40, opacity: 0 });

    menuTl.current = gsap
      .timeline({ paused: true })
      .set(el, { autoAlpha: 1 })
      .to(q(".m-layer"), { xPercent: 0, duration: 0.55, ease: "power4.out", stagger: 0.07 })
      .to(q(".m-panel"), { xPercent: 0, duration: 0.6, ease: "power4.out" }, "-=0.35")
      .to(q(".m-item"), { yPercent: 0, rotate: 0, duration: 0.9, ease: "expo.out", stagger: 0.06 }, "-=0.3")
      .to(q(".m-mascot"), { x: 0, rotate: -8, opacity: 1, duration: 0.9, ease: "back.out(1.6)" }, "-=0.8")
      .to(q(".m-foot"), { opacity: 1, y: 0, duration: 0.5, stagger: 0.05 }, "-=0.6");
    return () => {
      menuTl.current?.kill();
    };
  }, []);

  useEffect(() => {
    const tl = menuTl.current;
    if (!tl) return;
    if (open) {
      lenis?.stop();
      tl.timeScale(1).play();
    } else {
      lenis?.start();
      tl.timeScale(1.6).reverse();
    }
  }, [open, lenis]);

  return (
    <>
      {/* Bare navigation: no bar, no pills. Titles float over the page and
          invert against whatever is behind them (dark world or cream page). */}
      <header
        className={`pointer-events-none fixed left-0 right-0 top-0 z-[100] text-white mix-blend-difference transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${
          hidden ? "-translate-y-[130%]" : "translate-y-0"
        }`}
      >
        <div className="mx-auto flex max-w-[1600px] items-start justify-between gap-6 px-5 pt-5 sm:px-10 sm:pt-7 lg:px-16">
          {/* Brand */}
          <Link href="/" className="pointer-events-auto group flex items-baseline gap-2" data-cursor="Home" aria-label="Code Relay 5.0 home">
            <span className="font-display text-[17px] leading-none tracking-tight">CR</span>
            <span className="font-mono text-[11px] font-bold leading-none opacity-70 transition-opacity group-hover:opacity-100">/5.0</span>
          </Link>

          {/* Page titles */}
          <nav className="pointer-events-auto hidden lg:flex items-start gap-8 xl:gap-11">
            {NAV.map((l, i) => {
              const active = isActive(l.href);
              return (
                <Link key={l.href} href={l.href} className="group relative flex items-start gap-1.5" aria-current={active ? "page" : undefined}>
                  <span className="font-mono text-[9px] font-bold leading-none opacity-50">{String(i + 1).padStart(2, "0")}</span>
                  <span className={`relative block overflow-hidden font-display text-[12px] leading-[1.15] tracking-[0.01em] transition-opacity duration-300 ${active ? "opacity-100" : "opacity-60 group-hover:opacity-100"}`}>
                    <span className="block transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-full">{l.label}</span>
                    <span className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-y-0">{l.label}</span>
                  </span>
                  <span
                    className={`absolute -bottom-2 left-[18px] right-0 h-px origin-left bg-current transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${
                      active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Right cluster */}
          <div className="pointer-events-auto flex items-start gap-6">
            {authed ? (
              <Link href="/profile" className="group font-display text-[12px] leading-[1.15]">
                <span className="opacity-60">[ </span>
                {session?.user?.name?.split(" ")[0] || "Profile"}
                <span className="opacity-60"> ]</span>
              </Link>
            ) : (
              <Link href="/register" className="group hidden sm:inline-flex items-center gap-1 font-display text-[12px] leading-[1.15]" data-cursor="Go!">
                <span className="opacity-60 transition-transform duration-300 group-hover:-translate-x-1">[</span>
                Register
                <span className="inline-block transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
                <span className="opacity-60 transition-transform duration-300 group-hover:translate-x-1">]</span>
              </Link>
            )}

            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="font-display text-[12px] leading-[1.15] lg:hidden"
            >
              {open ? "Close" : "Menu"}
            </button>
          </div>
        </div>
      </header>

      {/* Staggered full-screen menu */}
      <div ref={menuRef} className="fixed inset-0 z-[95] invisible lg:hidden" aria-hidden={!open}>
        <div className="absolute inset-0 bg-[var(--ink)]/40" onClick={() => setOpen(false)} />
        {MENU_LAYERS.map((c, i) => (
          <div key={i} className="m-layer absolute inset-y-0 right-0 w-full sm:w-[min(560px,90vw)]" style={{ background: c }} />
        ))}
        <div className="m-panel grid-bg absolute inset-y-0 right-0 flex w-full flex-col justify-between overflow-hidden bg-[var(--cream)] px-6 pb-8 pt-28 sm:w-[min(560px,90vw)] sm:border-l-[3px] sm:border-[var(--ink)]">
          <nav className="flex flex-col gap-1">
            {NAV.map((l, i) => (
              <div key={l.href} className="overflow-hidden">
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="m-item group flex items-baseline gap-3 py-1"
                >
                  <span className="label text-[var(--crimson)]">0{i + 1}</span>
                  <span
                    className={`font-display text-[clamp(40px,11vw,64px)] transition-all duration-300 group-hover:translate-x-3 ${
                      isActive(l.href) ? "text-[var(--crimson)]" : ""
                    }`}
                  >
                    {l.label}
                  </span>
                </Link>
              </div>
            ))}
          </nav>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/webnd-mascot-fly.webp"
            alt=""
            className="m-mascot pointer-events-none absolute -right-6 top-[38%] w-40 sm:w-52"
          />

          <div className="flex flex-col gap-4">
            <Link
              href={authed ? "/profile" : "/register"}
              onClick={() => setOpen(false)}
              className="m-foot btn-chunky bg-[var(--crimson)] text-[var(--cream)] w-full"
            >
              {authed ? "My Profile" : "Register for 5.0"} →
            </Link>
            <div className="m-foot flex flex-wrap gap-2">
              <a href={EVENT.contact.instagramUrl} target="_blank" rel="noreferrer" className="label rounded-full border-2 border-[var(--ink)] px-3 py-1.5">
                Instagram
              </a>
              <a href={EVENT.contact.linkedinUrl} target="_blank" rel="noreferrer" className="label rounded-full border-2 border-[var(--ink)] px-3 py-1.5">
                LinkedIn
              </a>
              <a href={`mailto:${EVENT.contact.email}`} className="label rounded-full border-2 border-[var(--ink)] px-3 py-1.5">
                Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
