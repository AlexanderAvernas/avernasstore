"use client";

import Image from "next/image";
import Link from "next/link";

const AboutFirstpageImage = ({ title, imageUrl }) => {
  if (!imageUrl) return null;

  return (
    <Link href="/about">
      <div className="relative w-screen min-h-[50vh] md:min-h-[70vh] flex justify-center items-center overflow-hidden mt-3 mb-8 cursor-pointer hover:opacity-95 transition-opacity">
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
    </Link>
  );
};

export default AboutFirstpageImage;