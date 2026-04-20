import { useContext } from "react";
import { CartContext } from "../utils/CartContext";
import { AddressContext } from "../utils/AddressContext";
import { OrderContext } from "../utils/OrderContext";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const { cart, setCart } = useContext(CartContext);
  const { selectedAddress } = useContext(AddressContext);
  const { addOrder } = useContext(OrderContext);
  const navigate = useNavigate();

  const totalPrice = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );

  const handlePlaceOrder = () => {
    if (!selectedAddress) {
      alert("Please select an address");
      return;
    }

    addOrder({
      items: cart,
      total: totalPrice,
      address: selectedAddress,
      date: new Date().toLocaleString(),
    });

    setCart([]); // clear cart
    alert("Order Placed Successfully");

    navigate("/profile");
  };

  return (
    <div className="container my-4">
      <h2>Checkout</h2>

      {/* ADDRESS */}
      <div className="card p-3 mb-3">
        <h5>Delivery Address</h5>

        {selectedAddress ? (
          <>
            <p>{selectedAddress.name}</p>
            <p>
              {selectedAddress.city}, {selectedAddress.pincode}
            </p>
            <p>Ph: {selectedAddress.phone}</p>
          </>
        ) : (
          <p className="text-danger">No address selected</p>
        )}
      </div>

      {/* ORDER SUMMARY */}
      <div className="card p-3 mb-3">
        <h5>Order Summary</h5>

        {cart.map((item) => (
          <div key={item.product._id + item.size}>
            <p>
              {item.product.name} (Size {item.size}) × {item.quantity}
            </p>
          </div>
        ))}

        <hr />
        <h5>Total: ₹{totalPrice}</h5>
      </div>

      <button className="btn btn-success" onClick={handlePlaceOrder}>
        Place Order
      </button>
    </div>
  );
}

export default Checkout;
