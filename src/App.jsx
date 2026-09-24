import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home.jsx";
import MerchantPage from "./pages/MerchantPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import OrdersPage from "./pages/OrdersPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import BottomNav from "./components/BottomNav.jsx";
import Footer from "./components/Footer.jsx";
import { useCart } from "./context/CartContext.jsx";

export default function App() {
  const { cartCount } = useCart();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/merchant/:id" element={<MerchantPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
      <Footer />
      <BottomNav cartCount={cartCount} />
    </div>
  );
}
