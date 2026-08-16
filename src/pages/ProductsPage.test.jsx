import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { renderWithProviders } from "../test-utils";
import ProductsPage from "./ProductsPage";

describe("ProductsPage", () => {
  it("reads and displays the inventory", () => {
    renderWithProviders(<ProductsPage />);

    expect(screen.getByRole("heading", { name: /every record/i })).toBeInTheDocument();
    expect(screen.getByText("Kind of Blue")).toBeInTheDocument();
    expect(screen.getByText("Illmatic")).toBeInTheDocument();
  });

  it("filters records as the user types", async () => {
    const user = userEvent.setup();
    renderWithProviders(<ProductsPage />);

    await user.type(screen.getByLabelText(/search the vault/i), "jazz");

    expect(screen.getByText("Kind of Blue")).toBeInTheDocument();
    expect(screen.queryByText("Illmatic")).not.toBeInTheDocument();
  });
});
