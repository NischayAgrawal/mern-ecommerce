import { toast } from "react-toastify";
import { createContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (product, size, quantity) => {
    // quantity = Number(quantity);
    console.log(quantity, typeof quantity);
    const exists = cart.find(
      (x) => x.product._id === product._id && x.size === size,
    );
    if (exists) {
      setCart((prev) =>
        prev.map((i) =>
          i.product._id === product._id && i.size === size
            ? { ...i, quantity: i.quantity + 1 + quantity }
            : i,
        ),
      );
      toast.info("Quantity increased in cart");
    } else {
      setCart((prev) => [...prev, { product, size, quantity }]);
      toast.success("Item added to cart");
    }
  };

  const removeFromCart = (productId, size) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item.product._id === productId && item.size === size),
      ),
    );
    toast.error("Item removed from cart");
  };

  const increaseQuantity = (productId, size) => {
    setCart((prev) =>
      prev.map((item) =>
        item.product._id === productId && item.size === size
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    );
  };

  const decreaseQuantity = (productId, size) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.product._id === productId && item.size === size
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };
  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
