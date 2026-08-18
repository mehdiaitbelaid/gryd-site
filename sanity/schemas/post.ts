import { bodyField } from "./blocks";

export const post = {
  name: "post",
  title: "Article",
  type: "document",
  fields: [
    { name: "headline", title: "Headline", type: "headline", validation: (r: any) => r.required() },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "headline.text" },
      validation: (r: any) => r.required(),
    },
    {
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
      validation: (r: any) => r.required(),
    },
    { name: "cover", title: "Cover", type: "cover", validation: (r: any) => r.required() },
    { name: "dek", title: "Card standfirst", type: "text", rows: 3 },
    { name: "author", title: "Author", type: "reference", to: [{ type: "author" }] },
    { name: "date", title: "Date", type: "string" },
    { name: "readingTime", title: "Reading time", type: "string" },
    { name: "metaDescription", title: "Meta description", type: "text", rows: 2 },
    { name: "heroTitle", title: "Hero title", type: "string" },
    { name: "heroStanding", title: "Hero standfirst", type: "text", rows: 2 },
    bodyField,
    { name: "closing", title: "Closing panel", type: "closing" },
  ],
};
