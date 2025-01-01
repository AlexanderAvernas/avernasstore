'use client';

import { use } from 'react';
import { useProducts } from '../../context/ProductsContext';

const ProductPage = ({ params }) => {
  const { slug } = use(params); // Avslöjar params med React.use()
  const { state, dispatch } = useProducts();

  // Hitta produkten baserat på slug
  const product = state.products.find((p) => p.slug === slug);

  if (!product) {
    return <p>Product not found.</p>;
  }

  const addToCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{(product.price / 100).toFixed(2)} SEK</p>
      <p>{product.description}</p>
      <img src={product.image} alt={product.name} />
      <br />
      <button onClick={addToCart}>Add to Cart</button>
    </div>
  );
};

export default ProductPage;
