export function Footer({ note }: { note?: string }) {
  return (
    <footer className="foot">
      <div className="wrap">
        <span>Gryd Energy Ltd, 15092056</span>
        <span>{note ?? "Fully funded solar and storage for new build homes"}</span>
      </div>
    </footer>
  );
}
