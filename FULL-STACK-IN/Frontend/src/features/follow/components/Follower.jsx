import React from 'react'
import '../style/followercompo.scss'

function Follower({follower}) {
  // console.log(follower);
  
  return (
    <div className='follower-compo'>
           <img src="https://ik.imagekit.io/r5nxypvid/543c3130fba0be6cfda40c0db5fe74c1.webp?updatedAt=1771148318400" alt="" />
            <h1>{follower}</h1>
    </div>
  )
}

export default Follower
