import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth-helpers";
import { teamSchema } from "@/lib/validation";
import { handleRouteError } from "@/lib/http";

export async function GET() {
  const { user, response } = await requireUser();
  if (response) return response;

  const teams = await prisma.team.findMany({
    where: { members: { some: { userId: user!.id } } },
    include: {
      members: { include: { user: { select: { id: true, name: true, email: true, image: true } } } },
      registrations: { include: { competition: { select: { id: true, name: true, slug: true } } } },
    },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ teams });
}

export async function POST(request: NextRequest) {
  const { user, response } = await requireUser();
  if (response) return response;

  try {
    const { name } = teamSchema.parse(await request.json());
    const team = await prisma.team.create({
      data: {
        name,
        createdById: user!.id,
        members: { create: { userId: user!.id, isCaptain: true } },
      },
      include: { members: { include: { user: { select: { id: true, name: true, email: true } } } } },
    });
    return NextResponse.json({ team }, { status: 201 });
  } catch (error) {
    return handleRouteError(error);
  }
}
