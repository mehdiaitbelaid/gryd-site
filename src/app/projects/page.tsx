import type { Metadata } from "next";
import { ClosingPanel } from "@/components/ClosingPanel";
import { CoverCard } from "@/components/CoverCard";
import { Flare } from "@/components/Flare";
import { Footer } from "@/components/Footer";
import { Pager } from "@/components/Pager";
import { getProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Every site Gryd has funded, from viability assessment through to the bills people actually pay.",
};

const closing = {
  headline: { text: "Tell us about the site and we will model the numbers.", flare: "numbers" },
  body: "A site assessment gives you system sizing per plot, the effect on EPC, and what the homeowner pays, before you commit to anything.",
  ctaLabel: "Request a site assessment",
  ctaHref: "/site-assessment",
  alt: [
    { label: "Read the Knowledge Hub", href: "/blog" },
    { label: "read the latest news", href: "/news" },
  ],
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="g-page">
      <header className="g-mast wrap">
        <span className="eyebrow">Gryd hub</span>
        <h1>
          <Flare headline={{ text: "Projects, with the numbers published.", flare: "numbers" }} />
        </h1>
        <p className="stand">
          Every site Gryd has funded, from viability assessment through to the bills people actually
          pay.
        </p>
      </header>

      <main className="wrap">
        <div className="g-grid">
          {projects.map((p, i) => (
            <CoverCard
              key={p.slug}
              href={`/projects/${p.slug}`}
              cover={p.cover}
              pill={p.pill}
              headline={p.headline}
              facts={p.facts}
              featured={i === 0}
              priority={i === 0}
            />
          ))}
        </div>

        <Pager />
        <ClosingPanel closing={closing} />
      </main>

      <Footer />
    </div>
  );
}
