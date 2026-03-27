import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import '../style/form.scss'
import { useAuth } from '../hooks/auth.hook'
function Login() {

    const [username, setusername] = useState('')
    const [password, setpassword] = useState('')

    const {loading,handlelogin} = useAuth()
    const navigate = useNavigate()


   if(loading){
    return (
        <main>
            <h1>Loading...</h1>
        </main>
    )
   }

  async function handlesubmit(e){
    e.preventDefault()
    await handlelogin(username,password)

    console.log('login');
    navigate('/')
  }

  return (
    <main>
        <div className='form-container'>
            <h1>Login</h1>
            <form onSubmit={handlesubmit}>
                <input
                 onChange={(e)=>{
                    setusername(e.target.value)
                }} 
                value={username}
                 type="text" id='username' placeholder='Enter Username' />
                <input
                onChange={(e)=>{
                    setpassword(e.target.value)
                }}
                value={password}
                 type="text" id='password' placeholder='Enter Password' />
                <button className='button'>Login</button>
            </form>
            <p>Don't have account ? <Link className='link' to='/register' >Register</Link></p>
        </div>
    </main>
  )
}

export default Login
