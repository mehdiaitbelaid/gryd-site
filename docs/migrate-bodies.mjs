import fs from "node:fs";
import path from "node:path";

const DIR = "/Users/mehdiaitbelaid/Desktop/Gryd/gryd-homepage/content-ref";

const map = [
  ["council-housing-solar-index-2026", "article-gryds-council-housing-solar-rankings-2026-which-regions-are-leading-and-which-are-falling-behind.md"],
  ["complete-guide-to-funded-solar", "article-funded-solar-storage-new-build-homes-guide.md"],
  ["sap-scores-versus-real-energy-use", "article-sap-scores-vs-real-energy-use-why-developers-are-missing-half-the-picture.md"],
  ["future-homes-standard-differentiate", "article-the-future-homes-standard-how-to-differentiate-when-everyone-must-comply.md"],
  ["how-much-solar-do-you-need", "article-future-homes-standard-how-to-calculate-how-much-solar-you-need.md"],
  ["future-homes-standard-timeline", "article-the-future-homes-standard-is-published-heres-the-confirmed-timeline-for-implementation.md"],
  ["future-homes-standard-solar-mandate", "article-future-homes-standard-explained.md"],
  ["solar-and-affordable-housing", "article-why-solar-matters-for-the-future-of-affordable-housing.md"],
  ["breaking-the-green-premium", "article-breaking-the-green-premium-why-its-holding-back-affordable-competitive-homes.md"],
  ["rising-energy-demand-bigger-systems", "article-rising-energy-demand-why-new-build-homes-need-bigger-solar-systems.md"],
  ["best-roof-types-for-solar", "article-best-roof-types-for-solar-panels-a-guide-for-housebuilders.md"],
  ["integrating-solar-and-heat-pumps", "article-integrating-solar-and-heat-pumps-in-new-builds-a-guide-for-housebuilders.md"],
  ["how-solar-helps-meet-epc-targets", "article-how-solar-helps-housebuilders-meet-epc-targets.md"],
  ["what-is-gryd", "article-what-is-gryd-how-were-changing-the-way-homes-are-powered.md"],
  ["solar-maintenance-and-replacement-costs", "article-solar-panel-maintenance-and-replacement-costs-what-builders-and-buyers-should-know.md"],
  ["do-you-need-a-solar-battery", "article-do-you-need-a-solar-battery-benefits-for-new-build-homes.md"],
  ["battery-storage-and-grid-constraints", "article-how-onsite-battery-storage-can-solve-grid-constraints-and-improve-project-viability.md"],
  ["solar-providers-compared", "article-solar-providers-compared-gryd-vs-zero-bills-vs-snrg.md"],
  ["a-simple-guide-to-solar-leases", "article-a-simple-guide-to-solar-leases-how-they-work-and-why-theyre-growing.md"],
  ["mandatory-solar-panels-in-new-homes", "article-mandatory-solar-panels-in-new-homes-what-housebuilders-need-to-know.md"],
  ["project:st-ives-year-of-data", "article-funded-solar-and-battery-for-three-new-build-homes-in-st-ives-cornwall-a-year-with-a-gryd-solar-subscription.md"],
  ["project:fifty-five-plot-analysis", "article-independent-developer-analysis-of-gryd-on-a-55-home-site.md"],
];

/* House style: no dash punctuation, company name normalised. Ranges become "to",
   every other dash use becomes a comma. Genuine compound hyphens stay. */
function clean(s) {
  let t = s.replace(/ /g, " ").trim();
  t = t.replace(/GRYD/g, "Gryd");
  // numeric and currency ranges
  t = t.replace(/(£?[\d.,]+\s*(?:%|kW|kWp|kWh|k)?)\s*[–—]\s*(£?[\d.,]+)/g, "$1 to $2");
  t = t.replace(/(\d)-(\d)/g, "$1 to $2");
  t = t.replace(/(\d)\s+-\s+(\d)/g, "$1 to $2");
  // any remaining dash used as punctuation
  t = t.replace(/\s*[–—]\s*/g, ", ");
  t = t.replace(/\s+-\s+/g, ", ");
  t = t.replace(/,\s*,/g, ",");
  t = t.replace(/\s{2,}/g, " ");
  t = t.replace(/\s+([,.;:)])/g, "$1");
  return t.trim();
}

const skip = (l) =>
  l.startsWith("[link]") ||
  l.startsWith("[button]") ||
  l.startsWith("<") ||
  /^share this article:?$/i.test(l) ||
  /^No Comments$/i.test(l) ||
  l === "---";

function parse(file) {
  const raw = fs.readFileSync(path.join(DIR, file), "utf8");
  const start = raw.indexOf("## Body copy");
  let body = raw.slice(raw.indexOf("\n", start) + 1);
  const end = body.indexOf("[link] All Posts");
  if (end === -1) throw new Error("no author signature in " + file);
  body = body.slice(0, end);
  // drop the trailing author heading
  body = body.replace(/####[^\n]*\n\s*$/, "");

  const lines = body.split("\n").map((l) => l.trim());
  let blocks = [];
  let pendingBullets = [];
  let pendingTable = [];
  let seenH1 = false;
  let metaCount = 0;

  const flushBullets = () => {
    if (pendingBullets.length) {
      blocks.push({ _type: "bullets", items: pendingBullets.slice() });
      pendingBullets = [];
    }
  };
  const flushTable = () => {
    if (!pendingTable.length) return;
    const rows = pendingTable.slice();
    pendingTable = [];
    const header = rows[0];
    const rest = rows.slice(1);
    if (rest.length === 0) return;
    if (header.length === 2) {
      blocks.push({ _type: "spec", rows: rest.map((r) => ({ term: r[0], detail: r[1] })) });
    } else {
      blocks.push({
        _type: "bullets",
        items: rest.map(
          (r) =>
            `${r[0]}: ` +
            r
              .slice(1)
              .map((cell, i) => `${header[i + 1]} ${cell}`)
              .join("; "),
        ),
      });
    }
  };

  for (const line of lines) {
    if (!line) continue;
    if (skip(line)) continue;

    if (line.startsWith("|")) {
      flushBullets();
      const cells = line.split("|").map((c) => clean(c)).filter((c, i, a) => !(i === 0 || i === a.length - 1));
      if (cells.some((c) => c)) pendingTable.push(cells);
      continue;
    }
    flushTable();

    if (line.startsWith("# ")) {
      seenH1 = true;
      continue; // the H1 is the hero title, rendered separately
    }
    if (line.startsWith("- ")) {
      const item = clean(line.slice(2));
      // the two lines after the H1 are the publish date and the author byline
      if (seenH1 && metaCount < 2 && blocks.length === 0 && pendingBullets.length === 0) {
        metaCount += 1;
        continue;
      }
      pendingBullets.push(item);
      continue;
    }
    flushBullets();
    if (line.startsWith("###### ") || line.startsWith("##### ") || line.startsWith("#### ")) {
      blocks.push({ _type: "h4", text: clean(line.replace(/^#+\s*/, "")) });
      continue;
    }
    if (line.startsWith("### ")) {
      blocks.push({ _type: "h4", text: clean(line.slice(4)) });
      continue;
    }
    if (line.startsWith("## ")) {
      blocks.push({ _type: "h3", text: clean(line.slice(3)) });
      continue;
    }
    const text = clean(line);
    if (!text) continue;
    blocks.push({ _type: "para", text });
  }
  flushBullets();
  flushTable();

  // The capture kept the source's hard line breaks, so a sentence can arrive
  // split across two paragraph blocks. Rejoin when the first half is unfinished.
  const joined = [];
  for (const b of blocks) {
    const prev = joined[joined.length - 1];
    if (
      b._type === "para" &&
      prev &&
      prev._type === "para" &&
      prev.text.length > 60 &&
      !/[.!?:;”"’')%]$/.test(prev.text)
    ) {
      prev.text = `${prev.text} ${b.text}`;
      continue;
    }
    joined.push(b);
  }
  blocks = joined;

  // Elementor renders some blocks twice; drop exact repeats.
  const seen = new Set();
  const deduped = blocks.filter((b) => {
    const key = JSON.stringify(b);
    if (b._type === "h3" || b._type === "h4") return true;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  // First paragraph becomes the lead.
  const firstPara = deduped.findIndex((b) => b._type === "para");
  if (firstPara !== -1) deduped[firstPara] = { _type: "lead", text: deduped[firstPara].text };
  return deduped;
}

const out = {};
for (const [slug, file] of map) out[slug] = parse(file);

const ts = `import type { Block } from "./types";

/* Article bodies migrated from the live gryd.energy WordPress site, via the
   verbatim capture in gryd-homepage/content-ref. Text is Gryd's own published
   copy. Only house style was applied: dash punctuation rewritten, and the company name normalised to Gryd. */

export const bodies: Record<string, Block[]> = ${JSON.stringify(out, null, 2)};
`;
fs.writeFileSync("/Users/mehdiaitbelaid/Desktop/gryd-site/src/lib/bodies.ts", ts);

for (const [slug, blocks] of Object.entries(out)) {
  const words = blocks
    .map((b) => b.text || (b.items || []).join(" ") || (b.rows || []).map((r) => r.term + " " + r.detail).join(" ") || "")
    .join(" ")
    .split(/\s+/).length;
  console.log(slug, blocks.length, "blocks", words, "words");
}
