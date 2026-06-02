import { NextRequest, NextResponse } from "next/server";
import { getContactRecords, saveContactRecords } from "@/lib/contactStore";
import { jsonError, requireAdmin } from "@/lib/adminApi";
import { stripHtml } from "@/lib/utils";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const unauthorized = await requireAdmin(request);
  if (unauthorized) return unauthorized;
  const contact = (await getContactRecords()).find((item) => item.id === params.id);
  return contact ? NextResponse.json(contact) : jsonError("Contact not found", 404);
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const unauthorized = await requireAdmin(request);
  if (unauthorized) return unauthorized;
  const body = await request.json();
  const records = await getContactRecords();
  const index = records.findIndex((item) => item.id === params.id);
  if (index < 0) return jsonError("Contact not found", 404);
  records[index] = {
    ...records[index],
    ...body,
    fullName: body.fullName ? stripHtml(String(body.fullName)) : records[index].fullName,
    email: body.email ? stripHtml(String(body.email)) : records[index].email,
    phone: body.phone !== undefined ? stripHtml(String(body.phone || "")) : records[index].phone,
    service: body.service ? stripHtml(String(body.service)) : records[index].service,
    budget: body.budget ? stripHtml(String(body.budget)) : records[index].budget,
    message: body.message ? stripHtml(String(body.message)) : records[index].message,
    updatedAt: new Date().toISOString()
  };
  await saveContactRecords(records);
  return NextResponse.json(records[index]);
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const unauthorized = await requireAdmin(request);
  if (unauthorized) return unauthorized;
  const records = await getContactRecords();
  await saveContactRecords(records.filter((item) => item.id !== params.id));
  return NextResponse.json({ success: true });
}
