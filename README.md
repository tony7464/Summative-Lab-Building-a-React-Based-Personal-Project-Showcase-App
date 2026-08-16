# The Groove Vault

Administrator portal for a neighborhood vinyl shop. Staff can browse the bins, search arrivals, add a pressing, update price or copy, and pull a record from inventory.

This is the Flatiron summative lab: a React single-page app with hooks, client-side routing, json-server persistence, and a Vitest suite.

## Features

- Landing page that explains the shop
- Inventory page with live search across title, artist, genre, and description
- Add-record form (POST)
- Product detail page with PATCH edits and DELETE
- Four routes plus a 404, with nav links between all of them
- Custom hooks (`useProducts`, `useSearch`) plus `useState`, `useEffect`, `useContext`, `useRef`, `useId`, and `useMemo`
- Responsive layout that stacks on phones

## Setup

You need Node.js 18+ and npm.

```bash
git clone https://github.com/tony7464/Summative-Lab-Building-a-React-Based-Personal-Project-Showcase-App.git
cd Summative-Lab-Building-a-React-Based-Personal-Project-Showcase-App
npm install
```

Start the React app and the json-server API together:

```bash
npm run dev
```

- App: [http://localhost:5173](http://localhost:5173)
- API: [http://localhost:3001](http://localhost:3001)

Or run them apart:

```bash
npm run server
npm run client
```

## Usage

1. Open **Home** to read the shop story and see featured arrivals.
2. Open **Records** and type in the search box. The list updates as you type.
3. Open a record to change the title, description, price, or stock, then save.
4. Use **Add Record** to POST a new pressing. You land on its detail page.
5. Delete a record from the detail page (click delete, then confirm).

## Routes

| Path | Page |
| --- | --- |
| `/` | Landing / shop story |
| `/products` | Inventory + search |
| `/products/new` | Create form |
| `/products/:id` | Detail, edit, delete |
| `*` | Not found |

## Component tree

```
StoreProvider
└── App
    ├── NavBar
    ├── HomePage
    │   ├── StoreHero
    │   └── ProductCard
    ├── ProductsPage
    │   ├── SearchBar
    │   └── ProductList → ProductCard
    ├── NewProductPage → ProductForm
    ├── ProductDetailPage → ProductEditor
    ├── NotFoundPage
    └── Footer
```

`StoreContext` holds shop info and the product list. `useProducts` adds create, update, and delete. `useSearch` filters that list.

## Scripts

```bash
npm run dev        # API + Vite together
npm run test       # Vitest in watch mode
npm run test:run   # one-shot test run
npm run build      # production build
```

## Testing

Every feature has coverage: routing, search, forms, GET/POST/PATCH/DELETE, and both custom hooks.

```bash
npm run test:run
```

## Known limitations

- json-server stores data in `db.json`. Restarting the API keeps edits; resetting the file does not.
- There is no login. Anyone with the app open can edit inventory.
- Sleeve images are remote URLs. A broken URL shows a broken image.
- The API must be running on port 3001 while you use the app in the browser.

## Rubric map

| Criterion | Where it lives |
| --- | --- |
| Standard + custom hooks | `src/hooks`, `src/context`, forms, search |
| CRUD | `src/api/client.js` and product pages |
| 3+ routes with clear nav | `src/App.jsx`, `src/components/NavBar.jsx` |
| Git branches + merged PRs | feature branches merged into `main` |
| Tests for every feature | `src/**/*.test.jsx` |
