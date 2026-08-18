import localFont from "next/font/local";
import { DM_Sans } from "next/font/google";

// Borna ships as two woff2 weights only. Both are declared under one family so
// the medium display weight and the regular fallback resolve from the same stack.
export const borna = localFont({
  src: [
    { path: "../fonts/borna-regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/borna-medium.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-borna",
  display: "swap",
});

export const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm",
  display: "swap",
});
