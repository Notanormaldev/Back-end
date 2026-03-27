import React, { useRef, useState } from 'react'
import '../style/createpost.scss'
import { usepost } from '../hooks/usepost'
import { useNavigate } from 'react-router'

function Createpost() {
    const {loading ,handlecreatepost}=usepost()
    const [caption, setcaption] = useState('')
    const navigate = useNavigate()

    const postimginputref = useRef(null)
   

    async function postsubmit(e){
          e.preventDefault()
          const file = postimginputref.current.files[0]
        
         
          await handlecreatepost(file,caption)

          navigate('/')
    }


    if(loading){
      return (
        <main>
          <h1>Creating post </h1>
        </main>
      )
    }

  return (
    <div className='create-post'>
         <main>
            <h1>Create post</h1>
            <form onSubmit={postsubmit}>
                <label htmlFor="postimage" id='postimg'>Select image</label>
                <input ref={postimginputref} required type="file" name='postimg' hidden   id='postimage'/>
                <input onChange={(e)=>{
                    setcaption(e.target.value)
                }} 
                 type="text" value={caption}  placeholder='Enter capiton' id='caption' />
                <button className='button'>Create post</button>
            </form>
         </main>
    </div>
  )
}

export default Createpost
