import React, { useState } from 'react'
import axios from 'axios'
function App() {

  const [note, setnote] = useState([])

 axios.get('http://localhost:3000/apiu/notes').then((res)=>{
  console.log(res.data.note);
  setnote(res.data.note)
  
 })

  return (
    <div className='bg-black w-full h-screen content-start flex  flex-wrap gap-3 p-5 '>
      {
        note.map((note)=>{
         return <div className='bg-gray-500 color-white w-[20%]  rounded-2xl flex flex-col items-center   justify-center  h-20'>
          <h1>{note.title}</h1>
          <h3>{note.discription}</h3>
         </div>
        })
      }
    </div>
  )
}

export default App
