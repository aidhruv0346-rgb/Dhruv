import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/adminAuth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === "/admin" || !pathname.startsWith("/admin/")) {
    return NextResponse.next();
  }

  const allowed = await isAdminRequest(request);
  if (allowed) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = "/admin";
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/admin/:path*"]
};
