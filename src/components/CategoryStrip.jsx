import React from "react";

export default function CategoryStrip({ categories, active, onSelect }) {
  return (
    <div className="smooth-scroll no-scrollbar flex gap-2 overflow-x-auto px-4 sm:px-0 pb-1 -mx-1 md:mx-0 md:flex-wrap md:overflow-visible">
      {categories.map((c) => (
        <button
          key={c}
          onClick={() => onSelect(c)}
          className={`whitespace-nowrap text-xs font-bold px-3 py-2 rounded-full border shadow-sm ${
            active === c ? "bg-gray-900 text-white border-gray-900" : "bg-white text-gray-700 border-gray-100"
          }`}
        >
          {c}
        </button>
      ))}
    </div>
  );
}
