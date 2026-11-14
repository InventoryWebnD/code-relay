import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth-helpers";
import { handleRouteError, jsonError } from "@/lib/http";

type Context = { params: Promise<{ competitionId: string }> };

const schema = z.object({
  teamId: z.string().min(1),
  track: z.enum(["WEB2", "WEB3"]),
  themeId: z.string().optional(),
});

export async function POST(request: NextRequest, { params }: Context) {
  const { user, response } = await requireUser();
  if (response) return response;

  try {
    const { competitionId } = await params;
    const input = schema.parse(await request.json());

    const competition = await prisma.competition.findUnique({ where: { id: competitionId } });
    if (!competition || !competition.isPublished) return jsonError("Competition not found", 404);
    if (competition.status !== "PUBLISHED") return jsonError("Registration is not open", 409);

    const now = new Date();
    if (competition.registrationOpensAt && now < competition.registrationOpensAt) {
      return jsonError("Registration has not opened yet", 409);
    }
    if (competition.registrationClosesAt && now > competition.registrationClosesAt) {
      return jsonError("Registration deadline has passed", 409);
    }
    if (!competition.allowedTracks.includes(input.track)) {
      return jsonError("Selected track is not available", 400);
    }

    const team = await prisma.team.findUnique({
      where: { id: input.teamId },
      include: { members: true },
    });
    if (!team) return jsonError("Team not found", 404);
    if (!team.members.some((member) => member.userId === user!.id)) {
      return jsonError("You must be a member of this team", 403);
    }
    if (team.members.length < competition.minTeamSize || team.members.length > competition.maxTeamSize) {
      return jsonError(`Team must have ${competition.minTeamSize}–${competition.maxTeamSize} members`, 400);
    }

    if (input.themeId) {
      const theme = await prisma.theme.findFirst({
        where: { id: input.themeId, competitionId, isPublished: true, track: input.track },
      });
      if (!theme) return jsonError("Invalid theme for selected competition and track", 400);
    }

    const registration = await prisma.registration.create({
      data: {
        competitionId,
        teamId: input.teamId,
        track: input.track,
        themeId: input.themeId || null,
        status: "CONFIRMED",
      },
      include: { team: { include: { members: { include: { user: { select: { id: true, name: true, email: true } } } } } } },
    });

    return NextResponse.json({ registration }, { status: 201 });
  } catch (error) {
    if (typeof error === "object" && error !== null && "code" in error && error.code === "P2002") {
      return jsonError("This team is already registered for this competition", 409);
    }
    return handleRouteError(error);
  }
}
