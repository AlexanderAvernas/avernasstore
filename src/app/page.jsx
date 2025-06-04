import ProductList from "./components/ProductList";
import Hero from "./components/Hero"; // Använd bara en Hero-komponent
import { fetchHero } from "./lib/contentful";
import CategoryList from "./components/CategoryList";
import CollectionImages from "./components/CollectionImages";
import CollectionList from "./components/CollectionList";

export default async function Home() {
  const hero = await fetchHero(); // Hämta hero-data från Contentful

  return (
    <div className="w-full">
      {hero ? <Hero title={hero.title} imageUrl={hero.image} description={hero.description} /> : <p>Ingen hero-data hittades.</p>}
      {/* <ProductList /> */}
      <CategoryList/>
      <div className="h-40 bg-white flex items-center justify-center">
    <h2 className="text-center">HANDGJORDA SMYCKEN <br/> I <br/> ÅTERVUNNET SILVER</h2>
</div>
<CollectionImages/>
<div className="h-40 bg-white flex items-center justify-center">
    <h2 className="text-center">COLLECTIONS</h2>
</div>
<CollectionList/>
    </div>
  );
}
