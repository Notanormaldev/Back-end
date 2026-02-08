import React, { useEffect, useState } from 'react'
import axios from 'axios'

function App() {

  const [note, setnote] = useState([])

   function fetchget(){
    axios.get('http://localhost:3000/apis/notes').then((res)=>{
      // console.log(res.data.note); 
      const note = res.data.note
      setnote(note)    
    })
  }

  useEffect(()=>{
     fetchget()
 },[])

 function fetchpost(e){
 const {title,discription} = e.target.elements;
  e.preventDefault()
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
    
    axios.delete('http://localhost:3000/apis/notes/' + id).then(res=>{
      console.log(res);    
      fetchget() 
    })
  }


  function fetchpatch(id){
  const discription = prompt('enter your update')
  axios.patch('http://localhost:3000/apis/notes/'+ id,{
    discription:discription
  }).then(res=>{
    console.log(res);
    fetchget()
    
  })
   

  }


  return (
    <div className='bg-black w-full h-screen text-white flex flex-wrap p-5 gap-4 content-start'>

     <form className='flex w-full gap-8' onSubmit={(e)=>{
       fetchpost(e)
     }}>
        <input name='title' type="text" placeholder='title' className='p-3 w-[20%] border-2 border-white' />
          <input name='discription' type="text" placeholder='discription' className='p-3 w-[20%] border-2 border-white' />
          <button className='bg-gray-600 font-bold p-2 rounded text-black'>Create note</button> 
     </form>

     {note.map((n)=>{
      return <div className='bg-gray-600 rounded w-fit h-fit p-5 text-2xl relative'>
        <h1>{n.title}</h1>
        <h2>{n.discription}</h2>
           <button onClick={()=>{
            fetchdelete(n._id)
           }} className='w-fit px-2 py-1 right-1 top-1 bg-red-500 absolute text-xs rounded-full'>X</button>
           <button className='bg-emerald-600 rounded-xl p-2 text-xs' onClick={()=>{
             fetchpatch(n._id)
           }}>update</button>
      </div>
     })}
    </div>
  )
}

export default App
