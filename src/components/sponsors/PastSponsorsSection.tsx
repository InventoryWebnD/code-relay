"use client";

import { useState } from "react";
import { PAST_EDITIONS_SPONSORS, PastSponsorItem } from "@/data/sponsorsData";

function SponsorLogoImage({ sponsor }: { sponsor: PastSponsorItem }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="h-12 w-28 sm:w-36 rounded-xl bg-white/95 p-2 flex items-center justify-center shrink-0 shadow-md border border-white/20 overflow-hidden">
      {!imgError ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={sponsor.logoUrl}
          alt={`${sponsor.name} logo`}
          className="max-h-full max-w-full object-contain"
          onError={() => setImgError(true)}
          loading="lazy"
        />
      ) : (
        <span className="font-heading font-black text-xs text-[#160207] tracking-tight uppercase">
          {sponsor.name}
        </span>
      )}
    </div>
  );
}

export default function PastSponsorsSection() {
  return (
    <section className="relative w-full py-16 sm:py-20 border-b border-[rgba(255,255,255,0.08)] bg-[#160207] overflow-hidden">
      {/* Background glow accent */}
      <div className="pointer-events-none absolute top-1/2 left-1/4 -translate-y-1/2 h-[350px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(153,27,61,0.18)_0%,transparent_70%)] blur-3xl" />

      <div className="relative w-full px-6 sm:px-10 lg:px-16 xl:px-20 2xl:px-24 z-10">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#B82A4F]/40 bg-[#991B3D]/15 px-3 py-1 mb-3">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#E8738D]">
              Historical Legacy
            </span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-[#F6F0E8]">
            PAST SPONSORS &amp; PARTNERS
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#E0D4C3] max-w-3xl font-normal leading-relaxed">
            Leading industry pioneers, developer tooling creators, and cloud infrastructure platforms that supported previous editions of Code Relay at IIT Bhubaneswar.
          </p>
        </div>

        {/* Editions Stack */}
        <div className="space-y-12">
          {PAST_EDITIONS_SPONSORS.map((editionGroup) => (
            <div key={editionGroup.edition} className="flex flex-col">
              {/* Edition Header Badge */}
              <div className="flex items-center gap-3 mb-6 pb-3 border-b border-[rgba(255,255,255,0.08)]">
                <span className={`rounded-full px-3 py-1 text-xs font-mono font-bold uppercase ${editionGroup.badgeBg} shadow-sm`}>
                  {editionGroup.edition}
                </span>
                <span className="font-mono text-xs text-[#E0D4C3]/70">
                  Edition {editionGroup.year}
                </span>
              </div>

              {/* Sponsor Cards Grid */}
              <div
                className={`grid grid-cols-1 ${
                  editionGroup.sponsors.length === 2
                    ? "md:grid-cols-2"
                    : "md:grid-cols-2 lg:grid-cols-3"
                } gap-6`}
              >
                {editionGroup.sponsors.map((sponsor) => (
                  <div
                    key={sponsor.name}
                    className="editorial-card rounded-2xl p-6 flex flex-col justify-between group hover:border-[rgba(255,255,255,0.25)] transition-all duration-300"
                  >
                    <div>
                      {/* Top Actual Web Logo & Category Badge */}
                      <div className="flex items-start justify-between gap-4 mb-4 pb-4 border-b border-[rgba(255,255,255,0.08)]">
                        <SponsorLogoImage sponsor={sponsor} />
                        <span className="rounded-full border border-[rgba(255,255,255,0.12)] bg-white/5 px-2.5 py-1 text-[10px] font-mono font-bold uppercase text-[#E8738D] shrink-0">
                          {sponsor.badge}
                        </span>
                      </div>

                      {/* Sponsor Name & Tagline */}
                      <h3 className="font-heading text-lg sm:text-xl font-black tracking-tight text-[#F6F0E8] mb-1">
                        {sponsor.name}
                      </h3>
                      {sponsor.tagline && (
                        <h4 className="font-mono text-xs font-medium text-[#8E9DBE] mb-3">
                          {sponsor.tagline}
                        </h4>
                      )}

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-[#E0D4C3] leading-relaxed font-normal mb-4">
                        {sponsor.description}
                      </p>
                    </div>

                    {/* Bottom link & meta */}
                    <div className="pt-4 border-t border-[rgba(255,255,255,0.08)] flex items-center justify-between text-xs">
                      <span className="font-mono text-[11px] text-[#8E9DBE] uppercase">
                        {editionGroup.shortCode} Partner
                      </span>
                      {sponsor.website && (
                        <a
                          href={sponsor.website}
                          target="_blank"
                          rel="noreferrer"
                          className="font-mono text-xs font-bold text-[#E8738D] hover:text-[#F6F0E8] inline-flex items-center gap-1 transition-colors"
                        >
                          <span>Visit Website</span>
                          <span>↗</span>
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
