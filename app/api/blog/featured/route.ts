import { NextResponse } from "next/server";
import { getBlogRecords } from "@/lib/adminStore";

export async function GET() {
  const now = new Date().toISOString();
  const posts = (await getBlogRecords()).filter((post) => post.status === "published" && post.publishedAt <= now);
  return NextResponse.json(posts.find((post) => post.isFeatured) || posts[0] || null);
}
