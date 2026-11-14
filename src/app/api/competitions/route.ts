import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const search = request.nextUrl.searchParams.get("q")?.trim();
  const track = request.nextUrl.searchParams.get("track");

  const competitions = await prisma.competition.findMany({
    where: {
      isPublished: true,
      status: { notIn: ["DRAFT", "ARCHIVED"] },
      ...(search ? { OR: [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ] } : {}),
      ...(track === "WEB2" || track === "WEB3"
        ? { allowedTracks: { has: track } }
        : {}),
    },
    select: {
      id: true, slug: true, name: true, edition: true, description: true,
      format: true, status: true, registrationOpensAt: true,
      registrationClosesAt: true, startsAt: true, endsAt: true,
      submissionDeadline: true, minTeamSize: true, maxTeamSize: true,
      allowedTracks: true, bannerUrl: true,
      _count: { select: { registrations: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ competitions });
}
