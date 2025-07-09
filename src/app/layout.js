// 'use client'; // Behåller client-kompatibilitet

// import { Geist, Geist_Mono } from "next/font/google";
// import { ProductsProvider } from "./context/ProductsContext"; // Importera ProductsProvider
// import { CartProvider } from "./context/CartContext"; // Importera CartProvider
// import "./globals.css";
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body
//         className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//       >
//         {/* Wrap med ProductsProvider och CartProvider */}
//         <ProductsProvider>
//           <CartProvider>
//             <Navbar/>
//             {children}
//             <Footer/>
//             </CartProvider>
//         </ProductsProvider>
//       </body>
//     </html>
//   );
// }

// Under tiden jag bygger om
// 'use client';

// import { Geist, Geist_Mono } from "next/font/google";
// import { ProductsProvider } from "./context/ProductsContext";
// import { CartProvider } from "./context/CartContext";
// import "./globals.css";
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// // 🔧 Underhållsflagga
// const isMaintenance = true;

// export default function RootLayout({ children }) {
//   return (
//     <html lang="sv">
//       <body
//         className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//       >
//         {isMaintenance ? (
//           <div className="flex min-h-screen items-center justify-center bg-gray-100 text-center px-4">
//           <div>
//             <h1 className="text-4xl font-bold mb-4">Vi bygger om!</h1>
//             <p className="text-lg mb-2">
//               Vår e-handel är tillfälligt stängd medan vi förbättrar din upplevelse.
//             </p>
//             <p className="text-lg mb-2">
//               Under tiden kan du handla våra smycken på vår tillfälliga butik:
//             </p>
//             <p className="text-xl">
//               <a
//                 href="https://margareta-avernas.myshopify.com"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-blue-600 underline hover:text-blue-800"
//               >
//                 margareta-avernas.myshopify.com
//               </a>
//             </p>
//             <p className="mt-4 text-md">Tack för ditt tålamod – vi ses snart igen!</p>
//           </div>
//         </div>
//         ) : (
//           <ProductsProvider>
//             <CartProvider>
//               <Navbar />
//               {children}
//               <Footer />
//             </CartProvider>
//           </ProductsProvider>
//         )}
//       </body>
//     </html>
//   );
// }

'use client';

import { Geist, Geist_Mono } from "next/font/google";
import { useEffect, useState } from "react";
import { ProductsProvider } from "./context/ProductsContext";
import { CartProvider } from "./context/CartContext";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const [showMaintenance, setShowMaintenance] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hostname = window.location.hostname;
      if (
        hostname === "margaretaavernas.se" ||
        hostname === "www.margaretaavernas.se"
      ) {
        setShowMaintenance(true);
      }
    }
  }, []);

  return (
    <html lang="sv">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {showMaintenance ? (
          <div className="flex min-h-screen items-center justify-center bg-gray-100 text-center px-4">
            <div>
              <h1 className="text-4xl font-bold mb-4">Vi bygger om!</h1>
              <p className="text-lg mb-2">
                Vår e-handel är tillfälligt stängd medan vi förbättrar din upplevelse.
              </p>
              <p className="text-lg mb-2">
                Under tiden kan du handla våra smycken på vår tillfälliga butik:
              </p>
              <p className="text-xl">
                <a
                  href="https://margareta-avernas.myshopify.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  margareta-avernas.myshopify.com
                </a>
              </p>
              <p className="mt-4 text-md">Tack för ditt tålamod – vi ses snart igen!</p>
            </div>
          </div>
        ) : (
          <ProductsProvider>
            <CartProvider>
              <Navbar />
              {children}
              <Footer />
            </CartProvider>
          </ProductsProvider>
        )}
      </body>
    </html>
  );
}
