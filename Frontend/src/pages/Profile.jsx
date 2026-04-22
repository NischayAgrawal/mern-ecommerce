import { useContext, useState } from "react";
import { AddressContext } from "../utils/AddressContext";
import { OrderContext } from "../utils/OrderContext";

function Profile() {
  const { orders } = useContext(OrderContext);

  const {
    addresses,
    addAddress,
    removeAddress,
    updateAddress,
    selectedAddress,
    setSelectedAddress,
  } = useContext(AddressContext);

  const [form, setForm] = useState({
    name: "",
    city: "",
    pincode: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});
  const [editingId, setEditingId] = useState(null);

  // 🔍 VALIDATION
  const validate = () => {
    let newErrors = {};

    if (!/^[A-Za-z\s]{3,}$/.test(form.name.trim())) {
      newErrors.name = "Name must contain only letters (min 3 characters)";
    }

    if (!/^[A-Za-z\s.,-]{2,}$/.test(form.city.trim())) {
      newErrors.city =
        "City can contain letters, spaces, '.', '-' and ',' only (min 2 characters)";
    }

    if (!/^\d{6}$/.test(form.pincode)) {
      newErrors.pincode = "Pincode must be 6 digits";
    }

    if (!/^\d{10}$/.test(form.phone)) {
      newErrors.phone = "Phone must be 10 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    if (editingId) {
      updateAddress(editingId, form);
      setEditingId(null);
    } else {
      addAddress(form);
    }

    setForm({ name: "", city: "", pincode: "", phone: "" });
    setErrors({});
  };

  return (
    <div className="container my-4">
      {/* USER INFO */}
      <div className="card p-3 mb-4">
        <h4>User Profile</h4>
        <p>
          <strong>Name:</strong> Nischay
        </p>
        <p>
          <strong>Email:</strong> example@gmail.com
        </p>
        <p>
          <strong>Phone:</strong> 9876543210
        </p>
      </div>

      {/* ADDRESS SECTION */}
      <div className="card p-3 mb-4">
        <h5>Addresses</h5>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="mb-3">
          <input
            placeholder="Name"
            className="form-control mb-1"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          {errors.name && <p className="text-danger">{errors.name}</p>}

          <input
            placeholder="City"
            className="form-control mb-1"
            value={form.city}
            onChange={(e) => {
              const value = e.target.value;

              if (/^[A-Za-z\s.,-]*$/.test(value)) {
                setForm({ ...form, city: value });
              }
            }}
          />

          <input
            placeholder="Pincode"
            className="form-control mb-1"
            value={form.pincode}
            onChange={(e) => setForm({ ...form, pincode: e.target.value })}
          />
          {errors.pincode && <p className="text-danger">{errors.pincode}</p>}

          <input
            placeholder="Phone"
            className="form-control mb-1"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
          {errors.phone && <p className="text-danger">{errors.phone}</p>}

          <button className="btn btn-primary mt-2">
            {editingId ? "Update Address" : "Add Address"}
          </button>
        </form>

        {/* ADDRESS LIST */}
        {addresses.map((addr) => (
          <div key={addr.id} className="border p-3 mb-3">
            <h6>{addr.name}</h6>
            <p>
              {addr.city}, {addr.pincode}
            </p>
            <p>Ph: {addr.phone}</p>

            <button
              className="btn btn-success me-2"
              onClick={() => setSelectedAddress(addr)}
            >
              Select
            </button>

            <button
              className="btn btn-warning me-2"
              onClick={() => {
                setForm({
                  name: addr.name,
                  city: addr.city,
                  pincode: addr.pincode,
                  phone: addr.phone,
                });
                setEditingId(addr.id);
              }}
            >
              Edit
            </button>

            <button
              className="btn btn-danger"
              onClick={() => removeAddress(addr.id)}
            >
              Delete
            </button>

            {selectedAddress?.id === addr.id && (
              <p className="text-success mt-2">Selected</p>
            )}
          </div>
        ))}
      </div>

      {/* ORDER HISTORY */}
      <div className="card p-3">
        <h5>Order History</h5>

        {orders.length === 0 ? (
          <p>No orders yet.</p>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="border p-3 mb-3">
              <div className="d-flex justify-content-between">
                <h6>Order ID: {order.id}</h6>

                {/* <button
                  className="btn btn-sm btn-danger"
                  onClick={() => deleteOrder(order.id)}
                >
                  Delete
                </button> */}
              </div>

              <p>
                <strong>Date:</strong> {order.date}
              </p>

              {order.items.map((item) => (
                <p key={item.product._id + item.size}>
                  {item.product.name} (Size {item.size}) × {item.quantity}
                </p>
              ))}

              <p>
                <strong>Total:</strong> ₹{order.total}
              </p>

              <p>
                <strong>Delivered to:</strong>
              </p>
              <p>{order.address.name}</p>
              <p>
                {order.address.city}, {order.address.pincode}
              </p>
              <p>Ph: {order.address.phone}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Profile;
