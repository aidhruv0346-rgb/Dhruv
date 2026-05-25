export default {
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    { name: "name", type: "string", validation: (Rule: any) => Rule.required() },
    { name: "bio", type: "text" },
    { name: "photo", type: "image", options: { hotspot: true } },
    { name: "social", type: "object", fields: [{ name: "linkedin", type: "url" }, { name: "instagram", type: "url" }, { name: "twitter", type: "url" }] }
  ]
};
