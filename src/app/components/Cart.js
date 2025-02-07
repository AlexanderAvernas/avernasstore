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


"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const { cart, dispatch } = useCart();
  const [hydratedCart, setHydratedCart] = useState([]);

  // Ensure the cart data is available after hydration to prevent SSR issues
  useEffect(() => {
    setHydratedCart(cart);
  }, [cart]);

  // Remove an item from the cart
  const removeFromCart = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  };

  // 🔹 CALCULATE TOTAL AMOUNT AND TOTAL TAX FROM THE CART ITEMS (NOW HANDLING QUANTITY)
  const calculateTotals = (cartItems) => {
    const totalAmount = Math.round(
      cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0) // MULTIPLY BY QUANTITY
    );
    const totalTax = Math.round(
      cartItems.reduce(
        (sum, item) => sum + ((item.price * item.tax_rate) / 10000) * item.quantity, // MULTIPLY BY QUANTITY
        0
      )
    );
    return { totalAmount, totalTax };
  };

  // Get the calculated totals
  const { totalAmount, totalTax } = calculateTotals(hydratedCart);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      {/* Main cart container */}
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
        {/* Cart title */}
        <h1 className="text-2xl font-bold mb-4 text-gray-800 border-b pb-2">
          Your Cart
        </h1>

        {/* Check if the cart is empty */}
        {hydratedCart.length === 0 ? (
          <p className="text-gray-600 text-center">Your cart is empty.</p>
        ) : (
          <ul className="space-y-4">
            {hydratedCart.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between bg-gray-50 p-4 rounded-md shadow-sm"
              >
                {/* Product Image */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-md"
                />

                {/* Item name and price */}
                <div className="flex-1 ml-4">
                  <h3 className="text-lg font-medium text-gray-800">{item.name}</h3>
                  <p className="text-gray-600">
                    Price: {(item.price / 100).toFixed(2)} SEK
                  </p>
                </div>

                {/* 🔹 QUANTITY CONTROLS */}
                <div className="flex items-center mt-2">
                  <button
                    onClick={() =>
                      dispatch({ type: "DECREASE_QUANTITY", payload: item.id })
                    }
                    className="bg-gray-300 text-gray-800 px-3 py-1 rounded-l-md hover:bg-gray-400 transition"
                  >
                    -
                  </button>
                  <span className="px-4 py-1 bg-white border">{item.quantity}</span>
                  <button
                    onClick={() =>
                      dispatch({ type: "INCREASE_QUANTITY", payload: item.id })
                    }
                    className="bg-gray-300 text-gray-800 px-3 py-1 rounded-r-md hover:bg-gray-400 transition"
                  >
                    +
                  </button>
                </div>

                {/* Remove button */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* Display totals and checkout button if cart is not empty */}
        {hydratedCart.length > 0 && (
          <div className="mt-6 border-t pt-4">
            {/* 🔹 TOTAL AMOUNT AND TAX NOW INCLUDE QUANTITY */}
            <p className="text-gray-700 text-lg font-semibold">
              Total Amount: {(totalAmount / 100).toFixed(2)} SEK
            </p>
            <p className="text-gray-500">Total Tax: {(totalTax / 100).toFixed(2)} SEK</p>

            {/* Proceed to Checkout button */}
            <Link href="/checkout">
              <button className="w-full mt-4 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition">
                Proceed to Checkout
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
