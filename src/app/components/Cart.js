// "use client";

// import Link from 'next/link';
// import { useCart } from '../context/CartContext';

// const Cart = () => {
//   const { cart, dispatch } = useCart();

//   const removeFromCart = (id) => {
//     dispatch({ type: 'REMOVE_FROM_CART', payload: id });
//   };

//   const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);
//   const totalTax = cart.reduce((sum, item) => sum + (item.price * item.tax_rate) / 10000, 0);

//   return (
//     <div>
//       <h1>Your Cart</h1>
//       {cart.length === 0 ? (
//         <p>Your cart is empty.</p>
//       ) : (
//         <ul>
//           {cart.map((item) => (
//             <li key={item.id}>
//               <h3>{item.name}</h3>
//               <p>Price: {(item.price / 100).toFixed(2)} SEK</p>
//               <button onClick={() => removeFromCart(item.id)}>Remove</button>
//             </li>
//           ))}
//         </ul>
//       )}
//       <div>
//         <p>Total Amount: {(totalAmount / 100).toFixed(2)} SEK</p>
//         <p>Total Tax: {(totalTax / 100).toFixed(2)} SEK</p>
//         <Link href="/checkout">
//           <button>Proceed to Checkout</button>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Cart;

// components/Cart.js

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const { cart, dispatch } = useCart();

  // State to ensure calculations are consistent after hydration
  const [hydratedCart, setHydratedCart] = useState([]);

  useEffect(() => {
    // Ensure cart state is consistent after hydration
    setHydratedCart(cart);
  }, [cart]);

  const removeFromCart = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  };

  const calculateTotals = (cartItems) => {
    const totalAmount = Math.round(cartItems.reduce((sum, item) => sum + item.price, 0));
    const totalTax = Math.round(
      cartItems.reduce((sum, item) => sum + (item.price * item.tax_rate) / 10000, 0)
    );
    return { totalAmount, totalTax };
  };

  // Safely calculate totals only after hydration
  const { totalAmount, totalTax } = calculateTotals(hydratedCart);

  return (
    <div style={{backgroundColor:"grey"}}>
      <h1>Your Cart</h1>
      {hydratedCart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {hydratedCart.map((item) => (
            <li key={item.id}>
              <h3>{item.name}</h3>
              <p>Price: {(item.price / 100).toFixed(2)} SEK</p>
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
      <div>
        <p>Total Amount: {(totalAmount / 100).toFixed(2)} SEK</p>
        <p>Total Tax: {(totalTax / 100).toFixed(2)} SEK</p>
        <Link href="/checkout">
          <button>Proceed to Checkout</button>
        </Link>
      </div>
    </div>
  );
};

export default Cart;
