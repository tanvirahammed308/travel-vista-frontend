"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import type { RootState, AppDispatch } from "@/redux/store";
import { getAllTours } from "@/redux/features/tour/tourThunk";

const TourDetailsPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const { tours = [], loading } = useSelector(
    (state: RootState) => state.tour
  );

  // ========================
  // FETCH ONLY IF EMPTY
  // ========================
  useEffect(() => {
    if (!tours.length) {
      dispatch(getAllTours());
    }
  }, [dispatch, tours.length]);

  // ========================
  // FIND TOUR
  // ========================
  const tour = tours.find((t: any) => t._id === id);

  // ========================
  // LOADING UI
  // ========================
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 animate-pulse">Loading tour details...</p>
      </div>
    );
  }

  // ========================
  // NOT FOUND UI
  // ========================
  if (!tour) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4 text-gray-500">
        <p className="text-2xl font-semibold">Tour not found 😕</p>

        <div className="flex gap-3">
          <button
            onClick={() => router.push("/tours")}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Tours
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

  // ========================
  // MAIN UI
  // ========================
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">

      {/* BACK BUTTON */}
      <button
        onClick={() => router.back()}
        className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
      >
        ← Back
      </button>

      {/* TOP SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white shadow-lg rounded-2xl overflow-hidden">

        {/* IMAGE */}
        <div className="relative w-full h-80 md:h-full">
          <Image
            src={tour.image?.url || "/placeholder.jpg"}
            alt={tour.title}
            fill
            className="object-cover"
          />
        </div>

        {/* DETAILS */}
        <div className="p-6 space-y-4">

          <h1 className="text-3xl font-bold text-gray-800">
            {tour.title}
          </h1>

          <p className="text-gray-500">
            📍 {tour.location}
          </p>

          <p className="text-gray-600 leading-relaxed">
            {tour.description}
          </p>

          {/* PRICE + RATING */}
          <div className="flex justify-between items-center pt-4">

            <div className="text-2xl font-bold text-[#00295D]">
              ${tour.price}
            </div>

            <div className="text-yellow-500 font-medium">
              ⭐ {tour.rating || 4.5}
            </div>

          </div>

          {/* META */}
          <div className="space-y-2 text-sm text-gray-500">

            <p>🏷️ Category: {tour.category || "N/A"}</p>
            <p>👥 Max People: {tour.maxPeople || "Unlimited"}</p>
            <p>📅 Duration: {tour.duration || "Flexible"}</p>

          </div>

          {/* BUTTONS */}
          <div className="flex gap-3 pt-6">

            <button className="w-full bg-[#00295D] text-white py-3 rounded-xl  transition">
              Book Now
            </button>

            <button className="w-full border border-[#00295D] py-3 rounded-xl  transition">
              Add to Wishlist
            </button>

          </div>

        </div>
      </div>

      {/* EXTRA INFO */}
      <div className="bg-white shadow-md rounded-2xl p-6 space-y-3">

        <h2 className="text-xl font-bold">About this tour</h2>

        <p className="text-gray-600 leading-relaxed">
          {tour.longDescription || tour.description || "No additional details available."}
        </p>

      </div>

    </div>
  );
};

export default TourDetailsPage;