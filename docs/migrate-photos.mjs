import fs from "node:fs";
import { execSync } from "node:child_process";
const urlToSlug = {
 "gryds-council-housing-solar-rankings-2026-which-regions-are-leading-and-which-are-falling-behind":"council-housing-solar-index-2026",
 "rooftop-solar-vs-solar-farms":"why-solar-farms-keep-getting-rejected",
 "funded-solar-storage-new-build-homes-guide":"complete-guide-to-funded-solar",
 "sap-scores-vs-real-energy-use-why-developers-are-missing-half-the-picture":"sap-scores-versus-real-energy-use",
 "the-future-homes-standard-how-to-differentiate-when-everyone-must-comply":"future-homes-standard-differentiate",
 "future-homes-standard-how-to-calculate-how-much-solar-you-need":"how-much-solar-do-you-need",
 "the-future-homes-standard-is-published-heres-the-confirmed-timeline-for-implementation":"future-homes-standard-timeline",
 "future-homes-standard-explained":"future-homes-standard-solar-mandate",
 "why-solar-matters-for-the-future-of-affordable-housing":"solar-and-affordable-housing",
 "breaking-the-green-premium-why-its-holding-back-affordable-competitive-homes":"breaking-the-green-premium",
 "rising-energy-demand-why-new-build-homes-need-bigger-solar-systems":"rising-energy-demand-bigger-systems",
 "best-roof-types-for-solar-panels-a-guide-for-housebuilders":"best-roof-types-for-solar",
 "integrating-solar-and-heat-pumps-in-new-builds-a-guide-for-housebuilders":"integrating-solar-and-heat-pumps",
 "how-solar-helps-housebuilders-meet-epc-targets":"how-solar-helps-meet-epc-targets",
 "what-is-gryd-how-were-changing-the-way-homes-are-powered":"what-is-gryd",
 "solar-panel-maintenance-and-replacement-costs-what-builders-and-buyers-should-know":"solar-maintenance-and-replacement-costs",
 "do-you-need-a-solar-battery-benefits-for-new-build-homes":"do-you-need-a-solar-battery",
 "how-onsite-battery-storage-can-solve-grid-constraints-and-improve-project-viability":"battery-storage-and-grid-constraints",
 "solar-providers-compared-gryd-vs-zero-bills-vs-snrg":"solar-providers-compared",
 "a-simple-guide-to-solar-leases-how-they-work-and-why-theyre-growing":"a-simple-guide-to-solar-leases",
 "mandatory-solar-panels-in-new-homes-what-housebuilders-need-to-know":"mandatory-solar-panels-in-new-homes",
 "funded-solar-and-battery-for-three-new-build-homes-in-st-ives-cornwall-a-year-with-a-gryd-solar-subscription":"project:st-ives-year-of-data",
 "independent-developer-analysis-of-gryd-on-a-55-home-site":"project:fifty-five-plot-analysis",
 "how-gryd-helped-deliver-higher-sustainability-without-adding-a-penny-to-the-build-cost":"project:lower-farm-mews",
};
const lines = fs.readFileSync("/tmp/imgmap.txt","utf8").trim().split("\n");
const entries = [];
for (const l of lines) {
  const [url, file] = l.split("|");
  const s = url.replace("https://gryd.energy/","").replace(/\/$/,"");
  const slug = urlToSlug[s];
  if (!slug) throw new Error("unmapped "+s);
  const dim = execSync(`sips -g pixelWidth -g pixelHeight "public/img/live/${file}"`).toString();
  const w = +dim.match(/pixelWidth: (\d+)/)[1];
  const h = +dim.match(/pixelHeight: (\d+)/)[1];
  entries.push([slug, file, w, h]);
}
entries.sort((a,b)=>a[0].localeCompare(b[0]));
const ts = `import type { Photo } from "./types";

/* Featured images pulled from the live gryd.energy WordPress media library,
   keyed by the slug of the post or project they belong to. Projects are keyed
   "project:<slug>". Gryd owns this artwork; stock frames were licensed by Gryd. */

const live =
  (src: string, width: number, height: number) =>
  (alt: string): Photo => ({ src: \`/img/live/\${src}\`, alt, width, height });

export const livePhotos: Record<string, (alt: string) => Photo> = {
${entries.map(([s,f,w,h])=>`  "${s}": live("${f}", ${w}, ${h}),`).join("\n")}
};
`;
fs.writeFileSync("src/lib/livePhotos.ts", ts);
console.log(entries.length);
