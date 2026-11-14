import Link from "next/link";

export default function PastEditionsCTA() {
  return (
    <section className="relative w-full py-16 border-b border-[rgba(255,255,255,0.08)] bg-[#160207] overflow-hidden">
      <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-20 2xl:px-24">
        <div className="editorial-card rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-heading text-xl sm:text-2xl font-black uppercase tracking-tight text-[#F6F0E8]">
              Ready to Explore the Problem Statements?
            </h3>
            <p className="text-sm sm:text-base text-[#E0D4C3] mt-1 font-normal">
              Inspect all historical engineering challenge tracks released during past editions.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/problem-statements"
              className="btn-pill-primary inline-flex items-center gap-2 py-3 px-6 text-xs font-bold uppercase tracking-wider"
            >
              <span>Explore Problem Statements Archive →</span>
            </Link>
            <Link
              href="/event"
              className="btn-pill-secondary inline-flex items-center gap-2 py-3 px-6 text-xs font-bold uppercase tracking-wider"
            >
              <span>View Edition 5.0 →</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
