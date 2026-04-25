import React from 'react'
import Formgroup from '../Components/Formgroup'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/register.scss'
import { useState } from 'react'
import { authhook } from '../hooks/authhook'
function Register() {
  const navigate = useNavigate()

  const {handleregister} = authhook()
  const [email, setemail] = useState('')
  const [username, setusername] = useState('')
  const [password, setpassword] = useState('')

  async function handlesubmit(e){
    e.preventDefault()
    await handleregister({email,username,password})
    navigate('/')
  }


  return (
   <main className="registerpage">
    <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={handlesubmit}>
            <Formgroup value={email} onchange={(e)=>setemail(e.target.value)} label='Email' placeholder='Enter the Email'/>
            <Formgroup value={username} onchange={(e)=>setusername(e.target.value) } label='username' placeholder='Enter the username'/>
            <Formgroup value={password} onchange={(e)=>setpassword(e.target.value) } label="password" placeholder='Enter the password'/>

            <button>Register</button>
        </form>
        <p>Already have account ? <Link to='/login'>Login here</Link></p>
    </div>
   </main>
  )
}

export default Register
