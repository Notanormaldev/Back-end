import React, { useEffect } from 'react'
import '../style/followlist.scss'
import Follower from './Follower'
import Following from './Following'
import Otheruser from './Otheruser'
import { usefollow } from '../hooks/usefollow'




function Followlist() {
   const {followers , following , handlefollow,handelotheruser,users,followtheuser} = usefollow()


   useEffect(()=>{
      handlefollow(),handelotheruser()
   },[])
   // console.log(followers);
   
  return (
    <div className='follow-container'>


     <div className="follower">
        <h1>Followers</h1>
        <div className="fl">
               {followers?.map((f,id)=>{
                  return <Follower key={id} follower={f}/>
               })}
        </div>
     </div>


     <div className="following">
        <h1>Following</h1>
        <div className="fl">
          {following.map((f,id)=>{
            return <Following key={id} following={f}/>
          })}
          
        </div>
     </div>


       <div className="otheruser">
        <h1>Otheruser</h1>
        <div className="fl">
         {users.map((o,id)=><Otheruser key={id} otheruser={o} followtheuser={followtheuser}/>)}
        </div>
     </div>

     
    </div>
  )
}

export default Followlist
