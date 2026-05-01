"use client";

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import type { RootState, AppDispatch } from "@/redux/store";
import { getAllTours } from "@/redux/features/tour/tourThunk";

const PackagePage = () => {
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
  const [filter, setFilter] = useState("all");

  // ⭐ PAGINATION STATE
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

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
      setCurrentPage(1); // reset page
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  // reset page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  // ========================
  // FILTER + SEARCH
  // ========================
  const filteredPackages = useMemo(() => {
    let data = [...tours];

    // SEARCH
    if (debouncedSearch) {
      data = data.filter((item: any) => {
        const text = `
          ${item.title || ""}
          ${item.location || ""}
          ${item.category || ""}
          ${item.description || ""}
        `.toLowerCase();

        return text.includes(debouncedSearch);
      });
    }

    // FILTER
    if (filter !== "all") {
      data = data.filter((item: any) => item.category === filter);
    }

    return data;
  }, [tours, debouncedSearch, filter]);

  // ========================
  // PAGINATION LOGIC
  // ========================
  const totalPages = Math.ceil(filteredPackages.length / itemsPerPage);

  const currentPackages = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredPackages.slice(start, start + itemsPerPage);
  }, [filteredPackages, currentPage]);

  // ========================
  // LOADING
  // ========================
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 animate-pulse">Loading packages...</p>
      </div>
    );
  }

  // ========================
  // EMPTY
  // ========================
  if (!loading && filteredPackages.length === 0) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center text-gray-500 space-y-3">
        <p className="text-2xl font-semibold">No packages found 😕</p>

        <button
          onClick={() => router.push("/")}
          className="px-4 py-2 bg-[#052658] text-white rounded-lg "
        >
          Go Home
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between gap-4 md:items-center">

        <h1 className="text-3xl font-bold">
           Travel Packages
        </h1>

        {/* SEARCH + FILTER */}
        <div className="flex gap-3 flex-col md:flex-row">

          <input
            type="text"
            placeholder="Search packages..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-3 py-2 rounded-xl w-full md:w-72 focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border px-3 py-2 rounded-xl"
          >
            <option value="all">All Categories</option>
            <option value="adventure">Adventure</option>
            <option value="beach">Beach</option>
            <option value="hill">Hill</option>
          </select>

        </div>

      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {currentPackages.map((pkg: any) => (
          <div
            key={pkg._id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden"
          >

            <div className="relative h-52 w-full">
              <Image
                src={pkg.image?.url || "/placeholder.jpg"}
                alt={pkg.title}
                fill
                className="object-cover"
              />

              <span className="absolute top-3 left-3 bg-black/70 text-white text-xs px-3 py-1 rounded-full">
                {pkg.category || "Package"}
              </span>

              <span className="absolute top-3 right-3 bg-[#052658] text-white text-sm px-3 py-1 rounded-full">
                ${pkg.price}
              </span>
            </div>

            <div className="p-5 space-y-3">

              <h2 className="text-xl font-bold text-gray-800">
                {pkg.title}
              </h2>

              <p className="text-gray-500 text-sm">
                📍 {pkg.location}
              </p>

              <p className="text-gray-600 text-sm">
                {pkg.description?.slice(0, 90)}...
              </p>

              <div className="flex justify-between text-sm text-gray-500">
                <span>⏱ {pkg.duration || "3 Days"}</span>
                <span>⭐ {pkg.rating || 4.5}</span>
              </div>

              <button
                onClick={() => router.push(`/packages/${pkg._id}`)}
                className="w-full bg-[#052658] text-white py-2 rounded-xl hover:bg-[#052658]/90 transition"
              >
                View Package
              </button>

            </div>

          </div>
        ))}

      </div>

      {/* ========================
          PAGINATION UI
      ======================== */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 pt-6">

          {/* PREV */}
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Prev
          </button>

          {/* PAGE NUMBERS */}
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1
                  ? "bg-[#052658] text-white"
                  : "bg-gray-200"
              }`}
            >
              {i + 1}
            </button>
          ))}

          {/* NEXT */}
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>

        </div>
      )}

    </div>
  );
};

export default PackagePage;