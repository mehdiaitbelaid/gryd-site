import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Flare } from "@/components/Flare";

export const metadata: Metadata = { title: "Future Homes Standard" };

/* Placeholder. The Future Homes Standard hub is a separate workstream; the route
   exists so the nav pill resolves. */
export default function FhsPage() {
  return (
    <div className="g-page">
      <header className="g-mast wrap">
        <span className="eyebrow">Gryd</span>
        <h1>
          <Flare headline={{ text: "The Future Homes Standard.", flare: "Standard" }} />
        </h1>
        <p className="stand">
          This section is being built. The confirmed timeline, the solar sizing formula and what the
          standard asks of housebuilders are covered in the{" "}
          <Link href="/blog">Knowledge Hub</Link>.
        </p>
      </header>
      <Footer />
    </div>
  );
}
