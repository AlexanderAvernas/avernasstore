// 'use client';

// import { use } from 'react';
// import { useProducts } from '../../context/ProductsContext';

// const ProductPage = ({ params }) => {
//   const { slug } = use(params); // Avslöjar params med React.use()
//   const { state, dispatch } = useProducts();

//   // Hitta produkten baserat på slug
//   const product = state.products.find((p) => p.slug === slug);

//   if (!product) {
//     return <p>Product not found.</p>;
//   }

//   const addToCart = () => {
//     dispatch({ type: 'ADD_TO_CART', payload: product });
//   };

//   return (
//     <div>
//       <h1>{product.name}</h1>
//       <p>{(product.price / 100).toFixed(2)} SEK</p>
//       <p>{product.description}</p>
//       <img src={product.image} alt={product.name} />
//       <br />
//       <button onClick={addToCart}>Add to Cart</button>
//     </div>
//   );
// };

// export default ProductPage;

'use client';

import { use } from 'react'; // Importera `use` för att hantera async params
import { useProducts } from '../../context/ProductsContext';
import { useCart } from '../../context/CartContext';
import Link from 'next/link';

const ProductPage = ({ params }) => {
  const { slug } = use(params); // Använd `use` för att unwrap `params`
  const { state } = useProducts(); // Hämta produkter från ProductsContext
  const { dispatch } = useCart(); // Hämta dispatch från CartContext

  // Hitta produkten baserat på slug
  const product = state.products.find((p) => p.slug === slug);

  if (!product) {
    return <p>Product not found.</p>;
  }

  const addToCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: product }); // Uppdatera CartContext
  };

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{(product.price / 100).toFixed(2)} SEK</p>
      <p>{product.description}</p>
      <img src={product.image} alt={product.name} />
      <br />
      <button onClick={addToCart}>Add to Cart</button>
      <Link href="/">
          <button>Back to productPage</button>
        </Link>
    </div>
  );
};

export default ProductPage;
