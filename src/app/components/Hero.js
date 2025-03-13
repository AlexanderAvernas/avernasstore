"use client";

import Image from "next/image";

const Hero = ({ title, imageUrl }) => {
  if (!imageUrl) return <h1>Ingen bild hittades</h1>;

  return (
    <div className="relative w-screen min-h-[50vh] md:min-h-[70vh] flex justify-center items-center overflow-hidden">
      <Image
        src={`https:${imageUrl}`}
        alt={title || "Hero Image"}
        fill
        className="object-cover"
        priority
      />
      {title && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          {/* <h1 className="text-white text-1xl font-semibold">{title}</h1> */}
        </div>
      )}
    </div>
  );
};

export default Hero;
