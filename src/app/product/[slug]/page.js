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
import { useProducts } from '../../context/ProductsContext'
import { useCart } from '../../context/CartContext'
import Link from 'next/link'
import Image from 'next/image'

const ProductPage = () => {
    const { slug } = useParams()
    const { state } = useProducts()
    const { dispatch } = useCart()
    const product = state.products.find((p) => p.slug === slug)

    // Initiera mainImage som en tom sträng
    const [mainImage, setMainImage] = useState('')

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
                {/* Bildvisning (nu gäller detta både för mobil och desktop) */}
                <div className="relative w-full h-80 mb-4">
                    {/* Kontrollera att mainImage är giltig innan bild renderas */}
                    {mainImage ? (
                        <Image
                            src={mainImage}
                            alt={product.name}
                            fill
                            className="object-contain rounded-lg"
                        />
                    ) : (
                        // Fallback-bild om mainImage är ogiltig
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                            Ingen bild tillgänglig
                        </div>
                    )}
                </div>

                {/* Miniatyrbilder */}
                <div className="flex gap-2">
                    {[product.image, ...product.extraImages].map(
                        (img, index) => (
                            <button
                                key={index}
                                onClick={() => setMainImage(img)}
                                className="border-none p-0"
                            >
                                <Image
                                    src={img || '/default-image.jpg'} // Fallback för tomma bild-URL:er
                                    alt={product.name}
                                    width={64}
                                    height={64}
                                    className="cursor-pointer border rounded-md hover:opacity-75"
                                />
                            </button>
                        )
                    )}
                </div>

                {/* Produktinfo */}
                <div className="text-center md:text-left">
                    <h1 className="text-3xl font-semibold text-gray-900 mb-4">
                        {product.name}
                    </h1>
                    <p className="text-gray-600 mb-4">{product.description}</p>
                    <p className="text-lg font-semibold text-gray-700 mb-6">
                        {product.price / 100} SEK
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <button
                            onClick={() =>
                                dispatch({
                                    type: 'ADD_TO_CART',
                                    payload: product
                                })
                            }
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
