import React from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Shirt, ChevronLeft, LocateFixed, Loader2 } from "lucide-react";

export function HomeHeader({ search, setSearch, location, locationStatus, locationError, onFetchLocation }) {
  const isFetchingLocation = locationStatus === "loading";
  const locationText = location ? location.address || location.label || "Current location" : "Set location";

  return (
    <div className="bg-brand text-white sticky top-0 md:top-12 z-40 shadow-[0_10px_30px_rgba(226,55,68,0.22)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4 pb-5 space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black tracking-normal flex items-center gap-1">
              <Shirt size={24} /> WearIt
            </h1>
            <p className="text-xs text-white/80 mt-0.5">Fashion delivered like your favourite meal</p>
          </div>
          <button
            type="button"
            onClick={onFetchLocation}
            disabled={isFetchingLocation}
            className="text-xs flex items-center gap-1 bg-white/15 hover:bg-white/25 disabled:opacity-70 px-2.5 py-1.5 rounded-full max-w-[11rem] sm:max-w-xs"
          >
            {isFetchingLocation ? <Loader2 size={13} className="animate-spin" /> : <LocateFixed size={13} />}
            <span className="truncate">{isFetchingLocation ? "Fetching..." : locationText}</span>
          </button>
        </div>
        <div className="flex items-center gap-2 bg-white rounded-2xl px-3.5 py-3 shadow-lg shadow-red-950/10 md:max-w-2xl">
          <Search size={18} className="text-brand" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tees, kurtas, jackets..."
            className="bg-transparent outline-none text-[15px] flex-1 text-gray-800 placeholder:text-gray-400"
          />
        </div>
        <div className="flex items-center gap-2 text-[11px] font-semibold text-white/90">
          <span className="bg-white/15 px-2.5 py-1 rounded-full">30 min pickup</span>
          <span className="bg-white/15 px-2.5 py-1 rounded-full">Easy returns</span>
          <span className="bg-white/15 px-2.5 py-1 rounded-full">
            <MapPin size={11} className="inline mr-0.5" />
            {location ? `Within ${Math.max(1, Math.round(location.accuracy / 1000))} km` : "Nearby stores"}
          </span>
        </div>
        {locationError && (
          <p className="text-xs font-semibold text-white bg-white/15 border border-white/15 rounded-xl px-3 py-2 md:max-w-2xl">
            {locationError}
          </p>
        )}
      </div>
    </div>
  );
}

export function BackHeader({ title, subtitle }) {
  const navigate = useNavigate();
  return (
    <div className="bg-white sticky top-0 md:top-12 z-40 border-b border-gray-100">
      <div className="mx-auto max-w-7xl flex items-center gap-2 p-4 sm:px-6 lg:px-8">
        <button onClick={() => navigate(-1)} className="p-1">
          <ChevronLeft size={22} />
        </button>
        <div>
          <p className="font-bold text-gray-800 leading-tight">{title}</p>
          {subtitle && <p className="text-xs text-gray-400">{subtitle}</p>}
        </div>
      </div>
    </div>
  );
}
