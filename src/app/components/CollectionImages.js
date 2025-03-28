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
    <div className="p-0">

      {/* Swiper: Mobil och Desktop */}
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        // autoplay={{ delay: 3000 }}
        loop
        className="w-full"
      >
        {images.map((image) => (
          <SwiperSlide key={image.name}>
            <Link href="/collections">
              <div className="relative w-full h-[50vh] sm:h-[70vh] lg:h-[80vh] flex justify-center items-center overflow-hidden">
                <Image
                  src={image.image}
                  alt={image.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1023px) 100vw, 100vw"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                  <span className="text-white text-1xl px-4 py-1 bg-black bg-opacity-75">
                    Collection
                  </span>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

    </div>
  );
};

export default CollectionImages;
