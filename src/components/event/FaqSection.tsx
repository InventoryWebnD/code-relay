"use client";

import { useState } from "react";
import { FAQS } from "@/data/eventData";

export default function FaqSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <section id="faq" className="relative w-full py-16 sm:py-20 border-b-2 border-[#160207] bg-[#F6F0E8]">
      <div className="w-full px-6 sm:px-10 lg:px-12">
        <div className="flex flex-col items-start mb-12">
          <div className="inline-flex items-center gap-2 rounded-md border-2 border-[#160207] bg-[#620821] px-3 py-1 shadow-hard-xs mb-3">
            <span className="font-mono text-xs font-bold text-[#F6F0E8] uppercase tracking-wider">
              Answers &amp; Clarity
            </span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-[#620821]">
            FREQUENTLY ASKED QUESTIONS
          </h2>
          <p className="mt-2 text-base text-[#48232C] max-w-3xl font-medium">
            Got questions about eligibility, tech stack requirements, logistics, or relay teams? Find answers below.
          </p>
        </div>

        <div className="max-w-4xl space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="rounded-xl border-2 border-[#160207] bg-[#FFFDF9] shadow-hard-sm overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-heading text-base sm:text-lg font-bold text-[#620821] hover:text-[#991B3D] transition-colors"
                >
                  <span>{faq.q}</span>
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border-2 border-[#160207] text-base font-black transition-transform duration-200 ${
                      isOpen
                        ? "bg-[#991B3D] text-white rotate-45"
                        : "bg-[#F6F0E8] text-[#620821]"
                    }`}
                  >
                    +
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0 text-sm text-[#48232C] leading-relaxed border-t border-[#E0D4C3] mt-1 pt-4">
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

