import React from "react";
import { useNavigate } from "react-router-dom";
import { Clock, BadgePercent, Bike, Star } from "lucide-react";
import Stars from "./Stars.jsx";

export default function MerchantCard({ merchant }) {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(`/merchant/${merchant.id}`)}
      className="text-left rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-shadow duration-200 bg-white w-full"
    >
      <div className={`h-44 ${merchant.cover} relative flex items-end p-3`}>
        {merchant.coverImage && (
          <img src={merchant.coverImage} alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        {merchant.offer && (
          <span className="absolute top-3 left-3 bg-brand text-white text-[11px] font-black px-2.5 py-1.5 rounded-md shadow-md flex items-center gap-1">
            <BadgePercent size={12} /> {merchant.offer}
          </span>
        )}
        <div className="relative w-full">
          <span className="text-white font-black text-xl drop-shadow block">{merchant.name}</span>
          <p className="text-white/85 text-xs font-medium mt-0.5">{merchant.tagline}</p>
        </div>
      </div>
      <div className="p-3.5 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-800">{merchant.priceForTwo}</span>
          <span className="flex items-center gap-1 bg-emerald-600 text-white text-xs font-bold px-2 py-1 rounded-md">
            {merchant.rating} <Star size={12} fill="currentColor" />
          </span>
        </div>
        <div className="flex items-center gap-3 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <Clock size={12} />
            {merchant.deliveryTime}
          </span>
          <span className="flex items-center gap-1">
            <Bike size={13} />
            Fast delivery
          </span>
        </div>
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs text-gray-400 truncate">{merchant.area}</p>
          <Stars rating={merchant.rating} />
        </div>
        <p className="text-[11px] text-gray-400">{merchant.reviews.toLocaleString()} people ordered recently</p>
      </div>
    </button>
  );
}
