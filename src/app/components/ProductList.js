"use client"

import Link from 'next/link'
import { useProducts } from '../context/ProductsContext'

const ProductList = () => {
    const { state } = useProducts()

    return (
        <div>
            <h1>Products</h1>
            <div>
                {state.products.map((product) => (
                    <div key={product.id} style={{ marginBottom: '20px' }}>
                        <h3>{product.name}</h3>
                        <p>{(product.price / 100).toFixed(2)} SEK</p>
                        <img
                            src={product.image}
                            alt={product.name}
                            style={{ width: '150px', height: 'auto' }}
                        />
                        <br />
                        <Link href={`/product/${product.slug}`}>
                            <button>View Product</button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ProductList
