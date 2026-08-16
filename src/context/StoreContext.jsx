import { createContext, useContext, useEffect, useState } from "react";
import { getProducts, getStoreInfo } from "../api/client";

// Context lets distant pages share the same product list
// without passing props through every parent.
export const StoreContext = createContext(null);

export function StoreProvider({ children }) {
  const [store, setStore] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function loadData() {
    setLoading(true);
    setError(null);

    try {
      const [storeRows, productRows] = await Promise.all([
        getStoreInfo(),
        getProducts(),
      ]);
      setStore(storeRows[0] ?? null);
      setProducts(productRows);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  const value = {
    store,
    products,
    setProducts,
    loading,
    error,
    loadData,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used inside StoreProvider");
  }
  return context;
}
