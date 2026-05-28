import { promises as fs } from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import { jsonError, makeId, requireAdmin } from "@/lib/adminApi";

export async function POST(request: NextRequest) {
  const unauthorized = await requireAdmin(request);
  if (unauthorized) return unauthorized;

  const formData = await request.formData();
  const file = formData.get("file");
  if (!(file instanceof File)) return jsonError("No file uploaded");
  if (!["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml", "application/pdf"].includes(file.type)) return jsonError("Invalid file type");
  if (file.size > 5 * 1024 * 1024) return jsonError("File must be under 5MB");

  const extension = file.name.split(".").pop() || "png";
  const filename = `${makeId("upload")}.${extension}`;
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  await fs.mkdir(uploadDir, { recursive: true });
  await fs.writeFile(path.join(uploadDir, filename), Buffer.from(await file.arrayBuffer()));
  return NextResponse.json({ url: `/uploads/${filename}` });
}
