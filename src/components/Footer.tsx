"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative w-full bg-[#380412] text-[#F6F0E8] border-t-2 border-[#160207]">
      <div className="w-full px-6 sm:px-10 lg:px-12 py-12 lg:py-16">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-12">
          
          {/* Brand & Attribution (5 cols on lg) */}
          <div className="lg:col-span-5 flex flex-col items-start pr-0 lg:pr-8">
            <Link href="/" className="flex items-center gap-3 mb-4 group">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-[#160207] bg-[#991B3D] text-white shadow-hard-xs group-hover:-translate-y-0.5 transition-transform">
                <span className="font-heading font-black text-lg">CR</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-heading text-xl font-bold tracking-tight text-white group-hover:text-[#F6F0E8] transition-colors">
                    CODE RELAY 5.0
                  </span>
                  <span className="rounded border border-[#160207] bg-[#991B3D] px-2 py-0.5 text-[11px] font-bold uppercase text-white shadow-hard-xs">
                    Edition 5.0
                  </span>
                </div>
                <span className="text-xs font-medium text-[#D8CCD0]">
                  National Collegiate Hackathon
                </span>
              </div>
            </Link>

            <p className="text-sm text-[#D8CCD0] max-w-md mb-6 leading-relaxed">
              Organized by the <strong className="text-white font-semibold">Web and Design Society (WebnD)</strong> at the Indian Institute of Technology Bhubaneswar. Fostering nationwide collegiate engineering, protocol design, and rapid prototyping.
            </p>

            {/* Society attribution */}
            <div className="rounded-lg border-2 border-[#160207] bg-[#22020A] px-4 py-2 shadow-hard-xs">
              <span className="text-xs font-heading font-semibold text-[#F6F0E8]">
                Web and Design Society, IIT Bhubaneswar
              </span>
            </div>
          </div>

          {/* Primary Navigation Links (2 cols on lg) */}
          <div className="lg:col-span-2 flex flex-col space-y-3">
            <span className="font-heading text-xs font-bold uppercase tracking-wider text-white mb-1">
              Navigation
            </span>
            <Link href="/" className="text-sm text-[#D8CCD0] hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/event" className="text-sm text-[#D8CCD0] hover:text-white transition-colors">
              The Event
            </Link>
            <Link href="/problem-statements" className="text-sm text-[#D8CCD0] hover:text-white transition-colors">
              Past Problem Statements
            </Link>
            <Link href="/past-editions" className="text-sm text-[#D8CCD0] hover:text-white transition-colors">
              Past Editions
            </Link>
            <Link href="/sponsors" className="text-sm text-[#D8CCD0] hover:text-white transition-colors">
              Sponsors &amp; Partners
            </Link>
          </div>

          {/* Hackathon Resources (3 cols on lg) */}
          <div className="lg:col-span-3 flex flex-col space-y-3">
            <span className="font-heading text-xs font-bold uppercase tracking-wider text-white mb-1">
              Event Details
            </span>
            <Link href="/event#tracks" className="text-sm text-[#D8CCD0] hover:text-white transition-colors">
              Web2 and Web3 Tracks
            </Link>
            <Link href="/event#format" className="text-sm text-[#D8CCD0] hover:text-white transition-colors">
              Format &amp; Eligibility
            </Link>
            <Link href="/event#schedule" className="text-sm text-[#D8CCD0] hover:text-white transition-colors">
              Provisional Schedule
            </Link>
            <Link href="/event#judging" className="text-sm text-[#D8CCD0] hover:text-white transition-colors">
              Judging Criteria &amp; Rules
            </Link>
            <Link href="/event#faq" className="text-sm text-[#D8CCD0] hover:text-white transition-colors">
              Frequently Asked Questions
            </Link>
          </div>

          {/* Connect & Contact (2 cols on lg) */}
          <div className="lg:col-span-2 flex flex-col space-y-3">
            <span className="font-heading text-xs font-bold uppercase tracking-wider text-white mb-1">
              Connect
            </span>
            <div className="flex flex-col space-y-2.5">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="text-sm text-[#D8CCD0] hover:text-white transition-colors"
              >
                GitHub (WebnD)
              </a>
              <a
                href="https://discord.gg"
                target="_blank"
                rel="noreferrer"
                className="text-sm text-[#D8CCD0] hover:text-white transition-colors"
              >
                Discord Server
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                className="text-sm text-[#D8CCD0] hover:text-white transition-colors"
              >
                Twitter / X
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="text-sm text-[#D8CCD0] hover:text-white transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="mailto:webnd@iitbbs.ac.in"
                className="text-sm text-[#F6F0E8] font-bold hover:underline"
              >
                webnd@iitbbs.ac.in
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Horizontal Bar */}
        <div className="pt-8 border-t border-[#620821] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#D8CCD0]">
          <div>
            © 2025–2026 Code Relay 5.0. Web and Design Society, Indian Institute of Technology Bhubaneswar. All rights reserved.
          </div>
          <div className="flex items-center gap-3">
            <span className="rounded border border-[#160207] bg-[#22020A] px-3 py-1 font-heading text-xs font-semibold text-[#D8CCD0] shadow-hard-xs">
              IIT Bhubaneswar
            </span>
            <span className="rounded border border-[#160207] bg-[#991B3D] px-3 py-1 font-heading text-xs font-bold text-white shadow-hard-xs">
              Edition 5.0
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
