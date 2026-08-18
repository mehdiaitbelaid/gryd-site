export const headline = {
  name: "headline",
  title: "Headline",
  type: "object",
  fields: [
    { name: "text", title: "Text", type: "string", validation: (r: any) => r.required() },
    {
      name: "flare",
      title: "Accent word",
      description:
        "One word or short phrase inside the headline, picked out in Solar Flare. Leave empty for no accent.",
      type: "string",
    },
  ],
};
