import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <header className="nav">
      <NavLink to="/" className="nav__brand">
        <span className="nav__mark" aria-hidden="true" />
        The Groove Vault
      </NavLink>
      <nav className="nav__links" aria-label="Main">
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/products" end>
          Records
        </NavLink>
        <NavLink to="/products/new">Add Record</NavLink>
      </nav>
    </header>
  );
}

export default NavBar;
