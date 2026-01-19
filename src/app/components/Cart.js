"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const router = useRouter();
  const { cart, dispatch } = useCart();
  const [hydratedCart, setHydratedCart] = useState([]);

  useEffect(() => {
    setHydratedCart(cart);
  }, [cart]);

  // PRISER FÖR EXTRA BOKSTÄVER
  const EXTRA_LETTER_PRICES = {
    coins: 40000,
    letter: 40000,
  };

  const calculateTotals = (cartItems) => {
    const totalAmount = cartItems.reduce((sum, item) => {
      // Börja med baspriset (specialPrice eller ordinarie pris)
      let itemPrice = item.specialPrice || item.price;
      
      // 🆕 LÄGG TILL KOSTNADEN FÖR EXTRA BOKSTÄVER
      if (item.letters && item.letters.length > 1) {
        const extraLettersCount = item.letters.length - 1;
        const pricePerExtra = EXTRA_LETTER_PRICES[item.collection] || 0;
        itemPrice += extraLettersCount * pricePerExtra;
      }
      
      return sum + itemPrice * item.quantity;
    }, 0);
    
    const totalTax = cartItems.reduce((sum, item) => {
      let itemPrice = item.specialPrice || item.price;
      
      if (item.letters && item.letters.length > 1) {
        const extraLettersCount = item.letters.length - 1;
        const pricePerExtra = EXTRA_LETTER_PRICES[item.collection] || 0;
        itemPrice += extraLettersCount * pricePerExtra;
      }
      
      return sum + ((itemPrice * item.tax_rate) / 10000) * item.quantity;
    }, 0);
    
    return { totalAmount, totalTax };
  };

  const { totalAmount, totalTax } = calculateTotals(hydratedCart);

  return (
    <div className="bg-white w-full h-full flex flex-col">
      {hydratedCart.length === 0 ? (
        // ✅ Tom varukorg - centrerad text + knapp längst ner
        <>
          <div className="flex-1 flex items-center justify-center">
            <p className="text-body-s text-center uppercase">
              Din varukorg är tom
            </p>
          </div>

          {/* Tillbaka-knapp längst ner */}
          <div className="p-4 border-t">
            <button
              onClick={() => dispatch({ type: "CLOSE_CART" })}
              className="text-button-s rounded-sm w-full bg-white border border-black  py-3 hover:bg-gray-400 transition"
            >
              Tillbaka
            </button>
          </div>
        </>
      ) : (
        // ✅ Varukorg med produkter
        <>
         {/*  Scrollbar produktlista */}
          <div className="flex-1 overflow-y-auto px-0">
            <ul className="divide-y divide-gray-300">
              {hydratedCart.map((item, index) => {
                // 🆕 Skapa unik key baserad på alla produktvariationer + index
                const lettersKey = item.letters ? item.letters.sort().join('-') : 'noletters';
                const uniqueKey = `${item.id}-${item.ringSize || 'nosize'}-${lettersKey}-${item.diameter || 'nodiameter'}-${item.chainLength || 'nochain'}-${item.color || 'nocolor'}-${index}`;
                
                return (
                <li
                  key={uniqueKey}
                  className="flex items-stretch justify-between py-2"
                >
                  {/* Produktbild */}
                  <div className="w-20 h-20 relative flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover rounded-sm"
                    />
                  </div>

                  {/* Produktinfo */}
                  <div className="flex-1 text-left ml-2 flex flex-col space-y-0.5">
                    <h3 className="text-label-xs">{item.name}</h3>

                    {/* Metadata – ALLT PÅ SAMMA RAD */}
                    <div className="flex flex-wrap items-center text-label-xs text-gray-700">
                      {item.ringSize && <span>{item.ringSize}</span>}

                      {/* 🆕 VISA ALLA BOKSTÄVER */}
                      {item.letters && item.letters.length > 0 && (
                        <>
                          {item.ringSize && (
                            <span className="mx-1 text-gray-400">|</span>
                          )}
                          <span>{item.letters.join(", ")}</span>
                        </>
                      )}

                      {item.diameter && (
                        <>
                          {(item.ringSize || item.letters) && (
                            <span className="mx-1 text-gray-400">|</span>
                          )}
                          <span>{item.diameter} cm</span>
                        </>
                      )}

                      {item.chainLength && (
                        <>
                          {(item.ringSize || item.letters || item.diameter) && (
                            <span className="mx-1 text-gray-400">|</span>
                          )}
                          <span>{item.chainLength} cm</span>
                        </>
                      )}

                      {item.color && (
                        <>
                          {(item.ringSize ||
                            item.letters ||
                            item.diameter ||
                            item.chainLength) && (
                            <span className="mx-1 text-gray-400">|</span>
                          )}
                          <span className="capitalize">
                            {item.color.replace("-", " ")}
                          </span>
                        </>
                      )}
                    </div>

                    {/* PRISVISNING MED EXTRA BOKSTÄVER */}
                    {(() => {
                      let displayPrice = item.specialPrice || item.price;
                      
                      // Lägg till kostnaden för extra bokstäver
                      if (item.letters && item.letters.length > 1) {
                        const extraLettersCount = item.letters.length - 1;
                        const pricePerExtra = EXTRA_LETTER_PRICES[item.collection] || 0;
                        displayPrice += extraLettersCount * pricePerExtra;
                      }
                      
                      return (
                        <p className={`text-label-xs ${item.specialPrice && item.specialPrice < item.price ? 'text-red-300' : ''}`}>
                          {(displayPrice / 100).toFixed(2)} SEK
                        </p>
                      );
                    })()}

                    {/* Kvantitetsväljare */}
                    <div className="mt-2 w-fit inline-flex items-center border border-gray-400 rounded-sm">
                      <button
                        onClick={() =>
                          dispatch({
                            type: "DECREASE_QUANTITY",
                            payload: index,
                          })
                        }
                        className="px-1.5 py-0.5 text-label-xs hover:bg-gray-100"
                      >
                        −
                      </button>

                      <span className="px-2 text-label-xs">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          dispatch({
                            type: "INCREASE_QUANTITY",
                            payload: index,
                          })
                        }
                        className="px-1.5 py-0.5 text-label-xs hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Ta bort – höger, längst ner */}
                  <div className="flex flex-col justify-end ml-4">
                    <button
                      onClick={() =>
                        dispatch({
                          type: "REMOVE_FROM_CART",
                          payload: index,
                        })
                      }
                      className="text-xs underline hover:text-black transition uppercase"
                    >
                      Ta bort
                    </button>
                  </div>
                </li>
              );
              })}
            </ul>
          </div>

          <div className="p-4 border-t bg-white">
            <div className="flex items-center justify-between text-lg font-semibold text-gray-700">
              <span className="text-label-s uppercase">Totalsumma</span>
              <span className="text-label-s">
                {(totalAmount / 100).toFixed(2)} SEK
              </span>
            </div>

            {/* <p className="text-gray-500 mb-4 text-sm">
              Inkl. moms: {(totalTax / 100).toFixed(2)} SEK
            </p>
 */}
            <button
              onClick={() => {
                dispatch({ type: "CLOSE_CART" });
                router.push("/checkout");
              }}
              className="w-full bg-black text-button-s text-white py-3 hover:bg-gray-800 transition mt-4"
            >
              Fortsätt
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
