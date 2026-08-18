import fs from "node:fs";
import path from "node:path";

/* Rebuilds src/lib/cards.ts: the title, standfirst, category, byline and date
   each article carries on the live gryd.energy listings.

   The Knowledge Hub listing runs to two pages. Page one is in the verbatim
   capture. Page two is not, so its standfirsts were read off the live page at
   https://gryd.energy/blog/2/ and are checked here against the meta description
   the capture holds for the same article, which is the same string on the live
   site apart from the capture flattening en dashes. Any drift fails the run. */

const DIR = "/Users/mehdiaitbelaid/Desktop/Gryd/gryd-homepage/content-ref";
const OUT = "/Users/mehdiaitbelaid/Desktop/gryd-site/src/lib";

/** Live URL slug to the slug this site uses. */
const routes = {
  "gryds-council-housing-solar-rankings-2026-which-regions-are-leading-and-which-are-falling-behind": "council-housing-solar-index-2026",
  "rooftop-solar-vs-solar-farms": "why-solar-farms-keep-getting-rejected",
  "funded-solar-storage-new-build-homes-guide": "complete-guide-to-funded-solar",
  "sap-scores-vs-real-energy-use-why-developers-are-missing-half-the-picture": "sap-scores-versus-real-energy-use",
  "the-future-homes-standard-how-to-differentiate-when-everyone-must-comply": "future-homes-standard-differentiate",
  "future-homes-standard-how-to-calculate-how-much-solar-you-need": "how-much-solar-do-you-need",
  "the-future-homes-standard-is-published-heres-the-confirmed-timeline-for-implementation": "future-homes-standard-timeline",
  "future-homes-standard-explained": "future-homes-standard-solar-mandate",
  "why-solar-matters-for-the-future-of-affordable-housing": "solar-and-affordable-housing",
  "breaking-the-green-premium-why-its-holding-back-affordable-competitive-homes": "breaking-the-green-premium",
  "rising-energy-demand-why-new-build-homes-need-bigger-solar-systems": "rising-energy-demand-bigger-systems",
  "best-roof-types-for-solar-panels-a-guide-for-housebuilders": "best-roof-types-for-solar",
  "integrating-solar-and-heat-pumps-in-new-builds-a-guide-for-housebuilders": "integrating-solar-and-heat-pumps",
  "how-solar-helps-housebuilders-meet-epc-targets": "how-solar-helps-meet-epc-targets",
  "what-is-gryd-how-were-changing-the-way-homes-are-powered": "what-is-gryd",
  "solar-panel-maintenance-and-replacement-costs-what-builders-and-buyers-should-know": "solar-maintenance-and-replacement-costs",
  "do-you-need-a-solar-battery-benefits-for-new-build-homes": "do-you-need-a-solar-battery",
  "how-onsite-battery-storage-can-solve-grid-constraints-and-improve-project-viability": "battery-storage-and-grid-constraints",
  "solar-providers-compared-gryd-vs-zero-bills-vs-snrg": "solar-providers-compared",
  "a-simple-guide-to-solar-leases-how-they-work-and-why-theyre-growing": "a-simple-guide-to-solar-leases",
  "mandatory-solar-panels-in-new-homes-what-housebuilders-need-to-know": "mandatory-solar-panels-in-new-homes",
  "how-gryd-helped-deliver-higher-sustainability-without-adding-a-penny-to-the-build-cost": "project:lower-farm-mews",
  "funded-solar-and-battery-for-three-new-build-homes-in-st-ives-cornwall-a-year-with-a-gryd-solar-subscription": "project:st-ives-year-of-data",
  "independent-developer-analysis-of-gryd-on-a-55-home-site": "project:fifty-five-plot-analysis",
};

/** File each article was captured into, for the meta description cross-check. */
const files = Object.fromEntries(
  fs
    .readdirSync(DIR)
    .filter((f) => f.startsWith("article-"))
    .map((f) => [f.replace(/^article-|\.md$/g, ""), f]),
);

const ws = (s) => s.replace(/ /g, " ").replace(/\s{2,}/g, " ").trim();

/** Reads title, standfirst, byline, date and category off a captured listing. */
function readListing(file, hasCategory) {
  const raw = fs.readFileSync(path.join(DIR, file), "utf8");
  const start = raw.indexOf("## Body copy");
  const body = raw.slice(raw.indexOf("\n", start) + 1, raw.indexOf("[link] Home ->"));
  const lines = body.split("\n").map((l) => l.trim()).filter(Boolean);

  const out = {};
  for (let i = 0; i < lines.length; i += 1) {
    if (!lines[i].startsWith("### ")) continue;
    const title = ws(lines[i].slice(4));
    const category = hasCategory ? ws(lines[i - 1]) : null;
    const dek = ws(lines[i + 1]);
    const link = lines[i + 2];
    if (!link.startsWith("[link] Read More")) throw new Error(`unexpected listing shape at "${title}"`);
    const url = link.split("-> ")[1].trim();
    const slug = routes[url.replace(/^https:\/\/gryd\.energy\/|\/$/g, "")];
    if (!slug) throw new Error(`unmapped listing url ${url}`);
    out[slug] = { title, dek, category, author: ws(lines[i + 3]), date: ws(lines[i + 4]), from: file };
  }
  return out;
}

/* Knowledge Hub page two, read off the live listing on 2026-08-18. Verified
   below against each article's captured meta description. */
const PAGE_TWO_SOURCE = "https://gryd.energy/blog/2/";
const pageTwo = {
  "integrating-solar-and-heat-pumps": {
    category: "Solar",
    dek: "As heat pumps replace gas, solar is the perfect partner. This guide explores how pairing ASHPs with smart solar systems can cut energy costs, manage SAP performance, and boost home efficiency.",
  },
  "how-solar-helps-meet-epc-targets": {
    category: "EPC",
    // No meta description on this article, so the listing shows a truncated
    // opener. It is truncated on the live site too and is reproduced as found.
    dek: "The UK housing market has never been more focused on energy efficiency. Buyers increasingly want homes with lower running costs and greater energy independence. Lenders",
    truncated: true,
  },
  "what-is-gryd": {
    category: "Solar",
    dek: "The homes of tomorrow start with solar today. Learn how Gryd’s solar subscription model is making clean energy simple, accessible, and seamlessly built into new homes – no upfront cost, no added complexity.",
  },
  "solar-maintenance-and-replacement-costs": {
    category: "Maintenance",
    dek: "What’s the real cost of solar ownership? This guide breaks down UK solar panel maintenance and replacement costs – and compares leasing vs ownership to help builders and buyers plan for the long term.",
  },
  "do-you-need-a-solar-battery": {
    category: "Batteries",
    dek: "Rooftop solar is becoming mandatory – so what’s next? Discover how home batteries unlock energy independence, bigger savings, and long-term resilience – and how Gryd makes it simple, with no upfront cost.",
  },
  "battery-storage-and-grid-constraints": {
    category: "Batteries",
    dek: "Facing grid constraints on your new build projects? Learn how on-site solar and batteries can cut connection costs, boost viability, and meet low-carbon planning goals – without waiting on grid upgrades.",
  },
  "solar-providers-compared": {
    category: "Energy",
    dek: "Navigating solar options for new builds? This guide compares Gryd, Zero Bills, and microgrid solutions like SNRG – breaking down costs, ownership models, and resale impact – to help you choose the right fit for your project and buyers.",
  },
  "a-simple-guide-to-solar-leases": {
    category: "Solar Leases",
    dek: "A new solar model is changing the game. Learn how Gryd’s modern solar lease makes it easy to future-proof homes, cut carbon, and fight fuel poverty – without upfront costs or maintenance hassle.",
  },
  "mandatory-solar-panels-in-new-homes": {
    category: "Regulation",
    dek: "Mandatory solar is coming by 2027. With the Future Homes Standard on the horizon, learn how fully funded solar solutions can help you stay compliant, meet buyer demand, and boost project viability – without the upfront cost.",
  },
};

/* ---- assemble -------------------------------------------------------------- */

const cards = { ...readListing("listing-projects.md", false), ...readListing("listing-knowledge-hub-blog.md", true) };

// Article H1, publish date and byline come from the article page itself.
const articleMeta = {};
for (const [urlSlug, slug] of Object.entries(routes)) {
  const file = files[urlSlug];
  if (!file) throw new Error(`no capture for ${urlSlug}`);
  const raw = fs.readFileSync(path.join(DIR, file), "utf8");
  const bodyStart = raw.indexOf("## Body copy");
  const lines = raw.slice(bodyStart).split("\n").map((l) => l.trim()).filter(Boolean);
  const h1 = lines.find((l) => l.startsWith("# "));
  const meta = lines.filter((l) => l.startsWith("- ")).slice(0, 2);
  const desc = raw.match(/^- Meta description: (.*)$/m)?.[1] ?? "(none)";
  articleMeta[slug] = {
    title: ws(h1.slice(2)),
    date: ws(meta[0].slice(2)),
    author: ws(meta[1].slice(2)),
    metaDescription: desc === "(none)" ? null : ws(desc),
    file,
  };
}

// Fill the page-two articles, checking each standfirst against the capture.
const dashless = (s) => s.replace(/[–—-]/g, "-").replace(/[’']/g, "'");
const problems = [];
for (const [slug, entry] of Object.entries(pageTwo)) {
  const am = articleMeta[slug];
  if (entry.truncated) {
    if (am.metaDescription) problems.push(`${slug}: expected no meta description for a truncated standfirst`);
  } else if (dashless(am.metaDescription ?? "") !== dashless(entry.dek)) {
    problems.push(
      `${slug}: live standfirst does not match the captured meta description\n  live: ${entry.dek}\n  capt: ${am.metaDescription}`,
    );
  }
  cards[slug] = {
    title: am.title,
    dek: entry.dek,
    category: entry.category,
    author: am.author,
    date: am.date,
    from: PAGE_TWO_SOURCE,
    truncated: entry.truncated ?? false,
  };
}

// Every card must agree with its own article page on title, byline and date.
for (const [slug, c] of Object.entries(cards)) {
  const am = articleMeta[slug];
  if (!am) problems.push(`${slug}: card has no article capture`);
  else {
    if (c.title !== am.title) problems.push(`${slug}: listing title differs from article H1\n  list: ${c.title}\n  page: ${am.title}`);
    if (c.author !== am.author) problems.push(`${slug}: byline differs, ${c.author} vs ${am.author}`);
    if (c.date !== am.date) problems.push(`${slug}: date differs, ${c.date} vs ${am.date}`);
  }
  c.metaDescription = am?.metaDescription ?? null;
}

const missing = Object.values(routes).filter((s) => !cards[s]);
if (missing.length) problems.push(`no listing entry for: ${missing.join(", ")}`);

if (problems.length) {
  console.error("card checks failed:\n" + problems.map((p) => `  - ${p}`).join("\n"));
  process.exit(1);
}

const ordered = Object.fromEntries(Object.values(routes).map((s) => [s, cards[s]]));

const ts = `import type { Author } from "./types";

/* Titles, standfirsts, categories, bylines and dates exactly as the live
   gryd.energy listings publish them. Generated by docs/migrate-cards.mjs.
   Do not hand edit, regenerate instead. */

export type Card = {
  /** The article title, verbatim. */
  title: string;
  /** The standfirst shown on the listing card, verbatim. */
  dek: string;
  /** The live category label. Null on the three case studies, which the
      Projects listing files under no category. */
  category: string | null;
  author: string;
  date: string;
  /** Set where the live listing itself cuts the standfirst off mid sentence. */
  truncated: boolean;
  metaDescription: string | null;
};

export const cards: Record<string, Card> = ${JSON.stringify(
  Object.fromEntries(
    Object.entries(ordered).map(([k, v]) => [
      k,
      {
        title: v.title,
        dek: v.dek,
        category: v.category,
        author: v.author,
        date: v.date,
        truncated: v.truncated ?? false,
        metaDescription: v.metaDescription,
      },
    ]),
  ),
  null,
  2,
)};

export const authors: Record<string, Author> = {
  "Scott Whiteside": { name: "Scott Whiteside", initials: "SW" },
  "Danielle Todd": { name: "Danielle Todd", initials: "DT" },
  "Hugo Radford": { name: "Hugo Radford", initials: "HR" },
};
`;
fs.writeFileSync(path.join(OUT, "cards.ts"), ts);
fs.writeFileSync("/Users/mehdiaitbelaid/Desktop/gryd-site/docs/cards.json", JSON.stringify(ordered, null, 2));

console.log(`${Object.keys(ordered).length} cards written, all checks passed`);
for (const [slug, c] of Object.entries(ordered)) {
  console.log(`  ${slug.padEnd(40)} ${c.category ?? "(project)"}${c.truncated ? "  [live standfirst truncated]" : ""}`);
}
