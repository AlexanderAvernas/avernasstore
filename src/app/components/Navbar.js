"use client";
import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { useProducts } from "../context/ProductsContext";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { cart, dispatch } = useCart();
  const pathname = usePathname();
  const [totalItems, setTotalItems] = useState(0);
  const dropdownRef = useRef(null);
  const { state } = useProducts();
  const [openMobileSection, setOpenMobileSection] = useState(null);

  const toggleMobileSection = (section) => {
    setOpenMobileSection(openMobileSection === section ? null : section);
  };

  // Kolla om det finns produkter med specialPrice
  const hasSpecialOffers = state.products.some(
    (product) => product.specialPrice && product.specialPrice < product.price,
  );

  const isHomePage = pathname === "/";

  // Calculate total items
  useEffect(() => {
    const total = cart.reduce((acc, item) => acc + item.quantity, 0);
    setTotalItems(total);
  }, [cart]);

  // Handle scroll - only on homepage
  useEffect(() => {
    if (!isHomePage) return;

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("no-scroll"); // ✅ Samma klass!
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isMenuOpen]);

  // Navbar styling based on page and scroll
  const navbarBg = isHomePage
    ? isScrolled
      ? "bg-white shadow-md"
      : "bg-transparent"
    : "bg-white shadow-md";

  const textColor = isHomePage
    ? isScrolled
      ? "text-black"
      : "text-white"
    : "text-black";

  return (
    <>
      {/* Sticky Navbar */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${navbarBg}`}
      >
        <div className="max-w-7xl mx-auto py-2 px-4 sm:px-6 lg:px-8">
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
                  onClick={() => setIsDropdownOpen((prev) => !prev)}
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
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Ringar
                      </Link>
                      <Link
                        href="/category/necklaces"
                        className="block py-2 hover:text-gray-600"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Halsband
                      </Link>
                      <Link
                        href="/category/earrings"
                        className="block py-2 hover:text-gray-600"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Örhängen
                      </Link>
                      <Link
                        href="/category/bracelets"
                        className="block py-2 hover:text-gray-600"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Armband
                      </Link>
                    </div>

                    {/* ✅ LÄGG TILL: Special Offers - Visas bara om det finns rabatter */}
                    {hasSpecialOffers && (
                      <div className="px-4 py-3 border-b">
                        <Link
                          href="/special-offers"
                          className="block py-2 text-red-600 hover:text-red-600 flex items-center"
                          onClick={() => setIsDropdownOpen(false)}
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
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Se alla kollektioner
                      </Link>
                    </div>

                    {/* About */}
                    <div className="px-4 py-3">
                      <Link
                        href="/about"
                        className="block py-2 hover:text-gray-600"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Om oss
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Center Logo */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <Link href="/" className="hover:opacity-75 transition-opacity">
                <Image
                  src={
                    isHomePage && !isScrolled
                      ? "/logoWhite.png"
                      : "/logoBlack.png"
                  }
                  alt="Margareta Avernäs"
                  width={58} // justera efter behov
                  height={58}
                  priority
                />
              </Link>
            </div>

            {/* Cart Icon - Right side */}
            <div className="flex items-center">
              {/* NYA - Ersätt med button */}
              <button
                onClick={() => dispatch({ type: "OPEN_CART" })}
                className={`relative ${textColor} flex items-center hover:opacity-75 transition-opacity`}
              >
                <Image
                  src={
                    isHomePage && !isScrolled
                      ? "/cart white.png"
                      : "/cartBlack.png"
                  }
                  alt="Margareta Avernäs Smycken"
                  width={20}
                  height={20}
                />

                {totalItems > 0 && (
                  <span
                    className={`absolute top-0 right-0 transform translate-x-1 -translate-y-1 rounded-full text-xs w-4 h-4 flex items-center justify-center ${
                      isHomePage && !isScrolled
                        ? "bg-white text-black"
                        : "bg-gray-800 text-white"
                    }`}
                  >
                    {totalItems}
                  </span>
                )}
              </button>
              {/* Stäng </Link> blir </button> */}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Side Menu - Slides in from left */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-opacity duration-300 ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop - ✅ LÄGG TILL DENNA */}
        <div
          className="absolute inset-0 bg-black bg-opacity-50"
          onClick={() => setIsMenuOpen(false)}
        />
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black bg-opacity-50"
          onClick={() => setIsMenuOpen(false)}
        />

        {/* Slide-in Menu */}
        <div
          className={`absolute top-0 py-6 left-0 h-full w-4/5 bg-white shadow-xl transform transition-transform duration-300 ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Close button */}
          <div className="flex justify-start p-4">
            <button onClick={() => setIsMenuOpen(false)} className="text-black">
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
          <div className="px-6 py-4 space-y-4">
            {/* Categories */}
            <div>
              <button
                onClick={() => toggleMobileSection("categories")}
                className="w-full flex justify-between items-center text-label-s"
              >
                Kategorier
                <span
                  className={`transition-transform ${
                    openMobileSection === "categories" ? "rotate-180" : ""
                  }`}
                >
                  <Image
                    src="/chevron.png"
                    alt="Expand"
                    width={16}
                    height={16}
                  />
                </span>
              </button>

              {openMobileSection === "categories" && (
                <div className="mt-3 space-y-3 pl-4 text-body-s uppercase">
                  {[
                    { slug: "rings", name: "Ringar" },
                    { slug: "necklaces", name: "Halsband" },
                    { slug: "earrings", name: "Örhängen" },
                    { slug: "bracelets", name: "Armband" },
                  ].map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/category/${cat.slug}`}
                      className="block text-gray-500"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* ✅ Special Offers - Visas bara om det finns rabatter */}
            {hasSpecialOffers && (
              <div className="border-t pt-4">
                <button
                  onClick={() => toggleMobileSection("offers")}
                  className="w-full flex justify-between items-center text-label-s"
                >
                  Specialerbjudanden
                  <span
                    className={`transition-transform ${
                      openMobileSection === "offers" ? "rotate-180" : ""
                    }`}
                  >
                    <Image
                      src="/chevron.png"
                      alt="Expand"
                      width={16}
                      height={16}
                    />
                  </span>
                </button>

                {openMobileSection === "offers" && (
                  <div className="mt-3 space-y-3 pl-4 text-body-s">
                    <Link
                      href="/special-offers"
                      className="block uppercase text-gray-500"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Specialerbjudanden
                    </Link>
                    <Link
                      href="/news"
                      className="block uppercase text-gray-500"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Nyheter
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* Collections */}
            <div className="border-t pt-4">
              <button
                onClick={() => toggleMobileSection("collections")}
                className="w-full flex justify-between items-center text-label-s"
              >
                Kollektioner
                <span
                  className={`transition-transform ${
                    openMobileSection === "collections" ? "rotate-180" : ""
                  }`}
                >
                  <Image
                    src="/chevron.png"
                    alt="Expand"
                    width={16}
                    height={16}
                  />
                </span>
              </button>

              {openMobileSection === "collections" && (
                <div className="mt-3 space-y-3 pl-4 text-body-s">
                  {[
                    "symbols",
                    "womanpower",
                    "coins",
                    "earcuffs",
                    "stones",
                    "letter",
                    "connect",
                    "happyplanets",
                  ].map((col) => (
                    <Link
                      key={col}
                      href={`/collection/${col}`}
                      className="block text-gray-500 text-body-s uppercase"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {col.replace("-", " ")}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* About  */}
            <div className="border-t border-b py-4 text-label-s">
              <Link
                href="/about"
                className="block hover:text-gray-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Om M.Avernäs Smycken
              </Link>
            </div>
          </div>
          {/* Social icons – bottom right */}
          <div className="absolute bottom-6 right-6 flex gap-4">
            <a
              href="https://www.instagram.com/margareta_avernas/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/instagramBlack.png"
                alt="Instagram"
                width={28}
                height={28}
                className="hover:opacity-70 transition-opacity"
              />
            </a>

            <a
              href="https://www.facebook.com/DIN_FACEBOOK"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/facebookBlack.png"
                alt="Facebook"
                width={16}
                height={16}
                className="hover:opacity-70 transition-opacity"
              />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
