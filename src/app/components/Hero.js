"use client";

import Image from "next/image";

const Hero = ({ title, imageUrl, description }) => {
  if (!imageUrl) return <h1>Ingen bild hittades</h1>;

  return (
    <div className="relative w-screen min-h-[85svh] md:min-h-[100vh] flex justify-center items-center overflow-hidden m-0">
      <Image
        src={imageUrl}
        alt={title || "Hero Image"}
        fill
        className="object-cover"
        priority
      />
      <div className="absolute bottom-[8%] w-full left-1/2 -translate-x-1/2 flex flex-col items-center text-center px-4">
        {title && <h1 className="text-heading-xl text-white">{title}</h1>}
        {description && <p className="text-white text-s mt-2">{description}</p>}
      </div>
    </div>
  );
};

export default Hero;
