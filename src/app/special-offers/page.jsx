'use client'

import { useState } from 'react'
import { useProducts } from '../context/ProductsContext'
import Link from 'next/link'
import Image from 'next/image'

const SpecialOffersPage = () => {
    const { state } = useProducts()
    const [sortOption, setSortOption] = useState('default')

    // Filtrera produkter som har specialPrice
    let specialProducts = state.products.filter(
        (product) => product.specialPrice && product.specialPrice > 0
    )

    // Sorteringslogik
    const handleSortChange = (e) => {
        setSortOption(e.target.value)
    }

    if (sortOption === 'priceLowHigh') {
        specialProducts = [...specialProducts].sort(
            (a, b) => (a.specialPrice || a.price) - (b.specialPrice || b.price)
        )
    } else if (sortOption === 'priceHighLow') {
        specialProducts = [...specialProducts].sort(
            (a, b) => (b.specialPrice || b.price) - (a.specialPrice || a.price)
        )
    } else if (sortOption === 'nameAZ') {
        specialProducts = [...specialProducts].sort((a, b) =>
            a.name.localeCompare(b.name)
        )
    } else if (sortOption === 'nameZA') {
        specialProducts = [...specialProducts].sort((a, b) =>
            b.name.localeCompare(a.name)
        )
    }

    // Beräkna rabatt i procent
    const calculateDiscount = (price, specialPrice) => {
        return Math.round(((price - specialPrice) / price) * 100)
    }

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-center mb-6">
                Specialerbjudanden
            </h1>

            {specialProducts.length > 0 ? (
                <>
                    {/* Sorteringsmeny */}
                    <div className="flex justify-left mb-4 pl-3">
                        <select
                            value={sortOption}
                            onChange={handleSortChange}
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

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                        {specialProducts.map((product) => {
                            const discount = calculateDiscount(
                                product.price,
                                product.specialPrice
                            )

                            return (
                                <div
                                    key={product.id}
                                    className="p-4 transition hover:scale-105 text-center relative"
                                >
                                    {/* Rabatt-badge */}
                                    <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded-md font-bold text-sm z-10">
                                        -{discount}%
                                    </div>

                                    <Link href={`/product/${product.slug}`}>
                                        <div className="relative w-full h-56 mb-1">
                                            <Image
                                                src={product.image}
                                                alt={product.name}
                                                fill
                                                sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw"
                                                className="object-contain rounded-md"
                                            />
                                        </div>
                                        <h3 className="text-lg font-medium text-gray-900">
                                            {product.name}
                                        </h3>

                                        {/* Priser */}
                                        <div className="mt-2">
                                            {/* Gammalt pris - överstruket */}
                                            <p className="text-gray-500 line-through text-sm">
                                                {product.price % 100 === 0
                                                    ? `${product.price / 100} SEK`
                                                    : `${(
                                                          product.price / 100
                                                      ).toFixed(2)} SEK`}
                                            </p>

                                            {/* Nytt pris - rött */}
                                            <p className="text-red-600 font-bold text-lg">
                                                {product.specialPrice % 100 ===
                                                0
                                                    ? `${product.specialPrice / 100} SEK`
                                                    : `${(
                                                          product.specialPrice /
                                                          100
                                                      ).toFixed(2)} SEK`}
                                            </p>
                                        </div>
                                    </Link>
                                </div>
                            )
                        })}
                    </div>
                </>
            ) : (
                <div className="text-center py-12">
                    <p className="text-gray-600 text-lg mb-4">
                        Inga specialerbjudanden just nu.
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

export default SpecialOffersPage
