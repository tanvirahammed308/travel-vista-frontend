"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import Image from "next/image";

import type { AppDispatch } from "@/redux/store";
import { createTour } from "@/redux/features/tour/tourThunk";

const CreateTourPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    duration: "",
    location: "",
  });

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  /* ================= IMAGE HANDLER ================= */
  const handleImage = (file: File | null) => {
    if (!file) {
      setImage(null);
      setPreview(null);
      return;
    }

    //  5MB validation
    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
      Swal.fire({
        icon: "error",
        title: "File too large",
        text: "Image must be less than 5MB",
      });
      return;
    }

    setImage(file);
    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  /* ================= INPUT CHANGE ================= */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* ================= RESET ================= */
  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      price: "",
      duration: "",
      location: "",
    });
    setImage(null);
    setPreview(null);
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!image) {
      return Swal.fire("Error", "Please select an image", "error");
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("price", form.price);
      formData.append("duration", form.duration);
      formData.append("location", form.location);
      formData.append("image", image);

      await dispatch(createTour(formData as any)).unwrap();

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Tour created successfully",
        showConfirmButton: false,
        timer: 1500,
      });

      //  Reset form instead of redirect
      resetForm();
    } catch (error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Failed to create tour",
        showConfirmButton: false,
        timer: 1500,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">

      {/* ================= LEFT FORM ================= */}
      <div className="bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Create Tour</h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* TITLE */}
          <input
            type="text"
            name="title"
            placeholder="Tour Title"
            value={form.title}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          {/* DESCRIPTION */}
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            rows={4}
            required
          />

          {/* PRICE */}
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          {/* DURATION */}
          <input
            type="text"
            name="duration"
            placeholder="Duration (e.g. 3 days)"
            value={form.duration}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          {/* LOCATION */}
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          {/* IMAGE */}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImage(e.target.files?.[0] || null)}
            className="w-full border p-2 rounded"
            required
          />

          {/* SIZE NOTE */}
          <p className="text-sm text-gray-500">
            Max image size: 5MB
          </p>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#00295D] text-white py-2 rounded hover:bg-[#001f47]"
          >
            {loading ? "Creating..." : "Create Tour"}
          </button>
        </form>
      </div>

      {/* ================= RIGHT PREVIEW ================= */}
      <div className="bg-white p-6 rounded shadow sticky top-4 h-fit">

        <h2 className="text-xl font-bold mb-4">Live Preview</h2>

        {/* IMAGE */}
        <div className="relative w-full h-52 border rounded overflow-hidden mb-4">
          {preview ? (
            <Image
              src={preview}
              alt="preview"
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              No Image Selected
            </div>
          )}
        </div>

        {/* TEXT */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">
            {form.title || "Tour Title"}
          </h3>

          <p className="text-gray-500">
            {form.location || "Location"}
          </p>

          <p className="text-sm">
            {form.description || "Tour description will appear here..."}
          </p>

          <p className="font-bold text-[#00295D]">
            ${form.price || "0"}
          </p>

          <p className="text-sm text-gray-600">
            {form.duration || "Duration"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateTourPage;