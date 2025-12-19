"use client";

import Image from "next/image";

const AboutFirstpageImage = ({ title, imageUrl }) => {
  if (!imageUrl) return null;

  return (
    <div className="relative w-screen min-h-[50vh] md:min-h-[70vh] flex justify-center items-center overflow-hidden mt-3 mb-8">
      <Image
        src={imageUrl}
        alt={title || "About"}
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 flex items-center justify-center">
        {title && (
          <h2 className="text-heading-l text-white text-center px-4">
            {title}
          </h2>
        )}
      </div>
    </div>
  );
};

export default AboutFirstpageImage;