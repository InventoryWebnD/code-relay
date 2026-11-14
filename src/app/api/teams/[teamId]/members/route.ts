import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth-helpers";
import { handleRouteError, jsonError } from "@/lib/http";

type Context = { params: Promise<{ teamId: string }> };

export async function POST(request: NextRequest, { params }: Context) {
  const { user, response } = await requireUser();
  if (response) return response;

  try {
    const { teamId } = await params;
    const { email } = z.object({ email: z.string().email() }).parse(await request.json());

    const team = await prisma.team.findUnique({
      where: { id: teamId },
      include: { members: true, registrations: { include: { competition: true } } },
    });
    if (!team) return jsonError("Team not found", 404);
    const captain = team.members.some((m) => m.userId === user!.id && m.isCaptain);
    if (!captain) return jsonError("Only the team captain can add members", 403);

    const maxSize = Math.min(...team.registrations.map((r) => r.competition.maxTeamSize), 20);
    const effectiveMax = Number.isFinite(maxSize) ? maxSize : 20;
    if (team.members.length >= effectiveMax) return jsonError("Team has reached its maximum size", 409);

    const member = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
    if (!member) return jsonError("No registered user found with this email", 404);

    const alreadyInTeam = await prisma.teamMember.findFirst({
      where: { userId: member.id, teamId },
    });
    if (alreadyInTeam) return jsonError("This user is already in the team", 409);

    const membership = await prisma.teamMember.create({
      data: { teamId, userId: member.id },
      include: { user: { select: { id: true, name: true, email: true, image: true } } },
    });
    return NextResponse.json({ membership }, { status: 201 });
  } catch (error) {
    return handleRouteError(error);
  }
}
