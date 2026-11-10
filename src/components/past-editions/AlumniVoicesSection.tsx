import { TESTIMONIALS } from "@/data/pastEditionsData";

export default function AlumniVoicesSection() {
  return (
    <section className="relative w-full py-16 sm:py-20 border-b-2 border-[#160207] bg-[#620821] text-white">
      <div className="w-full px-6 sm:px-10 lg:px-12">
        <div className="flex flex-col items-start mb-12">
          <div className="inline-flex items-center gap-2 rounded-md border-2 border-[#160207] bg-[#380412] px-3 py-1 shadow-hard-xs mb-3">
            <span className="font-mono text-xs font-bold text-[#F6F0E8] uppercase tracking-wider">
              Testimonials
            </span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white">
            ALUMNI &amp; MENTOR PERSPECTIVES
          </h2>
          <p className="mt-2 text-base text-[#F6F0E8]/90 max-w-3xl font-normal">
            Reflections from collegiate builders and staff engineers who participated, shipped, and evaluated solutions across previous editions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((item, idx) => (
            <div
              key={idx}
              className="rounded-xl border-2 border-[#160207] bg-[#380412] p-6 shadow-hard-lg flex flex-col justify-between"
            >
              <div>
                <span className="text-[#991B3D] font-serif text-4xl block leading-none mb-2">&ldquo;</span>
                <p className="text-sm text-[#F6F0E8]/90 leading-relaxed font-normal italic mb-6">
                  {item.quote}
                </p>
              </div>
              <div className="pt-4 border-t border-[#160207]">
                <strong className="block font-heading text-base font-bold text-white">
                  {item.author}
                </strong>
                <span className="text-xs text-[#E0D4C3] font-mono block mt-0.5">
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

