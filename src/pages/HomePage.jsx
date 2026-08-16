import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import StoreHero from "../components/StoreHero";
import { useStore } from "../context/StoreContext";

function HomePage() {
  const { store, products, loading, error } = useStore();
  const featured = products.slice(0, 3);

  if (loading) {
    return <p className="status">Cueing up the shop...</p>;
  }

  if (error) {
    return <p className="status status--error">{error}</p>;
  }

  return (
    <>
      <StoreHero store={store} />
      <section className="section">
        <div className="section__head">
          <div>
            <p className="eyebrow">Now spinning</p>
            <h2>Featured arrivals</h2>
          </div>
          <div className="button-row">
            <Link className="button" to="/products">
              Browse inventory
            </Link>
            <Link className="button button--ghost" to="/products/new">
              Add a record
            </Link>
          </div>
        </div>
        <div className="grid">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
}

export default HomePage;
