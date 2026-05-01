"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";

import type { AppDispatch } from "@/redux/store";
import { getTourById, updateTour } from "@/redux/features/tour/tourThunk";

type TourFormData = {
  title: string;
  description: string;
  price: string;
  duration: string;
  location: string;
};

const UpdateTourPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { id } = useParams();

  const [loading, setLoading] = useState(false);

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [existingImage, setExistingImage] = useState<string | null>(null);

  /* ---------------- REACT HOOK FORM ---------------- */
  const {
    register,
    handleSubmit,
    reset,
    watch, // ✅ IMPORTANT FIX (for live preview)
  } = useForm<TourFormData>();

  const watchedValues = watch(); // ✅ LIVE FORM DATA

  /* ---------------- FETCH TOUR ---------------- */
  useEffect(() => {
    const fetchTour = async () => {
      try {
        const res = await dispatch(getTourById(id as string)).unwrap();
        const tour = res?.tour;

        reset({
          title: tour?.title || "",
          description: tour?.description || "",
          price: String(tour?.price || ""),
          duration: tour?.duration || "",
          location: tour?.location || "",
        });

        setExistingImage(tour?.image?.url || null);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Failed to load tour",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    };

    if (id) fetchTour();
  }, [id, dispatch, reset]);

  /* ---------------- IMAGE ---------------- */
  const handleImage = (file: File | null) => {
    setImage(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  /* ---------------- SUBMIT ---------------- */
  const onSubmit = async (data: TourFormData) => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("price", data.price);
      formData.append("duration", data.duration);
      formData.append("location", data.location);

      if (image) {
        formData.append("image", image);
      }

      await dispatch(
        updateTour({
          id: id as string,
          data: formData as any,
        })
      ).unwrap();

      Swal.fire({
        icon: "success",
        title: "Tour updated successfully",
        position: "top-end",
        timer: 1500,
        showConfirmButton: false,
      });

      router.push("/admin/tours");
    } catch (error) {
      Swal.fire({
          icon: "error",
          position: "top-end",
          title: "Update failed",
            timer: 1500,
        showConfirmButton: false,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">

      {/* ================= FORM ================= */}
      <div className="bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Update Tour</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          <input
            {...register("title")}
            type="text"
            placeholder="Title"
            className="w-full border p-2 rounded"
          />

          <textarea
            {...register("description")}
            placeholder="Description"
            className="w-full border p-2 rounded"
            rows={4}
          />

          <input
            {...register("price")}
            type="number"
            placeholder="Price"
            className="w-full border p-2 rounded"
          />

          <input
            {...register("duration")}
            type="text"
            placeholder="Duration"
            className="w-full border p-2 rounded"
          />

          <input
            {...register("location")}
            type="text"
            placeholder="Location"
            className="w-full border p-2 rounded"
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImage(e.target.files?.[0] || null)}
            className="w-full border p-2 rounded"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#00295D] text-white py-2 rounded"
          >
            {loading ? "Updating..." : "Update Tour"}
          </button>
        </form>
      </div>

      {/* ================= PREVIEW ================= */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Live Preview</h2>

        {/* IMAGE */}
        <div className="relative w-full h-52 border rounded overflow-hidden mb-4">
          {preview ? (
            <Image src={preview} alt="preview" fill className="object-cover" />
          ) : existingImage ? (
            <Image src={existingImage} alt="existing" fill className="object-cover" />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              No Image
            </div>
          )}
        </div>

        {/* TEXT LIVE PREVIEW */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">
            {watchedValues.title || "Title"}
          </h3>

          <p className="text-gray-500">
            {watchedValues.location || "Location"}
          </p>

          <p>
            {watchedValues.description || "Description"}
          </p>

          <p className="font-bold text-[#00295D]">
            ${watchedValues.price || "0"}
          </p>

          <p className="text-sm text-gray-600">
            {watchedValues.duration || "Duration"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UpdateTourPage;