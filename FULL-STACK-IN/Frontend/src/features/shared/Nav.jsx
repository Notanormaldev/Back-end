import React from 'react'
import '../shared/nav.scss'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../auth/hooks/auth.hook'

function Nav() {
    const navigate = useNavigate()
    const {handlelogout} = useAuth()

  async function Gocreatepage(){
   navigate('/createpost')
  }

  function logout(){
    handlelogout()
    navigate('/login')
  }

  return (
    <div className='nav'>
      <h1>Insta</h1>
      <div>
        <button onClick={Gocreatepage }>Create post</button>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  )
}

export default Nav
