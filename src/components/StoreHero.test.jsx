import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { defaultStore } from "../test-utils";
import StoreHero from "./StoreHero";

describe("StoreHero", () => {
  it("renders the landing page store story", () => {
    render(<StoreHero store={defaultStore} />);

    expect(screen.getByRole("heading", { name: "The Groove Vault" })).toBeInTheDocument();
    expect(screen.getByText("Vinyl for the long play")).toBeInTheDocument();
    expect(screen.getByText(/14 Needle Lane/i)).toBeInTheDocument();
  });
});
