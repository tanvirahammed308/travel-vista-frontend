"use client";

import { FaSearch, FaMapMarkedAlt, FaCheckCircle } from "react-icons/fa";

const steps = [
  {
    id: 1,
    title: "Search Destination",
    description: "Find your perfect travel destination from hundreds of amazing places.",
    icon: FaSearch,
  },
  {
    id: 2,
    title: "Choose Package",
    description: "Select the best travel package that suits your budget and needs.",
    icon: FaMapMarkedAlt,
  },
  {
    id: 3,
    title: "Book & Enjoy",
    description: "Confirm your booking and enjoy a smooth and memorable journey.",
    icon: FaCheckCircle,
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800">
             How It Works
          </h2>
          <p className="text-gray-500 mt-2">
            Simple steps to plan your perfect trip
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-10">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.id}
                className="text-center p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300 bg-gray-50"
              >
                {/* Step Number */}
                <div className="text-[#052658] font-bold text-lg mb-3">
                  Step {index + 1}
                </div>

                {/* Icon */}
                <div className="flex justify-center mb-4">
                  <Icon className="text-5xl text-[#052658]" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-gray-800">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-gray-500 mt-2 text-sm">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;