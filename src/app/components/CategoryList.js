"use client";

import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const categories = [
  { name: "rings", image: "/rings.jpg" },
  { name: "necklaces", image: "/categoryNecklace.jpg" },
  { name: "earrings", image: "/categoryEarings.jpg" },
  { name: "bracelets", image: "/categoryBracelet.jpg" }
];

const CategoryList = () => {
  return (
    <div className="p-0 mt-0">

      {/* Mobil: Swiper */}
      <div className="p-0 m-0 block max-sm:block sm:hidden">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000 }}
          className="w-screen"
        >
          {categories.map((category) => (
            <SwiperSlide key={category.name}>
              <Link href={`/category/${category.name}`}>
                <div className="relative w-screen min-h-[50svh] md:min-h-[70vh] flex justify-center items-center overflow-hidden m-0">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    sizes="(max-width: 639px) 100vw, 0vw"
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <span className="text-white text-1xl px-4 py-2 bg-black bg-opacity-75">
                      {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
                    </span>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Desktop: Grid */}
      <div className="p-6 hidden sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
        {categories.map((category) => (
          <Link key={category.name} href={`/category/${category.name}`}>
            <div className="relative cursor-pointer border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition">
              <div className="relative w-full h-80">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white text-1xl px-4 py-1 bg-black bg-opacity-75">
                  {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
