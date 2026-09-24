import React from "react";
import { Facebook, Instagram, Mail, MapPin, Shirt, Twitter } from "lucide-react";

const LINKS = ["About", "Partner Stores", "Careers", "Help", "Privacy", "Terms"];
const CITIES = ["Delhi", "Mumbai", "Bengaluru", "Jaipur", "Indore", "Seoni"];

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-white pb-24 md:pb-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid gap-8 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <p className="flex items-center gap-2 text-2xl font-black">
              <Shirt size={26} /> WearIt
            </p>
            <p className="mt-3 max-w-sm text-sm leading-6 text-gray-400">
              Fast fashion delivery from trusted local stores, curated for daily wear, workwear, festive fits, and
              last-minute style plans.
            </p>
            <div className="mt-5 flex gap-2">
              {[Instagram, Facebook, Twitter, Mail].map((Icon, index) => (
                <button
                  key={index}
                  className="h-9 w-9 rounded-full bg-white/10 text-white hover:bg-white/20 flex items-center justify-center"
                  aria-label="Social link"
                >
                  <Icon size={17} />
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-black">Company</p>
            <div className="mt-3 space-y-2">
              {LINKS.slice(0, 4).map((link) => (
                <button key={link} className="block text-sm text-gray-400 hover:text-white">
                  {link}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-black">Useful Links</p>
            <div className="mt-3 space-y-2">
              {LINKS.slice(4).concat(["Returns", "Track Order"]).map((link) => (
                <button key={link} className="block text-sm text-gray-400 hover:text-white">
                  {link}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-black">Available In</p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {CITIES.map((city) => (
                <span key={city} className="flex items-center gap-1 text-sm text-gray-400">
                  <MapPin size={13} /> {city}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-5 text-xs text-gray-500 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <p>© 2026 WearIt. Fashion delivered fast.</p>
          <p>Made for local clothing stores and everyday shoppers.</p>
        </div>
      </div>
    </footer>
  );
}
