import { NextRequest, NextResponse } from "next/server";
import { getBlogRecords, saveBlogRecords, slugify } from "@/lib/adminStore";
import { jsonError, makeId, requireAdmin } from "@/lib/adminApi";

export async function GET(request: NextRequest) {
  const unauthorized = await requireAdmin(request);
  if (unauthorized) return unauthorized;
  const status = request.nextUrl.searchParams.get("status");
  const records = await getBlogRecords();
  return NextResponse.json(status ? records.filter((post) => post.status === status) : records);
}

export async function POST(request: NextRequest) {
  const unauthorized = await requireAdmin(request);
  if (unauthorized) return unauthorized;

  const body = await request.json();
  if (!body.title || !body.excerpt || !body.content || !body.featuredImage || !body.category) {
    return jsonError("Missing required fields");
  }

  const records = await getBlogRecords();
  let slug = slugify(body.slug || body.title);
  if (records.some((post) => post.slug === slug)) slug = `${slug}-${Date.now()}`;
  const now = new Date().toISOString();
  const record = {
    id: makeId("blog"),
    title: String(body.title),
    slug,
    excerpt: String(body.excerpt).slice(0, 200),
    content: String(body.content),
    featuredImage: String(body.featuredImage),
    category: String(body.category),
    tags: Array.isArray(body.tags) ? body.tags : [],
    status: body.status === "published" ? "published" as const : "draft" as const,
    metaTitle: String(body.metaTitle || body.title).slice(0, 60),
    metaDesc: String(body.metaDesc || body.excerpt).slice(0, 160),
    publishedAt: String(body.publishedAt || now),
    createdAt: now,
    updatedAt: now
  };
  records.push(record);
  await saveBlogRecords(records);
  return NextResponse.json(record, { status: 201 });
}
