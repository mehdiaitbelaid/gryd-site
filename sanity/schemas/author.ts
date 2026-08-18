export const author = {
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    { name: "name", title: "Name", type: "string", validation: (r: any) => r.required() },
    {
      name: "initials",
      title: "Initials",
      description: "Two letters for the byline disc, such as SW.",
      type: "string",
      validation: (r: any) => r.required().max(2),
    },
  ],
};
