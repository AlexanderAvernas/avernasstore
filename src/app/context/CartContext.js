'use client';

import { createContext, useContext, useReducer, useEffect } from 'react';

/* ======================================================
   🆕 NYTT: State är nu ett objekt istället för en array
   Detta gör att vi kan ha både cart-data och UI-state
====================================================== */
const initialState = {
    cart: [],
    isCartOpen: false, // 🆕 NYTT – styr om cart-drawern är öppen
}

// 🛠 Reducer function to handle cart logic
const cartReducer = (state, action) => {
    switch (action.type) {

        case 'ADD_TO_CART': {
            const { id, ringSize, letters, diameter, chainLength, color, braceletSize } = action.payload;

            // Skapa unik nyckel som inkluderar alla produktvariationer inkl braceletSize
           const lettersKey = letters ? letters.sort().join('-') : 'noletters';
           const uniqueKey = `${id}-${ringSize || 'nosize'}-${lettersKey}-${diameter || 'nodiameter'}-${chainLength || 'nochain'}-${color || 'nocolor'}-${braceletSize || 'nobracelet'}`;

           const existingItem = state.cart.find(item => {
               const itemLettersKey = item.letters ? item.letters.sort().join('-') : 'noletters';
               const itemKey = `${item.id}-${item.ringSize || 'nosize'}-${itemLettersKey}-${item.diameter || 'nodiameter'}-${item.chainLength || 'nochain'}-${item.color || 'nocolor'}-${item.braceletSize || 'nobracelet'}`;
               return itemKey === uniqueKey;
           });

           if (existingItem) {
               return {
                   ...state,
                   cart: state.cart.map(item => {
                       const itemLettersKey = item.letters ? item.letters.sort().join('-') : 'noletters';
                       const itemKey = `${item.id}-${item.ringSize || 'nosize'}-${itemLettersKey}-${item.diameter || 'nodiameter'}-${item.chainLength || 'nochain'}-${item.color || 'nocolor'}-${item.braceletSize || 'nobracelet'}`;
                       return itemKey === uniqueKey
                           ? { ...item, quantity: item.quantity + 1 }
                           : item;
                   }),
               };
           } else {
               return {
                   ...state,
                   cart: [...state.cart, { ...action.payload, quantity: 1 }],
               };
           }
       }

        case 'REMOVE_FROM_CART':
            return {
                ...state,
                cart: state.cart.filter((item, index) => index !== action.payload),
            };

        case 'INCREASE_QUANTITY': {
            return {
                ...state,
                cart: state.cart.map((item, index) =>
                    index === action.payload
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                ),
            };
        }

        case 'DECREASE_QUANTITY': {
            return {
                ...state,
                cart: state.cart.map((item, index) =>
                    index === action.payload
                        ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
                        : item
                ),
            };
        }

        case 'CLEAR_CART':
            return {
                ...state,
                cart: [],
            };

        case 'OPEN_CART':
            return { ...state, isCartOpen: true };

        case 'CLOSE_CART':
            return { ...state, isCartOpen: false };

        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
};

// 🛒 Create Cart Context
const CartContext = createContext();

export const CartProvider = ({ children }) => {

    const [state, dispatch] = useReducer(cartReducer, initialState, () => {
        if (typeof window !== 'undefined') {
            const storedCart = localStorage.getItem('cart');
            return storedCart
                ? { ...initialState, cart: JSON.parse(storedCart) }
                : initialState;
        }
        return initialState;
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('cart', JSON.stringify(state.cart));
        }
    }, [state.cart]);

    return (
        <CartContext.Provider
            value={{
                cart: state.cart,
                isCartOpen: state.isCartOpen,
                dispatch,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

// 🔹 Custom hook to access the cart context
export const useCart = () => useContext(CartContext);