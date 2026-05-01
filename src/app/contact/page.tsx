"use client";

import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const Contact = () => {
  return (
    <section className="py-16 px-4 md:px-10 bg-gradient-to-br from-blue-50 via-white to-gray-100">

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">

        {/* LEFT: Contact Info */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Get In Touch 
          </h2>
          <p className="text-gray-500 mt-3">
            Planning your next trip? We’re here to help you anytime.
          </p>

          <div className="mt-8 space-y-6">

            {/* Item */}
            <div className="flex items-center gap-4 group">
              <div className="p-3 rounded-full bg-blue-100 text-[#012551] ">
                <FaMapMarkerAlt />
              </div>
              <div>
                <h4 className="font-semibold">Address</h4>
                <p className="text-gray-500 text-sm">Dhaka, Bangladesh</p>
              </div>
            </div>

            <div className="flex items-center gap-4 group">
              <div className="p-3 rounded-full bg-blue-100 text-[#012551] ">
                <FaPhoneAlt />
              </div>
              <div>
                <h4 className="font-semibold">Phone</h4>
                <p className="text-gray-500 text-sm">+880 1234 567 890</p>
              </div>
            </div>

            <div className="flex items-center gap-4 group">
              <div className="p-3 rounded-full bg-blue-100 text-[#012551] group-hover:text-white ">
                <FaEnvelope />
              </div>
              <div>
                <h4 className="font-semibold">Email</h4>
                <p className="text-gray-500 text-sm">info@travelbangla.com</p>
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT: Contact Form */}
        <div className="backdrop-blur-lg bg-white/80 border border-white/30 p-6 md:p-8 rounded-2xl shadow-xl">

          <form className="space-y-5">

            <div>
              <label className="text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full mt-1 px-4 py-3 border rounded-xl focus:outline-none "
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full mt-1 px-4 py-3 border rounded-xl focus:outline-none "
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                rows={4}
                placeholder="Write your message..."
                className="w-full mt-1 px-4 py-3 border rounded-xl focus:outline-none  transition"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-[#012551] text-white py-3 rounded-xl font-semibold 
           active:scale-[0.98] transition duration-300 shadow-md"
            >
              Send Message 
            </button>

          </form>

        </div>

      </div>
    </section>
  );
};

export default Contact;