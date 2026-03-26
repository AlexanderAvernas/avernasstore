"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Footer = () => {
  const [showRingSizeInfo, setShowRingSizeInfo] = useState(false);
  const [showCareInfo, setShowCareInfo] = useState(false);

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
            {/* <p className="text-body-s">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p> */}

            {/* Social icons */}
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/instanew.png"
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
                  src="/facebooknew.png"
                  alt="Facebook"
                  width={30}
                  height={30}
                  className="hover:opacity-70 transition-opacity"
                />
              </a>
            </div>

            {/* Links */}
            <div className="flex flex-col gap-4 text-body-s underline">
              <Link href="/about" className="hover:underline">
                Om oss
              </Link>

              <Link href="/terms" className="hover:underline">
                Allmänna köpvillkor
              </Link>

              {/* Ta hand om dina smycken – öppnar modal */}
              <button
                onClick={() => setShowCareInfo(true)}
                className="text-left underline hover:opacity-70 transition-opacity"
              >
                Ta hand om dina smycken
              </button>

              {/* Storleksguide – öppnar modal */}
              <button
                onClick={() => setShowRingSizeInfo(true)}
                className="text-left underline hover:opacity-70 transition-opacity"
              >
                Storleksguide
              </button>
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

      {/* Modal: Storleksguide */}
      {showRingSizeInfo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="relative bg-white p-6 rounded-lg shadow-lg max-h-[90vh] overflow-y-auto w-[90%] max-w-md">
            <button
              onClick={() => setShowRingSizeInfo(false)}
              className="absolute top-4 right-4 text-gray-900 font-bold hover:text-black"
            >
              <h1>✕</h1>
            </button>
            <h2 className="text-lg font-semibold mb-2 border-b border-gray-300">
              Hur du mäter din ringstorlek
            </h2>
            <div className="relative w-full h-64">
              <Image
                src="/frame 133.png"
                alt="Illustration på hur man mäter ringstorlek"
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-contain"
              />
            </div>
            <p className="text-body-m mb-4">
              Välj en ring som storleksmässigt passar det finger du skall ha
              din nya ring på. Tänk på att en bred ring sitter tightare än en
              smal ring.
              <br />
              <br />
              Ta ett måttband eller en linjal och lägg ringen ovanpå
              måttbandet/linjalen.
              <br />
              <br />
              Räkna mm, rakt över diametern på ringens insida. Din storlek är
              de antal mm du får fram när du mäter. I detta fall 17.
            </p>
          </div>
        </div>
      )}

      {/* Modal: Ta hand om dina smycken */}
      {showCareInfo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="relative bg-white p-6 rounded-lg shadow-lg max-h-[90vh] overflow-y-auto w-[90%] max-w-md">
            <button
              onClick={() => setShowCareInfo(false)}
              className="absolute top-4 right-4 text-gray-900 font-bold hover:text-black"
            >
              <h1>✕</h1>
            </button>
            <h2 className="text-lg font-semibold mb-2 border-b border-gray-300">
              Ta hand om dina smycken
            </h2>
            <div className="relative w-full h-64">
              <Image
                src="/about2.jpg"
                alt="Ta hand om dina smycken"
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-contain"
              />
            </div>
            <p className="text-body-m mb-4">
              Genom att ta hand om ditt nya smycke kan du minimera slitage.
              Silver oxiderar, det är helt naturligt. För att fördröja processen
              bör du undvika att förvara dina smycken i en fuktig miljö, såsom
              badrummet.
              <br />
              <br />
              Torka av smycket med putsduk efter användning så det blir rent
              från fett, smuts och smink. Då behåller det sin lyster mycket
              längre. Förvara gärna dina smycken i medföljande ask.
            </p>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;