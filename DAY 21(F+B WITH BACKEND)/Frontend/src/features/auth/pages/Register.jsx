import React, { useState } from 'react'
import '../style/form.scss'
import { NavLink } from 'react-router'
import axios  from 'axios'
function Register() {
      const [username, setusername] = useState('')
      const [password, setpassword] = useState('')
      const [email, setemail] = useState('')
     
    async function handlesubmit(e) {
    e.preventDefault()

    axios.post('http://localhost:3000/api/auth/register',{
      username,
      email,
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
        <h1>Register</h1>

        <form onSubmit={(e)=>{
          handlesubmit(e)
        }}>
           
           <input onChange={(e)=>{
            setusername(e.target.value)
           }} name='username' type="text" placeholder='username' value={username} />
           <input onChange={(e)=>{
            setemail(e.target.value)
           }} name='email' type="text" placeholder='email' value={email} />
           <input onChange={(e)=>{
            setpassword(e.target.value)
           }} name='password' type="text" placeholder='password' value={password}/>


           <button>Register</button>
         
        </form>

        <p>if you already have account ? <NavLink className='Navlink' to='/login'>login</NavLink></p>
      </div>
   </main>
  )
}

export default Register
