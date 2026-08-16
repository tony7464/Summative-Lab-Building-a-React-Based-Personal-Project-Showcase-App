import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Route, Routes } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { renderWithProviders } from "../test-utils";
import ProductDetailPage from "./ProductDetailPage";

vi.mock("../api/client", () => ({
  createProduct: vi.fn(),
  updateProduct: vi.fn(),
  deleteProduct: vi.fn(),
  getProducts: vi.fn(),
  getStoreInfo: vi.fn(),
}));

import { deleteProduct, updateProduct } from "../api/client";

function renderDetail() {
  return renderWithProviders(
    <Routes>
      <Route path="/products/:id" element={<ProductDetailPage />} />
      <Route path="/products" element={<p>Back in the bins</p>} />
    </Routes>,
    { route: "/products/1" }
  );
}

describe("ProductDetailPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows one product from the inventory", () => {
    renderDetail();

    expect(screen.getByRole("heading", { name: "Kind of Blue" })).toBeInTheDocument();
    expect(screen.getByText("Miles Davis")).toBeInTheDocument();
    expect(screen.getByText(/\$32.00/)).toBeInTheDocument();
  });

  it("patches the product when an admin saves edits", async () => {
    const user = userEvent.setup();
    updateProduct.mockResolvedValue({
      id: 1,
      name: "Kind of Blue",
      price: 41,
    });

    renderDetail();

    const price = screen.getByLabelText(/price/i);
    await user.clear(price);
    await user.type(price, "41");
    await user.click(screen.getByRole("button", { name: /save changes/i }));

    expect(updateProduct).toHaveBeenCalledWith(1, expect.objectContaining({ price: 41 }));
  });

  it("deletes the product and returns to inventory", async () => {
    const user = userEvent.setup();
    deleteProduct.mockResolvedValue(null);

    renderDetail();

    await user.click(screen.getByRole("button", { name: /delete record/i }));
    await user.click(screen.getByRole("button", { name: /confirm delete/i }));

    expect(deleteProduct).toHaveBeenCalledWith(1);
    expect(await screen.findByText("Back in the bins")).toBeInTheDocument();
  });
});
