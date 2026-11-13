import { Metadata } from "next";
import {
  EventHeader,
  TracksSection,
  ParticipationFormatSection,
  EventScheduleSection,
  PrizesSection,
  JudgingCriteriaSection,
  FaqSection,
  EventCTA,
} from "@/components/event";

export const metadata: Metadata = {
  title: "The Event & Specifications | Code Relay 5.0",
  description:
    "Explore the 36-hour dual track relay sprint specifications, timeline, rules, prizes, and judging criteria for Code Relay 5.0.",
};

export default function EventPage() {
  return (
    <div className="w-full flex flex-col bg-[#F6F0E8] text-[#1E030A]">
      {/* 1. Page Header */}
      <EventHeader />

      {/* 2. Track Descriptions */}
      <TracksSection />

      {/* 3. Confirmed Participation Format & Eligibility */}
      <ParticipationFormatSection />

      {/* 4. Tentative 3-Day Sprint Schedule */}
      <EventScheduleSection />

      {/* 5. Prizes & Grants Pool */}
      <PrizesSection />

      {/* 6. Rules & Judging Criteria */}
      <JudgingCriteriaSection />

      {/* 7. Frequently Asked Questions */}
      <FaqSection />

      {/* 8. Event Call to Action */}
      <EventCTA />
    </div>
  );
}
