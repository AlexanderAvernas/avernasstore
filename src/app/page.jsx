// import ProductList from "./components/ProductList";
// import Hero from "./components/Hero"; // Använd bara en Hero-komponent
// import { fetchHero } from "./lib/contentful";
// import CategoryList from "./components/CategoryList";
// import CollectionImages from "./components/CollectionImages";
// import CollectionList from "./components/CollectionList";

// export default async function Home() {
//   const hero = await fetchHero(); // Hämta hero-data från Contentful

//   return (
//     <div className="w-full">
//       {hero ? <Hero title={hero.title} imageUrl={hero.image} description={hero.description} /> : <p>Ingen hero-data hittades.</p>}
//       {/* <ProductList /> */}
//       <CategoryList/>
//       <div className="h-40 bg-white flex items-center justify-center">
//     <h2 className="text-center">HANDGJORDA SMYCKEN <br/> I <br/> ÅTERVUNNET SILVER</h2>
// </div>
// <CollectionImages/>
// <div className="h-40 bg-white flex items-center justify-center">
//     <h2 className="text-center">COLLECTIONS</h2>
// </div>
// <CollectionList/>
//     </div>
//   );
// }

import ProductList from "./components/ProductList";
import Hero from "./components/Hero"; // Använd bara en Hero-komponent
// import { fetchHero } from "./lib/contentful";
import { fetchHero } from "./lib/sanity";
import CategoryList from "./components/CategoryList";
import CollectionImages from "./components/CollectionImages";
import CollectionList from "./components/CollectionList";


export default async function Home() {
    const hero = await fetchHero();

    return (
      <div className="w-full">
        {/* Flytande informationsruta */}
        <div className="fixed bottom-4 right-4 bg-yellow-200 shadow-lg rounded-lg p-4 max-w-xs z-50">
          <p className="text-sm font-medium">
            Denna sida är under förbättring.
            Besök vår fungerande shop här:&nbsp;
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

        <CategoryList />
        <div className="h-40 bg-white flex items-center justify-center">
          <h6 className="text-center">
            HANDGJORDA SMYCKEN I ÅTERVUNNET SILVER
          </h6>
        </div>
        <CollectionImages />
        <div className="h-40 bg-white flex items-center justify-center">
          <h2 className="text-center">COLLECTIONS</h2>
        </div>
        <CollectionList />
      </div>
    );
  }
