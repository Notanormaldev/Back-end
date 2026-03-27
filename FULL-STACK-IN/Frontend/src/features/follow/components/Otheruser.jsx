import React from 'react'
import '../style/otherusercompo.scss'
function Otheruser({otheruser,followtheuser}) {
  // console.log(followtheuser);
  
  // console.log(otheruser);
  
  return (
      <div className='otherusercompo'>
               <div className="user-part">
            <img src="https://ik.imagekit.io/r5nxypvid/543c3130fba0be6cfda40c0db5fe74c1.webp?updatedAt=1771148318400" alt="" />
            <h1>{otheruser}</h1>
           </div>
            <button onClick={()=>followtheuser(otheruser)}>Follow</button>
    </div>
  )
}

export default Otheruser
