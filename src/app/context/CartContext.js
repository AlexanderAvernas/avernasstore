'use client';

import { createContext, useContext, useReducer, useEffect } from 'react';

// 🛠 Reducer function to handle cart logic
const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART': {
            const { id, ringSize, letter, diameter, chainLength } = action.payload;

            // Skapa en unik identifierare baserat på produkt-ID och alla val
            const uniqueKey = `${id}-${ringSize || 'nosize'}-${letter || 'noletter'}-${diameter || 'nodiameter'}-${chainLength || 'nochain'}`;

            const existingItem = state.find(item => {
                const itemKey = `${item.id}-${item.ringSize || 'nosize'}-${item.letter || 'noletter'}-${item.diameter || 'nodiameter'}-${item.chainLength || 'nochain'}`;
                return itemKey === uniqueKey;
            });

            if (existingItem) {
                // 🔹 Om exakt samma produkt med samma val finns, öka kvantiteten
                return state.map(item => {
                    const itemKey = `${item.id}-${item.ringSize || 'nosize'}-${item.letter || 'noletter'}-${item.diameter || 'nodiameter'}-${item.chainLength || 'nochain'}`;
                    return itemKey === uniqueKey
                        ? { ...item, quantity: item.quantity + 1 }
                        : item;
                });
            } else {
                // 🔹 Annars lägg till som ny produkt
                return [...state, { ...action.payload, quantity: 1 }];
            }
        }

        case 'REMOVE_FROM_CART':
            // 🔹 Removes an item completely from the cart
            return state.filter((item, index) => index !== action.payload);

        case 'INCREASE_QUANTITY': {
            // 🔹 Increases quantity of an item by index
            return state.map((item, index) =>
                index === action.payload ? { ...item, quantity: item.quantity + 1 } : item
            );
        }

        case 'DECREASE_QUANTITY': {
            // 🔹 Decreases quantity but prevents it from going below 1
            return state.map((item, index) =>
                index === action.payload
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
