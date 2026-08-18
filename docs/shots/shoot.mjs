/* Screenshots the five hub routes at 1280 and 390 into docs/shots/g/, checks each
   page for horizontal overflow, and exercises the Knowledge Hub category filter.
   Run against a started server: node docs/shots/shoot.mjs http://localhost:3000 */

import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const base = process.argv[2] ?? "http://localhost:3000";
const out = join(dirname(fileURLToPath(import.meta.url)), "g");
mkdirSync(out, { recursive: true });

const routes = [
  ["projects", "/projects"],
  ["case-study", "/projects/lower-farm-mews"],
  ["blog", "/blog"],
  ["news", "/news"],
  ["article", "/blog/why-solar-farms-keep-getting-rejected"],
];

const widths = [1280, 390];
const browser = await chromium.launch();
let failures = 0;

/* Photos below the fold load lazily, so a full page screenshot taken straight
   after load catches empty frames. Walk the page down, then wait for every
   image to finish decoding. */
async function settleImages(page) {
  await page.evaluate(async () => {
    const step = window.innerHeight;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForFunction(
    () => [...document.images].every((img) => img.complete && img.naturalWidth > 0),
    null,
    { timeout: 30000 },
  );
  await page.waitForTimeout(300);
}

for (const [name, path] of routes) {
  for (const width of widths) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    await page.goto(base + path, { waitUntil: "load" });
    await settleImages(page);

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    if (overflow > 0) {
      console.error(`OVERFLOW ${name} at ${width}: ${overflow}px`);
      failures++;
    }

    await page.screenshot({ path: join(out, `${name}-${width}.png`), fullPage: true });
    console.log(`shot ${name}-${width}.png, overflow ${overflow}px`);
    await page.close();
  }
}

// The category filter is the one interactive piece in the hub.
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
await page.goto(base + "/blog", { waitUntil: "load" });

await settleImages(page);
const before = await page.locator(".g-grid .g-card:visible").count();
await page.locator('.f-pill[data-cat="fhs"]').click();
await page.waitForTimeout(200);
const after = await page.locator(".g-grid .g-card:visible").count();
const label = await page.locator(".g-count").textContent();
const pressed = await page.locator('.f-pill[data-cat="fhs"]').getAttribute("aria-pressed");

console.log(`filter: ${before} cards, then FHS gives ${after}, pressed=${pressed}, count "${label}"`);
if (!(before === 21 && after === 4 && pressed === "true")) {
  console.error("FILTER CHECK FAILED");
  failures++;
}
await page.screenshot({ path: join(out, "blog-filtered-1280.png"), fullPage: true });

await browser.close();
if (failures > 0) {
  console.error(`${failures} check(s) failed`);
  process.exit(1);
}
console.log("all checks passed");
