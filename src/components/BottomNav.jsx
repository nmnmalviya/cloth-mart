import React from "react";
import { NavLink } from "react-router-dom";
import { Home, ShoppingBag, ClipboardList, User } from "lucide-react";

const tabs = [
  { to: "/", label: "Home", icon: Home, end: true },
  { to: "/cart", label: "Cart", icon: ShoppingBag },
  { to: "/orders", label: "Orders", icon: ClipboardList },
  { to: "/profile", label: "Profile", icon: User },
];

export default function BottomNav({ cartCount }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur border-t border-gray-100 z-50 shadow-[0_-8px_24px_rgba(15,23,42,0.08)] md:top-0 md:bottom-auto md:h-12 md:border-t-0 md:border-b">
      <div className="mx-auto max-w-7xl grid grid-cols-4 md:flex md:h-12 md:justify-end md:gap-2 md:px-6 lg:px-8">
        {tabs.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex flex-col md:flex-row items-center justify-center gap-0.5 md:gap-2 py-2.5 md:h-12 md:py-0 md:px-4 text-xs md:text-sm font-bold relative ${
                isActive ? "text-brand" : "text-gray-400"
              }`
            }
          >
            <div className="relative">
              <Icon size={20} />
              {label === "Cart" && cartCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-brand text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>
            {label}
          </NavLink>
        ))}
      </div>
    </div>
  );
}
