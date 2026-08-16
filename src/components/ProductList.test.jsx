import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { defaultProducts } from "../test-utils";
import ProductList from "./ProductList";

describe("ProductList", () => {
  it("renders a card for each product", () => {
    render(
      <MemoryRouter>
        <ProductList products={defaultProducts} />
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/record inventory/i)).toBeInTheDocument();
    expect(screen.getAllByRole("article")).toHaveLength(2);
  });

  it("shows an empty state when nothing matches", () => {
    render(
      <MemoryRouter>
        <ProductList products={[]} />
      </MemoryRouter>
    );

    expect(screen.getByText(/no records match/i)).toBeInTheDocument();
  });
});
