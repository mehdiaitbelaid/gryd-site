import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Flare } from "@/components/Flare";

export const metadata: Metadata = { title: "Request a site assessment" };

/* Placeholder. The assessment request form is a separate workstream and will
   replace this page; the route exists so the nav and every closing panel resolve. */
export default function SiteAssessmentPage() {
  return (
    <div className="g-page">
      <header className="g-mast wrap">
        <span className="eyebrow">Gryd</span>
        <h1>
          <Flare headline={{ text: "Request a site assessment.", flare: "assessment" }} />
        </h1>
        <p className="stand">
          The request form is being built. In the meantime, send the plots to
          hello@gryd.energy and we will come back with system sizing per plot, the effect on EPC and
          the homeowner numbers.
        </p>
      </header>
      <Footer />
    </div>
  );
}
