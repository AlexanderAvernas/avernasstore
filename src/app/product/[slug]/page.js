"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useProducts } from "../../context/ProductsContext";
import { useCart } from "../../context/CartContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import Link from "next/link";
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";
import SimilarProductsCarousel from "../../components/SimilarProductCarousel";

const ProductPage = () => {
  const router = useRouter();
  const { slug } = useParams();
  const { state } = useProducts();
  const { dispatch } = useCart();
  const product = state.products.find((p) => p.slug === slug);

  const [mainImage, setMainImage] = useState("");
  const [ringSize, setRingSize] = useState(null);
  const [showRingSizeInfo, setShowRingSizeInfo] = useState(false);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedLetter, setSelectedLetter] = useState("");
  const [selectedDiameter, setSelectedDiameter] = useState("");
  const [selectedChainLength, setSelectedChainLength] = useState("");
  const [isCareOpen, setIsCareOpen] = useState(false);
  const [isMaterialOpen, setIsMaterialOpen] = useState(false);

  // Arrays för olika val
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖ".split("");
  const diameters = ["1", "2", "3"];
  const chainLengths = ["42", "45", "50"];

  // Färgval för specifika produkter
 const joelleColors = [
   { value: "Svart", label: "Svart (Onyx)" },
   { value: "Vit", label: "Vit (Månsten)" },
   { value: "Grön", label: "Grön (Kalcedon)" },
   { value: "Blå", label: "Blå (Kyanit)" },
   { value: "Rosa", label: "Rosa (Rosenkvarts)" }
 ];

 const viennaColors = [
   { value: "Vit", label: "Vit (Månsten)" },
   { value: "Lila", label: "Lila (Ametist)" }
 ];

  useEffect(() => {
    if (product?.image) {
      setMainImage(product.image);
    }
  }, [product]);

  if (!product) {
    return (
      <p className="text-center text-red-500 text-lg mt-10">
        Produkten hittades inte.
      </p>
    );
  }

  // Beräkna vilket pris som ska visas och om det finns rabatt
  const displayPrice = product.specialPrice || product.price;
  const hasDiscount =
    product.specialPrice && product.specialPrice < product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.price - product.specialPrice) / product.price) * 100)
    : 0;

  // Kontrollera vilka val som ska visas
  const showLetterSelect =
    product.collection === "coins" || product.collection === "letter";
  const showDiameterSelect = product.collection === "symbols";
  const showChainLengthSelect =
    (product.collection === "letter" ||
      product.collection === "coins" ||
      product.collection === "Connect") &&
    product.category === "necklaces";
    const showColorSelect = 
    product.name === "JOELLE ring" || product.name === "VIENNA ring";
  const colorOptions = 
    product.name === "JOELLE ring" ? joelleColors : 
    product.name === "VIENNA ring" ? viennaColors : [];

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-white-100 sm:p-6">
        <div className="bg-white sm:shadow-lg sm:p-8 max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 📱 Mobil: swipebar med thumbnails */}

          <div className="block sm:hidden product-swiper">
            {/* Rabatt badge på mobil */}
            {/* {hasDiscount && (
            <div className="bg-red-600 text-white px-3 py-1 rounded-md font-bold text-lg inline-block mb-2">
              -{discountPercent}% REA
            </div>
          )}
 */}
            <Swiper
              modules={[Pagination]}
              pagination={{
                el: ".product-swiper .custom-pagination",
                clickable: true,
              }}
              spaceBetween={0}
              slidesPerView={1}
              className="w-full"
            >
              {[product.image, ...product.extraImages].map((img, index) => (
                <SwiperSlide key={index}>
                  <div className="relative w-full h-[450px] bg-gray-100">
                    <Image
                      src={img}
                      alt={`Produktbild ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            {/* 👇 Här kommer pagination! 👇 */}
            <div className="custom-pagination flex justify-center mt-3"></div>
          </div>

          {/* 🖥️ Desktop: stor bild + thumbnails */}
          <div className="hidden sm:block">
            {/* ✅ NYTT: Rabatt-badge på desktop */}
            {hasDiscount && (
              <div className="bg-red-300 text-white px-3 py-1 rounded-md font-bold text-lg inline-block mb-4">
                -{discountPercent}% REA
              </div>
            )}

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
                    src={img || "/default-image.jpg"}
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
          <div className="text-left px-4">
            <h1 className="text-heading-xl text-center mb-4">{product.name}</h1>

            {/* ✅ NYTT: Prisvisning med rabatt */}
            <div className="mb-6 text-center">
              {hasDiscount ? (
                <div className="flex items-center justify-center gap-3">
                  <p className="text-label-m line-through">
                    {product.price / 100} SEK
                  </p>
                  <p className="text-red-400 text-label-m font-semibold">
                    {product.specialPrice / 100} SEK
                  </p>
                </div>
              ) : (
                <p className="text-label-m">{product.price / 100} SEK</p>
              )}
            </div>

            <div className="border-t border-b border-gray-200 divide-y divide-gray-200 mb-6">
              {/* ✅ Description – alltid synlig */}
              <div className="py-4 text-body-s">{product.description}</div>

              {/* 🔽 Skötselråd */}
              <div>
                <button
                  type="button"
                  onClick={() => setIsCareOpen(!isCareOpen)}
                  className="w-full flex justify-between items-center py-4 text-left text-gray-900"
                >
                  <span className="text-label-s">Skötselråd</span>
                  <span
                    className={`transition-transform ${isCareOpen ? "rotate-180" : ""}`}
                  >
                    <Image
                      src="/chevron.png"
                      alt="Expandera"
                      width={14}
                      height={14}
                    />
                  </span>
                </button>

                {isCareOpen && (
                  <div className="pb-4 text-body-s">
                    Genom att ta hand om ditt nya smycke kan du minimera
                    slitage. Silver oxiderar, det är helt naturligt. För att
                    fördröja processen bör du undvika att förvara dina smycken i
                    en fuktig miljö, såsom badrummet. Torka av smycket med
                    putsduk efter användning så det blir rent från fett, smuts
                    och smink. Då behåller det sin lyster mycket längre. Förvara
                    gärna dina smycken i medföljande ask.
                  </div>
                )}
              </div>

              {/* 🔽 Material */}
              <div>
                <button
                  type="button"
                  onClick={() => setIsMaterialOpen(!isMaterialOpen)}
                  className="w-full flex justify-between items-center py-4 text-left text-gray-900"
                >
                  <span className="text-label-s">Material</span>
                  <span
                    className={`transition-transform ${isMaterialOpen ? "rotate-180" : ""}`}
                  >
                    <Image src="/chevron.png" alt="" width={14} height={14} />
                  </span>
                </button>

                {isMaterialOpen && (
                  <div className="pb-4 text-body-s">
                    Alla våra smycken är gjorda i återvunnet 925 sterlingsilver.
                  </div>
                )}
              </div>
            </div>

            {/*  {product.collection && (
            <div className="mt-6 mb-6 text-center">
              <Link href={`/collection/${product.collection}`}>
                <span>
                  Se fler produkter i{" "}
                  <span className="text-blue-600 uppercase hover:underline">
                    {product.collection}
                  </span>{" "}
                  kollektionen
                </span>
              </Link>
            </div>
          )} */}

            {/* Visa dropdown för bokstavsval (coins eller letter) */}
            {showLetterSelect && (
              <div className="mb-4">
                {/*  <label
                htmlFor="letter-select"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Välj bokstav för gravering:
              </label> */}
                <select
                  id="letter-select"
                  value={selectedLetter}
                  onChange={(e) => setSelectedLetter(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                >
                  <option value="">Välj bokstav</option>
                  {letters.map((letter) => (
                    <option key={letter} value={letter}>
                      {letter}
                    </option>
                  ))}
                </select>
                {/* <p className="mt-2 text-sm text-gray-500">
                Din valda bokstav kommer att graveras på smycket
              </p> */}
              </div>
            )}

            {/* Visa dropdown för diameter (symbols) */}
            {showDiameterSelect && (
              <div className="mb-4">
                {/*   <label
                htmlFor="diameter-select"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Välj diameter:
              </label> */}
                <select
                  id="diameter-select"
                  value={selectedDiameter}
                  onChange={(e) => setSelectedDiameter(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                >
                  <option value="">Välj diameter</option>
                  {diameters.map((diameter) => (
                    <option key={diameter} value={diameter}>
                      {diameter}cm
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Visa dropdown för kedjelängd (letter/coins/Connect + necklaces) */}
            {showChainLengthSelect && (
              <div className="mb-4">
                {/* <label
                htmlFor="chain-length-select"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Välj kedjelängd:
              </label> */}
                <select
                  id="chain-length-select"
                  value={selectedChainLength}
                  onChange={(e) => setSelectedChainLength(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                >
                  <option value="">Välj kedjelängd</option>
                  {chainLengths.map((length) => (
                    <option key={length} value={length}>
                      {length} cm
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Visa färgval för JOELLE ring och VIENNA ring */}
            {showColorSelect && (
              <div className="mb-4">
                <select
                  id="color-select"
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                >
                  <option value="">Välj färg</option>
                  {colorOptions.map((color) => (
                    <option key={color.value} value={color.value}>
                      {color.label}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Visa dropdown om produkten är en ring */}
            {product.category === "rings" &&
              product.collection !== "earcuffs" && (
                <div className="mb-4">
                  {/*  <label
                  htmlFor="ring-size"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Välj storlek:
                </label> */}
                  <select
                    id="ring-size"
                    value={ringSize || ""}
                    onChange={(e) => setRingSize(Number(e.target.value))}
                    className="w-2/3 border border-gray-300 rounded px-3 py-2"
                    required
                  >
                    <option value="">Välj storlek</option>
                    {[15, 15.5, 16, 16.5, 17, 17.5, 18, 18.5, 19, 19.5, 20].map(
                      (size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      )
                    )}
                  </select>
                  <button
                    type="button"
                    onClick={() => setShowRingSizeInfo(true)}
                    className="w-1/3 mt-2 text-s underline"
                  >
                    Storleksguide
                  </button>
                </div>
              )}

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => {
                  // Validering för ring
                  if (
                    product.category === "rings" &&
                    !ringSize &&
                    product.collection !== "earcuffs"
                  ) {
                    alert("Vänligen välj en ringstorlek.");
                    return;
                  }

                  // Validering för bokstav (coins eller letter)
                  if (showLetterSelect && !selectedLetter) {
                    alert("Vänligen välj en bokstav för gravering.");
                    return;
                  }

                  // Validering för diameter (symbols)
                  if (showDiameterSelect && !selectedDiameter) {
                    alert("Vänligen välj en diameter.");
                    return;
                  }

                  // Validering för kedjelängd
                  if (showChainLengthSelect && !selectedChainLength) {
                    alert("Vänligen välj en kedjelängd.");
                    return;
                  }

                  // Validering för färg (JOELLE/VIENNA)
                  if (showColorSelect && !selectedColor) {
                    alert("Vänligen välj en färg.");
                    return;
                  }

                  dispatch({
                    type: "ADD_TO_CART",
                    payload: {
                      ...product,
                      ringSize: product.category === "rings" ? ringSize : null,
                      letter: showLetterSelect ? selectedLetter : null,
                      diameter: showDiameterSelect ? selectedDiameter : null,
                      chainLength: showChainLengthSelect
                        ? selectedChainLength
                        : null,
                        color: showColorSelect ? selectedColor : null,
                    },
                  });

                  dispatch({ type: "OPEN_CART" });
                }}
                className="flex-1 rounded-sm bg-black text-white text-button-s px-6 py-3 hover:bg-gray-300 transition"
              >
                LÄGG I VARUKORGEN
              </button>
              {/* <Link href={`/category/${product.category}`}>
              <button className="flex-1 bg-gray-500 text-white px-6 py-3 hover:bg-gray-400 transition">
                TILLBAKA TILL KATEGORI
              </button>
            </Link> */}
            </div>
          </div>
        </div>

        {showRingSizeInfo && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="relative bg-white p-6 rounded-lg shadow-lg max-h-[90vh] overflow-y-auto w-[90%] max-w-md">
              <button
                onClick={() => setShowRingSizeInfo(false)}
                className="absolute top-4 right-4 text-gray-900 font-bold hover:text-black"
              >
                <h1>✕</h1>
              </button>
              <h2 className="text-lg font-semibold mb-2 border-b border-gray-300">
                Hur du mäter din ringstorlek
              </h2>
              <div className="relative w-full h-64">
                <Image
                  src="/frame 133.png"
                  alt="Illustration på hur man mäter ringstorlek"
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-contain"
                />
              </div>
              <p className="text-body-m mb-4">
                Välj en ring som storleksmässigt passar det finger du skall ha
                din nya ring på. Tänk på att en bred ring sitter tightare än en
                smal ring.
                <br />
                <br />
                Ta ett måttband eller en linjal och lägg ringen ovanpå
                måttbandet/linjalen.
                <br />
                <br />
                Räkna mm, rakt över diametern på ringens insida. Din storlek är
                de antal mm du får fram när du mäter. I detta fall 17.
              </p>
            </div>
          </div>
        )}
      </div>
      <SimilarProductsCarousel currentProduct={product} />
    </>
  );
};

export default ProductPage;
