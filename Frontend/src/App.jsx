import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { WishlistProvider } from "./utils/WishlistContext";
import { CartProvider } from "./utils/CartContext";
import { AddressProvider } from "./utils/AddressContext";
import { OrderProvider } from "./utils/OrderContext";
import Home from "./pages/Home";
import ProductListing from "./pages/ProductListing";
import ProductDetail from "./pages/ProductDetail";
import Navbar from "./components/Navbar";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Checkout from "./pages/Checkout";

function AppInner() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/" && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:category" element={<ProductListing />} />
        <Route path="/product/:productId" element={<ProductDetail />} />
        <Route path="/wishlist" element={<Wishlist />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/profile" element={<Profile />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <OrderProvider>
        <AddressProvider>
          <WishlistProvider>
            <CartProvider>
              <AppInner />
              <ToastContainer position="top-right" autoClose={2000} />
            </CartProvider>
          </WishlistProvider>
        </AddressProvider>
      </OrderProvider>
    </BrowserRouter>
  );
}
