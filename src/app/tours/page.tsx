"use client";

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { FaSearch, FaTimes, FaFilter, FaMapMarkerAlt, FaTag, FaStar } from "react-icons/fa";

import type { RootState, AppDispatch } from "@/redux/store";
import { getAllTours } from "@/redux/features/tour/tourThunk";

// Skeleton Components
const TourCardSkeleton = () => (
  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden animate-pulse">
    <div className="relative h-56 w-full bg-gray-300 dark:bg-gray-700" />
    <div className="p-5 space-y-3">
      <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4" />
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2" />
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/3" />
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full" />
      <div className="flex gap-2 pt-2">
        <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded-xl flex-1" />
        <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded-xl flex-1" />
      </div>
    </div>
  </div>
);

const TourGridSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
    {[1, 2, 3, 4, 5, 6].map((i) => (
      <TourCardSkeleton key={i} />
    ))}
  </div>
);

const FiltersSkeleton = () => (
  <div className="flex flex-col md:flex-row justify-between gap-4 md:items-center animate-pulse">
    <div className="h-8 w-48 bg-gray-300 dark:bg-gray-700 rounded" />
    <div className="flex gap-3 flex-col md:flex-row w-full md:w-auto">
      <div className="h-10 w-full md:w-80 bg-gray-300 dark:bg-gray-700 rounded-xl" />
      <div className="h-10 w-24 bg-gray-300 dark:bg-gray-700 rounded-xl" />
      <div className="h-10 w-32 bg-gray-300 dark:bg-gray-700 rounded-xl" />
      <div className="h-10 w-24 bg-gray-300 dark:bg-gray-700 rounded-xl" />
    </div>
  </div>
);

const TourPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  // ========================
  // REDUX STATE
  // ========================
  const { tours = [], loading } = useSelector(
    (state: RootState) => state.tour
  );
  
  // Get user from auth state
  const { user } = useSelector((state: RootState) => state.auth);

  // ========================
  // LOCAL STATE
  // ========================
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [sort, setSort] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [isSearching, setIsSearching] = useState(false);
  
  // NEW FILTER STATES
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const toursPerPage = 6;

  // Get unique locations and categories from tours
  const uniqueLocations = useMemo(() => {
    const locations = tours.map(tour => tour.location).filter(Boolean);
    return ["all", ...new Set(locations)];
  }, [tours]);

  const uniqueCategories = useMemo(() => {
    const categories = tours.map(tour => tour.category).filter(Boolean);
    return ["all", ...new Set(categories)];
  }, [tours]);

  // ========================
  // FETCH DATA
  // ========================
  useEffect(() => {
    dispatch(getAllTours());
  }, [dispatch]);

  // ========================
  // SEARCH FUNCTION (triggered by button)
  // ========================
  const handleSearch = () => {
    setIsSearching(true);
    setDebouncedSearch(search.toLowerCase().trim());
    setCurrentPage(1);
    setIsSearching(false);
  };

  // ========================
  // RESET SEARCH
  // ========================
  const handleResetSearch = () => {
    setSearch("");
    setDebouncedSearch("");
    setSelectedLocation("all");
    setSelectedCategory("all");
    setSort("default");
    setCurrentPage(1);
  };

  // ========================
  // HANDLE ENTER KEY
  // ========================
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // ========================
  // HANDLE BOOK NOW
  // ========================
  const handleBookNow = (tourId: string) => {
    if (!user) {
      router.push(`/login?redirect=/tours/${tourId}/checkout`);
    } else {
      router.push(`/tours/${tourId}/checkout`);
    }
  };

  // ========================
  // FILTER + SEARCH + SORT (with additional filters)
  // ========================
  const processedTours = useMemo(() => {
    let data = [...tours];

    // SEARCH filter
    if (debouncedSearch) {
      data = data.filter((tour: any) => {
        const text = `
          ${tour.title || ""}
          ${tour.name || ""}
          ${tour.location || ""}
          ${tour.category || ""}
          ${tour.description || ""}
        `.toLowerCase();

        return text.includes(debouncedSearch);
      });
    }

    // LOCATION filter
    if (selectedLocation !== "all") {
      data = data.filter((tour: any) => tour.location === selectedLocation);
    }

    // CATEGORY filter
    if (selectedCategory !== "all") {
      data = data.filter((tour: any) => tour.category === selectedCategory);
    }

    // SORT
    switch (sort) {
      case "priceLow":
        data.sort((a: any, b: any) => (a.price || 0) - (b.price || 0));
        break;

      case "priceHigh":
        data.sort((a: any, b: any) => (b.price || 0) - (a.price || 0));
        break;

      case "rating":
        data.sort((a: any, b: any) => (b.rating || 0) - (a.rating || 0));
        break;
    }

    return data;
  }, [tours, debouncedSearch, selectedLocation, selectedCategory, sort]);

  // ========================
  // PAGINATION
  // ========================
  const totalPages = Math.ceil(processedTours.length / toursPerPage);

  const currentTours = useMemo(() => {
    const start = (currentPage - 1) * toursPerPage;
    return processedTours.slice(start, start + toursPerPage);
  }, [processedTours, currentPage]);

  // ========================
  // ACTIVE FILTERS COUNT
  // ========================
  const activeFiltersCount = [
    debouncedSearch && "search",
    selectedLocation !== "all" && "location",
    selectedCategory !== "all" && "category",
    sort !== "default" && "sort"
  ].filter(Boolean).length;

  // ========================
  // SKELETON LOADING STATE (instead of loading spinner)
  // ========================
  if (loading) {
    return (
      <div className="p-6 space-y-6 max-w-7xl mx-auto">
        {/* Header Skeleton */}
        <FiltersSkeleton />
        
        {/* Search Results Info Skeleton (hidden when loading) */}
        
        {/* Tour Grid Skeleton */}
        <TourGridSkeleton />
        
        {/* Pagination Skeleton */}
        <div className="flex justify-center gap-2 pt-6 flex-wrap animate-pulse">
          <div className="h-10 w-20 bg-gray-300 dark:bg-gray-700 rounded-lg" />
          <div className="h-10 w-10 bg-gray-300 dark:bg-gray-700 rounded-lg" />
          <div className="h-10 w-10 bg-gray-300 dark:bg-gray-700 rounded-lg" />
          <div className="h-10 w-10 bg-gray-300 dark:bg-gray-700 rounded-lg" />
          <div className="h-10 w-20 bg-gray-300 dark:bg-gray-700 rounded-lg" />
        </div>
      </div>
    );
  }

  // ========================
  // NO DATA STATE (API EMPTY)
  // ========================
  if (!loading && tours.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-gray-500 space-y-3">
        <p className="text-2xl font-semibold">No tours available 😕</p>
        <button
          onClick={() => router.push("/")}
          className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Back to Home
        </button>
      </div>
    );
  }

  // ========================
  // NO SEARCH RESULT STATE
  // ========================
  if (!loading && tours.length > 0 && processedTours.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-gray-500 space-y-4">
        <p className="text-2xl font-semibold">
          No matching tours found 🔍
        </p>
        <p className="text-sm">
          Try different keywords or reset filters
        </p>
        <div className="flex gap-3">
          <button
            onClick={handleResetSearch}
            className="px-4 py-2 bg-[#00295D] text-white rounded-lg transition-colors"
          >
            Reset Filters
          </button>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between gap-4 md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Explore Tours
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {processedTours.length} tours available
          </p>
        </div>

        {/* SEARCH + SORT + FILTER BUTTON */}
        <div className="flex gap-3 flex-col md:flex-row w-full md:w-auto">
          <div className="relative flex-1 md:w-80">
            <input
              type="text"
              placeholder="Search tours, location, category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full border px-4 py-2 pr-10 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            />
            {search && (
              <button
                onClick={handleResetSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <FaTimes />
              </button>
            )}
          </div>

          <button
            onClick={handleSearch}
            disabled={isSearching}
            className="bg-[#00295D] text-white px-6 py-2 rounded-xl transition-colors flex items-center gap-2 justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaSearch />
            {isSearching ? "Searching..." : "Search"}
          </button>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border px-3 py-2 rounded-xl dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          >
            <option value="default">Sort By</option>
            <option value="priceLow">Price: Low → High</option>
            <option value="priceHigh">Price: High → Low</option>
            <option value="rating">Top Rated</option>
          </select>

          {/* Advanced Filters Toggle Button */}
          <button
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-colors ${
              showAdvancedFilters || activeFiltersCount > 0
                ? "bg-[#00295D] text-white border-[#00295D]"
                : "border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
            }`}
          >
            <FaFilter />
            Filters
            {activeFiltersCount > 0 && (
              <span className="ml-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                {activeFiltersCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* ADVANCED FILTERS SECTION */}
      {showAdvancedFilters && (
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Location Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                <FaMapMarkerAlt className="text-[#00295D]" />
                Filter by Location
              </label>
              <select
                value={selectedLocation}
                onChange={(e) => {
                  setSelectedLocation(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-[#00295D] outline-none dark:bg-gray-800 dark:border-gray-600"
              >
                {uniqueLocations.map(location => (
                  <option key={location} value={location}>
                    {location === "all" ? "All Locations" : location}
                  </option>
                ))}
              </select>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                <FaTag className="text-[#00295D]" />
                Filter by Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-[#00295D] outline-none dark:bg-gray-800 dark:border-gray-600"
              >
                {uniqueCategories.map(category => (
                  <option key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Active Filters Display */}
          {(selectedLocation !== "all" || selectedCategory !== "all") && (
            <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Active Filters:</p>
              <div className="flex flex-wrap gap-2">
                {selectedLocation !== "all" && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-xs">
                    <FaMapMarkerAlt size={10} />
                    {selectedLocation}
                    <button
                      onClick={() => setSelectedLocation("all")}
                      className="ml-1 hover:text-blue-900"
                    >
                      ×
                    </button>
                  </span>
                )}
                {selectedCategory !== "all" && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded-full text-xs">
                    <FaTag size={10} />
                    {selectedCategory}
                    <button
                      onClick={() => setSelectedCategory("all")}
                      className="ml-1 hover:text-purple-900"
                    >
                      ×
                    </button>
                  </span>
                )}
                {(selectedLocation !== "all" || selectedCategory !== "all") && (
                  <button
                    onClick={() => {
                      setSelectedLocation("all");
                      setSelectedCategory("all");
                    }}
                    className="text-xs text-red-500 hover:text-red-600"
                  >
                    Clear All
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* SEARCH RESULTS INFO */}
      {debouncedSearch && (
        <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg flex justify-between items-center">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Showing results for: <span className="font-semibold">"{debouncedSearch}"</span>
            <span className="ml-2 text-blue-600 dark:text-blue-400">
              ({processedTours.length} tours found)
            </span>
          </p>
          <button
            onClick={handleResetSearch}
            className="text-sm text-[#00295D] hover:underline"
          >
            Clear Search
          </button>
        </div>
      )}

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
        {currentTours.map((tour: any) => (
          <div
            key={tour._id}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
          >
            {/* IMAGE */}
            <div className="relative h-56 w-full overflow-hidden">
              <Image
                src={tour.image?.url || "/placeholder.jpg"}
                alt={tour.title || tour.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />

              <span className="absolute top-3 right-3 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-semibold">
                ${tour.price}
              </span>

              {tour.rating && (
                <span className="absolute bottom-3 left-3 bg-yellow-500 text-white px-2 py-1 rounded-lg text-xs font-semibold flex items-center gap-1">
                  <FaStar className="text-white" size={10} />
                  {tour.rating}
                </span>
              )}
            </div>

            {/* CONTENT */}
            <div className="p-5 space-y-3">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white line-clamp-1">
                {tour.title || tour.name}
              </h2>

              <p className="text-gray-500 dark:text-gray-400 text-sm flex items-center gap-1">
                📍 {tour.location || "Unknown location"}
              </p>

              {tour.category && (
                <p className="text-xs text-gray-400 dark:text-gray-500">
                  🏷️ {tour.category}
                </p>
              )}

              <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
                {tour.description?.slice(0, 90)}...
              </p>

              <div className="flex justify-between items-center pt-2">
                <span className="text-xs text-gray-400 dark:text-gray-500">
                  Per person
                </span>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => router.push(`/tours/${tour._id}`)}
                  className="w-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 py-2 rounded-xl border border-[#00295D] dark:border-gray-600 text-[#00295D] dark:text-white font-medium transition-colors"
                >
                  View Details
                </button>

                <button
                  onClick={() => handleBookNow(tour._id)}
                  className="w-full bg-[#00295D] dark:bg-blue-600 text-white py-2 rounded-xl hover:bg-[#003a7a] dark:hover:bg-blue-700 transition-colors font-medium cursor-pointer"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 pt-6 flex-wrap">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            Previous
          </button>

          <div className="flex gap-2">
            {[...Array(totalPages)].map((_, i) => {
              if (
                totalPages <= 7 ||
                i + 1 === 1 ||
                i + 1 === totalPages ||
                (i + 1 >= currentPage - 1 && i + 1 <= currentPage + 1)
              ) {
                return (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      currentPage === i + 1
                        ? "bg-[#00295D] text-white"
                        : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
                    }`}
                  >
                    {i + 1}
                  </button>
                );
              }
              if (
                (i + 1 === currentPage - 2 && currentPage > 3) ||
                (i + 1 === currentPage + 2 && currentPage < totalPages - 2)
              ) {
                return (
                  <span key={i} className="px-2 py-2">
                    ...
                  </span>
                );
              }
              return null;
            })}
          </div>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default TourPage;