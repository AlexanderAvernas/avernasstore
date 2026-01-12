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

  const calculateTotals = (cartItems) => {
    const totalAmount = cartItems.reduce((sum, item) => {
      const price = item.specialPrice || item.price;
      return sum + price * item.quantity;
    }, 0);
    const totalTax = cartItems.reduce((sum, item) => {
      const price = item.specialPrice || item.price;
      return sum + ((price * item.tax_rate) / 10000) * item.quantity;
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
          {/* Scrollbar produktlista */}
          <div className="flex-1 overflow-y-auto px-0">
            <ul className="divide-y divide-gray-300">
              {hydratedCart.map((item) => (
                <li
                  key={item.id}
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

                      {item.letter && (
                        <>
                          {item.ringSize && (
                            <span className="mx-1 text-gray-400">|</span>
                          )}
                          <span>{item.letter}</span>
                        </>
                      )}

                      {item.diameter && (
                        <>
                          {(item.ringSize || item.letter) && (
                            <span className="mx-1 text-gray-400">|</span>
                          )}
                          <span>{item.diameter} cm</span>
                        </>
                      )}

                      {item.chainLength && (
                        <>
                          {(item.ringSize || item.letter || item.diameter) && (
                            <span className="mx-1 text-gray-400">|</span>
                          )}
                          <span>{item.chainLength} cm</span>
                        </>
                      )}

                      {item.color && (
                       <>
                         {(item.ringSize || item.letter || item.diameter || item.chainLength) && (
                           <span className="mx-1 text-gray-400">|</span>
                         )}
                         <span className="capitalize">{item.color.replace('-', ' ')}</span>
                       </>
                     )}
                    </div>
                    {item.specialPrice && item.specialPrice < item.price ? (
                      <div>
                        {/* <p className="text-label-xs line-through">
                          {(item.price / 100).toFixed(2)} SEK
                        </p> */}
                        <p className="text-red-300 text-label-xs">
                          {(item.specialPrice / 100).toFixed(2)} SEK
                        </p>
                      </div>
                    ) : (
                      <p className="text-label-xs">
                        {(item.price / 100).toFixed(2)} SEK
                      </p>
                    )}

                    {/* Kvantitetsväljare */}
                    <div className="mt-2 w-fit inline-flex items-center border border-gray-400 rounded-sm">
                      <button
                        onClick={() =>
                          dispatch({
                            type: "DECREASE_QUANTITY",
                            payload: cart.indexOf(item),
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
                            payload: cart.indexOf(item),
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
                          payload: cart.indexOf(item),
                        })
                      }
                      className="text-xs underline hover:text-black transition uppercase"
                    >
                      Ta bort
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 border-t bg-white">
            <div className="flex items-center justify-between text-lg font-semibold text-gray-700">
              <span className="text-label-s uppercase">Totalsumma</span>
              <span className="text-label-s">{(totalAmount / 100).toFixed(2)} SEK</span>
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
