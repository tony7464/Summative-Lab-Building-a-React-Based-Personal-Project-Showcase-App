import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import SearchBar from "./SearchBar";

describe("SearchBar", () => {
  it("lets a user type a search query", async () => {
    const user = userEvent.setup();
    const onQueryChange = vi.fn();

    render(<SearchBar query="" onQueryChange={onQueryChange} />);

    await user.type(screen.getByLabelText(/search the vault/i), "miles");

    expect(onQueryChange).toHaveBeenCalled();
  });
});
