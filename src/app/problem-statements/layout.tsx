import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Problem Statements Vault | Code Relay 5.0",
  description:
    "Explore engineering challenge tracks, technical problem statements, and challenge parameters from Code Relay.",
};

export default function ProblemStatementsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

