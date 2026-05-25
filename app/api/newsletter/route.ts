import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({ email: z.string().email() });

export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ success: false, message: "Enter a valid email address." }, { status: 400 });
  return NextResponse.json({ success: true, message: "Subscribed. Mailchimp or ConvertKit integration can be connected here." });
}
