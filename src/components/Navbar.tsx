"use client";

import { useState } from "react";
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

  return (
    <header className="sticky top-0 z-40 w-full border-b-2 border-[#160207] bg-[#F6F0E8]/95 backdrop-blur-sm">
      <div className="w-full flex items-center justify-between px-6 sm:px-10 lg:px-12 py-3.5">
        
        {/* Brand / Logo */}
        <Link href="/" className="group flex items-center gap-3">
          {/* 2.5D Dimensional Icon Badge */}
          <div className="relative flex h-10 w-10 items-center justify-center rounded-lg border-2 border-[#160207] bg-[#991B3D] shadow-hard-xs transition-transform group-hover:-translate-y-0.5 group-hover:shadow-hard-sm">
            <span className="font-heading font-black text-white text-lg tracking-wider">CR</span>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-heading text-lg sm:text-xl font-bold tracking-tight text-[#620821] group-hover:text-[#991B3D] transition-colors">
                CODE RELAY
              </span>
              <span className="rounded-md border border-[#160207] bg-[#991B3D] px-1.5 py-0.2 text-[11px] font-black uppercase text-white shadow-hard-xs">
                5.0
              </span>
            </div>
            <span className="text-[11px] font-medium tracking-wide text-[#4B5D86]">
              WebnD, IIT Bhubaneswar
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative rounded-lg px-3.5 py-1.5 text-xs xl:text-sm font-bold transition-all ${
                  active
                    ? "border-2 border-[#160207] bg-[#991B3D] text-white shadow-hard-xs"
                    : "text-[#48232C] hover:text-[#991B3D] hover:bg-[#EADBCC]/60"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Far Right CTA */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={handleRegister}
            className="btn-pressable relative inline-flex items-center justify-center rounded-lg border-2 border-[#160207] bg-[#991B3D] hover:bg-[#7A122E] px-6 py-2 text-sm font-bold text-white shadow-hard transition-all active:translate-x-0.5 active:translate-y-0.5 active:shadow-hard-xs"
          >
            Register Now
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={handleRegister}
            className="btn-pressable rounded-md border-2 border-[#160207] bg-[#991B3D] px-3 py-1.5 text-xs font-bold text-white shadow-hard-xs sm:hidden"
          >
            Register
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="flex h-9 w-9 items-center justify-center rounded-lg border-2 border-[#160207] bg-[#FFFDF9] text-[#620821] shadow-hard-xs"
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

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t-2 border-[#160207] bg-[#FFFDF9] px-6 py-4 space-y-2 shadow-hard-md">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block rounded-lg px-3 py-2 text-sm font-bold transition-all ${
                  active
                    ? "border-2 border-[#160207] bg-[#991B3D] text-white shadow-hard-xs"
                    : "text-[#48232C] hover:text-[#991B3D] hover:bg-[#F6F0E8]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleRegister();
              }}
              className="w-full btn-pressable rounded-lg border-2 border-[#160207] bg-[#991B3D] py-2.5 text-center text-sm font-bold text-white shadow-hard"
            >
              Register Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
