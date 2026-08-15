import { NextResponse } from "next/server";

import { pool } from "@/app/lib/db";

// Always run on request: this writes to the database.
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX_EMAIL_LENGTH = 320;

/** Postgres unique_violation. */
const UNIQUE_VIOLATION = "23505";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const { email, source, utm } = (body ?? {}) as {
    email?: unknown;
    source?: unknown;
    utm?: Record<string, unknown>;
  };

  if (typeof email !== "string") {
    return NextResponse.json({ error: "Email is required." }, { status: 400 });
  }

  // Normalise before validating: the table's constraints require a trimmed,
  // lower-cased address, so do that here rather than letting the insert fail.
  const normalised = email.trim().toLowerCase();

  if (!EMAIL_RE.test(normalised) || normalised.length > MAX_EMAIL_LENGTH) {
    return NextResponse.json(
      { error: "That email doesn't look right." },
      { status: 400 },
    );
  }

  const str = (value: unknown) =>
    typeof value === "string" && value.trim() ? value.trim().slice(0, 255) : null;

  try {
    const result = await pool.query(
      `INSERT INTO waitlist (email, source, referrer, utm_source, utm_medium, utm_campaign)
       VALUES ($1, $2, $3, $4, $5, $6)
       ON CONFLICT (email) DO NOTHING
       RETURNING id`,
      [
        normalised,
        str(source) ?? "hero",
        str(request.headers.get("referer")),
        str(utm?.source),
        str(utm?.medium),
        str(utm?.campaign),
      ],
    );

    // No row back means the address was already on the list. That is a success
    // from the visitor's point of view, and saying otherwise would leak who has
    // already signed up.
    const alreadyJoined = result.rowCount === 0;

    return NextResponse.json({ ok: true, alreadyJoined }, { status: 200 });
  } catch (error) {
    // ON CONFLICT covers the ordinary duplicate; this catches the race where
    // two requests insert the same address simultaneously.
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as { code?: string }).code === UNIQUE_VIOLATION
    ) {
      return NextResponse.json({ ok: true, alreadyJoined: true }, { status: 200 });
    }

    console.error("waitlist insert failed:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
