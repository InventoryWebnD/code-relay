import { PARTNERSHIP_OPTIONS } from "@/data/sponsorsData";

export default function SponsorshipTiersSection() {
  return (
    <section className="relative w-full py-16 sm:py-24 border-b border-[rgba(255,255,255,0.08)] bg-[#160207] overflow-hidden">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute -top-12 right-1/4 h-[400px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(153,27,61,0.2)_0%,transparent_70%)] blur-3xl" />

      <div className="relative w-full px-6 sm:px-10 lg:px-16 xl:px-20 2xl:px-24 z-10">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#B82A4F]/40 bg-[#991B3D]/15 px-3 py-1 mb-4">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#E8738D]">
              Engagement Packages
            </span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-[#F6F0E8]">
            PARTNERSHIP OPTIONS
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#E0D4C3] max-w-3xl font-normal leading-relaxed">
            Structured engagement packages crafted to align with your organization&apos;s strategic objectives — from exclusive title branding and technical track ownership to high-signal recruitment and targeted developer bounties.
          </p>
        </div>

        {/* 2x2 Grid in Website Theme */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {PARTNERSHIP_OPTIONS.map((option) => {
            const isTitle = option.id === "title-partner";

            return (
              <div
                key={option.id}
                className={`editorial-card relative flex flex-col justify-between rounded-2xl p-6 sm:p-8 group transition-all duration-300 ${
                  isTitle
                    ? "border-[#991B3D]/60 hover:border-[#B82A4F] shadow-[0_20px_45px_-12px_rgba(153,27,61,0.35)]"
                    : "hover:border-[rgba(255,255,255,0.25)]"
                }`}
              >
                <div>
                  {/* Top Badge & Tier Number */}
                  <div className="flex items-center justify-between pb-4 border-b border-[rgba(255,255,255,0.08)] mb-5">
                    <span className="font-mono text-xs font-bold text-[#E8738D] tracking-wider uppercase">
                      Tier {option.number}
                    </span>
                    <span
                      className={`rounded-full border px-3 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider ${option.badgeColor}`}
                    >
                      {option.badge}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-heading text-2xl sm:text-3xl font-black uppercase text-[#F6F0E8] mb-5 tracking-tight leading-snug">
                    {option.title}
                  </h3>

                  {/* Deliverables List */}
                  <div className="mb-6">
                    <span className="font-mono text-[11px] font-bold uppercase text-[#8E9DBE] mb-3 block tracking-wider">
                      Key Deliverables &amp; Benefits:
                    </span>
                    <ul className="divide-y divide-[rgba(255,255,255,0.06)]">
                      {option.deliverables.map((item, idx) => (
                        <li
                          key={idx}
                          className="py-3 flex items-start gap-3 text-xs sm:text-sm text-[#E0D4C3] font-normal leading-relaxed"
                        >
                          <span className="text-[#E8738D] font-bold select-none shrink-0">
                            —
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Bottom Bar */}
                <div className="pt-4 border-t border-[rgba(255,255,255,0.08)] flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold text-[#8E9DBE]">
                    Status: Open for Invitation
                  </span>
                  <a
                    href="#contact"
                    className="btn-pill-primary inline-flex items-center gap-2 py-1.5 px-4 text-xs font-bold uppercase tracking-wider"
                  >
                    <span>Inquire</span>
                    <span>→</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Section Footer Callout */}
        <div className="editorial-card rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-heading text-lg sm:text-xl font-bold uppercase text-[#F6F0E8]">
              Need a Custom Engagement Structure?
            </h4>
            <p className="text-xs sm:text-sm text-[#E0D4C3] mt-1 font-normal">
              We design bespoke sponsorship packages with custom problem tracks, private hiring roundtables, and co-branded developer bounties.
            </p>
          </div>
          <a
            href="#contact"
            className="btn-pill-primary shrink-0 py-2.5 px-6 text-xs font-bold uppercase tracking-wider"
          >
            <span>Connect With Us →</span>
          </a>
        </div>
      </div>
    </section>
  );
}
