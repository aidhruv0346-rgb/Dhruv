import { NextRequest, NextResponse } from "next/server";
import { getPortfolioRecords, savePortfolioRecords } from "@/lib/adminStore";
import { jsonError, makeId, requireAdmin } from "@/lib/adminApi";

export async function GET(request: NextRequest) {
  const unauthorized = await requireAdmin(request);
  if (unauthorized) return unauthorized;
  return NextResponse.json(await getPortfolioRecords());
}

export async function POST(request: NextRequest) {
  const unauthorized = await requireAdmin(request);
  if (unauthorized) return unauthorized;

  const body = await request.json();
  if (!body.title || !body.category || !body.description || !body.resultStat || !body.imageUrl) {
    return jsonError("Missing required fields");
  }

  const now = new Date().toISOString();
  const records = await getPortfolioRecords();
  const record = {
    id: makeId("portfolio"),
    title: String(body.title),
    category: String(body.category),
    clientName: String(body.clientName || ""),
    description: String(body.description),
    resultStat: String(body.resultStat),
    imageUrl: String(body.imageUrl),
    projectUrl: String(body.projectUrl || ""),
    isFeatured: Boolean(body.isFeatured),
    displayOrder: Number(body.displayOrder || 0),
    tags: Array.isArray(body.tags) ? body.tags : [],
    createdAt: now,
    updatedAt: now
  };
  records.push(record);
  await savePortfolioRecords(records);
  return NextResponse.json(record, { status: 201 });
}
