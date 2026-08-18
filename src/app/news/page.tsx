import type { Metadata } from "next";
import Link from "next/link";
import { ClosingPanel } from "@/components/ClosingPanel";
import { Flare } from "@/components/Flare";
import { Footer } from "@/components/Footer";
import { Pager } from "@/components/Pager";
import { getNews } from "@/lib/content";
import type { NewsItem } from "@/lib/types";

export const metadata: Metadata = {
  title: "News",
  description:
    "Press coverage, broadcast appearances and the policy moments that shape rooftop solar on new build homes.",
};

const closing = {
  headline: { text: "Writing about funded solar? Talk to our press desk.", flare: "press" },
  body: "We publish our own data on rooftop solar uptake, council deployment and new build compliance, and we can put you in front of the people who run the sites.",
  ctaLabel: "press@gryd.energy",
  ctaHref: "mailto:press@gryd.energy",
  alt: [
    { label: "Read the Knowledge Hub", href: "/blog" },
    { label: "see published projects", href: "/projects" },
  ],
};

function Row({ item }: { item: NewsItem }) {
  const inner = (
    <>
      <span className="when">{item.date}</span>
      <span className="outlet">{item.outlet}</span>
      <span className="body">
        <span className="head">{item.headline}</span>
        <span className="line">{item.summary}</span>
      </span>
      <span className={item.own ? "ext own" : "ext"}>
        {item.action}
        {item.own ? null : <span aria-hidden="true"> &#8599;</span>}
      </span>
    </>
  );

  if (item.own) {
    return (
      <Link className="n-row" href={item.href}>
        {inner}
      </Link>
    );
  }

  return (
    <a className="n-row" href={item.href} target="_blank" rel="noopener">
      {inner}
    </a>
  );
}

export default async function NewsPage() {
  const news = await getNews();
  const years = [...new Set(news.map((n) => n.year))];

  return (
    <div className="g-page">
      <header className="g-mast wrap">
        <span className="eyebrow">Gryd hub</span>
        <h1>
          <Flare headline={{ text: "Gryd in the news.", flare: "news" }} />
        </h1>
        <p className="stand">
          Press coverage, broadcast appearances and the policy moments that shape rooftop solar on
          new build homes. Newest first, and most of these links leave the site.
        </p>
      </header>

      <main className="wrap">
        <div className="n-list">
          {years.map((year) => (
            <div key={year}>
              <h2 className="n-year">{year}</h2>
              {news
                .filter((n) => n.year === year)
                .map((item) => (
                  <Row key={item.id} item={item} />
                ))}
            </div>
          ))}
        </div>

        <Pager />
        <ClosingPanel closing={closing} />
      </main>

      <Footer />
    </div>
  );
}
