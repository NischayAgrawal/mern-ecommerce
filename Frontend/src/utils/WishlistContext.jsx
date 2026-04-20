import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);

  const addToWishlist = (product) => {
    const exists = wishlist.find((item) => item._id === product._id);
    if (exists) {
      toast.info("Item already in wishlist");
      return;
    }
    setWishlist((prev) => [...prev, product]);
    toast.success("Item added to wishlist");
  };

  const removeFromWishlist = (productId) => {
    setWishlist((prev) => prev.filter((item) => item._id !== productId));
    toast.error("Item removed from wishlist");
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
