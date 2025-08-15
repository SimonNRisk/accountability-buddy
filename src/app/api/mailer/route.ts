import { NextResponse } from "next/server";
import { dbAdmin } from "@/lib/firebaseAdmin";
import { sendHtmlEmail } from "@/lib/mailer";
import { renderReactToHtml } from "@/lib/renderEmail";
import DailySummaryEmail from "@/emails/DailySummaryEmail";
import React from "react";

export const runtime = "nodejs"; // needed for SMTP

function torontoDateLabel() {
  return new Date().toLocaleDateString("en-CA", {
    timeZone: "America/Toronto",
  });
}

export async function POST(req: Request) {
  // 0) Shared-secret auth
  const auth = req.headers.get("authorization") ?? "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  if (token !== process.env.CRON_SECRET) {
    return NextResponse.json(
      { error: "Unauthorized request" },
      { status: 401 }
    );
  }

  try {
    // 1) Read current values (do NOT mutate here)
    const userDocId = process.env.USER_DOC_ID!;
    const ref = dbAdmin.collection("users").doc(userDocId);
    const snap = await ref.get();
    if (!snap.exists) {
      return NextResponse.json({ error: "Doc not found" }, { status: 404 });
    }

    const data = (snap.data() || {}) as Record<string, unknown>;

    // Build lists from top-level booleans
    const done: string[] = [];
    const notDone: string[] = [];
    for (const [k, v] of Object.entries(data)) {
      if (typeof v === "boolean") {
        (v ? done : notDone).push(k);
      }
    }
    done.sort();
    notDone.sort();

    // 2) Render MJML -> HTML
    const dateLabel = torontoDateLabel();
    const { html, errors } = await renderReactToHtml(
      React.createElement(DailySummaryEmail, { dateLabel, done, notDone })
    );
    if (errors?.length) console.warn("MJML warnings:", errors);

    // 3) Send email via Gmail/Nodemailer
    const recipients = (process.env.TO_EMAILS || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const to = recipients.length ? recipients : [process.env.GMAIL_USER!];

    const info = await sendHtmlEmail({
      subject: `Daily Accountability — ${dateLabel}`,
      html,
      to,
    });

    return NextResponse.json({
      ok: true,
      sentTo: to,
      messageId: (info as any)?.messageId,
      counts: { done: done.length, notDone: notDone.length },
    });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { ok: false, error: err?.message ?? "unknown" },
      { status: 500 }
    );
  }
}
