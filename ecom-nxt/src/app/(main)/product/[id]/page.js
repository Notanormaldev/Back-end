import React from 'react'

async function page({params}) {
    const {id }= await params;

    

  return (
    <div>product page - {id}</div>
  )
}

export default page