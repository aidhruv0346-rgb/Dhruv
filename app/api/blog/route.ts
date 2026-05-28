import { NextRequest, NextResponse } from "next/server";
import { getBlogRecords } from "@/lib/adminStore";

export async function GET(request: NextRequest) {
  const category = request.nextUrl.searchParams.get("category");
  const now = new Date().toISOString();
  const posts = (await getBlogRecords()).filter((post) => post.status === "published" && post.publishedAt <= now);
  return NextResponse.json(category && category !== "All" ? posts.filter((post) => post.category === category) : posts);
}
