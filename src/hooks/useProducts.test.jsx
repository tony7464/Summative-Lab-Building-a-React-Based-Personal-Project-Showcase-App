import { act, renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { StoreContext } from "../context/StoreContext";
import { defaultProducts, defaultStore } from "../test-utils";
import { useProducts } from "./useProducts";

vi.mock("../api/client", () => ({
  createProduct: vi.fn(),
  updateProduct: vi.fn(),
  deleteProduct: vi.fn(),
}));

import { createProduct, deleteProduct, updateProduct } from "../api/client";

function wrapper({ children }) {
  const setProducts = vi.fn();
  return (
    <StoreContext.Provider
      value={{
        store: defaultStore,
        products: defaultProducts,
        setProducts,
        loading: false,
        error: null,
        loadData: vi.fn(),
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

describe("useProducts", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("creates a product with POST", async () => {
    createProduct.mockResolvedValue({ id: 9, name: "Dummy" });
    const { result } = renderHook(() => useProducts(), { wrapper });

    await act(async () => {
      await result.current.addProduct({ name: "Dummy", price: 20 });
    });

    expect(createProduct).toHaveBeenCalledWith({ name: "Dummy", price: 20 });
  });

  it("updates a product with PATCH", async () => {
    updateProduct.mockResolvedValue({ id: 1, price: 44 });
    const { result } = renderHook(() => useProducts(), { wrapper });

    await act(async () => {
      await result.current.editProduct(1, { price: 44 });
    });

    expect(updateProduct).toHaveBeenCalledWith(1, { price: 44 });
  });

  it("deletes a product", async () => {
    deleteProduct.mockResolvedValue(null);
    const { result } = renderHook(() => useProducts(), { wrapper });

    await act(async () => {
      await result.current.removeProduct(1);
    });

    await waitFor(() => {
      expect(deleteProduct).toHaveBeenCalledWith(1);
    });
  });
});
