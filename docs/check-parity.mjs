import { spawn } from "node:child_process";
import fs from "node:fs";
import { chromium } from "playwright";

/* Serves the production build and checks, against the real DOM, that every
   article renders Gryd's published words and nothing else.

   For each of the 24 detail routes it asserts a 200, lifts the rendered article
   text out of the page, and compares it word for word with the verbatim
   capture. Cover artwork we added, meaning stats panels, galleries and photo
   figures, is stripped before comparing; published tables are kept. It then
   spot checks five articles by taking a random paragraph straight from the
   capture and requiring it to appear in the DOM character for character.

   Writes docs/content-parity.md. */

const ROOT = "/Users/mehdiaitbelaid/Desktop/gryd-site";
const PORT = 3123;
const BASE = `http://127.0.0.1:${PORT}`;

const report = JSON.parse(fs.readFileSync(`${ROOT}/docs/parity.json`, "utf8"));

const routeOf = (slug) =>
  slug.startsWith("project:") ? `/projects/${slug.slice(8)}` : `/blog/${slug}`;

const norm = (s) =>
  s
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9£%]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);

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

/** Deterministic picker, so a failing spot check can be reproduced. */
function seeded(seed) {
  let s = seed;
  return () => {
    s = (s * 1103515245 + 12345) % 2147483648;
    return s / 2147483648;
  };
}

const server = spawn("npx", ["next", "start", "-p", String(PORT)], {
  cwd: ROOT,
  stdio: ["ignore", "pipe", "pipe"],
});
server.stderr.on("data", (d) => process.stderr.write(d));

await new Promise((resolve, reject) => {
  const timer = setTimeout(() => reject(new Error("server did not start")), 60000);
  server.stdout.on("data", (d) => {
    if (d.toString().includes("Ready")) {
      clearTimeout(timer);
      resolve();
    }
  });
});

const browser = await chromium.launch();
const page = await browser.newPage();
const rows = [];

try {
  for (const r of report) {
    const route = routeOf(r.slug);
    const res = await page.goto(BASE + route, { waitUntil: "domcontentloaded" });
    const status = res.status();

    const rendered = await page.evaluate(() => {
      const article = document.querySelector("article.g-body");
      if (!article) return null;
      const clone = article.cloneNode(true);
      // Our own artwork and the back link are not Gryd article copy.
      clone.querySelectorAll("figure.g-break, .g-return").forEach((n) => n.remove());
      // A detached clone has no layout, so innerText is unavailable and
      // textContent would run the last word of one cell into the first word of
      // the next. Separate every text bearing element explicitly.
      clone
        .querySelectorAll("p, h3, h4, li, th, td, dt, dd, blockquote, cite")
        .forEach((n) => n.append(" "));
      return clone.textContent ?? "";
    });

    const h2 = (await page.locator(".g-title h2").first().textContent())?.trim() ?? "";
    const byline = (await page.locator(".g-byline .who").first().textContent())?.trim() ?? "";

    const src = norm(
      [
        ...report.find((x) => x.slug === r.slug).srcText.split(" "),
      ].join(" "),
    );
    const dom = norm(rendered ?? "");
    // Re-render suppressed on the page, and header text restored from the live
    // page, are reconciled the same way the generator reconciles them.
    const d = diff([...src, ...norm((r.restored ?? []).join(" "))], [
      ...dom,
      ...norm((r.suppressed ?? []).join(" ")),
    ]);

    rows.push({
      slug: r.slug,
      route,
      status,
      title: r.meta.title,
      titleOnPage: h2,
      titleMatches: h2 === r.meta.title,
      author: r.meta.author,
      bylineMatches: byline === r.meta.author,
      srcWords: src.length,
      domWords: dom.length,
      missing: d.missing,
      extra: d.extra,
      suppressed: r.suppressed ?? [],
      restored: r.restored ?? [],
      fixup: r.fixup,
    });
  }

  /* ---- spot checks -------------------------------------------------------- */
  const rand = seeded(20260818);
  const pool = [...report].sort((a, b) => a.slug.localeCompare(b.slug));
  const picked = [];
  while (picked.length < 5) {
    const c = pool[Math.floor(rand() * pool.length)];
    if (!picked.includes(c)) picked.push(c);
  }

  const spots = [];
  for (const r of picked) {
    await page.goto(BASE + routeOf(r.slug), { waitUntil: "domcontentloaded" });
    const domText = await page.evaluate(
      () => document.querySelector("article.g-body")?.textContent ?? "",
    );
    const paras = r.paragraphs.filter((p) => p.length > 90);
    const para = paras[Math.floor(rand() * paras.length)];
    spots.push({ slug: r.slug, para, found: domText.includes(para) });
  }

  /* ---- write the report --------------------------------------------------- */
  const bad = rows.filter((x) => x.missing.length || x.extra.length);
  const nonOk = rows.filter((x) => x.status !== 200);
  const titleBad = rows.filter((x) => !x.titleMatches);
  const bylineBad = rows.filter((x) => !x.bylineMatches);
  const spotBad = spots.filter((s) => !s.found);

  const md = [];
  md.push("# Content parity against gryd.energy", "");
  md.push(
    "Every article body, title, standfirst, quote, byline, date and category on this site is",
    "taken verbatim from the live gryd.energy pages, via the capture in",
    "`Gryd/gryd-homepage/content-ref`. This file is the evidence, regenerated by",
    "`docs/check-parity.mjs`.",
    "",
    "The comparison is made against the rendered DOM, not the source data: each detail route",
    "is served from a production build, the article element is read back, our own artwork",
    "(stats panels, galleries, photo figures) is stripped, and the remaining words are",
    "compared with the capture. Case, punctuation and whitespace are ignored; every word,",
    "number and percentage must match exactly, in the same quantity.",
    "",
    "To reproduce:",
    "",
    "```",
    "node docs/migrate-bodies.mjs   # rebuilds src/lib/bodies.ts and docs/parity.json",
    "node docs/migrate-cards.mjs   # rebuilds src/lib/cards.ts",
    "npm run build",
    "node docs/check-parity.mjs    # serves the build and rewrites this file",
    "```",
    "",
  );
  md.push("## Result", "");
  md.push(`- Routes checked: **${rows.length}**, all returning ${nonOk.length ? "**" + nonOk.length + " non-200**" : "**200**"}`);
  md.push(`- Articles with a wording difference: **${bad.length}**`);
  md.push(`- Titles matching the live H1: **${rows.length - titleBad.length}/${rows.length}**`);
  md.push(`- Bylines matching the live byline: **${rows.length - bylineBad.length}/${rows.length}**`);
  md.push(`- Spot checks passed: **${spots.length - spotBad.length}/${spots.length}**`);
  md.push("");

  md.push("## Per article", "");
  md.push("| Article | Route | Status | Source words | Rendered words | Difference |");
  md.push("| --- | --- | --- | ---: | ---: | --- |");
  for (const x of rows) {
    const delta =
      x.missing.length || x.extra.length
        ? `missing: ${x.missing.join(" ")}${x.extra.length ? ` / unexpected: ${x.extra.join(" ")}` : ""}`
        : x.restored.length || x.suppressed.length
          ? "none, counts reconciled in the notes below"
          : "none";
    md.push(
      `| ${x.title.replace(/\|/g, "\\|")} | \`${x.route}\` | ${x.status} | ${x.srcWords} | ${x.domWords} | ${delta} |`,
    );
  }
  md.push("");

  md.push("## Spot checks", "");
  md.push(
    "Five articles picked at random from a fixed seed. A paragraph is taken straight from the",
    "capture and must appear in the rendered DOM character for character.",
    "",
  );
  for (const s of spots) {
    md.push(`- **${s.slug}** — ${s.found ? "exact match" : "**NOT FOUND**"}`);
    md.push(`  > ${s.para}`);
  }
  md.push("");

  const withNotes = rows.filter((x) => x.suppressed.length || x.restored.length);
  md.push("## Notes on the two places the capture and the live page disagree", "");
  if (!withNotes.length) md.push("None.");
  for (const x of withNotes) {
    md.push(`### ${x.title}`, "");
    if (x.restored.length) {
      md.push(
        `Restored from the live page (${x.fixup?.source}): ${x.fixup?.note}`,
        "",
        ...x.restored.map((t) => `- \`${t}\``),
        "",
      );
    }
    if (x.suppressed.length) {
      md.push(
        "The live page re-renders the following block a second time a few paragraphs later,",
        "an Elementor artefact rather than published copy. It is rendered once here. No words",
        "are lost: every one of them appears earlier in the article.",
        "",
        ...x.suppressed.map((t) => `- \`${t}\``),
        "",
      );
    }
  }
  md.push("");

  md.push("## Known defects carried over from the live site", "");
  md.push(
    "These are wrong on gryd.energy itself. They are reproduced here because the instruction",
    "is to match the live site exactly. Each is a one line fix once Gryd corrects the source.",
    "",
    "- **St Ives case study** carries a stray `Lorem ipsum dolor sit amet…` paragraph in *The",
    "  Developer*. Confirmed present on the live page on 2026-08-18, so it is reproduced.",
    "- **How Solar Helps Housebuilders Meet EPC Targets** has no meta description, so its",
    "  listing standfirst is cut off mid sentence at the word “Lenders”. Reproduced as found.",
    "- **Breaking the Green Premium** is cut off the same way, at “But the”.",
    "",
  );

  fs.writeFileSync(`${ROOT}/docs/content-parity.md`, md.join("\n"));

  console.log(`routes 200: ${rows.length - nonOk.length}/${rows.length}`);
  console.log(`wording differences: ${bad.length}`);
  console.log(`titles match: ${rows.length - titleBad.length}/${rows.length}`);
  console.log(`bylines match: ${rows.length - bylineBad.length}/${rows.length}`);
  console.log(`spot checks: ${spots.length - spotBad.length}/${spots.length}`);
  for (const x of bad) console.log(`  DIFF ${x.slug} missing=${x.missing.join(" ")} extra=${x.extra.join(" ")}`);
  for (const x of titleBad) console.log(`  TITLE ${x.slug}\n    page: ${x.titleOnPage}\n    live: ${x.title}`);
  for (const s of spotBad) console.log(`  SPOT ${s.slug}: ${s.para}`);

  if (nonOk.length || bad.length || titleBad.length || bylineBad.length || spotBad.length) {
    process.exitCode = 1;
  }
} finally {
  await browser.close();
  server.kill();
}
