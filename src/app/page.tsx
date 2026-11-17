import { Metadata } from "next";
import { eventLd, faqLd, pageMetadata } from "@/data/seo";
import JsonLd from "@/components/seo/JsonLd";
import RelayStory from "@/components/story/RelayStory";
import Manifesto from "@/components/home/Manifesto";
import TracksShowcase from "@/components/world/blocks/TracksShowcase";
import PrizeFlip from "@/components/world/blocks/PrizeFlip";
import DomeGallery from "@/components/world/blocks/DomeGallery";
import ReviewStack from "@/components/world/blocks/ReviewStack";
import PartnerLogos from "@/components/world/blocks/PartnerLogos";
import SponsorWall from "@/components/world/blocks/SponsorWall";
import FaqBlock from "@/components/world/blocks/FaqBlock";
import FinalCTA from "@/components/world/blocks/FinalCTA";
import OrganisingCommittee from "@/components/world/blocks/OrganisingCommittee";

export const metadata: Metadata = pageMetadata({
  title: "Code Relay 5.0 | National Hackathon at IIT Bhubaneswar · Web2 × Web3",
  description: "Code Relay 5.0 by WebnD, IIT Bhubaneswar: a national student hackathon with Web2 (AI & Automation, AI for Bharat) and Web3 (Onchain Payments, AI × Web3) tracks, ₹3 lakh+ in prizes and a 30-hour on-campus final. Round 1 is free. Register on Unstop.",
  path: "/",
});

export default function Home() {
  return (
    <>
      <JsonLd data={[eventLd, faqLd]} />
      <RelayStory />
      <Manifesto />
      <TracksShowcase />
      <PrizeFlip />
      <DomeGallery />
      <ReviewStack />
      <PartnerLogos />
      <SponsorWall wall={false} />
      <FaqBlock />
      <OrganisingCommittee />
      <FinalCTA />
    </>
  );
}
