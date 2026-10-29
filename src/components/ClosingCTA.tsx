"use client";

import Link from "next/link";
import { useRegisterModal } from "@/context/RegisterModalContext";

export default function ClosingCTA() {
  const { openRegisterModal } = useRegisterModal();

  return (
    <section className="relative w-full py-16 sm:py-20 border-b-2 border-[#160207] bg-[#F6F0E8]">
      <div className="w-full px-6 sm:px-10 lg:px-12">
        <div className="relative rounded-2xl border-3 border-[#160207] bg-[#620821] p-8 sm:p-12 lg:p-16 shadow-hard-xl text-center text-white">
          <div className="max-w-3xl mx-auto flex flex-col items-center">
            {/* Tag */}
            <div className="inline-flex items-center rounded-md border-2 border-[#160207] bg-[#991B3D] px-3.5 py-1.5 shadow-hard-xs mb-4">
              <span className="font-heading text-xs font-bold text-white uppercase tracking-wider">
                Ready to Sprint?
              </span>
            </div>

            {/* Headline */}
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-4">
              Take the Relay Baton at Code Relay 5.0
            </h2>

            <p className="text-base sm:text-lg text-[#F6F0E8]/90 max-w-2xl leading-relaxed mb-8">
              Join collegiate teams nationwide for 36 hours of engineering, architecture, and deployment. Secure your spot on the priority roster today.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
              <button
                onClick={openRegisterModal}
                className="btn-pressable-hero w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-xl border-2 border-[#160207] bg-[#991B3D] hover:bg-[#7A122E] px-8 py-3.5 text-base font-heading font-black uppercase tracking-wider text-white shadow-hard-md"
              >
                <span>Register Now</span>
                <span className="text-[#F6F0E8]">→</span>
              </button>

              <Link
                href="/event"
                className="btn-pressable w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border-2 border-[#160207] bg-[#F6F0E8] hover:bg-white px-7 py-3.5 text-base font-heading font-bold text-[#620821] shadow-hard"
              >
                <span>Explore the Event</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
