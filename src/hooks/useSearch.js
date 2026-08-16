import { useMemo, useState } from "react";

// Custom hook: keeps search text and the filtered list in one place.
export function useSearch(items, keys) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) {
      return items;
    }

    return items.filter((item) =>
      keys.some((key) => String(item[key] ?? "").toLowerCase().includes(needle))
    );
  }, [items, keys, query]);

  return { query, setQuery, filtered };
}
