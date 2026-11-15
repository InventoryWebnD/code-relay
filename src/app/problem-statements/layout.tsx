import type { Metadata } from "next";
import { breadcrumbLd, pageMetadata } from "@/data/seo";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = pageMetadata({
  title: "Problem Statements | Code Relay 5.0 Web2 & Web3 Tracks",
  description: "Code Relay 5.0 problem statements: AI & Automation, AI for Bharat, Onchain Payments and AI × Web3, with sub-tracks and ideas, plus problem statements from Code Relay 4.0 and 3.0.",
  path: "/problem-statements",
});

export default function ProblemStatementsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Problem Statements", path: "/problem-statements" }])} />
      {children}
    </>
  );
}

