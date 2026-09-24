import React from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Minus, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext.jsx";
import { BackHeader } from "../components/Header.jsx";

export default function CartPage() {
  const { cartItems, cartTotal, addToCart, removeFromCart, placeOrder } = useCart();
  const navigate = useNavigate();

  const deliveryFee = cartTotal > 0 && cartTotal < 499 ? 49 : 0;
  const grandTotal = cartTotal + deliveryFee;

  const handleCheckout = () => {
    const order = placeOrder();
    if (order) navigate("/orders");
  };

  return (
    <div className="pb-28 md:pt-12">
      <BackHeader title="Your Cart" subtitle={`${cartItems.length} item type(s)`} />

      <div className="mx-auto max-w-4xl p-4 sm:px-6 lg:px-8">
        {cartItems.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <ShoppingBag size={40} className="mx-auto mb-3 opacity-40" />
            <p className="text-sm">Your cart is empty.</p>
            <button onClick={() => navigate("/")} className="mt-3 text-brand font-semibold text-sm">
              Browse stores
            </button>
          </div>
        ) : (
          <>
            <div className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-50">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3">
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{item.name}</p>
                    <p className="text-xs text-gray-400">
                      {item.merchant} · ₹{item.price} × {item.qty}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 bg-brand text-white rounded-lg px-2 py-1">
                    <button onClick={() => removeFromCart(item.id)}>
                      <Minus size={14} />
                    </button>
                    <span className="text-sm w-4 text-center">{item.qty}</span>
                    <button onClick={() => addToCart(item.id)}>
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl border border-gray-100 mt-4 p-4 space-y-2 text-sm">
              <div className="flex justify-between text-gray-500">
                <span>Item total</span>
                <span>₹{cartTotal}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Delivery fee</span>
                <span>{deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}</span>
              </div>
              <div className="flex justify-between font-bold text-gray-800 border-t border-gray-100 pt-2">
                <span>To pay</span>
                <span>₹{grandTotal}</span>
              </div>
            </div>
          </>
        )}
      </div>

      {cartItems.length > 0 && (
        <button
          onClick={handleCheckout}
          className="fixed bottom-16 md:bottom-6 left-1/2 -translate-x-1/2 max-w-3xl w-[calc(100%-2rem)] bg-brand text-white font-bold py-3 rounded-xl shadow-lg z-30"
        >
          Place Order · ₹{grandTotal}
        </button>
      )}
    </div>
  );
}
