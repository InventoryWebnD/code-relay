import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth-helpers";
import { handleRouteError, jsonError } from "@/lib/http";

type Context = { params: Promise<{ competitionId: string }> };

const schema = z.object({
  registrationId: z.string().min(1),
  title: z.string().trim().min(3).max(160),
  description: z.string().trim().min(20).max(10000),
  repositoryUrl: z.string().url().optional().or(z.literal("")),
  deploymentUrl: z.string().url().optional().or(z.literal("")),
  demoVideoUrl: z.string().url().optional().or(z.literal("")),
  submit: z.boolean().default(false),
});

export async function GET(_request: Request, { params }: Context) {
  const { user, response } = await requireUser();
  if (response) return response;
  const { competitionId } = await params;

  const submission = await prisma.submission.findFirst({
    where: {
      competitionId,
      registration: { team: { members: { some: { userId: user!.id } } } },
    },
    include: { files: true, registration: { include: { team: true } } },
  });
  return NextResponse.json({ submission });
}

export async function POST(request: NextRequest, { params }: Context) {
  const { user, response } = await requireUser();
  if (response) return response;

  try {
    const { competitionId } = await params;
    const input = schema.parse(await request.json());

    const registration = await prisma.registration.findFirst({
      where: {
        id: input.registrationId,
        competitionId,
        status: "CONFIRMED",
        team: { members: { some: { userId: user!.id } } },
      },
      include: { competition: true },
    });
    if (!registration) return jsonError("Valid team registration not found", 404);

    const deadline = registration.competition.submissionDeadline;
    if (deadline && new Date() > deadline) return jsonError("Submission deadline has passed", 409);

    const existing = await prisma.submission.findUnique({
      where: { registrationId: registration.id },
    });
    if (existing?.status === "SUBMITTED" && input.submit) {
      // Allow versioned resubmission before deadline; keep status submitted.
    }

    const submission = await prisma.submission.upsert({
      where: { registrationId: registration.id },
      create: {
        competitionId,
        registrationId: registration.id,
        teamId: registration.teamId,
        title: input.title,
        description: input.description,
        repositoryUrl: input.repositoryUrl || null,
        deploymentUrl: input.deploymentUrl || null,
        demoVideoUrl: input.demoVideoUrl || null,
        status: input.submit ? "SUBMITTED" : "DRAFT",
        submittedAt: input.submit ? new Date() : null,
      },
      update: {
        title: input.title,
        description: input.description,
        repositoryUrl: input.repositoryUrl || null,
        deploymentUrl: input.deploymentUrl || null,
        demoVideoUrl: input.demoVideoUrl || null,
        status: input.submit ? "SUBMITTED" : "DRAFT",
        submittedAt: input.submit ? new Date() : null,
        version: { increment: 1 },
      },
      include: { files: true },
    });

    return NextResponse.json({ submission }, { status: existing ? 200 : 201 });
  } catch (error) {
    return handleRouteError(error);
  }
}
