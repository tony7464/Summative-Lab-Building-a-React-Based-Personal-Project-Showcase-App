import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Route, Routes } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { renderWithProviders } from "../test-utils";
import NewProductPage from "./NewProductPage";

vi.mock("../api/client", () => ({
  createProduct: vi.fn(),
  updateProduct: vi.fn(),
  deleteProduct: vi.fn(),
  getProducts: vi.fn(),
  getStoreInfo: vi.fn(),
}));

import { createProduct } from "../api/client";

describe("NewProductPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("creates a record and moves to the detail page", async () => {
    const user = userEvent.setup();
    createProduct.mockResolvedValue({
      id: 99,
      name: "Dummy",
      artist: "Portishead",
      price: 33,
    });

    renderWithProviders(
      <Routes>
        <Route path="/products/new" element={<NewProductPage />} />
        <Route path="/products/:id" element={<p>Created product 99</p>} />
      </Routes>,
      { route: "/products/new" }
    );

    await user.type(screen.getByLabelText(/album title/i), "Dummy");
    await user.type(screen.getByLabelText(/artist/i), "Portishead");
    await user.type(screen.getByLabelText(/price/i), "33");
    await user.click(screen.getByRole("button", { name: /add record/i }));

    expect(createProduct).toHaveBeenCalled();
    expect(await screen.findByText("Created product 99")).toBeInTheDocument();
  });
});
