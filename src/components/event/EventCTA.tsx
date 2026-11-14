"use client";

import Link from "next/link";
import Image from "next/image";
import { useRegisterModal } from "@/context/RegisterModalContext";

export default function EventCTA() {
  const { openRegisterModal } = useRegisterModal();

  return (
    <section className="relative w-full py-20 border-b border-[rgba(255,255,255,0.08)] bg-[#160207] overflow-hidden">
      <div className="relative w-full px-6 sm:px-10 lg:px-16 xl:px-20 2xl:px-24">
        <div className="editorial-card relative rounded-3xl p-8 sm:p-12 lg:p-16 text-center overflow-hidden">
          {/* Radial wine glow */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(153,27,61,0.35)_0%,rgba(98,8,33,0.15)_40%,transparent_75%)]" />

          <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
            {/* 3D Decorative Vignette */}
            <div
              className="portal-vignette relative w-28 h-28 sm:w-36 sm:h-36 flex items-center justify-center mb-6"
              data-parallax="true"
              data-parallax-speed="0.12"
            >
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(153,27,61,0.5)_0%,transparent_70%)] blur-md" />
              <div className="relative w-24 h-24 sm:w-28 sm:h-28">
                <Image
                  src="/decoratives/laptop.webp"
                  alt="Relay Arena Terminal"
                  fill
                  className="object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]"
                />
              </div>
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-[#F6F0E8] mb-4">
              Step Into the Relay Arena
            </h2>

            <p className="text-base sm:text-lg text-[#E0D4C3] max-w-2xl leading-relaxed mb-8 font-normal">
              Join collegiate engineers from IITs, NITs, and top institutions nationwide for 36 hours of rigorous engineering and live product demos.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
              <button
                onClick={openRegisterModal}
                className="btn-pill-primary w-full sm:w-auto inline-flex items-center justify-center gap-3 py-3.5 px-8 text-xs font-bold uppercase tracking-wider"
              >
                <span>Register for Code Relay 5.0</span>
                <span>→</span>
              </button>
              <Link
                href="/problem-statements"
                className="btn-pill-secondary w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3.5 px-7 text-xs font-bold uppercase tracking-wider"
              >
                <span>Inspect Problem Statements</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
