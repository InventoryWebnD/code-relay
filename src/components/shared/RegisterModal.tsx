"use client";

import Image from "next/image";
import Link from "next/link";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RegisterModal({ isOpen, onClose }: RegisterModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div 
        className="editorial-card relative w-full max-w-lg rounded-3xl border border-[rgba(255,255,255,0.15)] bg-[#1a0309]/95 p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.85)] text-left animate-in fade-in zoom-in-95 duration-200 overflow-hidden"
      >
        {/* Top ambient highlight */}
        <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#FFA3B9]/70 to-transparent" />

        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(255,255,255,0.15)] bg-white/5 text-[#E0D4C3] hover:bg-[#991B3D] hover:text-white transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div>
          {/* Header Badge */}
          <div className="flex items-center gap-2 mb-3">
            <div className="relative w-5 h-5 shrink-0 rounded overflow-hidden">
              <Image
                src="/assets/cr_logo.png"
                alt="Code Relay Logo"
                width={20}
                height={20}
                className="w-full h-full object-contain"
              />
            </div>
            <span className="font-mono text-xs font-bold text-[#FFA3B9] uppercase tracking-wider">
              Admission Portal · Edition 5.0
            </span>
          </div>

          <h3 className="font-heading text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#F6F0E8] mb-2">
            Register for Code Relay 5.0
          </h3>
          <p className="text-sm text-[#E0D4C3] leading-relaxed mb-6 font-normal">
            Official collegiate registrations are now open. Create your participant profile, choose your track, and assemble your relay squad.
          </p>

          <div className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-white/5 p-4 mb-6 space-y-2 text-xs font-mono text-[#D6C6CC]">
            <div className="flex items-center gap-2 text-[#FFA3B9]">
              <span>✓</span>
              <span>Online Profile &amp; Architecture Submission (Round 1)</span>
            </div>
            <div className="flex items-center gap-2 text-[#FFA3B9]">
              <span>✓</span>
              <span>36-Hour Offline Relay Sprint @ IIT Bhubaneswar (Round 2)</span>
            </div>
            <div className="flex items-center gap-2 text-[#FFA3B9]">
              <span>✓</span>
              <span>Web2 &amp; Web3 Dual Competition Tracks</span>
            </div>
          </div>

          <div className="space-y-3">
            <Link
              href="/register"
              onClick={onClose}
              className="btn-pill-primary w-full py-3.5 text-center text-xs sm:text-sm font-bold uppercase tracking-wider block"
            >
              <span>Go to Full Registration Form</span>
              <span className="ml-2">→</span>
            </Link>

            <button
              type="button"
              onClick={onClose}
              className="w-full text-center py-2 text-xs font-mono text-[#E0D4C3]/70 hover:text-white transition-colors"
            >
              Cancel &amp; Return
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
