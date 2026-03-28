import axios from 'axios';

// 🔹 Configure Kustom API instance med Basic Auth enligt dokumentationen
const kustomApi = axios.create({
  baseURL: 'https://api.kustom.co',  // eller rätt base-URL för Playground enligt dokumentationen
  headers: {
    'Content-Type': 'application/json',
    // 🔹 Enligt dokumentationen: Authorization: Basic <API key>
    'Authorization': `Basic ${process.env.KUSTOM_API_KEY}`,
  },
});

// 🔹 Create an order using Kustom API
export const createKustomOrder = async (orderDetails) => {
  try {
    const response = await kustomApi.post('/checkout/v3/orders', orderDetails);
    return response.data;
  } catch (error) {
    console.error('Error creating Kustom order:', error.response?.data || error.message);
    throw error;
  }
};

// 🔹 Fetch Kustom order details by order ID
export const getKustomOrder = async (orderId) => {
  try {
    const response = await kustomApi.get(`/checkout/v3/orders/${orderId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Kustom order:', error.response?.data || error.message);
    throw error;
  }
};
