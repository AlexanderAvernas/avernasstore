"use client";

import Link from "next/link";
import Image from "next/image";

// Backup-bilder om ingen bild finns i Sanity
const defaultImages = {
  womanpower: "/womanpower.jpg",
  coins: "/CollectionCoins.jpg",
  happyplanets: "/CollectionHappy.jpg",
  letter: "/CollectionLetter.jpg",
  symbols: "/CollectionSymbols.jpg",
  rod: "/CollectionRod.jpg",
  Connect: "/CollectionConnect.jpg",
  earcuffs: "/CollectionEarcuffs.jpg",
};

const CollectionList = ({ collections = [] }) => {
  // Kombinera Sanity-data med backup-bilder
  const collectionsWithImages = collections.map(col => ({
    name: col.name,
    image: col.image || defaultImages[col.name] || "/placeholder.jpg"
  }));

  // Om inga collections från Sanity, använd default
  const displayCollections = collectionsWithImages.length > 0 
    ? collectionsWithImages 
    : Object.keys(defaultImages).map(name => ({
        name,
        image: defaultImages[name]
      }));

  return (
    <div className="p-6 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {displayCollections.map((collection) => (
        <Link key={collection.name} href={`/collection/${collection.name}`}>
          <div className="relative cursor-pointer border rounded overflow-hidden transition">
            <div className="relative w-full h-40 sm:h-80">
              <Image
                src={collection.image}
                alt={collection.name}
                fill
                sizes="(max-width: 639px) 50vw, (max-width: 1023px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20">
              <span className="text-label-m text-white uppercase">
                {collection.name}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CollectionList;

/* "use client";

import Link from "next/link";
import Image from "next/image";

const collections = [
  { name: "womanpower", image: "/womanpower.jpg" },
  { name: "coins", image: "/CollectionCoins.jpg" },
  { name: "happyplanets", image: "/CollectionHappy.jpg" },
  { name: "letter", image: "/CollectionLetter.jpg" },
  { name: "symbols", image: "/CollectionSymbols.jpg" },
  { name: "rod", image: "/CollectionRod.jpg" },
  { name: "Connect", image: "/CollectionConnect.jpg" },
  { name: "earcuffs", image: "/CollectionEarcuffs.jpg" },
];

const CollectionList = () => {
  return (
    <div className="p-6 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {collections.map((collection) => (
        <Link key={collection.name} href={`/collection/${collection.name}`}>
          <div className="relative cursor-pointer border rounded-s overflow-hidden transition">
            <div className="relative w-full h-40 sm:h-80">
              <Image
                src={collection.image}
                alt={collection.name}
                fill
                sizes="(max-width: 639px) 50vw, (max-width: 1023px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20">
              <span className="text-label-m text-white uppercase">
                {collection.name}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CollectionList;
 */