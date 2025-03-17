// 'use client';

// import { use } from 'react'; // Importera `use` för att hantera async params
// import { useProducts } from '../../context/ProductsContext';
// import { useCart } from '../../context/CartContext';
// import Link from 'next/link';

// const ProductPage = ({ params }) => {
//   const { slug } = use(params); // Använd `use` för att unwrap `params`
//   const { state } = useProducts(); // Hämta produkter från ProductsContext
//   const { dispatch } = useCart(); // Hämta dispatch från CartContext

//   // Hitta produkten baserat på slug
//   const product = state.products.find((p) => p.slug === slug);

//   if (!product) {
//     return <p>Product not found.</p>;
//   }

//   const addToCart = () => {
//     dispatch({ type: 'ADD_TO_CART', payload: product }); // Uppdatera CartContext
//   };

//   return (
//     <div>
//       <h1>{product.name}</h1>
//       <p>{(product.price / 100).toFixed(2)} SEK</p>
//       <p>{product.description}</p>
//       <img src={product.image} alt={product.name} />
//       <br />
//       <button onClick={addToCart}>Add to Cart</button>
//       <Link href="/">
//           <button>Back to productPage</button>
//         </Link>
//     </div>
//   );
// };

// export default ProductPage;


// "use client";

// import { use } from "react"; // Importera `use` för att hantera async params
// import { useProducts } from "../../context/ProductsContext";
// import { useCart } from "../../context/CartContext";
// import Link from "next/link";

// const ProductPage = ({ params }) => {
//   const { slug } = use(params); // Använd `use` för att unwrap `params`
//   const { state } = useProducts(); // Hämta produkter från ProductsContext
//   const { dispatch } = useCart(); // Hämta dispatch från CartContext

//   // Hitta produkten baserat på slug
//   const product = state.products.find((p) => p.slug === slug);

//   if (!product) {
//     return <p className="text-center text-red-500 text-lg mt-10">Product not found.</p>;
//   }

//   const addToCart = () => {
//     dispatch({ type: "ADD_TO_CART", payload: product }); // Uppdatera CartContext
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
//       <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl">
//         {/* Produktbild */}
//         <img
//           src={product.image}
//           alt={product.name}
//           className="w-full h-80 object-cover rounded-md mb-6"
//         />

//         {/* Produktinfo */}
//         <h1 className="text-3xl font-bold text-gray-900 mb-3">{product.name}</h1>
//         <p className="text-lg text-gray-700 font-semibold mb-2">
//           Price: {(product.price / 100).toFixed(2)} SEK
//         </p>
//         <p className="text-gray-600 mb-4">{product.description}</p>

//         {/* Action Buttons */}
//         <div className="flex flex-col sm:flex-row gap-4">
//           <button
//             onClick={addToCart}
//             className="flex-1 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
//           >
//             Add to Cart
//           </button>

//           <Link href="/">
//             <button className="flex-1 bg-gray-300 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-400 transition">
//               Back to Products
//             </button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductPage;

"use client";

import { useParams } from "next/navigation";
import { useProducts } from "../../context/ProductsContext";
import { useCart } from "../../context/CartContext";
import Link from "next/link";
import Image from "next/image";

const ProductPage = () => {
  const { slug } = useParams();
  const { state } = useProducts();
  const { dispatch } = useCart();

  // Hitta produkten baserat på slug
  const product = state.products.find((p) => p.slug === slug);

  if (!product) {
    return (
      <p className="text-center text-red-500 text-lg mt-10">
        Produkten hittades inte.
      </p>
    );
  }

  const addToCart = () => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white-100 p-6">
      <div className="bg-white shadow-lg p-8 max-w-5xl h-full w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Produktbild */}
        <div className="relative w-full h-80">
          <Image
            src={product.image}
            alt={product.name}
            layout="fill"
            objectFit="contain"
            className="rounded-lg"
          />
        </div>

        {/* Produktinfo */}
        <div className="flex flex-col justify-center text-center md:text-left">
          <h1 className="text-3xl font-semibold text-gray-900 mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-lg font-semibold text-gray-700 mb-6">
            {product.price / 100} SEK
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={addToCart}
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
  );
};

export default ProductPage;
