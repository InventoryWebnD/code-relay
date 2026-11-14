import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-helpers";
import { competitionSchema } from "@/lib/validation";
import { handleRouteError, jsonError } from "@/lib/http";

type Context = { params: Promise<{ competitionId: string }> };

export async function PATCH(request: NextRequest, { params }: Context) {
  const { response } = await requireAdmin();
  if (response) return response;

  try {
    const { competitionId } = await params;
    const input = competitionSchema.partial().parse(await request.json());
    if (input.minTeamSize !== undefined && input.maxTeamSize !== undefined &&
        input.minTeamSize > input.maxTeamSize) {
      return jsonError("minTeamSize cannot exceed maxTeamSize");
    }

    const data = {
      ...input,
      registrationOpensAt: input.registrationOpensAt === undefined ? undefined : input.registrationOpensAt ? new Date(input.registrationOpensAt) : null,
      registrationClosesAt: input.registrationClosesAt === undefined ? undefined : input.registrationClosesAt ? new Date(input.registrationClosesAt) : null,
      startsAt: input.startsAt === undefined ? undefined : input.startsAt ? new Date(input.startsAt) : null,
      endsAt: input.endsAt === undefined ? undefined : input.endsAt ? new Date(input.endsAt) : null,
      submissionDeadline: input.submissionDeadline === undefined ? undefined : input.submissionDeadline ? new Date(input.submissionDeadline) : null,
    };

    const competition = await prisma.competition.update({ where: { id: competitionId }, data });
    return NextResponse.json({ competition });
  } catch (error) {
    return handleRouteError(error);
  }
}
