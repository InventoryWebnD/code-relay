import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth-helpers";
import { jsonError } from "@/lib/http";
import { SUBMISSION_BUCKET, supabaseAdmin } from "@/lib/supabase-admin";

type Context = { params: Promise<{ competitionId: string; fileId: string }> };

export async function GET(_request: Request, { params }: Context) {
  const { user, response } = await requireUser();
  if (response) return response;

  const { competitionId, fileId } = await params;
  const file = await prisma.submissionFile.findFirst({
    where: {
      id: fileId,
      submission: {
        competitionId,
        registration: { team: { members: { some: { userId: user!.id } } } },
      },
    },
  });
  if (!file) return jsonError("File not found", 404);

  const { data, error } = await supabaseAdmin.storage
    .from(SUBMISSION_BUCKET)
    .createSignedUrl(file.storagePath, 60);
  if (error || !data?.signedUrl) return jsonError("Could not create download link", 502);

  return NextResponse.json({ url: data.signedUrl, expiresIn: 60 });
}
