import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth-helpers";
import { handleRouteError, jsonError } from "@/lib/http";
import { SUBMISSION_BUCKET, supabaseAdmin } from "@/lib/supabase-admin";

export const runtime = "nodejs";

const MAX_FILE_SIZE = 25 * 1024 * 1024;
const ALLOWED_TYPES = new Set([
  "application/pdf",
  "application/zip",
  "application/x-zip-compressed",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/plain",
  "image/png",
  "image/jpeg",
  "image/webp",
]);

type Context = { params: Promise<{ competitionId: string }> };

export async function POST(request: NextRequest, { params }: Context) {
  const { user, response } = await requireUser();
  if (response) return response;

  try {
    const { competitionId } = await params;
    const formData = await request.formData();
    const registrationId = String(formData.get("registrationId") || "");
    const file = formData.get("file");

    if (!(file instanceof File)) return jsonError("A file is required");
    if (!registrationId) return jsonError("registrationId is required");
    if (file.size <= 0 || file.size > MAX_FILE_SIZE) return jsonError("File must be between 1 byte and 25 MB");
    if (!ALLOWED_TYPES.has(file.type)) return jsonError("Unsupported file type");

    const registration = await prisma.registration.findFirst({
      where: {
        id: registrationId,
        competitionId,
        team: { members: { some: { userId: user!.id } } },
      },
    });
    if (!registration) return jsonError("Registration not found or access denied", 404);

    const submission = await prisma.submission.findUnique({
      where: { registrationId },
    });
    if (!submission) return jsonError("Create a submission before uploading files", 409);

    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(-120);
    const storagePath = `${competitionId}/${registrationId}/${crypto.randomUUID()}-${safeName}`;
    const bytes = Buffer.from(await file.arrayBuffer());

    const { error } = await supabaseAdmin.storage
      .from(SUBMISSION_BUCKET)
      .upload(storagePath, bytes, { contentType: file.type, upsert: false });

    if (error) {
      console.error("Supabase Storage upload error:", error);
      return jsonError("File upload failed", 502);
    }

    const savedFile = await prisma.submissionFile.create({
      data: {
        submissionId: submission.id,
        storagePath,
        originalName: file.name,
        mimeType: file.type,
        sizeBytes: file.size,
      },
    });

    return NextResponse.json({ file: savedFile }, { status: 201 });
  } catch (error) {
    return handleRouteError(error);
  }
}
