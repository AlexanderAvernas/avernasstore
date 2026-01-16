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
            const { id, ringSize, letters, diameter, chainLength, color } = action.payload;

            // 🆕 UPPDATERAD: Skapa unik nyckel som inkluderar alla bokstäver
           const lettersKey = letters ? letters.sort().join('-') : 'noletters';
           const uniqueKey = `${id}-${ringSize || 'nosize'}-${lettersKey}-${diameter || 'nodiameter'}-${chainLength || 'nochain'}-${color || 'nocolor'}`;

           const existingItem = state.cart.find(item => {
               const itemLettersKey = item.letters ? item.letters.sort().join('-') : 'noletters';
               const itemKey = `${item.id}-${item.ringSize || 'nosize'}-${itemLettersKey}-${item.diameter || 'nodiameter'}-${item.chainLength || 'nochain'}-${item.color || 'nocolor'}`;
               return itemKey === uniqueKey;
           });

           if (existingItem) {
               return {
                   ...state,
                   cart: state.cart.map(item => {
                       const itemLettersKey = item.letters ? item.letters.sort().join('-') : 'noletters';
                       const itemKey = `${item.id}-${item.ringSize || 'nosize'}-${itemLettersKey}-${item.diameter || 'nodiameter'}-${item.chainLength || 'nochain'}-${item.color || 'nocolor'}`;
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
            // 🔹 Removes an item completely from the cart
            return {
                ...state, // 🆕 NYTT
                cart: state.cart.filter((item, index) => index !== action.payload),
            };

        case 'INCREASE_QUANTITY': {
            // 🔹 Increases quantity of an item by index
            return {
                ...state, // 🆕 NYTT
                cart: state.cart.map((item, index) =>
                    index === action.payload
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                ),
            };
        }

        case 'DECREASE_QUANTITY': {
            // 🔹 Decreases quantity but prevents it from going below 1
            return {
                ...state, // 🆕 NYTT
                cart: state.cart.map((item, index) =>
                    index === action.payload
                        ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
                        : item
                ),
            };
        }

        case 'CLEAR_CART':
            // 🔹 Clears the entire cart
            return {
                ...state, // 🆕 NYTT
                cart: [],
            };

        /* ======================================================
           🆕 NYTT: Öppna / stäng cart (drawer / overlay)
        ====================================================== */
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

    /* 🔧 ÄNDRAT:
       useReducer använder nu initialState (objekt)
    */
    const [state, dispatch] = useReducer(cartReducer, initialState, () => {
        // 🔹 Load cart from localStorage on initialization
        if (typeof window !== 'undefined') {
            const storedCart = localStorage.getItem('cart');

            return storedCart
                ? { ...initialState, cart: JSON.parse(storedCart) } // 🆕 NYTT
                : initialState;
        }
        return initialState;
    });

    /* 🔧 ÄNDRAT:
       Vi sparar ENDAST cart-arrayen i localStorage
       (inte UI-state som isCartOpen)
    */
    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('cart', JSON.stringify(state.cart));
        }
    }, [state.cart]);

    return (
        <CartContext.Provider
            value={{
                cart: state.cart,        // 🆕 NYTT
                isCartOpen: state.isCartOpen, // 🆕 NYTT
                dispatch,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

// 🔹 Custom hook to access the cart context
export const useCart = () => useContext(CartContext);
