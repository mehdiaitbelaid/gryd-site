import type { Metadata } from "next";
import { BlogGrid } from "@/components/BlogGrid";
import { ClosingPanel } from "@/components/ClosingPanel";
import { Flare } from "@/components/Flare";
import { Footer } from "@/components/Footer";
import { Pager } from "@/components/Pager";
import { getCategories, getPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Knowledge Hub",
  description:
    "The rules, the hardware and the Gryd proposition for solar and storage on new build homes, in plain terms.",
};

const closing = {
  headline: { text: "Read enough. Now put it against your own site.", flare: "site" },
  body: "A site assessment gives you system sizing per plot, the effect on EPC, and what the homeowner pays, before you commit to anything.",
  ctaLabel: "Request a site assessment",
  ctaHref: "/site-assessment",
  alt: [
    { label: "See published projects", href: "/projects" },
    { label: "read the latest news", href: "/news" },
  ],
};

export default async function BlogPage() {
  const [posts, categories] = await Promise.all([getPosts(), getCategories()]);

  return (
    <div className="g-page">
      <header className="g-mast wrap">
        <span className="eyebrow">Knowledge Hub</span>
        <h1>
          <Flare
            headline={{ text: "Solar, batteries and the homes they power.", flare: "power" }}
          />
        </h1>
        <p className="stand">
          Whether you are a developer weighing up renewable options or a buyer curious about living
          with solar, we break down the rules, the hardware and the Gryd proposition in plain terms.
        </p>
      </header>

      <main className="wrap">
        <BlogGrid posts={posts} categories={categories} />
        <Pager />
        <ClosingPanel closing={closing} />
      </main>

      <Footer />
    </div>
  );
}
