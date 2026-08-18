import { bodyField } from "./blocks";

export const project = {
  name: "project",
  title: "Project",
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
    { name: "cover", title: "Cover", type: "cover", validation: (r: any) => r.required() },
    {
      name: "pill",
      title: "Label",
      description: "Shown on the card pill, such as Case study or Analysis.",
      type: "string",
    },
    {
      name: "facts",
      title: "Card facts",
      description: "Short facts under the card, such as location and plot count.",
      type: "array",
      of: [{ type: "string" }],
    },
    { name: "heroTitle", title: "Hero title", type: "string" },
    { name: "heroStanding", title: "Hero standfirst", type: "text", rows: 2 },
    { name: "author", title: "Author", type: "reference", to: [{ type: "author" }] },
    { name: "date", title: "Date", type: "string" },
    bodyField,
    { name: "closing", title: "Closing panel", type: "closing" },
  ],
};
