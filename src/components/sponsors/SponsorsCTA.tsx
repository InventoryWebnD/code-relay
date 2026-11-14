import Link from "next/link";

export default function SponsorsCTA() {
  return (
    <section className="relative w-full py-16 border-b border-[rgba(255,255,255,0.08)] bg-[#160207] overflow-hidden">
      <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-20 2xl:px-24">
        <div className="editorial-card rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-heading text-xl sm:text-2xl font-black uppercase tracking-tight text-[#F6F0E8]">
              Looking for Event Specifications?
            </h3>
            <p className="text-sm sm:text-base text-[#E0D4C3] mt-1 font-normal">
              Explore our dual track architecture and provisional marathon schedule.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/event"
              className="btn-pill-primary inline-flex items-center gap-2 py-3 px-6 text-xs font-bold uppercase tracking-wider"
            >
              <span>The Event Overview →</span>
            </Link>
            <Link
              href="/"
              className="btn-pill-secondary inline-flex items-center gap-2 py-3 px-6 text-xs font-bold uppercase tracking-wider"
            >
              <span>Back to Home →</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
