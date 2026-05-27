import { NextRequest, NextResponse } from "next/server";
import { getBlogRecords, saveBlogRecords, slugify } from "@/lib/adminStore";
import { jsonError, requireAdmin } from "@/lib/adminApi";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const unauthorized = await requireAdmin(request);
  if (unauthorized) return unauthorized;
  const record = (await getBlogRecords()).find((item) => item.id === params.id);
  return record ? NextResponse.json(record) : jsonError("Post not found", 404);
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const unauthorized = await requireAdmin(request);
  if (unauthorized) return unauthorized;
  const body = await request.json();
  const records = await getBlogRecords();
  const index = records.findIndex((item) => item.id === params.id);
  if (index < 0) return jsonError("Post not found", 404);
  const nextSlug = body.slug ? slugify(body.slug) : records[index].slug;
  records[index] = { ...records[index], ...body, slug: nextSlug, updatedAt: new Date().toISOString() };
  await saveBlogRecords(records);
  return NextResponse.json(records[index]);
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const unauthorized = await requireAdmin(request);
  if (unauthorized) return unauthorized;
  const records = await getBlogRecords();
  await saveBlogRecords(records.filter((item) => item.id !== params.id));
  return NextResponse.json({ success: true });
}
