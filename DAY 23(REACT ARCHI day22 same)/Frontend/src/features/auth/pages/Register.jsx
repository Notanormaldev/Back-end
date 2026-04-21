import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../hooks/auth.hook'

function Register() {



  const [username, setusername] = useState('')
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')


   const navigate = useNavigate()

   const {loading,handleregister}= useAuth()


   if(loading){
    return (
        <main>
            <h1>Loading...</h1>
        </main>
    )
   }
  async function handlesubmit(e){
    e.preventDefault()
    await handleregister(username,email,password)
    
   
    console.log('register');
    navigate('/')
    
  }


  return (
      <main>
        <div className='form-container'>
            <h1>Register</h1>
            <form onSubmit={handlesubmit}>
                <input onChange={(e)=>{
                    setusername(e.target.value)
                }} value={username} type="text" id='username' placeholder='Enter Username' />
                <input onChange={(e)=>{
                    setemail(e.target.value)
                }} value={email} type="text" id='email' placeholder='Enter Email' />
                <input onChange={(e)=>{
                    setpassword(e.target.value)
                }} value={password} type="text" id='password' placeholder='Enter Password' />
                <button className='button'>Register</button>
            </form>
            <p>Already have account ? <Link className='link' to='/login' >login</Link></p>
        </div>
    </main>
  )
}

export default Register
