import { useEffect, useState, useContext } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import useFetch from "../utils/useFetch.jsx";
import { WishlistContext } from "../utils/WishlistContext.jsx";
import { CartContext } from "../utils/CartContext.jsx";

const ProductListing = () => {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  // 🔥 NEW: category filter state (default from URL)
  const [selectedCategories, setSelectedCategories] = useState(
    category ? [category] : [],
  );

  useEffect(() => {
    setSelectedCategories(category ? [category] : []);
  }, [category]);

  const [rating, setRating] = useState(0);
  const [sortOrder, setSortOrder] = useState("");

  const { addToWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);

  // 🔥 IMPORTANT: fetch ALL products
  const { data, loading, error } = useFetch(
    "https://backend-products-ecru.vercel.app/products",
  );

  if (loading) {
    return <p className="text-center my-4">Loading products...</p>;
  }

  if (error) {
    return (
      <p className="text-danger text-center my-4">Error: {error.message}</p>
    );
  }

  if (!data || data.length === 0) {
    return <p className="text-center my-4">No products found.</p>;
  }

  let filteredProducts = [...data];

  // 🔍 Search filter
  if (searchQuery) {
    filteredProducts = filteredProducts.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }

  // ⭐ Rating filter
  if (rating > 0) {
    filteredProducts = filteredProducts.filter(
      (product) => product.rating >= rating,
    );
  }

  // 🏷️ Category filter (MULTI SELECT)
  if (selectedCategories.length > 0) {
    filteredProducts = filteredProducts.filter((product) =>
      selectedCategories.includes(product.category),
    );
  }

  // 💰 Sorting
  if (sortOrder === "lowToHigh") {
    filteredProducts.sort((a, b) => a.price - b.price);
  }

  if (sortOrder === "highToLow") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  // ❌ No results
  if (filteredProducts.length === 0) {
    return (
      <div className="container my-5 text-center">
        <h4>
          No products were found
          {searchQuery && ` for "${searchQuery}"`}
        </h4>
        <h5>Try different filters</h5>
      </div>
    );
  }

  // 🔁 Toggle category
  const handleCategoryChange = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat],
    );
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4">Products</h2>

      <div className="row">
        {/* LEFT - PRODUCTS */}
        <div className="col-md-9">
          <div className="row">
            {filteredProducts.map((product) => (
              <div key={product._id} className="col-md-4 mb-3">
                <div className="card h-100">
                  <Link to={`/product/${product._id}`}>
                    <img
                      src={product.imgURL}
                      className="card-img-top"
                      alt={product.name}
                      style={{ height: "250px", objectFit: "cover" }}
                    />
                  </Link>

                  <div className="card-body">
                    <Link
                      to={`/product/${product._id}`}
                      className="text-decoration-none text-dark"
                    >
                      <h5>{product.name}</h5>
                    </Link>

                    <p>₹{product.price}</p>
                    <p>⭐ {product.rating}</p>

                    <Link to={`/product/${product._id}`}>
                      <button className="btn btn-primary me-2">
                        Add to Cart
                      </button>
                    </Link>

                    <button
                      className="btn btn-outline-secondary"
                      onClick={() => addToWishlist(product)}
                    >
                      Wishlist
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT - FILTERS */}
        <div className="col-md-3">
          <div
            className="card p-3"
            style={{ position: "sticky", top: "100px" }}
          >
            <h5>Filters</h5>

            {/* 🏷️ Category Filter */}
            <div className="mt-3">
              <h6>Category</h6>

              {["men", "women", "kids"].map((cat) => (
                <div key={cat}>
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat)}
                    onChange={() => handleCategoryChange(cat)}
                  />
                  <label className="ms-2 text-capitalize">{cat}</label>
                </div>
              ))}
            </div>

            {/* ⭐ Rating */}
            <div className="mt-3">
              <h6>Rating</h6>
              <input
                type="range"
                min="0"
                max="4.5"
                step="0.5"
                className="form-range"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
              />
              <p>{rating} and above</p>
            </div>

            {/* 💰 Sort */}
            <div className="mt-3">
              <h6>Sort by Price</h6>

              <div>
                <input
                  type="radio"
                  name="priceSort"
                  onChange={() => setSortOrder("lowToHigh")}
                />
                <label className="ms-2">Low to High</label>
              </div>

              <div>
                <input
                  type="radio"
                  name="priceSort"
                  onChange={() => setSortOrder("highToLow")}
                />
                <label className="ms-2">High to Low</label>
              </div>
            </div>

            {/* 🧹 Clear */}
            <button
              className="btn btn-secondary w-100 mt-3"
              onClick={() => {
                setRating(0);
                setSortOrder("");
                setSelectedCategories(category ? [category] : []);
              }}
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListing;
