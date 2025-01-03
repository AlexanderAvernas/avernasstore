'use client'

import { createContext, useContext, useReducer, useEffect } from 'react'

// Reducer för kundkorgslogik
const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            return [...state, action.payload]
        case 'REMOVE_FROM_CART':
            return state.filter((item) => item.id !== action.payload)
        case 'CLEAR_CART':
            return []
        default:
            throw new Error(`Unhandled action type: ${action.type}`)
    }
}

// Context och Provider
const CartContext = createContext()

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, [], () => {
        if (typeof window !== 'undefined') {
            const storedCart = localStorage.getItem('cart')
            return storedCart ? JSON.parse(storedCart) : []
        }
        return []
    })

    // Uppdatera localStorage när kundkorgen ändras
    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('cart', JSON.stringify(state))
        }
    }, [state])

    return (
        <CartContext.Provider value={{ cart: state, dispatch }}>
            {children}
        </CartContext.Provider>
    )
}

// Hook för att använda context
export const useCart = () => useContext(CartContext)
