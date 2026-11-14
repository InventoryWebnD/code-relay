import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-helpers";
import { competitionSchema } from "@/lib/validation";
import { handleRouteError } from "@/lib/http";

export async function POST(request: NextRequest) {
  const { response } = await requireAdmin();
  if (response) return response;

  try {
    const input = competitionSchema.parse(await request.json());
    if (input.minTeamSize > input.maxTeamSize) {
      return NextResponse.json({ error: "minTeamSize cannot exceed maxTeamSize" }, { status: 400 });
    }

    const competition = await prisma.competition.create({
      data: {
        ...input,
        registrationOpensAt: input.registrationOpensAt ? new Date(input.registrationOpensAt) : null,
        registrationClosesAt: input.registrationClosesAt ? new Date(input.registrationClosesAt) : null,
        startsAt: input.startsAt ? new Date(input.startsAt) : null,
        endsAt: input.endsAt ? new Date(input.endsAt) : null,
        submissionDeadline: input.submissionDeadline ? new Date(input.submissionDeadline) : null,
        status: input.status ?? "DRAFT",
      },
    });
    return NextResponse.json({ competition }, { status: 201 });
  } catch (error) {
    return handleRouteError(error);
  }
}
