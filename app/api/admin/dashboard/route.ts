import { NextRequest, NextResponse } from "next/server";
import { getBlogRecords, getPortfolioRecords } from "@/lib/adminStore";
import { getContactRecords } from "@/lib/contactStore";
import { requireAdmin } from "@/lib/adminApi";

export async function GET(request: NextRequest) {
  const unauthorized = await requireAdmin(request);
  if (unauthorized) return unauthorized;

  const [portfolio, blog, contacts] = await Promise.all([getPortfolioRecords(), getBlogRecords(), getContactRecords()]);
  return NextResponse.json({
    stats: {
      portfolio: portfolio.length,
      portfolioPublished: portfolio.filter((project) => project.status === "published").length,
      portfolioDrafts: portfolio.filter((project) => project.status === "draft").length,
      blog: blog.length,
      published: blog.filter((post) => post.status === "published").length,
      drafts: blog.filter((post) => post.status === "draft").length,
      contacts: contacts.length,
      newContacts: contacts.filter((contact) => contact.status === "New").length
    },
    recentPortfolio: portfolio.slice(0, 5),
    recentBlog: blog.slice(0, 5),
    recentContacts: contacts.slice(0, 5)
  });
}
