
import '../style/feed.scss'
import Post from '../components/Post'

import { usepost } from '../hooks/usepost'
import { useEffect } from 'react'
import Nav from '../../shared/Nav'
import Followlist from '../../follow/components/Followlist'

function Feed() {
   const {loading , feed ,post ,handlefeed, handlelikepost,handleunlikepost} = usepost()
   
   useEffect(()=>{
            handlefeed()
   },[])

   if(loading || !feed){
    return (<main>
        <h1>Feed is loading...</h1>
    </main>)
   }

  // console.log(feed);
  
    
    
  return (
    <div className='feed'>
      <div className="left">
        <Followlist/>
      </div>
      <div className="right">
          <Nav/>
        <div className="posts">
        {feed.map((p)=>{
           return <Post key={p._id} user={p.user} post={p} handlelikepost={handlelikepost} handleunlikepost={handleunlikepost} />
        })}
        </div>  
      </div>
    </div>
  )
}

export default Feed
