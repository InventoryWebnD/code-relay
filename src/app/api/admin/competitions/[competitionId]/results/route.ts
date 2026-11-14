import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-helpers";
import { handleRouteError } from "@/lib/http";

type Context = { params: Promise<{ competitionId: string }> };

const schema = z.object({
  registrationId: z.string().min(1),
  rank: z.number().int().positive().nullable().optional(),
  score: z.number().min(0).max(1000).nullable().optional(),
  award: z.string().max(120).nullable().optional(),
  feedback: z.string().max(5000).nullable().optional(),
  isPublished: z.boolean().default(false),
});

export async function POST(request: NextRequest, { params }: Context) {
  const { response } = await requireAdmin();
  if (response) return response;

  try {
    const { competitionId } = await params;
    const input = schema.parse(await request.json());
    const registration = await prisma.registration.findFirst({
      where: { id: input.registrationId, competitionId },
    });
    if (!registration) {
      return NextResponse.json({ error: "Registration not found for this competition" }, { status: 404 });
    }

    const result = await prisma.result.upsert({
      where: { registrationId: input.registrationId },
      create: {
        competitionId,
        registrationId: input.registrationId,
        rank: input.rank ?? null,
        score: input.score ?? null,
        award: input.award ?? null,
        feedback: input.feedback ?? null,
        isPublished: input.isPublished,
      },
      update: {
        rank: input.rank,
        score: input.score,
        award: input.award,
        feedback: input.feedback,
        isPublished: input.isPublished,
      },
    });
    return NextResponse.json({ result });
  } catch (error) {
    return handleRouteError(error);
  }
}
