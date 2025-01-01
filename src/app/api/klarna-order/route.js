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

import { createKlarnaOrder } from '../../utils/klarnaApi';

export async function POST(req) {
  try {
    const orderDetails = await req.json(); // Parse incoming request JSON body
    const { cart } = orderDetails; // Retrieve cart from request

    // Calculate totals based on cart
    const order_amount = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const order_tax_amount = cart.reduce((total, item) => total + (item.price * item.quantity * item.tax_rate) / 10000, 0);

    // Build order lines
    const order_lines = cart.map((item) => ({
      type: 'physical',
      reference: item.id,
      name: item.name,
      quantity: item.quantity,
      quantity_unit: 'st',
      unit_price: item.price,
      tax_rate: item.tax_rate,
      total_amount: item.price * item.quantity,
      total_tax_amount: (item.price * item.quantity * item.tax_rate) / 10000,
    }));

    // Build Klarna order details
    const klarnaOrderPayload = {
      purchase_country: 'SE',
      purchase_currency: 'SEK',
      locale: 'sv-SE',
      order_amount,
      order_tax_amount,
      order_lines,
      merchant_urls: {
        terms: 'https://masilver.com/terms',
        checkout: 'https://masilver.com/checkout',
        confirmation: 'https://masilver.com/confirmation?order_id={checkout.order.id}',
        push: 'https://masilver.com/api/push?order_id={checkout.order.id}',
      },
    };

    // Create Klarna order
    const klarnaOrder = await createKlarnaOrder(klarnaOrderPayload);
    return new Response(JSON.stringify(klarnaOrder), { status: 200 });
  } catch (error) {
    console.error('Error creating Klarna order:', error);
    return new Response(
      JSON.stringify({
        message: 'Failed to create Klarna order',
        details: error.response?.data || error.message,
      }),
      { status: 500 }
    );
  }
}
