"use client";

import { useProducts } from "../../context/ProductsContext";
import { useParams } from "next/navigation";
import Link from "next/link";

const CategoryPage = () => {
  const { slug } = useParams();
  const { state } = useProducts();

  // Filtrera produkter baserat på kategori
  const filteredProducts = state.products.filter(
    (product) => product.category === slug
  );

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6 capitalize">
        {slug}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="border rounded-lg p-4 shadow-md hover:shadow-lg transition">
              <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-2">{(product.price / 100).toFixed(2)} SEK</p>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover rounded-md mb-3"
              />
              <Link href={`/product/${product.slug}`}>
                <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                  View Product
                </button>
              </Link>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No products found for this category.
          </p>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
