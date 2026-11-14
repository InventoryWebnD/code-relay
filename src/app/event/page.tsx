import { Metadata } from "next";
import {
  EventHeader,
  TracksSection,
  EventTimelineSection,
  FaqSection,
} from "@/components/event";

export const metadata: Metadata = {
  title: "The Event & Specifications | Code Relay 5.0",
  description:
    "Explore the dual track relay sprint specifications, timeline, rules, and FAQs for Code Relay 5.0.",
};

export default function EventPage() {
  return (
    <div className="w-full flex flex-col bg-[#160207] text-[#F6F0E8] overflow-hidden selection:bg-[#991B3D] selection:text-white">
      {/* 1. Page Header */}
      <EventHeader />

      {/* 2. Track Descriptions (TWO TRACKS. ONE RELAY.) */}
      <TracksSection />

      {/* 3. Vertical Interactive Timeline (Scroll Triggered) */}
      <EventTimelineSection />

      {/* 4. Frequently Asked Questions */}
      <FaqSection />
    </div>
  );
}
