// 'use client';

// import { useState } from 'react';
// import KlarnaWidget from '../components/KlarnaWidget';

// // React component for Klarna Checkout page
// const CheckoutPage = () => {
//   const [htmlSnippet, setHtmlSnippet] = useState(''); // State to store Klarna widget HTML

//   const createOrder = async () => {
//     try {
//       const response = await fetch('/api/klarna-order', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           purchase_country: 'SE', // Sweden
//           purchase_currency: 'SEK', // Swedish Kronor
//           locale: 'sv-SE', // Swedish language
//           order_amount: 10000, // Total amount in minor units (100.00 SEK)
//           order_tax_amount: 2000, // Tax amount in minor units (20.00 SEK)
//           order_lines: [
//             {
//               type: 'physical', // Indicates a physical product
//               reference: '123456789', // Product reference ID
//               name: 'Test Product', // Product name
//               quantity: 1, // Quantity
//               quantity_unit: 'st', // Swedish unit for "pieces"
//               unit_price: 10000, // Price per unit (100.00 SEK)
//               tax_rate: 2500, // 25% VAT (in basis points)
//               total_amount: 10000, // Total price (100.00 SEK)
//               total_tax_amount: 2000, // Total tax (20.00 SEK)
//             },
//           ],
//           merchant_urls: {
//             terms: 'https://masilver.netlify.app/terms', // Terms and conditions URL
//             checkout: 'https://masilver.netlify.app/checkout', // Checkout URL
//             confirmation: 'https://masilver.netlify.app/confirmation?order_id={checkout.order.id}', // Dynamic Confirmation URL
//             push: 'https://masilver.netlify.app/api/push?order_id={checkout.order.id}' // push with id
//           },
//         }),
//       });

//       const data = await response.json(); // Parse response
//       setHtmlSnippet(data.html_snippet); // Set Klarna widget snippet
//     } catch (error) {
//       console.error('Error creating order:', error); // Debugging: Log any error
//     }
//   };

//   return (
//     <div>
//       <button onClick={createOrder}>Create Klarna Order</button> {/* Button to create order */}
//       {htmlSnippet && <KlarnaWidget htmlSnippet={htmlSnippet} />} {/* Render Klarna widget */}
//     </div>
//   );
// };

// export default CheckoutPage;

"use client";

import { useCart } from "../context/CartContext";
import KlarnaWidget from "../components/KlarnaWidget";
import Cart from "../components/Cart"; // Import the Cart component
import { useState } from "react";

const CheckoutPage = () => {
  const { cart } = useCart();
  const [htmlSnippet, setHtmlSnippet] = useState("");

  // Klarna-compliant tax calculation function
  const calculateTaxAmount = (totalAmount, taxRate) => {
    return totalAmount - Math.round(totalAmount / (1 + taxRate / 10000));
  };

  const createOrder = async () => {
    // Calculate the total order amount and tax
    const totalAmount = Math.round(cart.reduce((sum, item) => sum + item.price, 0));
    const totalTax = Math.round(
      cart.reduce((sum, item) => sum + calculateTaxAmount(item.price, item.tax_rate), 0)
    );

    // Generate Klarna order lines
    const orderLines = cart.map((item) => {
      const totalTaxAmount = calculateTaxAmount(item.price, item.tax_rate);

      return {
        type: "physical",
        reference: item.id,
        name: item.name,
        quantity: 1,
        quantity_unit: "pcs", // Klarna requires this field
        unit_price: item.price,
        tax_rate: item.tax_rate,
        total_amount: item.price,
        total_tax_amount: totalTaxAmount,
      };
    });

    try {
      // Send request to create Klarna order
      const response = await fetch("/api/klarna-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          purchase_country: "SE",
          purchase_currency: "SEK",
          locale: "sv-SE",
          order_amount: totalAmount,
          order_tax_amount: totalTax,
          order_lines: orderLines,
          merchant_urls: {
            terms: "https://masilver.netlify.app/terms",
            checkout: "https://masilver.netlify.app/checkout",
            confirmation: "https://masilver.netlify.app/confirmation?order_id={checkout.order.id}",
            push: "https://masilver.netlify.app/api/push?order_id={checkout.order.id}",
          },
        }),
      });

      // Handle the Klarna API response
      const data = await response.json();
      if (response.ok) {
        setHtmlSnippet(data.html_snippet);
      } else {
        console.error("Error creating Klarna order:", data);
      }
    } catch (error) {
      console.error("Error creating Klarna order:", error);
    }
  };

  return (
    <div>
      <h1>Checkout</h1>
      {/* <Cart /> */}
      <button onClick={createOrder}>Create Klarna Order</button>
      {htmlSnippet && <KlarnaWidget htmlSnippet={htmlSnippet} />}
    </div>
  );
};

export default CheckoutPage;
