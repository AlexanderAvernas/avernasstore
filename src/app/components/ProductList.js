"use client";

import Link from 'next/link';
import { useProducts } from '../context/ProductsContext';

const ProductList = () => {
    const { state, dispatch } = useProducts();

    const categories = ["all", "rings", "necklaces", "earrings", "bracelets", "other"];

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Products</h1>

            {/* Category Filter */}
            <div className="mb-6 flex flex-wrap gap-2">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => dispatch({ type: 'SET_CATEGORY_FILTER', payload: category })}
                        className={`px-4 py-2 rounded-lg text-white transition-colors ${state.selectedCategory === category ? 'bg-blue-600' : 'bg-gray-500 hover:bg-gray-700'}`}
                    >
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                    </button>
                ))}
            </div>

            {/* Display Filtered Products */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {state.filteredProducts.length > 0 ? (
                    state.filteredProducts.map((product) => (
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
                    <p className="col-span-full text-center text-gray-500">No products found for this category.</p>
                )}
            </div>
        </div>
    );
};

export default ProductList;
