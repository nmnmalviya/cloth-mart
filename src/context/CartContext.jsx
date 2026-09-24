import React, { createContext, useContext, useMemo, useState } from "react";
import merchantsData from "../data/merchants.json";

const CartContext = createContext(null);

const allProductsById = (() => {
  const map = {};
  merchantsData.forEach((m) => m.products.forEach((p) => (map[p.id] = { ...p, merchant: m.name, merchantId: m.id })));
  return map;
})();

export function CartProvider({ children }) {
  const [cart, setCart] = useState({}); // productId -> qty
  const [orders, setOrders] = useState([]);

  const addToCart = (id) => setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 }));
  const removeFromCart = (id) =>
    setCart((c) => {
      const next = { ...c };
      if (next[id] > 1) next[id] -= 1;
      else delete next[id];
      return next;
    });

  const cartItems = useMemo(
    () => Object.entries(cart).map(([id, qty]) => ({ ...allProductsById[id], qty })),
    [cart]
  );
  const cartTotal = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);
  const cartCount = cartItems.reduce((sum, i) => sum + i.qty, 0);

  const placeOrder = () => {
    if (cartItems.length === 0) return null;
    const order = {
      id: `ORD${Date.now().toString().slice(-6)}`,
      items: cartItems,
      total: cartTotal,
      date: new Date().toLocaleString(),
      status: "Placed",
    };
    setOrders((o) => [order, ...o]);
    setCart({});
    return order;
  };

  return (
    <CartContext.Provider
      value={{ cart, cartItems, cartTotal, cartCount, addToCart, removeFromCart, orders, placeOrder }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
