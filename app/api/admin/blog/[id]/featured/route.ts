import { NextRequest, NextResponse } from "next/server";
import { getBlogRecords, saveBlogRecords } from "@/lib/adminStore";
import { jsonError, requireAdmin } from "@/lib/adminApi";

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const unauthorized = await requireAdmin(request);
  if (unauthorized) return unauthorized;
  const records = await getBlogRecords();
  const index = records.findIndex((item) => item.id === params.id);
  if (index < 0) return jsonError("Post not found", 404);
  records.forEach((post) => { post.isFeatured = post.id === params.id; });
  records[index].updatedAt = new Date().toISOString();
  await saveBlogRecords(records);
  return NextResponse.json(records[index]);
}
