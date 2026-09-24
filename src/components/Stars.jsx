import React from "react";
import { Star } from "lucide-react";

export default function Stars({ rating, size = 12 }) {
  return (
    <span className="inline-flex items-center gap-1 text-white bg-emerald-600 px-1.5 py-0.5 rounded text-xs font-semibold">
      <Star size={size} fill="currentColor" />
      {rating}
    </span>
  );
}
