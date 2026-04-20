import { useState, useContext } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { CartContext } from "../utils/CartContext";

export default function Navbar() {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { cart } = useContext(CartContext);

  const cartCount = cart.reduce((total, i) => total + i.quantity, 0);

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid container">
        {/* LOGO */}
        <Link className="navbar-brand" to="/">
          SoleMate
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          {/* LEFT SIDE NAV */}
          <div className="navbar-nav me-auto">
            <Link className="nav-link" to="/products/men">
              Men
            </Link>
            <Link className="nav-link" to="/products/women">
              Women
            </Link>
            <Link className="nav-link" to="/products/kids">
              Kids
            </Link>
            <Link className="nav-link" to="/wishlist">
              Wishlist
            </Link>
            <Link className="nav-link" to="/cart">
              Cart ({cartCount})
            </Link>
          </div>

          {/* RIGHT SIDE (SEARCH + PROFILE) */}
          <div className="d-flex align-items-center gap-3">
            {/* SEARCH */}
            <form
              className="d-flex"
              onSubmit={(e) => {
                e.preventDefault();
                const category = location.pathname.split("/")[2];
                navigate(`/products/${category}?search=${searchText}`);
              }}
            >
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>

            {/* PROFILE ICON */}
            <Link to="/profile" style={{ textDecoration: "none" }}>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  backgroundColor: "#6c757d",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                N
              </div>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
