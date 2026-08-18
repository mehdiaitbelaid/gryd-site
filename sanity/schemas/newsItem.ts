export const newsItem = {
  name: "newsItem",
  title: "News item",
  type: "document",
  fields: [
    { name: "headline", title: "Headline", type: "string", validation: (r: any) => r.required() },
    { name: "outlet", title: "Outlet", type: "string", validation: (r: any) => r.required() },
    { name: "date", title: "Date", type: "string" },
    {
      name: "year",
      title: "Year",
      description: "Groups the row under a year heading on the listing.",
      type: "string",
    },
    { name: "summary", title: "Summary", type: "text", rows: 3 },
    { name: "href", title: "Destination", type: "url" },
    {
      name: "action",
      title: "Action label",
      description: "Pill at the end of the row, such as Read the article.",
      type: "string",
    },
    {
      name: "own",
      title: "Gryd page",
      description: "On when the destination is a Gryd page rather than an outside outlet.",
      type: "boolean",
      initialValue: false,
    },
  ],
};
