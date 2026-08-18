export const category = {
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string", validation: (r: any) => r.required() },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (r: any) => r.required(),
    },
    {
      name: "order",
      title: "Order",
      description: "Position in the filter row on the Knowledge Hub listing.",
      type: "number",
    },
  ],
};
