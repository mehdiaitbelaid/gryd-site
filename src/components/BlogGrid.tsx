"use client";

import { useMemo, useState } from "react";
import { CoverCard } from "./CoverCard";
import type { Category, Post } from "@/lib/types";

const ALL = "all";

export function BlogGrid({ posts, categories }: { posts: Post[]; categories: Category[] }) {
  const [active, setActive] = useState(ALL);

  const counts = useMemo(() => {
    const map = new Map<string, number>();
    for (const p of posts) map.set(p.category.slug, (map.get(p.category.slug) ?? 0) + 1);
    return map;
  }, [posts]);

  // Categories with nothing published would give a pill that always empties the grid.
  const shown = categories.filter((c) => (counts.get(c.slug) ?? 0) > 0);

  const visible = active === ALL ? posts : posts.filter((p) => p.category.slug === active);
  const label = categories.find((c) => c.slug === active)?.title ?? "all";

  return (
    <>
      <div className="g-filter" role="group" aria-label="Filter articles by category">
        <button
          type="button"
          className="f-pill"
          data-cat={ALL}
          aria-pressed={active === ALL}
          onClick={() => setActive(ALL)}
        >
          All <span className="c">{posts.length}</span>
        </button>
        {shown.map((c) => (
          <button
            key={c.slug}
            type="button"
            className="f-pill"
            data-cat={c.slug}
            aria-pressed={active === c.slug}
            onClick={() => setActive(c.slug)}
          >
            {c.title} <span className="c">{counts.get(c.slug)}</span>
          </button>
        ))}
      </div>

      <p className="g-count" aria-live="polite">
        {active === ALL
          ? `Showing all ${visible.length} articles`
          : `Showing ${visible.length} ${visible.length === 1 ? "article" : "articles"} in ${label}`}
      </p>

      <div className="g-grid">
        {posts.map((p, i) => (
          <CoverCard
            key={p.slug}
            href={`/blog/${p.slug}`}
            cover={p.cover}
            pill={p.category.title}
            headline={p.headline}
            dek={p.dek}
            facts={[p.author.name, p.date]}
            category={p.category.slug}
            // The lead card only spans two columns unfiltered; a filtered set can be
            // one card wide, where a spanning cell would leave a hole.
            featured={i === 0 && active === ALL}
            priority={i === 0}
            hidden={active !== ALL && p.category.slug !== active}
          />
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="g-empty">Nothing published in this category yet.</p>
      ) : null}
    </>
  );
}
