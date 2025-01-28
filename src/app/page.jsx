import Cart from "./components/Cart";
import ProductList from "./components/ProductList";

export default function Home() {
  return (
  <div className="bg-red-500 text-white p-4">
    <h1>Home</h1>
    <ProductList/>
    <Cart/>
  </div>
  );
}
