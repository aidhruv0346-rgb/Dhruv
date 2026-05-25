import { BarChart3, Code2, Edit3, Feather, Megaphone, Search, Share2, Target } from "lucide-react";

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" }
];

export const services = [
  {
    title: "SEO Optimization",
    slug: "seo",
    icon: Search,
    desc: "Rank higher on Google with on-page, off-page, and technical SEO strategies.",
    tags: ["On-Page SEO", "Link Building", "Audit"],
    included: ["Full website SEO audit", "Keyword research and strategy", "On-page optimization", "Technical SEO fixes", "Link building", "Monthly performance reports", "Search Console and Analytics setup"]
  },
  {
    title: "Social Media Management",
    slug: "social-media",
    icon: Share2,
    desc: "Grow your audience and engagement across Instagram, Facebook, and LinkedIn.",
    tags: ["Content Calendar", "Reels", "Analytics"],
    included: ["Monthly content calendar", "Custom post design", "Caption writing", "Stories and Reels strategy", "Community management", "Monthly analytics report"]
  },
  {
    title: "Blog Writing",
    slug: "blog-writing",
    icon: Edit3,
    desc: "SEO-optimized, engaging blog content that attracts traffic and builds authority.",
    tags: ["Long-form", "Research", "SEO"],
    included: ["Topic research", "Keyword-integrated writing", "Long-form articles", "Internal linking", "Meta title and description", "WordPress upload and formatting"]
  },
  {
    title: "Meta Ads",
    slug: "meta-ads",
    icon: Target,
    desc: "High-converting Meta ad campaigns that drive leads and sales for your business.",
    tags: ["Facebook Ads", "Instagram Ads", "Retargeting"],
    included: ["Ad account setup", "Pixel configuration", "Audience research", "Ad creative design", "A/B testing", "Campaign optimization", "Weekly reports"]
  },
  {
    title: "WordPress Development",
    slug: "wordpress",
    icon: Code2,
    desc: "Fast, responsive, and SEO-ready WordPress websites built to convert visitors.",
    tags: ["Custom Theme", "WooCommerce", "Speed"],
    included: ["Custom WordPress design", "Responsive layouts", "WooCommerce setup", "Performance optimization", "Yoast or RankMath setup", "Forms and CTA integration", "Post-launch support"]
  },
  {
    title: "Content Copywriting",
    slug: "copywriting",
    icon: Feather,
    desc: "Persuasive copy for websites, landing pages, ads, and emails that converts.",
    tags: ["Landing Pages", "Ad Copy", "Email"],
    included: ["Homepage copy", "Landing page copy", "About and service pages", "Meta ad copy", "Email newsletters", "Product descriptions", "Voice and tone guide"]
  }
];

export const skills = ["SEO", "Meta Ads", "WordPress", "Canva", "Google Analytics", "Ahrefs", "Semrush", "Yoast SEO", "Facebook Ads Manager", "Content Strategy"];

export const stats = [
  { label: "Projects Completed", value: 50, suffix: "+" },
  { label: "Happy Clients", value: 20, suffix: "+" },
  { label: "Years Experience", value: 3, suffix: "+" },
  { label: "Ad Spend Managed", value: 10, suffix: "L+" }
];

type Project = {
  title: string;
  category: string;
  stat: string;
  image: string;
  href?: string;
};

export const projects: Project[] = [
  {
    title: "Social Media Management Portfolio",
    category: "Social Media",
    stat: "View Dhruv's social media management portfolio PDF",
    image: "/images/project-2.svg",
    href: "/portfolio/social-media-management-portfolio.pdf"
  },
  ["Surat Retail SEO Sprint", "SEO", "Increased organic traffic by 145% in 3 months"],
  ["FashionHub Meta Lead Engine", "Meta Ads", "Reduced cost per lead by 52%"],
  ["TechStart WordPress Rebuild", "WordPress", "Improved page speed score to 96"],
  ["Local Clinic Social Growth", "Social Media", "Grew Instagram reach by 210%"],
  ["B2B SaaS Blog Cluster", "Blog", "35 keywords moved into Top 10"],
  ["E-commerce Landing Copy", "Copywriting", "Lifted conversion rate by 38%"],
  ["Restaurant Local SEO", "SEO", "Tripled maps direction requests"],
  ["Real Estate Lead Ads", "Meta Ads", "Generated 420 qualified leads"],
  ["Founder Personal Brand", "Social Media", "Reached 1M impressions"],
  ["D2C Store Build", "WordPress", "Launched WooCommerce in 21 days"],
  ["Finance Content Hub", "Blog", "Built 24 ranking articles"],
  ["Course Sales Page", "Copywriting", "Doubled webinar signups"]
].map((project, index): Project => Array.isArray(project) ? { title: project[0], category: project[1], stat: project[2], image: `/images/project-${(index % 3) + 1}.svg` } : project);

export const testimonials = [
  ["Rajesh Mehta", "Founder, RetailPro Surat", "Dhruv transformed our website's search ranking completely. Within 4 months, we went from page 5 to page 1 for our main keywords."],
  ["Priya Shah", "Marketing Manager, FashionHub", "The Meta ads campaign Dhruv managed generated 3x more leads than our previous agency, at half the cost per lead."],
  ["Amit Patel", "CEO, TechStart India", "Our WordPress site is fast, beautiful, and ranks well. Dhruv delivered ahead of schedule with outstanding communication."]
].map(([name, role, quote]) => ({ name, role, quote }));

export const posts = [
  ["How to Build an SEO Strategy That Compounds", "SEO", "A practical framework for keyword clusters, content quality, and technical foundations.", "8 min read"],
  ["Meta Ads Testing: What to Change First", "Meta Ads", "Simple experiments that reveal better audiences, offers, and creatives.", "6 min read"],
  ["The WordPress Launch Checklist I Use", "WordPress", "Speed, SEO, tracking, forms, and trust signals before launch day.", "7 min read"],
  ["Writing Blog Posts That Actually Rank", "Blog", "How to blend search intent, structure, and useful examples.", "5 min read"],
  ["Social Media Calendars for Busy Founders", "Social Media", "A lean cadence that keeps your brand visible without chaos.", "4 min read"],
  ["Conversion Copy Basics for Landing Pages", "Copywriting", "Message hierarchy, proof, friction removal, and sharper CTAs.", "6 min read"]
].map(([title, category, excerpt, readTime], index) => ({ title, category, excerpt, readTime, slug: title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""), image: `/images/blog-${(index % 3) + 1}.svg`, date: "May 12, 2026" }));

export const features = ["Data-Driven Strategy", "Transparent Reporting", "On-Time Delivery", "SEO-First Mindset", "Creative + Analytical Balance", "Dedicated Support"];

export const processSteps = [
  ["Discovery Call", "We connect to understand your goals, challenges, and target audience."],
  ["Strategy & Planning", "I create a custom strategy and action plan tailored to your goals."],
  ["Execution & Delivery", "I implement with transparency, updates, and clear ownership."],
  ["Review & Optimize", "We analyze results, report performance, and improve continuously."]
].map(([title, desc], index) => ({ title, desc, icon: [Megaphone, BarChart3, Target, Search][index] }));
