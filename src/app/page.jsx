import ProductList from "./components/ProductList";
import Hero from "./components/Hero"; // Använd bara en Hero-komponent
import { fetchHero } from "./lib/contentful";
import CategoryList from "./components/CategoryList";

export default async function Home() {
  const hero = await fetchHero(); // Hämta hero-data från Contentful

  return (
    <div className="w-full">
      {hero ? <Hero title={hero.title} imageUrl={hero.image} description={hero.description} /> : <p>Ingen hero-data hittades.</p>}
      {/* <ProductList /> */}
      <CategoryList/>
    </div>
  );
}
