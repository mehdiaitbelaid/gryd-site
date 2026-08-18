import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Body } from "@/components/Body";
import { ClosingPanel } from "@/components/ClosingPanel";
import { CoverCard } from "@/components/CoverCard";
import { DetailHero } from "@/components/DetailHero";
import { Flare } from "@/components/Flare";
import { Footer } from "@/components/Footer";
import { ShareRow } from "@/components/ShareRow";
import { getPost, getPosts, pickRelated } from "@/lib/content";

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return { title: post.headline.text, description: post.metaDescription ?? post.dek };
}

export default async function ArticlePage({ params }: Params) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const related = pickRelated(await getPosts(), slug);

  return (
    <div className="g-page">
      <div className="wrap">
        <DetailHero photo={post.cover.photo} title={post.heroTitle} standing={post.heroStanding} />

        <div className="g-measure">
          <div className="g-title">
            <span className="g-pill">{post.category.title}</span>
            <h2>
              <Flare headline={post.headline} />
            </h2>
          </div>

          <div className="g-byline">
            <span className="face" aria-hidden="true">
              {post.author.initials}
            </span>
            <span>
              <span className="who">{post.author.name}</span>
              <br />
              <span className="when">
                {post.readingTime ? `${post.date}, ${post.readingTime}` : post.date}
              </span>
            </span>
          </div>

          <article className="g-body">
            <Body blocks={post.body} />
            <p className="g-return">
              <Link className="btn ghost" href="/blog">
                Back to the Knowledge Hub
              </Link>
            </p>
          </article>

          <ShareRow label="Share this article" />
        </div>

        {related.length > 0 ? (
          <section className="g-more">
            <h3>Keep reading</h3>
            <div className="pair">
              {related.map((r) => (
                <CoverCard
                  key={r.slug}
                  href={`/blog/${r.slug}`}
                  cover={r.cover}
                  pill={r.category.title}
                  headline={r.headline}
                  facts={[r.author.name, r.date]}
                />
              ))}
            </div>
          </section>
        ) : null}

        <ClosingPanel closing={post.closing} />
      </div>

      <Footer note={`Words by ${post.author.name}, ${post.date}`} />
    </div>
  );
}
