import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderWithProviders } from "../test-utils";
import Footer from "./Footer";

describe("Footer", () => {
  it("shows store contact details from context", () => {
    renderWithProviders(<Footer />);
    expect(screen.getByText(/the groove vault/i)).toBeInTheDocument();
    expect(screen.getByText(/555-GROOVE/i)).toBeInTheDocument();
  });
});
