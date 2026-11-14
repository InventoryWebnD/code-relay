import { Metadata } from "next";
import { HeroSection, IdentityStrip, ClosingCTA } from "@/components/home";

export const metadata: Metadata = {
  title: "Code Relay 5.0 | Nationwide Web2 & Web3 Hackathon — WebnD IIT Bhubaneswar",
  description:
    "Code Relay 5.0 is India's premier nationwide collegiate hackathon featuring parallel Web2 and Web3 tracks, organized by the Web and Design Society, IIT Bhubaneswar.",
};

export default function Home() {
  return (
    <div className="w-full flex flex-col bg-[#160207] text-[#F6F0E8]">
      {/* 1. Dominant Hero Section with 3D Monolith & Atmospheric Mountain Backdrop */}
      <HeroSection />

      {/* 2. Choose Your Track & Core Focus Section (Editorial 3-Card Carousel) */}
      <IdentityStrip />

      {/* 3. Priority Roster & Arena Sprint Call */}
      <ClosingCTA />
    </div>
  );
}
