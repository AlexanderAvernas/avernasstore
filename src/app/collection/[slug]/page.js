"use client";

import { useState } from "react";
import { useProducts } from "../../context/ProductsContext";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const CollectionPage = () => {
  const { slug } = useParams();
  const { state } = useProducts();
  const [sortOption, setSortOption] = useState("default");

  // Filtrera produkter baserat på collection
  let filteredProducts = state.products.filter(
    (product) => product.collection === slug
  );

  // Sorteringslogik
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  if (sortOption === "priceLowHigh") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sortOption === "priceHighLow") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  } else if (sortOption === "nameAZ") {
    filteredProducts = [...filteredProducts].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  } else if (sortOption === "nameZA") {
    filteredProducts = [...filteredProducts].sort((a, b) =>
      b.name.localeCompare(a.name)
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6 capitalize">{slug}</h1>

      {/* Sorteringsmeny */}
      <div className="flex justify-left mb-4 pl-3">
        <select
          value={sortOption}
          onChange={handleSortChange}
          className="border border-gray-300 rounded-md px-4 py-2"
        >
          <option value="default">Sortera efter</option>
          <option value="priceLowHigh">Pris: Lågt till Högt</option>
          <option value="priceHighLow">Pris: Högt till Lågt</option>
          <option value="nameAZ">Namn: A - Z</option>
          <option value="nameZA">Namn: Z - A</option>
        </select>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="p-4 transition hover:scale-105 text-center">
              <Link href={`/product/${product.slug}`}>
                <div className="relative w-full h-56 mb-1">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw"
                    className="object-contain rounded-md"
                    priority={product.id === filteredProducts[0]?.id} // Endast första produkten
                  />
                </div>
                <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
                <p className="text-gray-600">{(product.price / 100).toFixed(2)} SEK</p>
              </Link>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No products found for this collection.
          </p>
        )}
      </div>
    </div>
  );
};

export default CollectionPage;
