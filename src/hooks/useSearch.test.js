import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { defaultProducts } from "../test-utils";
import { useSearch } from "./useSearch";

describe("useSearch", () => {
  it("returns every item when the query is empty", () => {
    const { result } = renderHook(() =>
      useSearch(defaultProducts, ["name", "artist", "genre"])
    );

    expect(result.current.filtered).toHaveLength(2);
  });

  it("filters records as the query changes", () => {
    const { result } = renderHook(() =>
      useSearch(defaultProducts, ["name", "artist", "genre"])
    );

    act(() => {
      result.current.setQuery("nas");
    });

    expect(result.current.filtered).toHaveLength(1);
    expect(result.current.filtered[0].name).toBe("Illmatic");
  });
});
