import ProductList from "../components/ProductList";
import SearchBar from "../components/SearchBar";
import { useProducts } from "../hooks/useProducts";
import { useSearch } from "../hooks/useSearch";

const SEARCH_KEYS = ["name", "artist", "genre", "description"];

function ProductsPage() {
  const { products, loading, error } = useProducts();
  const { query, setQuery, filtered } = useSearch(products, SEARCH_KEYS);

  if (loading) {
    return <p className="status">Pulling records from the bins...</p>;
  }

  if (error) {
    return <p className="status status--error">{error}</p>;
  }

  return (
    <section className="section">
      <div className="section__head">
        <div>
          <p className="eyebrow">Inventory</p>
          <h1>Every record in the vault</h1>
        </div>
        <p className="count">{filtered.length} on the wall</p>
      </div>
      <SearchBar query={query} onQueryChange={setQuery} />
      <ProductList products={filtered} />
    </section>
  );
}

export default ProductsPage;
