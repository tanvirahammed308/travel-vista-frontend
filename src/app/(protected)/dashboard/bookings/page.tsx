"use client";

import React from "react";

// 🔥 Icons
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import { AiOutlineIdcard } from "react-icons/ai";

const bookings = [
  {
    id: "B001",
    destination: "Sajek Valley",
    date: "25 May 2026",
    status: "Confirmed",
  },
  {
    id: "B002",
    destination: "Cox's Bazar",
    date: "10 June 2026",
    status: "Pending",
  },
  {
    id: "B003",
    destination: "Sylhet",
    date: "15 April 2026",
    status: "Completed",
  },
];

export default function BookingsPage() {
  return (
    <div className="space-y-6">
      {/*  Header */}
      <div className="bg-white p-5 rounded-2xl shadow">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          📖 My Bookings
        </h1>
        <p className="text-gray-500 text-sm">
          View all your travel bookings here
        </p>
      </div>

      {/*  Table */}
      <div className="bg-white p-5 rounded-2xl shadow overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="border-b text-gray-600">
              <th className="py-3 flex items-center gap-2">
                <AiOutlineIdcard /> Booking ID
              </th>
              <th>
                <span className="flex items-center gap-2">
                  <FaMapMarkerAlt /> Destination
                </span>
              </th>
              <th>
                <span className="flex items-center gap-2">
                  <MdDateRange /> Date
                </span>
              </th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id} className="border-b hover:bg-gray-50">
                <td className="py-3 font-medium flex items-center gap-2">
                  <AiOutlineIdcard className="text-gray-500" />
                  {booking.id}
                </td>

                <td className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-red-500" />
                  {booking.destination}
                </td>

                <td className="flex items-center gap-2">
                  <MdDateRange className="text-blue-500" />
                  {booking.date}
                </td>

                {/*  Status Badge */}
                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium
                      ${
                        booking.status === "Confirmed" &&
                        "bg-green-100 text-green-700"
                      }
                      ${
                        booking.status === "Pending" &&
                        "bg-yellow-100 text-yellow-700"
                      }
                      ${
                        booking.status === "Completed" &&
                        "bg-blue-100 text-blue-700"
                      }
                    `}
                  >
                    {booking.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}