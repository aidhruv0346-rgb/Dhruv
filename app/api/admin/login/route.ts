import { NextRequest, NextResponse } from "next/server";
import { cookieName, signAdminToken } from "@/lib/adminAuth";

const attempts = new Map<string, { count: number; resetAt: number }>();
const windowMs = 15 * 60 * 1000;

function clientIp(request: NextRequest) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
}

export async function POST(request: NextRequest) {
  const ip = clientIp(request);
  const now = Date.now();
  const current = attempts.get(ip);
  if (current && current.resetAt > now && current.count >= 5) {
    return NextResponse.json({ success: false, message: "Too many attempts. Try again later." }, { status: 429 });
  }

  const body = await request.json().catch(() => ({}));
  const username = String(body.username || "");
  const password = String(body.password || "");
  const rememberMe = Boolean(body.rememberMe);

  const validUsername = process.env.ADMIN_USERNAME;
  const validPassword = process.env.ADMIN_PASSWORD;

  if (!validUsername || !validPassword || !process.env.ADMIN_JWT_SECRET) {
    return NextResponse.json({ success: false, message: "Admin auth is not configured" }, { status: 503 });
  }

  if (username === validUsername && password === validPassword) {
    attempts.delete(ip);
    const maxAge = (rememberMe ? 7 : 1) * 24 * 60 * 60;
    const token = await signAdminToken(rememberMe ? 7 : 1);
    const response = NextResponse.json({ success: true });
    response.cookies.set(cookieName, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge
    });
    return response;
  }

  attempts.set(ip, { count: current && current.resetAt > now ? current.count + 1 : 1, resetAt: now + windowMs });
  return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 });
}
