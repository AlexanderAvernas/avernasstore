import { getKustomOrder } from "../../../utils/kustomApi";

export async function GET(request, context) {
  try {
    // Netlify/Next context.params är korrekt här
    const orderId = context?.params?.orderId;

    if (!orderId) {
      console.error("No orderId found in context.params", context);
      return Response.json(
        { message: "Missing orderId" },
        { status: 400 }
      );
    }

    const data = await getKustomOrder(orderId);

    return Response.json(data, { status: 200 });
  } catch (e) {
    console.error("GET ORDER ERROR:", e);

    return Response.json(
      {
        message: "Failed to fetch order",
        details: e?.message || e
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
