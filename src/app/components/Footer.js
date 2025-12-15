"use client";

import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-white text-black py-7 border-t">
      <div className="max-w-7xl mx-auto px-4">
        {/* Top section */}
        <div className="flex justify-start">
          <div className="w-full sm:w-1/3 text-left space-y-8">
            {/* Logo */}
            <Image
              src="/logoBlack.png"
              alt="Logo"
              width={70}
              height={40}
              className="object-contain"
            />

            {/* Text */}
            <p className="text-body-s">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>

            {/* Social icons */}
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/instagramBlack.png"
                  alt="Instagram"
                  width={30}
                  height={30}
                  className="hover:opacity-70 transition-opacity"
                />
              </a>

              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/facebookBlack.png"
                  alt="Facebook"
                  width={17}
                  height={17}
                  className="hover:opacity-70 transition-opacity"
                />
              </a>
            </div>

            {/* Links */}
            <div className="flex flex-col gap-4 text-body-s underline">
              <Link href="/about" className="hover:underline">
                Om mig
              </Link>

              <Link href="/terms" className="hover:underline">
                Allmänna köpvillkor
              </Link>

              <Link href="/about" className="hover:underline">
                Ta hand om dina smycken
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-12 border-t pt-6 text-center">
          <p className="text-sm mb-4">
            &copy; 2025 Margareta Avernäs Smycken
          </p>

          <div className="flex justify-center">
            <Image
              src="/klarna.png"
              alt="Klarna Payment"
              width={60}
              height={20}
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;