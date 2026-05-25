export default {
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    { name: "title", type: "string", validation: (Rule: any) => Rule.required() },
    { name: "slug", type: "slug", options: { source: "title" } },
    { name: "color", type: "string" }
  ]
};
