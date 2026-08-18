export function ShareRow({ label }: { label: string }) {
  return (
    <section className="g-share">
      <h3>{label}</h3>
      <div className="row">
        <a href="#" aria-label="Share on LinkedIn">
          in
        </a>
        <a href="#" aria-label="Share on X">
          X
        </a>
        <a href="#" aria-label="Copy link">
          &#128279;
        </a>
      </div>
    </section>
  );
}
