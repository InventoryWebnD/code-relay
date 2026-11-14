import { TESTIMONIALS } from "@/data/pastEditionsData";

export default function AlumniVoicesSection() {
  return (
    <section className="relative w-full py-20 border-b border-[rgba(255,255,255,0.08)] bg-[#160207] overflow-hidden">
      <div className="relative w-full px-6 sm:px-10 lg:px-16 xl:px-20 2xl:px-24">
        <div className="flex flex-col items-start mb-12 sm:mb-16">
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-[#F6F0E8]">
            ALUMNI &amp; MENTOR PERSPECTIVES
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#E0D4C3] max-w-3xl font-normal leading-relaxed">
            Reflections from collegiate builders and staff engineers who participated, shipped, and evaluated solutions across previous editions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((item, idx) => (
            <div
              key={idx}
              className="editorial-card rounded-2xl p-6 sm:p-7 flex flex-col justify-between group hover:border-[rgba(255,255,255,0.2)] transition-all duration-300"
            >
              <div>
                <span className="text-[#E8738D] font-serif text-5xl block leading-none mb-3 opacity-60">&ldquo;</span>
                <p className="text-sm text-[#E0D4C3] leading-relaxed font-normal italic mb-6">
                  {item.quote}
                </p>
              </div>
              <div className="pt-4 border-t border-[rgba(255,255,255,0.08)]">
                <strong className="block font-heading text-base font-bold text-[#F6F0E8]">
                  {item.author}
                </strong>
                <span className="text-xs text-[#E8738D] font-mono block mt-0.5">
                  {item.role}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
