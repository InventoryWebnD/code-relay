import Link from "next/link";

export default function PastEditionsCTA() {
  return (
    <section className="relative w-full py-12 border-b-2 border-[#160207] bg-[#F6F0E8]">
      <div className="w-full px-6 sm:px-10 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-heading text-xl font-bold text-[#620821]">
            Ready to Explore the Problem Statements?
          </h3>
          <p className="text-sm text-[#48232C] mt-0.5 font-medium">
            Inspect all historical engineering challenge tracks released during past editions.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/problem-statements"
            className="btn-pressable rounded-xl border-2 border-[#160207] bg-[#991B3D] hover:bg-[#7A122E] px-5 py-2.5 text-xs font-heading font-bold text-white shadow-hard-xs"
          >
            Explore Problem Statements Archive →
          </Link>
          <Link
            href="/event"
            className="btn-pressable rounded-xl border-2 border-[#160207] bg-[#FFFDF9] px-5 py-2.5 text-xs font-heading font-bold text-[#620821] shadow-hard-xs hover:bg-[#EADBCC]"
          >
            View Edition 5.0 →
          </Link>
        </div>
      </div>
    </section>
  );
}

