import React, { useState } from 'react'
import { NavLink } from 'react-router'
import '../style/form.scss'
import axios from 'axios'
import { useAuth } from '../../hooks/useAuth'
function Login() {
   

    const [username, setusername] = useState('')
    const [password, setpassword] = useState('')
    
    const {handlelogin,isloading} = useAuth()
    
      if(isloading){
         return(
              <h1>Loading...</h1>
        ) }

    async function handlesubmit(e){
       e.preventDefault()
      
       handlelogin(username,password).then((res)=>{
        console.log(res)
       })
    }
   

  return (
 <main>
    <div className="form-container">
        <h1>Login</h1>
        <form className='form' onSubmit={(e)=>{
             handlesubmit(e)
        }} >
            <input type="text"
             onChange={(e)=>{
                setusername(e.target.value)
            }} 
            value={username}
             placeholder='username' 
             />
            <input type="text"
            onChange={(e)=>{
                setpassword(e.target.value)
            }}
            value={password}
             placeholder='password' />
            <button className='button'>Login</button>
        </form>
        <h6>Don't have account ? <NavLink className='Navlink' to='/register'>Register</NavLink></h6>
    </div>
 </main>
  )
}

export default Login
