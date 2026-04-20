import { useParams } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import { WishlistContext } from "../utils/wishlistContext";
import { CartContext } from "../utils/CartContext";
import useFetch from "../utils/useFetch";

function ProductDetail() {
  const { wishlist, addToWishlist, removeFromWishlist } =
    useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);
  const { productId } = useParams();

  const {
    data: product,
    loading,
    error,
  } = useFetch(`http://localhost:3000/product/${productId}`);

  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  if (loading) return <p className="text-center mt-5">Loading...</p>;
  if (error) return <p className="text-danger mt-5">Error: {error.message}</p>;
  if (!product) return <p>No product found.</p>;

  return (
    <div className="container my-5">
      <div className="row">
        {/* LEFT SIDE - IMAGE */}
        <div className="col-md-6">
          <img
            src={product.imgURL}
            alt={product.name}
            className="img-fluid rounded"
            style={{ height: "400px", objectFit: "cover", width: "100%" }}
          />
        </div>

        {/* RIGHT SIDE - DETAILS */}
        <div className="col-md-6">
          <h2>{product.name}</h2>

          <h4 className="text-success mt-2">₹{product.price}</h4>

          <p className="mt-2">⭐ {product.rating}</p>

          <p className="mt-3">{product.description}</p>

          {/* SIZE SELECTION */}
          <div className="mt-4">
            <h6>Select Size:</h6>
            <div className="d-flex gap-2 flex-wrap">
              {product.size.map((size) => (
                <button
                  key={size}
                  className={`btn ${
                    selectedSize === size ? "btn-dark" : "btn-outline-dark"
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* QUANTITY SELECTOR */}
          <div className="mt-4 d-flex align-items-center gap-3">
            <h6 className="mb-0">Quantity:</h6>

            <button
              className="btn btn-outline-secondary"
              onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
            >
              -
            </button>

            <span>{quantity}</span>

            <button
              className="btn btn-outline-secondary"
              onClick={() => setQuantity((prev) => prev + 1)}
            >
              +
            </button>
          </div>

          {/* ACTION BUTTONS */}
          <div className="mt-4">
            <button
              className="btn btn-primary me-3"
              disabled={!selectedSize}
              onClick={() => addToCart(product, selectedSize, quantity)}
            >
              Add to Cart
            </button>

            <button
              className="btn btn-outline-secondary"
              onClick={() => addToWishlist(product)}
            >
              Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
