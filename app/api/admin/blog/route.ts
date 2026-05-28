import { NextRequest, NextResponse } from "next/server";
import { extractTableOfContents, getBlogRecords, readingTime, sanitizeHtml, saveBlogRecords, slugify } from "@/lib/adminStore";
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
  const bodyHtml = sanitizeHtml(String(body.body || body.content || ""));
  if (!body.title || !body.excerpt || !body.category || !bodyHtml) {
    return jsonError("Missing required fields");
  }

  const records = await getBlogRecords();
  let slug = slugify(body.slug || body.title);
  if (records.some((post) => post.slug === slug)) slug = `${slug}-${Date.now()}`;
  const now = new Date().toISOString();
  const isFeatured = Boolean(body.isFeatured);
  if (isFeatured) records.forEach((post) => { post.isFeatured = false; });
  const record = {
    id: makeId("blog"),
    title: String(body.title),
    slug,
    excerpt: String(body.excerpt).slice(0, 200),
    body: bodyHtml,
    content: bodyHtml,
    coverImage: String(body.coverImage || body.featuredImage || "/images/blog-1.svg"),
    featuredImage: String(body.featuredImage || body.coverImage || "/images/blog-1.svg"),
    category: String(body.category),
    tags: Array.isArray(body.tags) ? body.tags : [],
    readTime: Number(body.readTime || readingTime(bodyHtml)),
    author: String(body.author || "Dhruv Pipaliya"),
    isFeatured,
    status: body.status === "published" ? "published" as const : "draft" as const,
    metaTitle: String(body.metaTitle || body.title).slice(0, 60),
    metaDescription: String(body.metaDescription || body.metaDesc || body.excerpt).slice(0, 160),
    metaDesc: String(body.metaDesc || body.metaDescription || body.excerpt).slice(0, 160),
    tableOfContents: extractTableOfContents(bodyHtml),
    publishedAt: String(body.publishedAt || now),
    createdAt: now,
    updatedAt: now
  };
  records.push(record);
  await saveBlogRecords(records);
  return NextResponse.json(record, { status: 201 });
}
