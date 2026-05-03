"use client";

import React from "react";
import Image from "next/image";

//  Icons
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";

const trips = [
  {
    id: 1,
    title: "Sajek Valley Tour",
    location: "Rangamati",
    date: "25 May 2026",
    
  },
  {
    id: 2,
    title: "Cox's Bazar Trip",
    location: "Chattogram",
    date: "10 June 2026",
    
  },
  {
    id: 3,
    title: "Sylhet Tea Garden",
    location: "Sylhet",
    date: "15 April 2026",
    
  },
];

export default function TripsPage() {
  return (
    <div className="space-y-6">
      {/*  Header */}
      <div className="bg-white p-5 rounded-2xl shadow">
        <h1 className="text-2xl font-bold"> My Trips</h1>
        <p className="text-gray-500 text-sm">
          Explore your upcoming and past trips
        </p>
      </div>

      {/*  Trip Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {trips.map((trip) => (
          <div
            key={trip.id}
            className="bg-white rounded-2xl shadow overflow-hidden hover:shadow-lg transition"
          >
            

            {/* Content */}
            <div className="p-4 space-y-2">
              <h2 className="text-lg font-semibold">{trip.title}</h2>

              <p className="flex items-center gap-2 text-sm text-gray-600">
                <FaMapMarkerAlt className="text-red-500" />
                {trip.location}
              </p>

              <p className="flex items-center gap-2 text-sm text-gray-600">
                <MdDateRange className="text-blue-500" />
                {trip.date}
              </p>

              {/* Button */}
              <button className="mt-3 w-full bg-[#02234F] text-white py-2 rounded-lg hover:bg-blue-700 transition">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}