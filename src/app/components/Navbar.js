// 'use client'
// import { useState, useEffect } from 'react'
// import { useCart } from '../context/CartContext' // Import your Cart context
// import Link from 'next/link'
// import Image from 'next/image'
// import { usePathname } from 'next/navigation' // Importera usePathname
// import { useRef } from 'react'

// export default function Navbar() {
//     const [isMenuOpen, setIsMenuOpen] = useState(false)
//     const [isDropdownOpen, setIsDropdownOpen] = useState(false)
//     const { cart } = useCart() // Access cart from context
//     const pathname = usePathname() // Kolla vilken sida vi är på
//     const [totalItems, setTotalItems] = useState(0)
//     const dropdownRef = useRef(null)

//     // Calculate the total number of items only on the client side
//     useEffect(() => {
//         const total = cart.reduce((acc, item) => acc + item.quantity, 0)
//         setTotalItems(total)
//     }, [cart]) // Run when the cart changes

//     //Ref so that the kategori dropdown closes when click outside div
//     useEffect(() => {
//         function handleClickOutside(event) {
//             if (
//                 dropdownRef.current &&
//                 !dropdownRef.current.contains(event.target)
//             ) {
//                 setIsDropdownOpen(false)
//             }
//         }

//         document.addEventListener('mousedown', handleClickOutside)
//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside)
//         }
//     }, [])

//     // Om vi är på startsidan, gör navbaren genomskinlig med vit text
//     const isHomePage = pathname === '/'

//     // Ändra navbarens färg om hamburgermenyn är öppen
//     const navbarClasses =
//         isHomePage && !isMenuOpen
//             ? 'absolute top-0 left-0 w-full text-white bg-transparent'
//             : 'bg-white text-black shadow-md'

//     return (
//         <nav className={`${navbarClasses} z-50`}>
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                 <div className="flex justify-between items-center h-16">
//                     {/* Logo */}
//                     {/* <Image
//                         src="/avernas.jpg" // Ange din bilds sökväg
//                         alt="Avernäs Logo"
//                         width={90} // Bredd på loggan
//                         height={40} // Höjd på loggan
//                         className="object-contain" // Se till att bilden inte ändrar proportionerna
//                     /> */}
//                     <div className="flex-shrink-0">
//                         <Link
//                             href="/"
//                             className="text-red font-semibold text-xl"
//                         ></Link>
//                     </div>

//                     {/* Desktop Menu */}
//                     <div className="hidden md:flex flex-grow justify-center space-x-6">
//                         <Link href="/" className="text-red hover:text-gray-600">
//                             Home
//                         </Link>

//                         {/* Katalog Dropdown */}
//                         {/* Katalog Dropdown (Desktop) */}
//                         <div className="relative" ref={dropdownRef}>
//                             <button
//                                 onClick={() =>
//                                     setIsDropdownOpen((prev) => !prev)
//                                 }
//                                 className="text-red hover:text-gray-600 flex items-center"
//                             >
//                                 Katalog
//                                 <svg
//                                     className="w-4 h-4 ml-1"
//                                     xmlns="http://www.w3.org/2000/svg"
//                                     viewBox="0 0 20 20"
//                                     fill="currentColor"
//                                 >
//                                     <path
//                                         fillRule="evenodd"
//                                         d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
//                                         clipRule="evenodd"
//                                     />
//                                 </svg>
//                             </button>

//                             {isDropdownOpen && (
//                                 <div className="absolute left-0 mt-2 w-48 bg-white text-black border rounded-md shadow-lg z-50">
//                                     <Link
//                                         href="/category/rings"
//                                         className="block px-4 py-2 hover:bg-gray-100"
//                                     >
//                                         Rings
//                                     </Link>
//                                     <Link
//                                         href="/category/necklaces"
//                                         className="block px-4 py-2 hover:bg-gray-100"
//                                     >
//                                         Necklaces
//                                     </Link>
//                                     <Link
//                                         href="/category/earrings"
//                                         className="block px-4 py-2 hover:bg-gray-100"
//                                     >
//                                         Earrings
//                                     </Link>
//                                     <Link
//                                         href="/category/bracelets"
//                                         className="block px-4 py-2 hover:bg-gray-100"
//                                     >
//                                         Bracelets
//                                     </Link>
//                                 </div>
//                             )}
//                         </div>

//                         <Link
//                             href="/about"
//                             className="text-red hover:text-gray-600"
//                         >
//                             Om
//                         </Link>
//                     </div>

//                     {/* Desktop Cart Icon with Item Count */}
//                     <div className="hidden md:flex items-center space-x-4 relative">
//                         <Link
//                             href="/cart"
//                             className="relative text-red flex items-center"
//                         >
//                             <svg
//                                 className="w-6 h-6"
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 fill="none"
//                                 viewBox="0 0 24 24"
//                                 stroke="currentColor"
//                             >
//                                 <path
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     strokeWidth="2"
//                                     d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 5m12-5l2 5m-6 0a2 2 0 100-4 2 2 0 000 4z"
//                                 />
//                             </svg>
//                             {/* Show item count only if totalItems is greater than 0 */}
//                             {totalItems > 0 && (
//                                 <span className="absolute top-0 right-0 transform translate-x-1 -translate-y-1 bg-gray-200 text-black rounded-full text-xs w-4 h-4 flex items-center justify-center">
//                                     {totalItems}
//                                 </span>
//                             )}
//                         </Link>
//                     </div>

//                     {/* Mobile Hamburger and Cart */}
//                     <div className="flex items-center space-x-4 md:hidden">
//                         {/* Hamburger */}
//                         <button
//                             onClick={() => setIsMenuOpen(!isMenuOpen)}
//                             className="text-red focus:outline-none"
//                         >
//                             <svg
//                                 className="w-6 h-6"
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 fill="none"
//                                 viewBox="0 0 24 24"
//                                 stroke="currentColor"
//                             >
//                                 <path
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     strokeWidth="2"
//                                     d="M4 6h16M4 12h16m-7 6h7"
//                                 />
//                             </svg>
//                         </button>

//                         {/* Cart Icon */}
//                         <Link href="/cart" className="relative text-red">
//                             <svg
//                                 className="w-6 h-6"
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 fill="none"
//                                 viewBox="0 0 24 24"
//                                 stroke="currentColor"
//                             >
//                                 <path
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     strokeWidth="2"
//                                     d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 5m12-5l2 5m-6 0a2 2 0 100-4 2 2 0 000 4z"
//                                 />
//                             </svg>

//                             {/* Show item count only if totalItems is greater than 0 */}
//                             {totalItems > 0 && (
//                                 <span className="absolute top-0 right-0 transform translate-x-1 -translate-y-1 bg-gray-200 text-black rounded-full text-xs w-4 h-4 flex items-center justify-center">
//                                     {totalItems}
//                                 </span>
//                             )}
//                         </Link>
//                     </div>
//                 </div>

//                 {/* Mobile Menu */}
//                 {isMenuOpen && (
//                     <div className="md:hidden">
//                         <div className="space-y-2 py-2">
//                             <Link
//                                 href="/"
//                                 className="block px-4 py-2 text-red hover:bg-gray-100"
//                             >
//                                 Home
//                             </Link>
//                             <Link
//                                 href="/category/rings"
//                                 className="block px-4 py-2 text-black hover:bg-gray-100"
//                             >
//                                  Rings
//                             </Link>
//                             <Link
//                                 href="/category/necklaces"
//                                 className="block px-4 py-2 text-black hover:bg-gray-100"
//                             >
//                                 Necklaces
//                             </Link>
//                             <Link
//                                 href="/category/earrings"
//                                 className="block px-4 py-2 text-black hover:bg-gray-100"
//                             >
//                                 Earrings
//                             </Link>
//                             <Link
//                                 href="/category/bracelets"
//                                 className="block px-4 py-2 text-black hover:bg-gray-100"
//                             >
//                                 Bracelets
//                             </Link>

//                             {/* wait with dropdown, dosent work*/}

//                             {/* <div>
//                                 <button
//                                     className="block w-full text-left px-4 py-2 text-red hover:bg-gray-100"
//                                     onClick={() =>
//                                         setIsDropdownOpen(!isDropdownOpen)
//                                     }
//                                 >
//                                     Katalog
//                                 </button>
//                                 {isDropdownOpen && (
//                                     <div className="pl-4 space-y-1">
//                                         <Link
//                                             href="/category/rings"
//                                             onClick={() => setIsMenuOpen(false)}
//                                             className="block px-4 py-2 text-black hover:bg-gray-100"
//                                         >
//                                             Rings
//                                         </Link>
//                                         <Link
//                                             href="/category/necklaces"
//                                             className="block px-4 py-2 text-black hover:bg-gray-100"
//                                         >
//                                             Necklaces
//                                         </Link>
//                                         <Link
//                                             href="/category/earring"
//                                             className="block px-4 py-2 text-black hover:bg-gray-100"
//                                         >
//                                             Earrings
//                                         </Link>
//                                         <Link
//                                             href="/category/bracelets"
//                                             className="block px-4 py-2 text-black hover:bg-gray-100"
//                                         >
//                                             Bracelets
//                                         </Link>
//                                     </div>
//                                 )}
//                             </div> */}

//                             <Link
//                                 href="/about"
//                                 className="block px-4 py-2 text-black hover:bg-gray-100"
//                             >
//                                 Om
//                             </Link>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </nav>
//     )
// }

'use client'
import { useState, useEffect } from 'react'
import { useCart } from '../context/CartContext'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useRef } from 'react'
import { useProducts } from '../context/ProductsContext'

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const { cart } = useCart()
    const pathname = usePathname()
    const [totalItems, setTotalItems] = useState(0)
    const dropdownRef = useRef(null)
    const { state } = useProducts()

    // Kolla om det finns produkter med specialPrice
    const hasSpecialOffers = state.products.some(
        (product) =>
            product.specialPrice && product.specialPrice < product.price
    )

    const isHomePage = pathname === '/'

    // Calculate total items
    useEffect(() => {
        const total = cart.reduce((acc, item) => acc + item.quantity, 0)
        setTotalItems(total)
    }, [cart])

    // Handle scroll - only on homepage
    useEffect(() => {
        if (!isHomePage) return

        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true)
            } else {
                setIsScrolled(false)
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [isHomePage])

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsDropdownOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
    }, [isMenuOpen])

    // Navbar styling based on page and scroll
    const navbarBg = isHomePage
        ? isScrolled
            ? 'bg-white shadow-md'
            : 'bg-transparent'
        : 'bg-white shadow-md'

    const textColor = isHomePage
        ? isScrolled
            ? 'text-black'
            : 'text-white'
        : 'text-black'

    return (
        <>
            {/* Sticky Navbar */}
            <nav
                className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${navbarBg}`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-12">
                        {/* Mobile: Hamburger left */}
                        <div className="flex items-center md:hidden">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className={`${textColor} focus:outline-none`}
                                aria-label="Toggle menu"
                            >
                                <svg
                                    className="w-6 h-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="square"
                                        strokeLinejoin="square"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            </button>
                        </div>

                        {/* Desktop Menu - Left side */}
                        <div className="hidden md:flex items-center">
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    onClick={() =>
                                        setIsDropdownOpen((prev) => !prev)
                                    }
                                    className={`${textColor} hover:opacity-75 flex items-center font-medium transition-opacity`}
                                >
                                    Meny
                                    <svg
                                        className="w-4 h-4 ml-1"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>

                                {isDropdownOpen && (
                                    <div className="absolute left-0 mt-2 w-64 bg-white text-black border rounded-md shadow-lg">
                                        {/* Categories */}
                                        <div className="px-4 py-3 border-b">
                                            <p className="text-xs font-semibold text-gray-500 uppercase">
                                                Kategorier
                                            </p>
                                            <Link
                                                href="/category/rings"
                                                className="block py-2 hover:text-gray-600"
                                                onClick={() =>
                                                    setIsDropdownOpen(false)
                                                }
                                            >
                                                Rings
                                            </Link>
                                            <Link
                                                href="/category/necklaces"
                                                className="block py-2 hover:text-gray-600"
                                                onClick={() =>
                                                    setIsDropdownOpen(false)
                                                }
                                            >
                                                Necklaces
                                            </Link>
                                            <Link
                                                href="/category/earrings"
                                                className="block py-2 hover:text-gray-600"
                                                onClick={() =>
                                                    setIsDropdownOpen(false)
                                                }
                                            >
                                                Earrings
                                            </Link>
                                            <Link
                                                href="/category/bracelets"
                                                className="block py-2 hover:text-gray-600"
                                                onClick={() =>
                                                    setIsDropdownOpen(false)
                                                }
                                            >
                                                Bracelets
                                            </Link>
                                        </div>

                                        {/* ✅ LÄGG TILL: Special Offers - Visas bara om det finns rabatter */}
                                        {hasSpecialOffers && (
                                            <div className="px-4 py-3 border-b">
                                                <Link
                                                    href="/special-offers"
                                                    className="block py-2 text-red-600 hover:text-red-600 flex items-center"
                                                    onClick={() =>
                                                        setIsDropdownOpen(false)
                                                    }
                                                >
                                                    Specialerbjudanden
                                                </Link>
                                            </div>
                                        )}

                                        {/* Collections */}
                                        <div className="px-4 py-3 border-b">
                                            <p className="text-xs font-semibold text-gray-500 uppercase">
                                                Kollektioner
                                            </p>
                                            <Link
                                                href="/collections"
                                                className="block py-2 hover:text-gray-600"
                                                onClick={() =>
                                                    setIsDropdownOpen(false)
                                                }
                                            >
                                                Se alla kollektioner
                                            </Link>
                                        </div>

                                        {/* About */}
                                        <div className="px-4 py-3">
                                            <Link
                                                href="/about"
                                                className="block py-2 hover:text-gray-600"
                                                onClick={() =>
                                                    setIsDropdownOpen(false)
                                                }
                                            >
                                                Om oss
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Center Logo - M */}
                        <div className="absolute left-1/2 transform -translate-x-1/2">
                            <Link
                                href="/"
                                className={`${textColor} text-2xl font-serif font-bold hover:opacity-75 transition-opacity`}
                            >
                                M
                            </Link>
                        </div>

                        {/* Cart Icon - Right side */}
                        <div className="flex items-center">
                            <Link
                                href="/cart"
                                className={`relative ${textColor} flex items-center hover:opacity-75 transition-opacity`}
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
                                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 5m12-5l2 5m-6 0a2 2 0 100-4 2 2 0 000 4z"
                                    />
                                </svg>
                                {totalItems > 0 && (
                                    <span
                                        className={`absolute top-0 right-0 transform translate-x-1 -translate-y-1 rounded-full text-xs w-4 h-4 flex items-center justify-center ${
                                            isHomePage && !isScrolled
                                                ? 'bg-white text-black'
                                                : 'bg-gray-800 text-white'
                                        }`}
                                    >
                                        {totalItems}
                                    </span>
                                )}
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Side Menu - Slides in from left */}
            <div
                className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${
                    isMenuOpen
                        ? 'opacity-100 pointer-events-auto'
                        : 'opacity-0 pointer-events-none'
                }`}
            >
                {/* Backdrop */}
                <div
                    className="absolute inset-0 bg-black bg-opacity-50"
                    onClick={() => setIsMenuOpen(false)}
                />

                {/* Slide-in Menu */}
                <div
                    className={`absolute top-0 left-0 h-full w-2/3 bg-white shadow-xl transform transition-transform duration-300 ${
                        isMenuOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
                >
                    {/* Close button */}
                    <div className="flex justify-end p-4">
                        <button
                            onClick={() => setIsMenuOpen(false)}
                            className="text-black"
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

                    {/* Menu Content */}
                    <div className="px-6 py-4 space-y-6">
                        {/* Categories */}
                        <div>
                            <h3 className="text-xs font-semibold text-gray-500 uppercase mb-3">
                                Kategorier
                            </h3>
                            <div className="space-y-3">
                                <Link
                                    href="/category/rings"
                                    className="block text-black hover:text-gray-600"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Rings
                                </Link>
                                <Link
                                    href="/category/necklaces"
                                    className="block text-black hover:text-gray-600"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Necklaces
                                </Link>
                                <Link
                                    href="/category/earrings"
                                    className="block text-black hover:text-gray-600"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Earrings
                                </Link>
                                <Link
                                    href="/category/bracelets"
                                    className="block text-black hover:text-gray-600"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Bracelets
                                </Link>
                            </div>
                        </div>

                         {/* ✅ LÄGG TILL: Special Offers - Visas bara om det finns rabatter */}
    {hasSpecialOffers && (
        <div className="border-t pt-6">
            <Link
                href="/special-offers"
                className="block text-red-600 hover:text-red-600 flex items-center"
                onClick={() => setIsMenuOpen(false)}
            >
                Specialerbjudanden
            </Link>
        </div>
    )}

                        {/* Collections */}
                        <div className="border-t pt-6">
                            <h3 className="text-xs font-semibold text-gray-500 uppercase mb-3">
                                Kollektioner
                            </h3>
                            <Link
                                href="/collections"
                                className="block text-black hover:text-gray-600"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Se alla kollektioner
                            </Link>
                        </div>

                        {/* About */}
                        <div className="border-t pt-6">
                            <Link
                                href="/about"
                                className="block text-black hover:text-gray-600"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Om oss
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
