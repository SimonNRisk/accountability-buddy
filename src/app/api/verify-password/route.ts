import { NextResponse } from "next/server";
import { dbAdmin } from "@/lib/firebaseAdmin";

export async function POST(req: Request) {
  try {
    const { password } = await req.json();

    if (!password) {
      return NextResponse.json({ error: "Password required" }, { status: 400 });
    }

    // Get the stored password from the auth collection (server-side only)
    const authRef = dbAdmin.collection("auth").doc("passwords");
    const authDoc = await authRef.get();

    if (!authDoc.exists) {
      return NextResponse.json({ error: "Authentication not configured" }, { status: 500 });
    }

    const authData = authDoc.data();
    const storedPassword = authData?.password;

    if (!storedPassword) {
      return NextResponse.json({ error: "Authentication not configured" }, { status: 500 });
    }

    // Check if password matches
    const isValid = password === storedPassword;

    if (isValid) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }
  } catch (error) {
    console.error("Password verification error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
