// 'use client'

// import { useState } from 'react'
// import { useProducts } from '../../context/ProductsContext'
// import { useParams } from 'next/navigation'
// import Link from 'next/link'
// import Image from 'next/image'

// const CategoryPage = () => {
//     const { slug } = useParams()
//     const { state } = useProducts()
//     const [sortOption, setSortOption] = useState('default')

//     // Filtrera produkter baserat på kategori
//     let filteredProducts = state.products.filter(
//         (product) => product.category === slug
//     )

//     // Sorteringslogik
//     const handleSortChange = (e) => {
//         setSortOption(e.target.value)
//     }

//     if (sortOption === 'priceLowHigh') {
//         filteredProducts = [...filteredProducts].sort(
//             (a, b) => a.price - b.price
//         )
//     } else if (sortOption === 'priceHighLow') {
//         filteredProducts = [...filteredProducts].sort(
//             (a, b) => b.price - a.price
//         )
//     } else if (sortOption === 'nameAZ') {
//         filteredProducts = [...filteredProducts].sort((a, b) =>
//             a.name.localeCompare(b.name)
//         )
//     } else if (sortOption === 'nameZA') {
//         filteredProducts = [...filteredProducts].sort((a, b) =>
//             b.name.localeCompare(a.name)
//         )
//     }

//     return (
//         <div className="p-6">
//             <h1 className="text-3xl font-bold text-center mb-6 capitalize">
//                 {slug}
//             </h1>

//             {/* Sorteringsmeny */}
//             <div className="flex justify-left mb-4 pl-3">
//                 <select
//                     value={sortOption}
//                     onChange={handleSortChange}
//                     className="border border-gray-300 rounded-md px-4 py-2"
//                 >
//                     <option value="default">Sortera efter</option>
//                     <option value="priceLowHigh">Pris: Lågt till Högt</option>
//                     <option value="priceHighLow">Pris: Högt till Lågt</option>
//                     <option value="nameAZ">Namn: A - Z</option>
//                     <option value="nameZA">Namn: Z - A</option>
//                 </select>
//             </div>

//             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
//                 {filteredProducts.length > 0 ? (
//                     filteredProducts.map((product) => (
//                         <div
//                             key={product.id}
//                             className="p-4 transition hover:scale-105 text-center"
//                         >
//                             <Link href={`/product/${product.slug}`}>
//                                 <div className="relative w-full h-64 sm:h-56 mb-1">
//                                     <Image
//                                         src={product.image}
//                                         alt={product.name}
//                                         fill
//                                         sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw"
//                                         className="object-contain rounded-md"
//                                         priority={
//                                             product.id ===
//                                             filteredProducts[0]?.id
//                                         } // Endast första produkten
//                                     />
//                                 </div>
//                                 <h3 className="text-lg font-medium text-gray-900">
//                                     {product.name}
//                                 </h3>
//                                 <p className="text-gray-600">
//                                     {product.price % 100 === 0
//                                         ? `${product.price / 100} SEK`
//                                         : `${(product.price / 100).toFixed(
//                                               2
//                                           )} SEK`}
//                                 </p>
//                             </Link>
//                         </div>
//                     ))
//                 ) : (
//                     <p className="col-span-full text-center text-gray-500">
//                         Inga produkter hittades i denna kategori.
//                     </p>
//                 )}
//             </div>
//         </div>
//     )
// }

// export default CategoryPage

'use client'

import { useState } from 'react'
import { useProducts } from '../../context/ProductsContext'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

const CategoryPage = () => {
    const { slug } = useParams()
    const { state } = useProducts()
    const [sortOption, setSortOption] = useState('default')

    // Filtrera produkter baserat på kategori
    let filteredProducts = state.products.filter(
        (product) => product.category === slug
    )

    // Sorteringslogik
    const handleSortChange = (e) => {
        setSortOption(e.target.value)
    }

    if (sortOption === 'priceLowHigh') {
        filteredProducts = [...filteredProducts].sort(
            (a, b) => {
                const priceA = a.specialPrice || a.price
                const priceB = b.specialPrice || b.price
                return priceA - priceB
            }
        )
    } else if (sortOption === 'priceHighLow') {
        filteredProducts = [...filteredProducts].sort(
            (a, b) => {
                const priceA = a.specialPrice || a.price
                const priceB = b.specialPrice || b.price
                return priceB - priceA
            }
        )
    } else if (sortOption === 'nameAZ') {
        filteredProducts = [...filteredProducts].sort((a, b) =>
            a.name.localeCompare(b.name)
        )
    } else if (sortOption === 'nameZA') {
        filteredProducts = [...filteredProducts].sort((a, b) =>
            b.name.localeCompare(a.name)
        )
    }

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-center mb-6 capitalize">
                {slug}
            </h1>

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
                    filteredProducts.map((product) => {
                        const hasDiscount = product.specialPrice && product.specialPrice < product.price
                        const discountPercent = hasDiscount
                            ? Math.round(((product.price - product.specialPrice) / product.price) * 100)
                            : 0
                        const displayPrice = product.specialPrice || product.price

                        return (
                            <div
                                key={product.id}
                                className="p-4 transition hover:scale-105 text-center relative"
                            >
                                {/* ✅ NYTT: Rabatt-badge */}
                                {hasDiscount && (
                                    <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded-md font-bold text-sm z-10">
                                        -{discountPercent}%
                                    </div>
                                )}

                                <Link href={`/product/${product.slug}`}>
                                    <div className="relative w-full h-56 mb-1">
                                        <Image
                                            src={product.image}
                                            alt={product.name}
                                            fill
                                            sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw"
                                            className="object-contain rounded-md"
                                            priority={
                                                product.id ===
                                                filteredProducts[0]?.id
                                            }
                                        />
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-900">
                                        {product.name}
                                    </h3>

                                    {/* ✅ NYTT: Prisvisning med rabatt */}
                                    {hasDiscount ? (
                                        <div className="mt-2">
                                            <p className="text-gray-500 line-through text-sm">
                                                {product.price % 100 === 0
                                                    ? `${product.price / 100} SEK`
                                                    : `${(product.price / 100).toFixed(2)} SEK`}
                                            </p>
                                            <p className="text-red-600 font-bold">
                                                {displayPrice % 100 === 0
                                                    ? `${displayPrice / 100} SEK`
                                                    : `${(displayPrice / 100).toFixed(2)} SEK`}
                                            </p>
                                        </div>
                                    ) : (
                                        <p className="text-gray-600">
                                            {product.price % 100 === 0
                                                ? `${product.price / 100} SEK`
                                                : `${(product.price / 100).toFixed(2)} SEK`}
                                        </p>
                                    )}
                                </Link>
                            </div>
                        )
                    })
                ) : (
                    <p className="col-span-full text-center text-gray-500">
                        No products found for this category.
                    </p>
                )}
            </div>
        </div>
    )
}

export default CategoryPage
