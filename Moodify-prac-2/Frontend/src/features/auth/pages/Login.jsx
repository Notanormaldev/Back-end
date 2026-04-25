import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Formgroup from '../Components/Formgroup'
import '../styles/login.scss'
import { useState } from 'react'
import { authhook } from '../hooks/authhook'
function Login() {
  
  const navigate = useNavigate()

  const {handlelogin} = authhook()

  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')

 async function handlesubmit(e){
    e.preventDefault()
    await handlelogin({email,password})
    navigate('/')
 }

  return (
    <main className="loginpage">
        <div className="form-container">
            <h1>Login</h1>
            <form onSubmit={handlesubmit}>
               <Formgroup value={email} onchange={(e)=>setemail(e.target.value)}  label='Email' placeholder='Enter the Email'/>
               <Formgroup value={password} onchange={(e)=>setpassword(e.target.value) }label="password" placeholder='Enter the password'/>
                <button >Login</button>
            </form>
            <p>Don't have account ? <Link to='/register'>Register here</Link></p>
        </div>
    </main>
  )
}

export default Login
