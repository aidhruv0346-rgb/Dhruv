import { NextResponse } from "next/server";
import { z } from "zod";
import { sendInquiryEmail } from "@/lib/sendEmail";
import { stripHtml } from "@/lib/utils";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional().default(""),
  service: z.string().min(2),
  budget: z.string().optional().default(""),
  message: z.string().min(10),
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
    const clean = Object.fromEntries(Object.entries(parsed.data).map(([key, value]) => [key, stripHtml(String(value || ""))]));
    const recaptchaOk = await verifyRecaptcha(parsed.data.recaptchaToken);
    if (!recaptchaOk) return NextResponse.json({ success: false, message: "reCAPTCHA verification failed." }, { status: 400 });
    await sendInquiryEmail(clean);
    return NextResponse.json({ success: true, message: "Message sent. I will reply within 24 hours." });
  } catch {
    return NextResponse.json({ success: false, message: "Something went wrong. Please try again." }, { status: 500 });
  }
}
