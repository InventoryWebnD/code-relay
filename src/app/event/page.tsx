import { Metadata } from "next";
import { breadcrumbLd, eventLd, faqLd, pageMetadata } from "@/data/seo";
import JsonLd from "@/components/seo/JsonLd";
import EventHero from "@/components/event/EventHero";
import { FactsRibbon, JudgingBlock, RulesBento, ScheduleBlock } from "@/components/event/EventBlocks";
import RelayRun from "@/components/world/blocks/RelayRun";
import TracksShowcase from "@/components/world/blocks/TracksShowcase";
import TrackGuidelines from "@/components/world/blocks/TrackGuidelines";
import PrizeFlip from "@/components/world/blocks/PrizeFlip";
import FaqBlock from "@/components/world/blocks/FaqBlock";
import FinalCTA from "@/components/world/blocks/FinalCTA";

export const metadata: Metadata = pageMetadata({
  title: "Tracks, Rounds, Prizes & Rules | Code Relay 5.0 Hackathon",
  description: "Everything about Code Relay 5.0: Web2 and Web3 tracks with sub-tracks, the free online idea round, the 30-hour final at IIT Bhubaneswar, judging criteria, ₹2.5 lakh+ prizes and FAQs.",
  path: "/event",
});

export default function EventPage() {
  return (
    <>
      <JsonLd data={[eventLd, faqLd, breadcrumbLd([{ name: "The Event", path: "/event" }])]} />
      <EventHero />
      <FactsRibbon />
      <RelayRun id="format" />
      <TracksShowcase />
      <TrackGuidelines />
      <ScheduleBlock />
      <JudgingBlock />
      <RulesBento />
      <PrizeFlip />
      <FaqBlock />
      <FinalCTA title="Ready set go" />
    </>
  );
}
