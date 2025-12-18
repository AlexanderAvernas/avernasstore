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

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const router = useRouter();
  const { cart, dispatch } = useCart();
  const [hydratedCart, setHydratedCart] = useState([]);

  useEffect(() => {
    setHydratedCart(cart);
  }, [cart]);

  const calculateTotals = (cartItems) => {
    const totalAmount = cartItems.reduce((sum, item) => {
      const price = item.specialPrice || item.price;
      return sum + price * item.quantity;
    }, 0);
    const totalTax = cartItems.reduce((sum, item) => {
      const price = item.specialPrice || item.price;
      return sum + ((price * item.tax_rate) / 10000) * item.quantity;
    }, 0);
    return { totalAmount, totalTax };
  };

  const { totalAmount, totalTax } = calculateTotals(hydratedCart);

  return (
    <div className="bg-white w-full h-full flex flex-col">
      {hydratedCart.length === 0 ? (
        // ✅ Tom varukorg - centrerad text + knapp längst ner
        <>
          <div className="flex-1 flex items-center justify-center">
            <p className="text-gray-600 text-center text-lg">
              Din varukorg är tom
            </p>
          </div>

          {/* Tillbaka-knapp längst ner */}
          <div className="p-4 border-t">
            <button
              onClick={() => dispatch({ type: "CLOSE_CART" })}
              className="w-full bg-gray-500 text-white py-3 hover:bg-gray-400 transition"
            >
              Tillbaka
            </button>
          </div>
        </>
      ) : (
        // ✅ Varukorg med produkter
        <>
          {/* Scrollbar produktlista */}
          <div className="flex-1 overflow-y-auto px-0">
            <ul className="divide-y divide-gray-300">
              {hydratedCart.map((item) => (
                <li
                  key={item.id}
                  className="flex items-stretch justify-between py-2"
                >
                  {/* Produktbild */}
                  <div className="w-20 h-20 relative flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover rounded-sm"
                    />
                  </div>

                  {/* Produktinfo */}
                  <div className="flex-1 text-left ml-2 flex flex-col space-y-0.5">
                    <h3 className="text-label-xs">{item.name}</h3>

                    {/* Metadata – ALLT PÅ SAMMA RAD */}

                    <div className="flex flex-wrap items-center text-label-xs text-gray-700">
                      {item.ringSize && <span>{item.ringSize}</span>}

                      {item.letter && (
                        <>
                          {item.ringSize && (
                            <span className="mx-1 text-gray-400">|</span>
                          )}
                          <span>{item.letter}</span>
                        </>
                      )}

                      {item.diameter && (
                        <>
                          {(item.ringSize || item.letter) && (
                            <span className="mx-1 text-gray-400">|</span>
                          )}
                          <span>{item.diameter} cm</span>
                        </>
                      )}

                      {item.chainLength && (
                        <>
                          {(item.ringSize || item.letter || item.diameter) && (
                            <span className="mx-1 text-gray-400">|</span>
                          )}
                          <span>{item.chainLength} cm</span>
                        </>
                      )}
                    </div>
                    {item.specialPrice && item.specialPrice < item.price ? (
                      <div>
                        {/* <p className="text-label-xs line-through">
                          {(item.price / 100).toFixed(2)} SEK
                        </p> */}
                        <p className="text-red-300 text-label-xs">
                          {(item.specialPrice / 100).toFixed(2)} SEK
                        </p>
                      </div>
                    ) : (
                      <p className="text-label-xs">
                        {(item.price / 100).toFixed(2)} SEK
                      </p>
                    )}

                    {/* Kvantitetsväljare */}
                    <div className="mt-2 w-fit inline-flex items-center border border-gray-400 rounded-sm">
                      <button
                        onClick={() =>
                          dispatch({
                            type: "DECREASE_QUANTITY",
                            payload: cart.indexOf(item),
                          })
                        }
                        className="px-1.5 py-0.5 text-label-xs hover:bg-gray-100"
                      >
                        −
                      </button>

                      <span className="px-2 text-label-xs">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          dispatch({
                            type: "INCREASE_QUANTITY",
                            payload: cart.indexOf(item),
                          })
                        }
                        className="px-1.5 py-0.5 text-label-xs hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Ta bort – höger, längst ner */}
                  <div className="flex flex-col justify-end ml-4">
                    <button
                      onClick={() =>
                        dispatch({
                          type: "REMOVE_FROM_CART",
                          payload: cart.indexOf(item),
                        })
                      }
                      className="text-xs underline hover:text-black transition"
                    >
                      Ta bort
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 border-t bg-white">
            <div className="flex items-center justify-between text-lg font-semibold text-gray-700">
              <span className="text-label-s uppercase">Totalsumma</span>
              <span className="text-label-s">{(totalAmount / 100).toFixed(2)} SEK</span>
            </div>

            {/* <p className="text-gray-500 mb-4 text-sm">
              Inkl. moms: {(totalTax / 100).toFixed(2)} SEK
            </p>
 */}
            <button
              onClick={() => {
                dispatch({ type: "CLOSE_CART" });
                router.push("/checkout");
              }}
              className="w-full bg-black text-button-s text-white py-3 hover:bg-gray-800 transition mt-4"
            >
              Fortsätt
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
