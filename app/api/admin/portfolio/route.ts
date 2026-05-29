import { NextRequest, NextResponse } from "next/server";
import { getPortfolioRecords, sanitizeHtml, savePortfolioRecords, slugify } from "@/lib/adminStore";
import { jsonError, makeId, requireAdmin } from "@/lib/adminApi";

export async function GET(request: NextRequest) {
  const unauthorized = await requireAdmin(request);
  if (unauthorized) return unauthorized;
  return NextResponse.json(await getPortfolioRecords());
}

export async function POST(request: NextRequest) {
  const unauthorized = await requireAdmin(request);
  if (unauthorized) return unauthorized;

  const body = await request.json();
  if (!body.title || !body.category || !body.description || !body.resultStat && !body.excerpt || !body.imageUrl && !body.coverImage) {
    return jsonError("Missing required fields");
  }

  const now = new Date().toISOString();
  const records = await getPortfolioRecords();
  let slug = slugify(body.slug || body.title);
  if (records.some((project) => project.slug === slug)) slug = `${slug}-${Date.now()}`;
  const isFeatured = Boolean(body.isFeatured);
  if (isFeatured) records.forEach((project) => { project.isFeatured = false; });
  const order = Number(body.order ?? body.displayOrder ?? records.length);
  const record = {
    id: makeId("portfolio"),
    slug,
    title: String(body.title),
    category: String(body.category),
    excerpt: String(body.excerpt || body.resultStat),
    clientName: String(body.clientName || ""),
    description: sanitizeHtml(String(body.description)),
    resultStat: String(body.resultStat || body.excerpt),
    coverImage: String(body.coverImage || body.imageUrl || "/images/project-1.svg"),
    imageUrl: String(body.imageUrl || body.coverImage || "/images/project-1.svg"),
    pdfUrl: String(body.pdfUrl || ""),
    projectUrl: String(body.projectUrl || ""),
    year: Number(body.year || new Date().getFullYear()),
    duration: String(body.duration || ""),
    teamSize: String(body.teamSize || ""),
    myRole: String(body.myRole || ""),
    gallery: Array.isArray(body.gallery) ? body.gallery : [],
    technologies: Array.isArray(body.technologies) ? body.technologies : [],
    features: Array.isArray(body.features) ? body.features : [],
    timeline: Array.isArray(body.timeline) ? body.timeline : [],
    isFeatured,
    metrics: Array.isArray(body.metrics) ? body.metrics : [],
    status: body.status === "draft" ? "draft" as const : "published" as const,
    order,
    displayOrder: order,
    tags: Array.isArray(body.tags) ? body.tags : [],
    metaTitle: String(body.metaTitle || body.title).slice(0, 60),
    metaDescription: String(body.metaDescription || body.excerpt || body.resultStat).slice(0, 160),
    createdAt: now,
    updatedAt: now
  };
  records.push(record);
  await savePortfolioRecords(records);
  return NextResponse.json(record, { status: 201 });
}
