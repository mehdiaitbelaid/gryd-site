import { bodies } from "./bodies";
import { livePhotos } from "./livePhotos";
import { photos } from "./photos";
import type { Author, Category, Closing, NewsItem, Post, Project } from "./types";

/* Mock content layer. Live until Gryd's Sanity project exists, at which point
   lib/content.ts switches to the GROQ queries and this file becomes seed data
   for the migration. Copy is taken from the approved hub prototype. */

const scott: Author = { name: "Scott Whiteside", initials: "SW" };
const danielle: Author = { name: "Danielle Todd", initials: "DT" };
const hugo: Author = { name: "Hugo Radford", initials: "HR" };

export const categories: Category[] = [
  { slug: "fhs", title: "FHS" },
  { slug: "solar", title: "Solar" },
  { slug: "home-design", title: "Home design" },
  { slug: "batteries", title: "Batteries" },
  { slug: "social-housing", title: "Social housing" },
  { slug: "funding", title: "Funding" },
  { slug: "epc", title: "EPC" },
  { slug: "maintenance", title: "Maintenance" },
  { slug: "energy", title: "Energy" },
  { slug: "leases", title: "Solar leases" },
  { slug: "regulation", title: "Regulation" },
];

const cat = (slug: string): Category => {
  const found = categories.find((c) => c.slug === slug);
  if (!found) throw new Error(`Unknown category ${slug}`);
  return found;
};

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
    headline: {
      text: "Higher sustainability at Lower Farm Mews, without a penny on the build cost",
      flare: "build cost",
    },
    facts: ["Tittleshall, Norfolk", "9 homes", "EPC A"],
    heroTitle: "Higher Sustainability, Zero Build Cost",
    heroStanding:
      "Nine homes in Tittleshall, Norfolk, taken from around 20% to around 70% energy coverage.",
    author: scott,
    date: "28 April 2026",
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
    body: [
      {
        _type: "lead",
        text: "Rising costs were squeezing the sustainability ambition on a project built around it. The fix was not a cheaper specification, it was a different way of paying for the one they wanted.",
      },
      {
        _type: "stats",
        caption: "Published outcomes for Lower Farm Mews, Tittleshall",
        stats: [
          { value: "9", label: "Homes, three and four bed conversion" },
          { value: "£100k", label: "Hardware value, at zero cost" },
          { lead: "20 to ", value: "70%", label: "Energy coverage per home" },
          { lead: "EPC ", value: "A", label: "Achieved on every unit" },
        ],
      },
      { _type: "h3", text: "The developer" },
      {
        _type: "para",
        text: "Zero In Developments is a privately owned developer based in the South East, founded by Sam Fryer and Jed Jordan. It finds disused commercial and light industrial buildings and converts them into homes, reusing existing structures to hold down embodied carbon. The approach pairs a fabric first design philosophy with efficient systems and on site renewables.",
      },
      {
        _type: "quote",
        text: "Our ambition from day one has been to deliver homes that are genuinely built for the future, not just ticking a box on sustainability.",
        attribution: "Sam Fryer, Zero In Developments",
      },
      { _type: "h3", text: "The project" },
      {
        _type: "para",
        text: "Lower Farm Mews is a private development of nine three and four bedroom homes in the village of Tittleshall, Norfolk. The site is a conversion of the former Courtenay House, a disused care home, where the shell of the original building was retained and the internals completely reconfigured. The homes are all electric, with air source heat pumps, EV charging points and repurposed building materials. Solar was always part of the plan.",
      },
      {
        _type: "quote",
        text: "The numbers were forcing us into compromises we really did not want to make. We were looking at delivering a good product, but not the exceptional one we had promised ourselves and our buyers.",
        attribution: "Jed Jordan, Zero In Developments",
      },
      { _type: "h3", text: "The solution" },
      { _type: "h4", text: "Site assessment first" },
      {
        _type: "para",
        text: "Gryd ran an initial site assessment to determine the optimal configuration for each of the nine plots and to model energy performance and financial benefit for the future homeowners. The result was better performance than had been planned, with nothing added to the project cost.",
      },
      { _type: "h4", text: "Late stage integration" },
      {
        _type: "para",
        text: "Gryd usually joins at design stage. Here the developer had already contracted a solar installer against a previous design and works were weeks from starting. Rather than disrupt the programme, Gryd worked with Zero In Developments and their installer, Array Electrics, to redesign the specification and plan delivery around the existing schedule.",
      },
      { _type: "h4", text: "From solar only to solar plus storage" },
      {
        _type: "bullets",
        items: [
          "10 kWh of battery storage in every home, previously written off as unaffordable",
          "More solar panels per plot, sized to each roof orientation and capacity",
          "Smart monitoring and control for live performance tracking",
        ],
      },
      {
        _type: "gallery",
        caption:
          "Panels sized per roof, 10 kWh of storage in every home, and the choice to subscribe or buy outright",
        images: [
          photos.panelInstall("Installer lifting a solar panel into place on a roof"),
          photos.batteryInstall("Battery storage unit installed on a house wall"),
          photos.family("A family standing outside a home with solar panels on the roof"),
        ],
      },
      { _type: "h3", text: "Navigating complexity" },
      {
        _type: "para",
        text: "The main contractor went into administration, which nearly ended the project. Sam and Jed acquired the contractor and retained the workforce, so work continued after a brief pause. Gryd stayed committed throughout and worked flexibly around the disruption.",
      },
      {
        _type: "para",
        text: "The grid connection was the second obstacle. After a long stretch of uncertainty over the date, Gryd went directly to the distribution network operator responsible for the works, and pressure from both sides brought the connection forward.",
      },
      {
        _type: "para",
        text: "The third was rural connectivity. Tittleshall sits in a mobile data black spot, and Gryd systems need a data connection for monitoring. Systems were connected to the construction team's broadband where in range, and each will transfer to the homeowner's own broadband on sale, with no extra hardware.",
      },
      { _type: "h3", text: "The impact" },
      {
        _type: "para",
        text: "For the developer: around £100,000 of solar and battery hardware at zero cost, EPC A across all properties, stronger sustainability credentials to market than the original ambition, and support from site assessment through to commissioning.",
      },
      {
        _type: "para",
        text: "For homeowners: up to around 70% of the home's energy generated and stored on site, up from an around 20% solar only plan, 10 kWh of storage so daytime generation is available in the evening, the choice to subscribe at a fixed monthly fee or buy outright, and estimated lifetime energy savings of £30,000 to £40,000 per home.",
      },
      {
        _type: "para",
        text: "The site is nearing completion with one property sold and occupied and two more reserved. One buyer purchased the system outright, planning to stay long term. Two chose to subscribe, already at their maximum mortgage threshold and preferring a fixed low monthly payment with no upfront cost.",
      },
      {
        _type: "quote",
        text: "We are not a bolt on at the end of a project. We become part of the team, working through the same challenges.",
        attribution: "Mohamed Gaafar, Co Founder and CEO, Gryd",
      },
      {
        _type: "figure",
        caption: "Lower Farm Mews, Tittleshall, Norfolk",
        image: photos.lfmVillage(
          "Lower Farm Mews seen from the air with the Norfolk village and fields behind",
        ),
      },
      { _type: "h3", text: "Project details" },
      {
        _type: "spec",
        rows: [
          { term: "Developer", detail: "Zero In Developments" },
          { term: "Project", detail: "Lower Farm Mews, Tittleshall, Norfolk" },
          { term: "Type", detail: "Conversion, 9 residential units" },
          { term: "Hardware value", detail: "Around £100,000" },
          { term: "Storage per home", detail: "10 kWh" },
          { term: "Installer", detail: "Array Electrics" },
        ],
      },
    ],
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
    headline: { text: "A year of live data on a funded solar subscription" },
    facts: ["St Ives, Cornwall", "3 homes"],
    heroTitle: "A Year of Live Data",
    heroStanding:
      "Twelve monitored months across three all electric barn conversions in St Ives, Cornwall.",
    author: scott,
    date: "12 March 2026",
    closing: assessmentClosing,
    body: bodies["project:st-ives-year-of-data"],
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
    headline: { text: "An independent developer analysis of the funded model" },
    facts: ["East Anglia", "55 homes"],
    heroTitle: "Four Specifications, One Site",
    heroStanding:
      "A technical director costed four specifications across 55 plots and published what he found.",
    author: hugo,
    date: "2 February 2026",
    closing: assessmentClosing,
    body: bodies["project:fifty-five-plot-analysis"],
  },
];

/** Listing entries carry the full card and the article body migrated from the live site. */
export const posts: Post[] = [
  {
    slug: "council-housing-solar-index-2026",
    category: cat("social-housing"),
    cover: {
      photo: livePhotos["council-housing-solar-index-2026"](
        "A row of council houses fitted with rooftop solar panels",
      ),
      overline: "Council Housing Solar Index 2026",
      sub: "Which regions are fitting solar to their council stock, and which have barely started.",
    },
    headline: {
      text: "Gryd's council housing solar rankings 2026, which regions lead and which fall behind",
    },
    dek: "Gryd has launched the Gryd Council Housing Solar Index, an industry benchmark of council solar deployment across the UK.",
    author: danielle,
    date: "13 July 2026",
    heroTitle: "Council Housing Solar Index 2026",
    heroStanding:
      "Which regions are fitting solar to their council stock, and which have barely started.",
    closing: assessmentClosing,
    body: bodies["council-housing-solar-index-2026"],
  },
  {
    slug: "why-solar-farms-keep-getting-rejected",
    category: cat("solar"),
    cover: {
      photo: livePhotos["why-solar-farms-keep-getting-rejected"](
        "A street of new homes with rooftop solar, in Gryd branding",
      ),
      overline: "A Better Way to Build 500MW",
      sub: "Same capacity, 100,000 rooftops.",
    },
    headline: {
      text: "Solar has never been more popular, so why do solar farms keep getting rejected?",
      flare: "rejected",
    },
    dek: "Solar enjoys 86% public support in the UK, yet the proposed Lime Down farm in Wiltshire drew nearly 5,000 objections.",
    author: scott,
    date: "25 June 2026",
    readingTime: "6 minute read",
    metaDescription:
      "Solar farms face thousands of objections despite 86% public support. Distributed rooftop solar on new build homes is a better way to deploy 500MW.",
    heroTitle: "A Better Way to Build 500MW",
    heroStanding:
      "The same capacity as a rejected Wiltshire solar farm, spread across around 100,000 rooftops.",
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
    body: [
      {
        _type: "lead",
        text: "Solar enjoys 86% public support in the UK, the highest of any energy source. That figure has held steady for years. People understand solar, and they want it.",
      },
      { _type: "para", text: "But when a developer submits plans for a large scale solar farm, something shifts." },
      {
        _type: "para",
        text: "In Wiltshire, nearly 5,000 people formally objected to the proposed Lime Down Solar Park, a 500MW ground mount installation on farmland between Malmesbury and the M4. The local council rejected the plans outright, and the developer has appealed.",
      },
      {
        _type: "para",
        text: "In Oxfordshire, planning permission for the 840MW Botley West solar farm, one of the largest proposed in Europe, has been delayed after campaigners raised concerns about visual impact, green belt encroachment and the loss of arable land.",
      },
      {
        _type: "para",
        text: "In Lincolnshire, a fierce political battle is playing out over a string of mega solar farm proposals, drawing in grassroots campaigners, parish councils and national politicians.",
      },
      {
        _type: "para",
        text: "The pattern is consistent. People support solar in principle, but they oppose it when it arrives as a single, massive installation on the farmland next to their homes.",
      },
      { _type: "para", text: "This is not hypocrisy. It is a design problem." },
      { _type: "h3", text: "How many rooftops equal a 500MW solar farm?" },
      {
        _type: "para",
        text: "Lime Down would generate 500MW of peak capacity. That is a significant contribution to the grid, enough to power around 115,000 homes annually according to the developer.",
      },
      { _type: "para", text: "But 500MW does not have to sit in a single field." },
      {
        _type: "stats",
        caption: "One field, or less than a single year of British housebuilding",
        stats: [
          { value: "86%", label: "Public support for solar, the highest of any UK energy source" },
          { value: "5,000", label: "Formal objections to the Lime Down proposal in Wiltshire" },
          { value: "500", trail: "MW", label: "Peak capacity at stake, around 115,000 homes" },
          { value: "100k", label: "Rooftops needed to match it at 5kW per home" },
        ],
      },
      {
        _type: "para",
        text: "A typical new build home can accommodate a 4kW to 6kW rooftop system. At an average of 5kW per home, 500MW of capacity would require around 100,000 rooftops.",
      },
      {
        _type: "para",
        text: "That sounds like a lot, but the UK is building roughly 200,000 to 250,000 new homes every year. The Future Homes Standard, published in March 2026 and coming into force from March 2027, requires on site renewable electricity generation on most new homes. Solar PV on the roof is the most practical and affordable route to compliance. With a 12 month transition period, the standard will apply to virtually all new homes from 2028.",
      },
      {
        _type: "para",
        text: "The capacity that Lime Down would deliver in one location could be matched by less than a single year of new build housing, spread across developments the length of the country.",
      },
      { _type: "h3", text: "Rooftop solar against solar farms, four advantages" },
      {
        _type: "para",
        text: "The case for rooftop solar on new build housing is not only about avoiding opposition. It is structurally better for the energy system in ways that ground mount generation cannot match.",
      },
      { _type: "h4", text: "1. Generation meets demand before it reaches the grid" },
      {
        _type: "para",
        text: "A solar farm generates electricity in a field and exports it to the transmission or distribution network. That electricity must then travel through the grid to reach the homes and businesses that consume it.",
      },
      {
        _type: "para",
        text: "Rooftop solar on a home generates electricity at the point of consumption. UK research found that households consume around 45% of their solar generation on site. Add a battery and that figure rises significantly, with some systems achieving 70% or higher.",
      },
      {
        _type: "para",
        text: "Electricity that never leaves the site of generation does not need grid infrastructure to carry it.",
      },
      { _type: "h4", text: "2. It reduces the need for grid reinforcement" },
      {
        _type: "para",
        text: "The UK grid connection queue currently holds over 700GW of projects waiting to connect, roughly four times the capacity needed to meet 2030 clean power targets. Grid reinforcement is one of the biggest bottlenecks in the energy transition, with estimates suggesting £60 billion of network upgrades are needed by 2035.",
      },
      {
        _type: "para",
        text: "Every kilowatt hour consumed behind the meter is a kilowatt hour that does not add to grid congestion. Distributed rooftop solar, particularly when paired with battery storage, eases pressure on local distribution networks rather than adding to it.",
      },
      {
        _type: "quote",
        text: "A 500MW solar farm needs a grid connection. 100,000 rooftop systems do not, at least not in the same way.",
      },
      { _type: "h4", text: "3. It preserves farmland and avoids visual impact" },
      {
        _type: "para",
        text: "The most common objections to solar farms centre on the loss of agricultural land and the visual transformation of rural landscapes. These concerns are legitimate. Farmland has economic, ecological and cultural value.",
      },
      {
        _type: "para",
        text: "Rooftop solar uses space that already exists. The roof is there whether or not panels sit on it. There is no change of land use, no loss of productive acreage, no alteration to the character of the countryside.",
      },
      { _type: "h4", text: "4. It lowers energy bills from day one" },
      {
        _type: "para",
        text: "Residents in homes with rooftop solar and battery storage benefit directly from the electricity generated overhead. A well specified system can reduce a household's annual electricity demand from the grid by 24% or more, even without a battery. With storage, the savings are substantially greater.",
      },
      {
        _type: "para",
        text: "A solar farm delivers clean power to the grid. A rooftop system delivers clean power to the household living beneath it. The economic benefit is direct and immediate.",
      },
      {
        _type: "gallery",
        caption:
          "Panels sized per roof, storage in every home, and generation sitting directly above the demand it serves",
        images: [
          photos.streetPanels("A row of new build homes with solar panels across every roof"),
          photos.panelInstall("Installer lifting a solar panel into place on a roof"),
          photos.batteryInstall("Battery storage unit installed on the wall of a home"),
        ],
      },
      { _type: "h3", text: "This is not an argument against solar farms" },
      {
        _type: "para",
        text: "Large scale solar has a role to play. The UK needs every megawatt of clean energy it can deploy, and ground mount installations will remain part of the mix. The point is not that solar farms are wrong. It is that the current approach concentrates generation in places where it creates friction, while leaving millions of rooftops empty.",
      },
      {
        _type: "para",
        text: "The UK grid hit a record 14.4GW of solar generation in April 2026. Renewables provided 52.5% of Britain's electricity in 2025. The trajectory is right. The question is how we sustain it without burning through public goodwill in the communities where these projects are sited.",
      },
      { _type: "h3", text: "Rooftop solar on new build homes, a better deployment model" },
      {
        _type: "para",
        text: "At Gryd we fund, specify and manage rooftop solar and battery systems on new build housing. Developers pay nothing upfront, and residents get lower bills from the day they move in. The systems are installed by MCS certified partners and maintained throughout their operational life.",
      },
      {
        _type: "para",
        text: "Every home we equip is a small piece of that distributed solar farm. Not concentrated in one field, but woven into the fabric of new communities across the country.",
      },
      {
        _type: "para",
        text: "The 5,000 people who objected to Lime Down were not objecting to solar. They were objecting to a model that puts all the generation in one place and all the disruption on one community.",
      },
      { _type: "para", text: "There is another way to build 500MW. It starts on the rooftop." },
    ],
  },
];

/* The remaining nineteen listing entries. Each carries its card here and its
   body in bodies.ts, migrated from the live site. */
const stubs: {
  slug: string;
  category: string;
  photo: keyof typeof photos;
  alt: string;
  overline: string;
  sub: string;
  headline: string;
  dek: string;
  author: Author;
  date: string;
}[] = [
  {
    slug: "complete-guide-to-funded-solar",
    category: "funding",
    photo: "streetPanels",
    alt: "A row of new build homes with solar panels across every roof",
    overline: "Every Route to Funded Solar",
    sub: "Six delivery models, compared.",
    headline: "The complete guide to funded solar and storage for new build homes",
    dek: "Every route open to UK house builders, from zero capex subscriptions and private wire microgrids to supplier tariff partnerships and self funding.",
    author: scott,
    date: "5 May 2026",
  },
  {
    slug: "sap-scores-versus-real-energy-use",
    category: "home-design",
    photo: "singleHome",
    alt: "A new build home with a full roof of solar panels",
    overline: "Half the Picture",
    sub: "What SAP leaves out of a new home.",
    headline: "SAP scores versus real energy use, why developers are missing half the picture",
    dek: "SAP scores do not account for total energy use in new homes. Why UK housebuilders must consider real demand, and how solar can support it.",
    author: hugo,
    date: "22 April 2026",
  },
  {
    slug: "future-homes-standard-differentiate",
    category: "fhs",
    photo: "streetDusk",
    alt: "A street of new homes at dusk with lit windows and rooftop solar",
    overline: "When Everyone Must Comply",
    sub: "Standing out once the floor is universal.",
    headline: "The Future Homes Standard, how to differentiate when everyone must comply",
    dek: "From 2028 every new home in England must include on site generation and low carbon heating. The question shifts from whether to how.",
    author: danielle,
    date: "25 March 2026",
  },
  {
    slug: "how-much-solar-do-you-need",
    category: "fhs",
    photo: "panelInstall",
    alt: "Installer lifting a solar panel into place on a roof",
    overline: "Sizing the Array",
    sub: "The confirmed formula, worked through.",
    headline: "Future Homes Standard, how to calculate how much solar you need",
    dek: "The confirmed sizing formula from Approved Document L 2026, and why designing beyond the minimum is worth doing.",
    author: scott,
    date: "24 March 2026",
  },
  {
    slug: "future-homes-standard-timeline",
    category: "fhs",
    photo: "lfmAerial",
    alt: "Aerial view of a completed conversion scheme with solar panels across the roofs",
    overline: "The Confirmed Timeline",
    sub: "March 2027, then March 2028.",
    headline: "The Future Homes Standard is published, here is the confirmed implementation timeline",
    dek: "In force on 24 March 2027 with a 12 month transition to 24 March 2028. The HEM and SAP crossover, and what to do now.",
    author: scott,
    date: "24 March 2026",
  },
  {
    slug: "future-homes-standard-solar-mandate",
    category: "fhs",
    photo: "siteAerial",
    alt: "New build estate photographed from the air with rooftop solar",
    overline: "The Solar Mandate",
    sub: "What the standard asks of housebuilders.",
    headline: "Future Homes Standard explained, and a closer look at the solar mandate",
    dek: "How solar panels, heat pumps and battery storage will shape new build homes, and how to prepare for the 2027 requirements.",
    author: scott,
    date: "19 March 2026",
  },
  {
    slug: "solar-and-affordable-housing",
    category: "social-housing",
    photo: "family",
    alt: "A family standing outside a home with solar panels on the roof",
    overline: "Affordable, and Cheap to Run",
    sub: "Rising expectations, tighter budgets.",
    headline: "Why solar matters for the future of affordable housing",
    dek: "For local authorities and housing associations, expectations are rising just as build costs, regulation and financing requirements tighten.",
    author: danielle,
    date: "17 February 2026",
  },
  {
    slug: "breaking-the-green-premium",
    category: "home-design",
    photo: "streetPanels",
    alt: "A terrace of new homes with solar panels fitted across the roofline",
    overline: "Breaking the Premium",
    sub: "Why efficient homes cost more than they should.",
    headline: "Breaking the green premium, why it is holding back affordable, competitive homes",
    dek: "Efficiency and renewable features are becoming must haves. They cut bills and lift long term value, but the price tag still sits with the buyer.",
    author: danielle,
    date: "6 November 2025",
  },
  {
    slug: "rising-energy-demand-bigger-systems",
    category: "home-design",
    photo: "batteryInstall",
    alt: "Battery storage unit installed on the wall of a home",
    overline: "Sized for What Is Coming",
    sub: "EVs, heat pumps and a bigger bill.",
    headline: "Rising energy demand, why new build homes need bigger solar systems",
    dek: "EVs, heat pumps and connected devices are driving record demand, yet most new builds still get systems that barely make a dent.",
    author: hugo,
    date: "19 September 2025",
  },
  {
    slug: "best-roof-types-for-solar",
    category: "home-design",
    photo: "panelInstall",
    alt: "Solar panels being fitted to a pitched tiled roof",
    overline: "Solar Ready Roofs",
    sub: "Pitch, orientation and roof type.",
    headline: "Best roof types for solar panels, a guide for UK housebuilders",
    dek: "With rooftop solar about to become mandatory, solar ready roofs are a must. Roof types, design tips and system choices.",
    author: scott,
    date: "6 August 2025",
  },
  {
    slug: "integrating-solar-and-heat-pumps",
    category: "solar",
    photo: "singleHome",
    alt: "A detached new build home with a full array of roof mounted solar panels",
    overline: "Solar Meets the Heat Pump",
    sub: "Two systems, one electricity bill.",
    headline: "Integrating solar and heat pumps in new builds, a guide for housebuilders",
    dek: "As heat pumps replace gas, solar is the natural partner. How pairing them cuts running costs and manages SAP performance.",
    author: scott,
    date: "30 July 2025",
  },
  {
    slug: "how-solar-helps-meet-epc-targets",
    category: "epc",
    photo: "streetDusk",
    alt: "New homes at dusk with rooftop solar and lit interiors",
    overline: "Hitting the EPC Target",
    sub: "Where the ratings actually move.",
    headline: "How solar helps housebuilders meet EPC targets",
    dek: "Buyers increasingly want homes with lower running costs and greater energy independence, and lenders are following them.",
    author: danielle,
    date: "23 July 2025",
  },
  {
    slug: "what-is-gryd",
    category: "solar",
    photo: "family",
    alt: "A family outside their home, solar panels visible on the roof above",
    overline: "What Is Gryd",
    sub: "The solar subscription, explained.",
    headline: "What is Gryd? The solar subscription changing how new homes are powered",
    dek: "How the Gryd subscription model makes clean energy simple and builds it into new homes, with no upfront cost and no added complexity.",
    author: scott,
    date: "16 July 2025",
  },
  {
    slug: "solar-maintenance-and-replacement-costs",
    category: "maintenance",
    photo: "panelInstall",
    alt: "An engineer working on a rooftop solar array",
    overline: "The Cost of Ownership",
    sub: "Twenty five years of upkeep, priced.",
    headline: "Solar panel maintenance and replacement costs, what builders and buyers should know",
    dek: "UK maintenance and replacement costs broken down, with leasing set against ownership over the life of a system.",
    author: danielle,
    date: "9 July 2025",
  },
  {
    slug: "do-you-need-a-solar-battery",
    category: "batteries",
    photo: "batteryInstall",
    alt: "Home battery storage unit mounted beside a consumer unit",
    overline: "Do You Need a Battery",
    sub: "Daytime generation, evening demand.",
    headline: "Do you need a solar battery? Benefits for new build homes",
    dek: "Rooftop solar is becoming mandatory, so what comes next? How home batteries unlock bigger savings and long term resilience.",
    author: hugo,
    date: "2 July 2025",
  },
  {
    slug: "battery-storage-and-grid-constraints",
    category: "batteries",
    photo: "lfmAerial",
    alt: "Aerial view of a housing scheme with solar panels, set against open countryside",
    overline: "Around the Grid Queue",
    sub: "Storage as a viability tool.",
    headline: "How onsite battery storage can solve grid constraints and improve project viability",
    dek: "How on site solar and batteries cut connection costs and meet low carbon planning goals, without waiting on grid upgrades.",
    author: scott,
    date: "25 June 2025",
  },
  {
    slug: "solar-providers-compared",
    category: "energy",
    photo: "streetPanels",
    alt: "A row of homes with rooftop solar, viewed along the street",
    overline: "Three Models Compared",
    sub: "Cost, ownership and resale.",
    headline: "Solar providers compared, Gryd versus Zero Bills versus SNRG",
    dek: "Costs, ownership models and resale impact set side by side, to help you choose the right fit for your project and your buyers.",
    author: scott,
    date: "18 June 2025",
  },
  {
    slug: "a-simple-guide-to-solar-leases",
    category: "leases",
    photo: "singleHome",
    alt: "A new build house with solar panels, photographed from above the roofline",
    overline: "The Modern Solar Lease",
    sub: "How the arrangement actually works.",
    headline: "A simple guide to solar leases, how they work and why they are growing",
    dek: "How the modern solar lease futureproofs homes, cuts carbon and tackles fuel poverty, without upfront costs or maintenance worries.",
    author: danielle,
    date: "11 June 2025",
  },
  {
    slug: "mandatory-solar-panels-in-new-homes",
    category: "regulation",
    photo: "siteAerial",
    alt: "A large new build development seen from the air, roofs fitted with solar",
    overline: "Mandatory by 2027",
    sub: "What the requirement means on site.",
    headline: "Mandatory solar panels in new homes, what housebuilders need to know",
    dek: "With the Future Homes Standard on the horizon, how fully funded solar keeps you compliant and viable without the upfront cost.",
    author: scott,
    date: "4 June 2025",
  },
];

for (const s of stubs) {
  posts.push({
    slug: s.slug,
    category: cat(s.category),
    cover: {
      photo: (livePhotos[s.slug] ?? photos[s.photo])(s.alt),
      overline: s.overline,
      sub: s.sub,
    },
    headline: { text: s.headline },
    dek: s.dek,
    author: s.author,
    date: s.date,
    heroTitle: s.overline,
    heroStanding: s.sub,
    closing: assessmentClosing,
    body: bodies[s.slug] ?? [{ _type: "lead", text: s.dek }],
  });
}

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
