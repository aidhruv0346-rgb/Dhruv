import { promises as fs } from "fs";
import path from "path";

export type PortfolioRecord = {
  id: string;
  title: string;
  category: string;
  clientName?: string;
  description: string;
  resultStat: string;
  imageUrl: string;
  projectUrl?: string;
  isFeatured: boolean;
  displayOrder: number;
  tags: string[];
  createdAt: string;
  updatedAt: string;
};

export type BlogRecord = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  category: string;
  tags: string[];
  status: "draft" | "published";
  metaTitle?: string;
  metaDesc?: string;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
};

const dataDir = path.join(process.cwd(), "data");
const portfolioPath = path.join(dataDir, "portfolio.json");
const blogPath = path.join(dataDir, "blog.json");

async function readJson<T>(filePath: string, fallback: T): Promise<T> {
  try {
    return JSON.parse(await fs.readFile(filePath, "utf-8")) as T;
  } catch {
    return fallback;
  }
}

async function writeJson(filePath: string, data: unknown) {
  await fs.mkdir(dataDir, { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}

export async function getPortfolioRecords() {
  const records = await readJson<PortfolioRecord[]>(portfolioPath, []);
  return records.sort((a, b) => a.displayOrder - b.displayOrder || b.createdAt.localeCompare(a.createdAt));
}

export async function savePortfolioRecords(records: PortfolioRecord[]) {
  await writeJson(portfolioPath, records);
}

export async function getBlogRecords() {
  const records = await readJson<BlogRecord[]>(blogPath, []);
  return records.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export async function saveBlogRecords(records: BlogRecord[]) {
  await writeJson(blogPath, records);
}

export function slugify(input: string) {
  return input.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function readingTime(content: string) {
  const words = content.replace(/<[^>]+>/g, " ").trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 220))} min read`;
}
