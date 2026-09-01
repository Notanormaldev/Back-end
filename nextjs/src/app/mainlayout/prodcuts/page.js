'use client'

import React, { useState } from 'react'

 function page() {
    

   const [products, setproducts] = useState([])


   async function data(){
      let res = await fetch("https://fakestoreapi.com/products")
      let data = await res.json()
      setproducts(data)
   }
    data()
  return (
    <div> all products lists 
        <div>
         {products.map((e) => (
            <h1 onClick={()=>{}}>{e.title}</h1>
         ))}
        </div>
    </div>
  )
}

export default page