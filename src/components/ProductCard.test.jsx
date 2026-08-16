import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { defaultProducts } from "../test-utils";
import ProductCard from "./ProductCard";

describe("ProductCard", () => {
  it("shows a record and links to its detail page", () => {
    render(
      <MemoryRouter>
        <ProductCard product={defaultProducts[0]} />
      </MemoryRouter>
    );

    expect(screen.getByRole("heading", { name: "Kind of Blue" })).toBeInTheDocument();
    expect(screen.getByText("Miles Davis")).toBeInTheDocument();
    expect(screen.getByText("$32.00")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /view record/i })).toHaveAttribute(
      "href",
      "/products/1"
    );
  });
});
