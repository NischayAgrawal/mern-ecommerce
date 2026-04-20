import { useContext } from "react";
import { CartContext } from "../utils/CartContext";
import { Link } from "react-router-dom";
import { WishlistContext } from "../utils/WishlistContext";

const Cart = () => {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } =
    useContext(CartContext);
  const { addToWishlist } = useContext(WishlistContext);

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  const totalPrice = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );

  const moveToWishlist = (i) => {
    addToWishlist(i.product);
    removeFromCart(i.product._id, i.size);
  };

  if (!cart || cart.length === 0) {
    return (
      <div className="container mt-5 text-center">
        <h3>Your cart is empty</h3>
        <Link to="/" className="btn btn-primary mt-3">
          Continue Shopping
        </Link>
      </div>
    );
  }
  return (
    <div className="container my-5">
      <h2 className="mb-4">My Cart</h2>

      <div className="row">
        {/* LEFT SIDE = CART ITEMS */}
        <div className="col-md-8">
          {cart.map((item) => (
            <div key={item.product._id + item.size} className="card p-3 mb-3">
              <div className="row">
                <div className="col-md-3">
                  <img
                    src={item.product.imgURL}
                    alt={item.product.name}
                    className="img-fluid"
                    style={{ height: "100px", objectFit: "cover" }}
                  />
                </div>

                <div className="col-md-9">
                  <h5>{item.product.name}</h5>
                  <p>₹{item.product.price}</p>
                  <p>Size: {item.size}</p>

                  {/* Quantity  */}
                  <div className="d-flex align-items-center gap-2">
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() =>
                        decreaseQuantity(item.product._id, item.size)
                      }
                    >
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() =>
                        increaseQuantity(item.product._id, item.size)
                      }
                    >
                      +
                    </button>
                  </div>

                  <button
                    className="btn btn-outline-primary btn-sm mt-2 me-2"
                    onClick={() => moveToWishlist(item)}
                  >
                    Move to Wishlist
                  </button>

                  <button
                    className="btn btn-danger btn-sm mt-2"
                    onClick={() => removeFromCart(item.product._id, item.size)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT SIDE = PRICE DETAILS */}
        <div className="col-md-4">
          <div className="card p-4" style={{ position: "sticky", top: "20px" }}>
            <h4>Price Details</h4>

            <p className="d-flex justify-content-between">
              <span>Total Items</span>
              <span>{totalItems}</span>
            </p>

            <p className="d-flex justify-content-between">
              <span>Total Price</span>
              <span>₹{totalPrice}</span>
            </p>

            <hr />

            <Link to="/checkout">
              <button className="btn btn-success w-100">Checkout</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
