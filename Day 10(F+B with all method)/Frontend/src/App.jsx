import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'

function App() {
const [note, setnote] = useState([])

function fetchget(){
   axios.get('http://localhost:3000/apis/notes').then((res)=>{
    console.log(res.data.note);
    setnote(res.data.note)  
  })
}
 
useEffect(()=>{
   fetchget()
},[])

function fetchpost(e){
  e.preventDefault()
  const {title,discription}=e.target.elements;
  console.log(title.value , discription.value);
  axios.post('http://localhost:3000/apis/notes',{
    title:title.value,
    discription:discription.value
  }).then((res)=>{
    console.log(res);
    
    fetchget()
  })
}


function fetchdelete(id){
  console.log(id);
  
  axios.delete('http://localhost:3000/apis/notes/' + id).then((res)=>{
    console.log(res);
    fetchget()
  })

}



  return (
    <div className='bg-black h-screen w-full p-5 text-white flex flex-col gap-3'>

      <form className='flex gap-5' onSubmit={(e)=>{
        fetchpost(e)
      }}>
        <input name='title' required type="text" placeholder='title' />
        <input name='discription' required type="text" placeholder='discription' />
        <button className='bg-gray-500 p-3'>Create note </button>
      </form>


      {note.map((not)=>{
      return  <div className='bg-gray-500 w-fit p-5 h-fit rounded '>
        <h1>{not.title}</h1>
        <h3>{not.discription}</h3>
        <button onClick={()=>{
          fetchdelete(not._id)
        }} className='bg-red-600 p-2 rounded-full'>x</button>

           </div>
      })}
    </div>
  )
}

export default App
