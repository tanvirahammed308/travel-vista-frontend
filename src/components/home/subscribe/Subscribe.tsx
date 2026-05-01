"use client";

import { FaPaperPlane } from "react-icons/fa";

const Subscribe = () => {
  return (
    <section className="py-16 bg-[#052658]">
      <div className="max-w-4xl mx-auto px-6 text-center">

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-white">
           Get Travel Deals & Offers
        </h2>

        <p className="text-blue-100 mt-2">
          Subscribe to our newsletter and never miss exclusive travel discounts
        </p>

        {/* Input Box */}
        <div className="mt-8 flex flex-col md:flex-row items-center gap-4 border border-white rounded-md">
          
          <input
            type="email"
            placeholder="Enter your email address"
            className="w-full md:flex-1 px-4 py-3 rounded-md focus:outline-none text-white"
          />

          <button className="flex items-center justify-center gap-2 bg-white text-[#052658] font-semibold px-6 py-3 rounded-md hover:bg-gray-100 transition my-5 md:my-0">
            <FaPaperPlane />
            Subscribe
          </button>

        </div>

        {/* Small text */}
        <p className="text-blue-100 text-sm mt-4">
          We respect your privacy. No spam ever.
        </p>

      </div>
    </section>
  );
};

export default Subscribe;