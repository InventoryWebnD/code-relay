"use client";

import Link from "next/link";
import { useRegisterModal } from "@/context/RegisterModalContext";

export default function EventCTA() {
  const { openRegisterModal } = useRegisterModal();

  return (
    <section className="relative w-full py-20 border-b-2 border-[#160207] bg-[#F6F0E8]">
      <div className="w-full px-6 sm:px-10 lg:px-12">
        <div className="rounded-2xl border-3 border-[#160207] bg-[#620821] p-8 sm:p-12 lg:p-16 shadow-hard-xl text-center text-white">
          <div className="max-w-3xl mx-auto flex flex-col items-center">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#E0D4C3] mb-3">
              Edition 5.0 Priority Access
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white mb-4">
              Step Into the Relay Arena
            </h2>
            <p className="text-base sm:text-lg text-[#F6F0E8]/90 max-w-2xl leading-relaxed mb-8">
              Join collegiate engineers from IITs, NITs, and top institutions nationwide for 36 hours of rigorous engineering and live product demos.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
              <button
                onClick={openRegisterModal}
                className="btn-pressable-hero w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-xl border-2 border-[#160207] bg-[#991B3D] hover:bg-[#7A122E] px-8 py-3.5 text-base font-heading font-black uppercase tracking-wider text-white shadow-hard-md"
              >
                <span>Register for Code Relay 5.0</span>
                <span>→</span>
              </button>
              <Link
                href="/problem-statements"
                className="btn-pressable w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border-2 border-[#160207] bg-[#FFFDF9] hover:bg-[#EADBCC] px-7 py-3.5 text-base font-heading font-bold text-[#620821] shadow-hard"
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

