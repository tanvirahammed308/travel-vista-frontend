"use client";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import type { RootState, AppDispatch } from "@/redux/store";
import {
  deleteTour,
  getAllTours,
} from "@/redux/features/tour/tourThunk";

const TourPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  /* ---------------- STATE ---------------- */
  const { tours = [], loading } = useSelector((state: RootState) => ({
    tours: state.tour.tours || [],
    loading: state.tour.loading
  }));

  /* ---------------- PAGINATION ---------------- */
  const [currentPage, setCurrentPage] = useState(1);
  const toursPerPage = 6;

  const totalTours = tours.length;
  const totalPages = Math.ceil(totalTours / toursPerPage);

  const indexOfLastTour = currentPage * toursPerPage;
  const indexOfFirstTour = indexOfLastTour - toursPerPage;

  const currentTours = tours.slice(indexOfFirstTour, indexOfLastTour);

  /*  Reset page when data changes */
  useEffect(() => {
    setCurrentPage(1);
  }, [tours.length]);

  /*  Fix page overflow after delete */
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  /* ---------------- FETCH ---------------- */
  useEffect(() => {
    dispatch(getAllTours());
  }, [dispatch]);

  /* ---------------- DELETE ---------------- */
  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This tour will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
    });

    if (result.isConfirmed) {
      try {
        await dispatch(deleteTour(id)).unwrap();
        
        // Refetch tours after delete
        await dispatch(getAllTours());

        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Tour deleted successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Failed!",
          text: "Failed to delete tour",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  /* ---------------- LOADING ---------------- */
  if (loading && tours.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00295D]"></div>
      </div>
    );
  }

  /* ---------------- EMPTY ---------------- */
  if (!loading && totalTours === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-gray-500">
        <p className="text-xl font-semibold">No tours found</p>
        <p className="text-sm mt-2">
          Create your first tour to get started
        </p>
        <button
          onClick={() => router.push("/admin/tours/create")}
          className="mt-4 bg-[#00295D] text-white px-4 py-2 rounded hover:bg-[#00295D]/90"
        >
          + Create Tour
        </button>
      </div>
    );
  }

  /* ---------------- UI ---------------- */
  return (
    <div className="p-6">

      {/* HEADER */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Tours Management</h2>
          <p className="text-gray-600 mt-1">Total Tours: {totalTours}</p>
        </div>

        <button
          onClick={() => router.push("/admin/tours/create")}
          className="bg-[#00295D] text-white px-4 py-2 rounded hover:bg-[#00295D]/90 transition-colors"
        >
          + Create Tour
        </button>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentTours.map((tour) => (
          <div
            key={tour._id}
            className="border rounded-lg shadow bg-white dark:bg-gray-800 overflow-hidden hover:shadow-lg transition-shadow"
          >
            {/* IMAGE */}
            <div className="relative h-48 w-full">
              <Image
                src={tour.image?.url || "/placeholder.jpg"}
                alt={tour.title}
                fill
                className="object-cover"
              />
            </div>

            {/* CONTENT */}
            <div className="p-4">
              <h2 className="text-lg font-bold dark:text-white">{tour.title}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">📍 {tour.location}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 line-clamp-2">
                {tour.description}
              </p>
              <p className="font-semibold mt-2 text-[#00295D] dark:text-blue-400">${tour.price}</p>
              <p className="text-xs text-gray-500 mt-1">⏱ Duration: {tour.duration}</p>

              {/* ACTION */}
              <div className="flex justify-between gap-2 mt-4">
                <button
                  onClick={() =>
                    router.push(`/admin/tours/update/${tour._id}`)
                  }
                  className="flex-1 bg-[#00295D] text-white px-3 py-2 rounded hover:bg-[#00295D]/90 transition-colors"
                >
                  Update
                </button>

                <button
                  onClick={() => handleDelete(tour._id)}
                  className="flex-1 bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ---------------- PAGINATION ---------------- */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-8 gap-2 flex-wrap">
          {/* PREV */}
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 disabled:opacity-50 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            Previous
          </button>

          {/* PAGE NUMBERS */}
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded transition-colors ${
                currentPage === i + 1
                  ? "bg-[#00295D] text-white"
                  : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              {i + 1}
            </button>
          ))}

          {/* NEXT */}
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 disabled:opacity-50 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default TourPage;