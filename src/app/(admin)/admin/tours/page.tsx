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
  const tours =
    useSelector((state: RootState) => state.tour.tours) || [];

  const loading =
    useSelector((state: RootState) => state.tour.loading);

  /* ---------------- PAGINATION ---------------- */
  const [currentPage, setCurrentPage] = useState(1);
  const toursPerPage = 6;

  const totalTours = tours.length;
  const totalPages = Math.ceil(totalTours / toursPerPage);

  const indexOfLastTour = currentPage * toursPerPage;
  const indexOfFirstTour = indexOfLastTour - toursPerPage;

  const currentTours = tours.slice(indexOfFirstTour, indexOfLastTour);

  /* 🔥 Reset page when data changes */
  useEffect(() => {
    setCurrentPage(1);
  }, [tours.length]);

  /* 🔥 Fix page overflow after delete */
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

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Tour deleted successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Failed to delete tour",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  /* ---------------- LOADING ---------------- */
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Loading tours...</p>
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
      </div>
    );
  }

  /* ---------------- UI ---------------- */
  return (
    <div className="p-6">

      {/* HEADER */}
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-xl font-bold">
          Total Tours: {totalTours}
        </h2>

        <button
          onClick={() => router.push("/admin/tours/create")}
          className="bg-[#00295D] text-white px-4 py-2 rounded"
        >
          + Create Tour
        </button>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {currentTours.map((tour) => (
          <div
            key={tour._id}
            className="border rounded-lg shadow bg-white overflow-hidden"
          >
            {/* IMAGE */}
            <div className="relative h-40 w-full">
              <Image
                src={tour.image?.url || "/placeholder.jpg"}
                alt={tour.title}
                fill
                className="object-cover"
              />
            </div>

            {/* CONTENT */}
            <div className="p-4">
              <h2 className="text-lg font-bold">{tour.title}</h2>
              <p className="text-sm text-gray-500">{tour.location}</p>
              <p className="font-semibold mt-1">${tour.price}</p>

              {/* ACTION */}
              <div className="flex justify-between gap-2 mt-3">
                <button
                  onClick={() =>
                    router.push(`/admin/tours/update/${tour._id}`)
                  }
                  className="bg-[#00295D] text-white px-3 py-1 rounded"
                >
                  Update
                </button>

                <button
                  onClick={() => handleDelete(tour._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ---------------- PAGINATION (ONLY IF > 6) ---------------- */}
      {totalTours > toursPerPage && (
        <div className="flex justify-center items-center mt-6 gap-2 flex-wrap">

          {/* PREV */}
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
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
                  ? "bg-[#00295D] text-white"
                  : "bg-gray-200"
              }`}
            >
              {i + 1}
            </button>
          ))}

          {/* NEXT */}
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default TourPage;