import React from 'react'
import Formgroup from '../Components/Formgroup'
import { Link } from 'react-router-dom'
import '../styles/register.scss'
function Register() {
  return (
   <main className="registerpage">
    <div className="form-container">
        <h1>Register</h1>
        <form>
            <Formgroup label='Email' placeholder='Enter the Email'/>
            <Formgroup label='username' placeholder='Enter the username'/>
            <Formgroup label="password" placeholder='Enter the password'/>

            <button>Register</button>
        </form>
        <p>Already have account ? <Link to='/login'>Login here</Link></p>
    </div>
   </main>
  )
}

export default Register
