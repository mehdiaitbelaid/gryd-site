import { groq } from "next-sanity";

/* GROQ projections shaped to match src/lib/types.ts one for one, so the Sanity
   path and the mock path hand page components identical objects. */

const coverFields = groq`
  "cover": {
    "photo": {
      "src": cover.photo.asset->url,
      "alt": coalesce(cover.photo.alt, ""),
      "width": cover.photo.asset->metadata.dimensions.width,
      "height": cover.photo.asset->metadata.dimensions.height
    },
    "overline": cover.overline,
    "sub": cover.sub
  }
`;

const authorFields = groq`"author": { "name": author->name, "initials": author->initials }`;

export const projectListQuery = groq`
  *[_type == "project"] | order(date desc) {
    "slug": slug.current,
    ${coverFields},
    pill,
    headline,
    facts
  }
`;

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    "slug": slug.current,
    ${coverFields},
    pill,
    headline,
    facts,
    heroTitle,
    heroStanding,
    ${authorFields},
    date,
    body,
    closing
  }
`;

export const postListQuery = groq`
  *[_type == "post"] | order(date desc) {
    "slug": slug.current,
    "category": { "slug": category->slug.current, "title": category->title },
    ${coverFields},
    headline,
    dek,
    ${authorFields},
    date
  }
`;

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    "slug": slug.current,
    "category": { "slug": category->slug.current, "title": category->title },
    ${coverFields},
    headline,
    dek,
    ${authorFields},
    date,
    readingTime,
    metaDescription,
    heroTitle,
    heroStanding,
    body,
    closing
  }
`;

export const categoryListQuery = groq`
  *[_type == "category"] | order(order asc) { "slug": slug.current, title }
`;

export const newsListQuery = groq`
  *[_type == "newsItem"] | order(date desc) {
    "id": _id,
    date,
    year,
    outlet,
    headline,
    summary,
    href,
    action,
    own
  }
`;
