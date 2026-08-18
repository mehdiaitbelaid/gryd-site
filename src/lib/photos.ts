import type { Photo } from "./types";

/* Intrinsic dimensions are recorded here so next/image can reserve layout space.
   Every cover crops through object-fit, so these are the source sizes, not the
   rendered ones. Files live in public/img and move to Sanity assets on go live. */

const p = (src: string, width: number, height: number) => (alt: string): Photo => ({
  src: `/img/${src}`,
  alt,
  width,
  height,
});

export const photos = {
  lfmAerial: p("lfm-aerial.jpg", 1800, 1012),
  lfmVillage: p("lfm-village.jpg", 1800, 1012),
  siteAerial: p("new-build-site-aerial.jpg", 923, 1400),
  panelInstall: p("panel-install.jpg", 924, 1400),
  singleHome: p("single-home-elevated.jpg", 1600, 900),
  family: p("solar-home-family.jpg", 923, 1400),
  streetDusk: p("street-dusk.jpg", 1600, 893),
  streetPanels: p("street-panels.jpg", 1600, 893),
  batteryInstall: p("battery-install.jpg", 1600, 893),
};

export const grydMarkPaper = "/img/gryd-mark-paper.svg";
