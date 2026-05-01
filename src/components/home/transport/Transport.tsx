"use client";

import { FaBus, FaTrain, FaPlane, FaShip } from "react-icons/fa";

const transportServices = [
  {
    id: 1,
    title: "Luxury Bus Service",
    description: "Comfortable AC/Non-AC buses for all tourist routes in Bangladesh.",
    icon: FaBus,
  },
  {
    id: 2,
    title: "Train Booking",
    description: "Easy train ticket booking for long-distance travel across cities.",
    icon: FaTrain,
  },
  {
    id: 3,
    title: "Air Travel Support",
    description: "Domestic & international flight booking at best prices.",
    icon: FaPlane,
  },
  {
    id: 4,
    title: "River Cruise",
    description: "Enjoy scenic river journeys with premium cruise facilities.",
    icon: FaShip,
  },
];

const Transport = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800">
             Transport Facilities
          </h2>
          <p className="text-gray-500 mt-2">
            We provide all types of travel transportation support for your journey
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-6">
          {transportServices.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="p-6 bg-gray-50 rounded-2xl shadow hover:shadow-xl transition duration-300 text-center group"
              >
                <div className="flex justify-center mb-4">
                  <Icon className="text-4xl text-[#052658] group-hover:scale-110 transition" />
                </div>

                <h3 className="text-lg font-semibold text-gray-800">
                  {item.title}
                </h3>

                <p className="text-sm text-gray-500 mt-2">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Transport;