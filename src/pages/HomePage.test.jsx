import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderWithProviders } from "../test-utils";
import HomePage from "./HomePage";

describe("HomePage", () => {
  it("describes the shop and shows featured records", () => {
    renderWithProviders(<HomePage />);

    expect(screen.getByRole("heading", { name: "The Groove Vault" })).toBeInTheDocument();
    expect(screen.getByText(/neighborhood record shop/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Kind of Blue" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /browse inventory/i })).toHaveAttribute(
      "href",
      "/products"
    );
  });

  it("shows a loading message while data is fetched", () => {
    renderWithProviders(<HomePage />, { loading: true });
    expect(screen.getByText(/cueing up the shop/i)).toBeInTheDocument();
  });
});
