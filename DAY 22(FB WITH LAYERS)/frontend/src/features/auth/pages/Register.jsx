import React, { useState } from 'react'
import { NavLink } from 'react-router'
import '../style/form.scss'
import axios from 'axios'
import { useAuth } from '../../hooks/useAuth'
function Register() {
    
    const [username, setusername] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')

    const {handleregister,isloading} = useAuth()
    
     if(isloading){
         return(
    <h1>Loading...</h1>
        ) 
        
    }
    async function handlesubmit(e){
        e.preventDefault()


        handleregister(username,email,password).then((res)=>{
            console.log(res);
        })


        
      
    }
    
    


  return (
    <main>
    <div className="form-container">
        <h1>Register</h1>
        <form className='form'  onSubmit={(e)=>{
            handlesubmit(e)
        }} >
            <input type="text" value={username} onChange={(e)=>{
                setusername(e.target.value)
            }} placeholder='username' />
            <input type="text" value={email} onChange={(e)=>{
                setemail(e.target.value)
            }}
             placeholder='email' />
            <input type="text" value={password} onChange={(e)=>{
                setpassword(e.target.value)
            }} placeholder='password' />
            <button className='button'>Register</button>
        </form>
        <h6>Already have account ? <NavLink className='Navlink' to='/login'>Login</NavLink></h6>
    </div>
 </main>
  )
}

export default  Register
