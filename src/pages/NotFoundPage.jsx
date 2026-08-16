import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <section className="section">
      <p className="eyebrow">Skip</p>
      <h1>This side of the record is blank</h1>
      <p>That page is not in the catalog.</p>
      <Link className="button" to="/">
        Return to the shop
      </Link>
    </section>
  );
}

export default NotFoundPage;
