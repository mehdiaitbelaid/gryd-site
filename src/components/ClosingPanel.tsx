import Link from "next/link";
import { Flare } from "./Flare";
import type { Closing } from "@/lib/types";

export function ClosingPanel({ closing }: { closing: Closing }) {
  return (
    <section className="g-close">
      <h2>
        <Flare headline={closing.headline} />
      </h2>
      <p>{closing.body}</p>
      <Link className="btn" href={closing.ctaHref}>
        {closing.ctaLabel}
      </Link>
      <p className="alt">
        {closing.alt.map((a, i) => (
          <span key={a.href}>
            {i > 0 ? " or " : null}
            <Link href={a.href}>{a.label}</Link>
          </span>
        ))}
      </p>
    </section>
  );
}
