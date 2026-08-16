import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { StoreContext } from "./context/StoreContext";

export const defaultStore = {
  id: 1,
  name: "The Groove Vault",
  tagline: "Vinyl for the long play",
  description: "A neighborhood record shop and listening room.",
  phone_number: "555-GROOVE",
  address: "14 Needle Lane, Brooklyn, NY",
  hours: "Tue–Sun, 11am–8pm",
};

export const defaultProducts = [
  {
    id: 1,
    name: "Kind of Blue",
    artist: "Miles Davis",
    description: "Modal jazz landmark.",
    genre: "Jazz",
    year: 1959,
    price: 32,
    origin: "USA",
    image: "https://example.com/blue.jpg",
    inStock: true,
  },
  {
    id: 2,
    name: "Illmatic",
    artist: "Nas",
    description: "East Coast classic.",
    genre: "Hip-Hop",
    year: 1994,
    price: 36,
    origin: "USA",
    image: "https://example.com/ill.jpg",
    inStock: true,
  },
];

export function renderWithProviders(
  ui,
  {
    products = defaultProducts,
    store = defaultStore,
    loading = false,
    error = null,
    route = "/",
  } = {}
) {
  return render(
    <StoreContext.Provider
      value={{
        store,
        products,
        setProducts: vi.fn(),
        loading,
        error,
      }}
    >
      <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
    </StoreContext.Provider>
  );
}
