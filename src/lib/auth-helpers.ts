import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { jsonError } from "@/lib/http";
import { NextResponse } from "next/server";

export async function getCurrentUser() {
  const session = await auth();
  if (!session?.user?.id) return null;

  return prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      role: true,
      institution: true,
      department: true,
      studyYear: true,
    },
  });
}

export async function requireUser() {
  const user = await getCurrentUser();
  if (!user) return { user: null, response: jsonError("Authentication required", 401) };
  return { user, response: null };
}

export async function requireAdmin() {
  const result = await requireUser();
  if (result.response) return result;
  if (result.user?.role !== "ADMIN") {
    return { user: null, response: jsonError("Admin access required", 403) };
  }
  return result;
}
