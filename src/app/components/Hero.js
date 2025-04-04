"use client";

import Image from "next/image";

const Hero = ({ title, imageUrl, description }) => {
  if (!imageUrl) return <h1>Ingen bild hittades</h1>;

  return (
    <div className="relative w-screen min-h-[50svh] md:min-h-[70vh] flex justify-center items-center overflow-hidden m-0">
      <Image
        src={`https:${imageUrl}`}
        alt={title || "Hero Image"}
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        {title && <h1 className="text-white text-s">{title}</h1>}
        {description && <p className="text-white text-s mt-2">{description}</p>}
      </div>
    </div>
  );
};

export default Hero;
