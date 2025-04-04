"use client";

import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const images = [
  { name: "happyplanet", image: "/CollectionHappy.jpg" },
  { name: "coins", image: "/CollectionCoins.jpg" },
  { name: "letter", image: "/CollectionLetter.jpg" },
];

const CollectionImages = () => {
  return (
    <div className="relative w-full h-[50vh] sm:h-[70vh] lg:h-[80vh]">

      {/* Klickbar text som ligger kvar över Swiper */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <Link href="/collections">
          <span className="text-white text-m px-2 py-2 bg-black bg-opacity-80 pointer-events-auto cursor-pointer">
            Collection
          </span>
        </Link>
      </div>

      {/* Swiper som byter bilder i bakgrunden */}
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        // autoplay={{ delay: 3000 }}
        loop
        className="w-full h-full"
      >
        {images.map((image) => (
          <SwiperSlide key={image.name}>
            <Link href="/collections">
              <div className="relative w-full h-full flex justify-center items-center overflow-hidden">
                <Image
                  src={image.image}
                  alt={image.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1023px) 100vw, 100vw"
                  className="object-cover"
                  priority
                />
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

    </div>
  );
};

export default CollectionImages;
