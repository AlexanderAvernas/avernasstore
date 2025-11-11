// "use client";

// import { createContext, useContext, useReducer, useEffect } from 'react';
// import { fetchProducts } from '../lib/contentful'; // Importera Contentful-funktionen

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
//     products: [], // Initialt tom produktlista
//     cart: [], // Initialt tom varukorg
//   });

//   // Ladda produkter från Contentful vid mount
//   useEffect(() => {
//     const loadProducts = async () => {
//       try {
//         const products = await fetchProducts(); // Hämta produkter från Contentful
//         dispatch({ type: 'SET_PRODUCTS', payload: products });
//       } catch (error) {
//         console.error('Error fetching products:', error);
//         dispatch({ type: 'SET_PRODUCTS', payload: [] }); // Fallback till tom lista
//       }
//     };

//     loadProducts();
//   }, []);

//   return (
//     <ProductsContext.Provider value={{ state, dispatch }}>
//       {children}
//     </ProductsContext.Provider>
//   );
// };

// // Hook för att använda Context
// export const useProducts = () => useContext(ProductsContext);

"use client";

import { createContext, useContext, useReducer, useEffect } from "react";
// import { fetchProducts } from "../lib/contentful"; // Import Contentful function
import { fetchProducts } from "../lib/sanity";

// Reducer to manage state
const productsReducer = (state, action) => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return {
        ...state,
        products: action.payload,
        filteredProducts: action.payload, // Initially show all products
      };
    case "SET_CATEGORY_FILTER":
      return {
        ...state,
        selectedCategory: action.payload,
        filteredProducts:
          action.payload === "all"
            ? state.products
            : state.products.filter(
                (product) => product.category === action.payload
              ),
      };
    case "ADD_TO_CART":
      return { ...state, cart: [...state.cart, action.payload] };
    case "CLEAR_CART":
      return { ...state, cart: [] };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

// Create Context
const ProductsContext = createContext();

// Provider Component
export const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productsReducer, {
    products: [],
    filteredProducts: [],
    selectedCategory: "all",
    cart: [],
  });

  // Load products from Contentful on mount
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const products = await fetchProducts();
        dispatch({ type: "SET_PRODUCTS", payload: products });
      } catch (error) {
        console.error("Error fetching products:", error);
        dispatch({ type: "SET_PRODUCTS", payload: [] });
      }
    };

    loadProducts();
  }, []);

  return (
    <ProductsContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductsContext.Provider>
  );
};

// Hook for using context
export const useProducts = () => useContext(ProductsContext);
