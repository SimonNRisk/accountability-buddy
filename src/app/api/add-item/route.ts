import { NextResponse } from "next/server";
import { dbAdmin } from "@/lib/firebaseAdmin";

export async function POST(req: Request) {
  try {
    const { password, item } = await req.json();

    if (!password || !item) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Verify password first
    const authRef = dbAdmin.collection("auth").doc("passwords");
    const authDoc = await authRef.get();

    if (!authDoc.exists) {
      return NextResponse.json({ error: "Authentication not configured" }, { status: 500 });
    }

    const authData = authDoc.data();
    const storedPassword = authData?.password;

    if (!storedPassword || password !== storedPassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    // Add the new item to Firestore (server-side)
    const userDocId = process.env.USER_DOC_ID!;
    const userRef = dbAdmin.collection("users").doc(userDocId);

    await userRef.update({
      [item]: false,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Add item error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
