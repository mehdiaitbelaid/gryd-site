/* The body of a case study or an article is an ordered list of these blocks.
   Each one maps to a member of the Block union in src/lib/types.ts. */

const lead = {
  name: "lead",
  title: "Lead paragraph",
  type: "object",
  fields: [{ name: "text", title: "Text", type: "text", rows: 3 }],
};

const para = {
  name: "para",
  title: "Paragraph",
  type: "object",
  fields: [{ name: "text", title: "Text", type: "text", rows: 4 }],
};

const h3 = {
  name: "h3",
  title: "Section heading",
  type: "object",
  fields: [{ name: "text", title: "Text", type: "string" }],
};

const h4 = {
  name: "h4",
  title: "Subheading",
  type: "object",
  fields: [{ name: "text", title: "Text", type: "string" }],
};

const bullets = {
  name: "bullets",
  title: "Bulleted list",
  type: "object",
  fields: [{ name: "items", title: "Items", type: "array", of: [{ type: "string" }] }],
};

const quote = {
  name: "quote",
  title: "Pull quote",
  type: "object",
  fields: [
    { name: "text", title: "Quote", type: "text", rows: 3 },
    {
      name: "attribution",
      title: "Attribution",
      description: "Name and role. Leave empty for an unattributed pull quote.",
      type: "string",
    },
  ],
};

const stats = {
  name: "stats",
  title: "Numbers panel",
  type: "object",
  fields: [
    {
      name: "stats",
      title: "Figures",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "lead", title: "Text before the figure", type: "string" },
            { name: "value", title: "Figure", type: "string" },
            { name: "trail", title: "Text after the figure", type: "string" },
            { name: "label", title: "Label", type: "string" },
          ],
        },
      ],
      validation: (r: any) => r.max(4),
    },
    { name: "caption", title: "Caption", type: "string" },
  ],
};

const gallery = {
  name: "gallery",
  title: "Three photo gallery",
  type: "object",
  fields: [
    {
      name: "images",
      title: "Photos",
      type: "array",
      of: [{ type: "image", fields: [{ name: "alt", title: "Alt text", type: "string" }] }],
      validation: (r: any) => r.max(3),
    },
    { name: "caption", title: "Caption", type: "string" },
  ],
};

const figure = {
  name: "figure",
  title: "Wide photo",
  type: "object",
  fields: [
    {
      name: "image",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", title: "Alt text", type: "string" }],
    },
    { name: "caption", title: "Caption", type: "string" },
  ],
};

const spec = {
  name: "spec",
  title: "Project details table",
  type: "object",
  fields: [
    {
      name: "rows",
      title: "Rows",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "term", title: "Term", type: "string" },
            { name: "detail", title: "Detail", type: "string" },
          ],
        },
      ],
    },
  ],
};

export const blocks = [lead, para, h3, h4, bullets, quote, stats, gallery, figure, spec];

export const bodyField = {
  name: "body",
  title: "Body",
  type: "array",
  of: blocks.map((b) => ({ type: b.name })),
};
