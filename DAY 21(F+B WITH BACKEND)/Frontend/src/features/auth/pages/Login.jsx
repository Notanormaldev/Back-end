import React, { useState } from 'react'
import '../style/form.scss'
import { NavLink } from 'react-router'
import axios from 'axios'

function Login() {
   const [username, setusername] = useState('')
   const [password, setpassword] = useState('')
   
  // console.log(username,password);

  async function handlesubmit(e) {
    e.preventDefault()

    axios.post('http://localhost:3000/api/auth/login',{
      username,
      password
    },{
      withCredentials:true
    }).then((res)=>{
      console.log(res.data);
      
    })

  
   
    
  }
  
  return (
   <main>
      <div className="form-container">
        <h1>Login</h1>

        <form onSubmit={(e)=>{
          handlesubmit(e)
        }}>
           
           <input onChange={(e)=>{
            setusername(e.target.value)
           }} name='username' type="text" placeholder='username' value={username} />
           <input onChange={(e)=>{
            setpassword(e.target.value)
           }} name='password' type="text" placeholder='password' value={password} />


           <button>login</button>

        </form>
         <p>  Don't have an account?  <NavLink className='Navlink' to='/register'>register</NavLink></p>
      </div>
   </main>
  )
}

export default Login

