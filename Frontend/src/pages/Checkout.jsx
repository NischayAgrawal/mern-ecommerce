import { useContext } from "react";
import { CartContext } from "../utils/CartContext";
import { AddressContext } from "../utils/AddressContext";
import { OrderContext } from "../utils/OrderContext";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const { cart, setCart } = useContext(CartContext);
  const { addresses, selectedAddress, setSelectedAddress } =
    useContext(AddressContext);
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
        <h5>Select Delivery Address</h5>

        {addresses.length === 0 ? (
          <p className="text-danger">
            No address found. Please add one in profile.
          </p>
        ) : (
          addresses.map((addr) => (
            <div
              key={addr.id}
              className={`border p-2 mb-2 ${
                selectedAddress?.id === addr.id ? "border-success" : ""
              }`}
            >
              <p className="mb-1">
                <strong>{addr.name}</strong>
              </p>
              <p className="mb-1">
                {addr.city}, {addr.pincode}
              </p>
              <p className="mb-1">Ph: {addr.phone}</p>

              <button
                className="btn btn-sm btn-outline-primary"
                onClick={() => setSelectedAddress(addr)}
              >
                {selectedAddress?.id === addr.id ? "Selected" : "Select"}
              </button>
            </div>
          ))
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
