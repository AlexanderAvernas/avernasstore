"use client";

import Image from "next/image";


const Footer = () => {
  return (
    <footer className="bg-white text-black py-6">
      <div className="container mx-auto px-4 text-center">
        {/* Footer - Social Links */}
        <div className="flex justify-center space-x-6 mb-0">
          <a href="https://www.instagram.com/margareta_avernas/" target="_blank" rel="noopener noreferrer" className="text-black hover:text-gray-400 transition">
            <Image
              src="/instagram_White_icon.png" // Instagram-logga
              alt="Instagram"
              width={20}
              height={20}
            />
          </a>
        </div>

        {/* Footer - Logo in Center */}
        <div className="m-0 flex justify-center">
          <Image
            src="/avernas.jpg" // Din logga
            alt="Avernäs Logo"
            width={120}
            height={40}
            className="object-contain"
          />
        </div>

        <div className="flex justify-center space-x-6 mb-2">
          <a href="/terms" className="text-black hover:text-gray-400 transition text-m">
            Användarvillkor
          </a>
          {/* <a href="/contact" className="text-black hover:text-gray-400 transition text-m">
            Contact
          </a> */}
        </div>
           {/* Footer - Copyright and Links */}
           <div className="text-sm mb-4">
          <p>&copy; 2025 Margareta Avernäs. Powerd by A.</p>


           {/* Footer - Klarna Payment Option */}
           <div className="flex justify-center items-center mt-4">
          <div className="flex flex-col items-center">
            <Image
              src="/klarna.png" // Klarna-logga
              alt="Klarna Payment"
              width={60} // Justera storleken för att passa designen
              height={20}
            />
            {/* <p className="text-sm text-gray-500 mt-2">Betala med Klarna</p> */}
          </div>
        </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
