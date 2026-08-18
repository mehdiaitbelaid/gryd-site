import type { Headline } from "@/lib/types";

/** Renders a headline with its single Solar Flare word, the only place the accent
    is allowed outside a primary button. */
export function Flare({ headline }: { headline: Headline }) {
  const { text, flare } = headline;
  if (!flare) return <>{text}</>;

  const at = text.indexOf(flare);
  if (at === -1) return <>{text}</>;

  return (
    <>
      {text.slice(0, at)}
      <span className="flare">{flare}</span>
      {text.slice(at + flare.length)}
    </>
  );
}
