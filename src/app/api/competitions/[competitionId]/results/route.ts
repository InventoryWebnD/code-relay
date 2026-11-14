import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Context = { params: Promise<{ competitionId: string }> };

export async function GET(_request: Request, { params }: Context) {
  const { competitionId } = await params;
  const results = await prisma.result.findMany({
    where: { competitionId, isPublished: true },
    orderBy: [{ rank: "asc" }, { score: "desc" }],
    select: {
      id: true, rank: true, score: true, award: true,
      registration: {
        select: {
          track: true,
          team: { select: { name: true, members: { select: { user: { select: { name: true } } } } } },
        },
      },
    },
  });
  return NextResponse.json({ results });
}
