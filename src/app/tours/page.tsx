"use client";

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import type { RootState, AppDispatch } from "@/redux/store";
import { getAllTours } from "@/redux/features/tour/tourThunk";

const TourPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  // ========================
  // REDUX STATE
  // ========================
  const { tours = [], loading } = useSelector(
    (state: RootState) => state.tour
  );

  // ========================
  // LOCAL STATE
  // ========================
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [sort, setSort] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);

  const toursPerPage = 6;

  // ========================
  // FETCH DATA
  // ========================
  useEffect(() => {
    dispatch(getAllTours());
  }, [dispatch]);

  // ========================
  // DEBOUNCE SEARCH
  // ========================
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search.toLowerCase().trim());
      setCurrentPage(1);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  // ========================
  // FILTER + SEARCH + SORT
  // ========================
  const processedTours = useMemo(() => {
    let data = [...tours];

    // SEARCH
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
  }, [tours, debouncedSearch, sort]);

  // ========================
  // PAGINATION
  // ========================
  const totalPages = Math.ceil(processedTours.length / toursPerPage);

  const currentTours = useMemo(() => {
    const start = (currentPage - 1) * toursPerPage;
    return processedTours.slice(start, start + toursPerPage);
  }, [processedTours, currentPage]);

  // ========================
  // LOADING
  // ========================
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500 animate-pulse">Loading tours...</p>
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
          className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
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
            onClick={() => {
              setSearch("");
              setSort("default");
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Reset Filters
          </button>

          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            Go Back
          </button>

        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between gap-4 md:items-center">

        <h1 className="text-3xl font-bold">
           Explore Tours
        </h1>

        {/* SEARCH + SORT */}
        <div className="flex gap-3 flex-col md:flex-row w-full md:w-auto">

          <input
            type="text"
            placeholder="Search tours, location, category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-3 py-2 rounded-xl w-full md:w-72 focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border px-3 py-2 rounded-xl"
          >
            <option value="default">Sort By</option>
            <option value="priceLow">Price: Low → High</option>
            <option value="priceHigh">Price: High → Low</option>
            <option value="rating">Top Rated</option>
          </select>

        </div>

      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">

        {currentTours.map((tour: any) => (
          <div
            key={tour._id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden"
          >

            {/* IMAGE */}
            <div className="relative h-56 w-full">
              <Image
                src={tour.image?.url || "/placeholder.jpg"}
                alt={tour.title || tour.name}
                fill
                className="object-cover"
              />

              <span className="absolute top-3 right-3 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                ${tour.price}
              </span>
            </div>

            {/* CONTENT */}
            <div className="p-5 space-y-3">

              <h2 className="text-xl font-bold text-gray-800">
                {tour.title || tour.name}
              </h2>

              <p className="text-gray-500 text-sm">
                📍 {tour.location || "Unknown location"}
              </p>

              <p className="text-gray-600 text-sm">
                {tour.description?.slice(0, 90)}...
              </p>

              <div className="flex justify-between items-center">
                <span className="text-yellow-500 font-medium">
                  ⭐ {tour.rating || 4.5}
                </span>

                <span className="text-xs text-gray-400">
                  Per person
                </span>
              </div>

              <div className="flex gap-2 pt-2">

                <button
                  onClick={() => router.push(`/tours/${tour._id}`)}
                  className="w-full bg-gray-100 hover:bg-gray-200 py-2 rounded-xl border border-[#00295D] "
                >
                  View
                </button>

                <button className="w-full bg-[#00295D] text-white py-2 rounded-xl">
                  Book Now
                </button>

              </div>

            </div>

          </div>
        ))}

      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 pt-6">

          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>

        </div>
      )}

    </div>
  );
};

export default TourPage;