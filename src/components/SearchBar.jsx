import { useEffect, useId, useRef } from "react";

function SearchBar({ query, onQueryChange }) {
  const inputId = useId();
  const inputRef = useRef(null);

  // useRef + useEffect: drop the cursor in search as soon as the page opens.
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="search-bar">
      <label htmlFor={inputId}>Search the vault</label>
      <input
        id={inputId}
        ref={inputRef}
        type="search"
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        placeholder="Try Miles, soul, or Kind of Blue..."
      />
    </div>
  );
}

export default SearchBar;
