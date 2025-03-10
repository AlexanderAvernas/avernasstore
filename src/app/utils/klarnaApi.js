import axios from 'axios';

// Configure Klarna API instance
const klarnaApi = axios.create({
  baseURL: 'https://api.playground.klarna.com', // Klarna Test API endpoint
  auth: {
    username: process.env.KLARNA_USERNAME, // Use environment variables for credentials
    password: process.env.KLARNA_PASSWORD,
  },
  headers: {
    'Content-Type': 'application/json',
  },
});

// Create an order using Klarna API
export const createKlarnaOrder = async (orderDetails) => {
  try {
    const response = await klarnaApi.post('/checkout/v3/orders', orderDetails);
    return response.data;
  } catch (error) {
    console.error('Error creating Klarna order:', error.response?.data || error.message);
    throw error;
  }
};

// Fetch Klarna order details by order ID
export const getKlarnaOrder = async (orderId) => {
  try {
    const response = await klarnaApi.get(`/checkout/v3/orders/${orderId}`);
    // This should return the `html_snippet` in addition to other details
    return response.data; // Includes `html_snippet`, `status`, etc.
  } catch (error) {
    console.error('Error fetching Klarna order:', error.response?.data || error.message);
    throw error;
  }
};
