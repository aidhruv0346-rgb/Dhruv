import { NextRequest, NextResponse } from "next/server";
import { getSiteSettings, saveSiteSettings } from "@/lib/adminStore";
import { requireAdmin } from "@/lib/adminApi";

export async function GET(request: NextRequest) {
  const unauthorized = await requireAdmin(request);
  if (unauthorized) return unauthorized;
  return NextResponse.json(await getSiteSettings());
}

export async function PUT(request: NextRequest) {
  const unauthorized = await requireAdmin(request);
  if (unauthorized) return unauthorized;
  const body = await request.json();
  const settings = {
    projectsCompleted: Number(body.projectsCompleted || 0),
    happyClients: Number(body.happyClients || 0),
    yearsExperience: Number(body.yearsExperience || 0),
    adSpendManagedLakhs: Number(body.adSpendManagedLakhs || 0),
    newsletterSubscribers: Number(body.newsletterSubscribers || 0)
  };
  await saveSiteSettings(settings);
  return NextResponse.json(settings);
}
