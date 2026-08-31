import React from 'react'


async function page({params}) {
   const {id}= await params;
  return (
    <div>home id page - {id}</div>
  )
}


export default page