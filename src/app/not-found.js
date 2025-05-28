// app/not-found.js
import Link from "next/link";

export default function NotFound() {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center px-4">
        <h1 className="text-4xl font-bold mb-4">Sidan kunde inte hittas</h1>
        <p className="text-lg text-gray-600 mb-6">
          Den sidan du försöker nå finns inte. Kanske har den flyttats eller tagits bort.
        </p>
        <Link href="/" className="text-blue-500 underline hover:text-blue-700">
          Gå tillbaka till startsidan
        </Link>
      </div>
    );
  }
