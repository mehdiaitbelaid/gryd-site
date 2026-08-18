export const cover = {
  name: "cover",
  title: "Cover",
  type: "object",
  description: "The photo plus the copy set into it, used on cards and on the detail hero.",
  fields: [
    {
      name: "photo",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", title: "Alt text", type: "string" }],
      validation: (r: any) => r.required(),
    },
    {
      name: "overline",
      title: "Cover title",
      description: "Title Case, set into the artwork.",
      type: "string",
      validation: (r: any) => r.required(),
    },
    { name: "sub", title: "Cover standfirst", type: "string" },
  ],
};
