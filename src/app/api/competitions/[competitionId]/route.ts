import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Context = { params: Promise<{ competitionId: string }> };

export async function GET(_request: Request, { params }: Context) {
  const { competitionId } = await params;
  const competition = await prisma.competition.findFirst({
    where: {
      OR: [{ id: competitionId }, { slug: competitionId }],
      isPublished: true,
    },
    include: {
      themes: { where: { isPublished: true }, orderBy: { createdAt: "asc" } },
      _count: { select: { registrations: true } },
    },
  });

  if (!competition) {
    return NextResponse.json({ error: "Competition not found" }, { status: 404 });
  }
  return NextResponse.json({ competition });
}
