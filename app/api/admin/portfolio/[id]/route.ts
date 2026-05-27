import { NextRequest, NextResponse } from "next/server";
import { getPortfolioRecords, savePortfolioRecords } from "@/lib/adminStore";
import { jsonError, requireAdmin } from "@/lib/adminApi";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const unauthorized = await requireAdmin(request);
  if (unauthorized) return unauthorized;
  const record = (await getPortfolioRecords()).find((item) => item.id === params.id);
  return record ? NextResponse.json(record) : jsonError("Project not found", 404);
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const unauthorized = await requireAdmin(request);
  if (unauthorized) return unauthorized;
  const body = await request.json();
  const records = await getPortfolioRecords();
  const index = records.findIndex((item) => item.id === params.id);
  if (index < 0) return jsonError("Project not found", 404);
  records[index] = { ...records[index], ...body, updatedAt: new Date().toISOString() };
  await savePortfolioRecords(records);
  return NextResponse.json(records[index]);
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const unauthorized = await requireAdmin(request);
  if (unauthorized) return unauthorized;
  const records = await getPortfolioRecords();
  await savePortfolioRecords(records.filter((item) => item.id !== params.id));
  return NextResponse.json({ success: true });
}
