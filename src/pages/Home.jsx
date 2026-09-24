import React, { useEffect, useMemo, useState } from "react";
import merchantsData from "../data/merchants.json";
import { HomeHeader } from "../components/Header.jsx";
import OfferBanner from "../components/OfferBanner.jsx";
import CategoryStrip from "../components/CategoryStrip.jsx";
import MerchantCard from "../components/MerchantCard.jsx";
import { ArrowDownUp, Heart, SlidersHorizontal, Timer, Truck } from "lucide-react";

const CATEGORIES = ["All", ...new Set(merchantsData.flatMap((m) => m.products.map((p) => p.category)))];
const SORTS = [
  { key: "relevance", label: "Relevance" },
  { key: "rating", label: "Rating: High to Low" },
  { key: "delivery", label: "Delivery Time" },
  { key: "new", label: "New Drops" },
];
const QUICK_FILTERS = [
  { key: "rating", title: "Top rated", subtitle: "Best reviews" },
  { key: "delivery", title: "Near you", subtitle: "Fastest first" },
  { key: "new", title: "New drops", subtitle: "Latest stores" },
];
const COLLECTIONS = [
  {
    title: "Party Ready",
    subtitle: "Dresses, blazers and statement fits",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=700&q=80",
  },
  {
    title: "Office Edit",
    subtitle: "Sharp shirts, chinos and layers",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=700&q=80",
  },
  {
    title: "Sneaker Drop",
    subtitle: "Fresh soles for every day",
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=700&q=80",
  },
  {
    title: "Festive Picks",
    subtitle: "Kurtas, sarees and celebration wear",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=700&q=80",
  },
];
const AUDIENCES = [
  {
    key: "men",
    label: "Men",
    categories: ["Shirts", "T-Shirts", "Jeans", "Sneakers", "Kurtas", "Blazers"],
  },
  {
    key: "women",
    label: "Women",
    categories: ["Dresses", "Kurtas", "Sarees", "Tops", "Co-ords", "Handbags"],
  },
  {
    key: "kids",
    label: "Kids",
    categories: ["T-Shirts", "Dungarees", "Dresses", "Jackets", "Sets", "Shoes"],
  },
  {
    key: "sale",
    label: "Sale",
    categories: ["60% Off", "Under ₹999", "Footwear", "Ethnic", "Basics", "Accessories"],
  },
];
const CATALOG_PRODUCTS = [
  {
    id: "c1",
    audience: "men",
    brand: "Powerlook",
    name: "Men's Green Casual Checked Shirt",
    price: 999,
    mrp: 1799,
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=600&q=80",
    tag: "60 mins Home Trial",
  },
  {
    id: "c2",
    audience: "men",
    brand: "Rare Rabbit",
    name: "Relaxed Fit Oversized T-Shirt",
    price: 881,
    mrp: 1799,
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=600&q=80",
    tag: "Express delivery",
  },
  {
    id: "c3",
    audience: "men",
    brand: "Levis",
    name: "511 Dark Blue Slim Jeans",
    price: 1979,
    mrp: 3299,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=600&q=80",
    tag: "60 mins Home Trial",
  },
  {
    id: "c4",
    audience: "women",
    brand: "Vero Moda",
    name: "Green Casual Solid Shirt",
    price: 1749,
    mrp: 2499,
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80",
    tag: "Express delivery",
  },
  {
    id: "c5",
    audience: "women",
    brand: "Libas",
    name: "Purple Festive Kurta Set",
    price: 3819,
    mrp: 15899,
    image: "https://images.unsplash.com/photo-1597983073493-88cd35cf93b0?auto=format&fit=crop&w=600&q=80",
    tag: "60 mins Home Trial",
  },
  {
    id: "c6",
    audience: "women",
    brand: "Globus",
    name: "Black Party Solid Dress",
    price: 1199,
    mrp: 2299,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80",
    tag: "Try first",
  },
  {
    id: "c7",
    audience: "kids",
    brand: "JJ Juniors",
    name: "Boys Multicolor Casual Polo",
    price: 999,
    mrp: 1999,
    image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=600&q=80",
    tag: "Tomorrow delivery",
  },
  {
    id: "c8",
    audience: "kids",
    brand: "Peppermint",
    name: "Girls Pink Casual Dress",
    price: 1099,
    mrp: 2199,
    image: "https://images.unsplash.com/photo-1522771930-78848d9293e8?auto=format&fit=crop&w=600&q=80",
    tag: "Home Trial",
  },
  {
    id: "c9",
    audience: "kids",
    brand: "Tiny Baby",
    name: "Cream Palazzo Set",
    price: 1870,
    mrp: 3500,
    image: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=600&q=80",
    tag: "Express delivery",
  },
  {
    id: "c10",
    audience: "sale",
    brand: "Adidas",
    name: "White Samba Lace-Up Sneakers",
    price: 10999,
    mrp: 12999,
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=600&q=80",
    tag: "Sale live",
  },
  {
    id: "c11",
    audience: "sale",
    brand: "SASSAFRAS",
    name: "White Casual Tapered Trouser",
    price: 917,
    mrp: 1799,
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=600&q=80",
    tag: "49% OFF",
  },
  {
    id: "c12",
    audience: "sale",
    brand: "The Souled Store",
    name: "Unisex Blue Backpack",
    price: 2999,
    mrp: 4999,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80",
    tag: "Clearance",
  },
];

const buildAddressLabel = (address = {}) => {
  const area =
    address.suburb ||
    address.neighbourhood ||
    address.quarter ||
    address.road ||
    address.village ||
    address.town;
  const city = address.city || address.town || address.village || address.county || address.state_district;
  const state = address.state;

  return [area, city, state].filter(Boolean).slice(0, 3).join(", ");
};

export default function Home() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("relevance");
  const [quickFilter, setQuickFilter] = useState("");
  const [activeAudience, setActiveAudience] = useState("men");
  const [showSort, setShowSort] = useState(false);
  const [location, setLocation] = useState(() => {
    try {
      const saved = localStorage.getItem("wearit-location");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [locationStatus, setLocationStatus] = useState("idle");
  const [locationError, setLocationError] = useState("");

  useEffect(() => {
    if (location) {
      localStorage.setItem("wearit-location", JSON.stringify(location));
    }
  }, [location]);

  const fetchAddress = async (latitude, longitude) => {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
    );

    if (!response.ok) {
      throw new Error("Address lookup failed");
    }

    const data = await response.json();
    return buildAddressLabel(data.address) || data.display_name?.split(",").slice(0, 3).join(", ");
  };

  const fetchLocation = () => {
    setLocationError("");

    if (!navigator.geolocation) {
      setLocationStatus("error");
      setLocationError("Location is not supported by this browser.");
      return;
    }

    setLocationStatus("loading");
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        const latitude = coords.latitude;
        const longitude = coords.longitude;
        const nextLocation = {
          label: "Current location",
          address: "Current location",
          latitude,
          longitude,
          accuracy: Math.round(coords.accuracy),
        };

        try {
          const address = await fetchAddress(latitude, longitude);
          setLocation({
            ...nextLocation,
            label: address || "Current location",
            address: address || "Current location",
          });
          setLocationStatus("success");
        } catch {
          setLocation(nextLocation);
          setLocationStatus("success");
          setLocationError("Location fetched, but address lookup failed.");
        }
      },
      (error) => {
        const message =
          error.code === error.PERMISSION_DENIED
            ? "Location permission denied. Please allow location access."
            : "Could not fetch your location. Try again.";

        setLocationStatus("error");
        setLocationError(message);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      }
    );
  };

  const merchants = useMemo(() => {
    let list = merchantsData.filter((m) => {
      const matchesSearch =
        m.name.toLowerCase().includes(search.toLowerCase()) ||
        m.tagline.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === "All" || m.products.some((p) => p.category === category);
      return matchesSearch && matchesCategory;
    });

    if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    if (sort === "delivery") list = [...list].sort((a, b) => parseInt(a.deliveryTime) - parseInt(b.deliveryTime));
    if (sort === "new") list = [...list].reverse();

    return list;
  }, [search, category, sort]);

  const applyQuickFilter = (filterKey) => {
    const nextFilter = quickFilter === filterKey ? "" : filterKey;
    setQuickFilter(nextFilter);
    setSort(nextFilter || "relevance");
    setShowSort(false);
  };

  const activeAudienceConfig = AUDIENCES.find((item) => item.key === activeAudience);
  const catalogProducts =
    activeAudience === "sale"
      ? CATALOG_PRODUCTS.filter((product) => product.audience === "sale")
      : CATALOG_PRODUCTS.filter((product) => product.audience === activeAudience || product.audience === "sale").slice(0, 6);

  return (
    <div className="md:pt-12">
      <HomeHeader
        search={search}
        setSearch={setSearch}
        location={location}
        locationStatus={locationStatus}
        locationError={locationError}
        onFetchLocation={fetchLocation}
      />

      <main className="mx-auto max-w-7xl px-0 sm:px-6 lg:px-8 py-4 md:py-8 space-y-6">
        <OfferBanner />
        <section className="px-4 sm:px-0 space-y-4">
          <div className="grid grid-cols-4 gap-2 rounded-2xl bg-white p-1.5 shadow-sm border border-gray-100">
            {AUDIENCES.map((audience) => (
              <button
                key={audience.key}
                type="button"
                onClick={() => setActiveAudience(audience.key)}
                className={`rounded-xl px-2 py-3 text-sm font-black transition-colors ${
                  activeAudience === audience.key ? "bg-brand text-white" : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {audience.label}
              </button>
            ))}
          </div>

          <div className="smooth-scroll no-scrollbar flex gap-2 overflow-x-auto pb-1 md:flex-wrap md:overflow-visible">
            {activeAudienceConfig.categories.map((item) => (
              <button
                key={item}
                type="button"
                className="whitespace-nowrap rounded-full border border-gray-100 bg-white px-3 py-2 text-xs font-bold text-gray-700 shadow-sm hover:border-brand/30"
              >
                {item}
              </button>
            ))}
          </div>
        </section>

        <section className="px-4 sm:px-0 space-y-3">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-lg md:text-2xl text-gray-900 font-black">
                {activeAudienceConfig.label} catalog
              </p>
              <p className="text-xs text-gray-500 font-medium">60 min delivery and free in-home trials on selected fits</p>
            </div>
            <button className="text-xs font-black text-brand">View all</button>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {catalogProducts.map((product) => {
              const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);

              return (
                <button
                  key={product.id}
                  type="button"
                  className="overflow-hidden rounded-2xl bg-white text-left shadow-sm border border-gray-100 hover:shadow-xl transition-shadow"
                >
                  <div className="relative aspect-[3/4] bg-gray-100">
                    <img src={product.image} alt="" className="h-full w-full object-cover" loading="lazy" />
                    <span className="absolute left-2 top-2 flex items-center gap-1 rounded-md bg-white/95 px-2 py-1 text-[10px] font-black text-gray-900">
                      <Truck size={11} /> {product.tag}
                    </span>
                    <span className="absolute right-2 top-2 rounded-full bg-white/95 p-1.5 text-gray-700">
                      <Heart size={13} />
                    </span>
                  </div>
                  <div className="p-3">
                    <p className="text-xs font-black text-gray-900 truncate">{product.brand}</p>
                    <p className="mt-0.5 text-xs text-gray-500 line-clamp-2 min-h-8">{product.name}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-1.5">
                      <span className="text-sm font-black text-gray-950">₹{product.price.toLocaleString("en-IN")}</span>
                      <span className="text-[11px] text-gray-400 line-through">₹{product.mrp.toLocaleString("en-IN")}</span>
                      <span className="text-[11px] font-bold text-emerald-600">{discount}% OFF</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        <div className="px-4 sm:px-0 grid grid-cols-3 gap-2 md:gap-4">
          {QUICK_FILTERS.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => applyQuickFilter(item.key)}
              className={`border rounded-xl px-2 py-2 md:px-4 md:py-4 text-center shadow-sm transition-colors ${
                quickFilter === item.key
                  ? "bg-gray-900 border-gray-900 text-white"
                  : "bg-white border-gray-100 text-gray-900 hover:border-brand/30"
              }`}
            >
              <p className="text-[11px] md:text-base font-black">{item.title}</p>
              <p className={`text-[10px] md:text-xs mt-0.5 ${quickFilter === item.key ? "text-white/70" : "text-gray-400"}`}>
                {item.subtitle}
              </p>
            </button>
          ))}
        </div>
        <CategoryStrip categories={CATEGORIES} active={category} onSelect={setCategory} />

        <section className="px-4 sm:px-0 space-y-3">
          <div>
            <p className="text-lg md:text-2xl text-gray-900 font-black">Featured collections</p>
            <p className="text-xs text-gray-500 font-medium">Curated looks from stores delivering near you</p>
          </div>
          <div className="smooth-scroll no-scrollbar grid grid-flow-col auto-cols-[78%] gap-4 overflow-x-auto pb-1 md:grid-flow-row md:auto-cols-auto md:grid-cols-4 md:overflow-visible">
            {COLLECTIONS.map((collection) => (
              <button
                key={collection.title}
                className="relative h-44 overflow-hidden rounded-2xl text-left shadow-sm hover:shadow-xl transition-shadow duration-200"
              >
                <img src={collection.image} alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <p className="text-lg font-black">{collection.title}</p>
                  <p className="text-xs text-white/80">{collection.subtitle}</p>
                </div>
              </button>
            ))}
          </div>
        </section>

        <div className="px-4 sm:px-0 flex items-center justify-between gap-4">
          <div>
            <p className="text-lg md:text-2xl text-gray-900 font-black">Stores near you</p>
            <p className="text-xs text-gray-500 font-medium flex items-center gap-1 mt-0.5">
              <Timer size={13} />
              {location
                ? `${merchants.length} fashion kitchens near your live location`
                : `${merchants.length} fashion kitchens delivering today`}
            </p>
          </div>
          <div className="relative">
            <button
              onClick={() => setShowSort((s) => !s)}
              className="flex items-center gap-1 text-xs font-bold text-gray-700 border border-gray-100 rounded-full px-3 py-2 bg-white shadow-sm"
            >
              <SlidersHorizontal size={13} /> Sort
            </button>
            {showSort && (
              <div className="absolute right-0 mt-1 bg-white border border-gray-100 rounded-xl shadow-lg py-1 z-10 w-44">
                {SORTS.map((s) => (
                  <button
                    key={s.key}
                    onClick={() => {
                      setSort(s.key);
                      setQuickFilter("");
                      setShowSort(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs ${
                      sort === s.key ? "text-brand font-semibold" : "text-gray-600"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="px-4 sm:px-0 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {merchants.map((m) => (
            <MerchantCard key={m.id} merchant={m} />
          ))}
          {merchants.length === 0 && (
            <div className="text-center bg-white rounded-2xl border border-gray-100 py-10 px-5 shadow-sm md:col-span-2 xl:col-span-3">
              <ArrowDownUp size={28} className="mx-auto text-gray-300 mb-2" />
              <p className="text-gray-700 font-bold text-sm">No stores match your search</p>
              <p className="text-gray-400 text-xs mt-1">Try another style, category, or brand.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
