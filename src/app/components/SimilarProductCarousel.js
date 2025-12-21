
'use client'

import { useState, useEffect } from 'react'
import { useProducts } from '../context/ProductsContext'
import Link from 'next/link'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'

const SimilarProductsCarousel = ({ currentProduct }) => {
    const { state } = useProducts()
    const [similarProducts, setSimilarProducts] = useState([])

    useEffect(() => {
        if (!currentProduct) return

        const currentCategory = currentProduct.category
        const currentCollection = currentProduct.collection
        const currentId = currentProduct.id

        // Filtrera ut liknande produkter
        let similar = state.products.filter((product) => {
            // Exkludera den nuvarande produkten
            if (product.id === currentId) return false

            // Produkten måste matcha ANTINGEN kategori ELLER kollektion
            const matchesCategory = currentCategory && product.category === currentCategory
            const matchesCollection = currentCollection && product.collection === currentCollection

            return matchesCategory || matchesCollection
        })

        // Prioritera produkter som matchar BÅDE kategori OCH kollektion
        similar.sort((a, b) => {
            const aMatchesBoth = 
                a.category === currentCategory && 
                a.collection === currentCollection
            const bMatchesBoth = 
                b.category === currentCategory && 
                b.collection === currentCollection

            if (aMatchesBoth && !bMatchesBoth) return -1
            if (!aMatchesBoth && bMatchesBoth) return 1

            // Om lika, prioritera samma kollektion
            const aMatchesCollection = a.collection === currentCollection
            const bMatchesCollection = b.collection === currentCollection

            if (aMatchesCollection && !bMatchesCollection) return -1
            if (!aMatchesCollection && bMatchesCollection) return 1

            return 0
        })

        // Begränsa till max 6 produkter
        setSimilarProducts(similar.slice(0, 6))
    }, [currentProduct, state.products])

    if (similarProducts.length === 0) {
        return null
    }

    return (
        <div className="py-12 px-0 md:px-6">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-heading-l text-center mb-8">Liknande produkter</h2>
                <Swiper
                    modules={[Navigation, Autoplay]}
                    spaceBetween={20}
                    slidesPerView={1.3}
                    centeredSlides={true}
                    pagination={{ clickable: true }}
                    loop={similarProducts.length > 1}
                    breakpoints={{
                        640: {
                            slidesPerView: 2.3,
                            centeredSlides: false,
                            spaceBetween: 20
                        },
                        768: {
                            slidesPerView: 3,
                            centeredSlides: false,
                            spaceBetween: 30
                        },
                        1024: {
                            slidesPerView: 4,
                            centeredSlides: false,
                            spaceBetween: 30
                        }
                    }}
                    className="pb-12"
                >
                    {similarProducts.map((product) => {
                        const hasDiscount =
                            product.specialPrice &&
                            product.specialPrice < product.price
                        const discountPercent = hasDiscount
                            ? Math.round(
                                  ((product.price - product.specialPrice) /
                                      product.price) *
                                      100
                              )
                            : 0
                        const displayPrice =
                            product.specialPrice || product.price

                        return (
                            <SwiperSlide className="swiper-slide h-auto" key={product.id}>
                                <Link href={`/product/${product.slug}`}>
                                    <div className="relative">
                                        {/* Produktbild */}
                                        <div className="relative w-full aspect-square mb-2">
                                            <Image
                                                src={product.image}
                                                alt={product.name}
                                                fill
                                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw"
                                                className="object-cover"
                                            />
                                        </div>

                                        {/* Produktinfo */}
                                        <h3 className="text-label-s mb-1 text-center">
                                            {product.name}
                                        </h3>

                                        {/* Pris */}
                                        {hasDiscount ? (
                                            <div className="text-center">
                                                <p className="text-label-s line-through">
                                                    {product.price / 100} SEK
                                                </p>
                                                <p className="text-label-s text-red-400">
                                                    {displayPrice / 100} SEK
                                                </p>
                                            </div>
                                        ) : (
                                            <p className="text-label-s text-center">
                                                {product.price / 100} SEK
                                            </p>
                                        )}
                                    </div>
                                </Link>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            </div>
        </div>
    )
}

export default SimilarProductsCarousel