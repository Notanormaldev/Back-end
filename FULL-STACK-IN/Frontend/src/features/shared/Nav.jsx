import React from 'react'
import '../shared/nav.scss'
import { Link, useNavigate } from 'react-router'

function Nav() {
    const navigate = useNavigate()

  async function Gocreatepage(){
   navigate('/createpost')
  }

  return (
    <div className='nav'>
      <h1>Insta</h1>
      <button onClick={Gocreatepage }>Create post</button>
    </div>
  )
}

export default Nav
