"use client";

import { useState } from "react";
import { FAQS } from "@/data/eventData";

export default function FaqSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <section id="faq" className="relative w-full py-20 border-b border-[rgba(255,255,255,0.08)] bg-[#160207] overflow-hidden">
      <div className="relative w-full px-6 sm:px-10 lg:px-16 xl:px-20 2xl:px-24">
        <div className="flex flex-col items-start mb-12 sm:mb-16">
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-[#F6F0E8]">
            FREQUENTLY ASKED QUESTIONS
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#E0D4C3] max-w-3xl font-normal leading-relaxed">
            Got questions about eligibility, tech stack requirements, logistics, or relay teams? Find answers below.
          </p>
        </div>

        <div className="max-w-4xl space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="editorial-card rounded-2xl overflow-hidden transition-all duration-300"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-heading text-base sm:text-lg font-bold text-[#F6F0E8] hover:text-[#E8738D] transition-colors"
                >
                  <span>{faq.q}</span>
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[rgba(255,255,255,0.15)] text-base font-black transition-transform duration-300 ${
                      isOpen
                        ? "bg-[#991B3D] text-white rotate-45"
                        : "bg-white/5 text-[#E0D4C3]"
                    }`}
                  >
                    +
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0 text-sm text-[#E0D4C3] leading-relaxed border-t border-[rgba(255,255,255,0.06)] mt-1 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
