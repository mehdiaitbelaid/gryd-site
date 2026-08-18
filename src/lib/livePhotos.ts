import type { Photo } from "./types";

/* Featured images pulled from the live gryd.energy WordPress media library,
   keyed by the slug of the post or project they belong to. Projects are keyed
   "project:<slug>". Gryd owns this artwork; stock frames were licensed by Gryd. */

const live =
  (src: string, width: number, height: number) =>
  (alt: string): Photo => ({ src: `/img/live/${src}`, alt, width, height });

export const livePhotos: Record<string, (alt: string) => Photo> = {
  "a-simple-guide-to-solar-leases": live("AdobeStock_1221597677-scaled.jpeg", 2560, 2560),
  "battery-storage-and-grid-constraints": live("AdobeStock_218821142-scaled.jpeg", 2560, 1576),
  "best-roof-types-for-solar": live("iStock-2082363258-reduced-size-scaled.jpeg", 2560, 1452),
  "breaking-the-green-premium": live("Generated-Image-November-06-2025-4_51PM.png", 1263, 768),
  "complete-guide-to-funded-solar": live("Gemini_Generated_Image_hbinirhbinirhbin.png", 1321, 763),
  "council-housing-solar-index-2026": live("Council-Housing-with-Solar2.png", 1436, 1080),
  "do-you-need-a-solar-battery": live("AdobeStock_992033607-scaled.jpeg", 2560, 1440),
  "future-homes-standard-differentiate": live("Gryd-branded-home-image.png", 1200, 1200),
  "future-homes-standard-solar-mandate": live("pexels-bizar-van-jan-92378004-16427010-scaled.jpg", 2560, 1677),
  "future-homes-standard-timeline": live("The-Future-Homes-Standard-has-been-published.-For-house-builders-and-developers-the-most-pressing-question-is-not-what-the-standard-requires.-Its-when-it-actually-applies-to-you.-Here-is-a-pract.png", 1920, 1080),
  "how-much-solar-do-you-need": live("Solar-and-battery-home.png", 1077, 1080),
  "how-solar-helps-meet-epc-targets": live("AdobeStock_719665568-scaled.jpeg", 2560, 1440),
  "integrating-solar-and-heat-pumps": live("AdobeStock_1488763855-scaled.jpeg", 2560, 1396),
  "mandatory-solar-panels-in-new-homes": live("AdobeStock_996868188-scaled.jpeg", 2560, 1438),
  "project:fifty-five-plot-analysis": live("SME-construction-site.png", 1024, 705),
  "project:lower-farm-mews": live("DJI_20260323133306_0469_D.jpg", 2048, 1152),
  "project:st-ives-year-of-data": live("3200EB41-4305-4851-B1EB-A6324DA7AE10_1_201_a-1-scaled.jpeg", 2560, 1920),
  "rising-energy-demand-bigger-systems": live("Blog-Graphics-4.png", 1920, 1080),
  "sap-scores-versus-real-energy-use": live("Newbuild-home-with-EPC-overlay.png", 1920, 1045),
  "solar-and-affordable-housing": live("pexels-kindelmedia-9875681-scaled.jpg", 2560, 1920),
  "solar-maintenance-and-replacement-costs": live("iStock-499203797-scaled.jpg", 2560, 1707),
  "solar-providers-compared": live("Blog-Graphic-Gryd-Logo-on-Gradient-Background.png", 1500, 1000),
  "what-is-gryd": live("rooftop-with-solar-panels.png", 532, 541),
  "why-solar-farms-keep-getting-rejected": live("Gryd-branded-photo-1.png", 1920, 1080),
};
