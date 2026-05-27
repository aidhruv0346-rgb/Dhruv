import { NextRequest, NextResponse } from "next/server";
import { getBlogRecords, getPortfolioRecords } from "@/lib/adminStore";
import { requireAdmin } from "@/lib/adminApi";

export async function GET(request: NextRequest) {
  const unauthorized = await requireAdmin(request);
  if (unauthorized) return unauthorized;

  const [portfolio, blog] = await Promise.all([getPortfolioRecords(), getBlogRecords()]);
  return NextResponse.json({
    stats: {
      portfolio: portfolio.length,
      blog: blog.length,
      published: blog.filter((post) => post.status === "published").length,
      drafts: blog.filter((post) => post.status === "draft").length
    },
    recentPortfolio: portfolio.slice(0, 5),
    recentBlog: blog.slice(0, 5)
  });
}
