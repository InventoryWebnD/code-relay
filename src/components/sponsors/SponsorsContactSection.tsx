"use client";

import { useState } from "react";
import { PARTNERSHIP_CATEGORIES } from "@/data/sponsorsData";

export default function SponsorsContactSection() {
  const [inquiryName, setInquiryName] = useState("");
  const [inquiryEmail, setInquiryEmail] = useState("");
  const [inquiryCompany, setInquiryCompany] = useState("");
  const [inquiryInterest, setInquiryInterest] = useState("track");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryEmail) return;
    setFormSubmitted(true);
  };

  const handleResetForm = () => {
    setFormSubmitted(false);
    setInquiryName("");
    setInquiryEmail("");
    setInquiryCompany("");
  };

  return (
    <section id="contact" className="relative w-full py-20 border-b border-[rgba(255,255,255,0.08)] bg-[#160207] overflow-hidden">
      <div className="relative w-full px-6 sm:px-10 lg:px-16 xl:px-20 2xl:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left 6 cols: Info & Contact details */}
          <div className="lg:col-span-6 editorial-card rounded-3xl p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
            <div>
              <h3 className="font-heading text-2xl sm:text-3xl font-black uppercase text-[#F6F0E8] mb-4">
                Partner With Code Relay 5.0
              </h3>

              <p className="text-base text-[#E0D4C3] leading-relaxed mb-8 font-normal">
                Whether you are looking to hire top-tier student software engineers, benchmark developer tools, sponsor targeted track bounties, or build brand affinity with India&apos;s collegiate tech community, our sponsorship leads are ready to collaborate.
              </p>

              <div className="space-y-4">
                <div className="rounded-2xl border border-[rgba(255,255,255,0.06)] bg-white/5 p-4 sm:p-5">
                  <span className="block font-mono text-xs text-[#E8738D] uppercase mb-1">
                    Official Society Partnership Email
                  </span>
                  <a
                    href="mailto:secyweb.sg@iitbbs.ac.in"
                    className="font-mono text-sm sm:text-base font-bold text-[#F6F0E8] hover:text-[#E8738D] transition-colors"
                  >
                    secyweb.sg@iitbbs.ac.in
                  </a>
                </div>

                <div className="rounded-2xl border border-[rgba(255,255,255,0.06)] bg-white/5 p-4 sm:p-5">
                  <span className="block font-mono text-xs text-[#E8738D] uppercase mb-1">
                    Host Institution
                  </span>
                  <span className="font-heading text-sm sm:text-base font-bold text-[#F6F0E8] block">
                    Indian Institute of Technology Bhubaneswar
                  </span>
                  <span className="text-xs text-[#E0D4C3] font-normal block mt-1">
                    Web and Design Society (WebnD) · Argul, Jatni, Odisha 752050
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[rgba(255,255,255,0.08)] mt-8 flex items-center justify-between">
              <span className="text-xs font-mono text-[#E0D4C3]/70">Prospectus Edition 5.0</span>
              <a
                href="mailto:secyweb.sg@iitbbs.ac.in?subject=Request%20Code%20Relay%205.0%20Sponsorship%20Deck"
                className="btn-pill-primary inline-flex items-center gap-2 py-2 px-5 text-xs font-bold uppercase tracking-wider"
              >
                <span>Request Full Deck</span>
                <span>↓</span>
              </a>
            </div>
          </div>

          {/* Right 6 cols: Quick Inquiry Form */}
          <div className="lg:col-span-6 editorial-card rounded-3xl p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
            {formSubmitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-8">
                <div className="h-16 w-16 rounded-full bg-[#991B3D] text-white flex items-center justify-center shadow-lg mb-6">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="font-heading text-2xl sm:text-3xl font-black uppercase text-[#F6F0E8] mb-3">
                  Inquiry Received!
                </h4>
                <p className="text-sm sm:text-base text-[#E0D4C3] max-w-sm leading-relaxed mb-8 font-normal">
                  Thank you, <strong className="text-[#F6F0E8]">{inquiryName || "Partner"}</strong>. Our sponsorship team at WebnD IIT Bhubaneswar will reach out to <span className="font-mono text-[#E8738D] font-bold">{inquiryEmail}</span> within 24 hours with our full partnership deck and package details.
                </p>
                <button
                  type="button"
                  onClick={handleResetForm}
                  className="btn-pill-primary px-8 py-3 text-xs font-bold uppercase tracking-wider"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <h4 className="font-heading text-xl sm:text-2xl font-black uppercase text-[#F6F0E8] mb-1.5">
                    Quick Partnership Inquiry
                  </h4>
                  <p className="text-xs sm:text-sm text-[#E0D4C3] font-normal">
                    Submit your details to receive our comprehensive sponsorship prospectus and engagement deck.
                  </p>
                </div>

                <div>
                  <label className="block font-mono text-xs font-bold text-[#E8738D] uppercase mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={inquiryName}
                    onChange={(e) => setInquiryName(e.target.value)}
                    placeholder="Jane Doe"
                    className="w-full rounded-xl border border-[rgba(255,255,255,0.12)] bg-[#100104] px-4 py-2.5 text-sm font-medium text-[#F6F0E8] placeholder-[#E0D4C3]/40 focus:border-[#991B3D] focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs font-bold text-[#E8738D] uppercase mb-1.5">
                    Work / Organization Email
                  </label>
                  <input
                    type="email"
                    required
                    value={inquiryEmail}
                    onChange={(e) => setInquiryEmail(e.target.value)}
                    placeholder="jane@company.com"
                    className="w-full rounded-xl border border-[rgba(255,255,255,0.12)] bg-[#100104] px-4 py-2.5 text-sm font-medium text-[#F6F0E8] placeholder-[#E0D4C3]/40 focus:border-[#991B3D] focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs font-bold text-[#E8738D] uppercase mb-1.5">
                    Company / Organization Name
                  </label>
                  <input
                    type="text"
                    required
                    value={inquiryCompany}
                    onChange={(e) => setInquiryCompany(e.target.value)}
                    placeholder="Acme Technologies Ltd."
                    className="w-full rounded-xl border border-[rgba(255,255,255,0.12)] bg-[#100104] px-4 py-2.5 text-sm font-medium text-[#F6F0E8] placeholder-[#E0D4C3]/40 focus:border-[#991B3D] focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs font-bold text-[#E8738D] uppercase mb-1.5">
                    Preferred Partnership Category
                  </label>
                  <select
                    value={inquiryInterest}
                    onChange={(e) => setInquiryInterest(e.target.value)}
                    className="w-full rounded-xl border border-[rgba(255,255,255,0.12)] bg-[#100104] px-4 py-2.5 text-sm font-medium text-[#F6F0E8] focus:border-[#991B3D] focus:outline-none transition-all"
                  >
                    {PARTNERSHIP_CATEGORIES.map((category) => (
                      <option key={category.value} value={category.value} className="bg-[#160207] text-[#F6F0E8]">
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full btn-pill-primary py-3.5 text-center text-xs font-bold uppercase tracking-wider"
                  >
                    Send Sponsorship Request
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
