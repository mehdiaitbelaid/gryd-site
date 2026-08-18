/** Single page of results for now. The control stays so the rhythm of the page
    is right when the listings outgrow one page. */
export function Pager() {
  return (
    <nav className="g-pager" aria-label="Pagination">
      <span className="step" aria-hidden="true">
        &#8249;
      </span>
      <span className="now" aria-current="page">
        1
      </span>
      <span className="step" aria-hidden="true">
        &#8250;
      </span>
    </nav>
  );
}
