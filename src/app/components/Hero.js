"use client";

import Image from "next/image";

const Hero = ({ title, imageUrl }) => {
  if (!imageUrl) return <h1>Ingen bild hittades</h1>; // Lägg till en fallback

  return (
    <div className="relative w-full h-96">
      <h1 className="text-2xl text-center">Test HeroImage</h1> {/* Testtext för debugging */}
      <Image
        src={`https:${imageUrl}`}
        alt={title || "Hero Image"}
        fill={true} // Använd 'fill' istället för 'layout="fill"'
        style={{ objectFit: "cover" }} // Korrekt sätt att använda objectFit
        priority
      />
      {title && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <h1 className="text-white text-4xl font-bold">{title}</h1>
        </div>
      )}
    </div>
  );
};

export default Hero;
