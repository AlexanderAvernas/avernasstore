"use client";

import Image from "next/image";
import Link from "next/link";

const SpecialOfferBanner = ({ title, description, imageUrl, buttonText }) => {
  if (!imageUrl) return null;

  return (
    <div className="relative w-screen min-h-[50vh] md:min-h-[70vh] flex justify-center items-center overflow-hidden m-0">
      <Image
        src={imageUrl}
        alt={title || "Special Offer"}
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-center px-4">
        {title && (
          <h2 className="text-heading-l text-white">
            {title}
          </h2>
        )}
        {description && (
          <p className="text-body-xs text-white">
            {description}
          </p>
        )}
        <Link href="/special-offers">
          <button className="bg-white text-black px-8 py-3 text-lg font-semibold hover:bg-gray-200 transition">
            {buttonText || "Se erbjudanden"}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SpecialOfferBanner;
