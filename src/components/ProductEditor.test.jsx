import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { defaultProducts } from "../test-utils";
import ProductEditor from "./ProductEditor";

describe("ProductEditor", () => {
  it("saves price and title updates", async () => {
    const user = userEvent.setup();
    const onUpdate = vi.fn();

    render(
      <ProductEditor
        product={defaultProducts[0]}
        onUpdate={onUpdate}
        onDelete={vi.fn()}
      />
    );

    const price = screen.getByLabelText(/price/i);
    await user.clear(price);
    await user.type(price, "40");
    await user.click(screen.getByRole("button", { name: /save changes/i }));

    expect(onUpdate).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "Kind of Blue",
        price: 40,
      })
    );
    expect(await screen.findByText(/bins are up to date/i)).toBeInTheDocument();
  });

  it("asks for confirmation before deleting", async () => {
    const user = userEvent.setup();
    const onDelete = vi.fn();

    render(
      <ProductEditor
        product={defaultProducts[0]}
        onUpdate={vi.fn()}
        onDelete={onDelete}
      />
    );

    await user.click(screen.getByRole("button", { name: /delete record/i }));
    expect(onDelete).not.toHaveBeenCalled();

    await user.click(screen.getByRole("button", { name: /confirm delete/i }));
    expect(onDelete).toHaveBeenCalled();
  });
});
