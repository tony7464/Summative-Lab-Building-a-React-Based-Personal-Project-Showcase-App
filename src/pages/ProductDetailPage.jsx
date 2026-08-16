import { Link, useNavigate, useParams } from "react-router-dom";
import ProductEditor from "../components/ProductEditor";
import { useProducts } from "../hooks/useProducts";

function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, loading, error, editProduct, removeProduct } = useProducts();
  const product = products.find((item) => String(item.id) === String(id));

  if (loading) {
    return <p className="status">Sliding this one out of the sleeve...</p>;
  }

  if (error) {
    return <p className="status status--error">{error}</p>;
  }

  if (!product) {
    return (
      <section className="section">
        <h1>That record is not in the vault</h1>
        <Link to="/products">Back to inventory</Link>
      </section>
    );
  }

  async function handleUpdate(updates) {
    await editProduct(product.id, updates);
  }

  async function handleDelete() {
    await removeProduct(product.id);
    navigate("/products");
  }

  return (
    <article className="detail">
      <img src={product.image} alt={`${product.name} sleeve`} />
      <div>
        <p className="eyebrow">{product.genre}</p>
        <h1>{product.name}</h1>
        <p className="detail__artist">{product.artist}</p>
        <p>{product.description}</p>
        <ul className="detail__meta">
          <li>Pressed {product.year}</li>
          <li>Origin: {product.origin}</li>
          <li>${Number(product.price).toFixed(2)}</li>
          <li>{product.inStock ? "In stock" : "Sold out"}</li>
        </ul>
        <Link className="text-link" to="/products">
          Back to inventory
        </Link>
        <ProductEditor
          product={product}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      </div>
    </article>
  );
}

export default ProductDetailPage;
