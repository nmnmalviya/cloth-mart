import React from "react";
import { User, MapPin, Heart, HelpCircle, LogOut } from "lucide-react";
import { BackHeader } from "../components/Header.jsx";

const MENU = [
  { icon: MapPin, label: "Saved Addresses" },
  { icon: Heart, label: "Your Favourites" },
  { icon: HelpCircle, label: "Help & Support" },
  { icon: LogOut, label: "Log Out" },
];

export default function ProfilePage() {
  return (
    <div className="pb-24 md:pt-12">
      <BackHeader title="Profile" />
      <div className="mx-auto max-w-4xl p-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 bg-white rounded-xl border border-gray-100 p-4">
          <div className="w-12 h-12 rounded-full bg-brand/10 text-brand flex items-center justify-center">
            <User size={22} />
          </div>
          <div>
            <p className="font-semibold text-gray-800">Naman</p>
            <p className="text-xs text-gray-400">Seoni, Madhya Pradesh</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 mt-4 divide-y divide-gray-50 md:grid md:grid-cols-2 md:divide-y-0">
          {MENU.map(({ icon: Icon, label }) => (
            <button key={label} className="w-full flex items-center gap-3 p-4 text-sm text-gray-700">
              <Icon size={17} className="text-gray-400" />
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
