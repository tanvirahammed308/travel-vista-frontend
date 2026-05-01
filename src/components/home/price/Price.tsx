"use client";

import { FaCheckCircle } from "react-icons/fa";

const plans = [
  {
    id: 1,
    name: "Budget Package",
    price: 4999,
    features: [
      "2 Days / 1 Night Tour",
      "Standard Hotel Stay",
      "Shared Transport",
      "Breakfast Included",
    ],
    highlight: false,
  },
  {
    id: 2,
    name: "Standard Package",
    price: 8999,
    features: [
      "3 Days / 2 Nights Tour",
      "3 Star Hotel",
      "AC Transport",
      "Breakfast + Dinner",
    ],
    highlight: true,
  },
  {
    id: 3,
    name: "Premium Package",
    price: 14999,
    features: [
      "5 Days / 4 Nights Tour",
      "5 Star Luxury Hotel",
      "Private Transport",
      "All Meals Included",
    ],
    highlight: false,
  },
];

const Price = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800">
             Travel Packages
          </h2>
          <p className="text-gray-500 mt-2">
            Choose the perfect plan for your journey
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-2xl p-8 shadow-md transition duration-300 hover:shadow-xl bg-white ${
                plan.highlight ? "border-2 border-[#052658] scale-105" : ""
              }`}
            >
              {/* Title */}
              <h3 className="text-xl font-semibold text-gray-800">
                {plan.name}
              </h3>

              {/* Price */}
              <p className="text-3xl font-bold text-[#052658] mt-4">
                ${plan.price}
              </p>

              <p className="text-gray-500 text-sm mb-6">
                per person
              </p>

              {/* Features */}
              <ul className="space-y-3">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <FaCheckCircle className="text-green-500 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Button */}
              <button className="mt-8 w-full py-2 rounded-lg bg-[#052658] text-white  transition">
                Book Now
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Price;