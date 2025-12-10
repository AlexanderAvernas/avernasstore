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
        {title && <h2 className="text-heading-l text-white mb-4">{title}</h2>}

        <Link href="/special-offers">
          <span className="text-button-small text-white cursor-pointer">
            {buttonText || "TILL REAN"}
          </span>
        </Link>

        {/* Description 5% från botten */}
        {description && (
          <p className="absolute bottom-[5%] left-1/2 -translate-x-1/2 text-body-xs text-white text-center w-full px-4">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default SpecialOfferBanner;
