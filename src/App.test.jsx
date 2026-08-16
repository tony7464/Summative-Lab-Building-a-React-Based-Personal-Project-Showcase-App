import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import App from "./App";
import { renderWithProviders } from "./test-utils";

describe("App routing", () => {
  it("lands on the home page", () => {
    renderWithProviders(<App />);
    expect(screen.getByRole("heading", { name: "The Groove Vault" })).toBeInTheDocument();
  });

  it("navigates to records, add record, and home", async () => {
    const user = userEvent.setup();
    renderWithProviders(<App />);

    await user.click(screen.getByRole("link", { name: "Records" }));
    expect(screen.getByRole("heading", { name: /every record/i })).toBeInTheDocument();

    await user.click(screen.getByRole("link", { name: "Add Record" }));
    expect(screen.getByRole("heading", { name: /add a record/i })).toBeInTheDocument();

    await user.click(screen.getByRole("link", { name: "Home" }));
    expect(screen.getByRole("heading", { name: "The Groove Vault" })).toBeInTheDocument();
  });

  it("shows the 404 page for unknown routes", () => {
    renderWithProviders(<App />, { route: "/missing" });
    expect(screen.getByRole("heading", { name: /blank/i })).toBeInTheDocument();
  });
});
