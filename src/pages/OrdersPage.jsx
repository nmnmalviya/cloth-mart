import React from "react";
import { useNavigate } from "react-router-dom";
import { ClipboardList, CheckCircle2 } from "lucide-react";
import { useCart } from "../context/CartContext.jsx";
import { BackHeader } from "../components/Header.jsx";

export default function OrdersPage() {
  const { orders } = useCart();
  const navigate = useNavigate();

  return (
    <div className="pb-24 md:pt-12">
      <BackHeader title="Your Orders" />

      <div className="mx-auto max-w-5xl p-4 sm:px-6 lg:px-8 grid gap-3 md:grid-cols-2">
        {orders.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <ClipboardList size={40} className="mx-auto mb-3 opacity-40" />
            <p className="text-sm">No orders yet.</p>
            <button onClick={() => navigate("/")} className="mt-3 text-brand font-semibold text-sm">
              Start shopping
            </button>
          </div>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="bg-white rounded-xl border border-gray-100 p-4 h-fit">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-gray-800 text-sm">Order #{order.id}</p>
                <span className="flex items-center gap-1 text-emerald-600 text-xs font-semibold">
                  <CheckCircle2 size={13} /> {order.status}
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-0.5">{order.date}</p>
              <div className="mt-2 space-y-1">
                {order.items.map((item) => (
                  <p key={item.id} className="text-xs text-gray-500">
                    {item.qty} × {item.name} <span className="text-gray-300">({item.merchant})</span>
                  </p>
                ))}
              </div>
              <div className="flex justify-between border-t border-gray-50 mt-2 pt-2 text-sm font-bold text-gray-800">
                <span>Total</span>
                <span>₹{order.total}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
