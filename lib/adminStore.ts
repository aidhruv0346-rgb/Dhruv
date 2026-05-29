import { promises as fs } from "fs";
import path from "path";

export type PortfolioRecord = {
  id: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  clientName?: string;
  description: string;
  resultStat: string;
  coverImage: string;
  imageUrl: string;
  pdfUrl?: string;
  projectUrl?: string;
  year: number;
  duration: string;
  teamSize: string;
  myRole: string;
  gallery: Array<{ url: string; caption: string }>;
  technologies: Array<{ name: string; category: string; icon?: string }>;
  features: string[];
  timeline: Array<{ label: string; value: string }>;
  isFeatured: boolean;
  metrics: Array<{ label: string; value: string }>;
  status: "draft" | "published";
  order: number;
  displayOrder: number;
  tags: string[];
  metaTitle?: string;
  metaDescription?: string;
  createdAt: string;
  updatedAt: string;
};

export type BlogRecord = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  content: string;
  coverImage: string;
  featuredImage: string;
  category: string;
  tags: string[];
  readTime: number;
  author: string;
  isFeatured: boolean;
  status: "draft" | "published";
  metaTitle?: string;
  metaDescription?: string;
  metaDesc?: string;
  tableOfContents: Array<{ id: string; text: string; level: 2 | 3 }>;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
};

const dataDir = path.join(process.cwd(), "data");
const portfolioPath = path.join(dataDir, "portfolio.json");
const blogPath = path.join(dataDir, "blog.json");
const settingsPath = path.join(dataDir, "settings.json");

export type SiteSettings = {
  projectsCompleted: number;
  happyClients: number;
  yearsExperience: number;
  adSpendManagedLakhs: number;
  newsletterSubscribers: number;
};

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
  return records.map(normalizePortfolio).sort((a, b) => a.order - b.order || a.displayOrder - b.displayOrder || b.createdAt.localeCompare(a.createdAt));
}

export async function savePortfolioRecords(records: PortfolioRecord[]) {
  await writeJson(portfolioPath, records);
}

export async function getBlogRecords() {
  const records = await readJson<BlogRecord[]>(blogPath, []);
  return records.map(normalizeBlog).sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export async function saveBlogRecords(records: BlogRecord[]) {
  await writeJson(blogPath, records);
}

export async function getSiteSettings() {
  return readJson<SiteSettings>(settingsPath, {
    projectsCompleted: 50,
    happyClients: 20,
    yearsExperience: 3,
    adSpendManagedLakhs: 10,
    newsletterSubscribers: 0
  });
}

export async function saveSiteSettings(settings: SiteSettings) {
  await writeJson(settingsPath, settings);
}

export function slugify(input: string) {
  return input.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function readingTime(content: string) {
  const words = content.replace(/<[^>]+>/g, " ").trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 220));
}

export function sanitizeHtml(input: string) {
  return String(input || "")
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/<iframe[\s\S]*?>[\s\S]*?<\/iframe>/gi, "")
    .replace(/<object[\s\S]*?>[\s\S]*?<\/object>/gi, "")
    .replace(/<embed[\s\S]*?>[\s\S]*?<\/embed>/gi, "")
    .replace(/\son\w+="[^"]*"/gi, "")
    .replace(/\son\w+='[^']*'/gi, "")
    .replace(/javascript:/gi, "");
}

export function extractTableOfContents(html: string) {
  const headings: Array<{ id: string; text: string; level: 2 | 3 }> = [];
  const used = new Set<string>();
  const regex = /<h([23])[^>]*>(.*?)<\/h\1>/gi;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(html))) {
    const text = match[2].replace(/<[^>]+>/g, "").trim();
    if (!text) continue;
    let id = slugify(text);
    let suffix = 2;
    while (used.has(id)) id = `${slugify(text)}-${suffix++}`;
    used.add(id);
    headings.push({ id, text, level: Number(match[1]) as 2 | 3 });
  }
  return headings;
}

export function addHeadingIds(html: string) {
  return html.replace(/<h([23])([^>]*)>(.*?)<\/h\1>/gi, (_full, level, attrs, inner) => {
    if (/\sid=/.test(attrs)) return `<h${level}${attrs}>${inner}</h${level}>`;
    const id = slugify(inner.replace(/<[^>]+>/g, ""));
    return `<h${level}${attrs} id="${id}">${inner}</h${level}>`;
  });
}

export function normalizeBlog(record: Partial<BlogRecord>): BlogRecord {
  const body = addHeadingIds(sanitizeHtml(String(record.body || record.content || "")));
  const readTimeValue = typeof record.readTime === "number" ? record.readTime : readingTime(body);
  return {
    id: String(record.id || slugify(String(record.title || "blog-post")) || makeFallbackId("blog")),
    title: String(record.title || "Untitled Post"),
    slug: slugify(String(record.slug || record.title || "untitled-post")),
    excerpt: String(record.excerpt || "").slice(0, 200),
    body,
    content: body,
    coverImage: String(record.coverImage || record.featuredImage || "/images/blog-1.svg"),
    featuredImage: String(record.featuredImage || record.coverImage || "/images/blog-1.svg"),
    category: String(record.category || "General"),
    tags: Array.isArray(record.tags) ? record.tags.map(String) : [],
    readTime: readTimeValue,
    author: String(record.author || "Dhruv Pipaliya"),
    isFeatured: Boolean(record.isFeatured),
    status: record.status === "draft" ? "draft" : "published",
    metaTitle: String(record.metaTitle || record.title || "Blog Post").slice(0, 60),
    metaDescription: String(record.metaDescription || record.metaDesc || record.excerpt || "").slice(0, 160),
    metaDesc: String(record.metaDesc || record.metaDescription || record.excerpt || "").slice(0, 160),
    tableOfContents: Array.isArray(record.tableOfContents) ? record.tableOfContents : extractTableOfContents(body),
    publishedAt: String(record.publishedAt || record.createdAt || new Date().toISOString()),
    createdAt: String(record.createdAt || record.publishedAt || new Date().toISOString()),
    updatedAt: String(record.updatedAt || record.publishedAt || new Date().toISOString())
  };
}

export function normalizePortfolio(record: Partial<PortfolioRecord>): PortfolioRecord {
  const order = Number(record.order ?? record.displayOrder ?? 0);
  const excerpt = String(record.excerpt || record.resultStat || "");
  const tags = Array.isArray(record.tags) ? record.tags.map(String) : [];
  const fallbackYear = new Date(record.createdAt || Date.now()).getFullYear();
  return {
    id: String(record.id || slugify(String(record.title || "portfolio-project")) || makeFallbackId("portfolio")),
    slug: slugify(String(record.slug || record.title || "portfolio-project")),
    title: String(record.title || "Untitled Project"),
    category: String(record.category || "SEO"),
    excerpt,
    clientName: String(record.clientName || ""),
    description: sanitizeHtml(String(record.description || "")),
    resultStat: String(record.resultStat || excerpt),
    coverImage: String(record.coverImage || record.imageUrl || "/images/project-1.svg"),
    imageUrl: String(record.imageUrl || record.coverImage || "/images/project-1.svg"),
    pdfUrl: String(record.pdfUrl || ""),
    projectUrl: String(record.projectUrl || ""),
    year: Number(record.year || fallbackYear),
    duration: String(record.duration || "3 months"),
    teamSize: String(record.teamSize || "1 specialist"),
    myRole: String(record.myRole || "Digital Marketing Strategist"),
    gallery: Array.isArray(record.gallery) && record.gallery.length
      ? record.gallery.map((item) => ({ url: String(item.url || ""), caption: String(item.caption || "") })).filter((item) => item.url)
      : [
          { url: String(record.coverImage || record.imageUrl || "/images/project-1.svg"), caption: "Project overview" },
          { url: String(record.imageUrl || record.coverImage || "/images/project-1.svg"), caption: "Campaign snapshot" }
        ],
    technologies: Array.isArray(record.technologies) && record.technologies.length
      ? record.technologies.map((item) => ({ name: String(item.name || ""), category: String(item.category || "Tool"), icon: String(item.icon || "") })).filter((item) => item.name)
      : tags.slice(0, 4).map((tag) => ({ name: tag, category: "Marketing" })),
    features: Array.isArray(record.features) && record.features.length
      ? record.features.map(String)
      : ["Strategy planning", "Creative execution", "Performance tracking", "Optimization reporting"],
    timeline: Array.isArray(record.timeline) && record.timeline.length
      ? record.timeline.map((item) => ({ label: String(item.label || ""), value: String(item.value || "") })).filter((item) => item.label && item.value)
      : [
          { label: "Discovery", value: "Goals, audience, and current performance review" },
          { label: "Execution", value: "Campaign setup, content, and optimization" },
          { label: "Reporting", value: "Results review and next-step recommendations" }
        ],
    isFeatured: Boolean(record.isFeatured),
    metrics: Array.isArray(record.metrics) ? record.metrics.map((metric) => ({ label: String(metric.label || ""), value: String(metric.value || "") })).filter((metric) => metric.label && metric.value) : [],
    status: record.status === "draft" ? "draft" : "published",
    order,
    displayOrder: order,
    tags,
    metaTitle: String(record.metaTitle || record.title || "Portfolio Project").slice(0, 60),
    metaDescription: String(record.metaDescription || excerpt).slice(0, 160),
    createdAt: String(record.createdAt || new Date().toISOString()),
    updatedAt: String(record.updatedAt || new Date().toISOString())
  };
}

function makeFallbackId(prefix: string) {
  return `${prefix}-${Date.now()}`;
}
