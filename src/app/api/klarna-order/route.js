// import { createKlarnaOrder } from '../../utils/klarnaApi';

// export async function POST(req) {
//   try {
//     const orderDetails = await req.json(); // Parse incoming request JSON body
//     console.log('Received order details:', orderDetails);
//     const klarnaOrder = await createKlarnaOrder(orderDetails); // Create the Klarna order using your utility function
//     console.log('Klarna Order Created:', klarnaOrder);
//     return new Response(JSON.stringify(klarnaOrder), { status: 200 });
//   } catch (error) {
//     console.error('Error creating Klarna order:', error);
//     return new Response(
//       JSON.stringify({
//         message: 'Failed to create Klarna order',
//         details: error.response?.data || error.message,
//       }),
//       { status: 500 }
//     );
//   }
// }

import { fetchProducts } from "../../lib/contentful";
import { createKlarnaOrder } from "../../utils/klarnaApi";

export async function POST(req) {
  try {
    const { cartItems } = await req.json();

    // 🔹 Step 1: Validate request structure
    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      return new Response(
        JSON.stringify({ message: "Invalid request: cartItems must be a non-empty array" }),
        { status: 400 }
      );
    }

    // 🔹 Step 2: Fetch product data from Contentful (ensures real products)
    const allProducts = await fetchProducts();
    const validProductIds = new Set(allProducts.map((p) => p.id));

    // 🔹 Step 3: Validate each item in the cart
    const orderLines = cartItems.map((cartItem) => {
      const { id, quantity } = cartItem;

      if (!validProductIds.has(id)) {
        throw new Error(`Invalid product ID: ${id}`);
      }

      if (typeof quantity !== "number" || quantity < 1 || quantity > 20) {
        throw new Error(`Invalid quantity for product ${id}: ${quantity}`);
      }

      // Get product data securely
      const product = allProducts.find((p) => p.id === id);
      const totalAmount = product.price * quantity;
      const totalTaxAmount = totalAmount - Math.round(totalAmount / (1 + product.tax_rate / 10000));

      return {
        type: "physical",
        reference: product.id,
        name: product.name,
        quantity,
        quantity_unit: "pcs",
        unit_price: product.price,
        tax_rate: product.tax_rate,
        total_amount: totalAmount,
        total_tax_amount: totalTaxAmount,
      };
    });

    // 🔹 Step 4: Ensure valid total amounts
    const totalAmount = orderLines.reduce((sum, item) => sum + item.total_amount, 0);
    const totalTax = orderLines.reduce((sum, item) => sum + item.total_tax_amount, 0);

    if (totalAmount <= 0) {
      throw new Error("Total amount must be greater than 0");
    }

    // 🔹 Step 5: Create Klarna order with validated data
    const klarnaOrder = await createKlarnaOrder({
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
    });

    console.log("Klarna Order Created:", klarnaOrder);
    return new Response(JSON.stringify(klarnaOrder), { status: 200 });

  } catch (error) {
    console.error("Error creating Klarna order:", error);
    return new Response(
      JSON.stringify({
        message: "Failed to create Klarna order",
        details: error.message,
      }),
      { status: 400 }
    );
  }
}
