import { NextResponse } from "next/server";
import { getPortfolioRecords } from "@/lib/adminStore";

export async function GET(_request: Request, { params }: { params: { slug: string } }) {
  const project = (await getPortfolioRecords()).find((item) => item.slug === params.slug && item.status === "published");
  return project ? NextResponse.json(project) : NextResponse.json({ error: "Project not found" }, { status: 404 });
}
