export const closing = {
  name: "closing",
  title: "Closing panel",
  type: "object",
  fields: [
    { name: "headline", title: "Headline", type: "headline" },
    { name: "body", title: "Body", type: "text", rows: 3 },
    { name: "ctaLabel", title: "Button label", type: "string" },
    { name: "ctaHref", title: "Button destination", type: "string" },
    {
      name: "alt",
      title: "Secondary links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", title: "Label", type: "string" },
            { name: "href", title: "Destination", type: "string" },
          ],
        },
      ],
    },
  ],
};
