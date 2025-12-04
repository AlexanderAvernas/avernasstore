'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const ProductGrid = ({ products, title, emptyMessage }) => {
    const [sortOption, setSortOption] = useState('default')

    // Sorteringslogik
    let sortedProducts = [...products]

    if (sortOption === 'priceLowHigh') {
        sortedProducts.sort((a, b) => {
            const priceA = a.specialPrice || a.price
            const priceB = b.specialPrice || b.price
            return priceA - priceB
        })
    } else if (sortOption === 'priceHighLow') {
        sortedProducts.sort((a, b) => {
            const priceA = a.specialPrice || a.price
            const priceB = b.specialPrice || b.price
            return priceB - priceA
        })
    } else if (sortOption === 'nameAZ') {
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name))
    } else if (sortOption === 'nameZA') {
        sortedProducts.sort((a, b) => b.name.localeCompare(a.name))
    }

    return (
        <div className="p-6">
            {title && (
                <h1 className="text-3xl font-bold text-center mb-6 capitalize">
                    {title}
                </h1>
            )}

            {sortedProducts.length > 0 ? (
                <>
                    {/* Sorteringsmeny */}
                    <div className="flex justify-left mb-4 pl-3">
                        <select
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value)}
                            className="border border-gray-300 rounded-md px-4 py-2"
                        >
                            <option value="default">Sortera efter</option>
                            <option value="priceLowHigh">
                                Pris: Lågt till Högt
                            </option>
                            <option value="priceHighLow">
                                Pris: Högt till Lågt
                            </option>
                            <option value="nameAZ">Namn: A - Z</option>
                            <option value="nameZA">Namn: Z - A</option>
                        </select>
                    </div>

                    {/* Produktgrid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                        {sortedProducts.map((product) => {
                            const hasDiscount =
                                product.specialPrice &&
                                product.specialPrice < product.price
                            const discountPercent = hasDiscount
                                ? Math.round(
                                      ((product.price -
                                          product.specialPrice) /
                                          product.price) *
                                          100
                                  )
                                : 0
                            const displayPrice =
                                product.specialPrice || product.price

                            return (
                                <div
                                    key={product.id}
                                    className="p-4 transition hover:scale-105 text-center relative"
                                >
                                    {/* Rabatt-badge */}
                                    {hasDiscount && (
                                        <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded-md font-bold text-sm z-10">
                                            -{discountPercent}%
                                        </div>
                                    )}

                                    {/* NY-badge */}
                                    {product.isNew && (
                                        <div className="absolute top-2 left-2 bg-green-600 text-white px-2 py-1 rounded-md font-bold text-xs z-10">
                                            NY
                                        </div>
                                    )}

                                    <Link href={`/product/${product.slug}`}>
                                        <div className="relative w-full aspect-square mb-1">
                                            <Image
                                                src={product.image}
                                                alt={product.name}
                                                fill
                                                sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw"
                                                className="object-contain rounded-md"
                                                priority={false}
                                            />
                                        </div>
                                        <h3 className="text-lg font-medium text-gray-900">
                                            {product.name}
                                        </h3>

                                        {/* Prisvisning */}
                                        {hasDiscount ? (
                                            <div className="mt-2">
                                                <p className="text-gray-500 line-through text-sm">
                                                    {product.price % 100 === 0
                                                        ? `${product.price / 100} SEK`
                                                        : `${(
                                                              product.price /
                                                              100
                                                          ).toFixed(2)} SEK`}
                                                </p>
                                                <p className="text-red-600 font-bold">
                                                    {displayPrice % 100 === 0
                                                        ? `${displayPrice / 100} SEK`
                                                        : `${(
                                                              displayPrice / 100
                                                          ).toFixed(2)} SEK`}
                                                </p>
                                            </div>
                                        ) : (
                                            <p className="text-gray-600">
                                                {product.price % 100 === 0
                                                    ? `${product.price / 100} SEK`
                                                    : `${(
                                                          product.price / 100
                                                      ).toFixed(2)} SEK`}
                                            </p>
                                        )}
                                    </Link>
                                </div>
                            )
                        })}
                    </div>
                </>
            ) : (
                <div className="text-center py-12">
                    <p className="text-gray-600 text-lg mb-4">
                        {emptyMessage || 'Inga produkter hittades.'}
                    </p>
                    <Link href="/">
                        <button className="bg-black text-white px-6 py-2 hover:bg-gray-800 transition">
                            Tillbaka till startsidan
                        </button>
                    </Link>
                </div>
            )}
        </div>
    )
}

export default ProductGrid
