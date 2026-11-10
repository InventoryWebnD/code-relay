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
    <section id="contact" className="relative w-full py-16 sm:py-20 border-b-2 border-[#160207] bg-[#F6F0E8]">
      <div className="w-full px-6 sm:px-10 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left 6 cols: Info & Contact details */}
          <div className="lg:col-span-6 rounded-2xl border-3 border-[#160207] bg-[#620821] text-white p-6 sm:p-8 shadow-hard-lg flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-md border-2 border-[#160207] bg-[#380412] px-3 py-1 shadow-hard-xs mb-4">
                <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                  Direct Sponsor Engagement
                </span>
              </div>

              <h3 className="font-heading text-2xl sm:text-3xl font-black uppercase text-white mb-4">
                Partner With Code Relay 5.0
              </h3>

              <p className="text-sm text-[#F6F0E8]/90 leading-relaxed mb-6 font-normal">
                Whether you are looking to hire top-tier student software engineers, benchmark developer tools, sponsor targeted track bounties, or build brand affinity with India&apos;s collegiate tech community, our sponsorship leads are ready to collaborate.
              </p>

              <div className="space-y-4">
                <div className="rounded-xl border border-[#160207] bg-[#380412] p-4">
                  <span className="block font-mono text-xs text-[#D8CCD0] uppercase mb-1">
                    Official Society Partnership Email
                  </span>
                  <a
                    href="mailto:webnd@iitbbs.ac.in"
                    className="font-mono text-sm font-bold text-[#F6F0E8] hover:underline"
                  >
                    webnd@iitbbs.ac.in
                  </a>
                </div>

                <div className="rounded-xl border border-[#160207] bg-[#380412] p-4">
                  <span className="block font-mono text-xs text-[#D8CCD0] uppercase mb-1">
                    Host Institution
                  </span>
                  <span className="font-heading text-sm font-bold text-white block">
                    Indian Institute of Technology Bhubaneswar
                  </span>
                  <span className="text-xs text-[#D8CCD0]">
                    Web and Design Society (WebnD) · Argul, Jatni, Odisha 752050
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#380412] mt-6 flex items-center justify-between">
              <span className="text-xs font-mono text-[#D8CCD0]">Prospectus Edition 5.0</span>
              <a
                href="mailto:webnd@iitbbs.ac.in?subject=Request%20Code%20Relay%205.0%20Sponsorship%20Deck"
                className="btn-pressable inline-flex items-center gap-2 rounded-lg border-2 border-[#160207] bg-[#991B3D] hover:bg-[#7A122E] px-4 py-2 text-xs font-bold uppercase text-white shadow-hard-xs"
              >
                <span>Request Full Deck</span>
                <span>↓</span>
              </a>
            </div>
          </div>

          {/* Right 6 cols: Quick Inquiry Form */}
          <div className="lg:col-span-6 rounded-2xl border-3 border-[#160207] bg-[#FFFDF9] p-6 sm:p-8 shadow-hard-lg text-[#1E030A]">
            {formSubmitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-8">
                <div className="h-16 w-16 rounded-xl border-2 border-[#160207] bg-[#991B3D] text-white flex items-center justify-center shadow-hard mb-4">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="font-heading text-2xl font-black uppercase text-[#620821] mb-2">
                  Inquiry Received!
                </h4>
                <p className="text-sm text-[#48232C] max-w-sm leading-relaxed mb-6">
                  Thank you, <strong className="text-[#620821]">{inquiryName || "Partner"}</strong>. Our sponsorship team at WebnD IIT Bhubaneswar will reach out to <span className="font-mono text-[#991B3D] font-bold">{inquiryEmail}</span> within 24 hours with our full partnership deck and package details.
                </p>
                <button
                  type="button"
                  onClick={handleResetForm}
                  className="btn-pressable rounded-xl border-2 border-[#160207] bg-[#991B3D] hover:bg-[#7A122E] px-6 py-2.5 text-xs font-bold uppercase text-white shadow-hard-xs"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <h4 className="font-heading text-xl font-black uppercase text-[#620821] mb-1">
                    Quick Partnership Inquiry
                  </h4>
                  <p className="text-xs text-[#6D4B54]">
                    Submit your details to receive our comprehensive sponsorship prospectus and engagement deck.
                  </p>
                </div>

                <div>
                  <label className="block font-mono text-xs font-bold text-[#48232C] uppercase mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={inquiryName}
                    onChange={(e) => setInquiryName(e.target.value)}
                    placeholder="Jane Doe"
                    className="w-full rounded-xl border-2 border-[#160207] bg-[#FFFFFF] px-4 py-2.5 text-sm font-medium text-[#1E030A] placeholder-slate-400 shadow-hard-xs focus:border-[#991B3D] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs font-bold text-[#48232C] uppercase mb-1">
                    Work / Organization Email
                  </label>
                  <input
                    type="email"
                    required
                    value={inquiryEmail}
                    onChange={(e) => setInquiryEmail(e.target.value)}
                    placeholder="jane@company.com"
                    className="w-full rounded-xl border-2 border-[#160207] bg-[#FFFFFF] px-4 py-2.5 text-sm font-medium text-[#1E030A] placeholder-slate-400 shadow-hard-xs focus:border-[#991B3D] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs font-bold text-[#48232C] uppercase mb-1">
                    Company / Organization Name
                  </label>
                  <input
                    type="text"
                    required
                    value={inquiryCompany}
                    onChange={(e) => setInquiryCompany(e.target.value)}
                    placeholder="Acme Technologies Ltd."
                    className="w-full rounded-xl border-2 border-[#160207] bg-[#FFFFFF] px-4 py-2.5 text-sm font-medium text-[#1E030A] placeholder-slate-400 shadow-hard-xs focus:border-[#991B3D] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs font-bold text-[#48232C] uppercase mb-1">
                    Preferred Partnership Category
                  </label>
                  <select
                    value={inquiryInterest}
                    onChange={(e) => setInquiryInterest(e.target.value)}
                    className="w-full rounded-xl border-2 border-[#160207] bg-[#FFFFFF] px-4 py-2.5 text-sm font-medium text-[#1E030A] shadow-hard-xs focus:border-[#991B3D] focus:outline-none"
                  >
                    {PARTNERSHIP_CATEGORIES.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full btn-pressable rounded-xl border-2 border-[#160207] bg-[#991B3D] hover:bg-[#7A122E] py-3 text-center font-heading text-sm font-black uppercase tracking-wider text-white shadow-hard-sm"
                >
                  Send Sponsorship Request
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

