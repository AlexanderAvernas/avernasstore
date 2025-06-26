'use client'
import { useState, useEffect } from 'react'
import { useCart } from '../context/CartContext' // Import your Cart context
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation' // Importera usePathname
import { useRef } from 'react'

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const { cart } = useCart() // Access cart from context
    const pathname = usePathname() // Kolla vilken sida vi är på
    const [totalItems, setTotalItems] = useState(0)
    const dropdownRef = useRef(null)

    // Calculate the total number of items only on the client side
    useEffect(() => {
        const total = cart.reduce((acc, item) => acc + item.quantity, 0)
        setTotalItems(total)
    }, [cart]) // Run when the cart changes

    //Ref so that the kategori dropdown closes when click outside div
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

    // Om vi är på startsidan, gör navbaren genomskinlig med vit text
    const isHomePage = pathname === '/'

    // Ändra navbarens färg om hamburgermenyn är öppen
    const navbarClasses =
        isHomePage && !isMenuOpen
            ? 'absolute top-0 left-0 w-full text-white bg-transparent'
            : 'bg-white text-black shadow-md'

    return (
        <nav className={`${navbarClasses} z-50`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    {/* <Image
                        src="/avernas.jpg" // Ange din bilds sökväg
                        alt="Avernäs Logo"
                        width={90} // Bredd på loggan
                        height={40} // Höjd på loggan
                        className="object-contain" // Se till att bilden inte ändrar proportionerna
                    /> */}
                    <div className="flex-shrink-0">
                        <Link
                            href="/"
                            className="text-red font-semibold text-xl"
                        ></Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex flex-grow justify-center space-x-6">
                        <Link href="/" className="text-red hover:text-gray-600">
                            Home
                        </Link>

                        {/* Katalog Dropdown */}
                        {/* Katalog Dropdown (Desktop) */}
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() =>
                                    setIsDropdownOpen((prev) => !prev)
                                }
                                className="text-red hover:text-gray-600 flex items-center"
                            >
                                Katalog
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
                                <div className="absolute left-0 mt-2 w-48 bg-white text-black border rounded-md shadow-lg z-50">
                                    <Link
                                        href="/category/rings"
                                        className="block px-4 py-2 hover:bg-gray-100"
                                    >
                                        Rings
                                    </Link>
                                    <Link
                                        href="/category/necklaces"
                                        className="block px-4 py-2 hover:bg-gray-100"
                                    >
                                        Necklaces
                                    </Link>
                                    <Link
                                        href="/category/earrings"
                                        className="block px-4 py-2 hover:bg-gray-100"
                                    >
                                        Earrings
                                    </Link>
                                    <Link
                                        href="/category/bracelets"
                                        className="block px-4 py-2 hover:bg-gray-100"
                                    >
                                        Bracelets
                                    </Link>
                                </div>
                            )}
                        </div>

                        <Link
                            href="/about"
                            className="text-red hover:text-gray-600"
                        >
                            Om
                        </Link>
                    </div>

                    {/* Desktop Cart Icon with Item Count */}
                    <div className="hidden md:flex items-center space-x-4 relative">
                        <Link
                            href="/cart"
                            className="relative text-red flex items-center"
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
                            {/* Show item count only if totalItems is greater than 0 */}
                            {totalItems > 0 && (
                                <span className="absolute top-0 right-0 transform translate-x-1 -translate-y-1 bg-gray-200 text-black rounded-full text-xs w-4 h-4 flex items-center justify-center">
                                    {totalItems}
                                </span>
                            )}
                        </Link>
                    </div>

                    {/* Mobile Hamburger and Cart */}
                    <div className="flex items-center space-x-4 md:hidden">
                        {/* Hamburger */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-red focus:outline-none"
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
                                    d="M4 6h16M4 12h16m-7 6h7"
                                />
                            </svg>
                        </button>

                        {/* Cart Icon */}
                        <Link href="/cart" className="relative text-red">
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

                            {/* Show item count only if totalItems is greater than 0 */}
                            {totalItems > 0 && (
                                <span className="absolute top-0 right-0 transform translate-x-1 -translate-y-1 bg-gray-200 text-black rounded-full text-xs w-4 h-4 flex items-center justify-center">
                                    {totalItems}
                                </span>
                            )}
                        </Link>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden">
                        <div className="space-y-2 py-2">
                            <Link
                                href="/"
                                className="block px-4 py-2 text-red hover:bg-gray-100"
                            >
                                Home
                            </Link>
                            <Link
                                href="/category/rings"
                                className="block px-4 py-2 text-black hover:bg-gray-100"
                            >
                                 Rings
                            </Link>
                            <Link
                                href="/category/necklaces"
                                className="block px-4 py-2 text-black hover:bg-gray-100"
                            >
                                Necklaces
                            </Link>
                            <Link
                                href="/category/earrings"
                                className="block px-4 py-2 text-black hover:bg-gray-100"
                            >
                                Earrings
                            </Link>
                            <Link
                                href="/category/bracelets"
                                className="block px-4 py-2 text-black hover:bg-gray-100"
                            >
                                Bracelets
                            </Link>

                            {/* wait with dropdown, dosent work*/}

                            {/* <div>
                                <button
                                    className="block w-full text-left px-4 py-2 text-red hover:bg-gray-100"
                                    onClick={() =>
                                        setIsDropdownOpen(!isDropdownOpen)
                                    }
                                >
                                    Katalog
                                </button>
                                {isDropdownOpen && (
                                    <div className="pl-4 space-y-1">
                                        <Link
                                            href="/category/rings"
                                            onClick={() => setIsMenuOpen(false)}
                                            className="block px-4 py-2 text-black hover:bg-gray-100"
                                        >
                                            Rings
                                        </Link>
                                        <Link
                                            href="/category/necklaces"
                                            className="block px-4 py-2 text-black hover:bg-gray-100"
                                        >
                                            Necklaces
                                        </Link>
                                        <Link
                                            href="/category/earring"
                                            className="block px-4 py-2 text-black hover:bg-gray-100"
                                        >
                                            Earrings
                                        </Link>
                                        <Link
                                            href="/category/bracelets"
                                            className="block px-4 py-2 text-black hover:bg-gray-100"
                                        >
                                            Bracelets
                                        </Link>
                                    </div>
                                )}
                            </div> */}

                            <Link
                                href="/about"
                                className="block px-4 py-2 text-black hover:bg-gray-100"
                            >
                                Om
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}
