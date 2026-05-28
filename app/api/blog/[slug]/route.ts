import { NextResponse } from "next/server";
import { getBlogRecords } from "@/lib/adminStore";

export async function GET(_request: Request, { params }: { params: { slug: string } }) {
  const now = new Date().toISOString();
  const post = (await getBlogRecords()).find((item) => item.slug === params.slug && item.status === "published" && item.publishedAt <= now);
  return post ? NextResponse.json(post) : NextResponse.json({ error: "Post not found" }, { status: 404 });
}
