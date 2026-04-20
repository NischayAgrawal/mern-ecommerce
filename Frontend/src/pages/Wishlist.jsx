import { useContext } from "react";
import { WishlistContext } from "../utils/WishlistContext";
import { Link } from "react-router-dom";
import { CartContext } from "../utils/CartContext";

function Wishlist() {
  const { wishlist, removeFromWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);

  if (!wishlist?.length) {
    return (
      <div className="container mt-5 text-center">
        <h3>Your wishlist is empty</h3>
        <Link to="/" className="btn btn-primary mt-3">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h2>My Wishlist</h2>

      <div className="row">
        {wishlist.map((product) => (
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
                <h5>{product.name}</h5>
                <p>₹{product.price}</p>

                <div className="d-flex gap-2">
                  <Link to={`/product/${product._id}`}>
                    <button className="btn btn-primary">Add to Cart</button>
                  </Link>

                  <button
                    className="btn btn-danger"
                    onClick={() => removeFromWishlist(product._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Wishlist;
