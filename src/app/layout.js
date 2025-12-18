'use client' // Behåller client-kompatibilitet

// import { Roboto_Mono } from 'next/font/google'
import { IBM_Plex_Sans, Playfair_Display } from "next/font/google";
import { ProductsProvider } from './context/ProductsContext' // Importera ProductsProvider
import { CartProvider } from './context/CartContext' // Importera CartProvider
import './globals.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CartDrawer from "./components/CartDrawer";
import { usePathname } from 'next/navigation'

const ibmPlexSans = IBM_Plex_Sans({
  weight: ['300', '400', '500', '600', '700'], // Välj vikter du vill ha
  subsets: ["latin"],
  variable: "--font-ibm-plex-sans",
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-playfair-display',
});

export default function RootLayout({ children }) {
    const pathname = usePathname()
    const isHome = pathname === '/'
    return (
        <html lang="en">
            <body
  className={`${ibmPlexSans.variable} ${playfair.variable} antialiased ${isHome ? '' : 'pt-12'}` }
>
                {/* Wrap med ProductsProvider och CartProvider */}
                <ProductsProvider>
                    <CartProvider>
                        <Navbar />
                        <CartDrawer/>
                        {children}
                        <Footer />
                    </CartProvider>
                </ProductsProvider>
            </body>
        </html>
    )
}

//UNDER TID BYGGER OM

// 'use client';

// import { Geist, Geist_Mono } from "next/font/google";
// import { useEffect, useState } from "react";
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

// export default function RootLayout({ children }) {
//   const [showMaintenance, setShowMaintenance] = useState(false);

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const hostname = window.location.hostname;
//       if (
//         hostname === "margaretaavernas.se" ||
//         hostname === "www.margaretaavernas.se"
//       ) {
//         setShowMaintenance(true);
//       }
//     }
//   }, []);

//   return (
//     <html lang="sv">
//       <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
//         {showMaintenance ? (
//           <div className="flex min-h-screen items-center justify-center bg-gray-100 text-center px-4">
//             <div>
//               <h1 className="text-4xl font-bold mb-4">Vi bygger om!</h1>
//               <p className="text-lg mb-2">
//                 Vår e-handel är tillfälligt stängd medan vi förbättrar din upplevelse.
//               </p>
//               <p className="text-lg mb-2">
//                 Under tiden kan du handla våra smycken på vår tillfälliga butik:
//               </p>
//               <p className="text-xl">
//                 <a
//                   href="https://margareta-avernas.myshopify.com"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-blue-600 underline hover:text-blue-800"
//                 >
//                   margareta-avernas.myshopify.com
//                 </a>
//               </p>
//               <p className="mt-4 text-md">Tack för ditt tålamod – vi ses snart igen!</p>
//             </div>
//           </div>
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
