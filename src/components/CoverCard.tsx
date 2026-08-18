import Image from "next/image";
import Link from "next/link";
import { grydMarkPaper } from "@/lib/photos";
import type { Cover, Headline } from "@/lib/types";

type Props = {
  href: string;
  cover: Cover;
  pill: string;
  headline: Headline;
  /** Location and plot count on a project, author and date on an article. */
  facts: string[];
  dek?: string;
  featured?: boolean;
  hidden?: boolean;
  category?: string;
  /** The lead card is the largest thing above the fold, so it loads eagerly. */
  priority?: boolean;
};

export function CoverCard({
  href,
  cover,
  pill,
  headline,
  facts,
  dek,
  featured,
  hidden,
  category,
  priority,
}: Props) {
  return (
    <Link
      className={featured ? "g-card feat" : "g-card"}
      href={href}
      hidden={hidden}
      data-cat={category}
    >
      <div className="cover">
        <Image
          src={cover.photo.src}
          alt={cover.photo.alt}
          width={cover.photo.width}
          height={cover.photo.height}
          sizes={featured ? "(max-width: 900px) 100vw, 800px" : "(max-width: 900px) 100vw, 380px"}
          priority={priority}
        />
        <div className="plate">
          <Image className="mark" src={grydMarkPaper} alt="" width={186} height={187} />
          <span className="over">{cover.overline}</span>
          <span className="sub">{cover.sub}</span>
        </div>
      </div>
      <span className="g-pill">{pill}</span>
      <h2>{headline.text}</h2>
      {dek ? <p className="dek">{dek}</p> : null}
      <p className="facts">
        {facts.map((f) => (
          <span key={f}>{f}</span>
        ))}
      </p>
    </Link>
  );
}
