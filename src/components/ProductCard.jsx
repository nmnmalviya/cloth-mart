import React from "react";
import { Plus, Minus, Flame } from "lucide-react";

export default function ProductCard({ product, qty, onAdd, onRemove }) {
  const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  return (
    <div className="flex gap-3 border-b border-gray-100 py-4">
      <div className={`w-24 h-28 rounded-2xl ${product.img} flex-shrink-0 overflow-hidden bg-gray-100 relative`}>
        {product.image && (
          <img src={product.image} alt={product.name} className="h-full w-full object-cover" loading="lazy" />
        )}
        <span className="absolute left-2 bottom-2 bg-black/70 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
          {discount}% OFF
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          {product.bestseller && (
            <span className="flex items-center gap-0.5 text-[10px] font-bold text-orange-600 bg-orange-50 px-1.5 py-0.5 rounded">
              <Flame size={10} /> BESTSELLER
            </span>
          )}
        </div>
        <p className="font-semibold text-gray-800 mt-0.5">{product.name}</p>
        <p className="text-xs text-gray-400 mt-0.5 line-clamp-2">{product.desc}</p>
        <div className="flex items-center gap-2 mt-1">
          <span className="font-bold text-gray-900">₹{product.price}</span>
          <span className="text-xs text-gray-400 line-through">₹{product.mrp}</span>
        </div>
        <p className="text-[11px] text-emerald-700 font-semibold mt-1">Free alteration available</p>
      </div>
      <div className="flex items-center">
        {qty > 0 ? (
          <div className="flex items-center gap-2 bg-brand text-white rounded-lg px-2 py-1 shadow-sm">
            <button onClick={onRemove}>
              <Minus size={14} />
            </button>
            <span className="text-sm w-4 text-center">{qty}</span>
            <button onClick={onAdd}>
              <Plus size={14} />
            </button>
          </div>
        ) : (
          <button
            onClick={onAdd}
            className="border border-brand text-brand font-bold text-sm px-4 py-1.5 rounded-lg hover:bg-red-50 shadow-sm bg-white"
          >
            ADD
          </button>
        )}
      </div>
    </div>
  );
}
