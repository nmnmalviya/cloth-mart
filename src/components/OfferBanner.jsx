import React from "react";
import { Percent, Sparkles, Truck } from "lucide-react";

const BANNERS = [
  {
    title: "Sunday Style Fest",
    sub: "Up to 60% off on top local stores",
    bg: "bg-gradient-to-r from-brand to-rose-600",
    icon: Percent,
  },
  {
    title: "Fresh Drops",
    sub: "New arrivals delivered to your door",
    bg: "bg-gradient-to-r from-zinc-900 to-stone-700",
    icon: Sparkles,
  },
  {
    title: "Free Delivery",
    sub: "On your first order above ₹499",
    bg: "bg-gradient-to-r from-emerald-600 to-teal-600",
    icon: Truck,
  },
];

export default function OfferBanner() {
  return (
    <div className="smooth-scroll no-scrollbar grid grid-flow-col auto-cols-[86%] gap-3 overflow-x-auto px-4 sm:px-0 pb-1 -mx-1 md:mx-0 md:grid-flow-row md:auto-cols-auto md:grid-cols-3 md:overflow-visible">
      {BANNERS.map((b, i) => {
        const Icon = b.icon;
        return (
        <div
          key={i}
          className={`rounded-2xl p-4 text-white flex items-center justify-between ${b.bg} shadow-lg shadow-gray-900/10 overflow-hidden relative min-h-32`}
        >
          <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-white/10" />
          <div>
            <p className="font-black text-lg">{b.title}</p>
            <p className="text-xs text-white/90">{b.sub}</p>
            <p className="mt-3 text-[11px] font-bold bg-white text-gray-900 inline-flex px-2.5 py-1 rounded-full">
              Order now
            </p>
          </div>
          <Icon size={32} className="opacity-90 relative" />
        </div>
      );
      })}
    </div>
  );
}
