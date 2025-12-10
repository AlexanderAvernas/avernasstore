import ProductList from "./components/ProductList";
import SpecialOfferBanner from "./components/SpecialOfferBanner";
import Hero from "./components/Hero"; // Använd bara en Hero-komponent
// import { fetchHero } from "./lib/contentful";
import { fetchHero, fetchSpecialOffer } from "./lib/sanity";
import CategoryList from "./components/CategoryList";
import CollectionImages from "./components/CollectionImages";
import CollectionList from "./components/CollectionList";
import NewsCarousel from "./components/NewsCarousel";

export default async function Home() {
  const hero = await fetchHero();
  const specialOffer = await fetchSpecialOffer();

  return (
    <div className="w-full">
      {/* Flytande informationsruta */}
      <div className="fixed bottom-4 right-4 bg-yellow-200 shadow-lg rounded-lg p-4 max-w-xs z-50">
        <p className="text-sm font-medium">
          Denna sida är under förbättring. Besök vår fungerande shop här:&nbsp;
          <a
            href="https://margareta-avernas.myshopify.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-700 hover:text-blue-900 font-semibold"
          >
            margareta-avernas.myshopify.com
          </a>
        </p>
      </div>

      {hero ? (
        <Hero
          title={hero.title}
          imageUrl={hero.image}
          description={hero.description}
        />
      ) : (
        <p>Ingen hero-data hittades.</p>
      )}
      <div className="h-40 bg-white flex items-center justify-center">
        <p className="text-center">HANDGJORDA SMYCKEN I ÅTERVUNNET SILVER</p>
      </div>
      <div className="mb-10">
        {specialOffer && (
          <SpecialOfferBanner
            title={specialOffer.title}
            description={specialOffer.description}
            imageUrl={specialOffer.image}
            buttonText={specialOffer.buttonText}
          />
        )}
      </div>
      <CategoryList />
      <NewsCarousel />
      <div className="text-heading-l mb-4 flex items-center justify-center">
        <h2 className="text-center">COLLECTIONS</h2>
      </div>
      <CollectionList />
    </div>
  );
}
