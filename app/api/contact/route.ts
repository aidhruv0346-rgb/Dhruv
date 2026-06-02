import { NextResponse } from "next/server";
import { z } from "zod";
import { getContactRecords, inferPriority, makeContactId, saveContactRecords } from "@/lib/contactStore";
import { sendInquiryEmail } from "@/lib/sendEmail";
import { stripHtml } from "@/lib/utils";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional().default(""),
  service: z.string().min(2),
  budget: z.string().min(2),
  message: z.string().min(10),
  agreement: z.union([z.literal("on"), z.literal("true"), z.boolean()]).optional().default(false),
  recaptchaToken: z.string().optional()
});

async function verifyRecaptcha(token?: string) {
  if (!process.env.RECAPTCHA_SECRET_KEY || !token) return true;
  const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ secret: process.env.RECAPTCHA_SECRET_KEY, response: token })
  });
  const data = await response.json();
  return Boolean(data.success);
}

export async function POST(request: Request) {
  try {
    const parsed = schema.safeParse(await request.json());
    if (!parsed.success) return NextResponse.json({ success: false, message: "Please check the required fields." }, { status: 400 });
    const clean = Object.fromEntries(Object.entries(parsed.data).map(([key, value]) => [key, stripHtml(String(value || ""))])) as Record<string, string>;
    if (!parsed.data.agreement) return NextResponse.json({ success: false, message: "Please agree to the terms and conditions." }, { status: 400 });
    const recaptchaOk = await verifyRecaptcha(parsed.data.recaptchaToken);
    if (!recaptchaOk) return NextResponse.json({ success: false, message: "reCAPTCHA verification failed." }, { status: 400 });
    const records = await getContactRecords();
    const now = new Date().toISOString();
    records.unshift({
      id: makeContactId(),
      fullName: clean.name,
      email: clean.email,
      phone: clean.phone,
      service: clean.service,
      budget: clean.budget,
      message: clean.message,
      agreement: true,
      status: "New",
      priority: inferPriority(clean.budget, clean.message),
      starred: false,
      createdAt: now,
      updatedAt: now
    });
    await saveContactRecords(records);
    await sendInquiryEmail(clean);
    return NextResponse.json({ success: true, message: "Message sent. I will reply within 24 hours." });
  } catch {
    return NextResponse.json({ success: false, message: "Something went wrong. Please try again." }, { status: 500 });
  }
}
