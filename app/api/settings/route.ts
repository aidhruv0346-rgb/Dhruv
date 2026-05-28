import { NextResponse } from "next/server";
import { getSiteSettings } from "@/lib/adminStore";

export async function GET() {
  return NextResponse.json(await getSiteSettings());
}
