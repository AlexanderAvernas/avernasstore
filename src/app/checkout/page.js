// "use client";

// import { useCart } from "../context/CartContext";
// import KlarnaWidget from "../components/KlarnaWidget";
// import Cart from "../components/Cart"; // Import the Cart component
// import { useState } from "react";

// const CheckoutPage = () => {
//   const { cart } = useCart();
//   const [htmlSnippet, setHtmlSnippet] = useState("");

//   // Klarna-compliant tax calculation function
//   const calculateTaxAmount = (totalAmount, taxRate) => {
//     return totalAmount - Math.round(totalAmount / (1 + taxRate / 10000));
//   };

//   const createOrder = async () => {
//     // Calculate the total order amount and tax
//     const totalAmount = Math.round(cart.reduce((sum, item) => sum + item.price, 0));

//     const totalTax = Math.round(
//       cart.reduce((sum, item) => sum + calculateTaxAmount(item.price, item.tax_rate), 0)
//     );

//     // Generate Klarna order lines
//     const orderLines = cart.map((item) => {
//       const totalTaxAmount = calculateTaxAmount(item.price, item.tax_rate);

//       return {
//         type: "physical",
//         reference: item.id,
//         name: item.name,
//         quantity: 1,
//         quantity_unit: "pcs", // Klarna requires this field
//         unit_price: item.price,
//         tax_rate: item.tax_rate,
//         total_amount: item.price,
//         total_tax_amount: totalTaxAmount,
//       };
//     });

//     try {
//       // Send request to create Klarna order
//       const response = await fetch("/api/klarna-order", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           purchase_country: "SE",
//           purchase_currency: "SEK",
//           locale: "sv-SE",
//           order_amount: totalAmount,
//           order_tax_amount: totalTax,
//           order_lines: orderLines,
//           merchant_urls: {
//             terms: "https://masilver.netlify.app/terms",
//             checkout: "https://masilver.netlify.app/checkout",
//             confirmation: "https://masilver.netlify.app/confirmation?order_id={checkout.order.id}",
//             push: "https://masilver.netlify.app/api/push?order_id={checkout.order.id}",
//           },
//         }),
//       });

//       // Handle the Klarna API response
//       const data = await response.json();
//       if (response.ok) {
//         setHtmlSnippet(data.html_snippet);
//       } else {
//         console.error("Error creating Klarna order:", data);
//       }
//     } catch (error) {
//       console.error("Error creating Klarna order:", error);
//     }
//   };

//   return (
//     <div>
//       <h1>Checkout</h1>
//       {/* <Cart /> */}
//       <button onClick={createOrder}>Create Klarna Order</button>
//       {htmlSnippet && <KlarnaWidget htmlSnippet={htmlSnippet} />}
//     </div>
//   );
// };

// export default CheckoutPage;

// "use client";

// import { useCart } from "../context/CartContext";
// import KlarnaWidget from "../components/KlarnaWidget";
// import { useState } from "react";

// const CheckoutPage = () => {
//   const { cart } = useCart();
//   const [htmlSnippet, setHtmlSnippet] = useState("");

//   // Klarna-compliant tax calculation function
//   const calculateTaxAmount = (totalAmount, taxRate) => {
//     return totalAmount - Math.round(totalAmount / (1 + taxRate / 10000));
//   };

//   const createOrder = async () => {
//     // 🔹 FIX: CALCULATE TOTAL AMOUNT AND TAX CORRECTLY WITH QUANTITY
//     const totalAmount = Math.round(
//       cart.reduce((sum, item) => sum + item.price * item.quantity, 0) // MULTIPLY BY QUANTITY
//     );

//     const totalTax = Math.round(
//       cart.reduce(
//         (sum, item) =>
//           sum + calculateTaxAmount(item.price * item.quantity, item.tax_rate), // MULTIPLY PRICE BY QUANTITY
//         0
//       )
//     );

//     // 🔹 FIX: GENERATE KLARNA ORDER LINES WITH CORRECT QUANTITIES
//     const orderLines = cart.map((item) => {
//       const totalTaxAmount = calculateTaxAmount(item.price * item.quantity, item.tax_rate);

//       return {
//         type: "physical",
//         reference: item.id,
//         name: item.name,
//         quantity: item.quantity, // SET ACTUAL QUANTITY
//         quantity_unit: "pcs",
//         unit_price: item.price, // PRICE PER UNIT
//         tax_rate: item.tax_rate,
//         total_amount: item.price * item.quantity, // MULTIPLY PRICE BY QUANTITY
//         total_tax_amount: totalTaxAmount, // MULTIPLY TAX AMOUNT BY QUANTITY
//       };
//     });

//     try {
//       // Send request to create Klarna order
//       const response = await fetch("/api/klarna-order", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           purchase_country: "SE",
//           purchase_currency: "SEK",
//           locale: "sv-SE",
//           order_amount: totalAmount,
//           order_tax_amount: totalTax,
//           order_lines: orderLines,
//           merchant_urls: {
//             terms: "https://masilver.netlify.app/terms",
//             checkout: "https://masilver.netlify.app/checkout",
//             confirmation: "https://masilver.netlify.app/confirmation?order_id={checkout.order.id}",
//             push: "https://masilver.netlify.app/api/push?order_id={checkout.order.id}",
//           },
//         }),
//       });

//       // Handle the Klarna API response
//       const data = await response.json();
//       if (response.ok) {
//         setHtmlSnippet(data.html_snippet);
//       } else {
//         console.error("Error creating Klarna order:", data);
//       }
//     } catch (error) {
//       console.error("Error creating Klarna order:", error);
//     }
//   };

//   return (
//     <div>
//       <h1>Checkout</h1>
//       <button onClick={createOrder}>Create Klarna Order</button>
//       {htmlSnippet && <KlarnaWidget htmlSnippet={htmlSnippet} />}
//     </div>
//   );
// };

// export default CheckoutPage;


"use client";

import { useCart } from "../context/CartContext";
import KlarnaWidget from "../components/KlarnaWidget";
import { useState } from "react";

const CheckoutPage = () => {
  const { cart } = useCart();
  const [htmlSnippet, setHtmlSnippet] = useState("");

  const createOrder = async () => {
    // 🔹 NEW: Send only product IDs and quantities to the server
    const cartItems = cart.map((item) => ({
      id: item.id,
      quantity: item.quantity,
    }));

    try {
      // 🔹 FIX: Now the price calculation happens on the server
      const response = await fetch("/api/klarna-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartItems }), // Send only IDs & quantities
      });

      // Handle Klarna API response
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
      <button onClick={createOrder}>Create Klarna Order</button>
      {htmlSnippet && <KlarnaWidget htmlSnippet={htmlSnippet} />}
    </div>
  );
};

export default CheckoutPage;
