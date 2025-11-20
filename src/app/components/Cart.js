// "use client";

// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { useCart } from "../context/CartContext";

// const Cart = () => {
//   const { cart, dispatch } = useCart();
//   const [hydratedCart, setHydratedCart] = useState([]);

//   // Ensure the cart data is available after hydration to prevent SSR issues
//   useEffect(() => {
//     setHydratedCart(cart);
//   }, [cart]);

//   // Remove an item from the cart
//   const removeFromCart = (id) => {
//     dispatch({ type: "REMOVE_FROM_CART", payload: id });
//   };

//   // Calculate total amount and total tax from the cart items
//   const calculateTotals = (cartItems) => {
//     const totalAmount = Math.round(
//       cartItems.reduce((sum, item) => sum + item.price, 0)
//     );
//     const totalTax = Math.round(
//       cartItems.reduce((sum, item) => sum + (item.price * item.tax_rate) / 10000, 0)
//     );
//     return { totalAmount, totalTax };
//   };

//   // Get the calculated totals
//   const { totalAmount, totalTax } = calculateTotals(hydratedCart);

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
//       {/* Main cart container */}
//       <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
//         {/* Cart title */}
//         <h1 className="text-2xl font-bold mb-4 text-gray-800 border-b pb-2">
//           Your Cart
//         </h1>

//         {/* Check if the cart is empty */}
//         {hydratedCart.length === 0 ? (
//           <p className="text-gray-600 text-center">Your cart is empty.</p>
//         ) : (
//           <ul className="space-y-4">
//             {hydratedCart.map((item) => (
//               <li
//                 key={item.id}
//                 className="flex items-center justify-between bg-gray-50 p-4 rounded-md shadow-sm"
//               >
//                 {/* Product Image */}
//                 <img
//                   src={item.image}
//                   alt={item.name}
//                   className="w-16 h-16 object-cover rounded-md"
//                 />

//                 {/* Item name and price */}
//                 <div className="flex-1 ml-4">
//                   <h3 className="text-lg font-medium text-gray-800">{item.name}</h3>
//                   <p className="text-gray-600">
//                     Price: {(item.price / 100).toFixed(2)} SEK
//                   </p>
//                 </div>

//                  {/* Quantity Controls */}
//                  <div className="flex items-center mt-2">
//                     <button
//                       onClick={() => dispatch({ type: "DECREASE_QUANTITY", payload: item.id })}
//                       className="bg-gray-300 text-gray-800 px-3 py-1 rounded-l-md hover:bg-gray-400 transition"
//                     >
//                       -
//                     </button>
//                     <span className="px-4 py-1 bg-white border">{item.quantity}</span>
//                     <button
//                       onClick={() => dispatch({ type: "INCREASE_QUANTITY", payload: item.id })}
//                       className="bg-gray-300 text-gray-800 px-3 py-1 rounded-r-md hover:bg-gray-400 transition"
//                     >
//                       +
//                     </button>
//                   </div>

//                 {/* Remove button */}
//                 <button
//                   onClick={() => removeFromCart(item.id)}
//                   className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
//                 >
//                   Remove
//                 </button>
//               </li>
//             ))}
//           </ul>
//         )}

//         {/* Display totals and checkout button if cart is not empty */}
//         {hydratedCart.length > 0 && (
//           <div className="mt-6 border-t pt-4">
//             {/* Total Amount and Tax */}
//             <p className="text-gray-700 text-lg font-semibold">
//               Total Amount: {(totalAmount / 100).toFixed(2)} SEK
//             </p>
//             <p className="text-gray-500">Total Tax: {(totalTax / 100).toFixed(2)} SEK</p>

//             {/* Proceed to Checkout button */}
//             <Link href="/checkout">
//               <button className="w-full mt-4 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition">
//                 Proceed to Checkout
//               </button>
//             </Link>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Cart;

'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useCart } from '../context/CartContext'

const Cart = () => {
    const router = useRouter()
    const { cart, dispatch } = useCart()
    const [hydratedCart, setHydratedCart] = useState([])

    useEffect(() => {
        setHydratedCart(cart)
    }, [cart])

    const calculateTotals = (cartItems) => {
    const totalAmount = cartItems.reduce(
        (sum, item) => {
            const price = item.specialPrice || item.price // ← Använd specialprice om det finns
            return sum + price * item.quantity
        },
        0
    )
    const totalTax = cartItems.reduce(
        (sum, item) => {
            const price = item.specialPrice || item.price // ← Använd specialprice om det finns
            return sum + ((price * item.tax_rate) / 10000) * item.quantity
        },
        0
    )
    return { totalAmount, totalTax }
}

    const { totalAmount, totalTax } = calculateTotals(hydratedCart)

    return (
        <div className="bg-white w-full max-w-4xl">
            {hydratedCart.length === 0 ? (
                <p className="text-gray-600 text-center text-lg">
                    Your cart is empty.
                </p>
            ) : (
                <>
                    <ul className="divide-y divide-gray-300">
                        {hydratedCart.map((item) => (
                            <li
                                key={item.id}
                                className="flex items-center justify-between py-8"
                            >
                                {/* Produktbild */}
                                <div className="w-20 h-20 relative flex-shrink-0">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        layout="fill"
                                        objectFit="cover"
                                        className="rounded-md"
                                    />
                                </div>

                                {/* Produktinfo */}
                                <div className="flex-1 text-left ml-4">
                                    <h3 className="text-lg font-medium text-gray-800">
                                        {item.name}
                                    </h3>
                                    {item.specialPrice &&
                                    item.specialPrice < item.price ? (
                                        <div>
                                            <p className="text-gray-500 line-through text-sm">
                                                {(item.price / 100).toFixed(2)}{' '}
                                                SEK
                                            </p>
                                            <p className="text-red-600 font-bold">
                                                {(
                                                    item.specialPrice / 100
                                                ).toFixed(2)}{' '}
                                                SEK
                                            </p>
                                        </div>
                                    ) : (
                                        <p className="text-gray-600">
                                            {(item.price / 100).toFixed(2)} SEK
                                        </p>
                                    )}
                                    {item.ringSize && (
                                        <p className="text-sm text-gray-500">
                                            Storlek: {item.ringSize}
                                        </p>
                                    )}
                                    {item.letter && (
                                        <p className="text-sm text-gray-500">
                                            Bokstav: {item.letter}
                                        </p>
                                    )}
                                    {item.diameter && (
                                        <p className="text-sm text-gray-500">
                                            Diameter: {item.diameter} cm
                                        </p>
                                    )}
                                    {item.chainLength && (
                                        <p className="text-sm text-gray-500">
                                            Kedjelängd: {item.chainLength} cm
                                        </p>
                                    )}
                                </div>

                                {/* Kvantitet & Ta bort-knapp i en vertikal layout */}
                                <div className="flex flex-col items-center space-y-2">
                                    <div className="flex items-center space-x-2">
                                        <button
                                            onClick={() =>
                                                dispatch({
                                                    type: 'DECREASE_QUANTITY',
                                                    payload: cart.indexOf(item) // ← Använd index istället för item.id
                                                })
                                            }
                                            className="bg-gray-300 text-gray-800 px-2 py-1 hover:bg-gray-400 transition"
                                        >
                                            -
                                        </button>
                                        <span className="px-3 py-1 bg-white border">
                                            {item.quantity}
                                        </span>
                                        <button
                                            onClick={() =>
                                                dispatch({
                                                    type: 'INCREASE_QUANTITY',
                                                    payload: cart.indexOf(item) // ← Använd index istället för item.id
                                                })
                                            }
                                            className="bg-gray-300 text-gray-800 px-2 py-1 hover:bg-gray-400 transition"
                                        >
                                            +
                                        </button>
                                    </div>

                                    {/* Ta bort-knapp (nu under kvantitet) */}
                                    <button
                                        onClick={() =>
                                            dispatch({
                                                type: 'REMOVE_FROM_CART',
                                                payload: cart.indexOf(item) // ← Använd index istället för item.id
                                            })
                                        }
                                        className="bg-white border-2 border-solid border-gray-400 text-black px-3 py-1 hover:bg-gray-500 transition text-sm"
                                    >
                                        Ta bort
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>

                    {/* Totalsumma & Checkout */}
                    <div className="mt-6 border-t pt-4">
                        <p className="text-lg font-semibold text-gray-700">
                            Total: {(totalAmount / 100).toFixed(2)} SEK
                        </p>
                        <p className="text-gray-500">
                            Tax: {(totalTax / 100).toFixed(2)} SEK
                        </p>

                        <Link href="/checkout">
                            <button className="w-full mt-4 bg-white border-2 border-solid border-black text-black font-semibold py-2 hover:bg-gray-300 transition">
                                FORTSÄTT TILL KASSA
                            </button>
                        </Link>
                        <button
                            onClick={() => router.back()}
                            className="w-full mt-4 bg-gray-500 text-white py-2 hover:bg-gray-400 transition"
                        >
                            TILLBAKA
                        </button>
                    </div>
                </>
            )}
        </div>
    )
}

export default Cart
