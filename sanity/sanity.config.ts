import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import post from "./schemas/post";
import category from "./schemas/category";
import author from "./schemas/author";

export default defineConfig({
  name: "dhruv_pipaliya",
  title: "Dhruv Pipaliya Blog",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "demo",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  plugins: [structureTool()],
  schema: { types: [post, category, author] }
});
