import { NextRequest, NextResponse } from "next/server";
import { getPortfolioRecords, savePortfolioRecords } from "@/lib/adminStore";
import { requireAdmin } from "@/lib/adminApi";

export async function PATCH(request: NextRequest) {
  const unauthorized = await requireAdmin(request);
  if (unauthorized) return unauthorized;
  const body = await request.json();
  const order = Array.isArray(body.order) ? body.order : [];
  const records = await getPortfolioRecords();
  records.forEach((project) => {
    const index = order.indexOf(project.id);
    if (index >= 0) {
      project.order = index;
      project.displayOrder = index;
      project.updatedAt = new Date().toISOString();
    }
  });
  await savePortfolioRecords(records);
  return NextResponse.json(records);
}
