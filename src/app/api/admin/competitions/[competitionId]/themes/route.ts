import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-helpers";
import { handleRouteError } from "@/lib/http";

type Context = { params: Promise<{ competitionId: string }> };

const schema = z.object({
  title: z.string().trim().min(3).max(160),
  description: z.string().trim().min(10),
  track: z.enum(["WEB2", "WEB3"]),
  statementCode: z.string().max(50).optional(),
  isPublished: z.boolean().default(true),
});

export async function POST(request: NextRequest, { params }: Context) {
  const { response } = await requireAdmin();
  if (response) return response;

  try {
    const { competitionId } = await params;
    const data = schema.parse(await request.json());
    const competition = await prisma.competition.findUnique({ where: { id: competitionId } });
    if (!competition) return NextResponse.json({ error: "Competition not found" }, { status: 404 });

    const theme = await prisma.theme.create({
      data: { ...data, competitionId },
    });
    return NextResponse.json({ theme }, { status: 201 });
  } catch (error) {
    return handleRouteError(error);
  }
}
