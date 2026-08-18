import type { Metadata } from "next";
import { borna, dmSans } from "@/lib/fonts";
import { Nav } from "@/components/Nav";
import "@/styles/tokens.css";
import "@/styles/hub.css";

export const metadata: Metadata = {
  title: {
    default: "Gryd",
    template: "%s, Gryd",
  },
  description: "Fully funded solar and storage for new build homes.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${borna.variable} ${dmSans.variable}`}>
      <body>
        <Nav />
        {children}
      </body>
    </html>
  );
}
