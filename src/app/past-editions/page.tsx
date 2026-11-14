import { Metadata } from "next";
import {
  PastEditionsHeader,
  PastEditionsShowcase,
  AlumniVoicesSection,
  PastEditionsCTA,
} from "@/components/past-editions";

export const metadata: Metadata = {
  title: "Past Editions & Community Legacy | Code Relay 5.0",
  description:
    "Explore the legacy of Code Relay across Editions 1.0 to 4.0, featuring past projects, statistics, and testimonials from 2,900+ hackers.",
};

export default function PastEditionsPage() {
  return (
    <div className="w-full flex flex-col bg-[#160207] text-[#F6F0E8] overflow-hidden selection:bg-[#991B3D] selection:text-white">
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
