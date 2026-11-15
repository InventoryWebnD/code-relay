import { Metadata } from "next";
import { breadcrumbLd, pageMetadata } from "@/data/seo";
import JsonLd from "@/components/seo/JsonLd";
import { HallOfFame, LegacyHero, RecentEditions } from "@/components/past-editions/LegacyBlocks";
import DomeGallery from "@/components/world/blocks/DomeGallery";
import ReviewStack from "@/components/world/blocks/ReviewStack";
import SponsorWall from "@/components/world/blocks/SponsorWall";
import FinalCTA from "@/components/world/blocks/FinalCTA";

export const metadata: Metadata = pageMetadata({
  title: "Past Editions & Winners | Code Relay Hackathon, IIT Bhubaneswar",
  description: "Code Relay through the years: past editions by WebnD, IIT Bhubaneswar, with problem statements, winners, stats, gallery and participant reviews.",
  path: "/past-editions",
});

export default function PastEditionsPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Past Editions", path: "/past-editions" }])} />
      <LegacyHero />
      <RecentEditions />
      <HallOfFame />
      <DomeGallery title={"The\narchive"} label="Gallery" />
      <ReviewStack />
      <SponsorWall />
      <FinalCTA title="Run lap five" />
    </>
  );
}
