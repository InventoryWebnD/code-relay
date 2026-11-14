import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth-helpers";
import { profileSchema } from "@/lib/validation";
import { handleRouteError } from "@/lib/http";

export async function GET() {
  const { user, response } = await requireUser();
  if (response) return response;

  const profile = await prisma.user.findUnique({
    where: { id: user!.id },
    select: {
      id: true, name: true, email: true, image: true, role: true,
      phone: true, institution: true, department: true, studyYear: true,
      bio: true, githubUrl: true, linkedinUrl: true, websiteUrl: true,
      createdAt: true,
    },
  });
  return NextResponse.json({ profile });
}

export async function PATCH(request: NextRequest) {
  const { user, response } = await requireUser();
  if (response) return response;

  try {
    const data = profileSchema.parse(await request.json());
    const profile = await prisma.user.update({
      where: { id: user!.id },
      data,
      select: {
        id: true, name: true, email: true, image: true, phone: true,
        institution: true, department: true, studyYear: true, bio: true,
        githubUrl: true, linkedinUrl: true, websiteUrl: true,
      },
    });
    return NextResponse.json({ profile });
  } catch (error) {
    return handleRouteError(error);
  }
}
