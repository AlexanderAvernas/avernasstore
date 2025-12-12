import { getKustomOrder } from "../../../utils/kustomApi";

export async function GET(request, context) {
  try {
    // 🔥 FIX: Netlify passes params as a Promise — we MUST await it
    const resolvedParams = await context.params;

    const orderId = resolvedParams?.orderId;

    if (!orderId) {
      console.error("No orderId resolved from params:", resolvedParams);
      return Response.json(
        { message: "Missing orderId" },
        { status: 400 }
      );
    }

    // 🔹 Fetch order from Kustom
    const data = await getKustomOrder(orderId);

    return Response.json(data, { status: 200 });

  } catch (e) {
    console.error("GET ORDER ERROR:", e);

    return Response.json(
      {
        message: "Failed to fetch order",
        details: e?.message || String(e)
      },
      { status: 500 }
    );
  }
}

/* 
import { getKustomOrder } from '../../../utils/kustomApi'

export async function GET(req, { params }) {
  const orderId = params.orderId;

  try {
    const data = await getKustomOrder(orderId);
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({
      message: "Failed to fetch order",
      details: e.message
    }), { status: 500 });
  }
} */



/* import { getKlarnaOrder } from '../../../utils/klarnaApi';
export async function GET(req, { params }) {
  const { orderId } = params;

//   console.log(`Fetching order details for Order ID: ${orderId}`);

  try {
    // Fetch the order details from Klarna's Checkout API
    const orderDetails = await getKustomOrder(orderId);

    // console.log('Order details from Klarna:', orderDetails);

    // Return the full order details, including the `html_snippet`
    return new Response(JSON.stringify(orderDetails), { status: 200 });
  } catch (error) {
    // console.error('Error fetching Klarna order:', error.response?.data || error.message);

    return new Response(
      JSON.stringify({
        message: 'Failed to fetch order details',
        details: error.response?.data || error.message,
      }),
      { status: 500 }
    );
  }
} */
