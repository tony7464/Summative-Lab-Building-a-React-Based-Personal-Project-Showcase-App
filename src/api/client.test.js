import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  API_URL,
  createProduct,
  deleteProduct,
  getProducts,
  getStoreInfo,
  updateProduct,
} from "./client";

describe("api client", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  it("reads store info with GET", async () => {
    fetch.mockResolvedValue({
      ok: true,
      text: async () => JSON.stringify([{ id: 1, name: "The Groove Vault" }]),
    });

    const data = await getStoreInfo();

    expect(fetch).toHaveBeenCalledWith(
      `${API_URL}/store_info`,
      expect.objectContaining({ headers: expect.any(Object) })
    );
    expect(data[0].name).toBe("The Groove Vault");
  });

  it("reads products with GET", async () => {
    fetch.mockResolvedValue({
      ok: true,
      text: async () => JSON.stringify([{ id: 1, name: "Kind of Blue" }]),
    });

    const data = await getProducts();
    expect(data).toHaveLength(1);
  });

  it("creates a product with POST", async () => {
    const payload = { name: "Dummy", price: 20 };
    fetch.mockResolvedValue({
      ok: true,
      text: async () => JSON.stringify({ id: 9, ...payload }),
    });

    const created = await createProduct(payload);

    expect(fetch).toHaveBeenCalledWith(
      `${API_URL}/products`,
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify(payload),
      })
    );
    expect(created.id).toBe(9);
  });

  it("updates a product with PATCH", async () => {
    fetch.mockResolvedValue({
      ok: true,
      text: async () => JSON.stringify({ id: 1, price: 40 }),
    });

    const updated = await updateProduct(1, { price: 40 });

    expect(fetch).toHaveBeenCalledWith(
      `${API_URL}/products/1`,
      expect.objectContaining({
        method: "PATCH",
        body: JSON.stringify({ price: 40 }),
      })
    );
    expect(updated.price).toBe(40);
  });

  it("deletes a product with DELETE", async () => {
    fetch.mockResolvedValue({
      ok: true,
      text: async () => "",
    });

    await deleteProduct(1);

    expect(fetch).toHaveBeenCalledWith(
      `${API_URL}/products/1`,
      expect.objectContaining({ method: "DELETE" })
    );
  });

  it("throws when the server responds with an error", async () => {
    fetch.mockResolvedValue({ ok: false, status: 500, text: async () => "" });
    await expect(getProducts()).rejects.toThrow("Request failed: 500");
  });
});
