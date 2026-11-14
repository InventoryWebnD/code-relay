import { NextResponse } from "next/server";
import { ZodError } from "zod";

export function jsonError(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

export function handleRouteError(error: unknown) {
  if (error instanceof ZodError) {
    return NextResponse.json(
      { error: "Validation failed", details: error.flatten() },
      { status: 422 },
    );
  }

  console.error("API route error:", error);

  const message =
    error instanceof Error
      ? error.message.includes("Can't reach database")
        ? "Database connection timed out. Please check your Supabase connection pooler URL."
        : error.message
      : "Internal server error";

  return NextResponse.json({ error: message }, { status: 500 });
}
