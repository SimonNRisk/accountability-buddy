import { NextResponse } from "next/server";
import { dbAdmin } from "@/lib/firebaseAdmin";

export const runtime = "nodejs"; // Admin SDK needs Node runtime

export async function POST(req: Request) {
  // shared secret check:
  const auth = req.headers.get("authorization") ?? "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  if (token !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized request" }, { status: 401 });
  }

  const userDocId = process.env.USER_DOC_ID!;
  const ref = dbAdmin.collection("users").doc(userDocId);
  const snap = await ref.get();
  if (!snap.exists) {
    return NextResponse.json({ error: "Doc not found" }, { status: 404 });
  }

  const data = snap.data() || {};
  const updates: Record<string, boolean> = {};

  // Flip every top-level boolean to false
  for (const [k, v] of Object.entries(data)) {
    if (typeof v === "boolean") updates[k] = false;
  }

  if (Object.keys(updates).length) {
    await ref.update(updates);
  }

  return NextResponse.json({ ok: true, resetKeys: Object.keys(updates) });
}
