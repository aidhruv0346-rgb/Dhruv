import { NextRequest, NextResponse } from "next/server";
import { getPortfolioRecords, savePortfolioRecords } from "@/lib/adminStore";
import { jsonError, requireAdmin } from "@/lib/adminApi";

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const unauthorized = await requireAdmin(request);
  if (unauthorized) return unauthorized;
  const records = await getPortfolioRecords();
  const index = records.findIndex((item) => item.id === params.id);
  if (index < 0) return jsonError("Project not found", 404);
  records[index].status = records[index].status === "published" ? "draft" : "published";
  records[index].updatedAt = new Date().toISOString();
  await savePortfolioRecords(records);
  return NextResponse.json(records[index]);
}
