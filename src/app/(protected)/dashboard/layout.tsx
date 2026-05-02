"use client";

import { RootState } from "@/redux/store";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

// Icons
import { FaHome, FaSuitcase, FaUser } from "react-icons/fa";
import { MdBookOnline } from "react-icons/md";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  const { user, isAuthenticated, isCheckingAuth } = useSelector(
    (state: RootState) => state.auth
  );

  const router = useRouter();
  const pathname = usePathname();

  // 🔥 PROTECT ROUTE
  useEffect(() => {
    if (isCheckingAuth) return;

    if (!isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, isCheckingAuth, router]);

  // 🔥 LOADING STATE
  if (isCheckingAuth) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  // 🔥 BLOCK UI IF NOT AUTHENTICATED
  if (!isAuthenticated) return null;

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}
      <div className="w-64 bg-[#02234F] text-white p-5">

        <h1 className="text-2xl font-bold mb-8">TripVista</h1>

        <ul className="space-y-3 text-sm">

          <li>
            <Link
              href="/dashboard"
              className={`flex items-center gap-2 p-2 rounded ${
                pathname === "/dashboard" ? "bg-white text-black" : ""
              }`}
            >
              <FaHome />
              Dashboard
            </Link>
          </li>

          <li>
            <Link
              href="/dashboard/bookings/my-bookings"
              className={`flex items-center gap-2 p-2 rounded ${
                pathname === "/dashboard/bookings/my-bookings" ? "bg-white text-black" : ""
              }`}
            >
              <MdBookOnline />
              My Bookings
            </Link>
          </li>

          <li>
            <Link
              href="/dashboard/trips"
              className={`flex items-center gap-2 p-2 rounded ${
                pathname === "/dashboard/trips" ? "bg-white text-black" : ""
              }`}
            >
              <FaSuitcase />
              My Trips
            </Link>
          </li>

          <li>
            <Link
              href="/dashboard/profile"
              className={`flex items-center gap-2 p-2 rounded ${
                pathname === "/dashboard/profile" ? "bg-white text-black" : ""
              }`}
            >
              <FaUser />
              Profile
            </Link>
          </li>

        </ul>

        {/* USER INFO */}
        <div className="mt-10 border-t pt-4 text-sm">
          <p className="font-semibold">{user?.name}</p>
          <p className="text-gray-200">{user?.email}</p>
        </div>

      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-6">{children}</div>

    </div>
  );
};

export default ProtectedLayout;