import {
  PastEditionsHeader,
  PastEditionsShowcase,
  AlumniVoicesSection,
  PastEditionsCTA,
} from "@/components/past-editions";

export default function PastEditionsPage() {
  return (
    <div className="w-full flex flex-col bg-[#F6F0E8] text-[#1E030A]">
      {/* 1. Header Section with Cumulative Statistics */}
      <PastEditionsHeader />

      {/* 2. Chronological Overview of Editions (CR 4.0 - 1.0) */}
      <PastEditionsShowcase />

      {/* 3. Alumni & Mentor Perspectives */}
      <AlumniVoicesSection />

      {/* 4. Problem Statements Archive CTA */}
      <PastEditionsCTA />
    </div>
  );
}
