import fs from "node:fs";
import path from "node:path";

/* Rebuilds src/lib/bodies.ts from the verbatim gryd.energy capture.

   Wording is never altered. The only text handling is whitespace repair for
   artefacts the capture introduced when it flattened inline <strong> tags:
   runs of spaces are collapsed and a space stranded before a comma, full stop,
   semicolon or colon is closed up. No word, dash, hyphen or brand spelling is
   touched. Everything else the script does is structural: deciding which lines
   become paragraphs, headings, lists, quotes, definition rows or tables. */

const DIR = "/Users/mehdiaitbelaid/Desktop/Gryd/gryd-homepage/content-ref";
const OUT = "/Users/mehdiaitbelaid/Desktop/gryd-site/src/lib";

const map = [
  ["council-housing-solar-index-2026", "article-gryds-council-housing-solar-rankings-2026-which-regions-are-leading-and-which-are-falling-behind.md"],
  ["why-solar-farms-keep-getting-rejected", "article-rooftop-solar-vs-solar-farms.md"],
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
  ["project:lower-farm-mews", "article-how-gryd-helped-deliver-higher-sustainability-without-adding-a-penny-to-the-build-cost.md"],
  ["project:st-ives-year-of-data", "article-funded-solar-and-battery-for-three-new-build-homes-in-st-ives-cornwall-a-year-with-a-gryd-solar-subscription.md"],
  ["project:fifty-five-plot-analysis", "article-independent-developer-analysis-of-gryd-on-a-55-home-site.md"],
];

/* Whitespace repair only. Every word, dash and hyphen survives untouched. */
function ws(s) {
  return s
    .replace(/\u00a0/g, " ")
    .replace(/\s{2,}/g, " ")
    .replace(/ +([,.;:])/g, "$1")
    .trim();
}

/* Chrome the capture picked up from the page shell rather than the article. */
const isChrome = (l) =>
  !l ||
  l.startsWith("[link]") ||
  l.startsWith("[button]") ||
  l.startsWith("<") ||
  /^share this article:?$/i.test(l) ||
  /^No Comments$/i.test(l) ||
  l === "---";

/** Pulls the article region out of a captured page. */
function slice(file) {
  const raw = fs.readFileSync(path.join(DIR, file), "utf8");
  const start = raw.indexOf("## Body copy");
  if (start === -1) throw new Error(`no body section in ${file}`);
  let body = raw.slice(raw.indexOf("\n", start) + 1);
  const end = body.indexOf("[link] All Posts");
  if (end === -1) throw new Error(`no author signature in ${file}`);
  body = body.slice(0, end);
  return body.replace(/####[^\n]*\n\s*$/, "");
}

function parse(file) {
  const lines = slice(file).split("\n").map((l) => l.trim());

  const blocks = [];
  let meta = { title: "", date: "", author: "" };
  let bullets = [];
  let table = [];
  let spec = [];
  let quote = null;
  let seenTitle = false;
  let metaTaken = 0;

  const flushBullets = () => {
    if (bullets.length) blocks.push({ _type: "bullets", items: bullets.splice(0) });
  };
  const flushSpec = () => {
    if (spec.length >= 2) blocks.push({ _type: "spec", rows: spec.splice(0) });
    else if (spec.length === 1) {
      const r = spec.splice(0)[0];
      blocks.push({ _type: "para", text: `${r.term}: ${r.detail}` });
    }
  };
  const flushQuote = () => {
    if (quote) blocks.push(quote), (quote = null);
  };
  const flushTable = () => {
    if (!table.length) return;
    const rows = table.splice(0);
    // A lone row carries no structure worth a table; keep the words as prose.
    if (rows.length < 2) {
      if (rows.length === 1) blocks.push({ _type: "para", text: rows[0].join(" ") });
      return;
    }
    blocks.push({ _type: "table", head: rows[0], rows: rows.slice(1) });
  };
  const flushAll = () => {
    flushTable();
    flushBullets();
    flushSpec();
    flushQuote();
  };

  for (const line of lines) {
    if (isChrome(line)) continue;

    // Tables arrive as pipe rows separated by blank lines, header row first.
    if (line.startsWith("|")) {
      flushBullets();
      flushSpec();
      flushQuote();
      const cells = line
        .split("|")
        .slice(1, -1)
        .map(ws);
      // Markdown alignment rules carry no content.
      if (cells.every((c) => /^:?-{3,}:?$/.test(c) || !c)) continue;
      table.push(cells);
      continue;
    }
    flushTable();

    if (line.startsWith("# ")) {
      seenTitle = true;
      meta.title = ws(line.slice(2));
      continue;
    }

    if (line.startsWith("- ")) {
      const item = ws(line.slice(2));
      // The two bullets straight after the H1 are the publish date and byline.
      if (seenTitle && metaTaken < 2 && blocks.length === 0 && !bullets.length) {
        if (metaTaken === 0) meta.date = item;
        else meta.author = item;
        metaTaken += 1;
        continue;
      }
      flushSpec();
      flushQuote();
      bullets.push(item);
      continue;
    }
    flushBullets();

    if (/^#{2,6} /.test(line)) {
      flushSpec();
      flushQuote();
      const level = line.match(/^#+/)[0].length;
      blocks.push({ _type: level === 2 ? "h3" : "h4", text: ws(line.replace(/^#+\s*/, "")) });
      continue;
    }

    // A pull quote, then on the next line its attribution behind an em dash.
    if (/^[“"]/.test(line)) {
      flushSpec();
      flushQuote();
      quote = { _type: "quote", text: ws(line).replace(/^[“"]/, "").replace(/[”"]$/, "") };
      continue;
    }
    if (quote && /^[—–]\s*\S/.test(line)) {
      quote.attribution = ws(line.replace(/^[—–]\s*/, ""));
      flushQuote();
      continue;
    }
    flushQuote();

    // Key-details rows published as "Term : Detail".
    const kv = line.match(/^([A-Z][A-Za-z ]{1,28})\s:\s(.+)$/);
    if (kv) {
      spec.push({ term: ws(kv[1]), detail: ws(kv[2]) });
      continue;
    }
    flushSpec();

    const text = ws(line);
    if (text) blocks.push({ _type: "para", text });
  }
  flushAll();

  // The capture kept the source's hard wraps, so one sentence can arrive split
  // across two paragraph blocks. Rejoin where the first half is unfinished.
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

  // Elementor re-renders a stretch of blocks on some pages, so the same block
  // comes back a few positions later. A genuine repeat, such as an "Advantages:"
  // label under two different headings, is always far apart, so only suppress a
  // duplicate that recurs inside a short window. Headings recur legitimately and
  // are never suppressed. Every suppression is reported, never silent.
  const WINDOW = 8;
  const deduped = [];
  const suppressed = [];
  for (const b of joined) {
    if (b._type !== "h3" && b._type !== "h4") {
      const key = JSON.stringify(b);
      const recent = deduped.slice(-WINDOW).some((p) => JSON.stringify(p) === key);
      if (recent) {
        suppressed.push(b);
        continue;
      }
    }
    deduped.push(b);
  }

  // The opening paragraph is set as the standfirst.
  const first = deduped.findIndex((b) => b._type === "para");
  if (first !== -1) deduped[first] = { _type: "lead", text: deduped[first].text };

  return { blocks: deduped, meta, suppressed };
}

/* ---- repairs for gaps in the capture --------------------------------------
   Where the capture is demonstrably short of the live page, the live page wins.
   Each entry records what was checked and where, so the provenance is auditable.
   Keep this list tiny: it is for capture defects, never for editing Gryd's copy. */

const liveFixups = {
  "council-housing-solar-index-2026": {
    source:
      "https://gryd.energy/gryds-council-housing-solar-rankings-2026-which-regions-are-leading-and-which-are-falling-behind/",
    note: 'Capture lost the header row of the "Bottom 5 Regions" table; restored from the live page.',
    apply(blocks) {
      const restored = [];
      for (const b of blocks) {
        if (b._type === "table" && b.head[0] === "1" && b.head[1] === "London") {
          const head = ["Rank", "Region", "Share of Council Homes with Solar"];
          b.rows.unshift(b.head);
          b.head = head;
          restored.push(head.join(" "));
        }
      }
      return restored;
    },
  },
};

/* ---- parity ---------------------------------------------------------------
   Compares the words the capture holds against the words the blocks will
   render, ignoring punctuation, case and whitespace. Any difference here is a
   wording change and must be zero. */

const norm = (s) =>
  s
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9£%]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);

function sourceWords(file) {
  const lines = slice(file).split("\n").map((l) => l.trim());
  let seenTitle = false;
  let metaTaken = 0;
  const kept = [];
  for (const line of lines) {
    if (isChrome(line)) continue;
    if (line.startsWith("# ")) {
      seenTitle = true;
      continue;
    }
    if (line.startsWith("- ") && seenTitle && metaTaken < 2 && !kept.length) {
      metaTaken += 1;
      continue;
    }
    if (/^\|?\s*:?-{3,}:?\s*\|/.test(line)) continue;
    kept.push(line.replace(/^#+\s*/, "").replace(/^- /, "").replace(/\|/g, " "));
  }
  return norm(kept.join(" "));
}

function blockWords(blocks) {
  const parts = [];
  for (const b of blocks) {
    if (b.text) parts.push(b.text);
    if (b.attribution) parts.push(b.attribution);
    if (b.items) parts.push(b.items.join(" "));
    if (b.rows && b._type === "spec") parts.push(b.rows.map((r) => `${r.term} ${r.detail}`).join(" "));
    if (b._type === "table") parts.push([b.head, ...b.rows].map((r) => r.join(" ")).join(" "));
  }
  return norm(parts.join(" "));
}

/** Multiset difference, so a dropped or invented word cannot hide. */
function diff(a, b) {
  const count = new Map();
  for (const w of a) count.set(w, (count.get(w) ?? 0) + 1);
  for (const w of b) count.set(w, (count.get(w) ?? 0) - 1);
  const missing = [];
  const extra = [];
  for (const [w, n] of count) {
    if (n > 0) missing.push(...Array(n).fill(w));
    if (n < 0) extra.push(...Array(-n).fill(w));
  }
  return { missing, extra };
}

/* ---- run ------------------------------------------------------------------ */

const bodies = {};
const report = [];

for (const [slug, file] of map) {
  const { blocks, meta, suppressed } = parse(file);
  const fix = liveFixups[slug];
  const restored = fix ? fix.apply(blocks) : [];
  bodies[slug] = blocks;

  const src = sourceWords(file);
  const out = blockWords(blocks);
  // A suppressed re-render contributes its words to the capture but not to the
  // page; text restored from the live page does the reverse. Both are accounted
  // for here so neither can masquerade as a wording change.
  const d = diff([...src, ...norm(restored.join(" "))], [...out, ...blockWords(suppressed)]);
  report.push({
    slug,
    file,
    meta,
    blocks: blocks.length,
    src: src.length,
    out: out.length,
    suppressed: suppressed.map((b) => (b.text ? b.text : (b.items ?? []).join(" | "))),
    restored,
    // Fed to docs/check-parity.mjs, which repeats this comparison against the
    // rendered DOM rather than against these blocks.
    srcText: src.join(" "),
    paragraphs: blocks.filter((b) => b._type === "para" || b._type === "lead").map((b) => b.text),
    fixup: fix ? { source: fix.source, note: fix.note } : null,
    ...d,
  });
}

const ts = `import type { Block } from "./types";

/* Article bodies taken verbatim from the live gryd.energy site, via the capture
   in gryd-homepage/content-ref. Generated by docs/migrate-bodies.mjs, which
   applies no rewriting: wording, dashes, hyphens and brand spelling are exactly
   as published. Do not hand edit, regenerate instead. */

export const bodies: Record<string, Block[]> = ${JSON.stringify(bodies, null, 2)};
`;
fs.writeFileSync(path.join(OUT, "bodies.ts"), ts);

fs.writeFileSync(
  "/Users/mehdiaitbelaid/Desktop/gryd-site/docs/parity.json",
  JSON.stringify(report, null, 2),
);

let bad = 0;
for (const r of report) {
  const ok = r.missing.length === 0 && r.extra.length === 0;
  if (!ok) bad += 1;
  console.log(
    `${ok ? "ok  " : "DIFF"} ${r.slug.padEnd(42)} src ${String(r.src).padStart(5)}  out ${String(r.out).padStart(5)}` +
      (ok ? "" : `\n     missing: ${r.missing.slice(0, 25).join(" ")}\n     extra:   ${r.extra.slice(0, 25).join(" ")}`),
  );
}
console.log(`\n${map.length} articles, ${bad} with wording differences`);
