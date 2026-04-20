import { useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import useFetch from "../utils/useFetch.jsx";
import { WishlistContext } from "../utils/WishlistContext.jsx";
import { CartContext } from "../utils/CartContext.jsx";
import { useSearchParams } from "react-router-dom";

const ProductListing = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  const [rating, setRating] = useState(0);
  const [sortOrder, setSortOrder] = useState("");

  const { wishlist, addToWishlist } = useContext(WishlistContext);

  const { cart, addToCart, increaseQuantity, decreaseQuantity } =
    useContext(CartContext);

  const { category } = useParams();
  const { data, loading, error } = useFetch(
    `https://backend-products-ecru.vercel.app/products/${category}`,
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

  if (searchQuery) {
    filteredProducts = filteredProducts.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }

  // Filter by rating
  if (rating > 0) {
    filteredProducts = filteredProducts.filter(
      (product) => product.rating >= rating,
    );
  }

  // Sort by price
  if (sortOrder === "lowToHigh") {
    filteredProducts.sort((a, b) => a.price - b.price);
  }

  if (sortOrder === "highToLow") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  if (filteredProducts.length === 0) {
    return (
      <div className="container my-5 text-center">
        <h4>
          No products were found
          {searchQuery && ` for "${searchQuery}"`}
        </h4>
        <h5>Try different keywords</h5>
      </div>
    );
  }

  // filter by category from the URL
  // const filteredProducts = data.filter(
  //   (product) => product.category === category,
  // );

  return (
    <div className="container my-4">
      <h2 className="mb-4 text-capitalize">{category} Shoes</h2>

      <div className="row">
        {/* LEFT SIDE - PRODUCTS */}
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
                      <h5 className="card-title">{product.name}</h5>
                    </Link>
                    <p className="card-text">₹{product.price}</p>
                    <p className="card-text">⭐ {product.rating}</p>

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

        {/* RIGHT SIDE - FILTERS */}
        <div className="col-md-3">
          <div
            className="card p-3"
            style={{ position: "sticky", top: "100px" }}
          >
            <h5>Filters</h5>

            {/* Rating Filter */}
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
              <p>Rating: {rating} and above</p>
            </div>

            {/* Sort */}
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

            {/* Clear Filters */}
            <button
              className="btn btn-secondary w-100 mt-3"
              onClick={() => {
                setRating(0);
                setSortOrder("");
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
