import { NextRequest, NextResponse } from "next/server";
import { getContactRecords, makeContactId, saveContactRecords } from "@/lib/contactStore";
import { jsonError, requireAdmin } from "@/lib/adminApi";
import { stripHtml } from "@/lib/utils";

export async function GET(request: NextRequest) {
  const unauthorized = await requireAdmin(request);
  if (unauthorized) return unauthorized;
  const params = request.nextUrl.searchParams;
  const search = params.get("search")?.toLowerCase() || "";
  const status = params.get("status") || "";
  const priority = params.get("priority") || "";
  const service = params.get("service") || "";
  const starred = params.get("starred") || "";
  const dateFrom = params.get("dateFrom") || "";
  const dateTo = params.get("dateTo") || "";
  let records = await getContactRecords();
  if (search) records = records.filter((item) => `${item.fullName} ${item.email} ${item.phone} ${item.message}`.toLowerCase().includes(search));
  if (status) records = records.filter((item) => item.status === status);
  if (priority) records = records.filter((item) => item.priority === priority);
  if (service) records = records.filter((item) => item.service === service);
  if (starred) records = records.filter((item) => String(item.starred) === starred);
  if (dateFrom) records = records.filter((item) => item.createdAt.slice(0, 10) >= dateFrom);
  if (dateTo) records = records.filter((item) => item.createdAt.slice(0, 10) <= dateTo);
  return NextResponse.json(records);
}

export async function POST(request: NextRequest) {
  const unauthorized = await requireAdmin(request);
  if (unauthorized) return unauthorized;
  const body = await request.json();
  if (!body.fullName || !body.email || !body.service || !body.budget || !body.message) return jsonError("Missing required fields");
  const records = await getContactRecords();
  const now = new Date().toISOString();
  const record = {
    id: makeContactId(),
    fullName: stripHtml(String(body.fullName)),
    email: stripHtml(String(body.email)),
    phone: stripHtml(String(body.phone || "")),
    service: stripHtml(String(body.service)),
    budget: stripHtml(String(body.budget)),
    message: stripHtml(String(body.message)),
    agreement: true,
    status: body.status || "New",
    priority: body.priority || "Medium",
    starred: Boolean(body.starred),
    createdAt: now,
    updatedAt: now
  };
  records.unshift(record);
  await saveContactRecords(records);
  return NextResponse.json(record, { status: 201 });
}
