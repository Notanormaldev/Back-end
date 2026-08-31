import React from 'react'

async function page() {
    let res = await fetch("https://fakestoreapi.com/products")
    let data = await res.json()
  return (
    <div> all products lists 
        <div>
         {data.map((e) => (
            <h1 >{e.title}</h1>
         ))}
        </div>
    </div>
  )
}

export default page