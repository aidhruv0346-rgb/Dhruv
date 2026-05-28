import { NextResponse } from "next/server";
import { getPortfolioRecords } from "@/lib/adminStore";

export async function GET() {
  const projects = (await getPortfolioRecords()).filter((project) => project.status === "published");
  return NextResponse.json(projects.find((project) => project.isFeatured) || projects[0] || null);
}
