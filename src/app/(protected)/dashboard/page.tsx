"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function DashboardPage() {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <div className="space-y-6">
      {/*  Header */}
      <div className="bg-white p-5 rounded-2xl shadow flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">My Travel Dashboard </h1>
          <p className="text-gray-500 text-sm">
            Welcome back, {user?.name}
          </p>
        </div>
      </div>

      {/*  Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-gray-500 text-sm">Total Trips</h2>
          <p className="text-3xl font-bold mt-2">5</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-gray-500 text-sm">Upcoming Trips</h2>
          <p className="text-3xl font-bold mt-2">2</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-gray-500 text-sm">Completed Trips</h2>
          <p className="text-3xl font-bold mt-2">3</p>
        </div>
      </div>

      {/* Upcoming Trips */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-lg font-semibold mb-4">Upcoming Trips</h2>

        <ul className="space-y-3 text-sm text-gray-600">
          <li> Sajek Valley Tour - 25 May</li>
          <li> Cox’s Bazar Trip - 10 June</li>
        </ul>
      </div>

      {/*  Recent Bookings */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-lg font-semibold mb-4">Recent Bookings</h2>

        <ul className="space-y-3 text-sm text-gray-600">
          <li> Sylhet Tour (Completed)</li>
          <li> Bandarban Trip (Pending)</li>
        </ul>
      </div>

      {/*  Profile */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-lg font-semibold mb-4">My Profile</h2>

        <div className="space-y-2 text-sm text-gray-700">
          <p><span className="font-medium">Name:</span> {user?.name}</p>
          <p><span className="font-medium">Email:</span> {user?.email}</p>
          <p><span className="font-medium">Role:</span> {user?.role}</p>
        </div>
      </div>
    </div>
  );
}