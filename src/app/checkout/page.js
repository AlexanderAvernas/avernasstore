
'use client'

import { useCart } from '../context/CartContext'
import KlarnaWidget from '../components/KlarnaWidget'
import { useState, useEffect } from 'react'

const SHIPPING_FEE = 3900

const CheckoutPage = () => {
    const { cart } = useCart()
    const [htmlSnippet, setHtmlSnippet] = useState('')
    const [isSummaryOpen, setIsSummaryOpen] = useState(false)

    // Funktion för att beräkna totalpris och skatt
    const calculateTotals = () => {
        let totalAmount = 0
        let totalTax = 0

        cart.forEach((item) => {
            const price = item.specialPrice || item.price // ← LÄGG TILL denna rad
            totalAmount += price * item.quantity // ← ÄNDRA från item.price till price
            totalTax += ((price * item.tax_rate) / 10000) * item.quantity // ← ÄNDRA från item.price till price
        })

        return { totalAmount, totalTax, grandTotal: totalAmount + SHIPPING_FEE }
    }

    const { totalAmount, totalTax, grandTotal } = calculateTotals()

    // Skapa Klarna-order automatiskt när sidan laddas
    useEffect(() => {
        const createOrder = async () => {
            if (cart.length === 0) return

            const cartItems = cart.map((item) => ({
                id: item.id,
                quantity: item.quantity,
                ringSize: item.ringSize,
                letter: item.letter,
                diameter: item.diameter,
                chainLength: item.chainLength,
                color: item.color
            }))

            try {
                const response = await fetch('/api/klarna-order', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ cartItems })
                })

                const data = await response.json()
                if (response.ok) {
                    setHtmlSnippet(data.html_snippet)
                } else {
                    console.error('Error creating Klarna order:', data)
                }
            } catch (error) {
                console.error('Error creating Klarna order:', error)
            }
        }

        createOrder()
    }, [cart]) // Körs när `cart` uppdateras

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-semibold mb-4">Checkout</h1>

            {/* Ordersammanfattning knapp */}
            <button
                onClick={() => setIsSummaryOpen(!isSummaryOpen)}
                className="w-full bg-gray-200 text-gray-800 py-2 rounded-lg font-medium hover:bg-gray-300 transition"
            >
                {isSummaryOpen
                    ? 'Dölj ordersammanfattning ▲'
                    : 'Visa ordersammanfattning ▼'}
            </button>

            {/* Dropdown med orderdetaljer */}
            {isSummaryOpen && (
                <div className="bg-white border mt-2 p-4 rounded-lg shadow-md">
                    {cart.length === 0 ? (
                        <p className="text-gray-600">Din varukorg är tom.</p>
                    ) : (
                        <>
                            {cart.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-center justify-between py-2 border-b last:border-b-0"
                                >
                                    <div className="flex items-center space-x-4">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-16 h-16 rounded-md object-cover"
                                        />
                                        <div>
                                            <p className="font-medium">
                                                {item.name}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                Antal: {item.quantity}
                                            </p>
                                            {item.ringSize && (
                                                <p className="text-sm text-gray-600">
                                                    Ringstorlek: {item.ringSize}
                                                </p>
                                            )}
                                            {item.letter && (
                                                <p className="text-sm text-gray-600">
                                                    Bokstav: {item.letter}
                                                </p>
                                            )}
                                            {item.diameter && (
                                                <p className="text-sm text-gray-600">
                                                    Diameter: {item.diameter} cm
                                                </p>
                                            )}
                                            {item.chainLength && (
                                                <p className="text-sm text-gray-600">
                                                    Kedjelängd:{' '}
                                                    {item.chainLength} cm
                                                </p>
                                            )}
                                            {item.color && (
                                                <p className="text-sm text-gray-600">
                                                    Färg:{' '}
                                                    <span className="capitalize">{item.color.replace('-', ' ')}</span>
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    {/* Visa pris med rabatt */}
                                    {item.specialPrice &&
                                    item.specialPrice < item.price ? (
                                        <div className="text-right">
                                            <p className="text-gray-500 line-through text-xs">
                                                {(item.price / 100).toFixed(2)}{' '}
                                                SEK
                                            </p>
                                            <p className="text-red-600 font-bold">
                                                {(
                                                    item.specialPrice / 100
                                                ).toFixed(2)}{' '}
                                                SEK
                                            </p>
                                        </div>
                                    ) : (
                                        <p className="font-medium">
                                            {(item.price / 100).toFixed(2)} SEK
                                        </p>
                                    )}
                                </div>
                            ))}

                            {/* 🔹 Frakt */}
                            <div className="flex justify-between py-2 border-b">
                                <p className="font-medium">Frakt</p>
                                <p className="font-medium">
                                    {(SHIPPING_FEE / 100).toFixed(2)} SEK
                                </p>
                            </div>

                            <div className="mt-4 border-t pt-2">
                                <p className="text-lg font-semibold">
                                    Total: {(grandTotal / 100).toFixed(2)} SEK
                                </p>
                                <p className="text-gray-600">
                                    Skatt: {(totalTax / 100).toFixed(2)} SEK
                                </p>
                            </div>
                        </>
                    )}
                </div>
            )}

            {/* Klarna Widget (visas automatiskt) */}
            {htmlSnippet && <KlarnaWidget htmlSnippet={htmlSnippet} />}
        </div>
    )
}

export default CheckoutPage
