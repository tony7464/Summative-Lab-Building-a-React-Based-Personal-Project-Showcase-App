import ProductCard from "./ProductCard";

function ProductList({ products }) {
  if (products.length === 0) {
    return <p className="empty">No records match that search. Try another groove.</p>;
  }

  return (
    <section className="grid" aria-label="Record inventory">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  );
}

export default ProductList;
