"use client";

import { useCart } from "../context/CartContext";
import { useEffect } from "react";
import Cart from "./Cart"; // ✅ Importera din riktiga Cart-komponent

export default function CartDrawer() {
  const { isCartOpen, dispatch } = useCart();

  useEffect(() => {
    if (isCartOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isCartOpen]);

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-300 ${
        isCartOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={() => dispatch({ type: "CLOSE_CART" })}
      />

      {/* Drawer - Glider in från höger */}
      <div
        className={`absolute top-0 right-0 h-full w-4/5 md:w-1/3 bg-white shadow-xl transform transition-transform duration-300 ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close button */}
        {/* Header */}
        <div className="flex items-center justify-between py-6 px-4">
          <h2 className="text-label-m uppercase">VARUKORG</h2>

          <button
            onClick={() => dispatch({ type: "CLOSE_CART" })}
            className="text-black"
            aria-label="Stäng varukorg"
          >
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Cart Content - Scrollable */}
        <div className="h-[calc(100%-60px)] overflow-y-auto px-4 py-4">
          <Cart />
        </div>
      </div>
    </div>
  );
}
