import { useNavigate } from "react-router-dom";
import ProductForm from "../components/ProductForm";
import { useProducts } from "../hooks/useProducts";

function NewProductPage() {
  const navigate = useNavigate();
  const { addProduct } = useProducts();

  async function handleCreate(product) {
    const created = await addProduct(product);
    navigate(`/products/${created.id}`);
  }

  return (
    <section className="section section--narrow">
      <p className="eyebrow">New arrival</p>
      <h1>Add a record to the vault</h1>
      <p>Fill in the sleeve details. Price and title keep the bins searchable.</p>
      <ProductForm onSubmit={handleCreate} />
    </section>
  );
}

export default NewProductPage;
