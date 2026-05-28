import { NextRequest, NextResponse } from "next/server";
import { getPortfolioRecords } from "@/lib/adminStore";

export async function GET(request: NextRequest) {
  const category = request.nextUrl.searchParams.get("category");
  const projects = (await getPortfolioRecords()).filter((project) => project.status === "published");
  return NextResponse.json(category && category !== "All" ? projects.filter((project) => project.category === category) : projects);
}
