import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer
      data-no-scroll-animate="true"
      className="relative w-full bg-[#0f0104] text-[#F6F0E8] border-t border-[#620821]/40"
    >
      <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-20 2xl:px-24 py-12 lg:py-16">

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-12">

          {/* Brand & Attribution (5 cols on lg) */}
          <div className="lg:col-span-5 flex flex-col items-start pr-0 lg:pr-8">
            <Link href="/" className="flex items-center gap-3 mb-4 group">
              <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#B82A4F]/50 bg-[#991B3D]/80 text-white shadow-[0_0_15px_rgba(153,27,61,0.4)] group-hover:scale-105 transition-transform overflow-hidden p-1">
                <Image
                  src="/assets/cr_logo.png"
                  alt="Code Relay Official Logo"
                  width={40}
                  height={40}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-heading text-xl font-bold tracking-tight text-white group-hover:text-[#F6F0E8] transition-colors">
                    CODE RELAY 5.0
                  </span>
                  <span className="rounded-full border border-[#B82A4F]/60 bg-[#991B3D] px-2 py-0.5 text-[10px] font-bold uppercase text-white shadow-hard-xs">
                    Edition 5.0
                  </span>
                </div>
                <span className="text-xs font-medium text-[#657AA8]">
                  National Collegiate Hackathon
                </span>
              </div>
            </Link>

            <p className="text-sm text-[#D6C6CC] max-w-md mb-6 leading-relaxed">
              Organized by the <strong className="text-white font-semibold">Web and Design Society (WebnD)</strong> at the Indian Institute of Technology Bhubaneswar. Fostering nationwide collegiate engineering, protocol design, and rapid prototyping.
            </p>
          </div>

          {/* Primary Navigation Links (2 cols on lg) */}
          <div className="lg:col-span-2 flex flex-col space-y-3">
            <span className="font-heading text-xs font-bold uppercase tracking-wider text-white mb-1">
              Navigation
            </span>
            <Link href="/" className="text-sm text-[#D6C6CC] hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/event" className="text-sm text-[#D6C6CC] hover:text-white transition-colors">
              The Event
            </Link>
            <Link href="/problem-statements" className="text-sm text-[#D6C6CC] hover:text-white transition-colors">
              Past Problem Statements
            </Link>
            <Link href="/past-editions" className="text-sm text-[#D6C6CC] hover:text-white transition-colors">
              Past Editions
            </Link>
            <Link href="/sponsors" className="text-sm text-[#D6C6CC] hover:text-white transition-colors">
              Sponsors &amp; Partners
            </Link>
          </div>

          {/* Hackathon Resources (3 cols on lg) */}
          <div className="lg:col-span-3 flex flex-col space-y-3">
            <span className="font-heading text-xs font-bold uppercase tracking-wider text-white mb-1">
              Event Details
            </span>
            <Link href="/event#tracks" className="text-sm text-[#D6C6CC] hover:text-white transition-colors">
              Web2 and Web3 Tracks
            </Link>
            <Link href="/event#timeline" className="text-sm text-[#D6C6CC] hover:text-white transition-colors">
              Event Timeline &amp; Rounds
            </Link>
            <Link href="/event#faq" className="text-sm text-[#D6C6CC] hover:text-white transition-colors">
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
                href="https://www.instagram.com/webnd.iitbbs/"
                target="_blank"
                rel="noreferrer"
                className="text-sm text-[#D6C6CC] hover:text-white transition-colors"
              >
                Instagram
              </a>
              <a
                href="https://www.linkedin.com/company/webd-iitbbs/"
                target="_blank"
                rel="noreferrer"
                className="text-sm text-[#D6C6CC] hover:text-white transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="mailto:secyweb.sg@iitbbs.ac.in"
                className="text-sm text-[#F6F0E8] font-bold hover:underline"
              >
                secyweb.sg@iitbbs.ac.in
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Horizontal Bar */}
        <div className="pt-8 border-t border-[#620821]/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#9E8992]">
          <div>
            © 2025–2026 Code Relay 5.0. Web and Design Society, Indian Institute of Technology Bhubaneswar. All rights reserved.
          </div>
          <div className="flex items-center gap-3">
            <span className="rounded-full border border-[#620821] bg-[#22020A] px-3 py-1 font-heading text-xs font-semibold text-[#D6C6CC]">
              IIT Bhubaneswar
            </span>
            <span className="rounded-full border border-[#B82A4F]/60 bg-[#991B3D] px-3 py-1 font-heading text-xs font-bold text-white shadow-hard-xs">
              Edition 5.0
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
