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
        <div className="p-4">
            {title && (
                <h1 className="text-heading-xl text-center my-6">
                    {title}
                </h1>
            )}

            {sortedProducts.length > 0 ? (
                <>
                    {/* Sorteringsmeny */}
                    <div className="flex justify-left mb-1 pl-">
                        <select
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value)}
                            className="text-label-s border-none py-2 appearance"
                        >
                            <option value="default">Sortera</option>
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
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
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
                                    className="transition hover:scale-105 text-center relative mb-4"
                                >
                                    {/* Rabatt-badge */}
                                    {hasDiscount && (
                                        <div className="absolute top-2 left-2 bg-white text-label-xs px-2 py- rounded-sm z-10">
                                            -{discountPercent}%
                                        </div>
                                    )}

                                    {/* NY-badge */}
                                    {/* {product.isNew && (
                                        <div className="absolute top-2 left-2 bg-green-600 text-white px-2 py-1 rounded-md font-bold text-xs z-10">
                                            NY
                                        </div>
                                    )} */}

                                    <Link href={`/product/${product.slug}`}>
                                        <div className="relative w-full aspect-[4/4] mb-3">
                                            <Image
                                                src={product.image}
                                                alt={product.name}
                                                fill
                                                sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw"
                                                className="object-cover rounded-sm"
                                                priority={false}
                                            />
                                        </div>
                                        <h3 className="text-label-s">
                                            {product.name}
                                        </h3>

                                        {/* Prisvisning */}
                                        {hasDiscount ? (
                                            <div className="mt-2">
                                                <p className="text-label-s line-through">
                                                    {product.price % 100 === 0
                                                        ? `${product.price / 100} SEK`
                                                        : `${(
                                                              product.price /
                                                              100
                                                          ).toFixed(2)} SEK`}
                                                </p>
                                                <p className="text-label-s text-red-400">
                                                    {displayPrice % 100 === 0
                                                        ? `${displayPrice / 100} SEK`
                                                        : `${(
                                                              displayPrice / 100
                                                          ).toFixed(2)} SEK`}
                                                </p>
                                            </div>
                                        ) : (
                                            <p className="text-label-s">
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
