// "use client";

// import { useParams } from "next/navigation";
// import { useProducts } from "../../context/ProductsContext";
// import { useCart } from "../../context/CartContext";
// import Link from "next/link";
// import Image from "next/image";

// const ProductPage = () => {
//   const { slug } = useParams();
//   const { state } = useProducts();
//   const { dispatch } = useCart();

//   // Hitta produkten baserat på slug
//   const product = state.products.find((p) => p.slug === slug);

//   if (!product) {
//     return (
//       <p className="text-center text-red-500 text-lg mt-10">
//         Produkten hittades inte.
//       </p>
//     );
//   }

//   const addToCart = () => {
//     dispatch({ type: "ADD_TO_CART", payload: product });
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-white-100 p-6">
//       <div className="bg-white shadow-lg p-8 max-w-5xl h-full w-full grid grid-cols-1 md:grid-cols-2 gap-8">
//         {/* Produktbild */}
//         <div className="relative w-full h-80">
//           <Image
//             src={product.image}
//             alt={product.name}
//             layout="fill"
//             objectFit="contain"
//             className="rounded-lg"
//           />
//         </div>

//         {/* Produktinfo */}
//         <div className="flex flex-col justify-center text-center md:text-left">
//           <h1 className="text-3xl font-semibold text-gray-900 mb-4">{product.name}</h1>
//           <p className="text-gray-600 mb-4">{product.description}</p>
//           <p className="text-lg font-semibold text-gray-700 mb-6">
//             {product.price / 100} SEK
//           </p>

//           {/* Action Buttons */}
//           <div className="flex flex-col sm:flex-row gap-4">
//             <button
//               onClick={addToCart}
//               className="flex-1 bg-white border-black border-2 border-solid text-black px-6 py-3 hover:bg-gray-300 transition"
//             >
//               LÄGG I KUNDVAGN
//             </button>

//             <Link href={`/category/${product.category}`}>
//               <button className="flex-1 bg-gray-500 text-white px-6 py-3 hover:bg-gray-400 transition">
//                 TILLBAKA TILL KATEGORI
//               </button>
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductPage;

'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { useProducts } from '../../context/ProductsContext'
import { useCart } from '../../context/CartContext'
import Link from 'next/link'
import Image from 'next/image'

const ProductPage = () => {
    const router = useRouter()
    const { slug } = useParams()
    const { state } = useProducts()
    const { dispatch } = useCart()
    const product = state.products.find((p) => p.slug === slug)

    // Initiera mainImage som en tom sträng
    const [mainImage, setMainImage] = useState('')

    // RingSize
    const [ringSize, setRingSize] = useState(null)

    // Uppdatera mainImage när produkt laddas in
    useEffect(() => {
        if (product?.image) {
            setMainImage(product.image)
        }
    }, [product])

    if (!product) {
        return (
            <p className="text-center text-red-500 text-lg mt-10">
                Produkten hittades inte.
            </p>
        )
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-white-100 p-6">
            <div className="bg-white shadow-lg p-8 max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
               {/* 📱 Mobil: swipebar med thumbnails */}
<div className="block sm:hidden">
    {/* Swipebar */}
    <div className="flex overflow-x-auto gap-4 snap-x snap-mandatory scroll-smooth mb-2">
        {[product.image, ...product.extraImages].map((img, index) => (
            <div
                key={index}
                className="relative min-w-full h-80 snap-center flex-shrink-0 rounded-lg bg-gray-100"
            >
                <Image
                    src={img}
                    alt={`Produktbild ${index + 1}`}
                    fill
                    className="object-contain rounded-lg"
                />
            </div>
        ))}
    </div>

    {/* Thumbnails */}
    <div className="flex gap-2 justify-center">
        {[product.image, ...product.extraImages].map((img, index) => (
            <button
                key={index}
                onClick={() => setMainImage(img)}
                className="border-none p-0"
            >
                <Image
                    src={img || '/default-image.jpg'}
                    alt={`Thumbnail ${index + 1}`}
                    width={48}
                    height={48}
                    className="rounded-md border border-gray-300 hover:opacity-75"
                />
            </button>
        ))}
    </div>
</div>


{/* 🖥️ Desktop: stor bild + thumbnails */}
<div className="hidden sm:block">
    <div className="relative w-full h-80 mb-4">
        {mainImage ? (
            <Image
                src={mainImage}
                alt={product.name}
                fill
                className="object-contain rounded-lg"
            />
        ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                Ingen bild tillgänglig
            </div>
        )}
    </div>

    <div className="flex gap-2">
        {[product.image, ...product.extraImages].map((img, index) => (
            <button
                key={index}
                onClick={() => setMainImage(img)}
                className="border-none p-0"
            >
                <Image
                    src={img || '/default-image.jpg'}
                    alt={product.name}
                    width={64}
                    height={64}
                    className="cursor-pointer border rounded-md hover:opacity-75"
                />
            </button>
        ))}
    </div>
</div>


                {/* Produktinfo */}
                <div className="text-center md:text-left">
                    <h1 className="text-3xl font-semibold text-gray-900 mb-4">
                        {product.name}
                    </h1>
                    <p className="text-gray-600 mb-4">{product.description}</p>
                    {/* Länk till Collection */}
                    {product.collection && (
                        <div className="mt-6 mb-6 text-center">
                            <Link href={`/collection/${product.collection}`}>
                                <span>
                                    Se fler produkter i{' '}
                                    <span className="text-blue-600 uppercase hover:underline">
                                        {product.collection}
                                    </span>{' '}
                                    kollektionen
                                </span>
                            </Link>
                        </div>
                    )}
                    <p className="text-lg font-semibold text-gray-700 mb-6">
                        {product.price / 100} SEK
                    </p>

                    {/* Visa dropdown om produkten är en ring */}
                    {product.category === 'rings' && (
                        <div className="mb-4">
                            <label
                                htmlFor="ring-size"
                                className="block mb-2 text-sm font-medium text-gray-700"
                            >
                                Välj storlek:
                            </label>
                            <select
                                id="ring-size"
                                value={ringSize || ''}
                                onChange={(e) =>
                                    setRingSize(Number(e.target.value))
                                }
                                className="w-full border border-gray-300 rounded px-3 py-2"
                                required
                            >
                                <option value="">Välj storlek</option>
                                {[15, 15.5, 16, 16.5, 17, 17.5, 18, 18.5, 19, 19.5, 20].map((size) => (
                                    <option key={size} value={size}>
                                        {size}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button
                            onClick={() => {
                                // Om det är en ring och ingen storlek valts, stoppa
                                if (product.category === 'rings' && !ringSize) {
                                    alert('Vänligen välj en ringstorlek.')
                                    return
                                }

                                dispatch({
                                    type: 'ADD_TO_CART',
                                    payload: {
                                        ...product,
                                        ringSize:
                                            product.category === 'rings'
                                                ? ringSize
                                                : null
                                    }
                                })

                                router.push('../../cart')
                            }}
                            className="flex-1 bg-white border-black border-2 border-solid text-black px-6 py-3 hover:bg-gray-300 transition"
                        >
                            LÄGG I KUNDVAGN
                        </button>
                        <Link href={`/category/${product.category}`}>
                            <button className="flex-1 bg-gray-500 text-white px-6 py-3 hover:bg-gray-400 transition">
                                TILLBAKA TILL KATEGORI
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductPage
