import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import NavBar from "./NavBar";

describe("NavBar", () => {
  it("links to every main route", () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );

    expect(screen.getByRole("link", { name: /the groove vault/i })).toHaveAttribute(
      "href",
      "/"
    );
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "Records" })).toHaveAttribute(
      "href",
      "/products"
    );
    expect(screen.getByRole("link", { name: "Add Record" })).toHaveAttribute(
      "href",
      "/products/new"
    );
  });
});
