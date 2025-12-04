// 'use client'

// import { useState } from 'react'
// import { useProducts } from '../context/ProductsContext'
// import Link from 'next/link'
// import Image from 'next/image'

// const NewsPage = () => {
//     const { state } = useProducts()
//     const [sortOption, setSortOption] = useState('default')

//     // Filtrera produkter som är nyheter
//     let newsProducts = state.products.filter(
//         (product) => product.isNew === true
//     )

//     // Sorteringslogik
//     const handleSortChange = (e) => {
//         setSortOption(e.target.value)
//     }

//     if (sortOption === 'priceLowHigh') {
//         newsProducts = [...newsProducts].sort((a, b) => {
//             const priceA = a.specialPrice || a.price
//             const priceB = b.specialPrice || b.price
//             return priceA - priceB
//         })
//     } else if (sortOption === 'priceHighLow') {
//         newsProducts = [...newsProducts].sort((a, b) => {
//             const priceA = a.specialPrice || a.price
//             const priceB = b.specialPrice || b.price
//             return priceB - priceA
//         })
//     } else if (sortOption === 'nameAZ') {
//         newsProducts = [...newsProducts].sort((a, b) =>
//             a.name.localeCompare(b.name)
//         )
//     } else if (sortOption === 'nameZA') {
//         newsProducts = [...newsProducts].sort((a, b) =>
//             b.name.localeCompare(a.name)
//         )
//     }

//     return (
//         <div className="p-6">
//             <h1 className="text-3xl font-bold text-center mb-6">Nyheter</h1>

//             {newsProducts.length > 0 ? (
//                 <>
//                     {/* Sorteringsmeny */}
//                     <div className="flex justify-left mb-4 pl-3">
//                         <select
//                             value={sortOption}
//                             onChange={handleSortChange}
//                             className="border border-gray-300 rounded-md px-4 py-2"
//                         >
//                             <option value="default">Sortera efter</option>
//                             <option value="priceLowHigh">
//                                 Pris: Lågt till Högt
//                             </option>
//                             <option value="priceHighLow">
//                                 Pris: Högt till Lågt
//                             </option>
//                             <option value="nameAZ">Namn: A - Z</option>
//                             <option value="nameZA">Namn: Z - A</option>
//                         </select>
//                     </div>

//                     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
//                         {newsProducts.map((product) => {
//                             const hasDiscount =
//                                 product.specialPrice &&
//                                 product.specialPrice < product.price
//                             const discountPercent = hasDiscount
//                                 ? Math.round(
//                                       ((product.price -
//                                           product.specialPrice) /
//                                           product.price) *
//                                           100
//                                   )
//                                 : 0
//                             const displayPrice =
//                                 product.specialPrice || product.price

//                             return (
//                                 <div
//                                     key={product.id}
//                                     className="p-4 transition hover:scale-105 text-center relative"
//                                 >
//                                     {/* Rabatt-badge */}
//                                     {hasDiscount && (
//                                         <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded-md font-bold text-sm z-10">
//                                             -{discountPercent}%
//                                         </div>
//                                     )}

//                                     {/* NY-badge */}
//                                     <div className="absolute top-2 left-2 bg-green-600 text-white px-2 py-1 rounded-md font-bold text-xs z-10">
//                                         NY
//                                     </div>

//                                     <Link href={`/product/${product.slug}`}>
//                                         <div className="relative w-full aspect-square mb-1">
//                                             <Image
//                                                 src={product.image}
//                                                 alt={product.name}
//                                                 fill
//                                                 sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw"
//                                                 className="object-contain rounded-md"
//                                             />
//                                         </div>
//                                         <h3 className="text-lg font-medium text-gray-900">
//                                             {product.name}
//                                         </h3>

//                                         {/* Prisvisning */}
//                                         {hasDiscount ? (
//                                             <div className="mt-2">
//                                                 <p className="text-gray-500 line-through text-sm">
//                                                     {product.price / 100} SEK
//                                                 </p>
//                                                 <p className="text-red-600 font-bold">
//                                                     {displayPrice / 100} SEK
//                                                 </p>
//                                             </div>
//                                         ) : (
//                                             <p className="text-gray-600">
//                                                 {product.price / 100} SEK
//                                             </p>
//                                         )}
//                                     </Link>
//                                 </div>
//                             )
//                         })}
//                     </div>
//                 </>
//             ) : (
//                 <div className="text-center py-12">
//                     <p className="text-gray-600 text-lg mb-4">
//                         Inga nyheter just nu.
//                     </p>
//                     <Link href="/">
//                         <button className="bg-black text-white px-6 py-2 hover:bg-gray-800 transition">
//                             Tillbaka till startsidan
//                         </button>
//                     </Link>
//                 </div>
//             )}
//         </div>
//     )
// }

// export default NewsPage

'use client'

import { useProducts } from '../context/ProductsContext'
import ProductGrid from '../components/ProductGrid'

const NewsPage = () => {
    const { state } = useProducts()

    const newsProducts = state.products.filter(
        (product) => product.isNew === true
    )

    return (
        <ProductGrid
            products={newsProducts}
            title="Nyheter"
            emptyMessage="Inga nyheter just nu."
        />
    )
}

export default NewsPage
