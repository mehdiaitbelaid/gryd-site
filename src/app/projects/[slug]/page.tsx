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
import { getProject, getProjects, pickRelated } from "@/lib/content";

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return {};
  return { title: project.headline.text, description: project.heroStanding };
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  const related = pickRelated(await getProjects(), slug);

  return (
    <div className="g-page">
      <div className="wrap">
        <DetailHero
          photo={project.cover.photo}
          title={project.heroTitle}
          standing={project.heroStanding}
        />

        <div className="g-measure">
          <div className="g-title">
            <span className="g-pill">{project.pill}</span>
            <h2>
              <Flare headline={project.headline} />
            </h2>
          </div>

          <div className="g-byline">
            <span className="face" aria-hidden="true">
              {project.author.initials}
            </span>
            <span>
              <span className="who">{project.author.name}</span>
              <br />
              <span className="when">{project.date}</span>
            </span>
          </div>

          <article className="g-body">
            <Body blocks={project.body} />
            <p className="g-return">
              <Link className="btn" href="/projects">
                Back to projects
              </Link>
            </p>
          </article>

          <ShareRow label="Share this case study" />
        </div>

        {related.length > 0 ? (
          <section className="g-more">
            <h3>Keep reading</h3>
            <div className="pair">
              {related.map((r) => (
                <CoverCard
                  key={r.slug}
                  href={`/projects/${r.slug}`}
                  cover={r.cover}
                  pill={r.pill}
                  headline={r.headline}
                  facts={r.facts}
                />
              ))}
            </div>
          </section>
        ) : null}

        <ClosingPanel closing={project.closing} />
      </div>

      <Footer note={`Words by ${project.author.name}, ${project.date}`} />
    </div>
  );
}
