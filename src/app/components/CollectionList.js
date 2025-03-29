"use client";

import Link from "next/link";
import Image from "next/image";

const collections = [
  { name: "Connect", image: "/rings.jpg" },
  { name: "necklaces", image: "/categoryNecklace.jpg" },
  { name: "earrings", image: "/categoryEarings.jpg" },
  { name: "bracelets", image: "/categoryBracelet.jpg" },
  { name: "symbols", image: "/categorySymbols.jpg" },
  { name: "stones", image: "/categoryStones.jpg" },
];

const CollectionList = () => {
  return (
    <div className="p-6 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {collections.map((collection) => (
        <Link key={collection.name} href={`/collection/${collection.name}`}>
          <div className="relative cursor-pointer border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition">
            <div className="relative w-full h-80">
              <Image
                src={collection.image}
                alt={collection.name}
                fill
                sizes="(max-width: 639px) 50vw, (max-width: 1023px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <span className="text-white text-1xl px-4 py-1 bg-black bg-opacity-75">
                {collection.name.charAt(0).toUpperCase() + collection.name.slice(1)}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CollectionList;
