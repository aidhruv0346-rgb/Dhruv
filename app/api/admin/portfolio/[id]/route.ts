import { NextRequest, NextResponse } from "next/server";
import { getPortfolioRecords, sanitizeHtml, savePortfolioRecords, slugify } from "@/lib/adminStore";
import { jsonError, requireAdmin } from "@/lib/adminApi";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const unauthorized = await requireAdmin(request);
  if (unauthorized) return unauthorized;
  const record = (await getPortfolioRecords()).find((item) => item.id === params.id);
  return record ? NextResponse.json(record) : jsonError("Project not found", 404);
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const unauthorized = await requireAdmin(request);
  if (unauthorized) return unauthorized;
  const body = await request.json();
  const records = await getPortfolioRecords();
  const index = records.findIndex((item) => item.id === params.id);
  if (index < 0) return jsonError("Project not found", 404);
  const nextSlug = body.slug ? slugify(body.slug) : records[index].slug;
  const isFeatured = Boolean(body.isFeatured);
  if (isFeatured) records.forEach((project) => { project.isFeatured = project.id === params.id; });
  const order = Number(body.order ?? body.displayOrder ?? records[index].order);
  records[index] = {
    ...records[index],
    ...body,
    slug: nextSlug,
    excerpt: String(body.excerpt || body.resultStat || records[index].excerpt),
    description: sanitizeHtml(String(body.description || records[index].description)),
    resultStat: String(body.resultStat || body.excerpt || records[index].resultStat),
    coverImage: String(body.coverImage || body.imageUrl || records[index].coverImage),
    imageUrl: String(body.imageUrl || body.coverImage || records[index].imageUrl),
    gallery: Array.isArray(body.gallery) ? body.gallery : records[index].gallery,
    technologies: Array.isArray(body.technologies) ? body.technologies : records[index].technologies,
    features: Array.isArray(body.features) ? body.features : records[index].features,
    timeline: Array.isArray(body.timeline) ? body.timeline : records[index].timeline,
    metrics: Array.isArray(body.metrics) ? body.metrics : records[index].metrics,
    isFeatured,
    order,
    displayOrder: order,
    metaDescription: String(body.metaDescription || body.excerpt || body.resultStat || records[index].metaDescription || "").slice(0, 160),
    updatedAt: new Date().toISOString()
  };
  await savePortfolioRecords(records);
  return NextResponse.json(records[index]);
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const unauthorized = await requireAdmin(request);
  if (unauthorized) return unauthorized;
  const records = await getPortfolioRecords();
  await savePortfolioRecords(records.filter((item) => item.id !== params.id));
  return NextResponse.json({ success: true });
}
