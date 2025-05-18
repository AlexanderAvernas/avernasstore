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
import { useState, useEffect } from "react";

const CheckoutPage = () => {
  const { cart } = useCart();
  const [htmlSnippet, setHtmlSnippet] = useState("");
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);

  // Funktion för att beräkna totalpris och skatt
  const calculateTotals = () => {
    let totalAmount = 0;
    let totalTax = 0;

    cart.forEach((item) => {
      totalAmount += item.price * item.quantity;
      totalTax += ((item.price * item.tax_rate) / 10000) * item.quantity;
    });

    return { totalAmount, totalTax };
  };

  const { totalAmount, totalTax } = calculateTotals();

  // Skapa Klarna-order automatiskt när sidan laddas
  useEffect(() => {
    const createOrder = async () => {
      if (cart.length === 0) return;

      const cartItems = cart.map((item) => ({
        id: item.id,
        quantity: item.quantity,
        ringSize: item.ringSize,
      }));

      try {
        const response = await fetch("/api/klarna-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cartItems }),
        });

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

    createOrder();
  }, [cart]); // Körs när `cart` uppdateras

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Checkout</h1>

      {/* Ordersammanfattning knapp */}
      <button
        onClick={() => setIsSummaryOpen(!isSummaryOpen)}
        className="w-full bg-gray-200 text-gray-800 py-2 rounded-lg font-medium hover:bg-gray-300 transition"
      >
        {isSummaryOpen ? "Dölj ordersammanfattning ▲" : "Visa ordersammanfattning ▼"}
      </button>

      {/* Dropdown med orderdetaljer */}
      {isSummaryOpen && (
        <div className="bg-white border mt-2 p-4 rounded-lg shadow-md">
          {cart.length === 0 ? (
            <p className="text-gray-600">Din varukorg är tom.</p>
          ) : (
            <>
              {cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between py-2 border-b last:border-b-0">
                  <div className="flex items-center space-x-4">
                    <img src={item.image} alt={item.name} className="w-16 h-16 rounded-md object-cover" />
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">Antal: {item.quantity}</p>
                      {item.ringSize && (
                        <p className="text-sm text-gray-600">Ringstorlek: {item.ringSize}</p>
                      )}
                    </div>
                  </div>
                  <p className="font-medium">{(item.price / 100).toFixed(2)} SEK</p>
                </div>
              ))}
              <div className="mt-4 border-t pt-2">
                <p className="text-lg font-semibold">Total: {(totalAmount / 100).toFixed(2)} SEK</p>
                <p className="text-gray-600">Skatt: {(totalTax / 100).toFixed(2)} SEK</p>
              </div>
            </>
          )}
        </div>
      )}

      {/* Klarna Widget (visas automatiskt) */}
      {htmlSnippet && <KlarnaWidget htmlSnippet={htmlSnippet} />}
    </div>
  );
};

export default CheckoutPage;
