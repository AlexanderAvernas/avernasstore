// "use client"

// import { createContext, useContext, useReducer, useEffect } from 'react';

// // Dummy produktlista
// const dummyProducts = [
//   {
//     id: '1',
//     name: 'Cool Product',
//     slug: 'cool-product',
//     description: 'A very cool product with awesome features.',
//     price: 10000, // Priset i minor units (100.00 SEK)
//     image: '../../../public/globe.svg',
//     tax_rate: 2500, // Moms
//   },
//   {
//     id: '2',
//     name: 'Awesome Product',
//     slug: 'awesome-product',
//     description: 'An awesome product you will love.',
//     price: 20000, // Priset i minor units (200.00 SEK)
//     image: '../../../public/file.svg',
//     tax_rate: 2500,
//   },
// ];

// // Reducer för att hantera state
// const productsReducer = (state, action) => {
//   switch (action.type) {
//     case 'SET_PRODUCTS':
//       return { ...state, products: action.payload };
//     case 'ADD_TO_CART':
//       return { ...state, cart: [...state.cart, action.payload] };
//     case 'CLEAR_CART':
//       return { ...state, cart: [] };
//     default:
//       throw new Error(`Unhandled action type: ${action.type}`);
//   }
// };

// // Context och Provider
// const ProductsContext = createContext();

// export const ProductsProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(productsReducer, {
//     products: [],
//     cart: [],
//   });

//   // Ladda dummy produkter vid mount
//   useEffect(() => {
//     dispatch({ type: 'SET_PRODUCTS', payload: dummyProducts });
//   }, []);

//   return (
//     <ProductsContext.Provider value={{ state, dispatch }}>
//       {children}
//     </ProductsContext.Provider>
//   );
// };

// // Hook för att använda Context
// export const useProducts = () => useContext(ProductsContext);

'use client';

import { createContext, useContext, useReducer, useEffect } from 'react';

// Dummy products for testing
const dummyProducts = [
  {
    id: '1',
    name: 'Cool Product',
    slug: 'cool-product',
    description: 'A very cool product with awesome features.',
    price: 10000, // Price in minor units (100.00 SEK)
    image: '/globe.svg',
    tax_rate: 2500, // VAT rate (25%)
  },
  {
    id: '2',
    name: 'Awesome Product',
    slug: 'awesome-product',
    description: 'An awesome product you will love.',
    price: 20000, // Price in minor units (200.00 SEK)
    image: '/file.svg',
    tax_rate: 2500,
  },
];

// Reducer to manage product state
const productsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return { ...state, products: action.payload };
    case 'ADD_TO_CART':
      const updatedCart = [...state.cart, action.payload];
      localStorage.setItem('cart', JSON.stringify(updatedCart)); // Save to localStorage
      return { ...state, cart: updatedCart };
    case 'CLEAR_CART':
      localStorage.removeItem('cart'); // Clear from localStorage
      return { ...state, cart: [] };
    case 'SET_CART':
      return { ...state, cart: action.payload }; // Set cart from localStorage
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

// Create context
const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productsReducer, {
    products: [],
    cart: [],
  });

  // Load products (dummy for now, Contentful later)
  useEffect(() => {
    dispatch({ type: 'SET_PRODUCTS', payload: dummyProducts });
  }, []);

  // Load cart from localStorage when the app starts
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      dispatch({ type: 'SET_CART', payload: JSON.parse(savedCart) });
    }
  }, []);

  return (
    <ProductsContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductsContext.Provider>
  );
};

// Hook for using the context
export const useProducts = () => useContext(ProductsContext);
