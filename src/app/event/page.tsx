import { Metadata } from "next";
import EventHero from "@/components/event/EventHero";
import { FactsRibbon, JudgingBlock, RulesBento, ScheduleBlock } from "@/components/event/EventBlocks";
import RelayRun from "@/components/world/blocks/RelayRun";
import TracksShowcase from "@/components/world/blocks/TracksShowcase";
import PrizeFlip from "@/components/world/blocks/PrizeFlip";
import FaqBlock from "@/components/world/blocks/FaqBlock";
import FinalCTA from "@/components/world/blocks/FinalCTA";

export const metadata: Metadata = {
  title: "The Event | Code Relay 5.0",
  description:
    "Format, tracks, schedule, judging and prizes for Code Relay 5.0: an online idea round followed by a 30-hour on-campus final at IIT Bhubaneswar.",
};

export default function EventPage() {
  return (
    <>
      <EventHero />
      <FactsRibbon />
      <RelayRun id="format" />
      <TracksShowcase />
      <ScheduleBlock />
      <JudgingBlock />
      <RulesBento />
      <PrizeFlip />
      <FaqBlock />
      <FinalCTA title="Ready set go" />
    </>
  );
}
