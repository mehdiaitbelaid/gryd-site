/* Shapes shared by the mock content layer and the Sanity queries.
   Both sources resolve to these types, so page components never learn which
   one is behind them. */

export type Photo = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

/** A headline plus the single word inside it that carries Solar Flare. */
export type Headline = {
  text: string;
  flare?: string;
};

export type Stat = {
  /** Text before the highlighted figure, for values such as "20 to 70%". */
  lead?: string;
  value: string;
  /** Text after the highlighted figure, for values such as "500MW". */
  trail?: string;
  label: string;
};

export type SpecRow = { term: string; detail: string };

/** A table exactly as the live site publishes it. Cells are never reworded into
    prose, so comparison tables survive the migration intact. */
export type TableBlock = { _type: "table"; head: string[]; rows: string[][] };

export type Block =
  | { _type: "lead"; text: string }
  | { _type: "para"; text: string }
  | { _type: "h3"; text: string }
  | { _type: "h4"; text: string }
  | { _type: "bullets"; items: string[] }
  | { _type: "quote"; text: string; attribution?: string }
  | { _type: "stats"; stats: Stat[]; caption: string }
  | { _type: "gallery"; images: Photo[]; caption: string }
  | { _type: "figure"; image: Photo; caption: string }
  | { _type: "spec"; rows: SpecRow[] }
  | TableBlock;

export type Author = {
  name: string;
  /** Two letter monogram for the byline disc. */
  initials: string;
};

export type Category = {
  slug: string;
  title: string;
};

/** Copy set into the cover artwork, the device that makes the covers read as a set. */
export type Cover = {
  photo: Photo;
  overline: string;
  sub: string;
};

export type Project = {
  slug: string;
  cover: Cover;
  pill: string;
  headline: Headline;
  /** Short facts under the card, such as location and plot count. */
  facts: string[];
  heroTitle: string;
  heroStanding: string;
  author: Author;
  date: string;
  body: Block[];
  closing: Closing;
};

export type Post = {
  slug: string;
  category: Category;
  cover: Cover;
  headline: Headline;
  dek: string;
  author: Author;
  date: string;
  /** Reading time, shown after the date on the article page. */
  readingTime?: string;
  metaDescription?: string;
  heroTitle: string;
  heroStanding: string;
  body: Block[];
  closing: Closing;
};

export type NewsItem = {
  id: string;
  date: string;
  year: string;
  outlet: string;
  headline: string;
  summary: string;
  href: string;
  /** Label on the pill at the end of the row, such as "Read the article". */
  action: string;
  /** True when the destination is a Gryd page rather than an outside outlet. */
  own: boolean;
};

export type Closing = {
  headline: Headline;
  body: string;
  ctaLabel: string;
  ctaHref: string;
  alt: { label: string; href: string }[];
};
