import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import ProductForm from "./ProductForm";

describe("ProductForm", () => {
  it("asks for required fields before creating a record", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(<ProductForm onSubmit={onSubmit} />);
    await user.click(screen.getByRole("button", { name: /add record/i }));

    expect(screen.getByText(/album title, artist, and price/i)).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("submits a new record", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(<ProductForm onSubmit={onSubmit} />);

    await user.type(screen.getByLabelText(/album title/i), "Dummy");
    await user.type(screen.getByLabelText(/artist/i), "Portishead");
    await user.type(screen.getByLabelText(/price/i), "33");
    await user.click(screen.getByRole("button", { name: /add record/i }));

    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "Dummy",
        artist: "Portishead",
        price: 33,
      })
    );
  });
});
