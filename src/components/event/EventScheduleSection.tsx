import { SCHEDULE_DAYS } from "@/data/eventData";

export default function EventScheduleSection() {
  return (
    <section id="schedule" className="relative w-full py-20 border-b border-[rgba(255,255,255,0.08)] bg-[#160207] overflow-hidden">
      <div className="relative w-full px-6 sm:px-10 lg:px-16 xl:px-20 2xl:px-24">
        <div className="flex flex-col items-start mb-12 sm:mb-16">
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-[#F6F0E8]">
            PROVISIONAL SPRINT SCHEDULE
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#E0D4C3] max-w-3xl font-normal leading-relaxed">
            Provisional run of show for Code Relay 5.0. Official dates and venue timings will be published upon registration opening.
          </p>
        </div>

        <div className="space-y-8">
          {SCHEDULE_DAYS.map((dayPlan) => (
            <div
              key={dayPlan.day}
              className="editorial-card rounded-2xl overflow-hidden"
            >
              {/* Day Header */}
              <div className="bg-[#24040d]/90 px-6 sm:px-8 py-5 border-b border-[rgba(255,255,255,0.08)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="font-heading text-xl sm:text-2xl font-black uppercase tracking-wide text-[#F6F0E8]">
                    {dayPlan.day}
                  </h3>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(255,255,255,0.15)] bg-[#991B3D]/30 px-4 py-1 text-xs font-mono font-bold uppercase text-[#F6F0E8]">
                  {dayPlan.date}
                </div>
              </div>

              {/* Events Timeline */}
              <div className="p-6 sm:p-8 divide-y divide-[rgba(255,255,255,0.06)]">
                {dayPlan.events.map((evt, idx) => (
                  <div
                    key={idx}
                    className="py-5 first:pt-2 last:pb-2 flex flex-col md:flex-row md:items-start justify-between gap-3 md:gap-8"
                  >
                    <div className="md:w-52 shrink-0">
                      <span className="inline-block rounded-full border border-[rgba(255,255,255,0.1)] bg-white/5 px-3 py-1 font-mono text-xs font-bold text-[#E8738D]">
                        {evt.time}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-heading text-base sm:text-lg font-bold text-[#F6F0E8] mb-1.5">
                        {evt.title}
                      </h4>
                      <p className="text-sm text-[#E0D4C3] leading-relaxed font-normal">
                        {evt.desc}
                      </p>
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
