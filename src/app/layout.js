// 'use client'; // Behåller client-kompatibilitet

// import { Geist, Geist_Mono } from "next/font/google";
// import { ProductsProvider } from "./context/ProductsContext"; // Importera ProductsProvider
// import "./globals.css";

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
//         <ProductsProvider>{children}</ProductsProvider> {/* Lägg in Context Provider */}
//       </body>
//     </html>
//   );
// }

'use client'; // Behåller client-kompatibilitet

import { Geist, Geist_Mono } from "next/font/google";
import { ProductsProvider } from "./context/ProductsContext"; // Importera ProductsProvider
import { CartProvider } from "./context/CartContext"; // Importera CartProvider
import "./globals.css";
import Navbar from "./components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Wrap med ProductsProvider och CartProvider */}
        <ProductsProvider>
          <CartProvider>
            <Navbar/>
            {children}
            </CartProvider>
        </ProductsProvider>
      </body>
    </html>
  );
}
