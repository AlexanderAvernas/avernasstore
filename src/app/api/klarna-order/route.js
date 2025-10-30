import { fetchProducts } from "../../lib/contentful";
import { createKustomOrder } from "../../utils/kustomApi";

// 🔸 Lägg till frakt som konstanter
const SHIPPING_FEE = 3900; // 39 kr i öre
const SHIPPING_TAX_RATE = 2500; // 25% moms

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
    const productMap = new Map(allProducts.map((p) => [p.id, p]));

    // 🔹 Step 3: Validate each item in the cart and use real price data
    const orderLines = cartItems.map((cartItem) => {
        const { id, quantity, ringSize, letter } = cartItem;
        const product = productMap.get(id);
        if (!product) throw new Error(`Invalid product ID: ${id}`)

        const totalAmount = product.price * quantity;
        const totalTaxAmount = totalAmount - Math.round(totalAmount / (1 + product.tax_rate / 10000));

        // Bygg produktnamnet med extra info
        let productName = product.name;
        if (ringSize) {
          productName += ` (Storlek: ${ringSize})`;
        }
        if (letter) {
          productName += ` (Bokstav: ${letter})`;
        }

        return {
          type: 'physical',
          reference: product.id,
          name: productName,
          quantity,
          quantity_unit: 'pcs',
          unit_price: product.price,
          tax_rate: product.tax_rate,
          total_amount: totalAmount,
          total_tax_amount: totalTaxAmount,
        };
      });

       // 🔹  Lägg till frakt som en egen order_line
    const shippingTaxAmount =
    SHIPPING_FEE - Math.round(SHIPPING_FEE / (1 + SHIPPING_TAX_RATE / 10000));

  orderLines.push({
    type: "shipping_fee",
    reference: "shipping",
    name: "Frakt",
    quantity: 1,
    unit_price: SHIPPING_FEE,
    tax_rate: SHIPPING_TAX_RATE,
    total_amount: SHIPPING_FEE,
    total_tax_amount: shippingTaxAmount,
  });



    // 🔹 Step 4: Ensure valid total amounts
    const totalAmount = orderLines.reduce((sum, item) => sum + item.total_amount, 0);
    const totalTax = orderLines.reduce((sum, item) => sum + item.total_tax_amount, 0);

    if (totalAmount <= 0) {
      throw new Error("Total amount must be greater than 0");
    }

    // 🔹 Step 5: Create Klarna order with validated data
    const klarnaOrder = await createKustomOrder({
      purchase_country: "SE",
      purchase_currency: "SEK",
      locale: "sv-SE",
      order_amount: totalAmount,
      order_tax_amount: totalTax,
      order_lines: orderLines,
      merchant_urls: {
        terms: "https://margaretaavernas.se/terms",
        checkout: "https://margaretaavernas.se/checkout",
        confirmation: "https://margaretaavernas.se/confirmation?order_id={checkout.order.id}",
        push: "https://margaretaavernas.se/api/push?order_id={checkout.order.id}",
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
