"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import { FaMapMarkerAlt, FaStar } from "react-icons/fa";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type Package = {
  title: string;
  location: string;
  price: string;
  image: string;
  rating?: number;
  tag?: string;
};

const packages: Package[] = [
  {
    title: "Cox's Bazar Tour",
    location: "Chattogram",
    price: "$120",
    image: "/images/popular/popular1.jpg",
    rating: 4.8,
    tag: "Hot Deal",
  },
  {
    title: "Sajek Valley Trip",
    location: "Rangamati",
    price: "$90",
   image: "/images/popular/popular2.jpg",
    rating: 4.7,
    tag: "Popular",
  },
  {
    title: "Sundarbans Adventure",
    location: "Khulna",
    price: "$150",
    image: "/images/popular/popular3.jpg",
    rating: 4.9,
    tag: "Wild Tour",
  },
  {
    title: "Sylhet Green Tour",
    location: "Sylhet",
    price: "$110",
    image: "/images/popular/popular4.jpg",
    rating: 4.6,
    tag: "Nature",
  },
];

const Popular = () => {
  return (
    <section className="py-10 md:py-16 px-3 sm:px-4 md:px-10 bg-gray-50">

      {/* Heading */}
      <div className="text-center mb-8 md:mb-10 px-2">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
          Popular Packages
        </h2>
        <p className="text-gray-500 mt-2 text-sm sm:text-base">
          Explore best travel deals in Bangladesh
        </p>
      </div>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={16}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        breakpoints={{
          480: { slidesPerView: 1.2, spaceBetween: 16 },
          640: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 3, spaceBetween: 25 },
        }}
        className="popular-swiper pb-10"
      >
        {packages.map((item, index) => (
          <SwiperSlide key={index}>
            
            <div className="group rounded-2xl overflow-hidden shadow-md bg-white hover:shadow-xl transition duration-300 mx-1 sm:mx-0">

              {/* Image */}
              <div className="relative w-full h-52 sm:h-56 md:h-60 overflow-hidden">

                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-110"
                />

                {/* gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>

                {/* tag */}
                {item.tag && (
                  <div className="absolute top-3 left-3 bg-white/90 text-black text-[10px] sm:text-xs px-2 sm:px-3 py-1 rounded-full font-semibold">
                    {item.tag}
                  </div>
                )}

                {/* price */}
                <div className="absolute top-3 right-3 bg-[#052658] text-white px-2 sm:px-3 py-1 rounded-full text-[11px] sm:text-sm font-semibold">
                  {item.price}
                </div>

                {/* rating */}
                <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/60 text-white px-2 py-1 rounded-full text-[10px] sm:text-xs">
                  <FaStar className="text-yellow-400 text-xs" />
                  {item.rating}
                </div>

              </div>

              {/* Content */}
              <div className="p-4 sm:p-5">

                <h3 className="text-lg sm:text-xl font-semibold  transition">
                  {item.title}
                </h3>

                <div className="flex items-center gap-2 text-gray-500 mt-1 text-sm">
                  <FaMapMarkerAlt />
                  <p>{item.location}</p>
                </div>

                <button className="mt-4 w-full bg-[#052658] text-white py-2 rounded-xl 
                  active:scale-[0.98] transition">
                  Book Now
                </button>

              </div>

            </div>

          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Popular;