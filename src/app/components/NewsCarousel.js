'use client'

import { useState, useEffect } from 'react'
import { useProducts } from '../context/ProductsContext'
import Link from 'next/link'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const NewsCarousel = () => {
    const { state } = useProducts()
    const [newProducts, setNewProducts] = useState([])

    useEffect(() => {
        // Filtrera produkter som är markerade som nyheter
        const news = state.products.filter((product) => product.isNew === true)
        setNewProducts(news)
    }, [state.products])

    if (newProducts.length === 0) {
        return null // Visa inget om inga nyheter finns
    }

    return (
        <div className="py-12 px-6">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl text-center mb-8">Nyheter</h2>

                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={20}
                    slidesPerView={1.3}
                    centeredSlides={false} // <-- centrerar sliden
                    // navigation
                    pagination={{ clickable: true }}
                    // autoplay={{ delay: 3000, disableOnInteraction: false }}
                    loop={newProducts.length > 1}
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
                    {newProducts.map((product) => {
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
                                    <div className="hover:shadow-xl transition-shadow relative">
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
                                        <h3 className="text-m text-gray-900 mb-1 text-center">
                                            {product.name}
                                        </h3>

                                        {/* Pris */}
                                        {hasDiscount ? (
                                            <div className="text-center">
                                                <p className="text-gray-500 line-through text-sm">
                                                    {product.price / 100} SEK
                                                </p>
                                                <p className="text-red-400 text-sm">
                                                    {displayPrice / 100} SEK
                                                </p>
                                            </div>
                                        ) : (
                                            <p className="text-gray-600 text-center">
                                                {product.price / 100} SEK
                                            </p>
                                        )}
                                    </div>
                                </Link>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>

                {/* Visa alla-knapp */}
                <div className="flex justify-center mt-8">
                    <Link href="/news">
                        <button className="bg-black text-white px-8 py-3 hover:bg-gray-800 transition">
                            VISA ALLA NYHETER
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default NewsCarousel
