"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRegisterModal } from "@/context/RegisterModalContext";

interface NavbarProps {
  onRegisterClick?: () => void;
}

export default function Navbar({ onRegisterClick }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const modalContext = useRegisterModal();

  const handleRegister = () => {
    if (onRegisterClick) {
      onRegisterClick();
    } else {
      modalContext.openRegisterModal();
    }
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/event", label: "The Event" },
    { href: "/problem-statements", label: "Past Problem Statements" },
    { href: "/past-editions", label: "Past Editions" },
    { href: "/sponsors", label: "Sponsors" },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  const navRef = useRef<HTMLElement>(null);

  return (
    <header
      ref={navRef}
      className="sticky top-0 z-50 w-full border-b border-[#620821]/40 relative bg-[#160207] overflow-hidden"
    >
      {/* Background Topbar Image */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <Image
          src="/decoratives/topbar.png"
          alt="Topbar Background"
          fill
          className="w-full h-full object-fill pointer-events-none select-none"
          priority
        />
        {/* Subtle dark tint to maintain contrast & crisp readability */}
        <div className="absolute inset-0 bg-[#160207]/35 pointer-events-none" />
      </div>

      <div className="relative z-10 w-full flex items-center justify-between px-6 sm:px-10 lg:px-16 xl:px-20 2xl:px-24 py-3.5 pb-8">

        {/* Brand / Logo */}
        <Link href="/" className="group flex items-center gap-3">
          {/* Logo Badge */}
          <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#B82A4F]/50 bg-[#991B3D]/80 shadow-[0_0_15px_rgba(153,27,61,0.4)] transition-transform group-hover:scale-105 overflow-hidden p-1">
            <Image
              src="/assets/cr_logo.png"
              alt="Code Relay Official Logo"
              width={36}
              height={36}
              className="w-full h-full object-contain"
              priority
            />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-heading text-lg font-bold tracking-tight text-white group-hover:text-[#F6F0E8] transition-colors">
                CODE RELAY
              </span>
              <span className="rounded-full border border-[#B82A4F]/60 bg-[#991B3D]/80 px-2 py-0.5 text-[10px] font-black uppercase text-white">
                5.0
              </span>
            </div>
            <span className="text-[10px] font-medium tracking-wide text-[#657AA8]">
              WebnD, IIT Bhubaneswar
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links (Holographic Panel Style) */}
        <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2.5 p-1 rounded-full bg-[#160207]/40 border border-[#620821]/30 backdrop-blur-md shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)]">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`group relative inline-flex items-center justify-center rounded-full px-4 xl:px-5 py-2 text-xs xl:text-sm transition-all duration-300 ${active
                  ? "bg-gradient-to-b from-[#B82A4F] via-[#991B3D] to-[#620821] border border-[#FFA3B9] text-white shadow-[0_0_24px_rgba(232,115,141,0.7),0_0_50px_rgba(153,27,61,0.5),inset_0_1px_2px_rgba(255,255,255,0.75),inset_0_0_14px_rgba(255,160,185,0.35)] scale-[1.03]"
                  : "bg-gradient-to-b from-[#3d0818]/55 via-[#22020a]/70 to-[#160207]/85 border border-[#B82A4F]/30 text-[#E8DFD7] hover:text-white hover:border-[#E8738D]/65 hover:bg-gradient-to-b hover:from-[#4d0b1f]/70 hover:via-[#2b040e]/80 hover:to-[#160207]/90 shadow-[inset_0_1px_1px_rgba(255,255,255,0.14),0_4px_12px_rgba(0,0,0,0.45)] hover:shadow-[0_0_18px_rgba(184,42,79,0.4),inset_0_1px_1px_rgba(255,255,255,0.25)] hover:scale-[1.02]"
                  }`}
              >
                {/* Extra Light Elements for Selected Button */}
                {active && (
                  <>
                    {/* Top Specular Neon Ray */}
                    <span className="absolute -top-[1px] left-1/2 -translate-x-1/2 w-4/5 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent shadow-[0_0_10px_#FFF] rounded-full pointer-events-none" />
                    {/* Radial Ambient Core Light */}
                    <span className="absolute inset-0 rounded-full bg-[radial-gradient(ellipse_at_top,rgba(255,200,215,0.5)_0%,rgba(184,42,79,0.3)_50%,transparent_80%)] pointer-events-none" />
                  </>
                )}

                {/* Button Content with Contrast & Harmony Typography */}
                <span className="relative z-10 flex items-center gap-1.5">
                  {active && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FFEBF0] shadow-[0_0_8px_#FFF,0_0_14px_#FFA3B9] animate-pulse" />
                  )}
                  <span
                    className={`font-heading tracking-wide transition-all ${
                      active
                        ? "font-bold tracking-wider text-white drop-shadow-[0_0_10px_rgba(255,210,225,0.85)] drop-shadow-[0_1px_2px_rgba(0,0,0,0.95)]"
                        : "font-semibold text-[#E8DFD7] group-hover:text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)] group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]"
                    }`}
                  >
                    {link.label}
                  </span>
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Far Right CTA Button (Holographic Burgundy Panel) */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            href="/register"
            className="group relative inline-flex items-center justify-center gap-2 rounded-full border border-[#FF8DA7]/70 bg-gradient-to-r from-[#991B3D] via-[#B82A4F] to-[#991B3D] px-5 py-2 text-xs font-heading font-extrabold uppercase tracking-wider text-white shadow-[0_0_20px_rgba(184,42,79,0.5),inset_0_1px_2px_rgba(255,255,255,0.45)] hover:border-[#FFA3B9] hover:shadow-[0_0_30px_rgba(232,115,141,0.75),inset_0_1px_2px_rgba(255,255,255,0.65)] hover:scale-[1.03] transition-all duration-300"
          >
            {/* Top light shimmer */}
            <span className="absolute -top-[1px] left-1/2 -translate-x-1/2 w-3/4 h-[1.5px] bg-gradient-to-r from-transparent via-white to-transparent shadow-[0_0_8px_#FFF] rounded-full pointer-events-none" />
            <span className="relative z-10 drop-shadow-[0_0_8px_rgba(255,210,225,0.6)] drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
              Register Now
            </span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden items-center gap-2">
          <Link
            href="/register"
            className="rounded-full border border-[#FF8DA7]/60 bg-gradient-to-r from-[#991B3D] to-[#B82A4F] px-4 py-1.5 text-xs font-heading font-bold uppercase tracking-wider text-white shadow-[0_0_15px_rgba(153,27,61,0.5),inset_0_1px_1px_rgba(255,255,255,0.3)] sm:hidden"
          >
            Register
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#B82A4F]/40 bg-gradient-to-b from-[#3a0614]/60 via-[#22020A]/70 to-[#160207]/80 text-white backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] hover:border-[#E8738D]/60 hover:shadow-[0_0_15px_rgba(184,42,79,0.4)] transition-all"
          >
            {mobileMenuOpen ? (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="relative z-10 border-t border-[#620821]/40 bg-[#160207]/95 px-6 py-4 lg:hidden backdrop-blur-lg">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`group relative flex items-center justify-between rounded-xl px-4 py-2.5 text-sm transition-all ${
                    active
                      ? "bg-gradient-to-r from-[#991B3D] to-[#620821] text-white border border-[#FFA3B9]/80 shadow-[0_0_20px_rgba(232,115,141,0.5),inset_0_1px_1px_rgba(255,255,255,0.4)] font-heading font-bold"
                      : "bg-gradient-to-r from-[#3d0818]/40 to-[#160207]/60 text-[#E8DFD7] border border-[#B82A4F]/25 hover:text-white hover:border-[#E8738D]/50 font-heading font-semibold"
                  }`}
                >
                  <span className="drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">{link.label}</span>
                  {active && (
                    <span className="w-2 h-2 rounded-full bg-[#FFEBF0] shadow-[0_0_8px_#FFF] animate-pulse" />
                  )}
                </Link>
              );
            })}

            <Link
              href="/register"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 text-center rounded-xl bg-gradient-to-r from-[#991B3D] to-[#B82A4F] border border-[#FFA3B9]/80 py-2.5 text-xs font-heading font-extrabold uppercase tracking-wider text-white shadow-[0_0_15px_rgba(184,42,79,0.5)]"
            >
              Register Now →
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
