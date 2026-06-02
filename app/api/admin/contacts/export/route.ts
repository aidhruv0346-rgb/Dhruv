import { NextRequest, NextResponse } from "next/server";
import { contactsToCsv, getContactRecords } from "@/lib/contactStore";
import { requireAdmin } from "@/lib/adminApi";

export async function GET(request: NextRequest) {
  const unauthorized = await requireAdmin(request);
  if (unauthorized) return unauthorized;
  const csv = contactsToCsv(await getContactRecords());
  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="contacts-${new Date().toISOString().slice(0, 10)}.csv"`
    }
  });
}
