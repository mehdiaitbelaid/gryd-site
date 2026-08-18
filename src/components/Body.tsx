import Image from "next/image";
import type { Block } from "@/lib/types";

/** Renders the block list a case study or an article is made of. The figure
    blocks are the only ones allowed to break the 660px reading measure. */
export function Body({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((b, i) => (
        <BlockView key={i} block={b} />
      ))}
    </>
  );
}

function BlockView({ block }: { block: Block }) {
  switch (block._type) {
    case "lead":
      return <p className="lead-in">{block.text}</p>;
    case "para":
      return <p>{block.text}</p>;
    case "h3":
      return <h3>{block.text}</h3>;
    case "h4":
      return <h4>{block.text}</h4>;
    case "bullets":
      return (
        <ul>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <blockquote>
          {block.attribution ? `“${block.text}”` : block.text}
          {block.attribution ? <cite>{block.attribution}</cite> : null}
        </blockquote>
      );
    case "stats":
      return (
        <figure className="g-break">
          <div className="g-numbers">
            {block.stats.map((s) => (
              <div key={s.label}>
                <div className="n">
                  {s.lead}
                  <em>{s.value}</em>
                  {s.trail}
                </div>
                <div className="l">{s.label}</div>
              </div>
            ))}
          </div>
          <figcaption>{block.caption}</figcaption>
        </figure>
      );
    case "gallery":
      return (
        <figure className="g-break">
          <div className="g-figures">
            {block.images.map((img) => (
              <Image
                key={img.src + img.alt}
                src={img.src}
                alt={img.alt}
                width={img.width}
                height={img.height}
                sizes="(max-width: 900px) 100vw, 300px"
              />
            ))}
          </div>
          <figcaption>{block.caption}</figcaption>
        </figure>
      );
    case "figure":
      return (
        <figure className="g-break">
          <Image
            src={block.image.src}
            alt={block.image.alt}
            width={block.image.width}
            height={block.image.height}
            sizes="(max-width: 900px) 100vw, 920px"
          />
          <figcaption>{block.caption}</figcaption>
        </figure>
      );
    case "table":
      return (
        <figure className="g-table">
          <table>
            <thead>
              <tr>
                {block.head.map((h, i) => (
                  <th key={i}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) =>
                    j === 0 ? <th key={j} scope="row">{cell}</th> : <td key={j}>{cell}</td>,
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </figure>
      );
    case "spec":
      return (
        <dl className="g-spec">
          {block.rows.map((r) => (
            <div key={r.term}>
              <dt>{r.term}</dt>
              <dd>{r.detail}</dd>
            </div>
          ))}
        </dl>
      );
  }
}
