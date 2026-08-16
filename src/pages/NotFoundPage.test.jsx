import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderWithProviders } from "../test-utils";
import NotFoundPage from "./NotFoundPage";

describe("NotFoundPage", () => {
  it("offers a way back home", () => {
    renderWithProviders(<NotFoundPage />);

    expect(screen.getByRole("heading", { name: /blank/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /return to the shop/i })).toHaveAttribute(
      "href",
      "/"
    );
  });
});
