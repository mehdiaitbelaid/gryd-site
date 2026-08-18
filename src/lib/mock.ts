import { bodies } from "./bodies";
import { authors, cards } from "./cards";
import { livePhotos } from "./livePhotos";
import { photos } from "./photos";
import type { Author, Block, Category, Closing, NewsItem, Post, Project } from "./types";

/* Mock content layer. Live until Gryd's Sanity project exists, at which point
   lib/content.ts switches to the GROQ queries and this file becomes seed data
   for the migration.

   Every piece of Gryd's published copy, meaning titles, standfirsts, bodies,
   quotes, bylines, dates and categories, is read from the generated cards.ts
   and bodies.ts and is never retyped here. What this file still owns is the
   cover artwork and page masthead copy written for the hub, plus the closing
   panels, which have no counterpart on the live site. */

/* Category titles are the labels the live listings print. The slugs are ours,
   used for filtering and the cover card tint. */
export const categories: Category[] = [
  { slug: "fhs", title: "FHS" },
  { slug: "solar", title: "Solar" },
  { slug: "home-design", title: "Home Design" },
  { slug: "batteries", title: "Batteries" },
  { slug: "social-housing", title: "Social housing" },
  { slug: "funding", title: "Funding" },
  { slug: "epc", title: "EPC" },
  { slug: "maintenance", title: "Maintenance" },
  { slug: "energy", title: "Energy" },
  { slug: "leases", title: "Solar Leases" },
  { slug: "regulation", title: "Regulation" },
];

const byTitle = new Map(categories.map((c) => [c.title, c]));

const card = (key: string) => {
  const found = cards[key];
  if (!found) throw new Error(`No live card for ${key}`);
  return found;
};

/** The category the live listing files an article under. */
const catOf = (key: string): Category => {
  const title = card(key).category;
  const found = title ? byTitle.get(title) : undefined;
  if (!found) throw new Error(`Unknown live category "${title}" on ${key}`);
  return found;
};

const authorOf = (key: string): Author => {
  const found = authors[card(key).author];
  if (!found) throw new Error(`Unknown author "${card(key).author}" on ${key}`);
  return found;
};

/** The live date, "July 13, 2026", set the way the hub writes bylines. */
const dateOf = (key: string): string => {
  const d = new Date(`${card(key).date} UTC`);
  if (Number.isNaN(d.getTime())) throw new Error(`Unreadable date on ${key}`);
  const month = d.toLocaleString("en-GB", { month: "long", timeZone: "UTC" });
  return `${d.getUTCDate()} ${month} ${d.getUTCFullYear()}`;
};

const bodyOf = (key: string): Block[] => {
  const found = bodies[key];
  if (!found) throw new Error(`No migrated body for ${key}`);
  return found;
};

/** Places a photo block inside a verbatim body, after the named heading. The
    imagery is ours; not a word of the article moves. */
function withMedia(key: string, inserts: { after: string; block: Block }[]): Block[] {
  const blocks = [...bodyOf(key)];
  for (const { after, block } of inserts) {
    const at = blocks.findIndex(
      (b) => (b._type === "h3" || b._type === "h4") && b.text === after,
    );
    if (at === -1) throw new Error(`No heading "${after}" in ${key}`);
    blocks.splice(at + 1, 0, block);
  }
  return blocks;
}

const assessmentClosing: Closing = {
  headline: { text: "Tell us about the site and we will model the numbers.", flare: "numbers" },
  body: "A site assessment gives you system sizing per plot, the effect on EPC, and what the homeowner pays, before you commit to anything.",
  ctaLabel: "Request a site assessment",
  ctaHref: "/site-assessment",
  alt: [
    { label: "Read the Knowledge Hub", href: "/blog" },
    { label: "read the latest news", href: "/news" },
  ],
};

export const projects: Project[] = [
  {
    slug: "lower-farm-mews",
    cover: {
      photo: livePhotos["project:lower-farm-mews"](
        "Aerial view of Lower Farm Mews, a nine home conversion in Tittleshall, Norfolk, with solar panels across the roofs",
      ),
      overline: "Higher Sustainability, Zero Build Cost",
      sub: "Nine Norfolk homes taken from around 20% to around 70% energy coverage.",
    },
    pill: "Case study",
    headline: { text: card("project:lower-farm-mews").title, flare: "build cost" },
    facts: ["Tittleshall, Norfolk", "9 homes", "EPC A"],
    heroTitle: "Higher Sustainability, Zero Build Cost",
    heroStanding:
      "Nine homes in Tittleshall, Norfolk, taken from around 20% to around 70% energy coverage.",
    author: authorOf("project:lower-farm-mews"),
    date: dateOf("project:lower-farm-mews"),
    closing: {
      headline: { text: "Your site, modelled the same way.", flare: "way" },
      body: "Send us the plots and we will come back with system sizing, EPC effect and the homeowner numbers.",
      ctaLabel: "Request a site assessment",
      ctaHref: "/site-assessment",
      alt: [
        { label: "Read the Knowledge Hub", href: "/blog" },
        { label: "read the latest news", href: "/news" },
      ],
    },
    body: withMedia("project:lower-farm-mews", [
      {
        after: "The Project",
        block: {
          _type: "figure",
          caption: "Lower Farm Mews, Tittleshall, Norfolk",
          image: photos.lfmVillage(
            "Lower Farm Mews seen from the air with the Norfolk village and fields behind",
          ),
        },
      },
      {
        after: "From solar-only to solar + battery",
        block: {
          _type: "gallery",
          caption:
            "Panels sized per roof, 10 kWh of storage in every home, and the choice to subscribe or buy outright",
          images: [
            photos.panelInstall("Installer lifting a solar panel into place on a roof"),
            photos.batteryInstall("Battery storage unit installed on a house wall"),
            photos.family("A family standing outside a home with solar panels on the roof"),
          ],
        },
      },
    ]),
  },
  {
    slug: "st-ives-year-of-data",
    cover: {
      photo: livePhotos["project:st-ives-year-of-data"](
        "One of the three St Ives barn conversion homes, solar panels across the roof",
      ),
      overline: "A Year of Live Data",
      sub: "Twelve monitored months on an all electric barn conversion.",
    },
    pill: "Case study",
    headline: { text: card("project:st-ives-year-of-data").title },
    facts: ["St Ives, Cornwall", "3 homes"],
    heroTitle: "A Year of Live Data",
    heroStanding:
      "Twelve monitored months across three all electric barn conversions in St Ives, Cornwall.",
    author: authorOf("project:st-ives-year-of-data"),
    date: dateOf("project:st-ives-year-of-data"),
    closing: assessmentClosing,
    body: bodyOf("project:st-ives-year-of-data"),
  },
  {
    slug: "fifty-five-plot-analysis",
    cover: {
      photo: livePhotos["project:fifty-five-plot-analysis"](
        "An SME house builder's construction site, homes under way",
      ),
      overline: "Four Specifications, One Site",
      sub: "A technical director costed the funded model across 55 plots.",
    },
    pill: "Analysis",
    headline: { text: card("project:fifty-five-plot-analysis").title },
    facts: ["East Anglia", "55 homes"],
    heroTitle: "Four Specifications, One Site",
    heroStanding:
      "A technical director costed four specifications across 55 plots and published what he found.",
    author: authorOf("project:fifty-five-plot-analysis"),
    date: dateOf("project:fifty-five-plot-analysis"),
    closing: assessmentClosing,
    body: bodyOf("project:fifty-five-plot-analysis"),
  },
];

/* One entry per Knowledge Hub article, in the order the live listing runs them.
   Each entry holds only what the hub adds: the cover artwork, the masthead copy
   and the closing panel. Title, standfirst, category, byline, date and body all
   come from the live site. */
const entries: {
  slug: string;
  photo: keyof typeof photos;
  alt: string;
  overline: string;
  sub: string;
  flare?: string;
  readingTime?: string;
  closing?: Closing;
  media?: { after: string; block: Block }[];
}[] = [
  {
    slug: "council-housing-solar-index-2026",
    photo: "streetPanels",
    alt: "A row of council houses fitted with rooftop solar panels",
    overline: "Council Housing Solar Index 2026",
    sub: "Which regions are fitting solar to their council stock, and which have barely started.",
  },
  {
    slug: "why-solar-farms-keep-getting-rejected",
    photo: "streetPanels",
    alt: "A street of new homes with rooftop solar, in Gryd branding",
    overline: "A Better Way to Build 500MW",
    sub: "Same capacity, 100,000 rooftops.",
    flare: "rejected",
    readingTime: "6 minute read",
    closing: {
      headline: { text: "Put the argument against your own site.", flare: "site" },
      body: "Send us the plots and we will come back with system sizing, the effect on EPC and the numbers the homeowner sees.",
      ctaLabel: "Request a site assessment",
      ctaHref: "/site-assessment",
      alt: [
        { label: "See published projects", href: "/projects" },
        { label: "read the latest news", href: "/news" },
      ],
    },
    media: [
      {
        after: "How many rooftops equal a 500MW solar farm?",
        block: {
          _type: "stats",
          caption: "One field, or less than a single year of British housebuilding",
          stats: [
            { value: "86%", label: "Public support for solar, the highest of any UK energy source" },
            { value: "5,000", label: "Formal objections to the Lime Down proposal in Wiltshire" },
            { value: "500", trail: "MW", label: "Peak capacity at stake, around 115,000 homes" },
            { value: "100k", label: "Rooftops needed to match it at 5kW per home" },
          ],
        },
      },
      {
        after: "4. It lowers energy bills from day one",
        block: {
          _type: "gallery",
          caption:
            "Panels sized per roof, storage in every home, and generation sitting directly above the demand it serves",
          images: [
            photos.streetPanels("A row of new build homes with solar panels across every roof"),
            photos.panelInstall("Installer lifting a solar panel into place on a roof"),
            photos.batteryInstall("Battery storage unit installed on the wall of a home"),
          ],
        },
      },
    ],
  },
  {
    slug: "complete-guide-to-funded-solar",
    photo: "streetPanels",
    alt: "A row of new build homes with solar panels across every roof",
    overline: "Every Route to Funded Solar",
    sub: "Six delivery models, compared.",
  },
  {
    slug: "sap-scores-versus-real-energy-use",
    photo: "singleHome",
    alt: "A new build home with a full roof of solar panels",
    overline: "Half the Picture",
    sub: "What SAP leaves out of a new home.",
  },
  {
    slug: "future-homes-standard-differentiate",
    photo: "streetDusk",
    alt: "A street of new homes at dusk with lit windows and rooftop solar",
    overline: "When Everyone Must Comply",
    sub: "Standing out once the floor is universal.",
  },
  {
    slug: "how-much-solar-do-you-need",
    photo: "panelInstall",
    alt: "Installer lifting a solar panel into place on a roof",
    overline: "Sizing the Array",
    sub: "The confirmed formula, worked through.",
  },
  {
    slug: "future-homes-standard-timeline",
    photo: "lfmAerial",
    alt: "Aerial view of a completed conversion scheme with solar panels across the roofs",
    overline: "The Confirmed Timeline",
    sub: "March 2027, then March 2028.",
  },
  {
    slug: "future-homes-standard-solar-mandate",
    photo: "siteAerial",
    alt: "New build estate photographed from the air with rooftop solar",
    overline: "The Solar Mandate",
    sub: "What the standard asks of housebuilders.",
  },
  {
    slug: "solar-and-affordable-housing",
    photo: "family",
    alt: "A family standing outside a home with solar panels on the roof",
    overline: "Affordable, and Cheap to Run",
    sub: "Rising expectations, tighter budgets.",
  },
  {
    slug: "breaking-the-green-premium",
    photo: "streetPanels",
    alt: "A terrace of new homes with solar panels fitted across the roofline",
    overline: "Breaking the Premium",
    sub: "Why efficient homes cost more than they should.",
  },
  {
    slug: "rising-energy-demand-bigger-systems",
    photo: "batteryInstall",
    alt: "Battery storage unit installed on the wall of a home",
    overline: "Sized for What Is Coming",
    sub: "EVs, heat pumps and a bigger bill.",
  },
  {
    slug: "best-roof-types-for-solar",
    photo: "panelInstall",
    alt: "Solar panels being fitted to a pitched tiled roof",
    overline: "Solar Ready Roofs",
    sub: "Pitch, orientation and roof type.",
  },
  {
    slug: "integrating-solar-and-heat-pumps",
    photo: "singleHome",
    alt: "A detached new build home with a full array of roof mounted solar panels",
    overline: "Solar Meets the Heat Pump",
    sub: "Two systems, one electricity bill.",
  },
  {
    slug: "how-solar-helps-meet-epc-targets",
    photo: "streetDusk",
    alt: "New homes at dusk with rooftop solar and lit interiors",
    overline: "Hitting the EPC Target",
    sub: "Where the ratings actually move.",
  },
  {
    slug: "what-is-gryd",
    photo: "family",
    alt: "A family outside their home, solar panels visible on the roof above",
    overline: "What Is Gryd",
    sub: "The solar subscription, explained.",
  },
  {
    slug: "solar-maintenance-and-replacement-costs",
    photo: "panelInstall",
    alt: "An engineer working on a rooftop solar array",
    overline: "The Cost of Ownership",
    sub: "Twenty five years of upkeep, priced.",
  },
  {
    slug: "do-you-need-a-solar-battery",
    photo: "batteryInstall",
    alt: "Home battery storage unit mounted beside a consumer unit",
    overline: "Do You Need a Battery",
    sub: "Daytime generation, evening demand.",
  },
  {
    slug: "battery-storage-and-grid-constraints",
    photo: "lfmAerial",
    alt: "Aerial view of a housing scheme with solar panels, set against open countryside",
    overline: "Around the Grid Queue",
    sub: "Storage as a viability tool.",
  },
  {
    slug: "solar-providers-compared",
    photo: "streetPanels",
    alt: "A row of homes with rooftop solar, viewed along the street",
    overline: "Three Models Compared",
    sub: "Cost, ownership and resale.",
  },
  {
    slug: "a-simple-guide-to-solar-leases",
    photo: "singleHome",
    alt: "A new build house with solar panels, photographed from above the roofline",
    overline: "The Modern Solar Lease",
    sub: "How the arrangement actually works.",
  },
  {
    slug: "mandatory-solar-panels-in-new-homes",
    photo: "siteAerial",
    alt: "A large new build development seen from the air, roofs fitted with solar",
    overline: "Mandatory by 2027",
    sub: "What the requirement means on site.",
  },
];

export const posts: Post[] = entries.map((e) => ({
  slug: e.slug,
  category: catOf(e.slug),
  cover: {
    photo: (livePhotos[e.slug] ?? photos[e.photo])(e.alt),
    overline: e.overline,
    sub: e.sub,
  },
  headline: { text: card(e.slug).title, flare: e.flare },
  dek: card(e.slug).dek,
  author: authorOf(e.slug),
  date: dateOf(e.slug),
  readingTime: e.readingTime,
  metaDescription: card(e.slug).metaDescription ?? undefined,
  heroTitle: e.overline,
  heroStanding: e.sub,
  closing: e.closing ?? assessmentClosing,
  body: e.media ? withMedia(e.slug, e.media) : bodyOf(e.slug),
}));

export const news: NewsItem[] = [
  {
    id: "shoosmiths-briefing",
    date: "24 October 2025",
    year: "2025",
    outlet: "Gryd and Shoosmiths",
    headline:
      "Building for tomorrow, the Gryd and Shoosmiths Future Homes Standard industry briefing",
    summary:
      "A private industry briefing in October on the Future Homes Standard and what it means for low carbon, all electric new build homes in the UK.",
    href: "/blog/future-homes-standard-differentiate",
    action: "Read the write up",
    own: true,
  },
  {
    id: "rem-471m",
    date: "2 October 2025",
    year: "2025",
    outlet: "Renewable Energy Magazine",
    headline: "Brits with rooftop solar saved £471m on energy bills in the last year",
    summary:
      "1.6m UK households now generate their own power from rooftop solar, according to Gryd analysis of government data.",
    href: "https://www.renewableenergymagazine.com/pv_solar/brits-with-rooftop-solar-saved-a-471-20251002",
    action: "Read the article",
    own: false,
  },
  {
    id: "thrive-in-construction",
    date: "22 September 2025",
    year: "2025",
    outlet: "Thrive in Construction",
    headline: "Futureproof housing, transforming the way new homes access renewable energy",
    summary:
      "Gryd CEO Mohamed Gaafar joins host Darren Evans to talk about unlocking solar for homeowners and futureproofing housing stock.",
    href: "https://www.youtube.com/watch?v=jV7hxRKaFxY",
    action: "Watch the episode",
    own: false,
  },
  {
    id: "businessgreen-norfolk",
    date: "8 September 2025",
    year: "2025",
    outlet: "BusinessGreen",
    headline: "Norfolk development first to benefit from fully funded solar and battery scheme",
    summary:
      "East Anglia developer Zero In Developments has partnered with Gryd to deliver homes with full sized solar and battery systems at no cost to homebuyers.",
    href: "https://www.businessgreen.com/news/4518716/norfolk-housing-developer-pioneers-funded-solar-battery-systems",
    action: "Read the article",
    own: false,
  },
  {
    id: "roofing-today-roadmap",
    date: "30 June 2025",
    year: "2025",
    outlet: "Roofing Today",
    headline: "The government's Solar Roadmap sets out a new era of energy independence",
    summary:
      "The Solar Roadmap will play a major role in delivering the clean energy superpower mission and the Clean Power 2030 Action Plan.",
    href: "https://roofingtoday.co.uk/solar-roadmap-sets-out-solar-revolution-vision/",
    action: "Read the article",
    own: false,
  },
  {
    id: "times-rooftop-surge",
    date: "4 June 2025",
    year: "2025",
    outlet: "The Times",
    headline:
      "Homeowners lead the UK rooftop solar surge, but shrinking system sizes reveal a hidden challenge",
    summary:
      "The UK residential rooftop market is outpacing commercial and industrial rooftop installations threefold, new data reveals.",
    href: "https://www.thetimes.com/uk/environment/article/weather-spring-solar-power-2g09w3hsm",
    action: "Read the article",
    own: false,
  },
  {
    id: "businessgreen-interview",
    date: "30 April 2025",
    year: "2025",
    outlet: "BusinessGreen",
    headline: "How Gryd is signing up new housing schemes to its solar subscription model",
    summary:
      "Mohamed Gaafar reflects on how an interest in liveable spaces and work on Saudi mega cities led him to co found a UK first solar subscription service.",
    href: "https://www.businessgreen.com/interview/4412720/gryd-signing-housing-schemes-solar-subscription-model",
    action: "Read the interview",
    own: false,
  },
  {
    id: "inside-housing-councils",
    date: "28 April 2025",
    year: "2025",
    outlet: "Inside Housing",
    headline: "Councils now outpace private homeowners in rooftop solar uptake",
    summary:
      "Local authorities are outpacing private homeowners in their rates of rooftop solar adoption, according to research by Gryd.",
    href: "https://www.insidehousing.co.uk/insight/mapping-the-council-houses-with-solar-panels-93689",
    action: "Read the article",
    own: false,
  },
  {
    id: "construction-uk-rooftop",
    date: "22 February 2025",
    year: "2025",
    outlet: "Construction UK Magazine",
    headline: "Solar's rooftop revolution can energise, not imperil, the construction industry",
    summary:
      "Rooftop solar is set to make political and economic waves this year. How will the construction industry take advantage of it?",
    href: "https://constructionmaguk.co.uk/solars-rooftop-revolution-can-energise-not-imperil-construction-industry/",
    action: "Read the article",
    own: false,
  },
  {
    id: "techeu-preseed",
    date: "16 February 2025",
    year: "2025",
    outlet: "Tech.eu",
    headline: "Gryd Energy secures £1m pre seed for solar hardware subscription",
    summary:
      "Gryd has developed a UK first subscription model that lets developers and homeowners install solar without ever paying for the hardware.",
    href: "https://tech.eu/2025/01/27/gryd-energy-secures-ps1m-pre-seed-funding-for-solar-hardware-subscription/",
    action: "Read the article",
    own: false,
  },
  {
    id: "sustainable-times-1m",
    date: "12 February 2025",
    year: "2025",
    outlet: "Sustainable Times",
    headline: "Gryd secures £1m to unlock the UK residential solar potential",
    summary:
      "The solartech startup has raised £1 million in pre seed funding to accelerate national expansion, removing upfront installation costs for developers and homeowners.",
    href: "https://www.sustainabletimes.co.uk/post/gryd-secures-1m-to-unlock-uk-s-residential-solar-potential",
    action: "Read the article",
    own: false,
  },
  {
    id: "cornish-times-st-ives",
    date: "29 October 2024",
    year: "2024",
    outlet: "Cornish Times",
    headline: "Zero cost solar pilot launches in St Ives to unlock clean energy for millions of homes",
    summary:
      "Deployed with BK Developments, the first UK pilot of smart solar and battery storage for new build homes with no upfront cost to developer or homeowner.",
    href: "https://www.cornish-times.co.uk/news/homes/zero-cost-solar-pilot-launches-in-st-ives-to-unlock-clean-energy-for-millions-of-homes-734519",
    action: "Read the article",
    own: false,
  },
  {
    id: "current-news-fhs",
    date: "26 October 2024",
    year: "2024",
    outlet: "Current News",
    headline: "Housing Ministry refutes claims the Future Homes Standard will be weakened",
    summary:
      "Mohamed Gaafar on why the growth agenda cannot be realised without an unapologetic commitment to the Future Homes Standard.",
    href: "https://www.current-news.co.uk/housing-ministry-refutes-claims-the-future-homes-standard-will-be-weakened/",
    action: "Read the article",
    own: false,
  },
  {
    id: "bdc-magazine-reaction",
    date: "24 October 2024",
    year: "2024",
    outlet: "BDC Magazine",
    headline: "Residential solar CEO reacts to uncertainty on the Future Homes Standard",
    summary:
      "A call for government to commit to the standard, raising environmental standards for new homes and making energy supply more resilient and affordable.",
    href: "https://bdcmagazine.com/2024/10/residential-solar-ceo-reacts-to-labour-uncertainty-on-future-homes-standard/",
    action: "Read the article",
    own: false,
  },
  {
    id: "solar-energy-uk-case-study",
    date: "17 October 2024",
    year: "2024",
    outlet: "Solar Energy UK",
    headline: "Solar Energy UK case study, Gryd Energy",
    summary:
      "A first of its kind deployment of zero cost smart solar on three new homes in St Ives, Cornwall, saving developers up to £10k of hardware cost per home.",
    href: "https://solarenergyuk.org/resource/gryd-energy/",
    action: "Read the case study",
    own: false,
  },
  {
    id: "tech-funding-news-antler",
    date: "17 July 2024",
    year: "2024",
    outlet: "Tech Funding News",
    headline: "Tech Talks at the Antler European Founder Conference, Mohamed Gaafar",
    summary:
      "On renewable energy, how startups can tackle the climate crisis, and the challenges of being a first time diverse founder in Europe.",
    href: "https://www.youtube.com/watch?v=gq3vTXuw1KM",
    action: "Watch the interview",
    own: false,
  },
  {
    id: "unlock-net-zero-shortlist",
    date: "17 April 2024",
    year: "2024",
    outlet: "Unlock Net Zero",
    headline: "Gryd shortlisted at the Net Zero Awards",
    summary: "A place on the 2024 shortlist for technology innovation of the year.",
    href: "https://www.unlocknetzero.co.uk/awards-shortlist/shortlist-unzla",
    action: "See the shortlist",
    own: false,
  },
  {
    id: "property-week-ai",
    date: "4 April 2024",
    year: "2024",
    outlet: "Property Week",
    headline: "AI will drive the evolution of property",
    summary:
      "Gryd is deploying smart solar systems that optimise distributed energy resources for homes and provide flexibility and demand side response to the local grid.",
    href: "https://www.propertyweek.com/insight/ai-will-drive-evolution-of-property",
    action: "Read the article",
    own: false,
  },
  {
    id: "antler-why-we-invested",
    date: "5 March 2024",
    year: "2024",
    outlet: "Antler",
    headline: "Zero cost residential solar at scale, why we invested in Gryd Energy",
    summary:
      "Electricity demand is projected to double in ten years, and households are acutely aware of the cost of an unpredictable energy market.",
    href: "https://www.antler.co/blog/why-we-invested-gryd-energy",
    action: "Read the note",
    own: false,
  },
  {
    id: "maddyness-meet-gryd",
    date: "21 February 2024",
    year: "2024",
    outlet: "Maddyness",
    headline: "Meet Gryd, optimising solar systems to deliver clean and affordable energy",
    summary:
      "Giving millions more people access to solar without the high upfront costs and the burden of ownership.",
    href: "https://www.maddyness.com/uk/2024/02/21/meet-gryd-optimising-solar-systems-to-deliver-clean-and-affordable-energy/",
    action: "Read the article",
    own: false,
  },
];
