"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

// CSS import (better way: move to globals.css if needed)
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

/* //  Images
import hero1 from "../../../public/images/hero/hero1.jpg";
import hero2 from "../../../public/images/hero/hero2.jpg";
import hero3 from "../../../public/images/hero/hero3.jpg"; */

//  Slides data
const slides = [
  {
    id: 1,
    title: "Explore Cox’s Bazar",
    desc: "Discover the longest sea beach in the world",
    image: '/images/hero/hero1.jpg',
  },
  {
    id: 2,
    title: "Visit Sundarbans",
    desc: "Home of the Royal Bengal Tiger",
    image: '/images/hero/hero2.jpg',
  },
  {
    id: 3,
    title: "Sylhet Adventure",
    desc: "Tea gardens, hills and waterfalls",
    image: '/images/hero/hero3.jpg',
  },
];

export default function HeroCarousel() {
  return (
    <div className="w-full h-[500px]">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={true}
        loop={true}
        className="h-full hero-swiper"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-[500px] flex items-center justify-center">
              
              {/*  Image */}
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority
                className="object-cover"
              />

              {/*  Overlay */}
              <div className="absolute inset-0 bg-black/50"></div>

              {/*  Content */}
              <div className="relative text-center text-white px-4 z-10">
                <h1 className="text-4xl md:text-5xl font-bold">
                  {slide.title}
                </h1>

                <p className="mt-3 text-lg">{slide.desc}</p>

                <button className="mt-5 px-6 py-2 bg-[#052658]  rounded-full">
                  Explore Now
                </button>
              </div>

            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}