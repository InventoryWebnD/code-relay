import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-helpers";
import { handleRouteError } from "@/lib/http";

type Context = { params: Promise<{ submissionId: string }> };

const schema = z.object({
  score: z.number().min(0).max(100),
  feedback: z.string().max(5000).optional(),
});

export async function POST(request: NextRequest, { params }: Context) {
  const { user, response } = await requireAdmin();
  if (response) return response;

  try {
    const { submissionId } = await params;
    const input = schema.parse(await request.json());
    const submission = await prisma.submission.findUnique({ where: { id: submissionId } });
    if (!submission) return NextResponse.json({ error: "Submission not found" }, { status: 404 });

    const evaluation = await prisma.evaluation.upsert({
      where: { submissionId_judgeId: { submissionId, judgeId: user!.id } },
      create: {
        submissionId,
        judgeId: user!.id,
        score: input.score,
        feedback: input.feedback,
      },
      update: {
        score: input.score,
        feedback: input.feedback,
      },
    });

    await prisma.submission.update({
      where: { id: submissionId },
      data: { status: "EVALUATED" },
    });

    return NextResponse.json({ evaluation });
  } catch (error) {
    return handleRouteError(error);
  }
}
