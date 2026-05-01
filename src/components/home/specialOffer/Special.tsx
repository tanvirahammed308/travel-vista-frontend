"use client";

import { FaMapMarkerAlt, FaClock } from "react-icons/fa";

const offers = [
  {
    id: 1,
    title: "Cox's Bazar Sea Beach",
    location: "Cox's Bazar, Bangladesh",
    price: 8500,
    oldPrice: 12000,
    duration: "3 Days / 2 Nights",
    image:
      "/images/hero/hero1.jpg",
    discount: "30% OFF",
  },
  {
    id: 2,
    title: "Sajek Valley Tour",
    location: "Rangamati, Bangladesh",
    price: 6500,
    oldPrice: 9000,
    duration: "2 Days / 1 Night",
    image:
      "/images/hero/hero2.jpg",
    discount: "25% OFF",
  },
  {
    id: 3,
    title: "Sundarbans Adventure",
    location: "Khulna, Bangladesh",
    price: 11000,
    oldPrice: 15000,
    duration: "3 Days / 2 Nights",
   image:
      "/images/hero/hero3.jpg",
    discount: "20% OFF",
  },
];

const Special = () => {
  return (
    <section className="py-16 bg-[#052658]">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
        
        {/* Heading */}
        <div className="text-center mb-12">
          <h6 className="text-sm  text-gray-300">
            Get Some
          </h6>
          <h2 className="text-white mt-2 font-bold text-4xl">
            Special Offers...
          </h2>
          <button className="text-white border-2 border-gray-500 rounded-md px-4 py-2 mt-4 font-bold">View More</button>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-3xl">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 group"
            >
              
              {/* Image */}
              <div className="relative">
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="h-60 w-full object-cover group-hover:scale-110 transition duration-500"
                />

                {/* Discount Badge */}
                <span className="absolute top-4 left-4 bg-red-500 text-white text-sm px-3 py-1 rounded-full shadow">
                  {offer.discount}
                </span>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-xl font-semibold text-gray-800">
                  {offer.title}
                </h3>

                <p className="flex items-center text-gray-500 text-sm mt-1">
                  <FaMapMarkerAlt className="mr-2" /> {offer.location}
                </p>

                <p className="flex items-center text-gray-500 text-sm mt-1">
                  <FaClock className="mr-2" /> {offer.duration}
                </p>

                {/* Price */}
                <div className="mt-4 flex items-center gap-3">
                  <span className="text-2xl font-bold text-[#052658]">
                    ${offer.price}
                  </span>
                  <span className="line-through text-gray-400">
                    ${offer.oldPrice}
                  </span>
                </div>

                
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Special;