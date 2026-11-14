import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { registerSchema } from "@/lib/validation";
import { handleRouteError, jsonError } from "@/lib/http";

export async function POST(request: NextRequest) {
  try {
    const body = registerSchema.parse(await request.json());
    const existing = await prisma.user.findUnique({ where: { email: body.email } });
    if (existing) return jsonError("An account with this email already exists", 409);

    const passwordHash = await hash(body.password, 12);
    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        passwordHash,
        institution: body.institution,
        department: body.department || null,
        studyYear: body.studyYear || null,
      },
      select: { id: true, name: true, email: true, institution: true, createdAt: true },
    });

    return NextResponse.json(
      { message: "Account created. You can now sign in.", user },
      { status: 201 },
    );
  } catch (error) {
    return handleRouteError(error);
  }
}
