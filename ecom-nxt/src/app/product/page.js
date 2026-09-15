import Protected from '../../components/Protected.js';
import ProductCard from '../../components/ProductCard.js';
import React from 'react'

async function page() {
    const res = await fetch('https://fakestoreapi.com/products')
    const products = await res.json()
    console.log(products);
    

  return (
    <Protected>
    <div className=' grid grid-cols-4 gap-5 p-10 '>

        {products.map(product => (
            <ProductCard key={product.id} product={product} />
        ))}
    </div></Protected>
  )
}

export default page