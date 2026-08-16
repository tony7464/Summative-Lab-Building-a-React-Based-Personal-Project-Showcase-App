import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <article className="card">
      <img src={product.image} alt={`${product.name} sleeve`} />
      <div className="card__body">
        <p className="eyebrow">{product.genre}</p>
        <h3>{product.name}</h3>
        <p className="card__artist">{product.artist}</p>
        <p className="card__price">${Number(product.price).toFixed(2)}</p>
        <Link className="button button--ghost" to={`/products/${product.id}`}>
          View record
        </Link>
      </div>
    </article>
  );
}

export default ProductCard;
