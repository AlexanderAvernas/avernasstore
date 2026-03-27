"use client";

import { useCart } from "../context/CartContext";
import KlarnaWidget from "../components/KlarnaWidget";
import { useState, useEffect } from "react";

const SHIPPING_FEE = 4900;

const EXTRA_LETTER_PRICES = {
  coins: 40000,
  letter: 40000,
};

const DISCOUNT_FACTOR = 0.8; // ← TILLFÄLLIG 20% RABATT – ta bort sen

const CheckoutPage = () => {
  const { cart } = useCart();
  const [htmlSnippet, setHtmlSnippet] = useState("");
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);

  const calculateTotals = () => {
    let totalAmount = 0;
    let totalTax = 0;

    cart.forEach((item) => {
      let price = Math.round((item.specialPrice || item.price) * DISCOUNT_FACTOR);

      if (item.letters && item.letters.length > 1) {
        const extraLettersCount = item.letters.length - 1;
        const pricePerExtra = Math.round(
          (EXTRA_LETTER_PRICES[item.collection] || 0) * DISCOUNT_FACTOR
        );
        price += extraLettersCount * pricePerExtra;
      }

      totalAmount += price * item.quantity;
      totalTax += ((price * item.tax_rate) / 10000) * item.quantity;
    });

    return { totalAmount, totalTax, grandTotal: totalAmount + SHIPPING_FEE };
  };

  const { totalAmount, totalTax, grandTotal } = calculateTotals();

  // Beräkna totalen UTAN rabatt för att visa besparing
  const calculateOriginalTotal = () => {
    let total = 0;
    cart.forEach((item) => {
      let price = item.specialPrice || item.price;
      if (item.letters && item.letters.length > 1) {
        const extraLettersCount = item.letters.length - 1;
        const pricePerExtra = EXTRA_LETTER_PRICES[item.collection] || 0;
        price += extraLettersCount * pricePerExtra;
      }
      total += price * item.quantity;
    });
    return total + SHIPPING_FEE;
  };

  const originalGrandTotal = calculateOriginalTotal();
  const savings = originalGrandTotal - grandTotal;

  useEffect(() => {
    const createOrder = async () => {
      if (cart.length === 0) return;

      const cartItems = cart.map((item) => ({
        id: item.id,
        quantity: item.quantity,
        ringSize: item.ringSize,
        letters: item.letters,
        diameter: item.diameter,
        chainLength: item.chainLength,
        color: item.color,
        braceletSize: item.braceletSize,
      }));

      try {
        const response = await fetch("/api/klarna-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cartItems }),
        });

        const data = await response.json();
        if (response.ok) {
          setHtmlSnippet(data.html_snippet);
        } else {
          console.error("Error creating Klarna order:", data);
        }
      } catch (error) {
        console.error("Error creating Klarna order:", error);
      }
    };

    createOrder();
  }, [cart]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Checkout</h1>

      {/* Rabattbanner */}
      <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-3 mb-4 flex items-center justify-between">
        <div>
          <p className="text-green-800 font-semibold text-sm">🎉 20% rabatt är tillämpad!</p>
          <p className="text-green-600 text-xs mt-0.5">
            Du sparar {(savings / 100).toFixed(2)} SEK på din order
          </p>
        </div>
        <span className="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded">
          -20%
        </span>
      </div>

      <button
        onClick={() => setIsSummaryOpen(!isSummaryOpen)}
        className="w-full bg-gray-200 text-gray-800 py-2 rounded-lg font-medium hover:bg-gray-300 transition"
      >
        {isSummaryOpen
          ? "Dölj ordersammanfattning ▲"
          : "Visa ordersammanfattning ▼"}
      </button>

      {isSummaryOpen && (
        <div className="bg-white border mt-2 p-4 rounded-lg shadow-md">
          {cart.length === 0 ? (
            <p className="text-gray-600">Din varukorg är tom.</p>
          ) : (
            <>
              {cart.map((item, index) => (
                <div
                  key={`${item.id}-${index}`}
                  className="flex items-center justify-between py-2 border-b last:border-b-0"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-md object-cover"
                    />
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">
                        Antal: {item.quantity}
                      </p>
                      {item.ringSize && (
                        <p className="text-sm text-gray-600">
                          Ringstorlek: {item.ringSize}
                        </p>
                      )}
                      {item.letters && item.letters.length > 0 && (
                        <p className="text-sm text-gray-600">
                          Bokstäver: {item.letters.join(", ")}
                        </p>
                      )}
                      {item.diameter && (
                        <p className="text-sm text-gray-600">
                          Diameter: {item.diameter} cm
                        </p>
                      )}
                      {item.chainLength && (
                        <p className="text-sm text-gray-600">
                          Kedjelängd: {item.chainLength} cm
                        </p>
                      )}
                      {item.braceletSize && (
                        <p className="text-sm text-gray-600">
                          Storlek: {item.braceletSize}
                        </p>
                      )}
                      {item.color && (
                        <p className="text-sm text-gray-600">
                          Färg:{" "}
                          <span className="capitalize">
                            {item.color.replace("-", " ")}
                          </span>
                        </p>
                      )}
                    </div>
                  </div>

                  {(() => {
                    const originalPrice = item.specialPrice || item.price;
                    let originalDisplayPrice = originalPrice;
                    let discountedDisplayPrice = Math.round(originalPrice * DISCOUNT_FACTOR);

                    if (item.letters && item.letters.length > 1) {
                      const extraLettersCount = item.letters.length - 1;
                      const originalExtra = EXTRA_LETTER_PRICES[item.collection] || 0;
                      const discountedExtra = Math.round(originalExtra * DISCOUNT_FACTOR);
                      originalDisplayPrice += extraLettersCount * originalExtra;
                      discountedDisplayPrice += extraLettersCount * discountedExtra;
                    }

                    return (
                      <div className="text-right">
                        <p className="text-gray-400 line-through text-xs">
                          {(originalDisplayPrice / 100).toFixed(2)} SEK
                        </p>
                        <p className="text-green-700 font-semibold text-sm">
                          {(discountedDisplayPrice / 100).toFixed(2)} SEK
                        </p>
                      </div>
                    );
                  })()}
                </div>
              ))}

              <div className="flex justify-between py-2 border-b">
                <p className="font-medium">Frakt</p>
                <p className="font-medium">
                  {(SHIPPING_FEE / 100).toFixed(2)} SEK
                </p>
              </div>

              <div className="mt-4 border-t pt-2 space-y-1">
                <div className="flex justify-between text-gray-400 text-sm">
                  <span>Ordinarie pris</span>
                  <span className="line-through">
                    {(originalGrandTotal / 100).toFixed(2)} SEK
                  </span>
                </div>
                <div className="flex justify-between text-green-700 text-sm">
                  <span>Rabatt (20%)</span>
                  <span>-{(savings / 100).toFixed(2)} SEK</span>
                </div>
                <div className="flex justify-between text-lg font-semibold pt-1 border-t">
                  <span>Total</span>
                  <span>{(grandTotal / 100).toFixed(2)} SEK</span>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {htmlSnippet && <KlarnaWidget htmlSnippet={htmlSnippet} />}
    </div>
  );
};

export default CheckoutPage;