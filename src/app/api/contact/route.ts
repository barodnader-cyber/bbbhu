import { db } from "@/db";
import { inquiries } from "@/db/schema";
import { ensureSeeded } from "@/lib/seed";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    await ensureSeeded();
    const body = (await req.json()) as {
      name?: string;
      phone?: string;
      city?: string;
      service?: string;
      message?: string;
    };
    const name = (body.name || "").trim();
    const phone = (body.phone || "").trim();
    if (name.length < 2 || phone.length < 8) {
      return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
    }
    await db.insert(inquiries).values({
      name: name.slice(0, 120),
      phone: phone.slice(0, 30),
      city: (body.city || "").slice(0, 80) || null,
      service: (body.service || "").slice(0, 120) || null,
      message: (body.message || "").slice(0, 2000) || null,
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
