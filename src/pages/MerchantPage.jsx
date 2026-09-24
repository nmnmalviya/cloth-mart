import React, { useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import merchantsData from "../data/merchants.json";
import { BackHeader } from "../components/Header.jsx";
import ProductCard from "../components/ProductCard.jsx";
import Stars from "../components/Stars.jsx";
import { useCart } from "../context/CartContext.jsx";
import { BadgePercent, Clock, MapPin, ShoppingBag, Star, Truck } from "lucide-react";

export default function MerchantPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const merchant = merchantsData.find((m) => m.id === id);
  const [category, setCategory] = useState("All");
  const { cart, addToCart, removeFromCart, cartCount, cartTotal } = useCart();

  const categories = useMemo(
    () => (merchant ? ["All", ...new Set(merchant.products.map((p) => p.category))] : []),
    [merchant]
  );

  const products = useMemo(
    () => (merchant ? merchant.products.filter((p) => category === "All" || p.category === category) : []),
    [merchant, category]
  );

  if (!merchant) {
    return (
      <div className="p-6 text-center text-gray-400">
        Store not found.
        <button onClick={() => navigate("/")} className="block mx-auto mt-2 text-brand font-semibold">
          Go home
        </button>
      </div>
    );
  }

  return (
    <div className="pb-24 bg-gray-50 md:pt-12">
      <BackHeader title={merchant.name} subtitle={merchant.area} />

      <div className={`h-52 md:h-80 ${merchant.cover} relative`}>
        {merchant.coverImage && (
          <img src={merchant.coverImage} alt="" className="absolute inset-0 h-full w-full object-cover" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:max-w-7xl md:px-6 lg:px-8 text-white">
          <p className="text-2xl md:text-5xl font-black">{merchant.name}</p>
          <p className="text-sm md:text-lg text-white/85">{merchant.tagline}</p>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-5 relative z-10 space-y-5">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-xl shadow-gray-900/10 p-4 md:p-5 space-y-3">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-black text-gray-900">{merchant.name}</h2>
              <p className="text-sm text-gray-500">{merchant.tagline}</p>
            </div>
            <span className="flex items-center gap-1 bg-emerald-600 text-white text-xs font-bold px-2 py-1 rounded-md">
              {merchant.rating} <Star size={12} fill="currentColor" />
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Stars rating={merchant.rating} />
            <span className="text-xs text-gray-400">{merchant.reviews.toLocaleString()} reviews</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
            <span className="flex items-center gap-1 bg-gray-50 rounded-xl px-3 py-2">
              <Clock size={13} /> {merchant.deliveryTime}
            </span>
            <span className="flex items-center gap-1 bg-gray-50 rounded-xl px-3 py-2">
              <Truck size={13} /> Door delivery
            </span>
          </div>
          <p className="flex items-center gap-1 text-xs text-gray-500">
            <MapPin size={13} /> {merchant.area}
          </p>
        </div>

        {merchant.offer && (
          <div className="bg-red-50 text-brand text-xs font-bold px-3 py-3 rounded-xl border border-red-100 flex items-center gap-2">
            <BadgePercent size={16} /> {merchant.offer}
          </div>
        )}

        <div className="smooth-scroll no-scrollbar flex gap-2 overflow-x-auto pb-1 -mx-1">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`whitespace-nowrap text-xs font-bold px-3 py-2 rounded-full border shadow-sm ${
                category === c ? "bg-gray-900 text-white border-gray-900" : "bg-white text-gray-600 border-gray-100"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 px-4 md:px-5 shadow-sm">
          <div className="py-3 border-b border-gray-100">
            <p className="text-sm font-black text-gray-900">Recommended for you</p>
            <p className="text-xs text-gray-400">{products.length} items available</p>
          </div>
          <div className="md:grid md:grid-cols-2 xl:grid-cols-3 md:gap-x-6">
            {products.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                qty={cart[p.id] || 0}
                onAdd={() => addToCart(p.id)}
                onRemove={() => removeFromCart(p.id)}
              />
            ))}
          </div>
        </div>
      </main>

      {cartCount > 0 && (
        <button
          onClick={() => navigate("/cart")}
          className="fixed bottom-16 md:bottom-6 left-1/2 -translate-x-1/2 max-w-3xl w-[calc(100%-2rem)] bg-emerald-600 text-white rounded-xl px-4 py-3 flex items-center justify-between shadow-lg z-30"
        >
          <span className="text-sm font-semibold">
            {cartCount} item{cartCount > 1 ? "s" : ""} · ₹{cartTotal}
          </span>
          <span className="text-sm font-bold flex items-center gap-1">
            View Cart <ShoppingBag size={16} />
          </span>
        </button>
      )}
    </div>
  );
}
