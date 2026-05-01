"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import Image from "next/image";

const ProfilePage = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  // 🔒 যদি login না থাকে
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-gray-500 space-y-4">
        <p className="text-xl font-semibold">You are not logged in 😕</p>

        <button
          onClick={() => router.push("/login")}
          className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      {/* HEADER */}
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6">

        {/* PROFILE IMAGE */}
        <div className="relative w-32 h-32 rounded-full overflow-hidden border">
          <Image
            src={user?.avatar?.url || "/images/user.png"}
            alt="profile"
            fill
            className="object-cover"
          />
        </div>

        {/* USER INFO */}
        <div className="flex-1 text-center md:text-left space-y-2">
          <h1 className="text-2xl font-bold text-gray-800">
            {user.name || "User Name"}
          </h1>

          <p className="text-gray-500">
            {user.email}
          </p>

          <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-600 text-sm rounded-full">
            {user.role}
          </span>
        </div>

        {/* ACTION BUTTON */}
        <button
          onClick={() => router.push("/profile/edit")}
          className="px-5 py-2 bg-[#052658] text-white rounded-lg "
        >
          Edit Profile
        </button>
      </div>

      {/* EXTRA INFO */}
      <div className="max-w-5xl mx-auto mt-6 grid md:grid-cols-3 gap-6">

        {/* BOOKINGS */}
        <div className="bg-white p-5 rounded-xl shadow text-center">
          <h3 className="text-lg font-semibold text-gray-700">
            My Bookings
          </h3>
          <p className="text-2xl font-bold text-blue-600 mt-2">
            {user.bookings?.length || 0}
          </p>
        </div>

        {/* FAVORITES */}
        <div className="bg-white p-5 rounded-xl shadow text-center">
          <h3 className="text-lg font-semibold text-gray-700">
            Wishlist
          </h3>
          <p className="text-2xl font-bold text-blue-600 mt-2">
            {user.wishlist?.length || 0}
          </p>
        </div>

        {/* REVIEWS */}
        <div className="bg-white p-5 rounded-xl shadow text-center">
          <h3 className="text-lg font-semibold text-gray-700">
            Reviews
          </h3>
          <p className="text-2xl font-bold text-blue-600 mt-2">
            {user.reviews?.length || 0}
          </p>
        </div>

      </div>

      {/* ACCOUNT DETAILS */}
      <div className="max-w-5xl mx-auto mt-6 bg-white p-6 rounded-2xl shadow space-y-4">

        <h2 className="text-xl font-bold text-gray-800">
          Account Information
        </h2>

        <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">

          <p>
            <span className="font-semibold">Name:</span> {user.name}
          </p>

          <p>
            <span className="font-semibold">Email:</span> {user.email}
          </p>

          <p>
            <span className="font-semibold">Role:</span> {user.role}
          </p>

          <p>
            <span className="font-semibold">Member Since:</span>{" "}
            {user.createdAt
              ? new Date(user.createdAt).toLocaleDateString()
              : "N/A"}
          </p>

        </div>

      </div>

    </div>
  );
};

export default ProfilePage;