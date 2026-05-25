export default {
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    { name: "title", type: "string", validation: (Rule: any) => Rule.required() },
    { name: "slug", type: "slug", options: { source: "title" }, validation: (Rule: any) => Rule.required() },
    { name: "publishedAt", type: "datetime" },
    { name: "excerpt", type: "text", validation: (Rule: any) => Rule.max(200) },
    { name: "featuredImage", type: "image", options: { hotspot: true }, fields: [{ name: "alt", type: "string" }] },
    { name: "category", type: "reference", to: [{ type: "category" }] },
    { name: "tags", type: "array", of: [{ type: "string" }] },
    { name: "body", type: "array", of: [{ type: "block" }, { type: "image" }] },
    { name: "author", type: "reference", to: [{ type: "author" }] },
    { name: "seo", type: "object", fields: [{ name: "metaTitle", type: "string" }, { name: "metaDescription", type: "text" }, { name: "ogImage", type: "image" }] }
  ]
};
