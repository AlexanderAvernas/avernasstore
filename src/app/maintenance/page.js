// app/maintenance/page.tsx

export default function MaintenancePage() {
    return (
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
    );
  }
