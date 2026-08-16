import { createProduct, deleteProduct, updateProduct } from "../api/client";
import { useStore } from "../context/StoreContext";

// Custom hook: wraps CRUD so pages never talk to fetch directly.
export function useProducts() {
  const { products, setProducts, loading, error } = useStore();

  async function addProduct(product) {
    const created = await createProduct(product);
    setProducts((current) => [...current, created]);
    return created;
  }

  async function editProduct(id, updates) {
    const updated = await updateProduct(id, updates);
    setProducts((current) =>
      current.map((product) => (product.id === updated.id ? updated : product))
    );
    return updated;
  }

  async function removeProduct(id) {
    await deleteProduct(id);
    setProducts((current) =>
      current.filter((product) => String(product.id) !== String(id))
    );
  }

  return {
    products,
    loading,
    error,
    addProduct,
    editProduct,
    removeProduct,
  };
}
