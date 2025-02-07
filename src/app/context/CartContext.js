// 'use client'

// import { createContext, useContext, useReducer, useEffect } from 'react'

// // Reducer för kundkorgslogik
// const cartReducer = (state, action) => {
//     switch (action.type) {
//         case 'ADD_TO_CART':
//             return [...state, action.payload]
//         case 'REMOVE_FROM_CART':
//             return state.filter((item) => item.id !== action.payload)
//         case 'CLEAR_CART':
//             return []
//         default:
//             throw new Error(`Unhandled action type: ${action.type}`)
//     }
// }

// // Context och Provider
// const CartContext = createContext()

// export const CartProvider = ({ children }) => {
//     const [state, dispatch] = useReducer(cartReducer, [], () => {
//         if (typeof window !== 'undefined') {
//             const storedCart = localStorage.getItem('cart')
//             return storedCart ? JSON.parse(storedCart) : []
//         }
//         return []
//     })

//     // Uppdatera localStorage när kundkorgen ändras
//     useEffect(() => {
//         if (typeof window !== 'undefined') {
//             localStorage.setItem('cart', JSON.stringify(state))
//         }
//     }, [state])

//     return (
//         <CartContext.Provider value={{ cart: state, dispatch }}>
//             {children}
//         </CartContext.Provider>
//     )
// }

// // Hook för att använda context
// export const useCart = () => useContext(CartContext)

'use client';

import { createContext, useContext, useReducer, useEffect } from 'react';

// 🛠 Reducer function to handle cart logic
const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART': {
            const existingItem = state.find(item => item.id === action.payload.id);

            if (existingItem) {
                // 🔹 If item exists, increase quantity instead of adding a duplicate
                return state.map(item =>
                    item.id === action.payload.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                // 🔹 If item does not exist, add it with a quantity of 1
                return [...state, { ...action.payload, quantity: 1 }];
            }
        }

        case 'REMOVE_FROM_CART':
            // 🔹 Removes an item completely from the cart
            return state.filter(item => item.id !== action.payload);

        case 'INCREASE_QUANTITY': {
            // 🔹 Increases quantity of an item
            return state.map(item =>
                item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
            );
        }

        case 'DECREASE_QUANTITY': {
            // 🔹 Decreases quantity but prevents it from going below 1
            return state.map(item =>
                item.id === action.payload
                    ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
                    : item
            );
        }

        case 'CLEAR_CART':
            // 🔹 Clears the entire cart
            return [];

        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
};

// 🛒 Create Cart Context
const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, [], () => {
        // 🔹 Load cart from localStorage on initialization
        if (typeof window !== 'undefined') {
            const storedCart = localStorage.getItem('cart');
            return storedCart ? JSON.parse(storedCart) : [];
        }
        return [];
    });

    // 🔹 Update localStorage when cart state changes
    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('cart', JSON.stringify(state));
        }
    }, [state]);

    return (
        <CartContext.Provider value={{ cart: state, dispatch }}>
            {children}
        </CartContext.Provider>
    );
};

// 🔹 Custom hook to access the cart context
export const useCart = () => useContext(CartContext);

