import { NextRequest, NextResponse } from "next/server";
import { getContactRecords, saveContactRecords } from "@/lib/contactStore";
import { jsonError, requireAdmin } from "@/lib/adminApi";
import { sendContactResponseEmail } from "@/lib/sendEmail";
import { stripHtml } from "@/lib/utils";

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  const unauthorized = await requireAdmin(request);
  if (unauthorized) return unauthorized;
  const body = await request.json();
  const records = await getContactRecords();
  const index = records.findIndex((item) => item.id === params.id);
  if (index < 0) return jsonError("Contact not found", 404);
  const message = stripHtml(String(body.message || ""));
  records[index].adminResponse = { message, respondedAt: new Date().toISOString() };
  records[index].status = "Replied";
  records[index].updatedAt = new Date().toISOString();
  await saveContactRecords(records);
  await sendContactResponseEmail({ to: records[index].email, name: records[index].fullName, message });
  return NextResponse.json(records[index]);
}
