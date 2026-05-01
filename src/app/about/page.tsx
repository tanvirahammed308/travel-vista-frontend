"use client";

import { useRouter } from "next/navigation";

const AboutPage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50">

      {/* HERO SECTION */}
      <div className="bg-gradient-to-r from-[#052658] to-[#1a3a6c] text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold">
          About Our Travel Platform
        </h1>
        <p className="mt-4 text-lg text-blue-100 max-w-2xl mx-auto">
          We help you discover amazing tours, travel packages, and unforgettable experiences around the world.
        </p>

        <button
          onClick={() => router.push("/tours")}
          className="mt-6 px-6 py-3 bg-white text-blue-700 font-semibold rounded-xl hover:bg-gray-100 transition"
        >
          Explore Tours
        </button>
      </div>

      {/* CONTENT SECTION */}
      <div className="max-w-6xl mx-auto px-6 py-16 space-y-16">

        {/* INTRO */}
        <section className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-gray-800">
            Who We Are
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We are a modern travel platform dedicated to making your journey easier,
            safer, and more enjoyable. From adventure tours to relaxing beach packages,
            we bring everything in one place so you can travel without stress.
          </p>
        </section>

        {/* MISSION & VISION */}
        <section className="grid md:grid-cols-2 gap-8">

          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h3 className="text-xl font-bold text-blue-600 mb-2">
              Our Mission
            </h3>
            <p className="text-gray-600">
              To make travel accessible and affordable for everyone by offering
              curated tours and personalized travel experiences.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h3 className="text-xl font-bold text-blue-600 mb-2">
              Our Vision
            </h3>
            <p className="text-gray-600">
              To become the most trusted travel platform in Bangladesh and beyond,
              connecting travelers with unforgettable destinations.
            </p>
          </div>

        </section>

        {/* WHY CHOOSE US */}
        <section>
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
            Why Choose Us
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

            <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
              <h4 className="font-semibold text-lg">🌍 Best Destinations</h4>
              <p className="text-gray-600 text-sm mt-2">
                Carefully selected travel locations for the best experience.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
              <h4 className="font-semibold text-lg">💰 Affordable Price</h4>
              <p className="text-gray-600 text-sm mt-2">
                We provide budget-friendly travel packages for everyone.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
              <h4 className="font-semibold text-lg">🛡️ Trusted Service</h4>
              <p className="text-gray-600 text-sm mt-2">
                Safe booking system with verified tour providers.
              </p>
            </div>

          </div>
        </section>

        {/* STATS */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-2xl font-bold text-blue-600">100+</h3>
            <p className="text-gray-600 text-sm">Tours</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-2xl font-bold text-blue-600">50+</h3>
            <p className="text-gray-600 text-sm">Destinations</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-2xl font-bold text-blue-600">10K+</h3>
            <p className="text-gray-600 text-sm">Happy Users</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-2xl font-bold text-blue-600">24/7</h3>
            <p className="text-gray-600 text-sm">Support</p>
          </div>

        </section>

        {/* CTA */}
        <section className="text-center bg-[#052658] text-white p-10 rounded-2xl">
          <h2 className="text-2xl font-bold">
            Ready to start your journey?
          </h2>
          <p className="mt-2 text-blue-100">
            Explore our latest tours and packages now.
          </p>

          <button
            onClick={() => router.push("/packages")}
            className="mt-5 px-6 py-3 bg-white text-blue-700 font-semibold rounded-xl hover:bg-gray-100 transition"
          >
            View Packages
          </button>
        </section>

      </div>
    </div>
  );
};

export default AboutPage;