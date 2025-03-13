"use client";

import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-white text-black py-6">
      <div className="container mx-auto px-4 text-center">
        {/* Footer - Social Links */}
        <div className="flex justify-center space-x-6 mb-4">
          <a href="#" className="text-black hover:text-gray-400 transition">
            <i className="fab fa-facebook-f"></i> {/* Facebook Icon */}
          </a>
          <a href="#" className="text-black hover:text-gray-400 transition">
            <i className="fab fa-twitter"></i> {/* Twitter Icon */}
          </a>
          <a href="#" className="text-black hover:text-gray-400 transition">
            <i className="fab fa-instagram"></i> {/* Instagram Icon */}
          </a>
          <a href="#" className="text-black hover:text-gray-400 transition">
            <i className="fab fa-linkedin-in"></i> {/* LinkedIn Icon */}
          </a>
        </div>

        {/* Footer - Logo in Center */}
        <div className="mb-4 flex justify-center">
          <Image
            src="/avernas.jpg" // Ange din bilds sökväg
            alt="Avernäs Logo"
            width={120} // Bredd på loggan
            height={40} // Höjd på loggan
            className="object-contain" // Se till att bilden inte ändrar proportionerna
          />
        </div>

        {/* Footer - Copyright and Links */}
        <div className="text-sm mb-4">
          <p>&copy; 2025 Your Brand. All rights reserved.</p>
        </div>

        <div className="flex justify-center space-x-6">
          <a href="/privacy-policy" className="text-black hover:text-gray-400 transition text-sm">
            Privacy Policy
          </a>
          <a href="/terms-of-service" className="text-black hover:text-gray-400 transition text-sm">
            Terms of Service
          </a>
          <a href="/contact" className="text-black hover:text-gray-400 transition text-sm">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
